#!/usr/bin/env python
import re
from pathlib import Path
from jinja2 import Environment, FileSystemLoader
import json
import htmlmin
import rjsmin
import rcssmin

REPOPATH = Path(__file__).resolve().parent.parent
SRCPATH = Path(__file__).resolve().parent

template_file_loader = FileSystemLoader(Path(SRCPATH, 'templates'))
template_env = Environment(loader=template_file_loader)

# Load sheet configs from configs/sheet-configs.json
# For the most part these are a series of options with the values; 'enabled', 'disabled', 'option-on', or 'option-off'
# These set whether the sheet module should be enabled/disabled or made optional for that sheet.
# 'option-on' indicates the option should be enabled by default while 'option-off' indicated disabled by default
with open(Path(SRCPATH, 'configs', "sheet-configs.json")) as sheet_configs_f:
    sheet_configs = json.load(sheet_configs_f)

for sheet, config in sheet_configs.items():
    # Set filename config to the sheet name, this is used to resolve paths
    config['filename'] = sheet

    # Resolve destination paths
    html_js_premin_path = Path(REPOPATH, "{}".format(sheet), "pre-minified", "{}.html".format(sheet))
    css_premin_path = Path(REPOPATH, "{}".format(sheet), "pre-minified", "{}.css".format(sheet))
    html_js_min_path = Path(REPOPATH, "{}".format(sheet), "{}.min.html".format(sheet))
    css_min_path = Path(REPOPATH, "{}".format(sheet), "{}.min.css".format(sheet))
    options_path = Path(REPOPATH, "{}".format(sheet), "sheet.json".format(sheet))

    # Render pre-minified content from templates
    html_premin_content = template_env.get_template('sheet.html').render(config)
    js_premin_content = template_env.get_template('workers.js').render(config)
    css_premin_content = template_env.get_template('sheet.css').render(config)
    options_content = template_env.get_template('sheet.json').render(config)
    # have to remove trailing commas from the rendered sheet.json template
    trailing_comma_regex = r'''(?<=[}\]"']),(?!\s*[{["'])'''
    options_content = re.sub(trailing_comma_regex, "", options_content, 0)
    html_js_premin_content = html_premin_content + "<script type=\"text/worker\">\n" + js_premin_content + "\n</script>"

    # Write the pre-minified files
    with open(html_js_premin_path, "w") as html_js_premin_f:
        html_js_premin_f.write(html_js_premin_content)

    with open(css_premin_path, "w") as css_premin_f:
        css_premin_f.write(css_premin_content)

    with open(options_path, "w") as options_f:
        options_f.write(options_content)

    # Render minified content
    html_min_content = htmlmin.minify(html_premin_content,
       remove_comments=True,
       remove_empty_space=True,
       remove_all_empty_space=False,
       reduce_empty_attributes=True,
       reduce_boolean_attributes=True,
       remove_optional_attribute_quotes=False,
       convert_charrefs=True,
       keep_pre=False,
       pre_tags=(u'pre', u'textarea'),
       pre_attr='pre'
    )
    js_min_content = rjsmin.jsmin(js_premin_content, keep_bang_comments=False)
    css_min_content = rcssmin.cssmin(css_premin_content)
    html_js_min_content = html_min_content + '<script type="text/worker">' + js_min_content + '</script>'

    # Write minified files
    with open(html_js_min_path, "w") as html_js_min_f:
        html_js_min_f.write(html_js_min_content)

    with open(css_min_path, "w") as css_min_f:
        css_min_f.write(css_min_content)

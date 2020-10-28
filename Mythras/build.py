#!/usr/bin/env python3
import re
from pathlib import Path
from jinja2 import Environment, FileSystemLoader
import json
import htmlmin
import rjsmin
import rcssmin
import keyring
import argparse
import getpass
import sys
import requests

REPOPATH = Path(__file__).resolve().parent.parent
SRCPATH = Path(__file__).resolve().parent

template_file_loader = FileSystemLoader(Path(SRCPATH, 'templates'))
template_env = Environment(loader=template_file_loader)

# Parse uploader arguments
parser = argparse.ArgumentParser(description='Build Mythras based character sheets from the source templates and optionally upload them to campaigns for testing.')
parser.add_argument("-u", "--username", action="store", help='Username to authenticate to Roll20 with')
parser.add_argument("-k", "--keyring", action="store_true", help="Use the desktop's keyring service to store the Roll20 password for future use")
parser.add_argument("--reset-keyring", action="store_true", dest="reset_keyring", help='Will replace the existing keyring password with the one provided at the prompt, should be used with --keyring')
parser.add_argument('--upload', action='append',nargs=2, metavar=('sheet_name','campaign_id'),help='Take the name of a sheet and a Roll20 campaign ID to upload it to, can be used multiple times')
args = parser.parse_args()

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
    with open(html_js_premin_path, "w", encoding="utf-8") as html_js_premin_f:
        html_js_premin_f.write(html_js_premin_content)

    with open(css_premin_path, "w", encoding="utf-8") as css_premin_f:
        css_premin_f.write(css_premin_content)

    with open(options_path, "w", encoding="utf-8") as options_f:
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
    with open(html_js_min_path, "w", encoding="utf-8") as html_js_min_f:
        html_js_min_f.write(html_js_min_content)

    with open(css_min_path, "w", encoding="utf-8") as css_min_f:
        css_min_f.write(css_min_content)

if args.upload:
    if args.username:
        roll20_user = args.username
    else:
        roll20_user = input("Roll20 username: ")

    if args.keyring:
        roll20_pass = keyring.get_password("mythras-Roll20", roll20_user)
        if roll20_pass == None or args.reset_keyring:
            roll20_pass = getpass.getpass("Roll20 password: ")
            keyring.set_password("mythras-Roll20", roll20_user, roll20_pass)
    else:
        roll20_pass = getpass.getpass("Roll20 password: ")

    for upload in args.upload:
        upload_sheet = upload[0]
        campaign_id = upload[1]

        html_js_min_path = Path(REPOPATH, "{}".format(upload_sheet), "{}.min.html".format(upload_sheet))
        css_min_path = Path(REPOPATH, "{}".format(upload_sheet), "{}.min.css".format(upload_sheet))

        if not upload_sheet in sheet_configs:
            print("Error: Upload sheet {} not found in sheets config file.".format(upload_sheet), file=sys.stderr)
            sys.exit(1)

        login_data = {'email': roll20_user, 'password': roll20_pass}
        roll20session = requests.Session()
        login_result = roll20session.post('https://app.roll20.net/sessions/create', login_data)
        if login_result:
            print("Roll20 login successful.")
        else:
            print("Error logging into Roll20!", file=sys.stderr)
            exit(1)

        with open(html_js_min_path, 'r') as html_file:
            html_src = html_file.read()

        with open(css_min_path, 'r') as css_file:
            css_src = css_file.read()

        with open('translation.json', 'r') as translation_file:
            translation_src = translation_file.read()

        sheet_data = {
            'publicaccess': 'true',
            'bgimage': 'none',
            'allowcharacterimport': 'true',
            'scale_units': 'ft',
            'grid_type': 'square',
            'diagonaltype': 'foure',
            'bar_location': 'above',
            'barStyle': 'standard',
            'compendium_override': '',
            'sharecompendiums': 'false',
            'charsheettype': 'custom',
            'customcharsheet_layout': html_src,
            'customcharsheet_style': css_src,
            'customcharsheet_translation': translation_src
        }
        upload_result = roll20session.post("https://app.roll20.net/campaigns/savesettings/{}".format(campaign_id),
                                           sheet_data)
        if upload_result:
            print("{} uploaded successfully to campaign {}.".format(upload_sheet, campaign_id))
        else:
            print("Error uploading {} to campaign {}!".format(upload_sheet, campaign_id))
            exit(2)

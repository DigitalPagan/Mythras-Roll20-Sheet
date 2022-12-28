const debug=1

/* Campaign Options */
const campaignSettings = ["extended_conflict_enabled", "tenacity_enabled"]
const campaginSettingDefaults = {
    "default": {
        "extended_conflict_enabled": 0,
        "tenacity_enabled": 0
    },
    "luther_arkwright": {
        "tenacity_enabled": 1
    },
    "m-space": {
        "extended_conflict_enabled": 1
    },
    "odd_soot": {
        "extended_conflict_enabled": 1
    },
    "worlds_united": {
        "tenacity_enabled": 1
    }
}
/**
 * Will either return the campaignSettingOption if overridden, otherwise will get the setting default value
 * @param campaignSetting the variable name of the campaign setting
 * @param campaignSettingOption the value of the campaign setting option variable
 * @param setting the selected campaign setting
 * @returns {*} object of new calculated attributes
 */
function calcCampaignSetting(campaignSetting, campaignSettingOption, setting) {
    if (campaignSettingOption === 'default') {
        if ((setting in campaginSettingDefaults) && (campaignSetting in campaginSettingDefaults[setting])) {
            return {[`${campaignSetting}`]: campaginSettingDefaults[setting][campaignSetting]};
        } else {
            return {[`${campaignSetting}`]: campaginSettingDefaults['default'][campaignSetting]};
        }
    } else {
        return {[`${campaignSetting}`]: campaignSettingOption};
    }
}
/* Trigger setting change */
on(`change:setting`, function(event) {
    /* Get an array of option values to get */
    const campaignSettingOptions = campaignSettings.map(function(campaignSetting){
        return `${campaignSetting}_option`;
    })
    getAttrs(campaignSettingOptions, function(v) {
        let newAttrs = {};
        campaignSettings.forEach(campaignSetting => { /* Gather all setting values per new setting */
            newAttrs = {...newAttrs,
                ...calcCampaignSetting(campaignSetting, v[`${campaignSetting}_option`], event.newValue)
            }
        });
        setAttrs(newAttrs);
    });
});
/* Trigger for all the individual campaign setting option values */
campaignSettings.forEach(campaignSetting => {
    on(`change:${campaignSetting}_option`, function(event) {
        getAttrs(['setting'], function(v) {
            setAttrs(calcCampaignSetting(`${campaignSetting}`, event.newValue, v['setting']));
        });
    });
});

/* Type Specific Scripts */
{% include 'sheet_types/character/character.js' %}


/* Versioning */
/**
 * Compares current sheet version to latest and performs necessary changes to bring the sheet up to date
 * @param type the sheet type attribute
 * @param version the sheet version already parse to a float or 0 if not a valid float
 */
function versioning(type, version) {
    const latestVersion = '3.0';
    if (debug) {console.log(`Current sheet version = ${version}`);}
    version = parseFloat(version) || 0;
    /* Eval sheet version and run upgrade functions as needed, note we have dropped functions of old versions */
    if(version === 0) {
        if (debug) {console.log(`Current version invalid, setting to ${latestVersion}`);}
        setAttrs({['version']: latestVersion});
    } else if (version < 3.0) {
        if (type === 'pc') {upgradeCharacter3Dot0();}
        versioning(type, '3.0');
    }
}

/**
 * Sets a number of attributes containing translations for prompts which normally can't use the i18n systems
 * @returns {} an object of translation attributes
 */
function setTranslationAttrs() {
    setAttrs(
        {}
    );
}

/* On Open Triggers */
on("sheet:opened", function() {
    getAttrs(['type', 'version'], function(v) {
        versioning(v['type'], v['version']);
    });
    setTranslationAttrs();
});
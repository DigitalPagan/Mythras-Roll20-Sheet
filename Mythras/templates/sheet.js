const debug=1

/* TODO changing sheet type sets hit table rolls */

/* Campaign Options */
const campaignSettings = ["action_points_calc", "extended_conflict_enabled", "herculean_mod", "luck_points_rank", "magic_points_enabled", "prana_points_enabled", "power_points_enabled", "reach_enabled", "simplified_combat_enabled", "tenacity_enabled"];
const campaginSettingDefaults = {
    "default": {
        "action_points_calc": "calculate",
        "extended_conflict_enabled": 0,
        "herculean_mod": ".1",
        "luck_points_rank": 0,
        "magic_points_enabled": 1,
        "prana_points_enabled": 0,
        "power_points_enabled": 0,
        "reach_enabled": 1,
        "simplified_combat_enabled": 0,
        "tenacity_enabled": 0
    },
    "classic_fantasy": {
        "luck_points_rank": 1
    },
    "destined": {
        "magic_points_enabled": 0,
        "power_points_enabled": 1
    },
    "luther_arkwright": {
        "tenacity_enabled": 1,
        "magic_points_enabled": 0,
        "prana_points_enabled": 1
    },
    "m-space": {
        "action_points_calc": "set_2",
        "extended_conflict_enabled": 1,
        "herculean_mod": ".2",
        "magic_points_enabled": 0,
        "power_points_enabled": 1,
        "reach_enabled": 0
    },
    "mythras_imperative": {
        "action_points_calc": "set_2",
        "herculean_mod": ".2",
        "reach_enabled": 0
    },
    "odd_soot": {
        "action_points_calc": "set_2",
        "extended_conflict_enabled": 1,
        "herculean_mod": ".2",
        "reach_enabled": 0
    },
    "worlds_united": {
        "magic_points_enabled": 0,
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

/* Option Bar Action Buttons */
on('clicked:reset-augmentation', function(event) {
    setAttrs({set_augmentation: 0});
});
on('clicked:reset-penalty', function(event) {
    setAttrs({set_penalty: 0});
});

/* Utility Functions */
function damageTable(step, damage_mod=false) {
    const stepAbs = Math.abs(step);
    const die_steps = [0, '1d2','1d4','1d6','1d8'];
    const d10s = Math.floor(stepAbs/5);
    const damageModd10s = Math.floor((stepAbs-1)/5);
    const notd10s = stepAbs % 5; // % calculates remainder after division.
    const notDamageModd10s = (stepAbs-1) % 5; // % calculates remainder after division.
    let mod;
    if (damage_mod) {
        // Damage mod table has an extra step with 1d12 others don't have for some reason
        if (stepAbs <= 5) {
            mod = (d10s ? `${d10s}d10` : '') + (d10s && notd10s ? '+' : '') + (notd10s ? die_steps[notd10s] : (d10s ? '' : 0));
        } else if (stepAbs === 6) {
            mod = '1d12';
        } else if (stepAbs === 7) {
            mod = '2d6';
        } else if (stepAbs === 8) {
            mod = '1d8+1d6';
        } else if (stepAbs === 9) {
            mod = '2d8';
        } else if (stepAbs === 10) {
            mod = '1d10+1d8';
        } else {
            mod = (damageModd10s ? `${damageModd10s}d10` : '') + (damageModd10s && notDamageModd10s ? '+' : '') + (notDamageModd10s ? die_steps[notDamageModd10s] : (damageModd10s ? '' : 0));
        }
    } else {
        // Damage table for spirit damage, wrack and other things which skip the 1d12
        if (stepAbs === 6) {
            mod = '2d6';
        } else if (stepAbs === 7) {
            mod = '1d8+1d6';
        } else if (stepAbs === 8) {
            mod = '2d8';
        } else if (stepAbs === 9) {
            mod = '1d10+1d8';
        } else {
            mod = (d10s ? `${d10s}d10` : '') + (d10s && notd10s ? '+' : '') + (notd10s ? die_steps[notd10s] : (d10s ? '' : 0));
        }
    }

    if (step >= 0) {
        return mod;
    } else {
        return '-' + mod;
    }
}

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
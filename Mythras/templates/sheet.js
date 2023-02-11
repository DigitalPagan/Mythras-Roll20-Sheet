const debug=1

/* TODO changing sheet type sets hit table rolls */
/* TODO changing sheet type sets standard skills display */

/* Campaign Options */
const campaignSettings = ["ability_system", "action_points_calc", "dependencies_enabled", "extended_conflict_enabled", "herculean_mod", "luck_points_rank", "reach_enabled", "simplified_combat_enabled", "social_conflict_enabled", "special_effects", "spirits_enabled", "tenacity_enabled"];
const campaginSettingDefaults = {
    "default": {
        "ability_system": "core",
        "action_points_calc": "calculate",
        "dependencies_enabled": 0,
        "extended_conflict_enabled": 0,
        "herculean_mod": ".1",
        "luck_points_rank": 0,
        "reach_enabled": 1,
        "simplified_combat_enabled": 0,
        "shaping_traits": "^{combine}: @{shaped_combine}\n^{duration}: @{shaped_duration}\n^{magnitude}: @{shaped_magnitude}\n^{range}: @{shaped_range}\n^{targets}: @{shaped_targets}",
        "spirits_enabled": 1,
        "standard_skills": ['athletics','boating','brawn','conceal','customs','dance','deceit','drive','endurance','evade','first_aid','influence','insight','locale','native_tongue','perception','ride','sing','stealth','swim','unarmed','willpower'],
        "social_conflict_enabled": 1,
        "special_effects": "core",
        "tenacity_enabled": 0,
        "traditions_enabled": 1
    },
    "after_the_vampire_wars": {
        "ability_system": "after_the_vampire_wars",
        "shaping_traits": "^{combine}: @{shaped_combine}\n^{duration}: @{shaped_duration} | ^{extended}: @{extended_duration}\n^{magnitude}: @{shaped_magnitude}\n^{range}: @{shaped_range} | ^{sympathetic}: @{sympathetic_range}\n^{targets}: @{shaped_targets}",
    },
    "classic_fantasy": {
        "ability_system": "classic_fantasy",
        "luck_points_rank": 1
    },
    "destined": {
        "ability_system": "destined",
        "spirits_enabled": 0,
        "special_effects": "destined",
        "standard_skills": ['athletics','brawn','conceal','deceit','drive','endurance','evade','first_aid','influence','insight','perception','research','stealth','streetwise','unarmed','willpower']
    },
    "fioracitta": {},
    "luther_arkwright": {
        "ability_system": "luther_arkwright",
        "dependencies_enabled": 1,
        "spirits_enabled": 0,
        "standard_skills": ['athletics','brawn','conceal','customs','dance','deceit','endurance','evade','first_aid','home_parallel','influence','insight','native_tongue','perception','ride','sing','stealth','swim','unarmed','willpower'],
        "tenacity_enabled": 1
    },
    "lyonesse": {
        "ability_system": "lyonesse",
        "special_effects": "lyonesse",
        "standard_skills": ['athletics','boating','brawn','common_tongue','conceal','customs','dance','deceit','drive','eloquence','endurance','evade','first_aid','folk_lore','influence','insight','perception','ride','sing','stealth','swim','unarmed','willpower']
    },
    "m-space": {
        "ability_system": "m-space",
        "action_points_calc": "set_2",
        "extended_conflict_enabled": 1,
        "herculean_mod": ".2",
        "reach_enabled": 0,
        "special_effects": "imperative",
        "spirits_enabled": 0
    },
    "monster_island": {},
    "mythic_babylon": {
        "ability_system": "mythic_babylon",
        "shaping_traits": " ",
        "standard_skills": ['athletics','boating','brawn','commerce','conceal','customs','dance','deceit','drive','endurance','evade','first_aid','gaming','influence','insight','locale','native_tongue','perception','purity','ride','sing','stealth','swim','unarmed','willpower']
    },
    "mythic_britain": {
        "ability_system": "mythic_britain",
        "standard_skills": ['athletics','boating','brawn','conceal','customs','dance','deceit','drive','endurance','evade','first_aid','influence','insight','locale','native_tongue','perception','ride','sing','stealth','superstition','swim','unarmed','willpower']
    },
    "mythic_constantinople": {},
    "mythras_imperative": {
        "ability_system": "mythra_imperative",
        "action_points_calc": "set_2",
        "herculean_mod": ".2",
        "reach_enabled": 0,
        "special_effects": "imperative",
        "spirits_enabled": 0
    },
    "mythic_rome": {
        "ability_system": "mythic_rome",
        "spirits_enabled": 0,
        "standard_skills": ['athletics','boating','brawn','conceal','customs','dance','deceit','drive','endurance','evade','first_aid','influence','insight','locale','native_tongue','perception','ride','status','sing','stealth','swim','unarmed','willpower']
    },
    "odd_soot": {
        "ability_system": "odd_soot",
        "action_points_calc": "set_2",
        "extended_conflict_enabled": 1,
        "herculean_mod": ".2",
        "reach_enabled": 0,
        "special_effects": "imperative",
        "spirits_enabled": 0
    },
    "perceforest": {
        "shaping_traits": "^{combine}: @{shaped_combine}\n^{duration}: @{shaped_duration}\n^{magnitude}: @{shaped_magnitude}\n^{range}: @{shaped_range}\n^{targets}: @{shaped_targets}\n^{wonders}: @{shaped_wonders}"
    },
    "thennla": {
        "ability_system": "thennla",
    },
    "worlds_united": {
        "ability_system": "worlds_united",
        "tenacity_enabled": 1,
        "spirits_enabled": 0
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
        /* Set the default shaping traits per setting */
        if (event.newValue in campaginSettingDefaults && 'shaping_traits' in campaginSettingDefaults[event.newValue]) {
            newAttrs['shaping_traits'] = campaginSettingDefaults[event.newValue]['shaping_traits'];
        } else {
            newAttrs['shaping_traits'] = campaginSettingDefaults['default']['shaping_traits'];
        }
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
const damageSteps = ['1d2','1d4','1d6','1d8','1d10','2d6','1d8+1d6','2d8','1d10+1d8','2d10','2d10+1d2','2d10+1d4',
    '2d10+1d6','2d10+1d8','3d10','3d10+1d2','3d10+1d4']
function damageTable(step) {
    if (step < 0) {
        return damageSteps[0];
    } else if (step > 16) {
        return damageSteps[16];
    } else {
        return damageSteps[step];
    }
}
const damageStepsReverse = {'1d2': 0, '1d4': 1, '1d6': 2, '1d8': 3, '1d10': 4, '2d6': 5, '1d8+1d6': 6, '2d8': 7,
    '1d10+1d8': 8, '2d10': 9, '2d10+1d2': 10, '2d10+1d4': 11, '2d10+1d6': 12, '2d10+1d8': 13, '3d10': 14,
    '3d10+1d2': 15, '3d10+1d4': 16
}
function damageTableReverse(value) {
    if (!(value in damageStepsReverse) && value.startsWith('-')) {
        return 0;
    } else if (!(value in damageStepsReverse) && !value.startsWith('-')) {
        return 22;
    } else {
        return damageStepsReverse[value];
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
const i18nVars = ['ablation', 'area', 'casting_time', 'combine', 'condition', 'conditions', 'days', 'dose', 'doses', 'duration', 'effects', 'enhance', "focus", 'fortune', 'hours', 'intensity', 'magnitude', 'months', 'none', 'precision', 'radius', 'range', 'rolls', 'rounds', 'service', 'services', 'shelf_life', 'spells', 'step', 'steps', 'swiftness', 'target', 'targets', 'term', 'terms', 'touch', 'turns', 'weeks', 'wonder', 'wonders', 'years'];
function setTranslationAttrs() {
    let i18nAttrs = {};
    i18nVars.forEach(i18nVar => {
        i18nAttrs[`${i18nVar}_i18n`] = getTranslationByKey(i18nVar);
    });
    /* ones that don't match the key pattern */
    i18nAttrs['point_a_i18n'] = getTranslationByKey('point-a');
    i18nAttrs['points_a_i18n'] = getTranslationByKey('points-a');
    i18nAttrs['pow_u_i18n'] = getTranslationByKey('pow-u');
    i18nAttrs['minutes_a_i18n'] = getTranslationByKey('minutes-a');
    i18nAttrs['meters_a_i18n'] = getTranslationByKey('meters-a');
    i18nAttrs['kilometers_a_i18n'] = getTranslationByKey('kilometers-a');
    setAttrs(i18nAttrs);
}

/* On Open Triggers */
on("sheet:opened", function() {
    getAttrs(['type', 'version'], function(v) {
        versioning(v['type'], v['version']);
    });
    setTranslationAttrs();
});
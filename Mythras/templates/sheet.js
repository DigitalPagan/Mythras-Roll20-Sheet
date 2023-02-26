const debug=1

/* Campaign Options */
const campaignSettings = ["ability_system", "action_points_calc", "affiliations_enabled", "dependencies_enabled", "extended_conflict_enabled", "herculean_mod", "luck_points_rank", "reach_enabled", "simplified_combat_enabled", "social_conflict_enabled", "special_effects", "spirits_enabled", "tenacity_enabled"];
const campaginSettingDefaults = {
    "default": {
        "ability_system": "core",
        "action_points_calc": "calculate",
        "affiliations_enabled": 0,
        "dependencies_enabled": 0,
        "extended_conflict_enabled": 0,
        "herculean_mod": ".1",
        "luck_points_rank": 0,
        "reach_enabled": 1,
        "simplified_combat_enabled": 0,
        "shaping_traits": "^{combine}: @{shaped_combine}\n^{duration}: @{shaped_duration}\n^{magnitude}: @{shaped_magnitude}\n^{range}: @{shaped_range}\n^{targets}: @{shaped_targets}",
        "spirits_enabled": 1,
        "standard_skills": ['athletics','boating','brawn','conceal','customs','dance','deceit','drive','endurance','evade','first_aid','influence','insight','locale','native_tongue','perception','ride','sing','spectral_combat','stealth','swim','unarmed','willpower'],
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
        "standard_skills": ['athletics','brawn','conceal','deceit','drive','endurance','evade','first_aid','influence','insight','perception','research','spectral_combat','stealth','streetwise','unarmed','willpower']
    },
    "fioracitta": {},
    "luther_arkwright": {
        "ability_system": "luther_arkwright",
        "dependencies_enabled": 1,
        "spirits_enabled": 0,
        "standard_skills": ['athletics','brawn','conceal','customs','dance','deceit','endurance','evade','first_aid','home_parallel','influence','insight','native_tongue','perception','ride','sing','spectral_combat','stealth','swim','unarmed','willpower'],
        "tenacity_enabled": 1
    },
    "lyonesse": {
        "ability_system": "lyonesse",
        "special_effects": "lyonesse",
        "standard_skills": ['athletics','boating','brawn','common_tongue','conceal','customs','dance','deceit','drive','eloquence','endurance','evade','first_aid','folk_lore','influence','insight','perception','ride','sing','spectral_combat','stealth','swim','unarmed','willpower']
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
        "standard_skills": ['athletics','boating','brawn','commerce','conceal','customs','dance','deceit','drive','endurance','evade','first_aid','gaming','influence','insight','locale','native_tongue','perception','purity','ride','sing','spectral_combat','stealth','swim','unarmed','willpower']
    },
    "mythic_britain": {
        "ability_system": "mythic_britain",
        "standard_skills": ['athletics','boating','brawn','conceal','customs','dance','deceit','drive','endurance','evade','first_aid','influence','insight','locale','native_tongue','perception','ride','sing','spectral_combat','stealth','superstition','swim','unarmed','willpower']
    },
    "mythic_constantinople": {
        "affiliations_enabled": 1
    },
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
        "standard_skills": ['athletics','boating','brawn','conceal','customs','dance','deceit','drive','endurance','evade','first_aid','influence','insight','locale','native_tongue','perception','ride','status','sing','spectral_combat','stealth','swim','unarmed','willpower']
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

/* Sheet Type Triggers */
on("change:sheet_type", function(event) {
    if (event.sourceType === "sheetworker") {return;}
    if (event.sourceAttribute === 'sheet_type') {
        getAttrs(['pow', 'cha'].concat(spiritDamageGetAttrs), function(v) {
            let newAttrs = {};

            /* Set hit table rolls */
            if (event.newValue === 'pc' || event.newValue === 'creature') {
                newAttrs['hit_location_roll'] = '@{creature_hit_location_roll}';
                newAttrs['hit_location_low_roll'] = '@{creature_hit_location_roll}';
                newAttrs['hit_location_high_roll'] = '@{creature_hit_location_roll}';
            } else {
                newAttrs['hit_location_roll'] = '@{none_hit_location_roll}';
                newAttrs['hit_location_low_roll'] = '@{none_hit_location_roll}';
                newAttrs['hit_location_high_roll'] = '@{none_hit_location_roll}';
            }

            /* Set standard skills posessed to sheet_type defaults and set default attribute_mode */
            if (event.newValue === "pc") {
                newAttrs['attribute_mode'] = 'physical';
                stdSkillIds.forEach(skillId => {
                    newAttrs[`${skillId}_possessed`] = 1;
                });
            } else if (event.newValue === "creature" || event.newValue === "spirit") {
                stdSkillIds.forEach(skillId => {
                    newAttrs[`${skillId}_possessed`] = 0;
                });
                if (event.newValue === "creature") {
                    newAttrs['attribute_mode'] = 'physical';
                    newAttrs['athletics_possessed'] = 1;
                    newAttrs['brawn_possessed'] = 1;
                    newAttrs['endurance_possessed'] = 1;
                    newAttrs['evade_possessed'] = 1;
                    newAttrs['perception_possessed'] = 1;
                    newAttrs['willpower_possessed'] = 1;
                } else {
                    newAttrs['attribute_mode'] = 'spiritual';
                    newAttrs['spectral_combat_possessed'] = 1;
                    newAttrs['willpower_possessed'] = 1;
                }
            }

            /* Set default spirit combat skill */
            const pow = parseInt(v['pow']) || 0;
            if (event.newValue === "pc" || event.newValue === "creature") {
                newAttrs['willpower'] = pow * 2;
                newAttrs['willpower_other'] = 0;
                newAttrs['willpower_notes'] = '';
                newAttrs['spirit_combat_skill_id'] = 'willpower';
                newAttrs['spirit_combat_skill_name'] = getTranslationByKey('willpower');
                newAttrs['spirit_combat_skill_total'] = pow * 2;
                newAttrs['spirit_combat_skill_notes'] = '';
            } else if (event.newValue === "spirit") {
                const cha = parseInt(v['cha']) || 0;
                newAttrs['willpower'] = pow * 2 + 50;
                newAttrs['willpower_other'] = 50;
                newAttrs['willpower_notes'] = '';
                newAttrs['spirit_combat_skill_id'] = 'spectral_combat';
                newAttrs['spirit_combat_skill_name'] = getTranslationByKey('spectral_combat');
                newAttrs['spirit_combat_skill_total'] = pow + cha + 50;
                newAttrs['spirit_combat_skill_notes'] = '';
            }

            setAttrs({
                ...newAttrs,
                ...calcSpiritDamage({...v, ...newAttrs})
            });
        });
    }
});

/* Option Bar Action Buttons */
on('clicked:reset-augmentation', function(event) {
    setAttrs({set_augmentation: 0});
});
on('clicked:reset-penalty', function(event) {
    setAttrs({set_penalty: 0});
});

/* Utility Functions */
function damageModTable(step) {
    const stepAbs = Math.abs(step);
    const die_steps = [0, '1d2','1d4','1d6','1d8'];
    const d10s = Math.floor(stepAbs/5);
    const damageModd10s = Math.floor((stepAbs-1)/5);
    const notd10s = stepAbs % 5; // % calculates remainder after division.
    const notDamageModd10s = (stepAbs-1) % 5; // % calculates remainder after division.
    let mod;
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

    if (step >= 0) {
        return mod;
    } else {
        return '-' + mod;
    }
}

/* The damage table differs slightly from the damageModTable because damage mod has an extra step of 1d12. */
function damageTable(step) {
    const stepAbs = Math.abs(step);
    const die_steps = [0, '1d2','1d4','1d6','1d8'];
    const d10s = Math.floor(stepAbs/5);
    const notd10s = stepAbs % 5; // % calculates remainder after division.
    let mod;
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

    if (step >= 0) {
        return mod;
    } else {
        return '-' + mod;
    }
}

/* Type Specific Scripts */
{% include 'sheet_types/character/character.js' %}
{% include 'sheet_types/character/character_import.js' %}
{% include 'sheet_types/character/character_versioning.js' %}


/* Versioning */
/**
 * Compares current sheet version to latest and performs necessary changes to bring the sheet up to date
 * @param sheet_type the sheet sheet_type attribute
 * @param version the sheet version already parse to a float or 0 if not a valid float
 */
function versioning(sheet_type, version) {
    const latestVersion = '3.0';
    if (debug) {console.log(`Current sheet version = ${version}`);}
    version = parseFloat(version) || 0;
    /* Eval sheet version and run upgrade functions as needed, note we have dropped functions of old versions */
    if(version === 0) {
        if (debug) {console.log(`Current version invalid, setting to ${latestVersion}`);}
        setAttrs({['version']: latestVersion});
    } else if (version < 3.0) {
        if (sheet_type === 'pc') {upgradeCharacter3Dot0();}
        versioning(sheet_type, '3.0');
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
    return i18nAttrs;
}

/* On Open Triggers */
on("sheet:opened", function() {
    /* TODO replace with sheet_type after v4 release */
    getAttrs(['type', 'version', 'character_id'], function(v) {
        versioning(v['type'], v['version']);
        let newAttrs = setTranslationAttrs();
        /* Was seeing errors in the console about not being able to eval @{character_id} for some formula, but it did seem to actually work.
        Adding this to specifically set the value in the sheet to avoid those errors just to be safe.
         */
        newAttrs['character_id'] = v['character_id'];
        setAttrs(newAttrs);
    });

});
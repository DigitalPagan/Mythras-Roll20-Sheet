/* Characteristics */
const characteristicAttrs = ['str', 'con', 'siz', 'dex', 'int', 'pow', 'cha'];
characteristicAttrs.forEach(char => {
    on(`change:${char}_base change:${char}_temp`, function(event) {
        if (event.sourceType === "sheetworker") {return;}

        let newAttrs = {}
        getAttrs([`${char}_base`, `${char}_temp`].concat(characteristicAttrs, actionPointGetAttrs), function(v) {
            const baseCharVal = parseInt(v[`${char}_base`]) || 0;
            const tempCharVal = parseInt(v[`${char}_temp`]) || 0;
            newAttrs[`${char}`] = baseCharVal + tempCharVal;
            v[`${char}`] = baseCharVal + tempCharVal; /* override the old value from getAttr, so we can base other calculations on the new value */

            let actionPointAttrs = {}
            if (char === 'dex' || char === 'int') {
                actionPointAttrs = calcActionPoints(v);
            }

            setAttrs({
                ...newAttrs,
                ...actionPointAttrs
            });
        });
    });
});

/* Action Points */
const actionPointGetAttrs = ['dex', 'int', 'action_points_other', 'action_points_temp', 'action_points_calc', 'action_points', 'action_points_max', 'fatigue']
function calcActionPoints(v) {
    let base_value;
    const dex = parseInt(v['dex']) || 0;
    const int = parseInt(v['int']) || 0;
    const action_points_other = parseInt(v['action_points_other']) || 0;
    const action_points_temp = parseInt(v['action_points_temp']) || 0;
    const action_points_max = parseInt(v['action_points_max']) || 0;
    const action_points = parseInt(v['action_points']) || 0;
    const fatigueMod = parseInt(fatigueTable[v['fatigue']]['action_points']) || 0;

    if (v['action_points_calc'] === "set_2") {
        base_value = 2 + action_points_other;
    } else if (v['action_points_calc'] === "set_3") {
        base_value = 3 + action_points_other;
    } else {
        base_value = Math.ceil((int + dex) / 12) + action_points_other;
    }

    let new_action_points_max = base_value + action_points_temp + fatigueMod;
    if (new_action_points_max < 0) {
        new_action_points_max = 0;
    }
    const diff_action_points_max = new_action_points_max - action_points_max;

    return {
        action_points_base: base_value,
        action_points_max: new_action_points_max,
        action_points: action_points + diff_action_points_max
    };
}
/* TODO Trigger for fatigue */
on('change:action_points_other change:action_points_temp', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(actionPointGetAttrs, function(v) {
        setAttrs(calcActionPoints(v));
    });
});
on('change:action_points_calc', function(event) {
    /* Don't exit on sheetworker cause humans will modify the option not the setting itself */
    getAttrs(actionPointGetAttrs, function(v) {
        setAttrs(calcActionPoints(v));
    });
});

/* Fatigue */
const fatigueTable = {
    /* fresh */ '9': { "skills": '0', "action_points": '0', "initiative": '0', "movement": "+0", "recovery": "-"},
    /* winded */ '8': { "skills": '1', "action_points": '0', "initiative": '0', "movement": '-1', "recovery": .25},
    /* tired */ '7': { "skills": '1', "action_points": '0', "initiative": '0', "movement": '-1', "recovery": 3},
    /* wearied */ '6': { "skills": '2', "action_points": '0', "initiative": '-2', "movement": '-2', "recovery": 6},
    /* exhausted */ '5': { "skills": '2', "action_points": '-1', "initiative": '-4', "movement": '*.5', "recovery": 12},
    /* debilitated */ '4': { "skills": '3', "action_points": '-2', "initiative": '-6', "movement": '*.5', "recovery": 18},
    /* incapacitated */ '3': { "skills": '3', "action_points": '-3', "initiative": '-8', "movement": '*0', "recovery": 24},
    /* semi-conscious */ '2': { "skills": '4', "action_points": '-99', "initiative": '-99', "movement": '*0', "recovery": 36},
    /* comatose */ '1': { "skills": '5', "action_points": '-99', "initiative": '-99', "movement": '*0', "recovery": 48},
    /* dead */ '0': { "skills": '5', "action_points": '-99', "initiative": '-99', "movement": '*0', "recovery": '-'}
};
/**
 * Calculated the fatigue recovery time
 * @param v attributes needed for calc, ['fatigue', 'healing_rate']
 * @returns {} with fatigue_recovery
 */
function calcFatigueRecovery(v) {
    let recoveryString = '';
    const healing_rate = parseInt(v['healing_rate']) || 2;
    if (fatigueTable[v['fatigue']]['recovery'] !== '-') {
        let recovery = parseFloat((fatigueTable[v['fatigue']]['recovery'] / healing_rate));

        /* Get the minutes portion */
        let recoveryFraction = recovery % 1;
        let recoveryMinutes = Math.round(recoveryFraction * 60);
        /* Get the hours portion */
        let recoveryHours = Math.floor(recovery);

        if (recoveryHours !== 0) {
            let hourUnit = getTranslationByKey('hours-l');
            if (recoveryHours === 1) {
                hourUnit = getTranslationByKey('hour-l');
            }
            recoveryString = recoveryHours + ' ' + hourUnit;
        }

        if (recoveryMinutes !== 0) {
            let minUnit = getTranslationByKey('minutes-l');
            if (recoveryMinutes === 1) {
                minUnit = getTranslationByKey('minute-l');
            }

            if (recoveryString === '') {
                recoveryString = recoveryMinutes + ' ' + minUnit;
            } else {
                recoveryString = recoveryString + " " + recoveryMinutes + ' ' + minUnit;
            }
        }
        return {fatigue_recovery: recoveryString};
    } else {
        return {fatigue_recovery: fatigueTable[v['fatigue']]['recovery']};
    }
}
/**
 * Sets the fatigue modifier values and recovery rate
 * @param v character attributes needed for calculation, ['fatigue', 'healing_rate']
 * @returns {*&{initiative_bonus_fatigue: *, movement_rate_fatigue: *, fatigue_skills: *, action_points_fatigue: *}}
 */
function calcFatigue(v) {
    return {
        fatigue_skills: fatigueTable[v['fatigue']]['skills'],
        action_points_fatigue: fatigueTable[v['fatigue']]['action_points'],
        initiative_bonus_fatigue: fatigueTable[v['fatigue']]['initiative'],
        movement_rate_fatigue: fatigueTable[v['fatigue']]['movement'],
        ...calcFatigueRecovery(v)
    };
}
on('change:fatigue', function(event) {
    if (event.sourceType === "sheetworker") {return;}

    getAttrs(['fatigue', 'healing_rate'].concat(actionPointGetAttrs), function(v) {
        setAttrs({
            ...calcFatigue(v),
            ...calcActionPoints(v)
        });
    });
});

/* Character Import */
/**
 * Sanitizes a name from import data to avoid bugs with buttons and macros in the sheet (removes parenthesis) and will
 * set the name to the character's actual name if a major character import or type if minor character import
 * @param importName
 * @param importType
 * @returns {string}
 */
function getImportName(importName, importType) {
    if (importName.includes('(')) {
        if (importType === 'major') {
            return importName.split('(')[0].replace(/[()]/g, '').trim();
        } else {
            let [start, ...end] = importName.split('(');
            end = end.join("(");
            return end.replace(/[()]/g, '').trim();
        }
    } else {
        return importName.replace(/[()]/g, '').trim();
    }
}

/**
 * Imports JSON data from the Mythras Encounter Generator or other sources which use the same data format
 */
on("clicked:import", function() {
    getAttrs(['import_json_data', 'import_character', 'import_type', 'simplified_combat_enabled', 'luck_points_rank', 'action_points_calc'], function(v) {
        try {
            const jsonData = JSON.parse(v['import_json_data']);
            const import_character = parseInt(v['import_character']);
            /* Check if the requested import character is out of range */
            if (import_character > jsonData.length) {
                setAttrs({
                    import_errors: "Error: The import data contains " + jsonData.length + " character(s) but you requested number " + import_character + "."
                });
                return;
            }
            const characterData = jsonData[parseInt(v['import_character']) - 1];

            let calc_armor_penalty = false;
            /* We assume defaults and fill in what the import doesn't provide */
            let newAttrs = {
                rank: 0,
                str_base: 0, str: 0,
                con_base: 0, con: 0,
                siz_base: 0, siz: 0,
                dex_base: 0, dex: 0,
                int_base: 0, int: 0,
                pow_base: 0, pow: 0,
                cha_base: 0, cha: 0,
                characteristics_details: 0,
                action_points_other: 0, action_points_temp: 0, action_points_calc: v['action_points_calc'], action_points: 2, action_points_max: 2,
                fatigue: '9'
            };

            /* Import Info */
            if (debug) {console.log('Importing Info');}
            /* Due to differences in parsing we will import name and species after sheet type */
            /* TODO: import cults & notes */

            /* Import Characteristics */
            if (debug) {
                console.log("Importing Characteristics");
            }
            characterData["stats"].forEach(stat => {
                const charKey = Object.keys(stat)[0];
                const char = charKey.toLowerCase();
                newAttrs[`${char}_base`] = stat[charKey];
                newAttrs[`${char}`] = stat[charKey];
            });

            if (debug) {
                console.log("Determining Import Sheet type");
            }
            /* Detect Sheet Character Type, Species, and name */
            if (v['import_type'] === 'major') {
                newAttrs['type'] = 'pc';
            } else {
                /* Elementals have str and dex but no siz and con, so we determine spirit by str and dex only */
                if (newAttrs['str_base'] === 0 && newAttrs['dex_base'] === 0) {
                    newAttrs['type'] = 'spirit';
                } else {
                    newAttrs['type'] = 'creature';
                }
            }
            newAttrs['character_name'] = getImportName(characterData['name'], v['import_type'])

            /* Import Action Points */
            const actionPointNewAttrs = calcActionPoints(newAttrs)

            /* Clear the import data */
            newAttrs['import_json_data'] = '';

            setAttrs({
                ...newAttrs,
                ...actionPointNewAttrs
            });
        } catch (error) {
            setAttrs({import_errors: error});
        }
    });
});

/* Character Versioning */
/**
 * Make the changes needs to get a character sheet updated from 2.7 to 3.0
 */
function upgradeCharacter3Dot0() {
    if (debug) {console.log("Upgrading character to 3.0");}
    let charGetAttrs = [];
    characteristicAttrs.forEach(char => { charGetAttrs.push(`${char}`, `${char}_temp`); });
    getAttrs(charGetAttrs.concat(['action_points_add_one']), function(v) {
        let newAttrs = {'version': '3.0'};

        /* Convert Characteristics base values */
        characteristicAttrs.forEach(char => {
            const charCurr = parseInt(v[`${char}`]) || 0;
            const charTemp = parseInt(v[`${char}_temp`]) || 0;
            newAttrs[`${char}_base`] = charCurr - charTemp;
        });

        /* Convert Action Points */
        if (v['action_points_add_one'] === '1') {
            newAttrs['action_points_other'] = 1;
        }

        /* Delete json import data due to size and not needing it anymore, v3 does this for us after import */
        newAttrs['encounter_generator_json'] = '';

        setAttrs(newAttrs);
    });
}
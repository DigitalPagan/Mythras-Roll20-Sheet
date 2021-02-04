/* Common Autocalc Constants */
const strGetAttrs = ['str_base', 'str_other', 'str_temp'];
const dexGetAttrs = ['dex_base', 'dex_other', 'dex_temp'];
const sizGetAttrs = ['siz_base', 'siz_other', 'siz_temp'];
const conGetAttrs = ['con_base', 'con_other', 'con_temp'];
const powGetAttrs = ['pow_base', 'pow_other', 'pow_temp'];
const intGetAttrs = ['int_base', 'int_other', 'int_temp'];
const chaGetAttrs = ['cha_base', 'cha_other', 'cha_temp'];
const allCharGetAttrs = strGetAttrs.concat(dexGetAttrs, sizGetAttrs, conGetAttrs, powGetAttrs, intGetAttrs, chaGetAttrs);

const armorGetAttrs = ['location1_armor_enc', 'location1_armor_equipped',
    'location2_armor_enc', 'location2_armor_equipped',
    'location3_armor_enc', 'location3_armor_equipped',
    'location4_armor_enc', 'location4_armor_equipped',
    'location5_armor_enc', 'location5_armor_equipped',
    'location6_armor_enc', 'location6_armor_equipped',
    'location7_armor_enc', 'location7_armor_equipped',
    'location8_armor_enc', 'location8_armor_equipped',
    'location9_armor_enc', 'location9_armor_equipped',
    'location10_armor_enc', 'location10_armor_equipped',
    'location11_armor_enc', 'location11_armor_equipped',
    'location12_armor_enc', 'location12_armor_equipped',
    'half_effective_armor_enc'];

const encGetAttrs = ['avg_species_siz', 'encumbrance_temp', 'pack_equipped', 'effective_armor_enc', 'armor_enc_carried',
    'weapons_enc', 'weapons_enc_carried', 'equipment_enc', 'equipment_enc_carried', 'currency_enc', 'currency_enc_carried'];

const charStdSkillIds = {
    str: ['athletics'],
    dex: ['athletics'],
    siz: [],
    con: [],
    pow: [],
    int: [],
    cha: []
};
const allStdSkillIds = Array.from(
    new Set(
        charStdSkillIds['str'].concat(charStdSkillIds['dex'], charStdSkillIds['siz'], charStdSkillIds['con'],
            charStdSkillIds['pow'], charStdSkillIds['int'], charStdSkillIds['cha'])
    )
);

const stdSkillChars = {
    'athletics': ['str', 'dex']
}



/* Character Tabs */
const charactertabs = ["all","core","abilities","equipment","background","notes","compact"];
charactertabs.forEach(button => {
    on(`clicked:character_tab_${button}`, function() {
        setAttrs({
            character_tab: button
        });
    });
});

/* Characteristics Function */
/**
 * @param {string}  base   The characteristic's base value from getAttrs.
 * @param {string}  other  The characteristic's other value from getAttrs.
 * @param {string}  temp   The characteristic's temp value from getAttrs.
 * @return {int}    The total value of the characteristic.
 */
function calcChar(base, other, temp) {
    return parseInt(base) + parseInt(other) + parseInt(temp);
}

/**
 * @param {Object}  v   The values from the trigger's getAttrs call.
 * @return {Object}     Object containing all calculated chars.
 */
function buildCharObj(v) {
    let charObj = {};

    ["str", "dex", "siz", "con", "pow", "int", "cha"].forEach(char => {
        charObj[`${char}`] = calcChar(v[`${char}_base`], v[`${char}_other`], v[`${char}_temp`]);
    });

    return charObj;
}

/* Skill Functions */
/**
 * @param {Array} ids   List of the standard skill ids to get attrs for.
 * @return {Array}      Array of the attrs to get for skill calc.
 */
function getStdSkillGetAttrs(ids) {
    let stdSkillGetAttrs = [];

    ids.forEach(id => {
        stdSkillGetAttrs.push(`${id}_other`)
    });

    return stdSkillGetAttrs;
}

/**
 * Calculates the value of multiple standard skills.
 *
 * @param {Array}   ids         List of standard skill ids to calculate values for.
 * @param {Object}  charObj     Pre-parsed char values.
 * @param {Object}  v           Values from trigger's getAttrs.
 *
 * @return {Object} The calculated skill values.
 */
function calcStdSkills(ids, charObj, v) {
    let newVals = {};
    ids.forEach(id => {
        newVals[`${id}_total`] = charObj[stdSkillChars[`${id}`][0]] + charObj[stdSkillChars[`${id}`][1]] + parseInt(v[`${id}_other`]);
    });
    return newVals;
}

function calcProSkillTotal(charObj, char1, char2, other) {
    let char1Val;
    let char2Val;
    switch(char1) {
        case '@{str}':
            char1Val = charObj['str'];
            break;
        case '@{dex}':
            char1Val = charObj['dex'];
            break;
        case '@{siz}':
            char1Val = charObj['siz'];
            break;
        case '@{con}':
            char1Val = charObj['con'];
            break;
        case '@{pow}':
            char1Val = charObj['pow'];
            break;
        case '@{int}':
            char1Val = charObj['int'];
            break;
        case '@{char}':
            char1Val = charObj['char'];
            break;
        case '21':
            char1Val = 21;
            break;
        default:
            char1Val = 0;
    }

    switch(char2) {
        case '@{str}':
            char2Val = charObj['str'];
            break;
        case '@{dex}':
            char2Val = charObj['dex'];
            break;
        case '@{siz}':
            char2Val = charObj['siz'];
            break;
        case '@{con}':
            char2Val = charObj['con'];
            break;
        case '@{pow}':
            char2Val = charObj['pow'];
            break;
        case '@{int}':
            char2Val = charObj['int'];
            break;
        case '@{char}':
            char2Val = charObj['char'];
            break;
        case '-@{str}':
            char2Val = -charObj['str'];
            break;
        case '-@{dex}':
            char2Val = -charObj['dex'];
            break;
        case '-@{siz}':
            char2Val = -charObj['siz'];
            break;
        case '-@{con}':
            char2Val = -charObj['con'];
            break;
        case '-@{pow}':
            char2Val = -charObj['pow'];
            break;
        case '-@{int}':
            char2Val = -charObj['int'];
            break;
        case '-@{char}':
            char2Val = -charObj['char'];
            break;
        default:
            char2Val = 0;
    }
    
    return char1Val + char2Val + parseInt(other);
}

function calcProSkillEncumbered(char1, char2) {
    let char1bool = false;
    let char2bool = false;

    if (char1 === '@{str}' || char1 === '@{dex}') {
        char1bool = true;
    }
    if (char2 === '@{str}' || char2 === '@{dex}' || char2 === '-@{str}' || char2 === '-@{dex}') {
        char2bool = true;
    }

    return char1bool || char2bool;
}

function calcProSkills(ids, charObj, v) {
    let newVals = {};
    ids.forEach(id => {
        const skillId = `repeating_professionalskill_${id}`;
        newVals[`${skillId}_total`] = calcProSkillTotal(charObj, v[`${skillId}_char1`], v[`${skillId}_char2`], v[`${skillId}_other`]);
        newVals[`${skillId}_encumbered`] = calcProSkillEncumbered(v[`${skillId}_char1`], v[`${skillId}_char2`]);
    });
    return newVals;
}

function calcArmorEncAndPenalty(v) {
    let newVals = {};
    let wornArmorEnc = 0;
    let packArmorEnc = 0;
    let effectiveArmorEncMod = 2;
    if (v['half_effective_armor_enc'] === '1') {
        effectiveArmorEncMod = 4;
    }

    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].forEach(location => {
        const locationEquipped = v[`location${location}_armor_equipped`];
        const locationEnc = parseFloat(v[`location${location}_armor_enc`]);
        if (locationEquipped === '1') {
            wornArmorEnc = wornArmorEnc + locationEnc;
        } else if (locationEquipped === '0') {
            packArmorEnc = packArmorEnc + locationEnc;
        }
    });
    const armorPenalty = 0-Math.ceil(wornArmorEnc / 5);
    newVals['armor_enc'] = parseFloat(wornArmorEnc.toFixed(2));
    newVals['effective_armor_enc'] = parseFloat(Math.ceil(wornArmorEnc / effectiveArmorEncMod).toFixed(2));
    newVals['armor_enc_carried'] = parseFloat(packArmorEnc.toFixed(2));
    newVals['armor_penalty'] = armorPenalty;
    return newVals;
}

function calcWeaponEnc(weaponIds, v) {
    let newVals = {};
    let wornWeaponEnc = 0;
    let packWeaponEnc = 0;
    weaponIds.forEach(id => {
        const weaponId = `repeating_weapon_${id}`;
        const weaponLocation = v[`${weaponId}_location`];
        const weaponEnc = parseFloat(v[`${weaponId}_enc`]);
        const weaponAmmoEnc = parseFloat(v[`${weaponId}_ammo`]) * parseInt(v[`${weaponId}_ammo_enc`]);
        const weaponClipEnc = parseFloat(v[`${weaponId}_clips`]) * parseInt(v[`${weaponId}_clip_enc`]);
        if (weaponLocation === 'worn') {
            wornWeaponEnc = wornWeaponEnc + weaponEnc + weaponAmmoEnc + weaponClipEnc;
        } else if (weaponLocation === 'pack') {
            packWeaponEnc = packWeaponEnc + weaponEnc + weaponAmmoEnc + weaponClipEnc;
        }
    });
    newVals['weapons_enc'] = parseFloat(wornWeaponEnc.toFixed(2));
    newVals['weapons_enc_carried'] = parseFloat(packWeaponEnc.toFixed(2));
    return newVals;
}

function calcGenericRepeatingEnc(ids, fieldName, v) {
    let newVals = {};
    let wornEnc = 0;
    let packEnc = 0;
    ids.forEach(id => {
        const itemId = `repeating_${fieldName}_${id}`;
        const location = v[`${itemId}_location`];
        const enc = parseFloat(v[`${itemId}_enc`]);
        const qty = parseInt(v[`${itemId}_quantity`]);
        if (location === 'loadout') {
            wornEnc = wornEnc + (enc * qty);
        } else if (location === 'pack') {
            packEnc = packEnc + (enc * qty);
        }
    });
    newVals[`${fieldName}_enc`] = parseFloat(wornEnc.toFixed(2));
    newVals[`${fieldName}_enc_carried`] = parseFloat(packEnc.toFixed(2));
    return newVals;
}

function calcEnc(str, v) {
    const wornEnc = parseFloat(v['effective_armor_enc']) + parseFloat(v['weapons_enc']) + parseFloat(v['equipment_enc']) +
        parseFloat(v['currency_enc']);
    console.log(wornEnc);
    const packEnc = (parseFloat(v['armor_enc_carried']) + parseFloat(v['weapons_enc_carried']) +
        parseFloat(v['equipment_enc_carried']) + parseFloat(v['currency_enc_carried'])) * parseInt(v['pack_equipped']);
    console.log(packEnc);
    const enc = parseFloat(((wornEnc + packEnc + parseFloat(v['encumbrance_temp']) ) * (parseInt(v['avg_species_siz']) / 13)).toFixed(2));
    const burdened = str * 2;
    const overloaded = str * 3;
    const enc_max = str * 4;
    console.log(enc);

    if (enc > enc_max) {
        return {
            encumbrance_load: "3",
            encumbrance_skills: "3",
            burdened_enc: burdened,
            overloaded_enc: overloaded,
            encumbrance_current: enc,
            encumbrance_current_max: enc_max,
            movement_rate_enc: "*0"
        };
    } else if (enc > overloaded) {
        return {
            encumbrance_load: "2",
            encumbrance_skills: "2",
            burdened_enc: burdened,
            overloaded_enc: overloaded,
            encumbrance_current: enc,
            encumbrance_current_max: enc_max,
            movement_rate_enc: "*.5"
        };
    } else if (enc > burdened) {
        return {
            encumbrance_load: "1",
            encumbrance_skills: "1",
            burdened_enc: burdened,
            overloaded_enc: overloaded,
            encumbrance_current: enc,
            encumbrance_current_max: enc_max,
            movement_rate_enc: "-2"
        };
    } else {
        return {
            encumbrance_load: "0",
            encumbrance_skills: "0",
            burdened_enc: burdened,
            overloaded_enc: overloaded,
            encumbrance_current: enc,
            encumbrance_current_max: enc_max,
            movement_rate_enc: "+0"
        };
    }
}

/* Characteristic Triggers */
['str', 'con','siz','int','pow','dex','cha'].forEach(char => {
    on(`change:${char}_base change:${char}_other change:${char}_temp`, function() {
        const stdSkillGetAttrs = getStdSkillGetAttrs(charStdSkillIds[char]);

        getSectionIDs("repeating_professionalskill", function(proSkillIds) {
            let proSkillGetAttrs = [];
            proSkillIds.forEach(id => {
                proSkillGetAttrs.push(`repeating_professionalskill_${id}_char1`, `repeating_professionalskill_${id}_char2`, `repeating_professionalskill_${id}_other`)
            });

            let getAttrArray = [];
            if (char === 'str') {
                getAttrArray = getAttrArray.concat(allCharGetAttrs, stdSkillGetAttrs, proSkillGetAttrs, encGetAttrs);
            } else {
                getAttrArray = getAttrArray.concat(allCharGetAttrs, stdSkillGetAttrs, proSkillGetAttrs);
            }

            getAttrs(getAttrArray, function(v) {
                const charObj = buildCharObj(v);
                const newStdSkillVals = calcStdSkills(charStdSkillIds[char], charObj, v);
                const newProSkillVals = calcProSkills(proSkillIds, charObj, v);

                if (char === 'str') {
                    const newEncVals = calcEnc(charObj[char], v);
                    setAttrs({
                        [char]: charObj[char],
                        ...newStdSkillVals,
                        ...newProSkillVals,
                        ...newEncVals
                    });
                } else {
                    setAttrs({
                        [char]: charObj[char],
                        ...newStdSkillVals,
                        ...newProSkillVals
                    });
                }
            });
        });
    });
});

/* Skill Triggers */
/* Standard Skill Totals */
allStdSkillIds.forEach(skillId => {
    on(`change:${skillId}_other`, function(event) {
        getAttrs(allCharGetAttrs.concat([`${skillId}_other`]), function(v) {
            let charObj = buildCharObj(v);
            let char1 = charObj[stdSkillChars[`${skillId}`][0]];
            let char2 = charObj[stdSkillChars[`${skillId}`][1]];

            setAttrs({
                [`${skillId}_total`]: char1 + char2 + parseInt(v[`${skillId}_other`])
            });
        });
    });
});

/* Professional Skill Total and Encumbered */
on("change:repeating_professionalskill:char1 change:repeating_professionalskill:char2 " +
    "change:repeating_professionalskill:other change:repeating_professionalskill:encumbered", function(event) {
    let id = "repeating_professionalskill_" + event.sourceAttribute.split('_')[2];

    getAttrs(allCharGetAttrs.concat([`${id}_char1`, `${id}_char2`, `${id}_other`]), function(v) {
        const charObj = buildCharObj(v);

        setAttrs({
            [`${id}_total`]: calcProSkillTotal(charObj, v[`${id}_char1`], v[`${id}_char2`], v[`${id}_other`]),
            [`${id}_encumbered`]: calcProSkillEncumbered(v[`${id}_char1`], v[`${id}_char2`])
        });
    });
});
/* Professional Skill IDs */
on("change:repeating_professionalskill", function(event) {
    let id = "repeating_professionalskill_" + event.sourceAttribute.split('_')[2];
    setAttrs({[`${id}_id`]: `${id}`});
});


/* Passion IDs */
on("change:repeating_passion", function(event) {
    let id = "repeating_passion_" + event.sourceAttribute.split('_')[2];
    setAttrs({[`${id}_id`]: `${id}`});
});

/* Encumbrance Triggers */
/* Armor ENC and Armor Penalty*/
on("change:location12_armor_equipped change:location12_armor_enc change:location11_armor_equipped change:location11_armor_enc change:location10_armor_equipped change:location10_armor_enc change:half_effective_armor_enc change:location9_armor_equipped change:location9_armor_enc change:location8_armor_equipped change:location_armor_enc change:location7_armor_equipped change:location7_armor_enc change:location6_armor_equipped change:location6_armor_enc change:location5_armor_equipped change:location5_armor_enc change:location4_armor_equipped change:location4_armor_enc change:location3_armor_equipped change:location3_armor_enc change:location2_armor_equipped change:location2_armor_enc change:location1_armor_equipped change:location1_armor_enc change:half_effective_armor_enc", function() {
    getAttrs(armorGetAttrs, function(v) {
        setAttrs( calcArmorEncAndPenalty(v) );
    });
});

/* Weapon IDs */
on("change:repeating_weapon", function(event) {
    let id = "repeating_weapon_" + event.sourceAttribute.split('_')[2];
    setAttrs({[`${id}_id`]: `${id}`});
});

/* Weapon ENC */
on("change:repeating_weapon:enc change:repeating_weapon:ammo_enc change:repeating_weapon:clip_enc change:repeating_weapon:ammo change:repeating_weapon:clips change:repeating_weapon:location", function() {
    getSectionIDs("repeating_weapon", function(weaponIds) {
        let weaponGetAttrs = [];
        weaponIds.forEach(id => {
            weaponGetAttrs.push(`repeating_weapon_${id}_enc`, `repeating_weapon_${id}_ammo_enc`, `repeating_weapon_${id}_clip_enc`, `repeating_weapon_${id}_ammo`, `repeating_weapon_${id}_clips`, `repeating_weapon_${id}_location`)
        });

        getAttrs(weaponGetAttrs, function(v) {
            setAttrs( calcWeaponEnc(weaponIds, v) );
        });
    });
});

/* Gear IDs */
on("change:repeating_equipment", function(event) {
    let id = "repeating_equipment_" + event.sourceAttribute.split('_')[2];
    setAttrs({[`${id}_id`]: `${id}`});
});

/* Gear ENC */
on("change:repeating_equipment:enc change:repeating_equipment:quantity change:repeating_equipment:location", function() {
    getSectionIDs("repeating_equipment", function(gearIds) {
        let gearGetAttrs = [];
        gearIds.forEach(id => {
            gearGetAttrs.push(`repeating_equipment_${id}_enc`, `repeating_equipment_${id}_quantity`, `repeating_equipment_${id}_location`)
        });

        getAttrs(gearGetAttrs, function(v) {
            setAttrs( calcGenericRepeatingEnc(gearIds, 'equipment', v) );
        });
    });
});

/* Currency IDs */
on("change:repeating_currency", function(event) {
    let id = "repeating_currency_" + event.sourceAttribute.split('_')[2];
    setAttrs({[`${id}_id`]: `${id}`});
});

/* Currency ENC */
on("change:repeating_currency:enc change:repeating_currency:quantity change:repeating_currency:location", function() {
    getSectionIDs("repeating_currency", function(currencyIds) {
        let currencyGetAttrs = [];
        currencyIds.forEach(id => {
            currencyGetAttrs.push(`repeating_currency_${id}_enc`, `repeating_currency_${id}_quantity`, `repeating_currency_${id}_location`)
        });

        getAttrs(currencyGetAttrs, function(v) {
            setAttrs( calcGenericRepeatingEnc(currencyIds, 'currency', v) );
        });
    });
});

/* ENC */
on("change:avg_species_siz change:effective_armor_enc change:armor_enc_carried change:weapons_enc change:weapons_enc_carried change:pack_equipped change:equipment_enc change:equipment_enc_carried change:currency_enc change:currency_enc_carried change:encumbrance_temp", function() {
    getAttrs(encGetAttrs.concat(strGetAttrs), function(v) {
        const str = calcChar(v['str_base'], v['str_other'], v['str_temp']);
        setAttrs( calcEnc(str, v) );
    });
});



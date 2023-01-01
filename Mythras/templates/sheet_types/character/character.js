/* Characteristics */
const characteristicAttrs = ['str', 'con', 'siz', 'dex', 'int', 'pow', 'cha'];
characteristicAttrs.forEach(char => {
    on(`change:${char}_base change:${char}_temp`, function(event) {
        if (event.sourceType === "sheetworker") {return;}

        let newAttrs = {}
        getAttrs([`${char}_base`, `${char}_temp`].concat(characteristicAttrs, actionPointGetAttrs, damageModGetAttrs,
            expModGetAttrs, healingRateGetAttrs, initGetAttrs, luckPointsGetAttrs, magicPointsGetAttrs, 
            pranaPointsGetAttrs, powerPointsGetAttrs, tenacityGetAttrs, hpGetAttrs), function(v) {
            const baseCharVal = parseInt(v[`${char}_base`]) || 0;
            const tempCharVal = parseInt(v[`${char}_temp`]) || 0;
            newAttrs[`${char}`] = baseCharVal + tempCharVal;
            v[`${char}`] = baseCharVal + tempCharVal; /* override the old value from getAttr, so we can base other calculations on the new value */

            setAttrs({
                ...newAttrs,
                ...calcActionPoints(v),
                ...calcDamageMod(v),
                ...calcExpMod(v),
                ...calcHealingRate(v),
                ...calcInitiativeBonus(v),
                ...calcLuckPoints(v),
                ...calcMagicPoints(v),
                ...calcPranaPoints(v),
                ...calcPowerPoints(v),
                ...calcTenacity(v),
                ...calcAllHP(v)
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

/* Damage Modifier */
const damageModGetAttrs = ['str', 'siz', 'con', 'pow', 'damage_mod_calc', 'damage_mod_other', 'damage_mod_temp'];
/**
 * Calculate the damage modifier
 * @param v attrs needed for calc; str, siz, con, pow, damage_mod_calc, damage_mod_other, damage_mod_temp
 * @returns {}
 */
function calcDamageMod(v) {
    let damage_mod_table_value;
    const str = parseInt(v['str']) || 0;
    const siz = parseInt(v['siz']) || 0;
    const damageModOther = parseInt(v['damage_mod_other']) || 0;
    const damageModTemp = parseInt(v['damage_mod_temp']) || 0;
    if (v['damage_mod_calc'] === '1') {
        const pow = parseInt(v['pow']) || 0;
        damage_mod_table_value = str + siz + pow;
    } else if (v['damage_mod_calc'] === '2') {
        const con = parseInt(v['con']) || 0;
        damage_mod_table_value = str + siz + con;
    } else {
        damage_mod_table_value = str + siz;
    }

    const base_damage_mod_step = Math.ceil(damage_mod_table_value / 5) - 5 + damageModOther;

    return {
        damage_mod_base: damageTable(base_damage_mod_step, true),
        damage_mod: damageTable(base_damage_mod_step + damageModTemp, true)
    };
}
on('change:damage_mod_other change:damage_mod_temp change:damage_mod_calc', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(damageModGetAttrs, function(v) {
        setAttrs(calcDamageMod(v));
    });
});

/* Experience Modifier */
const expModGetAttrs = ['cha', 'int', 'experience_mod_calc', 'experience_mod_other', 'experience_mod_temp'];
/**
 * Calculate Experience Modifier
 * @param v attributes needed for calc, expModGetAttrs
 * @returns {}
 */
function calcExpMod(v) {
    let base_value;
    const expModOther = parseInt(v['experience_mod_other']) || 0;
    const expModTemp = parseInt(v['experience_mod_temp']) || 0;
    if(v['experience_mod_calc'] === '1') {
        const int = parseInt(v['int']) || 0;
        base_value = Math.ceil(int/6)-2 + expModOther;
    } else {
        const cha = parseInt(v['cha']) || 0;
        base_value = Math.ceil(cha/6)-2 + expModOther;
    }

    return {
        experience_mod_base: base_value,
        experience_mod: base_value + expModTemp
    };
}
on('change:experience_mod_other change:experience_mod_temp change:experience_mod_calc', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(expModGetAttrs, function(v) {
        setAttrs(calcExpMod(v));
    });
});

/* Experience Modifier */
const healingRateGetAttrs = ['con', 'pow', 'healing_rate_calc', 'healing_rate_other', 'healing_rate_temp', 'healing_rate_double'];
/**
 * Calculate Healing Rate
 * @param v attributes needed for calc, healingRateGetAttrs
 * @returns {}
 */
function calcHealingRate(v) {
    let base_multiplier;
    let base_value;
    const con = parseInt(v['con']) || 0;
    const healingRateOther = parseInt(v['healing_rate_other']) || 0;
    const healingRateTemp = parseInt(v['healing_rate_temp']) || 0;
    if (v['healing_rate_double'] === '1') {
        base_multiplier = 2;
    } else {
        base_multiplier = 1;
    }

    if (v['healing_rate_calc'] === '1') {
        const pow = parseInt(v['pow']) || 0;
        base_value = (Math.ceil(Math.ceil(con+(pow/2))/6) * base_multiplier)+healingRateOther;
    } else {
        base_value = (Math.ceil(con/6) * base_multiplier)+healingRateOther;
    }

    return {
        healing_rate_base: base_value,
        healing_rate: base_value + healingRateTemp
    };
}
on('change:healing_rate_other change:healing_rate_temp change:healing_rate_calc change:healing_rate_double', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(healingRateGetAttrs, function(v) {
        setAttrs(calcHealingRate(v));
    });
});

/* Initiative */
const initGetAttrs=['int', 'dex', 'initiative_bonus_other', 'initiative_bonus_temp', 'armor_penalty', 'fatigue', 'athletics_total', 'initiative_add_one_tenth_athletics']
/**
 * Calculate Initiative Bonus
 * @param v attrs needed for calculation, initGetAttrs
 * @returns {}
 */
function calcInitiativeBonus(v) {
    let athletics_bonus = 0;
    if (v['initiative_add_one_tenth_athletics'] === '1') {
        const athletics = parseInt(v['athletics_total']) || 0;
        athletics_bonus = Math.ceil(athletics/10);
    }
    const int = parseInt(v['int']) || 0;
    const dex = parseInt(v['dex']) || 0;
    const initOther = parseInt(v['initiative_bonus_other']) || 0;
    const initTemp = parseInt(v['initiative_bonus_temp']) || 0;
    const base_value = Math.ceil((int + dex) / 2) + initOther + athletics_bonus;

    const armor_penalty = parseInt(v['armor_penalty']) || 0;
    const fatiguePenalty = parseInt(fatigueTable[v['fatigue']]['initiative']) || 0;
    return {
        initiative_bonus_base: base_value,
        initiative_bonus: base_value + initTemp + armor_penalty + fatiguePenalty
    };
}
on('change:initiative_bonus_other change:initiative_bonus_temp change:initiative_add_one_tenth_athletics', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(initGetAttrs, function(v) {
        setAttrs(calcInitiativeBonus(v));
    });
});

/* Luck Points */
const luckPointsGetAttrs=['pow', 'cha', 'luck_points_calc', 'luck_points_other', 'luck_points_temp', 'luck_points_rank', 'rank', 'luck_points', 'luck_points_max']
/**
 * Calculate Luck Points
 * @param v attrs needed for calculation, luckPointsGetAttrs
 * @returns {}
 */
function calcLuckPoints(v) {
    let base_value;
    const pow = parseInt(v['pow']) || 0;
    const rank = parseInt(v['rank']) || 0;
    const luckPointsRank = parseInt(v['luck_points_rank']) || 0;
    const luckPointsOther = parseInt(v['luck_points_other']) || 0;
    const luckPointsTemp = parseInt(v['luck_points_temp']) || 0;
    const luckPointsMax = parseInt(v['luck_points_max']) || 0;
    const luckPointsCurr = parseInt(v['luck_points']) || 0;
    if (v['luck_points_calc'] === '1') {
        const cha = parseInt(v['cha']) || 0;
        base_value = Math.ceil(Math.ceil(cha+(pow/2))/6) + luckPointsOther + (luckPointsRank * rank);
    } else {
        base_value = Math.ceil(pow/6) + luckPointsOther + (luckPointsRank * rank);
    }

    const new_luck_points_max = base_value + luckPointsTemp;
    const diff_luck_points_max = new_luck_points_max - luckPointsMax;

    return {
        luck_points_base: base_value,
        luck_points_max: new_luck_points_max,
        luck_points: luckPointsCurr + diff_luck_points_max
    };
}
on('change:luck_points_other change:luck_points_temp change:luck_points_calc change:rank', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(luckPointsGetAttrs, function(v) {
        setAttrs(calcLuckPoints(v));
    });
});
on('change:luck_points_rank', function(event) {
    /* Don't exit on sheetworker cause humans will modify the option not the setting itself */
    getAttrs(luckPointsGetAttrs, function(v) {
        setAttrs(calcLuckPoints(v));
    });
});

/* Magic Points */
const magicPointsGetAttrs = ['pow', 'magic_points_other', 'magic_points_temp', 'magic_points', 'magic_points_max'];
/**
 * Calculate Magic points
 * @param v attrs needed for calculation, magicPointsGetAttrs
 * @returns {}
 */
function calcMagicPoints(v) {
    const pow = parseInt(v['pow']) || 0;
    const magicPointsOther = parseInt(v['magic_points_other']) || 0;
    const magicPointsTemp = parseInt(v['magic_points_temp']) || 0;
    const magicPointsCurr = parseInt(v['magic_points']) || 0;
    const magicPointsMax = parseInt(v['magic_points_max']) || 0;
    const base_value = pow + magicPointsOther;
    const new_magic_points_max = base_value + magicPointsTemp;
    const diff_magic_points_max = new_magic_points_max - magicPointsMax;

    return {
        magic_points_base: base_value,
        magic_points_max: new_magic_points_max,
        magic_points: magicPointsCurr + diff_magic_points_max
    };
}
on('change:magic_points_other change:magic_points_temp', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(magicPointsGetAttrs, function(v) {
        setAttrs(calcMagicPoints(v));
    });
});

/* Prana Points */
const pranaPointsGetAttrs = ['pow', 'prana_points_other', 'prana_points_temp', 'prana_points', 'prana_points_max'];
/**
 * Calculate Prana points
 * @param v attrs needed for calculation, pranaPointsGetAttrs
 * @returns {}
 */
function calcPranaPoints(v) {
    const pow = parseInt(v['pow']) || 0;
    const pranaPointsOther = parseInt(v['prana_points_other']) || 0;
    const pranaPointsTemp = parseInt(v['prana_points_temp']) || 0;
    const pranaPointsCurr = parseInt(v['prana_points']) || 0;
    const pranaPointsMax = parseInt(v['prana_points_max']) || 0;
    const base_value = pow + pranaPointsOther;
    const new_prana_points_max = base_value + pranaPointsTemp;
    const diff_prana_points_max = new_prana_points_max - pranaPointsMax;

    return {
        prana_points_base: base_value,
        prana_points_max: new_prana_points_max,
        prana_points: pranaPointsCurr + diff_prana_points_max
    };
}
on('change:prana_points_other change:prana_points_temp', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(pranaPointsGetAttrs, function(v) {
        setAttrs(calcPranaPoints(v));
    });
});

/* Power Points */
const powerPointsGetAttrs = ['pow', 'power_points_other', 'power_points_temp', 'power_points', 'power_points_max'];
/**
 * Calculate Power points
 * @param v attrs needed for calculation, powerPointsGetAttrs
 * @returns {}
 */
function calcPowerPoints(v) {
    const pow = parseInt(v['pow']) || 0;
    const powerPointsOther = parseInt(v['power_points_other']) || 0;
    const powerPointsTemp = parseInt(v['power_points_temp']) || 0;
    const powerPointsCurr = parseInt(v['power_points']) || 0;
    const powerPointsMax = parseInt(v['power_points_max']) || 0;
    const base_value = pow + powerPointsOther;
    const new_power_points_max = base_value + powerPointsTemp;
    const diff_power_points_max = new_power_points_max - powerPointsMax;

    return {
        power_points_base: base_value,
        power_points_max: new_power_points_max,
        power_points: powerPointsCurr + diff_power_points_max
    };
}
on('change:power_points_other change:power_points_temp', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(powerPointsGetAttrs, function(v) {
        setAttrs(calcPowerPoints(v));
    });
});

/* Movement Rate */
const moveRateGetAttrs = ['movement_rate_species', 'movement_rate_other', 'movement_rate_temp', 'fatigue', 'encumbrance_load'];
/**
 *
 * @param value
 * @param modifier
 * @returns {number|*}
 */
function applyMovementMod(value, modifier) {
    if (modifier === '-1') {
        return value - 1;
    } else if (modifier === '-2') {
        return value - 2;
    } else if (modifier === '*.5') {
        return Math.ceil(value / 2);
    } else if (modifier === '*0') {
        return 0;
    } else {
        return value;
    }
}
/**
 * Calculate movement rate and other movement derived values
 * @param v attrs needed for calculation, moveRateGetAttrs
 * @returns {}
 */
function calcMoveRate(v) {
    const moveRateSpecies = parseInt(v['movement_rate_species']) || 0;
    const moveRateOther = parseInt(v['movement_rate_other']) || 0;
    const moveRateTemp = parseInt(v['movement_rate_temp']) || 0;
    const base_value = moveRateSpecies + moveRateOther;
    const moveAfterTemp = base_value + moveRateTemp;
    const moveAfterFatigue = applyMovementMod(moveAfterTemp, fatigueTable[v['fatigue']]['movement']);
    let moveAfterEnc = applyMovementMod(moveAfterFatigue, loadTable[v['encumbrance_load']]['movement']);

    if (moveAfterEnc < 0) {
        moveAfterEnc = 0;
    }

    return {
        movement_rate_base: base_value,
        movement_rate: moveAfterEnc
    };
}
on('change:movement_rate_species change:movement_rate_other change:movement_rate_temp', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(moveRateGetAttrs, function(v) {
        setAttrs(calcMoveRate(v));
    });
});
/* TODO trigger on enc for move

/* Tenacity Points */
const tenacityGetAttrs = ['pow', 'tenacity_other', 'tenacity_temp', 'tenacity', 'tenacity_max', 'tenacity_dependencies'];
/**
 * Calculate Tenacity points
 * @param v attrs needed for calculation, tenacityPointsGetAttrs
 * @returns {}
 */
function calcTenacity(v) {
    const pow = parseInt(v['pow']) || 0;
    const tenacityOther = parseInt(v['tenacity_other']) || 0;
    const tenacityTemp = parseInt(v['tenacity_temp']) || 0;
    const tenacityCurr = parseInt(v['tenacity']) || 0;
    const tenacityMax = parseInt(v['tenacity_max']) || 0;
    const tenacityDeps = parseInt(v['tenacity_dependencies']) || 0;
    const base_value = pow + tenacityOther;
    const new_tenacity_max = base_value + tenacityTemp + tenacityDeps;
    const diff_tenacity_max = new_tenacity_max - tenacityMax;

    return {
        tenacity_base: base_value,
        tenacity_max: new_tenacity_max,
        tenacity: tenacityCurr + diff_tenacity_max
    };
}
on('change:tenacity_other change:tenacity_temp', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(tenacityGetAttrs, function(v) {
        setAttrs(calcTenacity(v));
    });
});
/* TODO Trigger on dependencies change */

/* Hit Locations */
const hitLocationTable = {
    custom1: {
        location2to7_display: 0, location8_display: 0, location9_display: 0, location10_display: 0, location11_display: 0, location12_display: 0
    },
    custom7: {
        location2to7_display: 1, location8_display: 0, location9_display: 0, location10_display: 0, location11_display: 0, location12_display: 0
    },
    custom8: {
        location2to7_display: 1, location8_display: 1, location9_display: 0, location10_display: 0, location11_display: 0, location12_display: 0
    },
    custom9: {
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 0, location11_display: 0, location12_display: 0
    },
    custom10: {
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 1, location11_display: 0, location12_display: 0
    },
    custom11: {
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 1, location11_display: 1, location12_display: 0
    },
    custom: {
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 1, location11_display: 1, location12_display: 1
    },
    rabble: {
        location1_table_start: 1, location1_table_end: 20, location1_name: getTranslationByKey('hit_points'), location1_hp_max_base_mod: 0,
        location2_table_start: 0, location2_table_end: 0, location2_name: " ", location2_hp_max_base_mod: '-',
        location3_table_start: 0, location3_table_end: 0, location3_name: " ", location3_hp_max_base_mod: '-',
        location4_table_start: 0, location4_table_end: 0, location4_name: " ", location4_hp_max_base_mod: '-',
        location5_table_start: 0, location5_table_end: 0, location5_name: " ", location5_hp_max_base_mod: '-',
        location6_table_start: 0, location6_table_end: 0, location6_name: " ", location6_hp_max_base_mod: '-',
        location7_table_start: 0, location7_table_end: 0, location7_name: " ", location7_hp_max_base_mod: '-',
        location8_table_start: 0, location8_table_end: 0, location8_name: " ", location8_hp_max_base_mod: '-',
        location9_table_start: 0, location9_table_end: 0, location9_name: " ", location9_hp_max_base_mod: '-',
        location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: '-',
        location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: '-',
        location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: '-',
        location2to7_display: 0, location8_display: 0, location9_display: 0, location10_display: 0, location11_display: 0, location12_display: 0
    },
    simplified: {
        location1_table_start: 1, location1_table_end: 20, location1_name: getTranslationByKey('hit_points'), location1_hp_max_base_mod: 0,
        location2_table_start: 0, location2_table_end: 0, location2_name: " ", location2_hp_max_base_mod: '-',
        location3_table_start: 0, location3_table_end: 0, location3_name: " ", location3_hp_max_base_mod: '-',
        location4_table_start: 0, location4_table_end: 0, location4_name: " ", location4_hp_max_base_mod: '-',
        location5_table_start: 0, location5_table_end: 0, location5_name: " ", location5_hp_max_base_mod: '-',
        location6_table_start: 0, location6_table_end: 0, location6_name: " ", location6_hp_max_base_mod: '-',
        location7_table_start: 0, location7_table_end: 0, location7_name: " ", location7_hp_max_base_mod: '-',
        location8_table_start: 0, location8_table_end: 0, location8_name: " ", location8_hp_max_base_mod: '-',
        location9_table_start: 0, location9_table_end: 0, location9_name: " ", location9_hp_max_base_mod: '-',
        location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: '-',
        location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: '-',
        location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: '-',
        location2to7_display: 0, location8_display: 0, location9_display: 0, location10_display: 0, location11_display: 0, location12_display: 0
    },
    arachnid: {
        location1_table_start: 1, location1_table_end: 2, location1_name: getTranslationByKey('rear_right_leg'), location1_hp_max_base_mod: -1,
        location2_table_start: 3, location2_table_end: 4, location2_name: getTranslationByKey('rear_left_leg'), location2_hp_max_base_mod: -1,
        location3_table_start: 5, location3_table_end: 6, location3_name: getTranslationByKey('mid_right_leg'), location3_hp_max_base_mod: -1,
        location4_table_start: 7, location4_table_end: 8, location4_name: getTranslationByKey('mid_left_leg'), location4_hp_max_base_mod: -1,
        location5_table_start: 9, location5_table_end: 10, location5_name: getTranslationByKey('fore_right_leg'), location5_hp_max_base_mod: -1,
        location6_table_start: 11, location6_table_end: 12, location6_name: getTranslationByKey('fore_left_leg'), location6_hp_max_base_mod: -1,
        location7_table_start: 13, location7_table_end: 14, location7_name: getTranslationByKey('abdomen'), location7_hp_max_base_mod: 2,
        location8_table_start: 15, location8_table_end: 16, location8_name: getTranslationByKey('front_right_leg'), location8_hp_max_base_mod: -1,
        location9_table_start: 17, location9_table_end: 18, location9_name: getTranslationByKey('front_left_leg'), location9_hp_max_base_mod: -1,
        location10_table_start: 19, location10_table_end: 20, location10_name: getTranslationByKey('cephalothorax'), location10_hp_max_base_mod: 1,
        location11_table_start: 0, location11_table_end: 0, location11_name: "", location11_hp_max_base_mod: '-',
        location12_table_start: 0, location12_table_end: 0, location12_name: "", location12_hp_max_base_mod: '-',
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 1, location11_display: 0, location12_display: 0
    },
    humanoid: {
        location1_table_start: 1, location1_table_end: 3, location1_name: getTranslationByKey('right_leg'), location1_hp_max_base_mod: 0,
        location2_table_start: 4, location2_table_end: 6, location2_name: getTranslationByKey('left_leg'), location2_hp_max_base_mod: 0,
        location3_table_start: 7, location3_table_end: 9, location3_name: getTranslationByKey('abdomen'), location3_hp_max_base_mod: 1,
        location4_table_start: 10, location4_table_end: 12, location4_name: getTranslationByKey('chest'), location4_hp_max_base_mod: 2,
        location5_table_start: 13, location5_table_end: 15, location5_name: getTranslationByKey('right_arm'), location5_hp_max_base_mod: -1,
        location6_table_start: 16, location6_table_end: 18, location6_name: getTranslationByKey('left_arm'), location6_hp_max_base_mod: -1,
        location7_table_start: 19, location7_table_end: 20, location7_name: getTranslationByKey('head'), location7_hp_max_base_mod: 0,
        location8_table_start: 0, location8_table_end: 0, location8_name: " ", location8_hp_max_base_mod: '-',
        location9_table_start: 0, location9_table_end: 0, location9_name: " ", location9_hp_max_base_mod: '-',
        location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: '-',
        location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: '-',
        location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: '-',
        location2to7_display: 1, location8_display: 0, location9_display: 0, location10_display: 0, location11_display: 0, location12_display: 0
    },
    centaurid: {
        location1_table_start: 1, location1_table_end: 3, location1_name: getTranslationByKey('rear_right_leg'), location1_hp_max_base_mod: 0,
        location2_table_start: 4, location2_table_end: 6, location2_name: getTranslationByKey('rear_left_leg'), location2_hp_max_base_mod: 0,
        location3_table_start: 7, location3_table_end: 8, location3_name: getTranslationByKey('hindquarters'), location3_hp_max_base_mod: 1,
        location4_table_start: 9, location4_table_end: 10, location4_name: getTranslationByKey('forequarters'), location4_hp_max_base_mod: 2,
        location5_table_start: 11, location5_table_end: 12, location5_name: getTranslationByKey('front_right_leg'), location5_hp_max_base_mod: 0,
        location6_table_start: 13, location6_table_end: 14, location6_name: getTranslationByKey('front_left_leg'), location6_hp_max_base_mod: 0,
        location7_table_start: 15, location7_table_end: 16, location7_name: getTranslationByKey('chest'), location7_hp_max_base_mod: -1,
        location8_table_start: 17, location8_table_end: 17, location8_name: getTranslationByKey('right_arm'), location8_hp_max_base_mod: -4,
        location9_table_start: 18, location9_table_end: 18, location9_name: getTranslationByKey('left_arm'), location9_hp_max_base_mod: -4,
        location10_table_start: 19, location10_table_end: 20, location10_name: getTranslationByKey('head'), location10_hp_max_base_mod: -3,
        location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: '-',
        location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: '-',
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 1, location11_display: 0, location12_display: 0
    },
    decapoda: {
        location1_table_start: 1, location1_table_end: 1, location1_name: getTranslationByKey('rear_right_leg'), location1_hp_max_base_mod: -1,
        location2_table_start: 2, location2_table_end: 2, location2_name: getTranslationByKey('rear_left_leg'), location2_hp_max_base_mod: -1,
        location3_table_start: 3, location3_table_end: 3, location3_name: getTranslationByKey('mid_right_leg'), location3_hp_max_base_mod: -1,
        location4_table_start: 4, location4_table_end: 4, location4_name: getTranslationByKey('mid_left_leg'), location4_hp_max_base_mod: -1,
        location5_table_start: 5, location5_table_end: 5, location5_name: getTranslationByKey('fore_right_leg'), location5_hp_max_base_mod: -1,
        location6_table_start: 6, location6_table_end: 6, location6_name: getTranslationByKey('fore_left_leg'), location6_hp_max_base_mod: -1,
        location7_table_start: 7, location7_table_end: 7, location7_name: getTranslationByKey('front_right_leg'), location7_hp_max_base_mod: -1,
        location8_table_start: 8, location8_table_end: 8, location8_name: getTranslationByKey('front_left_leg'), location8_hp_max_base_mod: -1,
        location9_table_start: 9, location9_table_end: 10, location9_name: getTranslationByKey('abdomen'), location9_hp_max_base_mod: 1,
        location10_table_start: 11, location10_table_end: 16, location10_name: getTranslationByKey('cephalothorax'), location10_hp_max_base_mod: 2,
        location11_table_start: 17, location11_table_end: 18, location11_name: getTranslationByKey('right_pincer'), location11_hp_max_base_mod: 2,
        location12_table_start: 19, location12_table_end: 20, location12_name: getTranslationByKey('left_pincer'), location12_hp_max_base_mod: 0,
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 1, location11_display: 1, location12_display: 1
    },
    decapodiform: {
        location1_table_start: 1, location1_table_end: 1, location1_name: getTranslationByKey('tentacle_1'), location1_hp_max_base_mod: -1,
        location2_table_start: 2, location2_table_end: 2, location2_name: getTranslationByKey('tentacle_2'), location2_hp_max_base_mod: -1,
        location3_table_start: 3, location3_table_end: 3, location3_name: getTranslationByKey('tentacle_3'), location3_hp_max_base_mod: -1,
        location4_table_start: 4, location4_table_end: 4, location4_name: getTranslationByKey('tentacle_4'), location4_hp_max_base_mod: -1,
        location5_table_start: 5, location5_table_end: 5, location5_name: getTranslationByKey('tentacle_5'), location5_hp_max_base_mod: -1,
        location6_table_start: 6, location6_table_end: 6, location6_name: getTranslationByKey('tentacle_6'), location6_hp_max_base_mod: -1,
        location7_table_start: 7, location7_table_end: 7, location7_name: getTranslationByKey('tentacle_7'), location7_hp_max_base_mod: -1,
        location8_table_start: 8, location8_table_end: 8, location8_name: getTranslationByKey('tentacle_8'), location8_hp_max_base_mod: -1,
        location9_table_start: 9, location9_table_end: 11, location9_name: getTranslationByKey('long_tentacle_1'), location9_hp_max_base_mod: 0,
        location10_table_start: 12, location10_table_end: 14, location10_name: getTranslationByKey('long_tentacle_2'), location10_hp_max_base_mod: 0,
        location11_table_start: 15, location11_table_end: 17, location11_name: getTranslationByKey('body'), location11_hp_max_base_mod: 2,
        location12_table_start: 18, location12_table_end: 20, location12_name: getTranslationByKey('head'), location12_hp_max_base_mod: 1,
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 1, location11_display: 1, location12_display: 1
    },
    dorsal_finned_aquatic: {
        location1_table_start: 1, location1_table_end: 3, location1_name: getTranslationByKey('tail'), location1_hp_max_base_mod: 0,
        location2_table_start: 4, location2_table_end: 6, location2_name: getTranslationByKey('dorsal_fin'), location2_hp_max_base_mod: -1,
        location3_table_start: 7, location3_table_end: 10, location3_name: getTranslationByKey('hindquarters'), location3_hp_max_base_mod: 1,
        location4_table_start: 11, location4_table_end: 14, location4_name: getTranslationByKey('forequarters'), location4_hp_max_base_mod: 2,
        location5_table_start: 15, location5_table_end: 16, location5_name: getTranslationByKey('right_fin'), location5_hp_max_base_mod: -1,
        location6_table_start: 17, location6_table_end: 18, location6_name: getTranslationByKey('left_fin'), location6_hp_max_base_mod: -1,
        location7_table_start: 19, location7_table_end: 20, location7_name: getTranslationByKey('head'), location7_hp_max_base_mod: 0,
        location8_table_start: 0, location8_table_end: 0, location8_name: " ", location8_hp_max_base_mod: '-',
        location9_table_start: 0, location9_table_end: 0, location9_name: " ", location9_hp_max_base_mod: '-',
        location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: '-',
        location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: '-',
        location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: '-',
        location2to7_display: 1, location8_display: 0, location9_display: 0, location10_display: 0, location11_display: 0, location12_display: 0
    },
    draconic: {
        location1_table_start: 1, location1_table_end: 2, location1_name: getTranslationByKey('tail'), location1_hp_max_base_mod: 0,
        location2_table_start: 3, location2_table_end: 4, location2_name: getTranslationByKey('rear_right_leg'), location2_hp_max_base_mod: 0,
        location3_table_start: 5, location3_table_end: 6, location3_name: getTranslationByKey('rear_left_leg'), location3_hp_max_base_mod: 0,
        location4_table_start: 7, location4_table_end: 8, location4_name: getTranslationByKey('hindquarters'), location4_hp_max_base_mod: 1,
        location5_table_start: 9, location5_table_end: 10, location5_name: getTranslationByKey('right_wing'), location5_hp_max_base_mod: -1,
        location6_table_start: 11, location6_table_end: 12, location6_name: getTranslationByKey('left_wing'), location6_hp_max_base_mod: -1,
        location7_table_start: 13, location7_table_end: 14, location7_name: getTranslationByKey('forequarters'), location7_hp_max_base_mod: 2,
        location8_table_start: 15, location8_table_end: 16, location8_name: getTranslationByKey('front_right_leg'), location8_hp_max_base_mod: 0,
        location9_table_start: 17, location9_table_end: 18, location9_name: getTranslationByKey('front_left_leg'), location9_hp_max_base_mod: 0,
        location10_table_start: 19, location10_table_end: 20, location10_name: getTranslationByKey('head'), location10_hp_max_base_mod: 0,
        location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: '-',
        location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: '-',
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 1, location11_display: 0, location12_display: 0
    },
    insect: {
        location1_table_start: 1, location1_table_end: 1, location1_name: getTranslationByKey('right_rear_leg'), location1_hp_max_base_mod: -1,
        location2_table_start: 2, location2_table_end: 2, location2_name: getTranslationByKey('left_rear_leg'), location2_hp_max_base_mod: -1,
        location3_table_start: 3, location3_table_end: 3, location3_name: getTranslationByKey('mid_right_leg'), location3_hp_max_base_mod: -1,
        location4_table_start: 4, location4_table_end: 4, location4_name: getTranslationByKey('mid_left_leg'), location4_hp_max_base_mod: -1,
        location5_table_start: 5, location5_table_end: 9, location5_name: getTranslationByKey('abdomen'), location5_hp_max_base_mod: 1,
        location6_table_start: 10, location6_table_end: 13, location6_name: getTranslationByKey('thorax'), location6_hp_max_base_mod: 2,
        location7_table_start: 14, location7_table_end: 14, location7_name: getTranslationByKey('front_right_leg'), location7_hp_max_base_mod: -1,
        location8_table_start: 15, location8_table_end: 15, location8_name: getTranslationByKey('front_left_leg'), location8_hp_max_base_mod: -1,
        location9_table_start: 16, location9_table_end: 20, location9_name: getTranslationByKey('head'), location9_hp_max_base_mod: 0,
        location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: '-',
        location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: '-',
        location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: '-',
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 0, location11_display: 0, location12_display: 0
    },
    octopodiform: {
        location1_table_start: 1, location1_table_end: 2, location1_name: getTranslationByKey('tentacle_1'), location1_hp_max_base_mod: 0,
        location2_table_start: 3, location2_table_end: 4, location2_name: getTranslationByKey('tentacle_2'), location2_hp_max_base_mod: 0,
        location3_table_start: 5, location3_table_end: 6, location3_name: getTranslationByKey('tentacle_3'), location3_hp_max_base_mod: 0,
        location4_table_start: 7, location4_table_end: 8, location4_name: getTranslationByKey('tentacle_4'), location4_hp_max_base_mod: 0,
        location5_table_start: 9, location5_table_end: 10, location5_name: getTranslationByKey('tentacle_5'), location5_hp_max_base_mod: 0,
        location6_table_start: 11, location6_table_end: 12, location6_name: getTranslationByKey('tentacle_6'), location6_hp_max_base_mod: 0,
        location7_table_start: 13, location7_table_end: 14, location7_name: getTranslationByKey('tentacle_7'), location7_hp_max_base_mod: 0,
        location8_table_start: 15, location8_table_end: 16, location8_name: getTranslationByKey('tentacle_8'), location8_hp_max_base_mod: 0,
        location9_table_start: 17, location9_table_end: 18, location9_name: getTranslationByKey('body'), location9_hp_max_base_mod: 1,
        location10_table_start: 19, location10_table_end: 20, location10_name: getTranslationByKey('head'), location10_hp_max_base_mod: 2,
        location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: '-',
        location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: '-',
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 1, location11_display: 0, location12_display: 0
    },
    pachyderm: {
        location1_table_start: 1, location1_table_end: 2, location1_name: getTranslationByKey('rear_right_leg'), location1_hp_max_base_mod: 0,
        location2_table_start: 3, location2_table_end: 4, location2_name: getTranslationByKey('rear_left_leg'), location2_hp_max_base_mod: 0,
        location3_table_start: 5, location3_table_end: 8, location3_name: getTranslationByKey('hindquarters'), location3_hp_max_base_mod: 1,
        location4_table_start: 9, location4_table_end: 12, location4_name: getTranslationByKey('forequarters'), location4_hp_max_base_mod: 2,
        location5_table_start: 13, location5_table_end: 14, location5_name: getTranslationByKey('front_right_leg'), location5_hp_max_base_mod: 0,
        location6_table_start: 15, location6_table_end: 16, location6_name: getTranslationByKey('front_left_leg'), location6_hp_max_base_mod: 0,
        location7_table_start: 17, location7_table_end: 17, location7_name: getTranslationByKey('trunk'), location7_hp_max_base_mod: -1,
        location8_table_start: 18, location8_table_end: 20, location8_name: getTranslationByKey('head'), location8_hp_max_base_mod: 0,
        location9_table_start: 0, location9_table_end: 0, location9_name: " ", location9_hp_max_base_mod: '-',
        location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: '-',
        location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: '-',
        location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: '-',
        location2to7_display: 1, location8_display: 1, location9_display: 0, location10_display: 0, location11_display: 0, location12_display: 0
    },
    quadruped: {
        location1_table_start: 1, location1_table_end: 2, location1_name: getTranslationByKey('rear_right_leg'), location1_hp_max_base_mod: 0,
        location2_table_start: 3, location2_table_end: 4, location2_name: getTranslationByKey('rear_left_leg'), location2_hp_max_base_mod: 0,
        location3_table_start: 5, location3_table_end: 7, location3_name: getTranslationByKey('hindquarters'), location3_hp_max_base_mod: 1,
        location4_table_start: 8, location4_table_end: 10, location4_name: getTranslationByKey('forequarters'), location4_hp_max_base_mod: 2,
        location5_table_start: 11, location5_table_end: 13, location5_name: getTranslationByKey('front_right_leg'), location5_hp_max_base_mod: 0,
        location6_table_start: 14, location6_table_end: 16, location6_name: getTranslationByKey('front_left_leg'), location6_hp_max_base_mod: 0,
        location7_table_start: 17, location7_table_end: 20, location7_name: getTranslationByKey('head'), location7_hp_max_base_mod: 0,
        location8_table_start: 0, location8_table_end: 0, location8_name: " ", location8_hp_max_base_mod: '-',
        location9_table_start: 0, location9_table_end: 0, location9_name: " ", location9_hp_max_base_mod: '-',
        location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: '-',
        location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: '-',
        location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: '-',
        location2to7_display: 1, location8_display: 0, location9_display: 0, location10_display: 0, location11_display: 0, location12_display: 0
    },
    serpentine: {
        location1_table_start: 1, location1_table_end: 3, location1_name: getTranslationByKey('tail_tip'), location1_hp_max_base_mod: 0,
        location2_table_start: 4, location2_table_end: 5, location2_name: getTranslationByKey('mid_end-length'), location2_hp_max_base_mod: 0,
        location3_table_start: 6, location3_table_end: 7, location3_name: getTranslationByKey('fore_end-length'), location3_hp_max_base_mod: 0,
        location4_table_start: 8, location4_table_end: 9, location4_name: getTranslationByKey('rear_mid-length'), location4_hp_max_base_mod: 1,
        location5_table_start: 10, location5_table_end: 12, location5_name: getTranslationByKey('mid_mid-length'), location5_hp_max_base_mod: 1,
        location6_table_start: 13, location6_table_end: 14, location6_name: getTranslationByKey('fore_mid-length'), location6_hp_max_base_mod: 1,
        location7_table_start: 15, location7_table_end: 16, location7_name: getTranslationByKey('rear_fore-length'), location7_hp_max_base_mod: 0,
        location8_table_start: 17, location8_table_end: 18, location8_name: getTranslationByKey('mid_fore-length'), location8_hp_max_base_mod: 0,
        location9_table_start: 19, location9_table_end: 20, location9_name: getTranslationByKey('head'), location9_hp_max_base_mod: 0,
        location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: '-',
        location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: '-',
        location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: '-',
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 0, location11_display: 0, location12_display: 0
    },
    tailed_arachnid: {
        location1_table_start: 1, location1_table_end: 2, location1_name: getTranslationByKey('tail'), location1_hp_max_base_mod: 0,
        location2_table_start: 3, location2_table_end: 3, location2_name: getTranslationByKey('rear_right_leg'), location2_hp_max_base_mod: -1,
        location3_table_start: 4, location3_table_end: 4, location3_name: getTranslationByKey('rear_left_leg'), location3_hp_max_base_mod: -1,
        location4_table_start: 5, location4_table_end: 5, location4_name: getTranslationByKey('mid_right_leg'), location4_hp_max_base_mod: -1,
        location5_table_start: 6, location5_table_end: 6, location5_name: getTranslationByKey('mid_left_leg'), location5_hp_max_base_mod: -1,
        location6_table_start: 7, location6_table_end: 7, location6_name: getTranslationByKey('fore_right_leg'), location6_hp_max_base_mod: -1,
        location7_table_start: 8, location7_table_end: 8, location7_name: getTranslationByKey('fore_left_leg'), location7_hp_max_base_mod: -1,
        location8_table_start: 9, location8_table_end: 12, location8_name: getTranslationByKey('thorax'), location8_hp_max_base_mod: 1,
        location9_table_start: 13, location9_table_end: 15, location9_name: getTranslationByKey('right_pincer'), location9_hp_max_base_mod: 0,
        location10_table_start: 16, location10_table_end: 18, location10_name: getTranslationByKey('left_pincer'), location10_hp_max_base_mod: 0,
        location11_table_start: 19, location11_table_end: 20, location11_name: getTranslationByKey('cephalothorax'), location11_hp_max_base_mod: 2,
        location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: '-',
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 1, location11_display: 1, location12_display: 0
    },
    tailed_biped: {
        location1_table_start: 1, location1_table_end: 3, location1_name: getTranslationByKey('tail'), location1_hp_max_base_mod: 0,
        location2_table_start: 4, location2_table_end: 5, location2_name: getTranslationByKey('right_leg'), location2_hp_max_base_mod: 0,
        location3_table_start: 6, location3_table_end: 7, location3_name: getTranslationByKey('left_leg'), location3_hp_max_base_mod: 0,
        location4_table_start: 8, location4_table_end: 10, location4_name: getTranslationByKey('abdomen'), location4_hp_max_base_mod: 1,
        location5_table_start: 11, location5_table_end: 14, location5_name: getTranslationByKey('chest'), location5_hp_max_base_mod: 2,
        location6_table_start: 15, location6_table_end: 16, location6_name: getTranslationByKey('right_arm'), location6_hp_max_base_mod: -1,
        location7_table_start: 17, location7_table_end: 18, location7_name: getTranslationByKey('left_arm'), location7_hp_max_base_mod: -1,
        location8_table_start: 19, location8_table_end: 20, location8_name: getTranslationByKey('head'), location8_hp_max_base_mod: 0,
        location9_table_start: 0, location9_table_end: 0, location9_name: " ", location9_hp_max_base_mod: '-',
        location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: '-',
        location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: '-',
        location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: '-',
        location2to7_display: 1, location8_display: 1, location9_display: 0, location10_display: 0, location11_display: 0, location12_display: 0
    },
    tailed_quadruped: {
        location1_table_start: 1, location1_table_end: 3, location1_name: getTranslationByKey('tail'), location1_hp_max_base_mod: 0,
        location2_table_start: 4, location2_table_end: 5, location2_name: getTranslationByKey('rear_right_leg'), location2_hp_max_base_mod: 0,
        location3_table_start: 6, location3_table_end: 7, location3_name: getTranslationByKey('rear_left_leg'), location3_hp_max_base_mod: 0,
        location4_table_start: 8, location4_table_end: 10, location4_name: getTranslationByKey('hindquarters'), location4_hp_max_base_mod: 1,
        location5_table_start: 11, location5_table_end: 14, location5_name: getTranslationByKey('forequarters'), location5_hp_max_base_mod: 2,
        location6_table_start: 15, location6_table_end: 16, location6_name: getTranslationByKey('front_right_leg'), location6_hp_max_base_mod: -1,
        location7_table_start: 17, location7_table_end: 18, location7_name: getTranslationByKey('front_left_leg'), location7_hp_max_base_mod: -1,
        location8_table_start: 19, location8_table_end: 20, location8_name: getTranslationByKey('head'), location8_hp_max_base_mod: 0,
        location9_table_start: 0, location9_table_end: 0, location9_name: " ", location9_hp_max_base_mod: '-',
        location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: '-',
        location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: '-',
        location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: '-',
        location2to7_display: 1, location8_display: 1, location9_display: 0, location10_display: 0, location11_display: 0, location12_display: 0
    },
    winged_biped: {
        location1_table_start: 1, location1_table_end: 3, location1_name: getTranslationByKey('right_leg'), location1_hp_max_base_mod: 0,
        location2_table_start: 4, location2_table_end: 6, location2_name: getTranslationByKey('left_leg'), location2_hp_max_base_mod: 0,
        location3_table_start: 7, location3_table_end: 9, location3_name: getTranslationByKey('abdomen'), location3_hp_max_base_mod: 1,
        location4_table_start: 10, location4_table_end: 10, location4_name: getTranslationByKey('chest'), location4_hp_max_base_mod: 2,
        location5_table_start: 11, location5_table_end: 12, location5_name: getTranslationByKey('right_wing'), location5_hp_max_base_mod: 0,
        location6_table_start: 13, location6_table_end: 14, location6_name: getTranslationByKey('left_wing'), location6_hp_max_base_mod: 0,
        location7_table_start: 15, location7_table_end: 16, location7_name: getTranslationByKey('right_arm'), location7_hp_max_base_mod: -1,
        location8_table_start: 17, location8_table_end: 18, location8_name: getTranslationByKey('left_arm'), location8_hp_max_base_mod: -1,
        location9_table_start: 19, location9_table_end: 20, location9_name: getTranslationByKey('head'), location9_hp_max_base_mod: 0,
        location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: '-',
        location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: '-',
        location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: '-',
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 0, location11_display: 0, location12_display: 0
    },
    winged_insect: {
        location1_table_start: 1, location1_table_end: 1, location1_name: getTranslationByKey('rear_right_leg'), location1_hp_max_base_mod: -1,
        location2_table_start: 2, location2_table_end: 2, location2_name: getTranslationByKey('rear_left_leg'), location2_hp_max_base_mod: -1,
        location3_table_start: 3, location3_table_end: 4, location3_name: getTranslationByKey('metathorax'), location3_hp_max_base_mod: 1,
        location4_table_start: 5, location4_table_end: 5, location4_name: getTranslationByKey('mid_right_leg'), location4_hp_max_base_mod: -1,
        location5_table_start: 6, location5_table_end: 6, location5_name: getTranslationByKey('mid_left_leg'), location5_hp_max_base_mod: -1,
        location6_table_start: 7, location6_table_end: 10, location6_name: getTranslationByKey('prothorax'), location6_hp_max_base_mod: 2,
        location7_table_start: 11, location7_table_end: 12, location7_name: getTranslationByKey('right_wing'), location7_hp_max_base_mod: -1,
        location8_table_start: 13, location8_table_end: 14, location8_name: getTranslationByKey('left_wing'), location8_hp_max_base_mod: -1,
        location9_table_start: 15, location9_table_end: 16, location9_name: getTranslationByKey('front_right_leg'), location9_hp_max_base_mod: -1,
        location10_table_start: 17, location10_table_end: 18, location10_name: getTranslationByKey('front_left_leg'), location10_hp_max_base_mod: -1,
        location11_table_start: 19, location11_table_end: 20, location11_name: getTranslationByKey('head'), location11_hp_max_base_mod: 0,
        location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: '-',
        location1to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 1, location11_display: 1, location12_display: 0
    },
    winged_quadruped: {
        location1_table_start: 1, location1_table_end: 2, location1_name: getTranslationByKey('rear_right_leg'), location1_hp_max_base_mod: 0,
        location2_table_start: 3, location2_table_end: 4, location2_name: getTranslationByKey('rear_left_leg'), location2_hp_max_base_mod: 0,
        location3_table_start: 5, location3_table_end: 7, location3_name: getTranslationByKey('hindquarters'), location3_hp_max_base_mod: 1,
        location4_table_start: 8, location4_table_end: 10, location4_name: getTranslationByKey('forequarters'), location4_hp_max_base_mod: 2,
        location5_table_start: 11, location5_table_end: 12, location5_name: getTranslationByKey('right_wing'), location5_hp_max_base_mod: -1,
        location6_table_start: 13, location6_table_end: 14, location6_name: getTranslationByKey('left_wing'), location6_hp_max_base_mod: -1,
        location7_table_start: 15, location7_table_end: 16, location7_name: getTranslationByKey('front_right_leg'), location7_hp_max_base_mod: 0,
        location8_table_start: 17, location8_table_end: 18, location8_name: getTranslationByKey('front_left_leg'), location8_hp_max_base_mod: 0,
        location9_table_start: 19, location9_table_end: 20, location9_name: getTranslationByKey('head'), location9_hp_max_base_mod: 0,
        location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: '-',
        location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: '-',
        location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: '-',
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 0, location11_display: 0, location12_display: 0
    }
}
const hpGetAttrs = ['siz', 'con', 'str', 'pow', 'hp_calc', 'simplified_combat_enabled', 
    `location1_hp_max_base_mod`, `location1_hp_max_other`, `location1_hp`, `location1_hp_max`,
    `location2_hp_max_base_mod`, `location2_hp_max_other`, `location2_hp`, `location2_hp_max`,
    `location3_hp_max_base_mod`, `location3_hp_max_other`, `location3_hp`, `location3_hp_max`,
    `location4_hp_max_base_mod`, `location4_hp_max_other`, `location4_hp`, `location4_hp_max`,
    `location5_hp_max_base_mod`, `location5_hp_max_other`, `location5_hp`, `location5_hp_max`,
    `location6_hp_max_base_mod`, `location6_hp_max_other`, `location6_hp`, `location6_hp_max`,
    `location7_hp_max_base_mod`, `location7_hp_max_other`, `location7_hp`, `location7_hp_max`,
    `location8_hp_max_base_mod`, `location8_hp_max_other`, `location8_hp`, `location8_hp_max`,
    `location9_hp_max_base_mod`, `location9_hp_max_other`, `location9_hp`, `location9_hp_max`,
    `location10_hp_max_base_mod`, `location10_hp_max_other`, `location10_hp`, `location10_hp_max`,
    `location11_hp_max_base_mod`, `location11_hp_max_other`, `location11_hp`, `location11_hp_max`,
    `location12_hp_max_base_mod`, `location12_hp_max_other`, `location12_hp`, `location12_hp_max`
]
/**
 * Find and return the root HP value which will need further modification per location
 * @param v attrs needed, ['siz', 'con', 'pow', 'str', 'simplified_combat_enabled', 'hp_calc']
 * @returns {number}
 */
function calcRootHP(v) {
    let denominator = 5;
    const siz = parseInt(v['siz']) || 0;
    const con = parseInt(v['con']) || 0;
    if (v['simplified_combat_enabled'] === '1') {
        denominator = 2;
    }

    if (v['hp_calc'] === '1') {
        const pow = parseInt(v['pow']) || 0;
        return Math.ceil((con + siz + pow)/denominator);
    } else if (v['hp_calc'] === '2') {
        const str = parseInt(v['str']) || 0;
        return Math.ceil((con + siz + str)/denominator);
    } else {
        return Math.ceil((con + siz)/denominator);
    }
}
/**
 *
 * @param num the location to calculate
 * @param v attrs needed, ['siz', 'con', 'str', 'pow', `location${num}_hp_max_base_mod`, `location${num}_hp_max_other`, `location${num}_hp`, `location${num}_hp_max`, 'hp_calc', 'simplified_combat_enabled']
 */
function calcLocationHP(num, v) {
    const rootHP = calcRootHP(v);
    const hpBaseMod = parseInt(v[`location${num}_hp_max_base_mod`]) || 0;
    const hpOther = parseInt(v[`location${num}_hp_max_other`]) || 0;
    const hpCurr = parseInt(v[`location${num}_hp`]) || 0;
    const hpMaxCurr = parseInt(v[`location${num}_hp_max`]) || 0;
    const newMax = rootHP + hpBaseMod + hpOther;
    const diff = hpCurr - hpMaxCurr;
    return {[`location${num}_hp`]: newMax + diff, [`location${num}_hp_max`]: newMax};
}
/**
 * Calc HP for all locations
 * @param v attrs neede, hpGetAttrs
 */
function calcAllHP(v) {
    return {
        ...calcLocationHP('1', v),
        ...calcLocationHP('2', v),
        ...calcLocationHP('3', v),
        ...calcLocationHP('4', v),
        ...calcLocationHP('5', v),
        ...calcLocationHP('6', v),
        ...calcLocationHP('7', v),
        ...calcLocationHP('8', v),
        ...calcLocationHP('9', v),
        ...calcLocationHP('10', v),
        ...calcLocationHP('11', v),
        ...calcLocationHP('12', v)
    }
}
/* Locational Hit Points */
['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].forEach(num => {
    on(`change:location${num}_hp_max_base_mod change:location${num}_hp_max_other`, function(event) {
        if (event.sourceType === "sheetworker") {return;}
        getAttrs(['siz', 'con', 'str', 'pow', `location${num}_hp_max_base_mod`, `location${num}_hp_max_other`,
            `location${num}_hp`, `location${num}_hp_max`, 'hp_calc', 'simplified_combat_enabled'], function(v) {
            if (debug) {console.log(`Setting attrs for location ${num} hp trigger`);}
            setAttrs( calcLocationHP(num, v) );
        });
    });
});
on(`change:hit_locations change:simplified_combat_enabled`, function(event) {
    /* don't prevent sheet workers cause they will set simplified_combat_enabled */
    getAttrs(['hit_locations'].concat(hpGetAttrs), function(v) {
        let newAttrs = hitLocationTable[v['hit_locations']];
        /* When simplified combat enabled we set hit locations to the special hidden simplified value */
        if (v['simplified_combat_enabled'] === '1') {
            newAttrs = hitLocationTable['simplified'];
        }
        /* merge the newAttrs with the ones we acquired to calculation all HP again */
        v = {...v, ...newAttrs}
        setAttrs({
            ...newAttrs,
            ...calcAllHP(v)
        })
    });
});
on('change:hp_calc', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(hpGetAttrs, function(v) {
        setAttrs({...calcAllHP(v)})
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

    getAttrs(['fatigue', 'healing_rate'].concat(actionPointGetAttrs, initGetAttrs, moveRateGetAttrs), function(v) {
        setAttrs({
            ...calcFatigue(v),
            ...calcActionPoints(v),
            ...calcInitiativeBonus(v),
            ...calcMoveRate(v)
        });
    });
});

/* Weapons */
/* When a favored weapon is selected it is added to the weapons_buttons attr which is how we add it to combat rolls */
on("change:repeating_meleeweapon:favored change:repeating_rangedweapon:favored", function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getSectionIDs("repeating_meleeweapon", function(meleeIds) {
        getSectionIDs("repeating_rangedweapon", function(rangedIds) {
            let meleeGetAttrs = [];
            meleeIds.forEach(id => {
                meleeGetAttrs.push(`repeating_meleeweapon_${id}_name`, `repeating_meleeweapon_${id}_favored`)
            });

            let rangedGetAttrs = [];
            rangedIds.forEach(id => {
                rangedGetAttrs.push(`repeating_rangedweapon_${id}_name`, `repeating_rangedweapon_${id}_favored`)
            });

            getAttrs(meleeGetAttrs.concat(rangedGetAttrs), function(v) {
                let weaponButtons = ""
                meleeIds.forEach(id => {
                    if (v[`repeating_meleeweapon_${id}_favored`] === '1') {
                        const name = v[`repeating_meleeweapon_${id}_name`];
                        weaponButtons = weaponButtons + ` [${name}](~@{character_name}|repeating_meleeweapon_${id}_damage)`;
                    }
                });
                rangedIds.forEach(id => {
                    if (v[`repeating_rangedweapon_${id}_favored`] === '1') {
                        const name = v[`repeating_rangedweapon_${id}_name`];
                        weaponButtons = weaponButtons + ` [${name}](~@{character_name}|repeating_rangedweapon_${id}_damage)`;
                    }
                });
                setAttrs({weapon_buttons: weaponButtons});
            });
        });
    });
});

/* Encumbrance */
const loadTable = {
    /* Normal */ '0': {"skills": '0', "movement": '+0'},
    /* Burdened */ '1': {"skills": '1', "movement": '-2'},
    /* Overloaded */ '2': {"skills": '2', "movement": '*.5'},
    /* Max */ '3': {"skills": '3', "movement": '*0'}
}

/* Repeating IDs */
on("change:repeating_combatstyle change:repeating_professionalskill change:repeating_passion change:repeating_meleeweapon " +
    "change:repeating_rangedweapon change:repeating_equipment change:repeating_currency change:repeating_condition " +
    "change:repeating_superpowerlimit change:repeating_tradition change:repeating_power change:repeating_feature", function(event) {
    if (event.sourceType === "sheetworker") {return;}
    const type = event.sourceAttribute.split('_')[1];
    const id = event.sourceAttribute.split('_')[2];

    /* seems we can get change that aren't for a particular item this checks to ensure we have an id to parse */
    if (id.startsWith("-")) {
        setAttrs({[`repeating_${type}_${id}_id`]: `repeating_${type}_${id}`});
    }
});

/* Character Import */
const cultRankMap = {
    'common': 1,
    'lay member': 1,
    'follower': 1,
    'dedicated': 2,
    'initiate': 2,
    'spirit worshipper': 2,
    'proven': 3,
    'acolyte': 3,
    'shaman': 3,
    'overseer': 4,
    'priest': 4,
    'high shaman': 4,
    'leader': 5,
    'high priest': 5,
    'spirit lord': 5
};
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
        console.log(v['action_points_calc']);
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

            /* We assume defaults and fill in what the import doesn't provide */
            let newAttrs = {
                rank: 0,
                str_base: 0, str_temp: 0, str: 0,
                con_base: 0, con_temp: 0, con: 0,
                siz_base: 0, siz_temp: 0, siz: 0,
                dex_base: 0, dex_temp: 0, dex: 0,
                int_base: 0, int_temp: 0, int: 0,
                pow_base: 0, pow_temp: 0, pow: 0,
                cha_base: 0, cha_temp: 0, cha: 0,
                characteristics_details: 0,
                action_points_other: 0, action_points_temp: 0, action_points_calc: v['action_points_calc'], action_points: 2, action_points_max: 2,
                damage_mod_calc: '0', damage_mod_other: 0, damage_mod_temp: 0,
                experience_mod_calc: '0', experience_mod_other: 0, experience_mod_temp: 0,
                healing_rate_calc: '0', healing_rate_other: 0, healing_rate_temp: 0, healing_rate_double: '0',
                initiative_bonus_other: 0, initiative_bonus_temp: 0, initiative_add_one_tenth_athletics: '0',
                luck_points_calc: '0', luck_points_other: 0, luck_points_temp: 0, luck_points_rank: v['luck_points_rank'], luck_points: 2, luck_points_max2: 2,
                magic_points_other: 0, magic_points_temp: 0, magic_points: 11, magic_points_max: 11,
                prana_points_other: 0, prana_points_temp: 0, prana_points: 11, prana_points_max: 11,
                power_points_other: 0, power_points_temp: 0, power_points: 11, power_points_max: 11,
                movement_rate_temp: 0, movement_rate_other: 0, movement_rate_species: 6,
                armor_penalty: 0, fatigue: '9', encumbrance_load: '0'
            };

            /* Import Info */
            if (debug) {console.log('Importing Info');}
            /* Due to differences in parsing we will import name and species after sheet type */

            if (characterData["cults"]) {
                if (characterData["cults"][0] !== []) {
                    if (characterData["cults"][0]) {
                        let cults = "";
                        for (let i=0; i < characterData["cults"].length; i++) {
                            cults = cults + " * " + characterData["cults"][i] + "\r\n";
                        }
                        newAttrs['cult_notes'] = cults;
                    }
                }
            }

            if (characterData["cult_rank"] && v['luck_points_rank'] === '1') {
                if (characterData["cult_rank"].toLowerCase() in cultRankMap) {
                    newAttrs['rank'] = cultRankMap[characterData["cult_rank"].toLowerCase()];
                }
            }

            if (characterData["notes"]) {
                newAttrs['sheet_notes'] = characterData["notes"];
            }

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
            newAttrs['character_name'] = getImportName(characterData['name'], v['import_type']);

            /* Import Attributes */
            if (debug) {console.log("Importing attributes");}
            if (characterData["attributes"]["movement"]) {
                const moveInt = parseInt(characterData["attributes"]["movement"]);
                if (Number.isInteger(moveInt) && moveInt > 0) {
                    newAttrs['movement_rate_species'] = moveInt;
                    newAttrs['movement_rate_base'] = moveInt;
                    newAttrs['movement_rate'] = moveInt;
                    /* TODO calculate advanced movement */
                } else {
                    newAttrs['custom_movement_enabled'] = '1';
                    newAttrs['custom_movement'] = characterData["attributes"]["movement"];
                }
            }

            if (characterData["attributes"]["strike_rank"].includes("-")) {
                /* if a penalty is present set the modifier for initiative later */
                const armorPenalty = parseInt(characterData["attributes"]["strike_rank"].split("-")[1].replace(')','')) || 0;
                newAttrs['armor_penalty'] = -armorPenalty;
            }

            /* Import Hit Locations */
            console.log("Importing Hit Locations");
            /* Import Hit Locations */
            if (v['simplified_combat_enabled'] === '1') {
                newAttrs['hit_locations'] = "simplified";
                newAttrs = {...newAttrs, ...hitLocationTable['simplified']};
                newAttrs = {...newAttrs, ...calcLocationHP('1', newAttrs)};
                let apTotal = 0;
                characterData["hit_locations"].forEach(location => {
                    let locationAP = location['ap'];
                    apTotal = apTotal + locationAP;
                });
                /* Get the average ap value as a rough conversion to simplified combat */
                newAttrs['location1_ap'] = Math.round(apTotal / characterData["hit_locations"].length);
            } else {
                /* Determine number of hit locations and set custom form to proper amount */
                if (characterData["hit_locations"].length === 12) {
                    newAttrs['hit_locations'] = "custom";
                } else {
                    newAttrs['hit_locations'] = "custom" + characterData["hit_locations"].length;
                }
                newAttrs = {...newAttrs, ...hitLocationTable[newAttrs['hit_locations']]};

                const rootHp = calcRootHP(newAttrs);

                for (let i=0; i < characterData["hit_locations"].length; i++) {
                    let location = i + 1;

                    let table = characterData["hit_locations"][i]["range"].split("-");
                    newAttrs[`location${location}_table_start`] = parseInt(table[0]);
                    if (!table[1]) {
                        newAttrs[`location${location}_table_end`] = parseInt(table[0]);
                    } else {
                        newAttrs[`location${location}_table_end`] = parseInt(table[1]);
                    }

                    newAttrs[`location${location}_name`] = characterData["hit_locations"][i]["name"];

                    let locationAP = characterData["hit_locations"][i]['ap'];
                    newAttrs[`location${location}_ap`] = locationAP;
                    newAttrs[`location${location}_ap_max`] = locationAP;
                    const newLocHP = parseInt(characterData["hit_locations"][i]["hp"]);
                    newAttrs[`location${location}_hp_max_base_mod`] = newLocHP - rootHp;
                    newAttrs[`location${location}_hp_max_other`] = 0;
                    newAttrs[`location${location}_hp_max`] = newLocHP;
                    newAttrs[`location${location}_hp`] = newLocHP;
                    newAttrs[`location${location}_hp`] = newLocHP;
                }
            }

            /* TODO Import weapons & combat style */

            /* Import Notes TODO import misc features as notes*/


            /* Clear the import data */
            newAttrs['import_json_data'] = '';
            newAttrs['import_errors'] = '';

            setAttrs({
                ...newAttrs,
                ...calcActionPoints(newAttrs),
                ...calcDamageMod(newAttrs),
                ...calcExpMod(newAttrs),
                ...calcHealingRate(newAttrs),
                ...calcInitiativeBonus(newAttrs),
                ...calcLuckPoints(newAttrs),
                ...calcMagicPoints(newAttrs),
                ...calcPowerPoints(newAttrs),
                ...calcPranaPoints(newAttrs),
                ...calcTenacity(newAttrs),
                ...calcAllHP(newAttrs)
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
    getAttrs(charGetAttrs.concat(hpGetAttrs,
        ['action_points_other', 'action_points_add_one', 'notes', "location2_display"]), function(v) {
        let newAttrs = {'version': '3.0'};

        /* Convert Characteristics base values */
        characteristicAttrs.forEach(char => {
            const charCurr = parseInt(v[`${char}`]) || 0;
            const charTemp = parseInt(v[`${char}_temp`]) || 0;
            newAttrs[`${char}_base`] = charCurr - charTemp;
        });

        /* Convert action_points_add_one to just +1 in other */
        if (v['action_points_add_one'] === '1') {
            const actionPointsOther = parseInt(v['action_points_other']) || 0;
            newAttrs['action_points_other'] = actionPointsOther + 1;
        }

        /* Convert Hit Locations Display*/
        if (v['location2_display'] === '1') {
            newAttrs['location2to7_display'] === '1';
        }
        /* Convert HP for simplified combat */
        let newHpAttrs = {}
        if (v['simplified_combat_enabled'] === '1') {
            newHpAttrs = {
                ...hitLocationTable['simplified'],
                ...calcLocationHP('1', {...v, ...hitLocationTable['simplified']})
            };
        }

        /* Convert Notes */
        if (v['notes']) {
            newAttrs['sheet_notes'] = v['notes'];
        }

        /* Delete json import data due to size and not needing it anymore, v3 does this for us after import */
        newAttrs['encounter_generator_json'] = '';

        setAttrs({
            ...newAttrs,
            ...newHpAttrs
        });
    });
}
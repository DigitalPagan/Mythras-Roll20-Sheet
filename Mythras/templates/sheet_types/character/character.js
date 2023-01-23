/* Characteristics */
const characteristicAttrs = ['str', 'con', 'siz', 'dex', 'int', 'pow', 'cha'];
characteristicAttrs.forEach(char => {
    on(`change:${char}_base change:${char}`, function(event) {
        if (event.sourceType === "sheetworker") {return;}

        let repeatingIds = {}
        getSectionIDs("repeating_meleeweapon", function(meleeWeaponIds) {
            repeatingIds['meleeWeaponIds'] = meleeWeaponIds;
            getSectionIDs("repeating_rangedweapon", function(rangedWeaponIds) {
                repeatingIds['rangedWeaponIds'] = rangedWeaponIds;
                getSectionIDs("repeating_equipment", function(gearIds) {
                    repeatingIds['gearIds'] = gearIds;
                    getSectionIDs("repeating_currency", function(currencyIds) {
                        repeatingIds['currencyIds'] = currencyIds;
                        getSectionIDs("repeating_combatstyle", function(combatStyleIds) {
                            getSectionIDs("repeating_professionalskill", function(proSkillIds) {
                                let combatStyleGetAttrs = [];
                                combatStyleIds.forEach(id => {
                                    combatStyleGetAttrs.push(`repeating_combatstyle_${id}_total`,
                                        `repeating_combatstyle_${id}_other`, `repeating_combatstyle_${id}_notes`,
                                        `repeating_combatstyle_${id}_name`, `repeating_combatstyle_${id}_char1`,
                                        `repeating_combatstyle_${id}_char2`);
                                });

                                let proSkillGetAttrs = [];
                                proSkillIds.forEach(id => {
                                    proSkillGetAttrs.push(`repeating_professionalskill_${id}_total`,
                                        `repeating_professionalskill_${id}_other`, `repeating_professionalskill_${id}_notes`,
                                        `repeating_professionalskill_${id}_name`, `repeating_professionalskill_${id}_char1`,
                                        `repeating_professionalskill_${id}_char2`);
                                });

                                let stdSkillGetAttrs = [];
                                stdSkillIds.forEach(id => {
                                    stdSkillGetAttrs.push(`${id}`, `${id}_other`, `${id}_notes`);
                                });

                                getAttrs([`${char}_base`, `${char}_temp`, `${char}_pool`, 'social_defense_id'].concat(characteristicAttrs,
                                    encGetAttrs(repeatingIds), actionPointGetAttrs, confidenceGetAttrs, damageModGetAttrs, expModGetAttrs,
                                    healingRateGetAttrs, initGetAttrs, luckPointsGetAttrs, magicPointsGetAttrs, tenacityGetAttrs, hpGetAttrs,
                                    moveRateGetAttrs, spiritIntensityGetAttrs, composureGetAttrs, integrityGetAttrs, resolveGetAttrs,
                                    spiritDamageGetAttrs, socialDamageGetAttrs, stdSkillGetAttrs, combatStyleGetAttrs, proSkillGetAttrs
                                ), function(v) {
                                    let newAttrs = {};
                                    const baseCharVal = parseInt(v[`${char}_base`]) || 0;
                                    const tempCharVal = parseInt(v[`${char}_temp`]) || 0;
                                    const currCharVal = parseInt(v[`${char}`]) || 0;
                                    const currPoolVal = parseInt(v[`${char}_pool`]) || 0;

                                    if (event.sourceAttribute === `${char}`) {
                                        newAttrs[`${char}_temp`] = currCharVal - baseCharVal;
                                        const diffVal = newAttrs[`${char}_temp`] - tempCharVal;
                                        newAttrs[`${char}_pool`] = currPoolVal + diffVal;
                                    } else if (event.sourceAttribute === `${char}_base`) {
                                        newAttrs[`${char}`] = baseCharVal + tempCharVal;
                                        const diffVal = newAttrs[`${char}`] - currCharVal;
                                        newAttrs[`${char}_pool`] = currPoolVal + diffVal;
                                        v[`${char}`] = baseCharVal + tempCharVal; /* override the old value from getAttr, so we can base other calculations on the new value */
                                    }

                                    stdSkillIds.forEach(skillId => {
                                        newAttrs = {...newAttrs, ...calcStdSkill(skillId, v, event.sourceAttribute)};
                                    });
                                    combatStyleIds.forEach(id => {
                                        newAttrs = {...newAttrs, ...calcProSkill(`repeating_combatstyle_${id}`, v, event.sourceAttribute)};
                                    });
                                    proSkillIds.forEach(id => {
                                        newAttrs = {...newAttrs, ...calcProSkill(`repeating_professionalskill_${id}`, v, event.sourceAttribute)};
                                    });

                                    newAttrs = {...newAttrs, ...calcEncAndArmorPenalty(repeatingIds, v)};
                                    /* Update v with new values need for attribute calculations */
                                    v = {...v, ...newAttrs};
                                    setAttrs({
                                        ...newAttrs,
                                        ...calcActionPoints(v, event.sourceAttribute),
                                        ...calcConfidence(v),
                                        ...calcDamageMod(v),
                                        ...calcExpMod(v),
                                        ...calcHealingRate(v),
                                        ...calcInitiativeBonus(v),
                                        ...calcLuckPoints(v, event.sourceAttribute),
                                        ...calcMagicPoints(v, event.sourceAttribute),
                                        ...calcMoveRate(v),
                                        ...calcSpiritIntensity(v),
                                        ...calcTenacity(v, event.sourceAttribute),
                                        ...calcAllHP(v),
                                        ...calcComposure(v),
                                        ...calcIntegrity(v),
                                        ...calcResolve(v)
                                        /* No need for teh social and spirit damage here since it would have been done via skills */
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});

/* Action Points */
const actionPointGetAttrs = ['dex', 'int', 'pow', 'action_points_other', 'action_points_temp', 'action_points_calc', 'action_points', 'action_points_max', 'fatigue', 'attribute_mode']
function calcActionPoints(v, sourceAttribute) {
    let newAttrs = {};
    const int = parseInt(v['int']) || 0;
    const action_points_other = parseInt(v['action_points_other']) || 0;
    const action_points_temp = parseInt(v['action_points_temp']) || 0;
    const action_points_max = parseInt(v['action_points_max']) || 0;
    const action_points = parseInt(v['action_points']) || 0;
    const fatigueMod = parseInt(fatigueTable[v['fatigue']]['action_points']) || 0;

    if (v['action_points_calc'] === "set_2") {
        newAttrs['action_points_base'] = 2 + action_points_other;
    } else if (v['action_points_calc'] === "set_3") {
        newAttrs['action_points_base'] = 3 + action_points_other;
    } else {
        if (v['attribute_mode'] === 'physical') {
            const dex = parseInt(v['dex']) || 0;
            newAttrs['action_points_base'] = Math.ceil((int + dex) / 12) + action_points_other + fatigueMod;
        } else if (v['attribute_mode'] === 'spiritual') {
            const pow = parseInt(v['pow']) || 0;
            newAttrs['action_points_base'] = Math.ceil((int + pow) / 12) + action_points_other; /* I assume fatigue doesn't affect spirit */
        } else {
            newAttrs['action_points_base'] = 3 + fatigueMod;
        }
    }

    let diffVal;
    if (sourceAttribute === 'action_points_max') {
        newAttrs['action_points_temp'] = action_points_max - newAttrs['action_points_base'];
        diffVal = newAttrs['action_points_temp'] - action_points_temp;
    } else {
        newAttrs['action_points_max'] = newAttrs['action_points_base'] + action_points_temp;
        diffVal = newAttrs['action_points_max'] - action_points_max;
    }

    newAttrs['action_points'] = action_points + diffVal;
    return newAttrs;
}
on('change:action_points_other change:action_points_max', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(actionPointGetAttrs, function(v) {
        setAttrs(calcActionPoints(v, event.sourceAttribute));
    });
});
on('change:action_points_calc', function(event) {
    /* Don't exit on sheetworker cause humans will modify the option not the setting itself */
    getAttrs(actionPointGetAttrs, function(v) {
        setAttrs({
            ...calcActionPoints(v, event.sourceAttribute)
        });
    });
});

/* Confidence */
const confidenceGetAttrs = ['confidence_other', 'confidence_base', 'confidence', 'willpower']
function calcConfidence(v) {
    let newAttrs = {};
    const confidenceOther = parseInt(v['confidence_other']) || 0;
    const confidenceBase = parseInt(v['confidence_base']) || 0;
    const confidence = parseInt(v['confidence']) || 0;
    const willpower = parseInt(v['willpower']) || 0;
    newAttrs['confidence_base'] = Math.floor(willpower/20) + confidenceOther;
    const diffVal = newAttrs['confidence_base'] - confidenceBase;
    newAttrs['confidence'] = confidence + diffVal;

    return newAttrs;
}
on('change:confidence_other', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(confidenceGetAttrs, function(v) {
        setAttrs(calcConfidence(v));
    });
});

/* Social Damage */
const socialDamageGetAttrs = ['social_offense_id', 'social_offense_total', 'social_damage_other', 'social_damage_base', 'social_damage'];
/**
 * Calculate the social damage value
 * @param v attrs needed for calc; socialDamageGetAttrs
 * @returns {}
 */
function calcSocialDamage(v) {
    let newAttrs = {};
    let socialOffenseSkill = parseInt(v['social_offense_total']) || 0;
    const socialOffenseOther = parseInt(v['social_offense_other']) || 0;
    const newSocialDamageStep = Math.ceil(socialOffenseSkill/20) + socialOffenseOther - 1;
    newAttrs['social_damage_base'] = damageTable(newSocialDamageStep);
    const socialDamageBaseStep = damageTableReverse(v['social_damage_base']);
    const socialDamageStep = damageTableReverse(v['social_damage']);
    const diffVal = socialDamageStep - socialDamageBaseStep;
    newAttrs['social_damage'] = damageTable(newSocialDamageStep + diffVal);

    return newAttrs;
}
on('change:social_damage_other', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(socialDamageGetAttrs, function(v) {
        setAttrs(calcSocialDamage(v));
    });
});

/* Spirit Damage */
const spiritDamageGetAttrs = ['spirit_combat_skill_id', 'spirit_combat_skill_total', 'spirit_damage_other', 'spirit_damage_base', 'spirit_damage'];
/**
 * Calculate the spirt damage value
 * @param v attrs needed for calc; spiritDamageGetAttrs
 * @returns {}
 */
function calcSpiritDamage(v) {
    let newAttrs = {};
    let spiritCombatSkill = parseInt(v['spirit_combat_skill_total']) || 0;
    if (v['spirit_combat_skill_id'] === 'willpower') {
        spiritCombatSkill = Math.ceil(spiritCombatSkill/2);
    }
    const spiritDamageOther = parseInt(v['spirit_damage_other']) || 0;
    const newSpiritDamageStep = Math.ceil(spiritCombatSkill/20) + spiritDamageOther - 1;
    newAttrs['spirit_damage_base'] = damageTable(newSpiritDamageStep);
    const spiritDamageBaseStep = damageTableReverse(v['spirit_damage_base']);
    const spiritDamageStep = damageTableReverse(v['spirit_damage']);
    const diffVal = spiritDamageStep - spiritDamageBaseStep;
    newAttrs['spirit_damage'] = damageTable(newSpiritDamageStep + diffVal);

    return newAttrs;
}
on('change:spirit_damage_other', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(spiritDamageGetAttrs, function(v) {
        setAttrs(calcSpiritDamage(v));
    });
});

/* Damage Modifier */
const damageModGetAttrs = ['str', 'siz', 'con', 'pow', 'damage_mod_calc', 'damage_mod_base', 'damage_mod_other', 'damage_mod'];
const damageModSteps = ['-1d8','-1d6','-1d4','-1d2','0','1d2','1d4','1d6','1d8','1d10','1d12','2d6','1d8+1d6','2d8',
    '1d10+1d8','2d10','2d10+1d2','2d10+1d4','2d10+1d6','2d10+1d8','3d10','3d10+1d2','3d10+1d4']
function damageModTable(step) {
    if (step < 0) {
        return damageModSteps[0];
    } else if (step > 22) {
        return damageModSteps[22];
    } else {
        return damageModSteps[step];
    }
}
const damageModStepsReverse = {'-1d8': 0, '-1d6': 1, '-1d4': 2, '-1d2': 3, '0': 4, '1d2': 5, '1d4': 6, '1d6': 7,
    '1d8': 8, '1d10': 9, '1d12': 10, '2d6': 11, '1d8+1d6': 12, '2d8': 13, '1d10+1d8': 14, '2d10': 15, '2d10+1d2': 16,
    '2d10+1d4': 17, '2d10+1d6': 18, '2d10+1d8': 19, '3d10': 20, '3d10+1d2': 21, '3d10+1d4': 22
}
function damageModTableReverse(value) {
    if (!(value in damageModStepsReverse) && value.startsWith('-')) {
        return 0;
    } else if (!(value in damageModStepsReverse) && !value.startsWith('-')) {
        return 22;
    } else {
        return damageModStepsReverse[value];
    }
}
/**
 * Calculate the damage modifier
 * @param v attrs needed for calc; damageModGetAttrs
 * @returns {}
 */
function calcDamageMod(v) {
    let damage_mod_table_value;
    const str = parseInt(v['str']) || 0;
    const siz = parseInt(v['siz']) || 0;
    const damageModOther = parseInt(v['damage_mod_other']) || 0;
    if (v['damage_mod_calc'] === '1') {
        const pow = parseInt(v['pow']) || 0;
        damage_mod_table_value = str + siz + pow;
    } else if (v['damage_mod_calc'] === '2') {
        const con = parseInt(v['con']) || 0;
        damage_mod_table_value = str + siz + con;
    } else {
        damage_mod_table_value = str + siz;
    }

    const base_damage_mod_step = Math.ceil(damage_mod_table_value / 5) - 1 + damageModOther;
    const currentDamageModBaseStep = damageModTableReverse(v['damage_mod_base']);
    const currentDamageModStep = damageModTableReverse(v['damage_mod']);
    const diffVal = currentDamageModStep - currentDamageModBaseStep;

    return {
        damage_mod_base: damageModTable(base_damage_mod_step),
        damage_mod: damageModTable(base_damage_mod_step + diffVal)
    };
}
on('change:damage_mod_other change:damage_mod_calc', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(damageModGetAttrs, function(v) {
        setAttrs(calcDamageMod(v));
    });
});

/* Experience Modifier */
const expModGetAttrs = ['cha', 'int', 'experience_mod_calc', 'experience_mod_other', 'experience_mod_base', 'experience_mod'];
/**
 * Calculate Experience Modifier
 * @param v attributes needed for calc, expModGetAttrs
 * @returns {}
 */
function calcExpMod(v) {
    let newAttrs = {};
    const expModOther = parseInt(v['experience_mod_other']) || 0;
    const expModBase = parseInt(v['experience_mod_base']) || 0;
    const expMod = parseInt(v['experience_mod']) || 0;
    if(v['experience_mod_calc'] === '1') {
        const int = parseInt(v['int']) || 0;
        newAttrs['experience_mod_base'] = Math.ceil(int/6)-2 + expModOther;
    } else {
        const cha = parseInt(v['cha']) || 0;
        newAttrs['experience_mod_base'] = Math.ceil(cha/6)-2 + expModOther;
    }
    const diffVal = newAttrs['experience_mod_base'] - expModBase;
    newAttrs['experience_mod'] = expMod + diffVal;

    return newAttrs;
}
on('change:experience_mod_other change:experience_mod_calc', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(expModGetAttrs, function(v) {
        setAttrs(calcExpMod(v));
    });
});

/* Experience Modifier */
const healingRateGetAttrs = ['con', 'pow', 'healing_rate_calc', 'healing_rate_other', 'healing_rate_base', 'healing_rate', 'healing_rate_double'];
/**
 * Calculate Healing Rate
 * @param v attributes needed for calc, healingRateGetAttrs
 * @returns {}
 */
function calcHealingRate(v) {
    let base_multiplier;
    let newAttrs = {};
    const con = parseInt(v['con']) || 0;
    const healingRateOther = parseInt(v['healing_rate_other']) || 0;
    const healingRateBase = parseInt(v['healing_rate_base']) || 0;
    const healingRate = parseInt(v['healing_rate']) || 0;
    if (v['healing_rate_double'] === '1') {
        base_multiplier = 2;
    } else {
        base_multiplier = 1;
    }

    if (v['healing_rate_calc'] === '1') {
        const pow = parseInt(v['pow']) || 0;
        newAttrs['healing_rate_base'] = (Math.ceil(Math.ceil(con+(pow/2))/6) * base_multiplier)+healingRateOther;
    } else {
        newAttrs['healing_rate_base'] = (Math.ceil(con/6) * base_multiplier)+healingRateOther;
    }
    const diffVal = newAttrs['healing_rate_base'] - healingRateBase;
    newAttrs['healing_rate'] = healingRate + diffVal;

    return newAttrs;
}
on('change:healing_rate_other change:healing_rate_calc change:healing_rate_double', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(healingRateGetAttrs, function(v) {
        setAttrs(calcHealingRate(v));
    });
});

/* Initiative */
const initGetAttrs=['int', 'dex', 'cha', 'initiative_bonus_other', 'initiative_bonus_base', 'initiative_bonus',
    'armor_penalty', 'fatigue', 'athletics', 'initiative_add_one_tenth_athletics', 'attribute_mode']
/**
 * Calculate Initiative Bonus
 * @param v attrs needed for calculation, initGetAttrs
 * @returns {}
 */
function calcInitiativeBonus(v) {
    let newAttrs = {};
    const int = parseInt(v['int']) || 0;
    const initOther = parseInt(v['initiative_bonus_other']) || 0;
    const initBase = parseInt(v['initiative_bonus_base']) || 0;
    const init = parseInt(v['initiative_bonus']) || 0;
    const fatiguePenalty = parseInt(fatigueTable[v['fatigue']]['initiative']) || 0;
    if (v['attribute_mode'] === 'physical') {
        const dex = parseInt(v['dex']) || 0;
        const armor_penalty = parseInt(v['armor_penalty']) || 0;
        let athletics_bonus = 0;
        if (v['initiative_add_one_tenth_athletics'] === '1') {
            const athletics = parseInt(v['athletics']) || 0;
            athletics_bonus = Math.ceil(athletics/10);
        }
        newAttrs['initiative_bonus_base'] = Math.ceil((int + dex) / 2) + initOther + athletics_bonus + fatiguePenalty + armor_penalty;
    } else { /* Social and spirit initiative are the same */
        const cha = parseInt(v['cha']) || 0;
        newAttrs['initiative_bonus_base'] = Math.ceil((int + cha) / 2) + initOther;
    }

    const diffVal = newAttrs['initiative_bonus_base'] - initBase;
    newAttrs['initiative_bonus'] = init + diffVal;

    return newAttrs;
}
on('change:initiative_bonus_other change:initiative_add_one_tenth_athletics', function(event) {
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
 * @param sourceAttribute the attr the triggered the change
 * @returns {}
 */
function calcLuckPoints(v, sourceAttribute) {
    let newAttrs = {};
    const pow = parseInt(v['pow']) || 0;
    const rank = parseInt(v['rank']) || 0;
    const luckPointsRank = parseInt(v['luck_points_rank']) || 0;
    const luckPointsOther = parseInt(v['luck_points_other']) || 0;
    const luckPointsTemp = parseInt(v['luck_points_temp']) || 0;
    const luckPointsMax = parseInt(v['luck_points_max']) || 0;
    const luckPointsCurr = parseInt(v['luck_points']) || 0;
    if (v['luck_points_calc'] === '1') {
        const cha = parseInt(v['cha']) || 0;
        newAttrs['luck_points_base'] = Math.ceil(Math.ceil(cha+(pow/2))/6) + luckPointsOther + (luckPointsRank * rank);
    } else {
        newAttrs['luck_points_base'] = Math.ceil(pow/6) + luckPointsOther + (luckPointsRank * rank);
    }

    let diffVal;
    if (sourceAttribute === 'luck_points_max') {
        newAttrs['luck_points_temp'] = luckPointsMax - newAttrs['luck_points_base'];
        diffVal = newAttrs['luck_points_temp'] - luckPointsTemp;
    } else {
        newAttrs['luck_points_max'] = newAttrs['luck_points_base'] + luckPointsTemp;
        diffVal = newAttrs['luck_points_max'] - luckPointsMax;
    }

    newAttrs['luck_points'] = luckPointsCurr + diffVal;
    return newAttrs;
}
on('change:luck_points_other change:luck_points_max change:luck_points_calc change:rank', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(luckPointsGetAttrs, function(v) {
        setAttrs(calcLuckPoints(v, event.sourceAttribute));
    });
});
on('change:luck_points_rank', function(event) {
    /* Don't exit on sheetworker cause humans will modify the option not the setting itself */
    getAttrs(luckPointsGetAttrs, function(v) {
        setAttrs(calcLuckPoints(v, event.sourceAttribute));
    });
});

/* Magic Points */
const magicPointsGetAttrs = ['pow', 'magic_points_other', 'magic_points_temp', 'magic_points', 'magic_points_max'];
/**
 * Calculate Magic points
 * @param v attrs needed for calculation, magicPointsGetAttrs
 * @param sourceAttribute the attr the triggered the change
 * @returns {}
 */
function calcMagicPoints(v, sourceAttribute) {
    let newAttrs = {};
    const pow = parseInt(v['pow']) || 0;
    const magicPointsOther = parseInt(v['magic_points_other']) || 0;
    const magicPointsTemp = parseInt(v['magic_points_temp']) || 0;
    const magicPointsCurr = parseInt(v['magic_points']) || 0;
    const magicPointsMax = parseInt(v['magic_points_max']) || 0;
    newAttrs['magic_points_base'] = pow + magicPointsOther;

    let diffVal;
    if (sourceAttribute === 'magic_points_max') {
        newAttrs['magic_points_temp'] = magicPointsMax - newAttrs['magic_points_base'];
        diffVal = newAttrs['magic_points_temp'] - magicPointsTemp;
    } else {
        newAttrs['magic_points_max'] = newAttrs['magic_points_base'] + magicPointsTemp;
        diffVal = newAttrs['magic_points_max'] - magicPointsMax;
    }

    newAttrs['magic_points'] = magicPointsCurr + diffVal;
    return newAttrs;
}
on('change:magic_points_other change:magic_points_max', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(magicPointsGetAttrs, function(v) {
        setAttrs(calcMagicPoints(v, event.sourceAttribute));
    });
});

/* Movement Rate */
const moveRateGetAttrs = ['movement_rate_species', 'movement_rate_other', 'movement_rate', 'movement_rate_base', 'fatigue', 'encumbrance_load', 'athletics', 'swim'];
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
    let newAttrs = {};
    const moveRateSpecies = parseInt(v['movement_rate_species']) || 0;
    const moveRateOther = parseInt(v['movement_rate_other']) || 0;
    const moveRateBase = parseInt(v['movement_rate_base']) || 0;
    const moveRate = parseInt(v['movement_rate']) || 0;
    const core_value = moveRateSpecies + moveRateOther;
    const moveAfterFatigue = applyMovementMod(core_value, fatigueTable[v['fatigue']]['movement']);
    newAttrs['movement_rate_base'] = applyMovementMod(moveAfterFatigue, loadTable[v['encumbrance_load']]['movement']);

    const diffVal = newAttrs['movement_rate_base'] - moveRateBase;
    newAttrs['movement_rate'] = moveRate + diffVal;

    /* TODO calculate advance movement */

    return newAttrs;
}
on('change:movement_rate_species change:movement_rate_other', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(moveRateGetAttrs, function(v) {
        setAttrs(calcMoveRate(v));
    });
});

/* Spirit Intensity */
const spiritIntensityGetAttrs = ['pow']
function calcSpiritIntensity(v) {
    const pow = parseInt(v['pow']) || 0;
    return {'spirit_intensity': Math.floor(pow/6)};
}

/* Tenacity Points */
const tenacityGetAttrs = ['pow', 'tenacity_other', 'tenacity_temp', 'tenacity', 'tenacity_max', 'tenacity_dependencies', 'apply_dependencies_penalty'];
/**
 * Calculate Tenacity points
 * @param v attrs needed for calculation, tenacityPointsGetAttrs
 * @param sourceAttribute the attr the triggered the change
 * @returns {}
 */
function calcTenacity(v, sourceAttribute) {
    let newAttrs = {};
    const pow = parseInt(v['pow']) || 0;
    const tenacityOther = parseInt(v['tenacity_other']) || 0;
    const tenacityTemp = parseInt(v['tenacity_temp']) || 0;
    const tenacityCurr = parseInt(v['tenacity']) || 0;
    const tenacityMax = parseInt(v['tenacity_max']) || 0;
    let tenacityDeps = 0;
    if (v['apply_dependencies_penalty'] === '1') {
        tenacityDeps = parseInt(v['tenacity_dependencies']) || 0;
    }
    newAttrs['tenacity_base'] = pow + tenacityOther + tenacityDeps;

    let diffVal;
    if (sourceAttribute === 'tenacity_max') {
        newAttrs['tenacity_temp'] = tenacityMax - newAttrs['tenacity_base'];
        diffVal = newAttrs['tenacity_temp'] - tenacityTemp;
    } else {
        newAttrs['tenacity_max'] = newAttrs['tenacity_base'] + tenacityTemp;
        diffVal = newAttrs['tenacity_max'] - tenacityMax;
    }

    newAttrs['tenacity'] = tenacityCurr + diffVal;
    return newAttrs;
}
on('change:tenacity_other change:tenacity_max change:apply_dependencies_penalty', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(tenacityGetAttrs, function(v) {
        setAttrs(calcTenacity(v, event.sourceAttribute));
    });
});

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
        });
    });
});
on('change:hp_calc', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(hpGetAttrs, function(v) {
        setAttrs({...calcAllHP(v)});
    });
});

/* Composure */
const composureGetAttrs = ['composure', 'composure_other', 'composure_max', 'pow']
function calcComposure(v) {
    const pow = parseInt(v['pow']) || 0;
    const composureOther = parseInt(v['composure_other']) || 0;
    const composureMax = parseInt(v['composure_max']) || 0;
    const composureCurr = parseInt(v['composure']) || 0;
    const newMax = Math.ceil(pow/3) + composureOther;
    const diff = composureCurr - composureMax;
    return {['composure']: newMax + diff, composure_max: newMax};
}
on('change:composure_other', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(composureGetAttrs, function(v) {
        setAttrs(calcComposure(v));
    });
});

/* Integrity */
const integrityGetAttrs = ['integrity', 'integrity_other', 'integrity_max', 'cha']
function calcIntegrity(v) {
    let newAttrs = {};
    const cha = parseInt(v['cha']) || 0;
    const integrityOther = parseInt(v['integrity_other']) || 0;
    const integrityMax = parseInt(v['integrity_max']) || 0;
    const integrityCurr = parseInt(v['integrity']) || 0;
    newAttrs['integrity_max'] = Math.ceil(cha/3) + integrityOther;
    const diffVal = newAttrs['integrity_max'] - integrityMax;
    newAttrs['integrity'] = integrityCurr + diffVal;
    return newAttrs;
}
on('change:integrity_other', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(integrityGetAttrs, function(v) {
        setAttrs(calcIntegrity(v));
    });
});

/* Resolve */
const resolveGetAttrs = ['resolve', 'resolve_other', 'resolve_max', 'int']
function calcResolve(v) {
    let newAttrs = {};
    const int = parseInt(v['int']) || 0;
    const resolveOther = parseInt(v['resolve_other']) || 0;
    const resolveMax = parseInt(v['resolve_max']) || 0;
    const resolveCurr = parseInt(v['resolve']) || 0;
    newAttrs['resolve_max'] = Math.ceil(int/3) + resolveOther;
    const diffVal = newAttrs['resolve_max'] - resolveMax;
    newAttrs['resolve'] = resolveCurr + diffVal;
    return newAttrs;
}
on('change:resolve_other', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(resolveGetAttrs, function(v) {
        setAttrs(calcResolve(v));
    });
});

/* Attribute Mode */
on('change:attribute_mode', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    getAttrs(actionPointGetAttrs.concat(initGetAttrs), function(v) {
        setAttrs({
            ...calcActionPoints(v, event.sourceAttribute),
            ...calcInitiativeBonus(v),
        });
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
on("change:repeating_meleeweapon:favored change:repeating_rangedweapon:favored change:_reporder:meleeweapon change:_reporder:rangedweapon remove:repeating_meleeweapon remove:repeating_rangedweapon", function(event) {
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

/* Skills */
/* Standard Skills */
const stdSkillChars = {
    /* standard skill chrs */
    'athletics': ['str', 'dex'],
    'brawn': ['str', 'siz'],
    'boating': ['str', 'con'],
    'conceal': ['dex', 'pow'],
    'customs': ['int', 'int'],
    'dance': ['dex', 'cha'],
    'deceit': ['int', 'cha'],
    'drive': ['dex', 'pow'],
    'endurance': ['con', 'con'],
    'evade': ['dex', 'dex'],
    'first_aid': ['dex', 'int'],
    'home_parallel': ['int', 'int'],
    'influence': ['cha', 'cha'],
    'insight': ['int', 'pow'],
    'locale': ['int', 'int'],
    'native_tongue': ['int', 'cha'],
    'perception': ['int', 'pow'],
    'ride': ['dex', 'pow'],
    'sing': ['pow', 'cha'],
    'spectral_combat': ['pow', 'cha'],
    'status': [0, 0],
    'stealth': ['dex', 'int'],
    'superstition': ['21-int', 'pow'],
    'swim': ['str', 'con'],
    'unarmed': ['str', 'dex'],
    'willpower': ['pow', 'pow']
}
const stdSkillIds = Object.keys(stdSkillChars);
function calcStdSkill(skillId, v, sourceAttribute) {
    let newAttrs = {};
    const int = parseInt(v['int']) || 0;
    v['21-int'] = 21 - int;
    const char1 = parseInt(v[stdSkillChars[`${skillId}`][0]]) || 0;
    const char2 = parseInt(v[stdSkillChars[`${skillId}`][1]]) || 0;

    if (sourceAttribute === skillId) {
        const skill = parseInt(v[`${skillId}`]) || 0;
        newAttrs[`${skillId}_other`] = skill - char1 - char2;
    } else {
        const skillOther = parseInt(v[`${skillId}_other`]) || 0;
        newAttrs[`${skillId}`] = char1 + char2 + skillOther;
        /* for spirit and social skills we set the new value in v so those calcs may use the new value */
        v[`${skillId}`] = newAttrs[`${skillId}`];
    }

    let newInitAttrs = {};
    let newMoveAttrs = {};
    if ('athletics' === skillId) {
        if (v['initiative_add_one_tenth_athletics'] === '1') {
            newInitAttrs = calcInitiativeBonus(v);
        }
        newMoveAttrs = calcMoveRate(v);
    }
    if ('swim' === skillId) {
        newMoveAttrs = calcMoveRate(v);
    }

    let newSpiritDamageAttrs = {};
    if (v['spirit_combat_skill_id'] === skillId) {
        newAttrs['spirit_combat_skill_name'] =  getTranslationByKey(skillId);
        newAttrs['spirit_combat_skill_total'] = v[`${skillId}`];
        newAttrs['spirit_combat_skill_notes'] = v[`${skillId}_notes`];

        newSpiritDamageAttrs = calcSpiritDamage({...v, ...newAttrs});
    }

    let newSocialDamageAttrs = {};
    if (v['social_offense_id'] === skillId) {
        newAttrs['social_offense_name'] =  getTranslationByKey(skillId);
        newAttrs['social_offense_total'] = v[`${skillId}`];
        newAttrs['social_offense_notes'] = v[`${skillId}_notes`];

        newSocialDamageAttrs = calcSocialDamage({...v, ...newAttrs});
    }

    if (v['social_defense_id'] === skillId) {
        newAttrs['social_defense_name'] =  getTranslationByKey(skillId);
        newAttrs['social_defense_total'] = v[`${skillId}`];
        newAttrs['social_defense_notes'] = v[`${skillId}_notes`];
    }

    return {
        ...newAttrs,
        ...newInitAttrs,
        ...newMoveAttrs,
        ...newSpiritDamageAttrs,
        ...newSocialDamageAttrs
    }
}
stdSkillIds.forEach(skillId => {
    on(`change:${skillId} change:${skillId}_notes`, function(event) {
        if (event.sourceType === "sheetworker") {return;}

        getAttrs([`${skillId}`, `${skillId}_other`, `${skillId}_notes`, 'social_defense_id'].concat(characteristicAttrs,
            initGetAttrs, moveRateGetAttrs, spiritDamageGetAttrs, socialDamageGetAttrs), function(v) {
            setAttrs(calcStdSkill(`${skillId}`, v, event.sourceAttribute));
        });
    });
});
/* Standard Skill Action Buttons */
stdSkillIds.forEach(skillId => {
    on(`clicked:${skillId}-augment`, function(event) {
        getAttrs([`${skillId}`], function(v) {
            const skillValue = parseInt(v[`${skillId}`]) || 0;
            const augmentValue = Math.ceil(skillValue / 5);

            setAttrs({
                augmentation: "@{set_augmentation}",
                set_augmentation: augmentValue
            });
        });
    });
    on(`clicked:${skillId}-set-social-offense`, function(event) {
        getAttrs([`${skillId}`, `${skillId}_notes`].concat(socialDamageGetAttrs), function(v) {
            const newAttrs = {
                social_offense_id: skillId,
                social_offense_name: getTranslationByKey(skillId),
                social_offense_total: v[skillId],
                social_offense_notes: v[`${skillId}_notes`]
            };

            setAttrs({
                ...newAttrs,
                ...calcSocialDamage({...v, ...newAttrs})
            });
        });
    });
    on(`clicked:${skillId}-set-social-defense`, function(event) {
        getAttrs([`${skillId}`, `${skillId}_notes`], function(v) {
            const newAttrs = {
                social_defense_id: skillId,
                social_defense_name: getTranslationByKey(skillId),
                social_defense_total: v[skillId],
                social_defense_notes: v[`${skillId}_notes`]
            };

            setAttrs(newAttrs);
        });
    });
});
on(`clicked:willpower-set-spirit-combat`, function(event) {
    getAttrs(['willpower', 'willpower_notes'].concat(spiritDamageGetAttrs), function(v) {
        const newAttrs = {
            spirit_combat_skill_id: 'willpower',
            spirit_combat_skill_name: getTranslationByKey('willpower'),
            spirit_combat_skill_total: v['willpower'],
            spirit_combat_skill_notes: v['willpower_notes']
        };

        setAttrs({
            ...newAttrs,
            ...calcSpiritDamage({...v, ...newAttrs})
        });
    });
});

/* Professional Skills, Combat Styles & Passions */
/**
 * Will read the base char value selected for a skill and parse it into a value
 * @param charOption the char value still in autocalc format for historical compatibility
 * @param v the got attributes needed, characteristicAttrs
 * @returns {number|number|number}
 */
function parseBaseChar(charOption, v) {
    if (charOption === '@{str}') {
        return parseInt(v['str']) || 0;
    } else if (charOption === '@{con}') {
        return parseInt(v['con']) || 0;
    } else if (charOption === '@{siz}') {
        return parseInt(v['siz']) || 0;
    } else if (charOption === '@{dex}') {
        return parseInt(v['dex']) || 0;
    } else if (charOption === '@{int}') {
        return parseInt(v['int']) || 0;
    } else if (charOption === '@{pow}') {
        return parseInt(v['pow']) || 0;
    } else if (charOption === '@{cha}') {
        return parseInt(v['cha']) || 0;
    } else {
        return 0;
    }
}
function calcProSkill(skillId, v, sourceAttribute) {
    let newAttrs = {};
    /* If a str or dex skill then it is affected by encumbrance */
    if (v['${skillId}_char1'] === '@{str}' || v['${skillId}_char1'] === '@{dex}' ||
    v['${skillId}_char2'] === '@{str}' || v['${skillId}_char2'] === '@{dex}') {
        newAttrs[`${skillId}_encumbered`] = 1;
    } else {
        newAttrs[`${skillId}_encumbered`] = 0;
    }
    const char1 = parseBaseChar(v[`${skillId}_char1`], v);
    const char2 = parseBaseChar(v[`${skillId}_char2`], v);
    if (sourceAttribute === `${skillId}_total`) {
        const skill = parseInt(v[`${skillId}_total`]) || 0;
        newAttrs[`${skillId}_other`] = skill - char1 - char2;
    } else {
        const skillOther = parseInt(v[`${skillId}_other`]) || 0;
        newAttrs[`${skillId}_total`] = char1 + char2 + skillOther;
        /* for spirit and social skills we set the new value in v so those calcs may use the new value */
        v[`${skillId}_total`] = newAttrs[`${skillId}_total`];
    }

    let newSpiritDamageAttrs = {};
    /* We loose case as we copy skillIds into the spirit/social associated fields, so we need to normalize the checks */
    if (v['spirit_combat_skill_id'].toLowerCase() === skillId.toLowerCase()) {
        newAttrs['spirit_combat_skill_name'] = v[`${skillId}_name`];
        newAttrs['spirit_combat_skill_total'] = v[`${skillId}_total`];
        newAttrs['spirit_combat_skill_notes'] = v[`${skillId}_notes`];

        newSpiritDamageAttrs = calcSpiritDamage({...v, ...newAttrs});
    }

    let newSocialDamageAttrs = {};
    if (v['social_offense_id'].toLowerCase() === skillId.toLowerCase()) {
        newAttrs['social_offense_name'] =  v[`${skillId}_name`];
        newAttrs['social_offense_total'] = v[`${skillId}_total`];
        newAttrs['social_offense_notes'] = v[`${skillId}_notes`];

        newSocialDamageAttrs = calcSocialDamage({...v, ...newAttrs});
    }

    if (v['social_defense_id'].toLowerCase() === skillId.toLowerCase()) {
        newAttrs['social_defense_name'] =  v[`${skillId}_name`];
        newAttrs['social_defense_total'] = v[`${skillId}_total`];
        newAttrs['social_defense_notes'] = v[`${skillId}_notes`];
    }

    return {
        ...newAttrs,
        ...newSpiritDamageAttrs,
        ...newSocialDamageAttrs
    }
}
on('change:repeating_professionalskill:total change:repeating_professionalskill:notes change:repeating_professionalskill:name change:repeating_professionalskill:char1 change:repeating_professionalskill:char2 change:repeating_combatstyle:total change:repeating_combatstyle:notes change:repeating_combatstyle:name change:repeating_combatstyle:char1 change:repeating_combatstyle:char2', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    const type = event.sourceAttribute.split('_')[1];
    const id = event.sourceAttribute.split('_')[2];
    getAttrs([`repeating_${type}_${id}_total`, `repeating_${type}_${id}_other`, `repeating_${type}_${id}_notes`, `repeating_${type}_${id}_name`,
        `repeating_${type}_${id}_char1`, `repeating_${type}_${id}_char2`,  'social_defense_id'].concat(
            characteristicAttrs, spiritDamageGetAttrs, socialDamageGetAttrs), function(v) {
        setAttrs(calcProSkill(`repeating_${type}_${id}`, v, event.sourceAttribute));
    });
});
function calcPassion(skillId, v) {
    let newAttrs = {};
    let newSpiritDamageAttrs = {};
    /* We loose case as we copy skillIds into the spirit/social associated fields, so we need to normalize the checks */
    if (v['spirit_combat_skill_id'].toLowerCase() === skillId.toLowerCase()) {
        newAttrs['spirit_combat_skill_name'] = v[`${skillId}_name`];
        newAttrs['spirit_combat_skill_total'] = v[`${skillId}_total`];
        newAttrs['spirit_combat_skill_notes'] = v[`${skillId}_notes`];

        newSpiritDamageAttrs = calcSpiritDamage({...v, ...newAttrs});
    }

    let newSocialDamageAttrs = {};
    if (v['social_offense_id'].toLowerCase() === skillId.toLowerCase()) {
        newAttrs['social_offense_name'] =  v[`${skillId}_name`];
        newAttrs['social_offense_total'] = v[`${skillId}_total`];
        newAttrs['social_offense_notes'] = v[`${skillId}_notes`];

        newSocialDamageAttrs = calcSocialDamage({...v, ...newAttrs});
    }

    if (v['social_defense_id'].toLowerCase() === skillId.toLowerCase()) {
        newAttrs['social_defense_name'] =  v[`${skillId}_name`];
        newAttrs['social_defense_total'] = v[`${skillId}_total`];
        newAttrs['social_defense_notes'] = v[`${skillId}_notes`];
    }

    return {
        ...newAttrs,
        ...newSpiritDamageAttrs,
        ...newSocialDamageAttrs
    }
}
on('change:repeating_passion:total change:repeating_passion:notes change:repeating_passion:name', function(event) {
    if (event.sourceType === "sheetworker") {return;}
    const id = event.sourceAttribute.split('_')[2];
    getAttrs([`repeating_passion_${id}_total`, `repeating_passion_${id}_notes`, `repeating_passion_${id}_name`,
        'social_defense_id'].concat(spiritDamageGetAttrs, socialDamageGetAttrs), function(v) {
        setAttrs(calcPassion(`repeating_passion_${id}`, v));
    });
});
on('clicked:repeating_combatstyle:augment clicked:repeating_professionalskill:augment clicked:repeating_passion:augment clicked:repeating_dependency:augment clicked:repeating_peculiarity:augment', function(event) {
    const type = event.sourceAttribute.split('_')[1];
    const id = event.sourceAttribute.split('_')[2];
    getAttrs([`repeating_${type}_${id}_total`], function(v) {
        const skillValue = parseInt(v[`repeating_${type}_${id}_total`]) || 0;
        const augmentValue = Math.ceil(skillValue / 5);

        setAttrs({
            augmentation: "@{set_augmentation}",
            set_augmentation: augmentValue
        });
    });
});
on('clicked:repeating_professionalskill:set-social-offense clicked:repeating_passion:set-social-offense', function(event) {
    const type = event.sourceAttribute.split('_')[1];
    const id = event.sourceAttribute.split('_')[2];
    getAttrs([`repeating_${type}_${id}_name`, `repeating_${type}_${id}_total`, `repeating_${type}_${id}_notes`].concat(socialDamageGetAttrs), function(v) {
        const newAttrs = {
            social_offense_id: `repeating_${type}_${id}`,
            social_offense_name: v[`repeating_${type}_${id}_name`],
            social_offense_total: v[`repeating_${type}_${id}_total`],
            social_offense_notes: v[`repeating_${type}_${id}_notes`],
        };

        setAttrs({
            ...newAttrs,
            ...calcSocialDamage({...v, ...newAttrs})
        });
    });
});
on('clicked:repeating_professionalskill:set-social-defense clicked:repeating_passion:set-social-defense', function(event) {
    const type = event.sourceAttribute.split('_')[1];
    const id = event.sourceAttribute.split('_')[2];
    getAttrs([`repeating_${type}_${id}_name`, `repeating_${type}_${id}_total`, `repeating_${type}_${id}_notes`], function(v) {
        const newAttrs = {
            social_defense_id: `repeating_${type}_${id}`,
            social_defense_name: v[`repeating_${type}_${id}_name`],
            social_defense_total: v[`repeating_${type}_${id}_total`],
            social_defense_notes: v[`repeating_${type}_${id}_notes`]
        };

        setAttrs(newAttrs);
    });
});
on(`clicked:repeating_professionalskill:set-spirit-combat clicked:repeating_passion:set-spirit-combat`, function(event) {
    const type = event.sourceAttribute.split('_')[1];
    const id = event.sourceAttribute.split('_')[2];
    getAttrs([`repeating_${type}_${id}_name`, `repeating_${type}_${id}_total`,
        `repeating_${type}_${id}_notes`].concat(spiritDamageGetAttrs), function(v) {
        const newAttrs = {
            spirit_combat_skill_id: `repeating_${type}_${id}`,
            spirit_combat_skill_name: v[`repeating_${type}_${id}_name`],
            spirit_combat_skill_total: v[`repeating_${type}_${id}_total`],
            spirit_combat_skill_notes: v[`repeating_${type}_${id}_notes`]
        };

        setAttrs({
            ...newAttrs,
            ...calcSpiritDamage({...v, ...newAttrs})
        });
    });
});

/* Dependency Penalty to Tenacity */
on(`change:repeating_dependency:total remove:repeating_dependency`, function(event) {
    getSectionIDs("repeating_dependency", function(dependencyIds) {
        let fetchAttrs = [];
        dependencyIds.forEach(id => {
            fetchAttrs.push(`repeating_dependency_${id}_total`);
        });
        getAttrs(fetchAttrs.concat(tenacityGetAttrs), function(v) {
            let newAttrs = {tenacity_dependencies: 0};
            dependencyIds.forEach(id => {
                const depTotal = parseInt(v[`repeating_dependency_${id}_total`]) || 0;
                const depPenalty = Math.floor(depTotal/20);
                newAttrs['tenacity_dependencies'] = newAttrs['tenacity_dependencies'] - depPenalty;
            });
            setAttrs({
                ...newAttrs,
                ...calcTenacity({...v, ...newAttrs}, event.sourceAttribute)
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
/**
 * Will return an object of all the attrs needed to perform enc calculations along with the repeating IDs of equipment
 * repeatingIds object containing the repeatingIds of meleeweapon rangedweapon equipment and currency
 * return []
 */
function encGetAttrs(repeatingIds) {
    let repeatingGetAttrs = [];
    repeatingIds['meleeWeaponIds'].forEach(meleeWeaponId => {
        repeatingGetAttrs.push(`repeating_meleeweapon_${meleeWeaponId}_enc`, `repeating_meleeweapon_${meleeWeaponId}_location`);
    });
    repeatingIds['rangedWeaponIds'].forEach(rangedWeaponId => {
        repeatingGetAttrs.push(`repeating_rangedweapon_${rangedWeaponId}_enc`, `repeating_rangedweapon_${rangedWeaponId}_location`);
    });
    repeatingIds['gearIds'].forEach(gearId => {
        repeatingGetAttrs.push(`repeating_equipment_${gearId}_enc`, `repeating_equipment_${gearId}_quantity`, `repeating_equipment_${gearId}_location`);
    });
    repeatingIds['currencyIds'].forEach(currencyId => {
        repeatingGetAttrs.push(`repeating_currency_${currencyId}_enc`, `repeating_currency_${currencyId}_quantity`, `repeating_currency_${currencyId}_location`);
    });

    return ['str', 'pack_equipped', 'half_effective_armor_enc', 'avg_species_siz', 'encumbrance_temp',
        'location1_armor_enc', 'location1_armor_equipped',
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
        'location12_armor_enc', 'location12_armor_equipped'].concat(repeatingGetAttrs);
}
function calcEncAndArmorPenalty(repeatingIds, v) {
    let newAttrs = {};

    /* Calculate Armor Enc */
    let wornArmorEnc = 0;
    let packArmorEnc = 0;
    let effectiveWornArmorEnc;
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].forEach(location => {
        const locationEnc = parseFloat(v[`location${location}_armor_enc`]) || 0;
        if (v[`location${location}_armor_equipped`] === '1') {
            wornArmorEnc = wornArmorEnc + locationEnc;
        } else if (v[`location${location}_armor_equipped`] === '0') {
            packArmorEnc = packArmorEnc + locationEnc;
        }
    });
    if (v['half_effective_armor_enc'] === '1') {
        effectiveWornArmorEnc = Math.ceil(wornArmorEnc/4);
    } else {
        effectiveWornArmorEnc = Math.ceil(wornArmorEnc/2);
    }
    newAttrs['armor_penalty'] = 0 - Math.ceil(wornArmorEnc/5);
    let wornEnc = effectiveWornArmorEnc;
    let packEnc = packArmorEnc;

    /* Add up all the rest of the ENC */
    repeatingIds['meleeWeaponIds'].forEach(meleeWeaponId => {
        const weaponEnc = parseFloat(v[`repeating_meleeweapon_${meleeWeaponId}_enc`]) || 0;
        if (v[`repeating_meleeweapon_${meleeWeaponId}_location`] === 'loadout') {
            wornEnc = wornEnc + weaponEnc;
        } else if (v[`repeating_meleeweapon_${meleeWeaponId}_location`] === 'pack') {
            packEnc = packEnc + weaponEnc;
        }
    });
    repeatingIds['rangedWeaponIds'].forEach(rangedWeaponId => {
        const weaponEnc = parseFloat(v[`repeating_rangedweapon_${rangedWeaponId}_enc`]) || 0;
        if (v[`repeating_rangedweapon_${rangedWeaponId}_location`] === 'loadout') {
            wornEnc = wornEnc + weaponEnc;
        } else if (v[`repeating_rangedweapon_${rangedWeaponId}_location`] === 'pack') {
            packEnc = packEnc + weaponEnc;
        }
    });
    repeatingIds['gearIds'].forEach(gearId => {
        const gearEnc = parseFloat(v[`repeating_equipment_${gearId}_enc`]) || 0;
        const gearQty = parseInt(v[`repeating_equipment_${gearId}_quantity`]) || 0;
        if (v[`repeating_equipment_${gearId}_location`] === 'loadout') {
            wornEnc = wornEnc + (gearEnc * gearQty);
        } else if (v[`repeating_equipment_${gearId}_location`] === 'pack') {
            packEnc = packEnc + (gearEnc * gearQty);
        }
    });
    repeatingIds['currencyIds'].forEach(currencyId => {
        const currencyEnc = parseFloat(v[`repeating_currency_${currencyId}_enc`]) || 0;
        const currencyQty = parseInt(v[`repeating_currency_${currencyId}_quantity`]) || 0;
        if (v[`repeating_currency_${currencyId}_location`] === 'loadout') {
            wornEnc = wornEnc + (currencyEnc * currencyQty);
        } else if (v[`repeating_currency_${currencyId}_location`] === 'pack') {
            packEnc = packEnc + (currencyEnc * currencyQty);
        }
    });

    /* Find the total enc to apply for effect with avg species siz factored in */
    let enc = 0;
    const avgSpeciesSiz = parseInt(v['avg_species_siz']) || 0;
    const encTemp = parseInt(v['encumbrance_temp']) || 0;
    if (v['pack_equipped'] === '1') {
        enc = Math.ceil((wornEnc + packEnc + encTemp) * (avgSpeciesSiz/13));
    } else {
        enc = Math.ceil((wornEnc + encTemp) * (avgSpeciesSiz/13));
    }
    newAttrs['encumbrance_current'] = enc.toFixed(2);

    /* Set load and related effects */
    const str = parseInt(v['str']) || 0;
    if (enc >= (str * 4)) {
        newAttrs['encumbrance_load'] = '3';
        newAttrs['encumbrance_skills'] = loadTable['3']['skills'];
        newAttrs['movement_rate_enc'] = loadTable['3']['movement'];
    } else if (enc > (str * 3)) {
        newAttrs['encumbrance_load'] = '2';
        newAttrs['encumbrance_skills'] = loadTable['2']['skills'];
        newAttrs['movement_rate_enc'] = loadTable['2']['movement'];
    } else if (enc > (str * 2)) {
        newAttrs['encumbrance_load'] = '1';
        newAttrs['encumbrance_skills'] = loadTable['1']['skills'];
        newAttrs['movement_rate_enc'] = loadTable['1']['movement'];
    } else {
        newAttrs['encumbrance_load'] = '0';
        newAttrs['encumbrance_skills'] = loadTable['0']['skills'];
        newAttrs['movement_rate_enc'] = loadTable['0']['movement'];
    }

    return newAttrs;
}
on("change:location1_armor_enc change:location1_armor_equipped change:location2_armor_enc change:location2_armor_equipped change:location3_armor_enc change:location3_armor_equipped change:location4_armor_enc change:location4_armor_equipped change:location5_armor_enc change:location5_armor_equipped change:location6_armor_enc change:location6_armor_equipped change:location7_armor_enc change:location7_armor_equipped change:location8_armor_enc change:location8_armor_equipped change:location9_armor_enc change:location9_armor_equipped change:location10_armor_enc change:location10_armor_equipped change:location11_armor_enc change:location11_armor_equipped change:location12_armor_enc change:location12_armor_equipped change:half_effective_armor_enc change:pack_equipped change:avg_species_siz change:encumbrance_temp change:repeating_meleeweapon:enc change:repeating_meleeweapon:location change:repeating_rangedweapon:enc change:repeating_rangedweapon:location change:repeating_equipment:enc change:repeating_equipment:location change:repeating_equipment:quantity change:repeating_currency:enc change:repeating_currency:location change:repeating_currency:quantity remove:repeating_meleeweapon remove:repeating_rangedweapon remove:repeating_equipment remove:repeating_currency", function(event) {
    if (event.sourceType === "sheetworker") {return;}

    let repeatingIds = {}
    getSectionIDs("repeating_meleeweapon", function(meleeWeaponIds) {
        repeatingIds['meleeWeaponIds'] = meleeWeaponIds;
        getSectionIDs("repeating_rangedweapon", function(rangedWeaponIds) {
            repeatingIds['rangedWeaponIds'] = rangedWeaponIds;
            getSectionIDs("repeating_equipment", function(gearIds) {
                repeatingIds['gearIds'] = gearIds;
                getSectionIDs("repeating_currency", function(currencyIds) {
                    repeatingIds['currencyIds'] = currencyIds;
                    getAttrs(encGetAttrs(repeatingIds).concat(initGetAttrs, moveRateGetAttrs), function(v) {
                        let newAttrs = calcEncAndArmorPenalty(repeatingIds, v);
                        /* Update v with new values need for attribute calculations */
                        v = {...v, ...newAttrs};
                        setAttrs({
                            ...newAttrs,
                            ...calcInitiativeBonus(v),
                            ...calcMoveRate(v)
                        });
                    });
                });
            });
        });
    });
});

/* Repeating IDs */
on("change:repeating_combatstyle change:repeating_professionalskill change:repeating_passion change:repeating_dependency change:repeating_peculiarity change:repeating_meleeweapon change:repeating_rangedweapon change:repeating_equipment change:repeating_currency change:repeating_ability change:repeating_superpowerlimit", function(event) {
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
            newAttrs['character_name'] = characterData['name'];

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
        ['spirit', 'action_points_other', 'action_points_add_one', 'notes', "location2_display", "income_day", "income_month", "income_season", "income_year"]), function(v) {
        let newAttrs = {'version': '3.0'};

        /* If a spirit set the attribute mode to spiritual and sheet type to spirit */
        if (v['spirit'] === '1') {
            newAttrs['attribute_mode'] = 'spiritual'; /* init and ap will already be spirit calc so no need to force it */
            newAttrs['type'] ='spirit';
        }

        /* Convert Characteristics base values */
        characteristicAttrs.forEach(char => {
            const charCurr = parseInt(v[`${char}`]) || 0;
            const charTemp = parseInt(v[`${char}_temp`]) || 0;
            newAttrs[`${char}_base`] = charCurr - charTemp;
        });

        /* TODO fix base values */
        /* TODO Copy prana/power to magic points */

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

        /* TODO combat style traits moved into notes */

        /* TODO remove augment and penalty form the skill/passion totals */

        /* TODO merge languages into professional skill */

        /* TODO merge magic skills into professional skills with tags */

        /* Convert income */
        let newIncome = "";
        const incomeDay = parseFloat(v['income_day']) || 0;
        const incomeMonth = parseFloat(v['income_month']) || 0;
        const incomeSeason = parseFloat(v['income_season']) || 0;
        const incomeYear = parseFloat(v['income_year']) || 0;
        if (v['income_day']) {newIncome = newIncome + getTranslationByKey('day') + ':' + incomeDay.toFixed(2) + ' ';}
        if (v['income_month']) {newIncome = newIncome + getTranslationByKey('month') + ':' + incomeMonth.toFixed(2) + ' ';}
        if (v['income_season']) {newIncome = newIncome + getTranslationByKey('season') + ':' + incomeSeason.toFixed(2) + ' ';}
        if (v['income_year']) {newIncome = newIncome + getTranslationByKey('year') + ':' + incomeYear.toFixed(2);}
        newAttrs['income'] = newIncome;

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
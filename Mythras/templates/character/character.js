/* Common Autocalc Constants */
const strGetAttrs = ['str_base', 'str_other', 'str_temp'];
const dexGetAttrs = ['dex_base', 'dex_other', 'dex_temp'];
const sizGetAttrs = ['siz_base', 'siz_other', 'siz_temp'];
const conGetAttrs = ['con_base', 'con_other', 'con_temp'];
const powGetAttrs = ['pow_base', 'pow_other', 'pow_temp'];
const intGetAttrs = ['int_base', 'int_other', 'int_temp'];
const chaGetAttrs = ['cha_base', 'cha_other', 'cha_temp'];
const allCharGetAttrs = strGetAttrs.concat(dexGetAttrs, sizGetAttrs, conGetAttrs, powGetAttrs, intGetAttrs, chaGetAttrs);

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
    console.log("char1 = " + char1 + " char2 = " + char2 + " other = " + other)
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

/* Characteristic Triggers */
['str','con','siz','int','pow','dex','cha'].forEach(char => {
    on(`change:${char}_base change:${char}_other change:${char}_temp`, function() {
        const stdSkillGetAttrs = getStdSkillGetAttrs(charStdSkillIds[char]);

        getSectionIDs("repeating_professionalskill", function(proSkillIds) {
            let proSkillGetAttrs = [];
            proSkillIds.forEach(id => {
                proSkillGetAttrs.push(`repeating_professionalskill_${id}_char1`, `repeating_professionalskill_${id}_char2`, `repeating_professionalskill_${id}_other`)
            });

            getAttrs(allCharGetAttrs.concat(stdSkillGetAttrs, proSkillGetAttrs), function(v) {
                const charObj = buildCharObj(v);
                const newStdSkillVals = calcStdSkills(charStdSkillIds[char], charObj, v);
                const newProSkillVals = calcProSkills(proSkillIds, charObj, v);

                setAttrs({
                    [char]: charObj[char],
                    ...newStdSkillVals,
                    ...newProSkillVals
                });
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




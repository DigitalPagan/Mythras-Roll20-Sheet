/* Characteristic Triggers */
const characteristicAttrs = ['str', 'con', 'siz', 'dex', 'int', 'pow', 'cha'];
characteristicAttrs.forEach(char => {
    on(`change:${char}_base change:${char}`, function(event) {
        if (event.sourceType === "sheetworker") {return;}

        let newAttrs = {}
        getAttrs([`${char}_base`, `${char}_temp`].concat(characteristicAttrs), function(v) {
            const baseCharVal = parseInt(v[`${char}_base`]) || 0;
            if (event.sourceAttribute.endsWith("_base")) { /* Set the new char value if base was modified */
                const tempCharVal = parseInt(v[`${char}_temp`]) || 0;
                const newCharVal = baseCharVal + tempCharVal;
                newAttrs[`${char}`] = newCharVal;
                v[`${char}`] = newCharVal; /* Override so all other calculations can utilize the new value */
            } else { /* If char edited directly we reverse calculate the temp value */
                const currCharVal = parseInt(v[`${char}`]) || 0;
                newAttrs[`${char}_temp`] = currCharVal - baseCharVal;
            }
            setAttrs(newAttrs);
        });
    });
});

/* Action Point Triggers */

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
    getAttrs(['import_json_data', 'import_character', 'import_type', 'simplified_combat_enabled', 'luck_points_rank'], function(v) {
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
            let newAttrs = {
                rank: 0,
                str_base: 0, str_temp: 0, str: 0,
                con_base: 0, con_temp: 0, con: 0,
                siz_base: 0, siz_temp: 0, siz: 0,
                dex_base: 0, dex_temp: 0, dex: 0,
                int_base: 0, int_temp: 0, int: 0,
                pow_base: 0, pow_temp: 0, pow: 0,
                cha_base: 0, cha_temp: 0, cha: 0
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

            /* Clear the import data */
            newAttrs['import_json_data'] = '';

            setAttrs(newAttrs);
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
    getAttrs(charGetAttrs, function(v) {
        let newAttrs = {'version': '3.0'};

        /* Convert Characteristics base values */
        characteristicAttrs.forEach(char => {
            const charCurr = parseInt(v[`${char}`]) || 0;
            const charTemp = parseInt(v[`${char}_temp`]) || 0;
            newAttrs[`${char}_base`] = charCurr - charTemp;
        });

        /* Delete json import data due to size and not needing it anymore, v3 does this for us after import */
        newAttrs['encounter_generator_json'] = '';

        setAttrs(newAttrs);
    });
}
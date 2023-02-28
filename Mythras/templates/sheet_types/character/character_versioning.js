/* Character Versioning */
/**
 * Make the changes needs to get a character sheet updated from 2.7 to 3.0
 */
function upgradeCharacter3Dot0() {
    if (debug) {console.log("Upgrading character to 3.0");}

    /* Collect all the repeating Ids we will need */
    getSectionIDs("repeating_combatstyle", function(combatStyleIds) {
    getSectionIDs("repeating_language", function(languageIds) {
    getSectionIDs("repeating_affiliation", function(affiliationIds) {
    getSectionIDs("repeating_professionalskill", function(professionalSkillIds) {
    getSectionIDs("repeating_passion", function(passionIds) {
    getSectionIDs("repeating_dependency", function(dependencyIds) {
    getSectionIDs("repeating_peculiarity", function(peculiarityIds) {
    getSectionIDs("repeating_path", function(pathIds) {
    getSectionIDs("repeating_invocation", function(invocationIds) {
    getSectionIDs("repeating_devotion", function(devotionIds) {
    getSectionIDs("repeating_folkspell", function(folkSpellIds) {
    getSectionIDs("repeating_practicedtalent", function(practicedTalentIds) {
    getSectionIDs("repeating_sorceryspell", function(sorcerySpellIds) {
    getSectionIDs("repeating_miracle", function(miracleIds) {
    getSectionIDs("repeating_magicspell", function(magicSpellIds) {
    getSectionIDs("repeating_psionicpower", function(psionicPowerIds) {

        let psionicPowerGetAttrs = [];
        psionicPowerIds.forEach(id => {
            psionicPowerGetAttrs.push(`repeating_psionicpower_${id}_name`, `repeating_psionicpower_${id}_fumbled`, `repeating_psionicpower_${id}_trained`, `repeating_psionicpower_${id}_temp`, `repeating_psionicpower_${id}_penalty`, `repeating_psionicpower_${id}_other`, `repeating_psionicpower_${id}_experience`, `repeating_psionicpower_${id}_total`, `repeating_psionicpower_${id}_description`);
        });

        let magicSpellGetAttrs = [];
        magicSpellIds.forEach(id => {
            magicSpellGetAttrs.push(`repeating_magicspell_${id}_name`, `repeating_magicspell_${id}_fumbled`, `repeating_magicspell_${id}_trained`, `repeating_magicspell_${id}_temp`, `repeating_magicspell_${id}_penalty`, `repeating_magicspell_${id}_other`, `repeating_magicspell_${id}_experience`, `repeating_magicspell_${id}_total`, `repeating_magicspell_${id}_description`, `repeating_magicspell_${id}_cost`, `repeating_magicspell_${id}_range`, `repeating_magicspell_${id}_duration`);
        });
    
        let combatStyleGetAttrs = [];
        combatStyleIds.forEach(combatStyleId => {
            combatStyleGetAttrs.push(`repeating_combatstyle_${combatStyleId}_total`, `repeating_combatstyle_${combatStyleId}_penalty`, `repeating_combatstyle_${combatStyleId}_temp`, `repeating_combatstyle_${combatStyleId}_traits`, `repeating_combatstyle_${combatStyleId}_weapons`, `repeating_combatstyle_${combatStyleId}_notes`);
        });

        let languageGetAttrs = [];
        languageIds.forEach(languageId => {
            languageGetAttrs.push(`repeating_language_${languageId}_name`, `repeating_language_${languageId}_fumbled`, `repeating_language_${languageId}_trained`, `repeating_language_${languageId}_temp`, `repeating_language_${languageId}_penalty`, `repeating_language_${languageId}_experience`, `repeating_language_${languageId}_other`, `repeating_language_${languageId}_total`, `repeating_language_${languageId}_notes`);
        });

        let affiliationGetAttrs = [];
        affiliationIds.forEach(affiliationId => {
            affiliationGetAttrs.push(`repeating_affiliation_${affiliationId}_temp`, `repeating_affiliation_${affiliationId}_experience`, `repeating_affiliation_${affiliationId}_other`, `repeating_affiliation_${affiliationId}_penalty`, `repeating_affiliation_${affiliationId}_total`);
        });

        let professionalSkillGetAttrs = [];
        professionalSkillIds.forEach(professionalSkillId => {
            professionalSkillGetAttrs.push(`repeating_professionalskill_${professionalSkillId}_temp`, `repeating_professionalskill_${professionalSkillId}_penalty`, `repeating_professionalskill_${professionalSkillId}_experience`,`repeating_professionalskill_${professionalSkillId}_other`, `repeating_professionalskill_${professionalSkillId}_total`);
        });

        let passionGetAttrs = [];
        passionIds.forEach(id => {
            passionGetAttrs.push(`repeating_passion_${id}_temp`, `repeating_passion_${id}_penalty`, `repeating_passion_${id}_total`);
        });

        let dependencyGetAttrs = [];
        dependencyIds.forEach(id => {
            dependencyGetAttrs.push(`repeating_dependency_${id}_temp`, `repeating_dependency_${id}_penalty`, `repeating_dependency_${id}_total`);
        });

        let peculiarityGetAttrs = [];
        peculiarityIds.forEach(id => {
            peculiarityGetAttrs.push(`repeating_peculiarity_${id}_temp`, `repeating_peculiarity_${id}_penalty`, `repeating_peculiarity_${id}_total`);
        });

        const v2ShapingComponents = ['duration_component', 'magnitude_component', 'range_component', 'targets_component', 'ablation_component', 'focus_component', 'fortune_component', 'precision_component', 'swiftness_subquery'];

        const v2StandardSkillIds = ['athletics', 'boating', 'brawn', 'conceal', 'customs', 'dance', 'deceit', 'drive', 'endurance', 'evade', 'first_aid', 'home_parallel', 'influence', 'insight', 'locale', 'native_tongue', 'perception', 'ride', 'sing', 'status', 'stealth', 'superstition', 'swim', 'unarmed', 'willpower'];
        let staticSkillGetAttrs = [];
        v2StandardSkillIds.forEach(id => {
            staticSkillGetAttrs.push(`${id}_temp`, `${id}_penalty`, `${id}_experience`, `${id}_other`, `${id}`);
        });
        staticSkillGetAttrs.push(`linguistics_fumbled`, `linguistics_trained`, `linguistics_temp`, `linguistics_penalty`, `linguistics_experience`, `linguistics_other`, `linguistics`, `linguistics_notes`, "known_languages");

        /* Magic skill fetch attrs */
        const v2StaticMagicSkillIds = ['folk_magic', 'trance', 'binding', 'meditation', 'shaping', 'exhort'];
        let staticMagicSkillGetAttrs = [];
        v2StaticMagicSkillIds.forEach(id => {
            staticMagicSkillGetAttrs.push(`${id}_fumbled`, `${id}_trained`, `${id}_temp`, `${id}_penalty`, `${id}_experience`, `${id}_other`, `${id}`, `${id}_notes`);
        });
        let folkSpellGetAttrs = [];
        folkSpellIds.forEach(id => {
            folkSpellGetAttrs.push(`repeating_folkspell_${id}_name`, `repeating_folkspell_${id}_description`, `repeating_folkspell_${id}_concentration`, `repeating_folkspell_${id}_resist`, `repeating_folkspell_${id}_duration`, `repeating_folkspell_${id}_range`);
        });

        let pathGetAttrs = [];
        pathIds.forEach(id => {
            pathGetAttrs.push(`repeating_path_${id}_name`, `repeating_path_${id}_fumbled`, `repeating_path_${id}_trained`, `repeating_path_${id}_temp`, `repeating_path_${id}_penalty`, `repeating_path_${id}_experience`, `repeating_path_${id}_other`, `repeating_path_${id}_total`, `repeating_path_${id}_notes`);
        });
        let practicedTalentGetAttrs = [];
        practicedTalentIds.forEach(id => {
            practicedTalentGetAttrs.push(`repeating_practicedtalent_${id}_name`, `repeating_practicedtalent_${id}_description`);
        });

        let invocationGetAttrs = [];
        invocationIds.forEach(id => {
            invocationGetAttrs.push(`repeating_invocation_${id}_name`, `repeating_invocation_${id}_fumbled`, `repeating_invocation_${id}_trained`, `repeating_invocation_${id}_temp`, `repeating_invocation_${id}_penalty`, `repeating_invocation_${id}_experience`, `repeating_invocation_${id}_other`, `repeating_invocation_${id}_total`, `repeating_invocation_${id}_notes`);
        });
        let sorcerySpellGetAttrs = [];
        sorcerySpellIds.forEach(id => {
            sorcerySpellGetAttrs.push(`repeating_sorceryspell_${id}_memorized`, `repeating_sorceryspell_${id}_name`, `repeating_sorceryspell_${id}_description`, `repeating_sorceryspell_${id}_concentration`, `repeating_sorceryspell_${id}_resist`);
        });

        let devotionGetAttrs = [];
        devotionIds.forEach(id => {
            devotionGetAttrs.push(`repeating_devotion_${id}_name`, `repeating_devotion_${id}_fumbled`, `repeating_devotion_${id}_trained`, `repeating_devotion_${id}_temp`, `repeating_devotion_${id}_penalty`, `repeating_devotion_${id}_experience`, `repeating_devotion_${id}_other`, `repeating_devotion_${id}_total`, `repeating_devotion_${id}_notes`, `repeating_devotion_${id}_rank_devotion_pool_limit`, `repeating_devotion_${id}_devotional_pool`);
        });
        let miracleGetAttrs = [];
        miracleIds.forEach(id => {
            miracleGetAttrs.push(`repeating_miracle_${id}_name`, `repeating_miracle_${id}_description`, `repeating_miracle_${id}_miracle_rank`, `repeating_miracle_${id}_damage`, `repeating_miracle_${id}_resist`, `repeating_miracle_${id}_area`, `repeating_miracle_${id}_duration`, `repeating_miracle_${id}_range`);
        });

        let charGetAttrs = [];
        characteristicAttrs.forEach(char => {
            charGetAttrs.push(`${char}`, `${char}_temp`);
        });
        getAttrs(charGetAttrs.concat(hpGetAttrs, combatStyleGetAttrs, languageGetAttrs, staticSkillGetAttrs, affiliationGetAttrs,
            professionalSkillGetAttrs, passionGetAttrs, dependencyGetAttrs, peculiarityGetAttrs, staticMagicSkillGetAttrs,
            pathGetAttrs, invocationGetAttrs, devotionGetAttrs, practicedTalentGetAttrs, sorcerySpellGetAttrs, v2ShapingComponents,
            folkSpellGetAttrs, miracleGetAttrs, magicSpellGetAttrs, psionicPowerGetAttrs,
            ['spirit', 'action_points_other', 'action_points_add_one', 'notes', "location2_display", "income_day",
                "income_month", "income_season", "income_year", "type", "prana_points_temp", "prana_points", "prana_points_max",
                "prana_points_other", "power_points_temp", "power_points", "power_points_max", "power_points_other", "linguistics_enabled"
            ]), function (v) {
            let newAttrs = {'version': '3.0'};
            
            /* TODO ensure setting carries over */

            /* If a spirit set the attribute mode to spiritual and sheet type to spirit */
            if (v['spirit'] === '1') {
                newAttrs['sheet_type'] = 'spirit';
                newAttrs['attribute_mode'] = 'spiritual'; /* init and ap will already be spirit calc so no need to force it */
                newAttrs['hit_location_roll'] = '@{none_hit_location_roll}';
                newAttrs['hit_location_low_roll'] = '@{none_hit_location_roll}';
                newAttrs['hit_location_high_roll'] = '@{none_hit_location_roll}';
            }

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

            /* Convert relabel magic points to magic points */
            if (v['setting'] === 'luther_arkwright') {
                newAttrs['magic_points_other'] = v['prana_points_other'];
                newAttrs['magic_points_temp'] = v['prana_points_temp'];
                newAttrs['magic_points'] = v['prana_points'];
                newAttrs['magic_points_max'] = v['prana_points_max'];
            } else if (v['setting'] === 'm-space' || v['setting'] === 'agony_and_ecstasy') {
                newAttrs['magic_points_other'] = v['power_points_other'];
                newAttrs['magic_points_temp'] = v['power_points_temp'];
                newAttrs['magic_points'] = v['power_points'];
                newAttrs['magic_points_max'] = v['power_points_max'];
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

            /* Move style traits/weapons into notes value */
            combatStyleIds.forEach(combatStyleId => {
                const total = parseInt(v[`repeating_combatstyle_${combatStyleId}_total`]) || 0;
                const aug = parseInt(v[`repeating_combatstyle_${combatStyleId}_temp`]) || 0;
                const penalty = parseInt(v[`repeating_combatstyle_${combatStyleId}_penalty`]) || 0;
                newAttrs[`repeating_combatstyle_${combatStyleId}_total`] = total - penalty - aug;
                newAttrs[`repeating_combatstyle_${combatStyleId}_id`] = `repeating_combatstyle_${combatStyleId}`;
                let csTraits = !v[`repeating_combatstyle_${combatStyleId}_traits`] ? '' : v[`repeating_combatstyle_${combatStyleId}_traits`];
                let csWeapons = !v[`repeating_combatstyle_${combatStyleId}_weapons`] ? '' : v[`repeating_combatstyle_${combatStyleId}_weapons`];
                if (csTraits !== '' && csWeapons !== '') {
                    newAttrs[`repeating_combatstyle_${combatStyleId}_notes`] =
                        getTranslationByKey('traits') + ": " + v[`repeating_combatstyle_${combatStyleId}_traits`] + "\r\n" +
                        getTranslationByKey('weapons') + ": " + v[`repeating_combatstyle_${combatStyleId}_weapons`] + "\r\n" +
                        v[`repeating_combatstyle_${combatStyleId}_notes`];
                } else if (csTraits !== '' && csWeapons === '') {
                    newAttrs[`repeating_combatstyle_${combatStyleId}_notes`] = getTranslationByKey('traits') + ": " + v[`repeating_combatstyle_${combatStyleId}_traits`] + "\r\n" + v[`repeating_combatstyle_${combatStyleId}_notes`];
                } else if (csTraits === '' && csWeapons !== '') {
                    newAttrs[`repeating_combatstyle_${combatStyleId}_notes`] = getTranslationByKey('weapons') + ": " + v[`repeating_combatstyle_${combatStyleId}_weapons`] + "\r\n" + v[`repeating_combatstyle_${combatStyleId}_notes`];
                }
            });

            /* Move languages to professional skills */
            if (v['linguistics_enabled'] === "1" && v[`linguistics_total`] !== "0") {
                const skillId = 'repeating_professionalskill_' + generateRowID();
                const total = parseInt(v[`linguistics`]) || 0;
                const xp = parseInt(v[`linguistics_experience`]) || 0;
                const other = parseInt(v[`linguistics_other`]) || 0;
                const aug = parseInt(v[`linguistics_temp`]) || 0;
                const penalty = parseInt(v[`linguistics_penalty`]) || 0;
                newAttrs[`${skillId}_name`] = getTranslationByKey("linguistics");
                newAttrs[`${skillId}_fumbled`] = !v[`linguistics_fumbled`] ? "0" : v[`linguistics_fumbled`];
                newAttrs[`${skillId}_trained`] = !v[`linguistics_trained`] ? "0" : v[`linguistics_trained`];
                newAttrs[`${skillId}_notes`] = !v['known_languages'] ? '' : v['known_languages'];
                newAttrs[`${skillId}_char1`] = '@{int}';
                newAttrs[`${skillId}_char2`] = '@{cha}';
                newAttrs[`${skillId}_other`] = xp + other;
                newAttrs[`${skillId}_total`] = total - penalty - aug;
                newAttrs[`${skillId}_id`] = skillId;
            } else {
                languageIds.forEach(languageId => {
                    const skillId = 'repeating_professionalskill_' + generateRowID();
                    const total = parseInt(v[`repeating_language_${languageId}_total`]) || 0;
                    const aug = parseInt(v[`repeating_language_${languageId}_temp`]) || 0;
                    const penalty = parseInt(v[`repeating_language_${languageId}_penalty`]) || 0;
                    const xp = parseInt(v[`repeating_language_${languageId}_experience`]) || 0;
                    const other = parseInt(v[`repeating_language_${languageId}_other`]) || 0;
                    newAttrs[`${skillId}_name`] = !v[`repeating_language_${languageId}_name`] ? '' : v[`repeating_language_${languageId}_name`];
                    newAttrs[`${skillId}_fumbled`] = !v[`repeating_language_${languageId}_fumbled`] ? "0" : v[`repeating_language_${languageId}_fumbled`];
                    newAttrs[`${skillId}_trained`] = !v[`repeating_language_${languageId}_trained`] ? "0" : v[`repeating_language_${languageId}_trained`];
                    newAttrs[`${skillId}_notes`] = !v[`repeating_language_${languageId}_notes`] ? '' : v[`repeating_language_${languageId}_notes`];
                    newAttrs[`${skillId}_char1`] = '@{int}';
                    newAttrs[`${skillId}_char2`] = '@{cha}';
                    newAttrs[`${skillId}_other`] = xp + other;
                    newAttrs[`${skillId}_total`] = total - penalty - aug;
                    newAttrs[`${skillId}_id`] = skillId;
                });
            }

            /* Migration affiliations */
            affiliationIds.forEach(affiliationId => {
                const total = parseInt(v[`repeating_affiliation_${affiliationId}_total`]) || 0;
                const aug = parseInt(v[`repeating_affiliation_${affiliationId}_temp`]) || 0;
                const penalty = parseInt(v[`repeating_affiliation_${affiliationId}_penalty`]) || 0;
                const xp = parseInt(v[`repeating_affiliation_${affiliationId}_experience`]) || 0;
                const other = parseInt(v[`repeating_affiliation_${affiliationId}_other`]) || 0;
                newAttrs[`repeating_affiliation_${affiliationId}_other`] = xp + other;
                newAttrs[`repeating_affiliation_${affiliationId}_total`] = total - penalty - aug;
                newAttrs[`repeating_affiliation_${affiliationId}_id`] = `repeating_affiliation_${affiliationId}`;
            });

            /* Migration proSkills */
            professionalSkillIds.forEach(id => {
                const total = parseInt(v[`repeating_professionalskill_${id}_total`]) || 0;
                const aug = parseInt(v[`repeating_professionalskill_${id}_temp`]) || 0;
                const penalty = parseInt(v[`repeating_professionalskill_${id}_penalty`]) || 0;
                const xp = parseInt(v[`repeating_professionalskill_${id}_experience`]) || 0;
                const other = parseInt(v[`repeating_professionalskill_${id}_other`]) || 0;
                newAttrs[`repeating_professionalskill_${id}_other`] = xp + other;
                newAttrs[`repeating_professionalskill_${id}_total`] = total - penalty - aug;
                newAttrs[`repeating_professionalskill_${id}_id`] = `repeating_professionalskill_${id}`;
            });

            /* Migration passions */
            passionIds.forEach(id => {
                const total = parseInt(v[`repeating_passion_${id}_total`]) || 0;
                const aug = parseInt(v[`repeating_passion_${id}_temp`]) || 0;
                const penalty = parseInt(v[`repeating_passion_${id}_penalty`]) || 0;
                newAttrs[`repeating_passion_${id}_total`] = total - penalty - aug;
                newAttrs[`repeating_passion_${id}_id`] = `repeating_passion_${id}`;
            });

            /* Migration dependencies */
            dependencyIds.forEach(id => {
                const total = parseInt(v[`repeating_dependency_${id}_total`]) || 0;
                const aug = parseInt(v[`repeating_dependency_${id}_temp`]) || 0;
                const penalty = parseInt(v[`repeating_dependency_${id}_penalty`]) || 0;
                newAttrs[`repeating_dependency_${id}_total`] = total - penalty - aug;
                newAttrs[`repeating_dependency_${id}_id`] = `repeating_dependency_${id}`;
            });

            /* Migration peculiarity */
            peculiarityIds.forEach(id => {
                const total = parseInt(v[`repeating_peculiarity_${id}_total`]) || 0;
                const aug = parseInt(v[`repeating_peculiarity_${id}_temp`]) || 0;
                const penalty = parseInt(v[`repeating_peculiarity_${id}_penalty`]) || 0;
                newAttrs[`repeating_peculiarity_${id}_total`] = total - penalty - aug;
                newAttrs[`repeating_peculiarity_${id}_id`] = `repeating_peculiarity_${id}`;
            });

            /* Convert standard skill values */
            v2StandardSkillIds.forEach(id => {
                const total = parseInt(v[`${id}`]) || 0;
                const aug = parseInt(v[`${id}_temp`]) || 0;
                const penalty = parseInt(v[`${id}_penalty`]) || 0;
                const xp = parseInt(v[`${id}_experience`]) || 0;
                const other = parseInt(v[`${id}_other`]) || 0;
                newAttrs[`${id}_other`] = xp + other;
                newAttrs[`${id}`] = total - penalty - aug;
                newAttrs[`${id}_id`] = id;
            });

            /* Magic skills conversion */
            /* TODO merge magic skills into professional skills and setup traditions */
            /* Folk Magic */
            if (v['folk_magic'] && v['folk_magic'] !== '0') {
                const skillId = 'repeating_professionalskill_' + generateRowID();
                const traditionId = 'repeating_tradition_' + generateRowID();
                const total = parseInt(v[`folk_magic`]) || 0;
                const aug = parseInt(v[`folk_magic_temp`]) || 0;
                const penalty = parseInt(v[`folk_magic_penalty`]) || 0;
                const xp = parseInt(v[`folk_magic_experience`]) || 0;
                const other = parseInt(v[`folk_magic_other`]) || 0;
                newAttrs[`${skillId}_name`] = getTranslationByKey("folk_magic");
                newAttrs[`${skillId}_id`] = skillId;
                newAttrs[`${skillId}_fumbled`] = !v[`folk_magic_fumbled`] ? "0" : v[`folk_magic_fumbled`];
                newAttrs[`${skillId}_trained`] = !v[`folk_magic_trained`] ? "0" : v[`folk_magic_trained`];
                newAttrs[`${skillId}_notes`] = !v[`folk_magic_notes`] ? '' : v[`folk_magic_notes`];
                newAttrs[`${skillId}_char1`] = '@{pow}';
                newAttrs[`${skillId}_char2`] = '@{cha}';
                newAttrs[`${skillId}_other`] = xp + other;
                newAttrs[`${skillId}_total`] = total - penalty - aug;

                newAttrs[`${traditionId}_name`] = getTranslationByKey('folk_magic');
                newAttrs[`${traditionId}_id`] = traditionId;
                newAttrs[`${traditionId}_details`] = "0";
                newAttrs[`${traditionId}_skill1_id`] = skillId;
                newAttrs[`${traditionId}_skill1_name`] = `@{${skillId}_name}`;
                newAttrs[`${traditionId}_skill1_total`] = `@{${skillId}_total}`;
                newAttrs[`${traditionId}_skill1_notes`] = `@{${skillId}_notes}`;
            }
            folkSpellIds.forEach(id => {
                const abilityId = "repeating_ability_" + generateRowID();
                newAttrs[`${abilityId}_name`] = !v[`repeating_folkspell_${id}_name`] ? '' : v[`repeating_folkspell_${id}_name`];
                newAttrs[`${abilityId}_id`] = abilityId;
                newAttrs[`${abilityId}_type`] = 'folk_magic';
                newAttrs[`${abilityId}_traited`] = '1';
                newAttrs[`${abilityId}_details`] = '0';
                let traits = [];
                if (v[`repeating_folkspell_${id}_concentration`] === "1") {
                    traits.push(getTranslationByKey('concentration'));
                }
                if (v[`repeating_folkspell_${id}_resist`] === '^{brawn-u}') {
                    traits.push(getTranslationByKey('resist') + '(' + getTranslationByKey('brawn') + ')');
                } else if (v[`repeating_folkspell_${id}_resist`] === '^{endurance-u}') {
                    traits.push(getTranslationByKey('resist') + '(' + getTranslationByKey('endurance') + ')');
                } else if (v[`repeating_folkspell_${id}_resist`] === '^{evade-u}') {
                    traits.push(getTranslationByKey('resist') + '(' + getTranslationByKey('evade') + ')');
                } else if (v[`repeating_folkspell_${id}_resist`] === '^{willpower-u}') {
                    traits.push(getTranslationByKey('resist') + '(' + getTranslationByKey('willpower') + ')');
                } else if (v[`repeating_folkspell_${id}_resist`] === '^{special-u}') {
                    traits.push(getTranslationByKey('resist') + '(' + getTranslationByKey('special') + ')');
                }
                if (v[`repeating_folkspell_${id}_duration`] === '^{instant-u}') {
                    traits.push(getTranslationByKey('instant'));
                } else if (v[`repeating_folkspell_${id}_duration`] === '^{special-u}') {
                    traits.push(getTranslationByKey('special_duration'));
                }
                if (v[`repeating_folkspell_${id}_range`] === '^{touch-u}') {
                    traits.push(getTranslationByKey('touch'));
                } else {
                    traits.push(getTranslationByKey('ranged'));
                }
                newAttrs[`${abilityId}_traits`] = traits.join('\r\n');
                newAttrs[`${abilityId}_description`] = !v[`repeating_folkspell_${id}_description`] ? '' : v[`repeating_folkspell_${id}_description`];
            });
            
            /* Animism */
            const tranceId = 'repeating_professionalskill_' + generateRowID();
            const bindingId = 'repeating_professionalskill_' + generateRowID();
            if (v['trance'] && v['trance'] !== '0') {
                const skillId = tranceId;
                const total = parseInt(v[`trance`]) || 0;
                const aug = parseInt(v[`trance_temp`]) || 0;
                const penalty = parseInt(v[`trance_penalty`]) || 0;
                const xp = parseInt(v[`trance_experience`]) || 0;
                const other = parseInt(v[`trance_other`]) || 0;
                newAttrs[`${skillId}_name`] = getTranslationByKey("trance");
                newAttrs[`${skillId}_id`] = skillId;
                newAttrs[`${skillId}_fumbled`] = !v[`trance_fumbled`] ? "0" : v[`trance_fumbled`];
                newAttrs[`${skillId}_trained`] = !v[`trance_trained`] ? "0" : v[`trance_trained`];
                newAttrs[`${skillId}_notes`] = !v[`trance_notes`] ? '' : v[`trance_notes`];
                newAttrs[`${skillId}_char1`] = '@{con}';
                newAttrs[`${skillId}_char2`] = '@{pow}';
                newAttrs[`${skillId}_other`] = xp + other;
                newAttrs[`${skillId}_total`] = total - penalty - aug;
            }
            if (v['binding'] && v['binding'] !== '0') {
                const skillId = bindingId;
                const total = parseInt(v[`binding`]) || 0;
                const aug = parseInt(v[`binding_temp`]) || 0;
                const penalty = parseInt(v[`binding_penalty`]) || 0;
                const xp = parseInt(v[`binding_experience`]) || 0;
                const other = parseInt(v[`binding_other`]) || 0;
                newAttrs[`${skillId}_name`] = getTranslationByKey("binding");
                newAttrs[`${skillId}_id`] = skillId;
                newAttrs[`${skillId}_fumbled`] = !v[`binding_fumbled`] ? "0" : v[`binding_fumbled`];
                newAttrs[`${skillId}_trained`] = !v[`binding_trained`] ? "0" : v[`binding_trained`];
                newAttrs[`${skillId}_notes`] = !v[`binding_notes`] ? '' : v[`binding_notes`];
                newAttrs[`${skillId}_char1`] = '@{pow}';
                newAttrs[`${skillId}_char2`] = '@{cha}';
                newAttrs[`${skillId}_other`] = xp + other;
                newAttrs[`${skillId}_total`] = total - penalty - aug;
            }
            if ((v['trance'] && v['trance'] !== '0') && (v['binding'] && v['binding'] !== '0')) {
                const traditionId = "repeating_tradition_" + generateRowID();
                newAttrs[`${traditionId}_name`] = getTranslationByKey('animism');
                newAttrs[`${traditionId}_id`] = traditionId;
                newAttrs[`${traditionId}_details`] = "0";
                newAttrs[`${traditionId}_skill1_id`] = bindingId;
                newAttrs[`${traditionId}_skill1_name`] = `@{${bindingId}_name}`;
                newAttrs[`${traditionId}_skill1_total`] = `@{${bindingId}_total}`;
                newAttrs[`${traditionId}_skill1_notes`] = `@{${bindingId}_notes}`;
                newAttrs[`${traditionId}_skill2_id`] = tranceId;
                newAttrs[`${traditionId}_skill2_name`] = `@{${tranceId}_name}`;
                newAttrs[`${traditionId}_skill2_total`] = `@{${tranceId}_total}`;
                newAttrs[`${traditionId}_skill2_notes`] = `@{${tranceId}_notes}`;
            }

            /* Mysticism */
            const meditationId = 'repeating_professionalskill_' + generateRowID();
            if (v['meditation'] && v['meditation'] !== '0') {
                const skillId = meditationId;
                const total = parseInt(v[`meditation`]) || 0;
                const aug = parseInt(v[`meditation_temp`]) || 0;
                const penalty = parseInt(v[`meditation_penalty`]) || 0;
                const xp = parseInt(v[`meditation_experience`]) || 0;
                const other = parseInt(v[`meditation_other`]) || 0;
                newAttrs[`${skillId}_name`] = getTranslationByKey("meditation");
                newAttrs[`${skillId}_id`] = skillId;
                newAttrs[`${skillId}_fumbled`] = !v[`meditation_fumbled`] ? "0" : v[`meditation_fumbled`];
                newAttrs[`${skillId}_trained`] = !v[`meditation_trained`] ? "0" : v[`meditation_trained`];
                newAttrs[`${skillId}_notes`] = !v[`meditation_notes`] ? '' : v[`meditation_notes`];
                newAttrs[`${skillId}_char1`] = '@{int}';
                newAttrs[`${skillId}_char2`] = '@{con}';
                newAttrs[`${skillId}_other`] = xp + other;
                newAttrs[`${skillId}_total`] = total - penalty - aug;
            }
            pathIds.forEach(id => {
                const skillId = 'repeating_professionalskill_' + generateRowID();
                const total = parseInt(v[`repeating_path_${id}_total`]) || 0;
                const aug = parseInt(v[`repeating_path_${id}_temp`]) || 0;
                const penalty = parseInt(v[`repeating_path_${id}_penalty`]) || 0;
                const xp = parseInt(v[`repeating_path_${id}_experience`]) || 0;
                const other = parseInt(v[`repeating_path_${id}_other`]) || 0;
                newAttrs[`${skillId}_name`] = !v[`repeating_path_${id}_name`] ? "0" : v[`repeating_path_${id}_name`];
                newAttrs[`${skillId}_id`] = skillId;
                newAttrs[`${skillId}_fumbled`] = !v[`repeating_path_${id}_fumbled`] ? "0" : v[`repeating_path_${id}_fumbled`];
                newAttrs[`${skillId}_trained`] = !v[`repeating_path_${id}_trained`] ? "0" : v[`repeating_path_${id}_trained`];
                newAttrs[`${skillId}_notes`] = !v[`repeating_path_${id}_notes`] ? '' : v[`repeating_path_${id}_notes`];
                newAttrs[`${skillId}_char1`] = '@{pow}';
                newAttrs[`${skillId}_char2`] = '@{con}';
                newAttrs[`${skillId}_other`] = xp + other;
                newAttrs[`${skillId}_total`] = total - penalty - aug;

                const traditionId = "repeating_tradition_" + generateRowID();
                newAttrs[`${traditionId}_name`] = !v[`repeating_path_${id}_name`] ? "0" : v[`repeating_path_${id}_name`];
                newAttrs[`${traditionId}_id`] = traditionId;
                newAttrs[`${traditionId}_details`] = "0";
                newAttrs[`${traditionId}_skill1_id`] = meditationId;
                newAttrs[`${traditionId}_skill1_name`] = `@{${meditationId}_name}`;
                newAttrs[`${traditionId}_skill1_total`] = `@{${meditationId}_total}`;
                newAttrs[`${traditionId}_skill1_notes`] = `@{${meditationId}_notes}`;
                newAttrs[`${traditionId}_skill2_id`] = skillId;
                newAttrs[`${traditionId}_skill2_name`] = `@{${skillId}_name}`;
                newAttrs[`${traditionId}_skill2_total`] = `@{${skillId}_total}`;
                newAttrs[`${traditionId}_skill2_notes`] = `@{${skillId}_notes}`;
            });
            practicedTalentIds.forEach(id => {
                const talentId = "repeating_ability_" + generateRowID();
                newAttrs[`${talentId}_name`] = !v[`repeating_practicedtalent_${id}_name`] ? '' : v[`repeating_practicedtalent_${id}_name`];
                newAttrs[`${talentId}_id`] = talentId;
                newAttrs[`${talentId}_type`] = 'mysticism';
                newAttrs[`${talentId}_traited`] = '1';
                newAttrs[`${talentId}_details`] = '0';
                newAttrs[`${talentId}_advanced_traits`] = '^{intensity}: @{dynamic_intensity}';
                newAttrs[`${talentId}_description`] = !v[`repeating_practicedtalent_${id}_description`] ? '' : v[`repeating_practicedtalent_${id}_description`];
            });

            /* Sorcery */
            const shapingId = 'repeating_professionalskill_' + generateRowID();
            if (v['shaping'] && v['shaping'] !== '0') {
                const skillId = shapingId;
                const total = parseInt(v[`shaping`]) || 0;
                const aug = parseInt(v[`shaping_temp`]) || 0;
                const penalty = parseInt(v[`shaping_penalty`]) || 0;
                const xp = parseInt(v[`shaping_experience`]) || 0;
                const other = parseInt(v[`shaping_other`]) || 0;
                newAttrs[`${skillId}_name`] = getTranslationByKey("shaping");
                newAttrs[`${skillId}_id`] = skillId;
                newAttrs[`${skillId}_fumbled`] = !v[`shaping_fumbled`] ? "0" : v[`shaping_fumbled`];
                newAttrs[`${skillId}_trained`] = !v[`shaping_trained`] ? "0" : v[`shaping_trained`];
                newAttrs[`${skillId}_notes`] = !v[`shaping_notes`] ? '' : v[`shaping_notes`];
                newAttrs[`${skillId}_char1`] = '@{int}';
                newAttrs[`${skillId}_char2`] = '@{pow}';
                newAttrs[`${skillId}_other`] = xp + other;
                newAttrs[`${skillId}_total`] = total - penalty - aug;
            }
            invocationIds.forEach(id => {
                const skillId = 'repeating_professionalskill_' + generateRowID();
                const total = parseInt(v[`repeating_invocation_${id}_total`]) || 0;
                const aug = parseInt(v[`repeating_invocation_${id}_temp`]) || 0;
                const penalty = parseInt(v[`repeating_invocation_${id}_penalty`]) || 0;
                const xp = parseInt(v[`repeating_invocation_${id}_experience`]) || 0;
                const other = parseInt(v[`repeating_invocation_${id}_other`]) || 0;
                newAttrs[`${skillId}_name`] = !v[`repeating_invocation_${id}_name`] ? "0" : v[`repeating_invocation_${id}_name`];
                newAttrs[`${skillId}_id`] = skillId;
                newAttrs[`${skillId}_fumbled`] = !v[`repeating_invocation_${id}_fumbled`] ? "0" : v[`repeating_invocation_${id}_fumbled`];
                newAttrs[`${skillId}_trained`] = !v[`repeating_invocation_${id}_trained`] ? "0" : v[`repeating_invocation_${id}_trained`];
                newAttrs[`${skillId}_notes`] = !v[`repeating_invocation_${id}_notes`] ? '' : v[`repeating_invocation_${id}_notes`];
                newAttrs[`${skillId}_char1`] = '@{int}';
                newAttrs[`${skillId}_char2`] = '@{int}';
                newAttrs[`${skillId}_other`] = xp + other;
                newAttrs[`${skillId}_total`] = total - penalty - aug;

                const traditionId = "repeating_tradition_" + generateRowID();
                newAttrs[`${traditionId}_name`] = !v[`repeating_invocation_${id}_name`] ? "0" : v[`repeating_invocation_${id}_name`];
                newAttrs[`${traditionId}_id`] = traditionId;
                newAttrs[`${traditionId}_details`] = "0";
                newAttrs[`${traditionId}_skill1_id`] = shapingId;
                newAttrs[`${traditionId}_skill1_name`] = `@{${shapingId}_name}`;
                newAttrs[`${traditionId}_skill1_total`] = `@{${shapingId}_total}`;
                newAttrs[`${traditionId}_skill1_notes`] = `@{${shapingId}_notes}`;
                newAttrs[`${traditionId}_skill2_id`] = skillId;
                newAttrs[`${traditionId}_skill2_name`] = `@{${skillId}_name}`;
                newAttrs[`${traditionId}_skill2_total`] = `@{${skillId}_total}`;
                newAttrs[`${traditionId}_skill2_notes`] = `@{${skillId}_notes}`;
            });

            let shaping_traits = ['^{combine}: @{shaped_combine}'];
            if (!v['duration_component'] || v['duration_component'] === '@{duration_standard_query}') {
                shaping_traits.push('^{duration}: @{shaped_duration}');
            }
            if (!v['magnitude_component'] || v['magnitude_component'] === '@{magnitude_query}') {
                shaping_traits.push('^{magnitude}: @{shaped_magnitude}');
            }
            if (!v['range_component'] || v['range_component'] === '@{range_query}') {
                shaping_traits.push('^{range}: @{shaped_range}');
            }
            if (!v['targets_component'] || v['targets_component'] === '@{targets_query}') {
                shaping_traits.push('^{targets}: @{shaped_targets}');
            }
            if (v['ablation_component'] === '@{ablation_query}') {
                shaping_traits.push('^{ablation}: @{shaped_ablation}');
            }
            if (v['focus_component'] === '@{focus_query}') {
                shaping_traits.push('^{focus}: @{shaped_focus}');
            }
            if (v['fortune_component'] === '@{fortune_query}') {
                shaping_traits.push('^{fortune}: @{shaped_fortune}');
            }
            if (v['precision_component'] === '@{precision_query}') {
                shaping_traits.push('^{precision}: @{shaped_precision}');
            }
            if (v['swiftness_subquery'] === '@{swiftness_query}') {
                shaping_traits.push('^{swiftness}: @{shaped_swiftness}');
            }
            newAttrs['shaping_traits'] = shaping_traits.join('\r\n');

            sorcerySpellIds.forEach(id => {
                const abilityId = "repeating_ability_" + generateRowID();
                newAttrs[`${abilityId}_name`] = !v[`repeating_sorceryspell_${id}_name`] ? '' : v[`repeating_sorceryspell_${id}_name`];
                newAttrs[`${abilityId}_id`] = abilityId;
                newAttrs[`${abilityId}_type`] = 'sorcery';
                newAttrs[`${abilityId}_traited`] = '1';
                newAttrs[`${abilityId}_details`] = '0';
                if (v[`repeating_sorceryspell_${id}_memorized`] === "1") {
                    newAttrs[`${abilityId}_favored`] = "1";
                } else {
                    newAttrs[`${abilityId}_favored`] = "0";
                }
                let traits = [];
                if (v[`repeating_sorceryspell_${id}_concentration`] === "1") {
                    traits.push(getTranslationByKey('concentration'));
                }
                if (v[`repeating_sorceryspell_${id}_resist`] === '^{brawn-u}') {
                    traits.push(getTranslationByKey('resist') + '(' + getTranslationByKey('brawn') + ')');
                } else if (v[`repeating_sorceryspell_${id}_resist`] === '^{endurance-u}') {
                    traits.push(getTranslationByKey('resist') + '(' + getTranslationByKey('endurance') + ')');
                } else if (v[`repeating_sorceryspell_${id}_resist`] === '^{evade-u}') {
                    traits.push(getTranslationByKey('resist') + '(' + getTranslationByKey('evade') + ')');
                } else if (v[`repeating_sorceryspell_${id}_resist`] === '^{willpower-u}') {
                    traits.push(getTranslationByKey('resist') + '(' + getTranslationByKey('willpower') + ')');
                } else if (v[`repeating_sorceryspell_${id}_resist`] === '^{special-u}') {
                    traits.push(getTranslationByKey('resist') + '(' + getTranslationByKey('special') + ')');
                }
                newAttrs[`${abilityId}_traits`] = traits.join('\r\n');
                newAttrs[`${abilityId}_advanced_traits`] = '@{shaping_traits}';
                newAttrs[`${abilityId}_description`] = !v[`repeating_sorceryspell_${id}_description`] ? '' : v[`repeating_sorceryspell_${id}_description`];
            });

            /* Theism */
            const exhortId = 'repeating_professionalskill_' + generateRowID();
            if (v['exhort'] && v['exhort'] !== '0') {
                const skillId = exhortId;
                const total = parseInt(v[`exhort`]) || 0;
                const aug = parseInt(v[`exhort_temp`]) || 0;
                const penalty = parseInt(v[`exhort_penalty`]) || 0;
                const xp = parseInt(v[`exhort_experience`]) || 0;
                const other = parseInt(v[`exhort_other`]) || 0;
                newAttrs[`${skillId}_name`] = getTranslationByKey("exhort");
                newAttrs[`${skillId}_id`] = skillId;
                newAttrs[`${skillId}_fumbled`] = !v[`exhort_fumbled`] ? "0" : v[`exhort_fumbled`];
                newAttrs[`${skillId}_trained`] = !v[`exhort_trained`] ? "0" : v[`exhort_trained`];
                newAttrs[`${skillId}_notes`] = !v[`exhort_notes`] ? '' : v[`exhort_notes`];
                newAttrs[`${skillId}_char1`] = '@{int}';
                newAttrs[`${skillId}_char2`] = '@{cha}';
                newAttrs[`${skillId}_other`] = xp + other;
                newAttrs[`${skillId}_total`] = total - penalty - aug;
            }
            devotionIds.forEach(id => {
                const skillId = 'repeating_professionalskill_' + generateRowID();
                const total = parseInt(v[`repeating_devotion_${id}_total`]) || 0;
                const aug = parseInt(v[`repeating_devotion_${id}_temp`]) || 0;
                const penalty = parseInt(v[`repeating_devotion_${id}_penalty`]) || 0;
                const xp = parseInt(v[`repeating_devotion_${id}_experience`]) || 0;
                const other = parseInt(v[`repeating_devotion_${id}_other`]) || 0;
                newAttrs[`${skillId}_name`] = !v[`repeating_devotion_${id}_name`] ? "0" : v[`repeating_devotion_${id}_name`];
                newAttrs[`${skillId}_id`] = skillId;
                newAttrs[`${skillId}_fumbled`] = !v[`repeating_devotion_${id}_fumbled`] ? "0" : v[`repeating_devotion_${id}_fumbled`];
                newAttrs[`${skillId}_trained`] = !v[`repeating_devotion_${id}_trained`] ? "0" : v[`repeating_devotion_${id}_trained`];
                newAttrs[`${skillId}_notes`] = !v[`repeating_devotion_${id}_notes`] ? '' : v[`repeating_devotion_${id}_notes`];
                newAttrs[`${skillId}_char1`] = '@{pow}';
                newAttrs[`${skillId}_char2`] = '@{cha}';
                newAttrs[`${skillId}_other`] = xp + other;
                newAttrs[`${skillId}_total`] = total - penalty - aug;

                const traditionId = "repeating_tradition_" + generateRowID();
                newAttrs[`${traditionId}_name`] = !v[`repeating_devotion_${id}_name`] ? "0" : v[`repeating_devotion_${id}_name`];
                newAttrs[`${traditionId}_id`] = traditionId;
                newAttrs[`${traditionId}_details`] = "0";
                newAttrs[`${traditionId}_skill1_id`] = exhortId;
                newAttrs[`${traditionId}_skill1_name`] = `@{${exhortId}_name}`;
                newAttrs[`${traditionId}_skill1_total`] = `@{${exhortId}_total}`;
                newAttrs[`${traditionId}_skill1_notes`] = `@{${exhortId}_notes}`;
                newAttrs[`${traditionId}_skill2_id`] = skillId;
                newAttrs[`${traditionId}_skill2_name`] = `@{${skillId}_name}`;
                newAttrs[`${traditionId}_skill2_total`] = `@{${skillId}_total}`;
                newAttrs[`${traditionId}_skill2_notes`] = `@{${skillId}_notes}`;
                newAttrs[`${traditionId}_pool_limit`] = !v[`repeating_devotion_${id}_rank_devotion_pool_limit`] ? "0" : v[`repeating_devotion_${id}_rank_devotion_pool_limit`];
                newAttrs[`${traditionId}_pool`] = !v[`repeating_devotion_${id}_devotional_pool`] ? "0" : v[`repeating_devotion_${id}_devotional_pool`];
                if (v[`repeating_devotion_${id}_rank_devotion_pool_limit`] === 'ceil(@{pow}*.25)') {
                    newAttrs[`${traditionId}_tradition_rank`] = 2;
                } else if (v[`repeating_devotion_${id}_rank_devotion_pool_limit`] === 'ceil(@{pow}*.5)') {
                    newAttrs[`${traditionId}_tradition_rank`] = 3;
                } else if (v[`repeating_devotion_${id}_rank_devotion_pool_limit`] === 'ceil(@{pow}*.75)') {
                    newAttrs[`${traditionId}_tradition_rank`] = 4;
                } else if (v[`repeating_devotion_${id}_rank_devotion_pool_limit`] === '@{pow}') {
                    newAttrs[`${traditionId}_tradition_rank`] = 5;
                }
            });
            miracleIds.forEach(id => {
                const abilityId = "repeating_ability_" + generateRowID();
                newAttrs[`${abilityId}_name`] = !v[`repeating_miracle_${id}_name`] ? '' : v[`repeating_miracle_${id}_name`];
                newAttrs[`${abilityId}_id`] = abilityId;
                newAttrs[`${abilityId}_type`] = 'theism';
                newAttrs[`${abilityId}_traited`] = '1';
                newAttrs[`${abilityId}_details`] = '0';

                let traits = [];
                if (!v[`repeating_miracle_${id}_miracle_rank`] || v[`repeating_miracle_${id}_miracle_rank`] === "1") {
                    traits.push(getTranslationByKey('rank') + '(' + getTranslationByKey('initiate') + ')');
                } else if (v[`repeating_miracle_${id}_miracle_rank`] === "2") {
                    traits.push(getTranslationByKey('rank') + '(' + getTranslationByKey('acolyte') + ')');
                } else if (v[`repeating_miracle_${id}_miracle_rank`] === "3") {
                    traits.push(getTranslationByKey('rank') + '(' + getTranslationByKey('priest') + ')');
                }

                if (v[`repeating_miracle_${id}_resist`] === '^{brawn-u}') {
                    traits.push(getTranslationByKey('resist') + '(' + getTranslationByKey('brawn') + ')');
                } else if (v[`repeating_miracle_${id}_resist`] === '^{endurance-u}') {
                    traits.push(getTranslationByKey('resist') + '(' + getTranslationByKey('endurance') + ')');
                } else if (v[`repeating_miracle_${id}_resist`] === '^{evade-u}') {
                    traits.push(getTranslationByKey('resist') + '(' + getTranslationByKey('evade') + ')');
                } else if (v[`repeating_miracle_${id}_resist`] === '^{willpower-u}') {
                    traits.push(getTranslationByKey('resist') + '(' + getTranslationByKey('willpower') + ')');
                } else if (v[`repeating_miracle_${id}_resist`] === '^{special-u}') {
                    traits.push(getTranslationByKey('resist') + '(' + getTranslationByKey('special') + ')');
                }

                if (v[`repeating_miracle_${id}_damage`] && v[`repeating_miracle_${id}_damage`] !== "0") {
                    newAttrs[`${abilityId}_advanced_traits`] = '^{damage}: [' + v[`repeating_miracle_${id}_damage`] + '](`/r ' + v[`repeating_miracle_${id}_damage`] + ')';
                }

                if (v[`repeating_miracle_${id}_area`] === "[[@{intensity_magnitude}]] ^{metres-u}") {
                    traits.push(getTranslationByKey('area') + '(' + getTranslationByKey('meters') + ')');
                } else if (v[`repeating_miracle_${id}_area`] === "[[@{intensity_magnitude}]] ^{decametres-u}") {
                    traits.push(getTranslationByKey('area') + '(10 X ' + getTranslationByKey('meters') + ')');
                } else if (v[`repeating_miracle_${id}_area`] === "[[@{intensity_magnitude}]] ^{kilometres-u}") {
                    traits.push(getTranslationByKey('area') + '(' + getTranslationByKey('kilometers') + ')');
                } else if (v[`repeating_miracle_${id}_area`] === "^{special-u}") {
                    traits.push(getTranslationByKey('area') + '(' + getTranslationByKey('special') + ')');
                }

                if (v[`repeating_miracle_${id}_duration`] === "^{instant-u}") {
                    traits.push(getTranslationByKey('duration') + '(' + getTranslationByKey('instant') + ')');
                } else if (v[`repeating_miracle_${id}_duration`] === "[[@{intensity_magnitude}]] ^{minutes-u}") {
                    traits.push(getTranslationByKey('duration') + '(' + getTranslationByKey('minutes') + ')');
                } else if (v[`repeating_miracle_${id}_duration`] === "[[@{intensity_magnitude}]] ^{hours-u}") {
                    traits.push(getTranslationByKey('duration') + '(' + getTranslationByKey('hours') + ')');
                } else if (v[`repeating_miracle_${id}_duration`] === "[[@{intensity_magnitude}]] ^{days-u}") {
                    traits.push(getTranslationByKey('duration') + '(' + getTranslationByKey('days') + ')');
                } else if (v[`repeating_miracle_${id}_duration`] === "[[@{intensity_magnitude}]] ^{months-u}") {
                    traits.push(getTranslationByKey('duration') + '(' + getTranslationByKey('months') + ')');
                } else if (v[`repeating_miracle_${id}_duration`] === "^{special-u}") {
                    traits.push(getTranslationByKey('duration') + '(' + getTranslationByKey('special') + ')');
                }

                if (v[`repeating_miracle_${id}_range`] === "^{touch-u}") {
                    traits.push(getTranslationByKey('range') + '(' + getTranslationByKey('touch') + ')');
                } else if (v[`repeating_miracle_${id}_range`] === "[[@{intensity_magnitude}]] ^{metres-u}") {
                    traits.push(getTranslationByKey('range') + '(' + getTranslationByKey('meters') + ')');
                } else if (v[`repeating_miracle_${id}_range`] === "[[@{intensity_magnitude}]] ^{decametres-u}") {
                    traits.push(getTranslationByKey('range') + '(10 X ' + getTranslationByKey('meters') + ')');
                } else if (v[`repeating_miracle_${id}_range`] === "^{special-u}") {
                    traits.push(getTranslationByKey('range') + '(10 X ' + getTranslationByKey('special') + ')');
                }

                newAttrs[`${abilityId}_traits`] = traits.join('\r\n');
                newAttrs[`${abilityId}_description`] = !v[`repeating_miracle_${id}_description`] ? '' : v[`repeating_miracle_${id}_description`];
            });

            /* M-Space psionics conversion */
            psionicPowerIds.forEach(id => {
                const abilityId = 'repeating_skilledability_' + generateRowID();
                const total = parseInt(v[`repeating_psionicpower_${id}_total`]) || 0;
                const temp = parseInt(v[`repeating_psionicpower_${id}_temp`]) || 0;
                const penalty = parseInt(v[`repeating_psionicpower_${id}_temp`]) || 0;
                const xp = parseInt(v[`repeating_psionicpower_${id}_experience`]) || 0;
                const other = parseInt(v[`repeating_psionicpower_${id}_other`]) || 0;
                newAttrs[`${abilityId}_name`] = !v[`repeating_psionicpower_${id}_name`] ? '' : v[`repeating_psionicpower_${id}_name`];
                newAttrs[`${abilityId}_id`] = abilityId;
                newAttrs[`${abilityId}_details`] = '0';
                newAttrs[`${abilityId}_description`] = !v[`repeating_psionicpower_${id}_description`] ? '' : v[`repeating_psionicpower_${id}_description`];
                newAttrs[`${abilityId}_summary`] = !v[`repeating_psionicpower_${id}_description`] ? '' : v[`repeating_psionicpower_${id}_description`];
                newAttrs[`${abilityId}_fumbled`] = !v[`repeating_psionicpower_${id}_fumbled`] ? "0" : v[`repeating_psionicpower_${id}_fumbled`];
                newAttrs[`${abilityId}_trained`] = !v[`repeating_psionicpower_${id}_trained`] ? "0" : v[`repeating_psionicpower_${id}_trained`];
                newAttrs[`${abilityId}_char1`] = '@{pow}';
                newAttrs[`${abilityId}_char2`] = '@{pow}';
                newAttrs[`${abilityId}_other`] = xp + other;
                newAttrs[`${abilityId}_total`] = total - penalty - temp;
            });

            /* Odd Soot Magic Conversion */
            magicSpellIds.forEach(id => {
                const abilityId = 'repeating_skilledability_' + generateRowID();
                const total = parseInt(v[`repeating_magicspell_${id}_total`]) || 0;
                const temp = parseInt(v[`repeating_magicspell_${id}_temp`]) || 0;
                const penalty = parseInt(v[`repeating_magicspell_${id}_temp`]) || 0;
                const xp = parseInt(v[`repeating_magicspell_${id}_experience`]) || 0;
                const other = parseInt(v[`repeating_magicspell_${id}_other`]) || 0;
                newAttrs[`${abilityId}_name`] = !v[`repeating_magicspell_${id}_name`] ? '' : v[`repeating_magicspell_${id}_name`];
                newAttrs[`${abilityId}_id`] = abilityId;
                newAttrs[`${abilityId}_details`] = '0';
                newAttrs[`${abilityId}_description`] = !v[`repeating_magicspell_${id}_description`] ? '' : v[`repeating_magicspell_${id}_description`];
                newAttrs[`${abilityId}_summary`] = !v[`repeating_magicspell_${id}_description`] ? '' : v[`repeating_magicspell_${id}_description`];
                newAttrs[`${abilityId}_fumbled`] = !v[`repeating_magicspell_${id}_fumbled`] ? "0" : v[`repeating_magicspell_${id}_fumbled`];
                newAttrs[`${abilityId}_trained`] = !v[`repeating_magicspell_${id}_trained`] ? "0" : v[`repeating_magicspell_${id}_trained`];
                newAttrs[`${abilityId}_char1`] = '@{pow}';
                newAttrs[`${abilityId}_char2`] = '@{pow}';
                newAttrs[`${abilityId}_other`] = xp + other;
                newAttrs[`${abilityId}_total`] = total - penalty - temp;
                let traits = [];
                if (v[`repeating_magicspell_${id}_cost`]) {
                    traits.push(getTranslationByKey("cost") + ": " + v[`repeating_magicspell_${id}_cost`]);
                }
                if (v[`repeating_magicspell_${id}_duration`]) {
                    traits.push(getTranslationByKey("duration") + ": " + v[`repeating_magicspell_${id}_duration`]);
                }
                if (v[`repeating_magicspell_${id}_range`]) {
                    traits.push(getTranslationByKey("range") + ": " + v[`repeating_magicspell_${id}_range`]);
                }
                newAttrs[`${abilityId}_traits`] = traits.join("\r\n");
            });

            /* TODO Magic powers conversion */
            /* TODO traits conversion */
            /* TODO Import skill based abilities */

            /* Convert income */
            let newIncome = "";
            const incomeDay = parseFloat(v['income_day']) || 0;
            const incomeMonth = parseFloat(v['income_month']) || 0;
            const incomeSeason = parseFloat(v['income_season']) || 0;
            const incomeYear = parseFloat(v['income_year']) || 0;
            if (v['income_day']) {
                newIncome = newIncome + getTranslationByKey('day') + ':' + incomeDay.toFixed(2) + ' ';
            }
            if (v['income_month']) {
                newIncome = newIncome + getTranslationByKey('month') + ':' + incomeMonth.toFixed(2) + ' ';
            }
            if (v['income_season']) {
                newIncome = newIncome + getTranslationByKey('season') + ':' + incomeSeason.toFixed(2) + ' ';
            }
            if (v['income_year']) {
                newIncome = newIncome + getTranslationByKey('year') + ':' + incomeYear.toFixed(2);
            }
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
    /* Get IDs end */
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
    });
    });
    });
    });
    });
    });
}
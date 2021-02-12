/* Common Autocalc Constants */
const strGetAttrs = ['str_base', 'str_other', 'str_temp'];
const dexGetAttrs = ['dex_base', 'dex_other', 'dex_temp'];
const sizGetAttrs = ['siz_base', 'siz_other', 'siz_temp'];
const conGetAttrs = ['con_base', 'con_other', 'con_temp'];
const powGetAttrs = ['pow_base', 'pow_other', 'pow_temp'];
const intGetAttrs = ['int_base', 'int_other', 'int_temp'];
const chaGetAttrs = ['cha_base', 'cha_other', 'cha_temp'];
const allCharGetAttrs = strGetAttrs.concat(dexGetAttrs, sizGetAttrs, conGetAttrs, powGetAttrs, intGetAttrs, chaGetAttrs);

const armorEncGetAttrs = ['location1_armor_enc', 'location1_armor_equipped',
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

const armorLocGetAttrs = ['location1_other_ap', 'location1_armor_ap', 'location1_armor_equipped',
    'location2_other_ap', 'location2_armor_ap', 'location2_armor_equipped',
    'location3_other_ap', 'location3_armor_ap', 'location3_armor_equipped',
    'location4_other_ap', 'location4_armor_ap', 'location4_armor_equipped',
    'location5_other_ap', 'location5_armor_ap', 'location5_armor_equipped',
    'location6_other_ap', 'location6_armor_ap', 'location6_armor_equipped',
    'location7_other_ap', 'location7_armor_ap', 'location7_armor_equipped',
    'location8_other_ap', 'location8_armor_ap', 'location8_armor_equipped',
    'location9_other_ap', 'location9_armor_ap', 'location9_armor_equipped',
    'location10_other_ap', 'location10_armor_ap', 'location10_armor_equipped',
    'location11_other_ap', 'location11_armor_ap', 'location11_armor_equipped',
    'location12_other_ap', 'location12_armor_ap', 'location12_armor_equipped',
    'all_armor_temp'];

const hitPointGetAttrs = ['location1_hp_max_base_mod', 'location1_hp_max_other', 'location1_hp', 'location1_hp_max',
    'location2_hp_max_base_mod', 'location2_hp_max_other', 'location2_hp', 'location2_hp_max',
    'location3_hp_max_base_mod', 'location3_hp_max_other', 'location3_hp', 'location3_hp_max',
    'location4_hp_max_base_mod', 'location4_hp_max_other', 'location4_hp', 'location4_hp_max',
    'location5_hp_max_base_mod', 'location5_hp_max_other', 'location5_hp', 'location5_hp_max',
    'location6_hp_max_base_mod', 'location6_hp_max_other', 'location6_hp', 'location6_hp_max',
    'location7_hp_max_base_mod', 'location7_hp_max_other', 'location7_hp', 'location7_hp_max',
    'location8_hp_max_base_mod', 'location8_hp_max_other', 'location8_hp', 'location8_hp_max',
    'location9_hp_max_base_mod', 'location9_hp_max_other', 'location9_hp', 'location9_hp_max',
    'location10_hp_max_base_mod', 'location10_hp_max_other', 'location10_hp', 'location10_hp_max',
    'location11_hp_max_base_mod', 'location11_hp_max_other', 'location11_hp', 'location11_hp_max',
    'location12_hp_max_base_mod', 'location12_hp_max_other', 'location12_hp', 'location12_hp_max',
    'hp_max_base', 'all_hp_temp', 'simplified_combat_enabled', 'hp_calc'];

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

const fatigueTable = {
    9: ['0', '0', '0', '+0', 0],
    8: ['1', '0', '0', '+0', .25],
    7: ['1', '0', '0', '-1', 3],
    6: ['2', '0', '-2', '-2', 6],
    5: ['2', '-1', '-4', '*.5', 12],
    4: ['3', '-2', '-6', '*.5', 18],
    3: ['3', '-3', '-8', '*0', 24],
    2: ['4', '-99', '-99', '*0', 36],
    1: ['5', '-99', '-99', '*0', 48],
    0: ['5', '-99', '-99', '*0', '-']
};

const hitLocationTable = {
    custom1: {
        location2to7_display: 0, location8_display: 0, location9_display: 0, location10_display: 0, location11_display: 0, location12_display: 0,
        location_notes_1_display: 1, location_notes_7_display: 0, location_notes_8_display: 0, location_notes_9_display: 0, location_notes_10_display: 0
    },
    custom7: {
        location2to7_display: 1, location8_display: 0, location9_display: 0, location10_display: 0, location11_display: 0, location12_display: 0,
        location_notes_1_display: 0, location_notes_7_display: 1, location_notes_8_display: 0, location_notes_9_display: 0, location_notes_10_display: 0
    },
    custom8: {
        location2to7_display: 1, location8_display: 1, location9_display: 0, location10_display: 0, location11_display: 0, location12_display: 0,
        location_notes_1_display: 0, location_notes_7_display: 0, location_notes_8_display: 1, location_notes_9_display: 0, location_notes_10_display: 0
    },
    custom9: {
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 0, location11_display: 0, location12_display: 0,
        location_notes_1_display: 0, location_notes_7_display: 0, location_notes_8_display: 0, location_notes_9_display: 1, location_notes_10_display: 0
    },
    custom10: {
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 1, location11_display: 0, location12_display: 0,
        location_notes_1_display: 0, location_notes_7_display: 0, location_notes_8_display: 0, location_notes_9_display: 0, location_notes_10_display: 1
    },
    custom11: {
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 1, location11_display: 1, location12_display: 0,
        location_notes_1_display: 0, location_notes_7_display: 0, location_notes_8_display: 0, location_notes_9_display: 0, location_notes_10_display: 0
    },
    custom: {
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 1, location11_display: 1, location12_display: 1,
        location_notes_1_display: 0, location_notes_7_display: 0, location_notes_8_display: 0, location_notes_9_display: 0, location_notes_10_display: 0
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
        location2to7_display: 0, location8_display: 0, location9_display: 0, location10_display: 0, location11_display: 0, location12_display: 0,
        location_notes_1_display: 1, location_notes_7_display: 0, location_notes_8_display: 0, location_notes_9_display: 0, location_notes_10_display: 0
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
        location2to7_display: 0, location8_display: 0, location9_display: 0, location10_display: 0, location11_display: 0, location12_display: 0,
        location_notes_1_display: 1, location_notes_7_display: 0, location_notes_8_display: 0, location_notes_9_display: 0, location_notes_10_display: 0
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
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 1, location11_display: 0, location12_display: 0,
        location_notes_1_display: 0, location_notes_7_display: 0, location_notes_8_display: 0, location_notes_9_display: 0, location_notes_10_display: 1
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
        location2to7_display: 1, location8_display: 0, location9_display: 0, location10_display: 0, location11_display: 0, location12_display: 0,
        location_notes_1_display: 0, location_notes_7_display: 1, location_notes_8_display: 0, location_notes_9_display: 0, location_notes_10_display: 0
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
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 1, location11_display: 0, location12_display: 0,
        location_notes_1_display: 0, location_notes_7_display: 0, location_notes_8_display: 0, location_notes_9_display: 0, location_notes_10_display: 1
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
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 1, location11_display: 1, location12_display: 1,
        location_notes_1_display: 0, location_notes_7_display: 0, location_notes_8_display: 0, location_notes_9_display: 0, location_notes_10_display: 0
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
        location9_table_start: 9, location9_table_end: 11, location9_name: getTranslationByKey('long-tentacle_1'), location9_hp_max_base_mod: 0,
        location10_table_start: 12, location10_table_end: 14, location10_name: getTranslationByKey('long-tentacle_2'), location10_hp_max_base_mod: 0,
        location11_table_start: 15, location11_table_end: 17, location11_name: getTranslationByKey('body'), location11_hp_max_base_mod: 2,
        location12_table_start: 18, location12_table_end: 20, location12_name: getTranslationByKey('head'), location12_hp_max_base_mod: 1,
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 1, location11_display: 1, location12_display: 1,
        location_notes_1_display: 0, location_notes_7_display: 0, location_notes_8_display: 0, location_notes_9_display: 0, location_notes_10_display: 0
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
        location2to7_display: 1, location8_display: 0, location9_display: 0, location10_display: 0, location11_display: 0, location12_display: 0,
        location_notes_1_display: 0, location_notes_7_display: 1, location_notes_8_display: 0, location_notes_9_display: 0, location_notes_10_display: 0
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
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 1, location11_display: 0, location12_display: 0,
        location_notes_1_display: 0, location_notes_7_display: 0, location_notes_8_display: 0, location_notes_9_display: 0, location_notes_10_display: 1
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
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 0, location11_display: 0, location12_display: 0,
        location_notes_1_display: 0, location_notes_7_display: 0, location_notes_8_display: 0, location_notes_9_display: 1, location_notes_10_display: 0
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
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 1, location11_display: 0, location12_display: 0,
        location_notes_1_display: 0, location_notes_7_display: 0, location_notes_8_display: 0, location_notes_9_display: 0, location_notes_10_display: 1
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
        location2to7_display: 1, location8_display: 1, location9_display: 0, location10_display: 0, location11_display: 0, location12_display: 0,
        location_notes_1_display: 0, location_notes_7_display: 0, location_notes_8_display: 1, location_notes_9_display: 0, location_notes_10_display: 0
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
        location2to7_display: 1, location8_display: 0, location9_display: 0, location10_display: 0, location11_display: 0, location12_display: 0,
        location_notes_1_display: 0, location_notes_7_display: 1, location_notes_8_display: 0, location_notes_9_display: 0, location_notes_10_display: 0
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
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 0, location11_display: 0, location12_display: 0,
        location_notes_1_display: 0, location_notes_7_display: 0, location_notes_8_display: 0, location_notes_9_display: 1, location_notes_10_display: 0
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
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 1, location11_display: 1, location12_display: 0,
        location_notes_1_display: 0, location_notes_7_display: 0, location_notes_8_display: 0, location_notes_9_display: 0, location_notes_10_display: 0
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
        location2to7_display: 1, location8_display: 1, location9_display: 0, location10_display: 0, location11_display: 0, location12_display: 0,
        location_notes_1_display: 0, location_notes_7_display: 0, location_notes_8_display: 1, location_notes_9_display: 0, location_notes_10_display: 0
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
        location2to7_display: 1, location8_display: 1, location9_display: 0, location10_display: 0, location11_display: 0, location12_display: 0,
        location_notes_1_display: 0, location_notes_7_display: 0, location_notes_8_display: 1, location_notes_9_display: 0, location_notes_10_display: 0
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
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 0, location11_display: 0, location12_display: 0,
        location_notes_1_display: 0, location_notes_7_display: 0, location_notes_8_display: 0, location_notes_9_display: 1, location_notes_10_display: 0
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
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 1, location11_display: 1, location12_display: 0,
        location_notes_1_display: 0, location_notes_7_display: 0, location_notes_8_display: 0, location_notes_9_display: 0, location_notes_10_display: 0
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
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 0, location11_display: 0, location12_display: 0,
        location_notes_1_display: 0, location_notes_7_display: 0, location_notes_8_display: 0, location_notes_9_display: 1, location_notes_10_display: 0
    }
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



/* Atribute Functions */
/**
 * @param {Integer} con   The con value.
 * @param {Integer} siz   The siz value.
 * @param {Integer} pow   The pow value.
 * @param {Integer} str   The str value.
 * @param {String} hp_calc   The select value to determine how base HP is calculated.
 * @param {String} simplified_combat_enabled   The select value to determine if simplified combat is enabled.
 * @return {Integer}      Value of the base HP.
 */
function calcBaseHP(con, siz, pow, str, hp_calc, simplified_combat_enabled ) {
    let modifier = 5;
    if (simplified_combat_enabled === '1') {
        modifier = 2;
    }

    if (hp_calc === '1') {
       return Math.ceil((con + siz + pow)/modifier);
    } else if (hp_calc === '2') {
        return Math.ceil((con + siz + str)/modifier);
    } else {
        return Math.ceil((con + siz)/modifier);
    }
}

/**
 * @param {String} num   Number of the location being calculated.
 * @param {Integer} hp_max_base   The base HP.
 * @param {String} hp_max_base_mod   Unparsed base HP mod.
 * @param {String} hp_max_other   Unparsed HP other.
 * @param {Integer} all_hp_temp   Parsed HP temp.
 * @param {String} currentHP   Current HP.
 * @param {String} currentMax   Current max HP.
 * @return {Object}      Values of the location HP and location HP max.
 */
function calcLocationHP(num, hp_max_base, hp_max_base_mod, hp_max_other, all_hp_temp, currentHP, currentMax) {
    if (isNaN(parseInt(hp_max_base_mod))) {
        return {[`location${num}_hp`]: 0, [`location${num}_hp_max`]: 0};
    } else {
        const newMax = hp_max_base + parseInt(hp_max_base_mod) + parseInt(hp_max_other) + all_hp_temp;
        const diff = parseInt(currentHP) - parseInt(currentMax);
        return {[`location${num}_hp`]: newMax + diff, [`location${num}_hp_max`]: newMax};
    }
}

/**
 * @param {String} other_ap   Other armor
 * @param {String} armor_ap   AP from armor
 * @param {Integer} all_armor_temp   Parsed Temp armor
 * @param {String} equipped   Armor location
 * @return {Object}      Values of the location HP and location HP max.
 */
function calcLocationAP(other_ap, armor_ap, all_armor_temp, equipped) {
    if (equipped === '1') {
        return parseInt(armor_ap) + parseInt(other_ap) + all_armor_temp;
    } else {
        return parseInt(other_ap) + all_armor_temp;
    }
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

function calcFatigueRecovery(fatigue, healing_rate) {
    let recovery = '-';
    let recoveryUnit = "hours";
    console.log(fatigueTable[fatigue][4]);
    if (fatigueTable[fatigue][4] !== '-') {
        recovery = parseFloat((fatigueTable[fatigue][4] / healing_rate).toFixed(2));
        console.log(recovery);

        if (recovery < 1) {
            recovery = Math.ceil(recovery * 60);
            recoveryUnit = "minutes-abrv4";
        }
    }

    console.log(recovery);
    console.log(recoveryUnit);
    return {fatigue_recovery: recovery, fatigue_recovery_unit: recoveryUnit};
}

function calcFatigue(fatigue, healing_rate) {
    return {
        fatigue_skills: fatigueTable[fatigue][0],
        action_points_fatigue: fatigueTable[fatigue][1],
        initiative_bonus_fatigue: fatigueTable[fatigue][2],
        movement_rate_fatigue: fatigueTable[fatigue][3],
        ...calcFatigueRecovery(fatigue, healing_rate)
    };
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

/* Attribute Triggers */
/* Hit Locations */
on('change:hit_locations', function(event) {
    setAttrs( hitLocationTable[event.newValue] );
});

/* Locational Hit Points */
['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].forEach(num => {
    on(`change:location${num}_hp_max_base_mod change:location${num}_hp_max_other`, function() {
        getAttrs(['hp_max_base', `location${num}_hp_max_base_mod`, `location${num}_hp_max_other`, 'all_hp_temp',
            `location${num}_hp`, `location${num}_hp_max`], function(v) {
            setAttrs( calcLocationHP(num, parseInt(v['hp_max_base']), v[`location${num}_hp_max_base_mod`], v[`location${num}_hp_max_other`],
                parseInt(v['all_hp_temp']), v[`location${num}_hp`], v[`location${num}_hp_max`]) );
        });
    });
});

/* All Hit Points */
on('change:hp_calc change:all_hp_temp change:simplified_combat_enabled', function() {
    getAttrs(['str', 'con', 'siz', 'pow'].concat(hitPointGetAttrs), function(v) {
        const hp_max_base = calcBaseHP(parseInt(v['con']), parseInt(v['siz']), parseInt(v['pow']), parseInt(v['str']),
            v['hp_calc'], v['simplified_combat_enabled']);
        const all_hp_temp = parseInt(v['all_hp_temp']);
        let baseAttrs = {};
        if (v['simplified_combat_enabled'] === '1') {
            baseAttrs = {hit_locations: "custom1", ...hitLocationTable['simplified']};
        }
        setAttrs({
            hp_max_base: hp_max_base, ...baseAttrs,
            ...calcLocationHP('1', hp_max_base, v['location1_hp_max_base_mod'], v['location1_hp_max_other'],
                all_hp_temp, v['location1_hp'], v['location1_hp_max']),
            ...calcLocationHP('2', hp_max_base, v['location2_hp_max_base_mod'], v['location2_hp_max_other'],
                all_hp_temp, v['location2_hp'], v['location2_hp_max']),
            ...calcLocationHP('3', hp_max_base, v['location3_hp_max_base_mod'], v['location3_hp_max_other'],
                all_hp_temp, v['location3_hp'], v['location3_hp_max']),
            ...calcLocationHP('4', hp_max_base, v['location4_hp_max_base_mod'], v['location4_hp_max_other'],
                all_hp_temp, v['location4_hp'], v['location4_hp_max']),
            ...calcLocationHP('5', hp_max_base, v['location5_hp_max_base_mod'], v['location5_hp_max_other'],
                all_hp_temp, v['location5_hp'], v['location5_hp_max']),
            ...calcLocationHP('6', hp_max_base, v['location6_hp_max_base_mod'], v['location6_hp_max_other'],
                all_hp_temp, v['location6_hp'], v['location6_hp_max']),
            ...calcLocationHP('7', hp_max_base, v['location7_hp_max_base_mod'], v['location7_hp_max_other'],
                all_hp_temp, v['location7_hp'], v['location7_hp_max']),
            ...calcLocationHP('8', hp_max_base, v['location8_hp_max_base_mod'], v['location8_hp_max_other'],
                all_hp_temp, v['location8_hp'], v['location8_hp_max']),
            ...calcLocationHP('9', hp_max_base, v['location9_hp_max_base_mod'], v['location9_hp_max_other'],
                all_hp_temp, v['location9_hp'], v['location9_hp_max']),
            ...calcLocationHP('10', hp_max_base, v['location10_hp_max_base_mod'], v['location10_hp_max_other'],
                all_hp_temp, v['location10_hp'], v['location10_hp_max']),
            ...calcLocationHP('11', hp_max_base, v['location11_hp_max_base_mod'], v['location11_hp_max_other'],
                all_hp_temp, v['location11_hp'], v['location11_hp_max']),
            ...calcLocationHP('12', hp_max_base, v['location12_hp_max_base_mod'], v['location12_hp_max_other'],
                all_hp_temp, v['location12_hp'], v['location12_hp_max'])
        });
    });
});

/* Locational Armor Points */
['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].forEach(num => {
    on(`change:location${num}_other_ap change:location${num}_armor_ap`, function() {
        getAttrs([`location${num}_other_ap`, `location${num}_armor_ap`, 'all_armor_temp', `location${num}_armor_equipped`], function(v) {
            setAttrs({[`location${num}_ap`]: calcLocationAP(v[`location${num}_other_ap`], v[`location${num}_armor_ap`], parseInt(v['all_armor_temp']), v[`location${num}_armor_equipped`]) });
        });
    });
});

/* All Armor Points */
on('change:all_armor_temp', function() {
    getAttrs(armorLocGetAttrs, function(v) {
        const all_armor_temp = parseInt(v['all_armor_temp']);
        setAttrs({
            location1_ap: calcLocationAP(v['location1_other_ap'], v['location1_armor_ap'], all_armor_temp, v['location1_armor_equipped']),
            location2_ap: calcLocationAP(v['location2_other_ap'], v['location2_armor_ap'], all_armor_temp, v['location2_armor_equipped']),
            location3_ap: calcLocationAP(v['location3_other_ap'], v['location3_armor_ap'], all_armor_temp, v['location3_armor_equipped']),
            location4_ap: calcLocationAP(v['location4_other_ap'], v['location4_armor_ap'], all_armor_temp, v['location4_armor_equipped']),
            location5_ap: calcLocationAP(v['location5_other_ap'], v['location5_armor_ap'], all_armor_temp, v['location5_armor_equipped']),
            location6_ap: calcLocationAP(v['location6_other_ap'], v['location6_armor_ap'], all_armor_temp, v['location6_armor_equipped']),
            location7_ap: calcLocationAP(v['location7_other_ap'], v['location7_armor_ap'], all_armor_temp, v['location7_armor_equipped']),
            location8_ap: calcLocationAP(v['location8_other_ap'], v['location8_armor_ap'], all_armor_temp, v['location8_armor_equipped']),
            location9_ap: calcLocationAP(v['location9_other_ap'], v['location9_armor_ap'], all_armor_temp, v['location9_armor_equipped']),
            location10_ap: calcLocationAP(v['location10_other_ap'], v['location10_armor_ap'], all_armor_temp, v['location10_armor_equipped']),
            location11_ap: calcLocationAP(v['location11_other_ap'], v['location11_armor_ap'], all_armor_temp, v['location11_armor_equipped']),
            location12_ap: calcLocationAP(v['location12_other_ap'], v['location12_armor_ap'], all_armor_temp, v['location12_armor_equipped'])
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
on("change:location12_armor_enc change:location11_armor_enc change:location10_armor_enc change:half_effective_armor_enc change:location9_armor_enc change:location_armor_enc change:location7_armor_enc change:location6_armor_enc change:location5_armor_enc change:location4_armor_enc change:location3_armor_enc change:location2_armor_enc change:location1_armor_enc change:half_effective_armor_enc", function() {
    getAttrs(armorEncGetAttrs, function(v) {
        const armorAttrs = calcArmorEncAndPenalty(v);
        v['effective_armor_enc'] = armorAttrs['effective_armor_enc'];
        v['armor_enc_carried'] = armorAttrs['armor_enc_carried'];
        setAttrs({
            ...armorAttrs,
            ...calcEnc(parseInt(v['str']), v)
        });
    });
});

/* Armor Equipped */
['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].forEach(num => {
    on(`change:location${num}_armor_equipped`, function() {
        getAttrs([`location${num}_other_ap`, `location${num}_armor_ap`, 'all_armor_temp'].concat(armorEncGetAttrs), function(v) {
            const armorAttrs = calcArmorEncAndPenalty(v);
            v['effective_armor_enc'] = armorAttrs['effective_armor_enc'];
            v['armor_enc_carried'] = armorAttrs['armor_enc_carried'];
            setAttrs({
                [`location${num}_ap`]: calcLocationAP(v[`location${num}_other_ap`], v[`location${num}_armor_ap`], parseInt(v['all_armor_temp']), v[`location${num}_armor_equipped`]),
                ...armorAttrs,
                ...calcEnc(parseInt(v['str']), v)
            });
        });
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
            const weaponAttrs = calcWeaponEnc(weaponIds, v);
            v['weapons_enc'] = weaponAttrs['weapons_enc'];
            v['weapons_enc_carried'] = weaponAttrs['weapons_enc_carried'];
            setAttrs({
                ...weaponAttrs,
                ...calcEnc(parseInt(v['str']), v)
            });
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

        getAttrs(['str'].concat(gearGetAttrs, encGetAttrs), function(v) {
            const gearAttrs = calcGenericRepeatingEnc(gearIds, 'equipment', v);
            v['equipment_enc'] = gearAttrs['equipment_enc'];
            v['equipment_enc_carried'] = gearAttrs['equipment_enc_carried'];
            setAttrs({
                ...gearAttrs,
                ...calcEnc(parseInt(v['str']), v)
            });
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

        getAttrs(['str'].concat(currencyGetAttrs, encGetAttrs), function(v) {
            const currencyAttrs = calcGenericRepeatingEnc(currencyIds, 'currency', v);
            v['currency_enc'] = currencyAttrs['currency_enc'];
            v['currency_enc_carried'] = currencyAttrs['currency_enc_carried'];
            setAttrs({
                ...currencyAttrs,
                ...calcEnc(parseInt(v['str']), v)
            });
        });
    });
});

/* ENC */
on("change:avg_species_siz change:pack_equipped change:encumbrance_temp", function() {
    getAttrs(['str'].concat(encGetAttrs), function(v) {
        setAttrs( calcEnc(parseInt(v['str']), v) );
    });
});

/* Fatigue */
on("change:fatigue", function() {
    getAttrs(['fatigue', 'healing_rate'], function(v) {
        setAttrs( calcFatigue(v['fatigue'], parseInt(v['healing_rate'])) );
    });
});



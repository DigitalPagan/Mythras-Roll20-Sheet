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
    'meleeweapon_enc', 'meleeweapon_enc_carried', 'rangedweapon_enc', 'rangedweapon_enc_carried', 'equipment_enc', 'equipment_enc_carried', 'currency_enc', 'currency_enc_carried'];

const charStdSkillIds = {
    str: ['athletics', 'brawn', 'boating', 'swim', 'unarmed'],
    dex: ['athletics', 'conceal', 'dance', 'drive', 'evade', 'first_aid', 'ride', 'stealth', 'unarmed'],
    siz: ['brawn'],
    con: ['boating', 'endurance', 'swim'],
    pow: ['conceal', 'drive', 'insight', 'perception', 'ride', 'sing', 'superstition', 'willpower'],
    int: ['customs', 'deceit', 'first_aid', 'home_parallel', 'insight', 'locale', 'native_tongue', 'perception', 'stealth', 'superstition'],
    cha: ['dance', 'deceit', 'influence', 'native_tongue', 'sing'],
    zero: ['status', 'strangeness', 'the_soot']
};
const allStdSkillIds = Array.from(
    new Set(
        charStdSkillIds['str'].concat(charStdSkillIds['dex'], charStdSkillIds['siz'], charStdSkillIds['con'],
            charStdSkillIds['pow'], charStdSkillIds['int'], charStdSkillIds['cha'], charStdSkillIds['zero'])
    )
);

const stdSkillChars = {
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
    'status': ['zero', 'zero'],
    'stealth': ['dex', 'int'],
    'strangeness': ['zero', 'zero'],
    'superstition': ['21-int', 'pow'],
    'swim': ['str', 'con'],
    'the_soot': ['zero', 'zero'],
    'unarmed': ['str', 'dex'],
    'willpower': ['pow', 'pow']
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
        location9_table_start: 9, location9_table_end: 11, location9_name: getTranslationByKey('long-tentacle_1'), location9_hp_max_base_mod: 0,
        location10_table_start: 12, location10_table_end: 14, location10_name: getTranslationByKey('long-tentacle_2'), location10_hp_max_base_mod: 0,
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
        location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 1, location11_display: 1, location12_display: 0
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



/* Character Tabs */
const charactertabs = ["all","core","abilities","equipment","background","notes","compact"];
charactertabs.forEach(button => {
    on(`clicked:character_tab_${button}`, function() {
        setAttrs({
            character_tab: button
        });
    });
});

/* Conflict Mode */
const conflictmodes = ["none","combat","spirit_combat","social_conflict"];
conflictmodes.forEach(button => {
    on(`clicked:conflict_mode_${button}`, function() {
        setAttrs({
            conflict_mode: button
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

    // Special values
    charObj["21-int"] = 21 - charObj["int"];
    charObj['zero'] = 0;

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
    let skillVals = {};
    let socialDamageVals = {};
    let spiritDamageVals = {};
    ids.forEach(id => {
        const skillValue = charObj[stdSkillChars[`${id}`][0]] + charObj[stdSkillChars[`${id}`][1]] + parseInt(v[`${id}_other`]);
        if (v['social_attack_id_value'] === id) {
            socialDamageVals = calcSocialDamage(v['social_damage_other'], v['social_damage_temp'], v['social_attack_id_value'], skillValue)
        }
        if (v['spirit_combat_skill_id'] === id) {
            spiritDamageVals = calcSpiritDamage(v['spirit_damage_other'], v['spirit_damage_temp'], v['spirit_damage_calc'], v['spirit_combat_skill_id'], skillValue)
        }
        skillVals[`${id}_total`] = skillValue;
    });
    return {
        ...skillVals,
        ...socialDamageVals,
        ...spiritDamageVals
    };
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
        case '@{cha}':
            char1Val = charObj['cha'];
            break;
        case '(21-@{int})':
            char1Val = 21 - charObj['int'];
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
        case '@{cha}':
            char2Val = charObj['cha'];
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
    if (char2 === '@{str}' || char2 === '@{dex}') {
        char2bool = true;
    }

    if (char1bool || char2bool) {
        return 1;
    } else {
        return 0;
    }
}

function calcProSkills(type, ids, charObj, v) {
    let skillVals = {};
    let socialDamageVals = {};
    let spiritDamageVals = {};
    ids.forEach(id => {
        const skillId = `repeating_${type}_${id}`;
        const skillValue = calcProSkillTotal(charObj, v[`${skillId}_char1`], v[`${skillId}_char2`], v[`${skillId}_other`]);

        if (v['social_attack_id_value'] === id) {
            socialDamageVals = calcSocialDamage(v['social_damage_other'], v['social_damage_temp'], v['social_attack_id_value'], skillValue)
        }

        if (v['spirit_combat_skill_id'] === id) {
            spiritDamageVals = calcSpiritDamage(v['spirit_damage_other'], v['spirit_damage_temp'], v['spirit_damage_calc'], v['spirit_combat_skill_id'], skillValue)
        }

        skillVals[`${skillId}_total`] = skillValue;
        skillVals[`${skillId}_encumbered`] = calcProSkillEncumbered(v[`${skillId}_char1`], v[`${skillId}_char2`]);
    });
    return {
        ...skillVals,
        ...socialDamageVals
    };
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

/*function calcWeaponEnc(weaponIds, v) {
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
}*/

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
    const wornEnc = parseFloat(v['effective_armor_enc']) + parseFloat(v['meleeweapon_enc']) +
        parseFloat(v['rangedweapon_enc']) + parseFloat(v['equipment_enc']) + parseFloat(v['currency_enc']);
    const packEnc = (parseFloat(v['armor_enc_carried']) + parseFloat(v['meleeweapon_enc_carried']) +
        parseFloat(v['rangedweapon_enc_carried']) + parseFloat(v['equipment_enc_carried']) +
        parseFloat(v['currency_enc_carried'])) * parseInt(v['pack_equipped']);
    const enc = parseFloat(((wornEnc + packEnc + parseFloat(v['encumbrance_temp']) ) * (parseInt(v['avg_species_siz']) / 13)).toFixed(2));
    const burdened = str * 2;
    const overloaded = str * 3;
    const enc_max = str * 4;

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
    let recoveryUnit = "hours-l";
    if (fatigueTable[fatigue][4] !== '-') {
        recovery = parseFloat((fatigueTable[fatigue][4] / healing_rate).toFixed(2));

        if (recovery < 1) {
            recovery = Math.ceil(recovery * 60);
            recoveryUnit = "minutes-abrv-l";
        }
    }

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

function calcActionPoints(dex, int, action_points_other, action_points_temp, action_points_calc, fatigue, action_points, action_points_max) {
    let base_value;
    if (action_points_calc === "set_2") {
        base_value = 2;
    } else if (action_points_calc === "set_3") {
        base_value = 3;
    } else {
        base_value = Math.ceil((int + dex) / 12);
    }

    let new_action_points_max = base_value + parseInt(action_points_other) + parseInt(action_points_temp) + parseInt(fatigueTable[fatigue][1]);
    if (new_action_points_max < 0) {
        new_action_points_max = 0;
    }
    const diff_action_points_max = new_action_points_max - parseInt(action_points_max);

    return {
        action_points_base: base_value,
        action_points_max: new_action_points_max,
        action_points: parseInt(action_points) + diff_action_points_max
    };
}

function findDamageStep(value) {
    return Math.floor(value % 5);
}

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

function calcDamageMod(str, siz, con, pow, damage_mod_calc, damage_mod_other, damage_mod_temp) {
    let damage_mod_table_value;
    if (damage_mod_calc === '1') {
        damage_mod_table_value = str + siz + pow;
    } else if (damage_mod_calc === '2') {
        damage_mod_table_value = str + siz + con;
    } else {
        damage_mod_table_value = str + siz;
    }

    const base_damage_mod_step = Math.ceil(damage_mod_table_value / 5) - 5;
    const base_damage_mod_value = damageTable(base_damage_mod_step);

    return {
        damage_mod_base: base_damage_mod_value,
        damage_mod: damageTable(base_damage_mod_step + parseInt(damage_mod_other) + parseInt(damage_mod_temp))
    };
}

function calcExpMod(cha, int, experience_mod_calc, experience_mod_other, experience_mod_temp) {
    let base_value;
    if(experience_mod_calc === '1') {
        base_value = Math.ceil(int/6)-2;
    } else {
        base_value = Math.ceil(cha/6)-2;
    }

    return {
        experience_mod_base: base_value,
        experience_mod: base_value + parseInt(experience_mod_other) + parseInt(experience_mod_temp)
    };
}

function calcHealingRate(con, pow, healing_rate_calc, healing_rate_other, healing_rate_temp, healing_rate_double) {
    let base_multiplier;
    let base_value;
    if (healing_rate_double === '1') {
        base_multiplier = 2;
    } else {
        base_multiplier = 1;
    }

    if (healing_rate_calc === '1') {
        base_value = Math.ceil(Math.ceil(con+(pow/2))/6) * base_multiplier;
    } else {
        base_value = Math.ceil(con/6) * base_multiplier;
    }

    return {
        healing_rate_base: base_value,
        healing_rate: base_value + parseInt(healing_rate_other) + parseInt(healing_rate_temp)
    };
}

function calcInitiativeBonus(int, dex, initiative_bonus_other, initiative_bonus_temp, armor_penalty, initiative_bonus_fatigue, athletics_total, initiative_add_one_tenth_athletics) {
    let athletics_bonus = 0;
    if (initiative_add_one_tenth_athletics === '1') {
        athletics_bonus = Math.ceil(athletics_total/10);
    }
    const base_value = Math.ceil((int + dex) / 2);

    return {
        initiative_bonus_base: base_value,
        initiative_bonus: base_value + parseInt(initiative_bonus_other) + parseInt(initiative_bonus_temp) +
            armor_penalty + athletics_bonus + initiative_bonus_fatigue
    };
}

function calcLuckPoints(pow, cha, luck_points_calc, luck_points_other, luck_points_temp, luck_points_rank, rank, luck_points, luck_points_max) {
    let base_value;
    if (luck_points_calc === '1') {
        base_value = Math.ceil(Math.ceil(cha+(pow/2))/6) + (parseInt(luck_points_rank) * parseInt(rank));
    } else {
        base_value = Math.ceil(pow/6) + (parseInt(luck_points_rank) * parseInt(rank));
    }

    const new_luck_points_max = base_value + parseInt(luck_points_temp) + parseInt(luck_points_other);
    const diff_luck_points_max = new_luck_points_max - parseInt(luck_points_max);

    return {
        luck_points_base: base_value,
        luck_points_max: new_luck_points_max,
        luck_points: parseInt(luck_points) + diff_luck_points_max
    };
}

function calcMagicPoints(pow, magic_points_other, magic_points_temp, magic_points, magic_points_max) {
    const new_magic_points_max = pow + parseInt(magic_points_other) + parseInt(magic_points_temp);
    const diff_magic_points_max = new_magic_points_max - parseInt(magic_points_max);

    return {
        magic_points_base: pow,
        magic_points_max: new_magic_points_max,
        magic_points: parseInt(magic_points) + diff_magic_points_max
    };
}

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

function calcMoveRate(movement_rate_species, movement_rate_other, movement_rate_temp, movement_rate_fatigue, movement_rate_enc) {
    const base_value = parseInt(movement_rate_species) + parseInt(movement_rate_other) + parseInt(movement_rate_temp);
    const moveAfterFatigue = applyMovementMod(base_value, movement_rate_fatigue);
    const moveAfterEnc = applyMovementMod(moveAfterFatigue, movement_rate_enc);

    if (moveAfterEnc < 0) {
        return {movement_rate: 0};
    }

    return {movement_rate: applyMovementMod(moveAfterFatigue, movement_rate_enc)};
}

function calcSpiritAP(pow, int, spirit_ap_other, spirit_ap_temp, action_points_calc, spirit_ap, spirit_ap_max) {
    let base_value;
    if (action_points_calc === "set_2") {
        base_value = 2;
    } else if (action_points_calc === "set_3") {
        base_value = 3;
    } else {
        base_value = Math.ceil((int + pow) / 12);
    }

    let new_spirit_ap_max = base_value + parseInt(spirit_ap_other) + parseInt(spirit_ap_temp);
    if (new_spirit_ap_max < 0) {
        new_spirit_ap_max = 0;
    }
    const diff_spirit_ap_max = new_spirit_ap_max - parseInt(spirit_ap_max);

    return {
        spirit_ap_base: base_value,
        spirit_ap_max: new_spirit_ap_max,
        spirit_ap: parseInt(spirit_ap) + diff_spirit_ap_max
    };
}

function calcSpiritDamage(spirit_damage_other, spirit_damage_temp, spirit_damage_calc, spirit_combat_skill_id, spirit_combat_skill_total) {
    if (spirit_combat_skill_id === '') {
        return {
            spirit_damage_base: 0,
            spirit_damage: 0
        }
    } else {
        const modifier = parseFloat(spirit_damage_calc);
        if (typeof spirit_combat_skill_total === 'undefined') {
            // I see no way around using the 2nd getAttrs and setAttrs in this case
            getAttrs([`${spirit_combat_skill_id}_total`], function(v){
                const skill_total = parseInt(v[`${spirit_combat_skill_id}_total`]);
                const base_steps = Math.ceil((skill_total * modifier)/20);
                setAttrs({
                    spirit_damage_base: damageTable(base_steps),
                    spirit_damage: damageTable(base_steps + parseInt(spirit_damage_other) + parseInt(spirit_damage_temp))
                });
            });
            return {};
        } else {
            const skill_total = parseInt(spirit_combat_skill_total)
            const base_steps = Math.ceil((skill_total * modifier)/20);
            return {
                spirit_damage_base: damageTable(base_steps),
                spirit_damage: damageTable(base_steps + parseInt(spirit_damage_other) + parseInt(spirit_damage_temp))
            }
        }
    }
}

function calcSocialDamage(social_damage_other, social_damage_temp, social_attack_id_value, social_attack_total) {
    let base_steps;
    if (social_attack_id_value === '') {
        return {
            social_damage_base: 0,
            social_damage: 0
        }
    } else {
        if (typeof social_attack_total === 'undefined') {
            // I see no way around using the 2nd getAttrs and setAttrs in this case
            getAttrs([`${social_attack_id_value}_total`], function(v){
                base_steps = Math.ceil(parseInt(v[`${social_attack_id_value}_total`])/20);
                setAttrs({
                    social_damage_base: damageTable(base_steps),
                    social_damage: damageTable(base_steps + parseInt(social_damage_other) + parseInt(social_damage_temp))
                });
            });
            return {};
        } else {
            base_steps = Math.ceil(parseInt(social_attack_total)/20);
            return {
                social_damage_base: damageTable(base_steps),
                social_damage: damageTable(base_steps + parseInt(social_damage_other) + parseInt(social_damage_temp))
            }
        }
    }
}

function calcSpiritInitiative(int, cha, spirit_ib_other, spirit_ib_temp) {
    const base_value = Math.ceil((int + cha) / 2);

    return {
        spirit_ib_base: base_value,
        spirit_ib: base_value + parseInt(spirit_ib_other) + parseInt(spirit_ib_temp)
    };
}

function calcSocialInitiative(int, cha, social_initiative_other, social_initiative_temp) {
    const base_value = Math.ceil((int + cha) / 2);

    return {
        social_initiative_base: base_value,
        social_initiative: base_value + parseInt(social_initiative_other) + parseInt(social_initiative_temp)
    };
}

function calcConfidence(willpower, confidence_other, confidence_temp) {
    const base_value = Math.floor(willpower/20);

    return {
        confidence_base: base_value,
        confidence: base_value + parseInt(confidence_other) + parseInt(confidence_temp)
    };
}

function calcComposure(pow, composure_other, composure_temp, current, currentMax) {
    const base_value = Math.ceil(pow/3);
    const newMax = base_value + parseInt(composure_other) + parseInt(composure_temp);
    const diff = parseInt(current) - parseInt(currentMax);

    return {
        composure_base: base_value,
        composure: newMax + diff,
        composure_max: newMax
    };
}

function calcIntegrity(cha, integrity_other, integrity_temp, current, currentMax) {
    const base_value = Math.ceil(cha/3);
    const newMax = base_value + parseInt(integrity_other) + parseInt(integrity_temp);
    const diff = parseInt(current) - parseInt(currentMax);

    return {
        integrity_base: base_value,
        integrity: newMax + diff,
        integrity_max: base_value + parseInt(integrity_other) + parseInt(integrity_temp)
    };
}

function calcResolve(int, resolve_other, resolve_temp, current, currentMax) {
    const base_value = Math.ceil(int/3);
    const newMax = base_value + parseInt(resolve_other) + parseInt(resolve_temp);
    const diff = parseInt(current) - parseInt(currentMax);

    return {
        resolve_base: base_value,
        resolve: newMax + diff,
        resolve_max: base_value + parseInt(resolve_other) + parseInt(resolve_temp)
    };
}

function calcAugmentation(sourceAttr, combatStyleIds, proSkillIds, passionIds) {
    let newVals = {};
    passionIds.forEach(id => {
        newVals[`repeating_passion_${id}_augment`] = 0;
    });
    proSkillIds.forEach(id => {
        newVals[`repeating_professionalskill_${id}_augment`] = 0;
    });
    combatStyleIds.forEach(id => {
        newVals[`repeating_combatstyle_${id}_augment`] = 0;
    });
    if (sourceAttr.startsWith('repeating_')) {
        targetVal = sourceAttr.replace('_augment', '_total');
        newVals['skill_augment'] = '@{skill_augment_value}';
        newVals[sourceAttr] = '1';
        newVals['skill_augment_value'] = `ceil(@{${targetVal}}/5)`;
    }

    return newVals;
}

function calcSocialAttack(sourceAttr, combatStyleIds, proSkillIds, passionIds, social_attack_id, social_damage_other, social_damage_temp) {
    let newVals = {};
    passionIds.forEach(id => {
        newVals[`repeating_passion_${id}_social_attack`] = 0;
    });
    proSkillIds.forEach(id => {
        newVals[`repeating_professionalskill_${id}_social_attack`] = 0;
    });
    combatStyleIds.forEach(id => {
        newVals[`repeating_combatstyle_${id}_social_attack`] = 0;
    });
    let socialDamageVals;
    if (sourceAttr.startsWith('repeating_')) {
        targetVal = sourceAttr.replace('_social_attack', '');
        newVals['social_attack_id'] = '@{social_attack_id_value}';
        newVals[sourceAttr] = '1';
        newVals['social_attack_id_value'] = `${targetVal}`;
        newVals['social_attack_name_value'] = `@{${targetVal}_name}`;
        newVals['social_attack_total_value'] = `@{${targetVal}_total}`;
        newVals['social_attack_encumbered_value'] = `@{${targetVal}_encumbered}`;
        newVals['social_attack_notes_value'] = `@{${targetVal}_notes}`;
        socialDamageVals = calcSocialDamage(social_damage_other, social_damage_temp, `${targetVal}`);
    } else {
        newVals['social_attack_id_value'] = `${social_attack_id}`;
        newVals['social_attack_name_value'] = getTranslationByKey(`${social_attack_id}`);
        newVals['social_attack_total_value'] = `@{${social_attack_id}_total}`;
        newVals['social_attack_encumbered_value'] = `@{${social_attack_id}_encumbered}`;
        newVals['social_attack_notes_value'] = `@{${social_attack_id}_notes}`;
        socialDamageVals = calcSocialDamage(social_damage_other, social_damage_temp, social_attack_id);
    }

    return {
        ...newVals,
        ...socialDamageVals
    };
}

function calcSocialDefense(sourceAttr, combatStyleIds, proSkillIds, passionIds, social_defense_id) {
    let newVals = {};
    passionIds.forEach(id => {
        newVals[`repeating_passion_${id}_social_defense`] = 0;
    });
    proSkillIds.forEach(id => {
        newVals[`repeating_professionalskill_${id}_social_defense`] = 0;
    });
    combatStyleIds.forEach(id => {
        newVals[`repeating_combatstyle_${id}_social_defense`] = 0;
    });
    if (sourceAttr.startsWith('repeating_')) {
        targetVal = sourceAttr.replace('_social_defense', '');
        newVals['social_defense_id'] = '@{social_defense_id_value}';
        newVals[sourceAttr] = '1';
        newVals['social_defense_id_value'] = `${targetVal}`;
        newVals['social_defense_name_value'] = `@{${targetVal}_name}`;
        newVals['social_defense_total_value'] = `@{${targetVal}_total}`;
        newVals['social_defense_encumbered_value'] = `@{${targetVal}_encumbered}`;
        newVals['social_defense_notes_value'] = `@{${targetVal}_notes}`;
    } else {
        newVals['social_defense_id_value'] = `${social_defense_id}`;
        newVals['social_defense_name_value'] = getTranslationByKey(`${social_defense_id}`);
        newVals['social_defense_total_value'] = `@{${social_defense_id}_total}`;
        newVals['social_defense_encumbered_value'] = `@{${social_defense_id}_encumbered}`;
        newVals['social_defense_notes_value'] = `@{${social_defense_id}_notes}`;
    }

    return newVals;
}

/* Characteristic Triggers */
/* STR */
on('change:str_base change:str_other change:str_temp', function() {
    const stdSkillGetAttrs = getStdSkillGetAttrs(charStdSkillIds['str']);

    getSectionIDs("repeating_professionalskill", function(proSkillIds) {
        getSectionIDs("repeating_combatstyle", function(combatStyleIds) {
            let proSkillGetAttrs = [];
            proSkillIds.forEach(id => {
                proSkillGetAttrs.push(`repeating_professionalskill_${id}_char1`, `repeating_professionalskill_${id}_char2`, `repeating_professionalskill_${id}_other`)
            });
            let combatStyleGetAttrs = [];
            combatStyleIds.forEach(id => {
                combatStyleGetAttrs.push(`repeating_combatstyle_${id}_char1`, `repeating_combatstyle_${id}_char2`, `repeating_combatstyle_${id}_other`)
            });

            getAttrs(allCharGetAttrs.concat(stdSkillGetAttrs, proSkillGetAttrs, combatStyleGetAttrs, encGetAttrs, hitPointGetAttrs,
                ['damage_mod_calc', 'damage_mod_other', 'damage_mod_temp', 'fatigue'],
                ['initiative_bonus_other', 'initiative_bonus_temp', 'armor_penalty', 'athletics_total',
                    'initiative_add_one_tenth_athletics'],
                ['movement_rate_species', 'movement_rate_other', 'movement_rate_temp', 'movement_rate_fatigue'],
                ['spirit_damage_other', 'spirit_damage_temp', 'spirit_damage_calc', 'spirit_combat_skill_id'],
                ['social_damage_temp', 'social_damage_other', 'social_attack_id_value']), function(v) {
                const charObj = buildCharObj(v);
                const standardSkillVals = calcStdSkills(charStdSkillIds['str'], charObj, v);
                const hp_max_base = calcBaseHP(charObj['con'], charObj['siz'], charObj['pow'], charObj['str'],
                    v['hp_calc'], v['simplified_combat_enabled']);
                const all_hp_temp = parseInt(v['all_hp_temp']);
                const initiative_bonus_fatigue = parseInt(fatigueTable[v['fatigue']][2]);
                const newEncVals = calcEnc(charObj['str'], v);

                setAttrs({
                    str: charObj['str'],
                    ...standardSkillVals,
                    ...calcProSkills("professionalskill", proSkillIds, charObj, v),
                    ...calcProSkills("combatstyle", combatStyleIds, charObj, v),
                    ...newEncVals,
                    ...calcInitiativeBonus(charObj['int'], charObj['dex'], v['initiative_bonus_other'],
                        v['initiative_bonus_temp'], parseInt(v['armor_penalty']), initiative_bonus_fatigue, standardSkillVals['athletics_total'],
                        v['initiative_add_one_tenth_athletics']),
                    ...calcDamageMod(charObj['str'], charObj['siz'], charObj['con'], charObj['pow'], v['damage_mod_calc'],
                        v['damage_mod_other'], v['damage_mod_temp']),
                    hp_max_base: hp_max_base,
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
    });
});

/* CON */
on('change:con_base change:con_other change:con_temp', function() {
    const stdSkillGetAttrs = getStdSkillGetAttrs(charStdSkillIds['con']);

    getSectionIDs("repeating_professionalskill", function(proSkillIds) {
        getSectionIDs("repeating_combatstyle", function(combatStyleIds) {
            let proSkillGetAttrs = [];
            proSkillIds.forEach(id => {
                proSkillGetAttrs.push(`repeating_professionalskill_${id}_char1`, `repeating_professionalskill_${id}_char2`, `repeating_professionalskill_${id}_other`)
            });
            let combatStyleGetAttrs = [];
            combatStyleIds.forEach(id => {
                combatStyleGetAttrs.push(`repeating_combatstyle_${id}_char1`, `repeating_combatstyle_${id}_char2`, `repeating_combatstyle_${id}_other`)
            });

            getAttrs(allCharGetAttrs.concat(stdSkillGetAttrs, proSkillGetAttrs, combatStyleGetAttrs, hitPointGetAttrs,
                ['damage_mod_calc', 'damage_mod_other', 'damage_mod_temp', 'fatigue'],
                ['healing_rate_calc', 'healing_rate_other', 'healing_rate_temp', 'healing_rate_double'],
                ['spirit_damage_other', 'spirit_damage_temp', 'spirit_damage_calc', 'spirit_combat_skill_id'],
                ['social_damage_temp', 'social_damage_other', 'social_attack_id_value']), function(v) {
                const charObj = buildCharObj(v);
                const hp_max_base = calcBaseHP(charObj['con'], charObj['siz'], charObj['pow'], charObj['str'],
                    v['hp_calc'], v['simplified_combat_enabled']);
                const all_hp_temp = parseInt(v['all_hp_temp']);
                const healingRateVals = calcHealingRate(charObj['con'], charObj['pow'], v['healing_rate_calc'], v['healing_rate_other'],
                    v['healing_rate_temp'], v['healing_rate_double']);

                setAttrs({
                    con: charObj['con'],
                    ...calcStdSkills(charStdSkillIds['con'], charObj, v),
                    ...calcProSkills("professionalskill", proSkillIds, charObj, v),
                    ...calcProSkills("combatstyle", combatStyleIds, charObj, v),
                    ...calcDamageMod(charObj['str'], charObj['siz'], charObj['con'], charObj['pow'], v['damage_mod_calc'],
                        v['damage_mod_other'], v['damage_mod_temp']),
                    ...healingRateVals,
                    ...calcFatigueRecovery(v['fatigue'], healingRateVals['healing_rate']),
                    hp_max_base: hp_max_base,
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
    });
});

/* DEX */
on('change:dex_base change:dex_other change:dex_temp', function() {
    const stdSkillGetAttrs = getStdSkillGetAttrs(charStdSkillIds['dex']);

    getSectionIDs("repeating_professionalskill", function(proSkillIds) {
        getSectionIDs("repeating_combatstyle", function(combatStyleIds) {
            let proSkillGetAttrs = [];
            proSkillIds.forEach(id => {
                proSkillGetAttrs.push(`repeating_professionalskill_${id}_char1`, `repeating_professionalskill_${id}_char2`, `repeating_professionalskill_${id}_other`)
            });
            let combatStyleGetAttrs = [];
            combatStyleIds.forEach(id => {
                combatStyleGetAttrs.push(`repeating_combatstyle_${id}_char1`, `repeating_combatstyle_${id}_char2`, `repeating_combatstyle_${id}_other`)
            });

            getAttrs(allCharGetAttrs.concat(stdSkillGetAttrs, proSkillGetAttrs, combatStyleGetAttrs,
                ['action_points_other', 'action_points_temp', 'action_points_calc', 'action_points', 'action_points_max', 'fatigue'],
                ['initiative_bonus_other', 'initiative_bonus_temp', 'armor_penalty', 'athletics_total', 'initiative_add_one_tenth_athletics'],
                ['spirit_damage_other', 'spirit_damage_temp', 'spirit_damage_calc', 'spirit_combat_skill_id'],
                ['social_damage_temp', 'social_damage_other', 'social_attack_id_value']), function(v) {
                const charObj = buildCharObj(v);
                const standardSkillVals = calcStdSkills(charStdSkillIds['dex'], charObj, v);
                const initiative_bonus_fatigue = parseInt(fatigueTable[v['fatigue']][2]);

                setAttrs({
                    dex: charObj['dex'],
                    ...standardSkillVals,
                    ...calcProSkills("professionalskill", proSkillIds, charObj, v),
                    ...calcProSkills("combatstyle", combatStyleIds, charObj, v),
                    ...calcActionPoints(charObj['dex'], charObj['int'], v['action_points_other'], v['action_points_temp'],
                        v['action_points_calc'], v['fatigue'], v['action_points'], v['action_points_max']),
                    ...calcInitiativeBonus(charObj['int'], charObj['dex'], v['initiative_bonus_other'],
                        v['initiative_bonus_temp'], parseInt(v['armor_penalty']), initiative_bonus_fatigue, standardSkillVals['athletics_total'],
                        v['initiative_add_one_tenth_athletics'])
                });
            });
        });
    });
});

/* SIZ */
on('change:siz_base change:siz_other change:siz_temp', function() {
    const stdSkillGetAttrs = getStdSkillGetAttrs(charStdSkillIds['siz']);

    getSectionIDs("repeating_professionalskill", function(proSkillIds) {
        getSectionIDs("repeating_combatstyle", function(combatStyleIds) {
            let proSkillGetAttrs = [];
            proSkillIds.forEach(id => {
                proSkillGetAttrs.push(`repeating_professionalskill_${id}_char1`, `repeating_professionalskill_${id}_char2`, `repeating_professionalskill_${id}_other`)
            });
            let combatStyleGetAttrs = [];
            combatStyleIds.forEach(id => {
                combatStyleGetAttrs.push(`repeating_combatstyle_${id}_char1`, `repeating_combatstyle_${id}_char2`, `repeating_combatstyle_${id}_other`)
            });

            getAttrs(allCharGetAttrs.concat(stdSkillGetAttrs, proSkillGetAttrs, combatStyleGetAttrs, hitPointGetAttrs,
                ['damage_mod_calc', 'damage_mod_other', 'damage_mod_temp'],
                ['spirit_damage_other', 'spirit_damage_temp', 'spirit_damage_calc', 'spirit_combat_skill_id'],
                ['social_damage_temp', 'social_damage_other', 'social_attack_id_value']), function(v) {
                const charObj = buildCharObj(v);
                const hp_max_base = calcBaseHP(charObj['con'], charObj['siz'], charObj['pow'], charObj['str'],
                    v['hp_calc'], v['simplified_combat_enabled']);
                const all_hp_temp = parseInt(v['all_hp_temp']);

                setAttrs({
                    siz: charObj['siz'],
                    ...calcStdSkills(charStdSkillIds['siz'], charObj, v),
                    ...calcProSkills("professionalskill", proSkillIds, charObj, v),
                    ...calcProSkills("combatstyle", combatStyleIds, charObj, v),
                    ...calcDamageMod(charObj['str'], charObj['siz'], charObj['con'], charObj['pow'], v['damage_mod_calc'],
                        v['damage_mod_other'], v['damage_mod_temp']),
                    hp_max_base: hp_max_base,
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
    });
});

/* INT */
on('change:int_base change:int_other change:int_temp', function() {
    const stdSkillGetAttrs = getStdSkillGetAttrs(charStdSkillIds['int']);

    getSectionIDs("repeating_professionalskill", function(proSkillIds) {
        getSectionIDs("repeating_combatstyle", function(combatStyleIds) {
            let proSkillGetAttrs = [];
            proSkillIds.forEach(id => {
                proSkillGetAttrs.push(`repeating_professionalskill_${id}_char1`, `repeating_professionalskill_${id}_char2`, `repeating_professionalskill_${id}_other`)
            });
            let combatStyleGetAttrs = [];
            combatStyleIds.forEach(id => {
                combatStyleGetAttrs.push(`repeating_combatstyle_${id}_char1`, `repeating_combatstyle_${id}_char2`, `repeating_combatstyle_${id}_other`)
            });

            getAttrs(allCharGetAttrs.concat(stdSkillGetAttrs, proSkillGetAttrs, combatStyleGetAttrs,
                ['action_points_other', 'action_points_temp', 'action_points_calc', 'fatigue', 'action_points', 'action_points_max'],
                ['experience_mod_calc', 'experience_mod_other', 'experience_mod_temp'],
                ['initiative_bonus_other', 'initiative_bonus_temp', 'armor_penalty', 'athletics_total', 'initiative_add_one_tenth_athletics'],
                ['spirit_ap_other', 'spirit_ap_temp', 'spirit_ap', 'spirit_ap_max'], ['spirit_ib_other', 'spirit_ib_temp'],
                ['social_initiative_other', 'social_initiative_temp'], ['resolve_other', 'resolve_temp', 'resolve', 'resolve_max'],
                ['spirit_damage_other', 'spirit_damage_temp', 'spirit_damage_calc', 'spirit_combat_skill_id'],
                ['social_damage_temp', 'social_damage_other', 'social_attack_id_value']), function(v) {
                const charObj = buildCharObj(v);
                const initiative_bonus_fatigue = parseInt(fatigueTable[v['fatigue']][2]);

                setAttrs({
                    int: charObj['int'],
                    ...calcStdSkills(charStdSkillIds['int'], charObj, v),
                    ...calcProSkills("professionalskill", proSkillIds, charObj, v),
                    ...calcProSkills("combatstyle", combatStyleIds, charObj, v),
                    ...calcActionPoints(charObj['dex'], charObj['int'], v['action_points_other'], v['action_points_temp'],
                        v['action_points_calc'], v['fatigue'], v['action_points'], v['action_points_max']),
                    ...calcExpMod(charObj['cha'], charObj['int'], v['experience_mod_calc'], v['experience_mod_other'],
                        v['experience_mod_temp']),
                    ...calcInitiativeBonus(charObj['int'], charObj['dex'], v['initiative_bonus_other'],
                        v['initiative_bonus_temp'], parseInt(v['armor_penalty']), initiative_bonus_fatigue, parseInt(v['athletics_total']),
                        v['initiative_add_one_tenth_athletics']),
                    ...calcSpiritAP(charObj['pow'], charObj['int'], v['spirit_ap_other'], v['spirit_ap_temp'],
                        v['action_points_calc'], v['spirit_ap'], v['spirit_ap_max']),
                    ...calcSpiritInitiative(charObj['int'], charObj['cha'], v['spirit_ib_other'], v['spirit_ib_temp']),
                    ...calcSocialInitiative(charObj['int'], charObj['cha'], v['social_initiative_other'], v['social_initiative_temp']),
                    ...calcResolve(charObj['int'], v['resolve_other'], v['resolve_temp'], v['resolve'], v['resolve_max'])
                });
            });
        });
    });
});

/* POW */
on('change:pow_base change:pow_other change:pow_temp', function() {
    const stdSkillGetAttrs = getStdSkillGetAttrs(charStdSkillIds['pow']);

    getSectionIDs("repeating_professionalskill", function(proSkillIds) {
        getSectionIDs("repeating_combatstyle", function(combatStyleIds) {
            let proSkillGetAttrs = [];
            proSkillIds.forEach(id => {
                proSkillGetAttrs.push(`repeating_professionalskill_${id}_char1`, `repeating_professionalskill_${id}_char2`, `repeating_professionalskill_${id}_other`)
            });
            let combatStyleGetAttrs = [];
            combatStyleIds.forEach(id => {
                combatStyleGetAttrs.push(`repeating_combatstyle_${id}_char1`, `repeating_combatstyle_${id}_char2`, `repeating_combatstyle_${id}_other`)
            });

            getAttrs(allCharGetAttrs.concat(stdSkillGetAttrs, proSkillGetAttrs, combatStyleGetAttrs, hitPointGetAttrs,
                ['damage_mod_calc', 'damage_mod_other', 'damage_mod_temp', 'fatigue'],
                ['healing_rate_calc', 'healing_rate_other', 'healing_rate_temp', 'healing_rate_double'],
                ['luck_points_other', 'luck_points_temp', 'luck_points_calc', 'luck_points_rank', 'rank', 'luck_points',
                    'luck_points_max'],
                ['magic_points_other', 'magic_points_temp', 'magic_points', 'magic_points_max'],
                ['spirit_ap_other', 'spirit_ap_temp', 'spirit_ap', 'spirit_ap_max', 'action_points_calc'],
                ['spirit_damage_other', 'spirit_damage_temp', 'spirit_damage_calc', 'spirit_combat_skill_id'],
                ['social_initiative_other', 'social_initiative_temp'], ['confidence_other', 'confidence_temp'],
                ['composure_other', 'composure_temp', 'composure', 'composure_max'],
                ['social_damage_temp', 'social_damage_other', 'social_attack_id_value']), function(v) {
                const charObj = buildCharObj(v);
                const hp_max_base = calcBaseHP(charObj['con'], charObj['siz'], charObj['pow'], charObj['str'],
                    v['hp_calc'], v['simplified_combat_enabled']);
                const all_hp_temp = parseInt(v['all_hp_temp']);
                const healingRateVals = calcHealingRate(charObj['con'], charObj['pow'], v['healing_rate_calc'], v['healing_rate_other'],
                    v['healing_rate_temp'], v['healing_rate_double']);
                const standardSkillVals = calcStdSkills(charStdSkillIds['pow'], charObj, v);

                setAttrs({
                    pow: charObj['pow'],
                    ...standardSkillVals,
                    ...calcProSkills("professionalskill", proSkillIds, charObj, v),
                    ...calcProSkills("combatstyle", combatStyleIds, charObj, v),
                    ...calcDamageMod(charObj['str'], charObj['siz'], charObj['con'], charObj['pow'], v['damage_mod_calc'],
                        v['damage_mod_other'], v['damage_mod_temp']),
                    ...healingRateVals,
                    ...calcFatigueRecovery(v['fatigue'], healingRateVals['healing_rate']),
                    ...calcLuckPoints(charObj['pow'], charObj['cha'], v['luck_points_calc'], v['luck_points_other'],
                        v['luck_points_temp'], v['luck_points_rank'], v['rank'], v['luck_points'], v['luck_points_max']),
                    ...calcSpiritAP(charObj['pow'], charObj['int'], v['spirit_ap_other'], v['spirit_ap_temp'],
                        v['action_points_calc'], v['spirit_ap'], v['spirit_ap_max']),
                    ...calcSocialInitiative(charObj['int'], charObj['cha'], v['social_initiative_other'], v['social_initiative_temp']),
                    hp_max_base: hp_max_base,
                    ...calcMagicPoints(charObj['pow'], v['magic_points_other'], v['magic_points_temp'], v['magic_points'], v['magic_points_max']),
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
                        all_hp_temp, v['location12_hp'], v['location12_hp_max']),
                    ...calcConfidence(standardSkillVals['willpower_total'], v['confidence_other'], v['confidence_temp']),
                    ...calcComposure(charObj['pow'], v['composure_other'], v['composure_temp'], v['composure'], v['composure_max'])
                });
            });
        });
    });
});

/* CHA */
on('change:cha_base change:cha_other change:cha_temp', function() {
    const stdSkillGetAttrs = getStdSkillGetAttrs(charStdSkillIds['cha']);

    getSectionIDs("repeating_professionalskill", function(proSkillIds) {
        getSectionIDs("repeating_combatstyle", function(combatStyleIds) {
            let proSkillGetAttrs = [];
            proSkillIds.forEach(id => {
                proSkillGetAttrs.push(`repeating_professionalskill_${id}_char1`, `repeating_professionalskill_${id}_char2`, `repeating_professionalskill_${id}_other`)
            });
            let combatStyleGetAttrs = [];
            combatStyleIds.forEach(id => {
                combatStyleGetAttrs.push(`repeating_combatstyle_${id}_char1`, `repeating_combatstyle_${id}_char2`, `repeating_combatstyle_${id}_other`)
            });

            getAttrs(allCharGetAttrs.concat(stdSkillGetAttrs, proSkillGetAttrs, combatStyleGetAttrs,
                ['experience_mod_calc', 'experience_mod_other', 'experience_mod_temp'],
                ['luck_points_other', 'luck_points_temp', 'luck_points_calc', 'luck_points_rank', 'rank', 'luck_points', 'luck_points_max'],
                ['spirit_ib_other', 'spirit_ib_temp'], ['social_initiative_other', 'social_initiative_temp'],
                ['integrity_other', 'integrity_temp', 'integrity', 'integrity_max'],
                ['spirit_damage_other', 'spirit_damage_temp', 'spirit_damage_calc', 'spirit_combat_skill_id'],
                ['social_damage_temp', 'social_damage_other', 'social_attack_id_value']), function(v) {
                const charObj = buildCharObj(v);

                setAttrs({
                    cha: charObj['cha'],
                    ...calcStdSkills(charStdSkillIds['cha'], charObj, v),
                    ...calcProSkills("professionalskill", proSkillIds, charObj, v),
                    ...calcProSkills("combatstyle", combatStyleIds, charObj, v),
                    ...calcExpMod(charObj['cha'], charObj['int'], v['experience_mod_calc'], v['experience_mod_other'],
                        v['experience_mod_temp']),
                    ...calcLuckPoints(charObj['pow'], charObj['cha'], v['luck_points_calc'], v['luck_points_other'],
                        v['luck_points_temp'], v['luck_points_rank'], v['rank'], v['luck_points'], v['luck_points_max']),
                    ...calcSpiritInitiative(charObj['int'], charObj['cha'], v['spirit_ib_other'], v['spirit_ib_temp']),
                    ...calcSocialInitiative(charObj['int'], charObj['cha'], v['social_initiative_other'], v['social_initiative_temp']),
                    ...calcIntegrity(charObj['cha'], v['integrity_other'], v['integrity_temp'], v['integrity'], v['integrity_max'])
                });
            });
        });
    });
});

/* Attribute Triggers */
/* Action Point Triggers */
on('change:action_points_other change:action_points_temp', function() {
    getAttrs(['dex', 'int', 'action_points_other', 'action_points_temp', 'action_points_calc', 'fatigue', 'action_points', 'action_points_max'], function(v) {
        setAttrs( calcActionPoints(parseInt(v['dex']), parseInt(v['int']), v['action_points_other'], v['action_points_temp'],
            v['action_points_calc'], v['fatigue'], v['action_points'], v['action_points_max']));
    });
});
on('change:action_points_calc', function() {
    getAttrs(['dex', 'int', 'action_points_other', 'action_points_temp', 'action_points_calc', 'fatigue', 'action_points',
        'action_points_max'].concat(['pow', 'spirit_ap_other', 'spirit_ap_temp', 'spirit_ap', 'spirit_ap_max']), function(v) {
        setAttrs({
            ...calcActionPoints(parseInt(v['dex']), parseInt(v['int']), v['action_points_other'], v['action_points_temp'],
                v['action_points_calc'], v['fatigue'], v['action_points'], v['action_points_max']),
            ...calcSpiritAP(parseInt(v['pow']), parseInt(v['int']), v['spirit_ap_other'], v['spirit_ap_temp'],
                v['action_points_calc'], v['spirit_ap'], v['spirit_ap_max'])
        });
    });
});

/* Damage Mod Triggers */
on('change:damage_mod_calc change:damage_mod_other change:damage_mod_temp', function() {
    getAttrs(['str', 'siz', 'con', 'pow', 'damage_mod_calc', 'damage_mod_other', 'damage_mod_temp'], function(v) {
        setAttrs( calcDamageMod(parseInt(v['str']), parseInt(v['siz']), parseInt(v['con']), parseInt(v['pow']),
            v['damage_mod_calc'], v['damage_mod_other'], v['damage_mod_temp']));
    });
});

/* Experience Mod Triggers */
on('change:experience_mod_calc change:experience_mod_other change:experience_mod_temp', function() {
    getAttrs(['cha', 'int', 'experience_mod_calc', 'experience_mod_other', 'experience_mod_temp'], function(v) {
        setAttrs( calcExpMod(parseInt(v['cha']), parseInt(v['int']), v['experience_mod_calc'], v['experience_mod_other'],
            v['experience_mod_temp']));
    });
});

/* Healing Rate Triggers */
on('change:healing_rate_calc change:healing_rate_other change:healing_rate_temp change:healing_rate_double', function() {
    getAttrs(['con', 'pow', 'healing_rate_calc', 'healing_rate_other', 'healing_rate_temp', 'healing_rate_double', 'fatigue'], function(v) {
        const healingRateVals = calcHealingRate(parseInt(v['con']), parseInt(v['pow']), v['healing_rate_calc'], v['healing_rate_other'],
            v['healing_rate_temp'], v['healing_rate_double']);
        setAttrs({
            ...healingRateVals,
            ...calcFatigueRecovery(v['fatigue'], healingRateVals['healing_rate'])
        });
    });
});

/* Initiative Triggers */
on('change:initiative_bonus_other change:initiative_bonus_temp change:initiative_add_one_tenth_athletics', function() {
    getAttrs(['int', 'dex', 'initiative_bonus_other', 'initiative_bonus_temp', 'armor_penalty', 'fatigue', 'athletics_total',
        'initiative_add_one_tenth_athletics'], function(v) {
        const initiative_bonus_fatigue = parseInt(fatigueTable[v['fatigue']][2])
        setAttrs({
            ...calcInitiativeBonus(parseInt(v['int']), parseInt(v['dex']), v['initiative_bonus_other'],
                v['initiative_bonus_temp'], parseInt(v['armor_penalty']), initiative_bonus_fatigue, parseInt(v['athletics_total']),
                v['initiative_add_one_tenth_athletics'])
        });
    });
});

/* Luck Point Triggers */
on('change:luck_points_other change:luck_points_temp change:luck_points_calc change:luck_points_rank change:rank', function() {
    getAttrs(['pow', 'cha', 'luck_points_other', 'luck_points_temp', 'luck_points_calc', 'luck_points_rank', 'rank',
        'luck_points', 'luck_points_max'], function(v) {
        setAttrs({
            ...calcLuckPoints(parseInt(v['pow']), parseInt(v['cha']), v['luck_points_calc'], v['luck_points_other'],
                v['luck_points_temp'], v['luck_points_rank'], v['rank'], v['luck_points'], v['luck_points_max'])
        });
    });
});

/* Magic Point Triggers */
on('change:magic_points_other change:magic_points_temp', function() {
    getAttrs(['pow', 'magic_points_other', 'magic_points_temp', 'magic_points', 'magic_points_max'], function(v) {
        setAttrs({
            ...calcMagicPoints(parseInt(v['pow']), v['magic_points_other'], v['magic_points_temp'], v['magic_points'], v['magic_points_max'])
        });
    });
});

/* Movement Rate Triggers */
on('change:movement_rate_species change:movement_rate_other change:movement_rate_temp', function() {
    getAttrs(['movement_rate_species', 'movement_rate_other', 'movement_rate_temp', 'movement_rate_fatigue', 'movement_rate_enc'], function(v) {
        setAttrs({
            ...calcMoveRate(v['movement_rate_species'], v['movement_rate_other'], v['movement_rate_temp'],
                v['movement_rate_fatigue'], v['movement_rate_enc'])
        });
    });
});

/* Spirit Action Points Triggers */
on('change:spirit_ap_other change:spirit_ap_temp', function() {
    getAttrs(['int', 'pow', 'spirit_ap_other', 'spirit_ap_temp', 'action_points_calc', 'spirit_ap', 'spirit_ap_max'], function(v) {
        setAttrs({
            ...calcSpiritAP(parseInt(v['pow']), parseInt(v['int']), v['spirit_ap_other'], v['spirit_ap_temp'],
                v['action_points_calc'], v['spirit_ap'], v['spirit_ap_max'])
        });
    });
});

/* Spirit Combat Skill Triggers */
on('change:spirit_combat_skill_id', function() {
    getAttrs(['spirit_damage_other', 'spirit_damage_temp', 'spirit_damage_calc', 'spirit_combat_skill_id'], function(v) {
        let newVals = {};
        const spirit_combat_skill_id = v['spirit_combat_skill_id'];
        if (spirit_combat_skill_id.startsWith('repeating_')) {
            newVals['spirit_combat_skill_name_value'] = `@{${spirit_combat_skill_id}_name}`;

        } else {
            newVals['spirit_combat_skill_name_value'] = getTranslationByKey(`${spirit_combat_skill_id}`);
        }
        newVals['spirit_combat_skill_total_value'] = `@{${spirit_combat_skill_id}_total}`;
        newVals['spirit_combat_skill_encumbered_value'] = `@{${spirit_combat_skill_id}_encumbered}`;
        newVals['spirit_combat_skill_notes_value'] = `@{${spirit_combat_skill_id}_notes}`;

        setAttrs({
            ...newVals,
            ...calcSpiritDamage(v['spirit_damage_other'], v['spirit_damage_temp'], v['spirit_damage_calc'], v['spirit_combat_skill_id'])
        });
    });
});

/* Spirit Damage Triggers */
on('change:spirit_damage_other change:spirit_damage_temp change:spirit_damage_calc', function() {
    getAttrs(['spirit_damage_other', 'spirit_damage_temp', 'spirit_damage_calc', 'spirit_combat_skill_id'], function(v) {
        setAttrs({
            ...calcSpiritDamage(v['spirit_damage_other'], v['spirit_damage_temp'], v['spirit_damage_calc'], v['spirit_combat_skill_id'])
        });
    });
});

/* Social Damage Triggers */
on('change:social_damage_other change:social_damage_temp', function() {
    getAttrs(['social_damage_other', 'social_damage_temp', 'social_attack_id_value'], function(v) {
        setAttrs({
            ...calcSocialDamage(v['social_damage_other'], v['social_damage_temp'], v['social_attack_id_value'])
        });
    });
});

/* Spirit Initiative Triggers */
on('change:spirit_ib_other change:spirit_ib_temp', function() {
    getAttrs(['int', 'cha', 'spirit_ib_other', 'spirit_ib_temp'], function(v) {
        setAttrs({
            ...calcSpiritInitiative(parseInt(v['int']), parseInt(v['cha']), v['spirit_ib_other'], v['spirit_ib_temp'])
        });
    });
});

/* Confidence Triggers */
on('change:confidence_other change:confidence_temp', function() {
    getAttrs(['willpower_total', 'confidence_other', 'confidence_temp'], function(v) {
        setAttrs({
            ...calcConfidence(parseInt(v['willpower_total']), v['confidence_other'], v['confidence_temp'])
        });
    });
});

/* Social Initiative Triggers */
on('change:social_initiative_other change:social_initiative_temp', function() {
    getAttrs(['int', 'cha', 'social_initiative_other', 'social_initiative_temp'], function(v) {
        setAttrs({
            ...calcSocialInitiative(parseInt(v['int']), parseInt(v['cha']), v['social_initiative_other'], v['social_initiative_temp'])
        });
    });
});

/* Composure Triggers */
on('change:composure_other change:composure_temp', function() {
    getAttrs(['pow', 'composure_other', 'composure_temp', 'composure', 'composure_max'], function(v) {
        setAttrs({
            ...calcComposure(parseInt(v['pow']), v['composure_other'], v['composure_temp'], v['composure'], v['composure_max'])
        });
    });
});

/* Integrity Triggers */
on('change:integrity_other change:integrity_temp', function() {
    getAttrs(['cha', 'integrity_other', 'integrity_temp', 'integrity', 'integrity_max'], function(v) {
        setAttrs({
            ...calcIntegrity(parseInt(v['cha']), v['integrity_other'], v['integrity_temp'], v['integrity'], v['integrity_max'])
        });
    });
});

/* Resolve Triggers */
on('change:resolve_other change:resolve_temp', function() {
    getAttrs(['int', 'resolve_other', 'resolve_temp', 'resolve', 'resolve_max'], function(v) {
        setAttrs({
            ...calcResolve(parseInt(v['int']), v['resolve_other'], v['resolve_temp'], v['resolve'], v['resolve_max'])
        });
    });
});


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
    on(`change:${skillId}_other`, function() {
        getAttrs(allCharGetAttrs.concat([`${skillId}_other`], ['initiative_bonus_other', 'initiative_bonus_temp',
            'armor_penalty', 'initiative_add_one_tenth_athletics', 'fatigue'],
        ['spirit_damage_other', 'spirit_damage_temp', 'spirit_damage_calc', 'spirit_combat_skill_id'],
        ['confidence_other', 'confidence_temp', 'social_damage_other', 'social_damage_temp', 'social_attack_id_value']), function(v) {
            let charObj = buildCharObj(v);
            let char1 = charObj[stdSkillChars[`${skillId}`][0]];
            let char2 = charObj[stdSkillChars[`${skillId}`][1]];

            let socialDamageValues = {};
            if (`${skillId}` === v['social_attack_id']) {
                const socialAttackTotal = char1 + char2 + parseInt(v[`${skillId}_other`]);
                socialDamageValues = {
                    ...calcSocialDamage(v['social_damage_other'], v['social_damage_temp'], v['social_attack_id_value'], socialAttackTotal)
                };
            }

            let spiritDamageValues = {};
            if (`${skillId}` === v['spirit_combat_skill_id']) {
                const spiritCombatSkillTotal = char1 + char2 + parseInt(v[`${skillId}_other`]);
                spiritDamageValues = {
                    ...calcSpiritDamage(v['spirit_damage_other'], v['spirit_damage_other'], v['spirit_damage_calc'], v['spirit_combat_skill_id'], spiritCombatSkillTotal)
                };
            }

            let specialValues = {};
            if (`${skillId}` === 'athletics') {
                const initiative_bonus_fatigue = parseInt(fatigueTable[v['fatigue']][2]);
                const athletics_total = char1 + char2 + parseInt(v[`${skillId}_other`]);

                specialValues = {
                    ...calcInitiativeBonus(charObj['int'], charObj['dex'], v['initiative_bonus_other'],
                        v['initiative_bonus_temp'], parseInt(v['armor_penalty']), initiative_bonus_fatigue, athletics_total,
                        v['initiative_add_one_tenth_athletics'])
                };
            } else if (`${skillId}` === 'willpower') {
                const willpower_total = char1 + char2 + parseInt(v[`${skillId}_other`]);

                specialValues = {
                    ...calcConfidence(willpower_total, v['confidence_other'], v['confidence_temp'])
                };
            }

            setAttrs({
                [`${skillId}_total`]: char1 + char2 + parseInt(v[`${skillId}_other`]),
                ...socialDamageValues,
                ...spiritDamageValues,
                ...specialValues
            });
        });
    });
});

/* Passion Triggers */
on("change:repeating_passion:total", function(event) {
    const id = event.sourceAttribute.split('_')[2];

    getAttrs([`repeating_passion_${id}_total`].concat(
        ['willpower_total', 'spirit_damage_other', 'spirit_damage_temp', 'spirit_damage_calc', 'spirit_combat_skill_id'],
        ['social_damage_other', 'social_damage_temp', 'social_attack_id_value']), function(v) {
        const passionTotal = parseInt(v[`repeating_passion_${id}_total`]);

        let socialDamageVals = {};
        if (`repeating_passion_${id}` === v['social_attack_id_value']) {
            socialDamageVals = calcSocialDamage(v['social_damage_other'], v['social_damage_temp'], v['social_attack_id_value'], passionTotal);
        }

        let spiritDamageVals = {};
        if (`repeating_passion_${id}` === v['spirit_combat_skill_id']) {
            spiritDamageVals = calcSpiritDamage(v['spirit_damage_other'], v['spirit_damage_temp'], v['spirit_damage_calc'], v['spirit_combat_skill_id'], passionTotal);
        }

        // TODO Tenacity Modifier

        setAttrs({
            ...spiritDamageVals,
            ...socialDamageVals
        });
    });
});

/* Professional Skill & Combat Style Total and Encumbered */
on("change:repeating_professionalskill:char1 change:repeating_professionalskill:char2 " +
    "change:repeating_professionalskill:other change:repeating_professionalskill:encumbered " +
    "change:repeating_combatstyle:char1 change:repeating_combatstyle:char2 " +
    "change:repeating_combatstyle:other change:repeating_combatstyle:encumbered", function(event) {
    const type = event.sourceAttribute.split('_')[1];
    const id = event.sourceAttribute.split('_')[2];

    getAttrs(allCharGetAttrs.concat([`repeating_${type}_${id}_char1`, `repeating_${type}_${id}_char2`, `repeating_${type}_${id}_other`],
        ['willpower_total', 'spirit_damage_other', 'spirit_damage_temp', 'spirit_damage_calc', 'spirit_combat_skill_id'],
        ['social_damage_other', 'social_damage_temp', 'social_attack_id_value']), function(v) {
        const charObj = buildCharObj(v);
        const skillTotal = calcProSkillTotal(charObj, v[`repeating_${type}_${id}_char1`], v[`repeating_${type}_${id}_char2`], v[`repeating_${type}_${id}_other`]);

        let socialDamageVals = {};
        if (`repeating_${type}_${id}` === v['social_attack_id_value']) {
            socialDamageVals = calcSocialDamage(v['social_damage_other'], v['social_damage_temp'], v['social_attack_id_value'], skillTotal);
        }

        let spiritDamageVals = {};
        if (`repeating_${type}_${id}` === v['spirit_combat_skill_id']) {
            spiritDamageVals = calcSpiritDamage(v['spirit_damage_other'], v['spirit_damage_temp'], v['spirit_damage_calc'], v['spirit_combat_skill_id'], skillTotal);
        }

        setAttrs({
            [`repeating_${type}_${id}_total`]: skillTotal,
            [`repeating_${type}_${id}_encumbered`]: calcProSkillEncumbered(v[`repeating_${type}_${id}_char1`], v[`repeating_${type}_${id}_char2`]),
            ...spiritDamageVals,
            ...socialDamageVals
        });
    });
});

/* Skill Augmentation Triggers */
on("change:skill_augment change:repeating_passion:augment change:repeating_professionalskill:augment change:repeating_combatstyle:augment", function(event) {
    const sourceAttr = event.sourceAttribute;
    if (event.sourceType !== 'sheetworker') {
        getSectionIDs("repeating_passion", function(passionIds) {
            getSectionIDs("repeating_professionalskill", function(proSkillIds) {
                getSectionIDs("repeating_combatstyle", function(combatStyleIds) {
                    setAttrs(calcAugmentation(sourceAttr, combatStyleIds, proSkillIds, passionIds));
                });
            });
        });
    }
});

/* Social Attack ID Triggers */
on("change:social_attack_id change:repeating_passion:social_attack change:repeating_professionalskill:social_attack change:repeating_combatstyle:social_attack", function(event) {
    console.log("social attack triggered by = " + event.sourceAttribute);
    const sourceAttr = event.sourceAttribute;
    if (event.sourceType !== 'sheetworker') {
        getSectionIDs("repeating_passion", function(passionIds) {
            getSectionIDs("repeating_professionalskill", function(proSkillIds) {
                getSectionIDs("repeating_combatstyle", function(combatStyleIds) {
                    getAttrs(['social_attack_id', 'social_damage_other', 'social_damage_temp'], function(v) {
                        setAttrs(calcSocialAttack(sourceAttr, combatStyleIds, proSkillIds, passionIds, v['social_attack_id'], v['social_damage_other'], v['social_damage_temp']));
                    });
                });
            });
        });
    }
});

/* Social Defense ID Triggers */
on("change:social_defense_id change:repeating_passion:social_defense change:repeating_professionalskill:social_defense change:repeating_combatstyle:social_defense", function(event) {
    console.log("social defense triggered by = " + event.sourceAttribute);
    const sourceAttr = event.sourceAttribute;
    if (event.sourceType !== 'sheetworker') {
        getSectionIDs("repeating_passion", function(passionIds) {
            getSectionIDs("repeating_professionalskill", function(proSkillIds) {
                getSectionIDs("repeating_combatstyle", function(combatStyleIds) {
                    getAttrs(['social_defense_id'], function(v) {
                        setAttrs(calcSocialDefense(sourceAttr, combatStyleIds, proSkillIds, passionIds, v['social_defense_id']));
                    });
                });
            });
        });
    }
});

/* Encumbrance Triggers */
/* Armor ENC and Armor Penalty*/
on("change:location12_armor_enc change:location11_armor_enc change:location10_armor_enc change:half_effective_armor_enc change:location9_armor_enc change:location_armor_enc change:location7_armor_enc change:location6_armor_enc change:location5_armor_enc change:location4_armor_enc change:location3_armor_enc change:location2_armor_enc change:location1_armor_enc change:half_effective_armor_enc", function() {
    getAttrs(armorEncGetAttrs.concat(encGetAttrs, ['int', 'dex', 'initiative_bonus_other', 'initiative_bonus_temp', 'armor_penalty',
        'athletics_total', 'initiative_add_one_tenth_athletics', 'fatigue'],
        ['str', 'movement_rate_species', 'movement_rate_other', 'movement_rate_temp']), function(v) {
        const armorAttrs = calcArmorEncAndPenalty(v);
        v['effective_armor_enc'] = armorAttrs['effective_armor_enc'];
        v['armor_enc_carried'] = armorAttrs['armor_enc_carried'];
        const initiative_bonus_fatigue = parseInt(fatigueTable[v['fatigue']][2]);
        const newEncVals = calcEnc(parseInt(v['str']), v);
        setAttrs({
            ...armorAttrs,
            ...newEncVals,
            ...calcMoveRate(v['movement_rate_species'], v['movement_rate_other'], v['movement_rate_temp'],
                v['movement_rate_fatigue'], newEncVals['movement_rate_enc']),
            ...calcInitiativeBonus(parseInt(v['int']), parseInt(v['dex']), v['initiative_bonus_other'],
                v['initiative_bonus_temp'], armorAttrs['armor_penalty'], initiative_bonus_fatigue, parseInt(v['athletics_total']),
                v['initiative_add_one_tenth_athletics']),
            ...calcMoveRate(v['movement_rate_species'], v['movement_rate_other'], v['movement_rate_temp'],
                v['movement_rate_fatigue'], newEncVals['movement_rate_enc'])
        });
    });
});

/* Armor Equipped */
['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].forEach(num => {
    on(`change:location${num}_armor_equipped`, function() {
        getAttrs([`location${num}_other_ap`, `location${num}_armor_ap`, 'all_armor_temp'].concat(armorEncGetAttrs, encGetAttrs,
            ['int', 'dex', 'initiative_bonus_other', 'initiative_bonus_temp', 'armor_penalty', 'athletics_total',
            'initiative_add_one_tenth_athletics', 'fatigue'],
            ['str', 'movement_rate_species', 'movement_rate_other', 'movement_rate_temp']), function(v) {
            const armorAttrs = calcArmorEncAndPenalty(v);
            const initiative_bonus_fatigue = parseInt(fatigueTable[v['fatigue']][2]);
            v['effective_armor_enc'] = armorAttrs['effective_armor_enc'];
            v['armor_enc_carried'] = armorAttrs['armor_enc_carried'];
            const newEncVals = calcEnc(parseInt(v['str']), v);
            setAttrs({
                [`location${num}_ap`]: calcLocationAP(v[`location${num}_other_ap`], v[`location${num}_armor_ap`], parseInt(v['all_armor_temp']), v[`location${num}_armor_equipped`]),
                ...armorAttrs,
                ...newEncVals,
                ...calcMoveRate(v['movement_rate_species'], v['movement_rate_other'], v['movement_rate_temp'],
                    v['movement_rate_fatigue'], newEncVals['movement_rate_enc']),
                ...calcInitiativeBonus(parseInt(v['int']), parseInt(v['dex']), v['initiative_bonus_other'],
                    v['initiative_bonus_temp'], armorAttrs['armor_penalty'], initiative_bonus_fatigue, parseInt(v['athletics_total']),
                    v['initiative_add_one_tenth_athletics'])
            });
        });
    });
});



/* Weapon ENC
on("change:repeating_weapon:enc change:repeating_weapon:ammo_enc change:repeating_weapon:clip_enc change:repeating_weapon:ammo change:repeating_weapon:clips change:repeating_weapon:location", function() {
    getSectionIDs("repeating_weapon", function(weaponIds) {
        let weaponGetAttrs = [];
        weaponIds.forEach(id => {
            weaponGetAttrs.push(`repeating_weapon_${id}_enc`, `repeating_weapon_${id}_ammo_enc`, `repeating_weapon_${id}_clip_enc`, `repeating_weapon_${id}_ammo`, `repeating_weapon_${id}_clips`, `repeating_weapon_${id}_location`)
        });

        getAttrs(weaponGetAttrs.concat(encGetAttrs, ['str', 'movement_rate_species', 'movement_rate_other', 'movement_rate_temp',
            'movement_rate_fatigue']), function(v) {
            const weaponAttrs = calcWeaponEnc(weaponIds, v);
            v['weapons_enc'] = weaponAttrs['weapons_enc'];
            v['weapons_enc_carried'] = weaponAttrs['weapons_enc_carried'];
            const newEncVals = calcEnc(parseInt(v['str']), v);
            setAttrs({
                ...weaponAttrs,
                ...newEncVals,
                ...calcMoveRate(v['movement_rate_species'], v['movement_rate_other'], v['movement_rate_temp'],
                    v['movement_rate_fatigue'], newEncVals['movement_rate_enc'])
            });
        });
    });
}); */

/* Melee ENC */
on("change:repeating_meleeweapon:enc change:repeating_meleeweapon:quantity change:repeating_meleeweapon:location", function() {
    getSectionIDs("repeating_meleeweapon", function(meleeIds) {
        let meleeGetAttrs = [];
        meleeIds.forEach(id => {
            meleeGetAttrs.push(`repeating_meleeweapon_${id}_enc`, `repeating_meleeweapon_${id}_quantity`, `repeating_meleeweapon_${id}_location`)
        });

        getAttrs(['str'].concat(meleeGetAttrs, encGetAttrs, ['movement_rate_species', 'movement_rate_other',
            'movement_rate_temp', 'movement_rate_fatigue']), function(v) {
            const meleeAttrs = calcGenericRepeatingEnc(meleeIds, 'meleeweapon', v);
            v['meleeweapon_enc'] = meleeAttrs['meleeweapon_enc'];
            v['meleeweapon_enc_carried'] = meleeAttrs['meleeweapon_enc_carried'];
            const newEncVals = calcEnc(parseInt(v['str']), v);
            setAttrs({
                ...meleeAttrs,
                ...newEncVals,
                ...calcMoveRate(v['movement_rate_species'], v['movement_rate_other'], v['movement_rate_temp'],
                    v['movement_rate_fatigue'], newEncVals['movement_rate_enc'])
            });
        });
    });
});

/* Ranged ENC */
on("change:repeating_rangedweapon:enc change:repeating_rangedweapon:quantity change:repeating_rangedweapon:location", function() {
    getSectionIDs("repeating_rangedweapon", function(rangedIds) {
        let rangedGetAttrs = [];
        rangedIds.forEach(id => {
            rangedGetAttrs.push(`repeating_rangedweapon_${id}_enc`, `repeating_rangedweapon_${id}_quantity`, `repeating_rangedweapon_${id}_location`)
        });

        getAttrs(['str'].concat(rangedGetAttrs, encGetAttrs, ['movement_rate_species', 'movement_rate_other',
            'movement_rate_temp', 'movement_rate_fatigue']), function(v) {
            const rangedAttrs = calcGenericRepeatingEnc(rangedIds, 'rangedweapon', v);
            v['rangedweapon_enc'] = rangedAttrs['rangedweapon_enc'];
            v['rangedweapon_enc_carried'] = rangedAttrs['rangedweapon_enc_carried'];
            const newEncVals = calcEnc(parseInt(v['str']), v);
            setAttrs({
                ...rangedAttrs,
                ...newEncVals,
                ...calcMoveRate(v['movement_rate_species'], v['movement_rate_other'], v['movement_rate_temp'],
                    v['movement_rate_fatigue'], newEncVals['movement_rate_enc'])
            });
        });
    });
});



/* Gear ENC */
on("change:repeating_equipment:enc change:repeating_equipment:quantity change:repeating_equipment:location", function() {
    getSectionIDs("repeating_equipment", function(gearIds) {
        let gearGetAttrs = [];
        gearIds.forEach(id => {
            gearGetAttrs.push(`repeating_equipment_${id}_enc`, `repeating_equipment_${id}_quantity`, `repeating_equipment_${id}_location`)
        });

        getAttrs(['str'].concat(gearGetAttrs, encGetAttrs, ['movement_rate_species', 'movement_rate_other',
            'movement_rate_temp', 'movement_rate_fatigue']), function(v) {
            const gearAttrs = calcGenericRepeatingEnc(gearIds, 'equipment', v);
            v['equipment_enc'] = gearAttrs['equipment_enc'];
            v['equipment_enc_carried'] = gearAttrs['equipment_enc_carried'];
            const newEncVals = calcEnc(parseInt(v['str']), v);
            setAttrs({
                ...gearAttrs,
                ...newEncVals,
                ...calcMoveRate(v['movement_rate_species'], v['movement_rate_other'], v['movement_rate_temp'],
                    v['movement_rate_fatigue'], newEncVals['movement_rate_enc'])
            });
        });
    });
});

/* Currency ENC */
on("change:repeating_currency:enc change:repeating_currency:quantity change:repeating_currency:location", function() {
    getSectionIDs("repeating_currency", function(currencyIds) {
        let currencyGetAttrs = [];
        currencyIds.forEach(id => {
            currencyGetAttrs.push(`repeating_currency_${id}_enc`, `repeating_currency_${id}_quantity`, `repeating_currency_${id}_location`)
        });

        getAttrs(['str'].concat(currencyGetAttrs, encGetAttrs, ['movement_rate_species', 'movement_rate_other',
            'movement_rate_temp', 'movement_rate_fatigue']), function(v) {
            const currencyAttrs = calcGenericRepeatingEnc(currencyIds, 'currency', v);
            v['currency_enc'] = currencyAttrs['currency_enc'];
            v['currency_enc_carried'] = currencyAttrs['currency_enc_carried'];
            const newEncVals = calcEnc(parseInt(v['str']), v);
            setAttrs({
                ...currencyAttrs,
                ...newEncVals,
                ...calcMoveRate(v['movement_rate_species'], v['movement_rate_other'], v['movement_rate_temp'],
                    v['movement_rate_fatigue'], newEncVals['movement_rate_enc'])
            });
        });
    });
});

/* ENC */
on("change:avg_species_siz change:pack_equipped change:encumbrance_temp", function() {
    getAttrs(['str'].concat(encGetAttrs, ['movement_rate_species', 'movement_rate_other', 'movement_rate_temp',
        'movement_rate_fatigue']), function(v) {
        const newEncVals = calcEnc(parseInt(v['str']), v);
        setAttrs({
            ...newEncVals,
            ...calcMoveRate(v['movement_rate_species'], v['movement_rate_other'], v['movement_rate_temp'],
            v['movement_rate_fatigue'], newEncVals['movement_rate_enc'])
        });
    });
});

/* Fatigue */
on("change:fatigue", function() {
    getAttrs(['dex', 'int', 'action_points_other', 'action_points_temp', 'action_points_calc', 'action_points',
        'action_points_max', 'fatigue', 'healing_rate', 'initiative_bonus_other', 'initiative_bonus_temp',
        'armor_penalty', 'athletics_total', 'initiative_add_one_tenth_athletics', 'movement_rate_species',
        'movement_rate_other', 'movement_rate_temp', 'movement_rate_enc'], function(v) {
        const dex = parseInt(v['dex']);
        const int = parseInt(v['int'])
        const newFatigueVals = calcFatigue(v['fatigue'], parseInt(v['healing_rate']));
        setAttrs({
            ...newFatigueVals,
            ...calcActionPoints(dex, int, v['action_points_other'], v['action_points_temp'],
                v['action_points_calc'], v['fatigue'], v['action_points'], v['action_points_max']),
            ...calcInitiativeBonus(int, dex, v['initiative_bonus_other'], v['initiative_bonus_temp'],
                parseInt(v['armor_penalty']), parseInt(newFatigueVals['initiative_bonus_fatigue']), parseInt(v['athletics_total']),
                v['initiative_add_one_tenth_athletics']),
            ...calcMoveRate(v['movement_rate_species'], v['movement_rate_other'], v['movement_rate_temp'],
                newFatigueVals['movement_rate_fatigue'], v['movement_rate_enc'])
        });
    });
});

/* Repeating IDs */
on("change:repeating_combatstyle change:repeating_professionalskill change:repeating_passion change:repeating_meleeweapon " +
    "change:repeating_rangedweapon change:repeating_equipment change:repeating_currency change:repeating_condition " +
    "change:repeating_trait", function(event) {
    const type = event.sourceAttribute.split('_')[1];
    const id = event.sourceAttribute.split('_')[2];
    setAttrs({[`repeating_${type}_${id}_id`]: `repeating_${type}_${id}`});
});




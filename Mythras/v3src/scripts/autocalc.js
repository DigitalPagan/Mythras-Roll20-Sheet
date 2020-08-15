// ==Character autocalc
// =Characteristics
const calc_char = (stat) => {
    getAttrs([`${stat}_base`, `${stat}_training`, `${stat}_ageing`, `${stat}_other`, `${stat}_temp`], function(v) {
        setAttrs({[stat]: parseInt(v[`${stat}_base`]) + parseInt(v[`${stat}_other`]) + parseInt(v[`${stat}_temp`])});
    });
};
['str','con','siz','int','pow','dex','cha'].forEach(stat => {
    on(`change:${stat}_base change:${stat}_other change:${stat}_temp`, function() { calc_char(stat); });
});

// =Attributes
/* Action Points
const calc_action_points = function() {
    getAttrs(["dex", "int", "pow", "action_points_temp", "action_points_other", "action_points_add_one", "action_points_fatigue", "spirit", "action_points_calc", "action_points", "action_points_max", "action_points_mook1", "action_points_mook2", "action_points_mook3", "action_points_mook4", "action_points_mook5", "action_points_mook6", "action_points_mook7", "action_points_mook8", "action_points_mook9", "action_points_mook10"], function(v) {
        let base_value = 0;
        let new_action_points_max = 0;
        if (v["action_points_calc"] === "set_2") {
            base_value = 2;
        } else if (v["action_points_calc"] === "set_3") {
            base_value = 3;
        } else {
            if(v["spirit"] === "1") {
                base_value = Math.ceil((parseInt(v.int) + parseInt(v.pow)) / 12);
            } else {
                base_value = Math.ceil((parseInt(v.int) + parseInt(v.dex)) / 12);
            }
        }

        if (v.action_points_fatigue !== 'na') {
            new_action_points_max = base_value + parseInt(v.action_points_add_one) + parseInt(v.action_points_temp) + parseInt(v.action_points_other) + parseInt(v.action_points_fatigue);
            new_action_points_max = (new_action_points_max < 0) ? 0 : new_action_points_max;
        }

        diff_action_points_max = new_action_points_max - parseInt(v.action_points_max);
        setAttrs({
            action_points_max: new_action_points_max,
            action_points_base: base_value,
            action_points: parseInt(v.action_points) + diff_action_points_max,
            action_points_mook1: parseInt(v.action_points_mook1) + diff_action_points_max,
            action_points_mook2: parseInt(v.action_points_mook2) + diff_action_points_max,
            action_points_mook3: parseInt(v.action_points_mook3) + diff_action_points_max,
            action_points_mook4: parseInt(v.action_points_mook4) + diff_action_points_max,
            action_points_mook5: parseInt(v.action_points_mook5) + diff_action_points_max,
            action_points_mook6: parseInt(v.action_points_mook6) + diff_action_points_max,
            action_points_mook7: parseInt(v.action_points_mook7) + diff_action_points_max,
            action_points_mook8: parseInt(v.action_points_mook8) + diff_action_points_max,
            action_points_mook9: parseInt(v.action_points_mook9) + diff_action_points_max,
            action_points_mook10: parseInt(v.action_points_mook10) + diff_action_points_max
        });
    });
};
on("change:dex change:int change:pow change:action_points_temp change:action_points_add_one change:action_points_other change:action_points_fatigue change:spirit change:action_points_calc", function() { calc_action_points(); });
 */

// =Health
// Hit Locations
on("change:hit_locations", function() {
    getAttrs(["hit_locations", "hp_max_base"], function(v) {
        var negative_hp_max_base = 0 - parseInt(v.hp_max_base);

        if (v.hit_locations === "rabble") {
            setAttrs({
                location1_table_start: 1, location1_table_end: 20, location1_name: getTranslationByKey('hit-points-u'), location1_hp_max_base_mod: 0,
                location2_table_start: 0, location2_table_end: 0, location2_name: " ", location2_hp_max_base_mod: negative_hp_max_base,
                location3_table_start: 0, location3_table_end: 0, location3_name: " ", location3_hp_max_base_mod: negative_hp_max_base,
                location4_table_start: 0, location4_table_end: 0, location4_name: " ", location4_hp_max_base_mod: negative_hp_max_base,
                location5_table_start: 0, location5_table_end: 0, location5_name: " ", location5_hp_max_base_mod: negative_hp_max_base,
                location6_table_start: 0, location6_table_end: 0, location6_name: " ", location6_hp_max_base_mod: negative_hp_max_base,
                location7_table_start: 0, location7_table_end: 0, location7_name: " ", location7_hp_max_base_mod: negative_hp_max_base,
                location8_table_start: 0, location8_table_end: 0, location8_name: " ", location8_hp_max_base_mod: negative_hp_max_base,
                location9_table_start: 0, location9_table_end: 0, location9_name: " ", location9_hp_max_base_mod: negative_hp_max_base,
                location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: negative_hp_max_base,
                location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: negative_hp_max_base,
                location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: negative_hp_max_base,
                location2to7_display: 0, location8_display: 0, location9_display: 0, location10_display: 0, location11_display: 0, location12_display: 0,
                location_notes_1_display: 1, location_notes_7_display: 0, location_notes_8_display: 0, location_notes_9_display: 0, location_notes_10_display: 0
            });
        } else if (v.hit_locations === "simplified") {
            setAttrs({
                location1_table_start: 1, location1_table_end: 20, location1_name: getTranslationByKey('hit-points-u'), location1_hp_max_base_mod: 0,
                location2_table_start: 0, location2_table_end: 0, location2_name: " ", location2_hp_max_base_mod: negative_hp_max_base,
                location3_table_start: 0, location3_table_end: 0, location3_name: " ", location3_hp_max_base_mod: negative_hp_max_base,
                location4_table_start: 0, location4_table_end: 0, location4_name: " ", location4_hp_max_base_mod: negative_hp_max_base,
                location5_table_start: 0, location5_table_end: 0, location5_name: " ", location5_hp_max_base_mod: negative_hp_max_base,
                location6_table_start: 0, location6_table_end: 0, location6_name: " ", location6_hp_max_base_mod: negative_hp_max_base,
                location7_table_start: 0, location7_table_end: 0, location7_name: " ", location7_hp_max_base_mod: negative_hp_max_base,
                location8_table_start: 0, location8_table_end: 0, location8_name: " ", location8_hp_max_base_mod: negative_hp_max_base,
                location9_table_start: 0, location9_table_end: 0, location9_name: " ", location9_hp_max_base_mod: negative_hp_max_base,
                location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: negative_hp_max_base,
                location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: negative_hp_max_base,
                location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: negative_hp_max_base,
                location2to7_display: 0, location8_display: 0, location9_display: 0, location10_display: 0, location11_display: 0, location12_display: 0,
                location_notes_1_display: 1, location_notes_7_display: 0, location_notes_8_display: 0, location_notes_9_display: 0, location_notes_10_display: 0
            });
        } else if (v.hit_locations === "arachnid") {
            setAttrs({
                location1_table_start: 1, location1_table_end: 2, location1_name: getTranslationByKey('rear-right-leg-u'), location1_hp_max_base_mod: -1,
                location2_table_start: 3, location2_table_end: 4, location2_name: getTranslationByKey('rear-left-leg-u'), location2_hp_max_base_mod: -1,
                location3_table_start: 5, location3_table_end: 6, location3_name: getTranslationByKey('mid-right-leg-u'), location3_hp_max_base_mod: -1,
                location4_table_start: 7, location4_table_end: 8, location4_name: getTranslationByKey('mid-left-leg-u'), location4_hp_max_base_mod: -1,
                location5_table_start: 9, location5_table_end: 10, location5_name: getTranslationByKey('fore-right-leg-u'), location5_hp_max_base_mod: -1,
                location6_table_start: 11, location6_table_end: 12, location6_name: getTranslationByKey('fore-left-leg-u'), location6_hp_max_base_mod: -1,
                location7_table_start: 13, location7_table_end: 14, location7_name: getTranslationByKey('abdomen-u'), location7_hp_max_base_mod: 2,
                location8_table_start: 15, location8_table_end: 16, location8_name: getTranslationByKey('front-right-leg-u'), location8_hp_max_base_mod: -1,
                location9_table_start: 17, location9_table_end: 18, location9_name: getTranslationByKey('front-left-leg-u'), location9_hp_max_base_mod: -1,
                location10_table_start: 19, location10_table_end: 20, location10_name: getTranslationByKey('cephalothorax-u'), location10_hp_max_base_mod: 1,
                location11_table_start: 0, location11_table_end: 0, location11_name: "", location11_hp_max_base_mod: negative_hp_max_base,
                location12_table_start: 0, location12_table_end: 0, location12_name: "", location12_hp_max_base_mod: negative_hp_max_base,
                location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 1, location11_display: 0, location12_display: 0,
                location_notes_1_display: 0, location_notes_7_display: 0, location_notes_8_display: 0, location_notes_9_display: 0, location_notes_10_display: 1
            });
        } else if (v.hit_locations === "humanoid") {
            setAttrs({
                location1_table_start: 1, location1_table_end: 3, location1_name: getTranslationByKey('right-leg-u'), location1_hp_max_base_mod: 0,
                location2_table_start: 4, location2_table_end: 6, location2_name: getTranslationByKey('left-leg-u'), location2_hp_max_base_mod: 0,
                location3_table_start: 7, location3_table_end: 9, location3_name: getTranslationByKey('abdomen-u'), location3_hp_max_base_mod: 1,
                location4_table_start: 10, location4_table_end: 12, location4_name: getTranslationByKey('chest-u'), location4_hp_max_base_mod: 2,
                location5_table_start: 13, location5_table_end: 15, location5_name: getTranslationByKey('right-arm-u'), location5_hp_max_base_mod: -1,
                location6_table_start: 16, location6_table_end: 18, location6_name: getTranslationByKey('left-arm-u'), location6_hp_max_base_mod: -1,
                location7_table_start: 19, location7_table_end: 20, location7_name: getTranslationByKey('head-u'), location7_hp_max_base_mod: 0,
                location8_table_start: 0, location8_table_end: 0, location8_name: " ", location8_hp_max_base_mod: negative_hp_max_base,
                location9_table_start: 0, location9_table_end: 0, location9_name: " ", location9_hp_max_base_mod: negative_hp_max_base,
                location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: negative_hp_max_base,
                location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: negative_hp_max_base,
                location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: negative_hp_max_base,
                location2to7_display: 1, location8_display: 0, location9_display: 0, location10_display: 0, location11_display: 0, location12_display: 0,
                location_notes_1_display: 0, location_notes_7_display: 1, location_notes_8_display: 0, location_notes_9_display: 0, location_notes_10_display: 0

            });
        } else if (v.hit_locations === "centaurid") {
            setAttrs({
                location1_table_start: 1, location1_table_end: 3, location1_name: getTranslationByKey('rear-right-leg-u'), location1_hp_max_base_mod: 0,
                location2_table_start: 4, location2_table_end: 6, location2_name: getTranslationByKey('rear-left-leg-u'), location2_hp_max_base_mod: 0,
                location3_table_start: 7, location3_table_end: 8, location3_name: getTranslationByKey('hindquarters-u'), location3_hp_max_base_mod: 1,
                location4_table_start: 9, location4_table_end: 10, location4_name: getTranslationByKey('forequarters-u'), location4_hp_max_base_mod: 2,
                location5_table_start: 11, location5_table_end: 12, location5_name: getTranslationByKey('front-right-leg-u'), location5_hp_max_base_mod: 0,
                location6_table_start: 13, location6_table_end: 14, location6_name: getTranslationByKey('front-left-leg-u'), location6_hp_max_base_mod: 0,
                location7_table_start: 15, location7_table_end: 16, location7_name: getTranslationByKey('chest-u'), location7_hp_max_base_mod: -1,
                location8_table_start: 17, location8_table_end: 17, location8_name: getTranslationByKey('right-arm-u'), location8_hp_max_base_mod: -4,
                location9_table_start: 18, location9_table_end: 18, location9_name: getTranslationByKey('left-arm-u'), location9_hp_max_base_mod: -4,
                location10_table_start: 19, location10_table_end: 20, location10_name: getTranslationByKey('head-u'), location10_hp_max_base_mod: -3,
                location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: negative_hp_max_base,
                location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: negative_hp_max_base,
                location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 1, location11_display: 0, location12_display: 0,
                location_notes_1_display: 0, location_notes_7_display: 0, location_notes_8_display: 0, location_notes_9_display: 0, location_notes_10_display: 1
            });
        } else if (v.hit_locations === "decapoda") {
            setAttrs({
                location1_table_start: 1, location1_table_end: 1, location1_name: getTranslationByKey('rear-right-leg-u'), location1_hp_max_base_mod: -1,
                location2_table_start: 2, location2_table_end: 2, location2_name: getTranslationByKey('rear-left-leg-u'), location2_hp_max_base_mod: -1,
                location3_table_start: 3, location3_table_end: 3, location3_name: getTranslationByKey('mid-right-leg-u'), location3_hp_max_base_mod: -1,
                location4_table_start: 4, location4_table_end: 4, location4_name: getTranslationByKey('mid-left-leg-u'), location4_hp_max_base_mod: -1,
                location5_table_start: 5, location5_table_end: 5, location5_name: getTranslationByKey('fore-right-leg-u'), location5_hp_max_base_mod: -1,
                location6_table_start: 6, location6_table_end: 6, location6_name: getTranslationByKey('fore-left-leg-u'), location6_hp_max_base_mod: -1,
                location7_table_start: 7, location7_table_end: 7, location7_name: getTranslationByKey('front-right-leg-u'), location7_hp_max_base_mod: -1,
                location8_table_start: 8, location8_table_end: 8, location8_name: getTranslationByKey('front-left-leg-u'), location8_hp_max_base_mod: -1,
                location9_table_start: 9, location9_table_end: 10, location9_name: getTranslationByKey('abdomen-u'), location9_hp_max_base_mod: 1,
                location10_table_start: 11, location10_table_end: 16, location10_name: getTranslationByKey('cephalothorax-u'), location10_hp_max_base_mod: 2,
                location11_table_start: 17, location11_table_end: 18, location11_name: getTranslationByKey('right-pincer-u'), location11_hp_max_base_mod: 2,
                location12_table_start: 19, location12_table_end: 20, location12_name: getTranslationByKey('left-pincer-u'), location12_hp_max_base_mod: 0,
                location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 1, location11_display: 1, location12_display: 1,
                location_notes_1_display: 0, location_notes_7_display: 0, location_notes_8_display: 0, location_notes_9_display: 0, location_notes_10_display: 0
            });
        } else if (v.hit_locations === "decapodiform") {
            setAttrs({
                location1_table_start: 1, location1_table_end: 1, location1_name: getTranslationByKey('tentacle-1-u'), location1_hp_max_base_mod: -1,
                location2_table_start: 2, location2_table_end: 2, location2_name: getTranslationByKey('tentacle-2-u'), location2_hp_max_base_mod: -1,
                location3_table_start: 3, location3_table_end: 3, location3_name: getTranslationByKey('tentacle-3-u'), location3_hp_max_base_mod: -1,
                location4_table_start: 4, location4_table_end: 4, location4_name: getTranslationByKey('tentacle-4-u'), location4_hp_max_base_mod: -1,
                location5_table_start: 5, location5_table_end: 5, location5_name: getTranslationByKey('tentacle-5-u'), location5_hp_max_base_mod: -1,
                location6_table_start: 6, location6_table_end: 6, location6_name: getTranslationByKey('tentacle-6-u'), location6_hp_max_base_mod: -1,
                location7_table_start: 7, location7_table_end: 7, location7_name: getTranslationByKey('tentacle-7-u'), location7_hp_max_base_mod: -1,
                location8_table_start: 8, location8_table_end: 8, location8_name: getTranslationByKey('tentacle-8-u'), location8_hp_max_base_mod: -1,
                location9_table_start: 9, location9_table_end: 11, location9_name: getTranslationByKey('long-tentacle-1-u'), location9_hp_max_base_mod: 0,
                location10_table_start: 12, location10_table_end: 14, location10_name: getTranslationByKey('long-tentacle-2-u'), location10_hp_max_base_mod: 0,
                location11_table_start: 15, location11_table_end: 17, location11_name: getTranslationByKey('body-u'), location11_hp_max_base_mod: 2,
                location12_table_start: 18, location12_table_end: 20, location12_name: getTranslationByKey('head-u'), location12_hp_max_base_mod: 1,
                location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 1, location11_display: 1, location12_display: 1,
                location_notes_1_display: 0, location_notes_7_display: 0, location_notes_8_display: 0, location_notes_9_display: 0, location_notes_10_display: 0
            });
        } else if (v.hit_locations === "dorsal_finned_aquatic") {
            setAttrs({
                location1_table_start: 1, location1_table_end: 3, location1_name: getTranslationByKey('tail-u'), location1_hp_max_base_mod: 0,
                location2_table_start: 4, location2_table_end: 6, location2_name: getTranslationByKey('dorsal-fin-u'), location2_hp_max_base_mod: -1,
                location3_table_start: 7, location3_table_end: 10, location3_name: getTranslationByKey('hindquarters-u'), location3_hp_max_base_mod: 1,
                location4_table_start: 11, location4_table_end: 14, location4_name: getTranslationByKey('forequarters-u'), location4_hp_max_base_mod: 2,
                location5_table_start: 15, location5_table_end: 16, location5_name: getTranslationByKey('right-fin-u'), location5_hp_max_base_mod: -1,
                location6_table_start: 17, location6_table_end: 18, location6_name: getTranslationByKey('left-fin-u'), location6_hp_max_base_mod: -1,
                location7_table_start: 19, location7_table_end: 20, location7_name: getTranslationByKey('head-u'), location7_hp_max_base_mod: 0,
                location8_table_start: 0, location8_table_end: 0, location8_name: " ", location8_hp_max_base_mod: negative_hp_max_base,
                location9_table_start: 0, location9_table_end: 0, location9_name: " ", location9_hp_max_base_mod: negative_hp_max_base,
                location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: negative_hp_max_base,
                location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: negative_hp_max_base,
                location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: negative_hp_max_base,
                location2to7_display: 1, location8_display: 0, location9_display: 0, location10_display: 0, location11_display: 0, location12_display: 0,
                location_notes_1_display: 0, location_notes_7_display: 1, location_notes_8_display: 0, location_notes_9_display: 0, location_notes_10_display: 0
            });
        } else if (v.hit_locations === "draconic") {
            setAttrs({
                location1_table_start: 1, location1_table_end: 2, location1_name: getTranslationByKey('tail-u'), location1_hp_max_base_mod: 0,
                location2_table_start: 3, location2_table_end: 4, location2_name: getTranslationByKey('rear-right-leg-u'), location2_hp_max_base_mod: 0,
                location3_table_start: 5, location3_table_end: 6, location3_name: getTranslationByKey('rear-left-leg-u'), location3_hp_max_base_mod: 0,
                location4_table_start: 7, location4_table_end: 8, location4_name: getTranslationByKey('hindquarters-u'), location4_hp_max_base_mod: 1,
                location5_table_start: 9, location5_table_end: 10, location5_name: getTranslationByKey('right-wing-u'), location5_hp_max_base_mod: -1,
                location6_table_start: 11, location6_table_end: 12, location6_name: getTranslationByKey('left-wing-u'), location6_hp_max_base_mod: -1,
                location7_table_start: 13, location7_table_end: 14, location7_name: getTranslationByKey('forequarters-u'), location7_hp_max_base_mod: 2,
                location8_table_start: 15, location8_table_end: 16, location8_name: getTranslationByKey('front-right-leg-u'), location8_hp_max_base_mod: 0,
                location9_table_start: 17, location9_table_end: 18, location9_name: getTranslationByKey('front-left-leg-u'), location9_hp_max_base_mod: 0,
                location10_table_start: 19, location10_table_end: 20, location10_name: getTranslationByKey('head-u'), location10_hp_max_base_mod: 0,
                location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: negative_hp_max_base,
                location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: negative_hp_max_base,
                location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 1, location11_display: 0, location12_display: 0,
                location_notes_1_display: 0, location_notes_7_display: 0, location_notes_8_display: 0, location_notes_9_display: 0, location_notes_10_display: 1
            });
        } else if (v.hit_locations === "insect") {
            setAttrs({
                location1_table_start: 1, location1_table_end: 1, location1_name: getTranslationByKey('right-rear-leg-u'), location1_hp_max_base_mod: -1,
                location2_table_start: 2, location2_table_end: 2, location2_name: getTranslationByKey('left-rear-leg-u'), location2_hp_max_base_mod: -1,
                location3_table_start: 3, location3_table_end: 3, location3_name: getTranslationByKey('mid-right-leg-u'), location3_hp_max_base_mod: -1,
                location4_table_start: 4, location4_table_end: 4, location4_name: getTranslationByKey('mid-left-leg-u'), location4_hp_max_base_mod: -1,
                location5_table_start: 5, location5_table_end: 9, location5_name: getTranslationByKey('abdomen-u'), location5_hp_max_base_mod: 1,
                location6_table_start: 10, location6_table_end: 13, location6_name: getTranslationByKey('thorax-u'), location6_hp_max_base_mod: 2,
                location7_table_start: 14, location7_table_end: 14, location7_name: getTranslationByKey('front-right-leg-u'), location7_hp_max_base_mod: -1,
                location8_table_start: 15, location8_table_end: 15, location8_name: getTranslationByKey('front-left-leg-u'), location8_hp_max_base_mod: -1,
                location9_table_start: 16, location9_table_end: 20, location9_name: getTranslationByKey('head-u'), location9_hp_max_base_mod: 0,
                location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: negative_hp_max_base,
                location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: negative_hp_max_base,
                location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: negative_hp_max_base,
                location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 0, location11_display: 0, location12_display: 0,
                location_notes_1_display: 0, location_notes_7_display: 0, location_notes_8_display: 0, location_notes_9_display: 1, location_notes_10_display: 0
            });
        } else if (v.hit_locations === "octopodiform") {
            setAttrs({
                location1_table_start: 1, location1_table_end: 2, location1_name: getTranslationByKey('tentacle-1-u'), location1_hp_max_base_mod: 0,
                location2_table_start: 3, location2_table_end: 4, location2_name: getTranslationByKey('tentacle-2-u'), location2_hp_max_base_mod: 0,
                location3_table_start: 5, location3_table_end: 6, location3_name: getTranslationByKey('tentacle-3-u'), location3_hp_max_base_mod: 0,
                location4_table_start: 7, location4_table_end: 8, location4_name: getTranslationByKey('tentacle-4-u'), location4_hp_max_base_mod: 0,
                location5_table_start: 9, location5_table_end: 10, location5_name: getTranslationByKey('tentacle-5-u'), location5_hp_max_base_mod: 0,
                location6_table_start: 11, location6_table_end: 12, location6_name: getTranslationByKey('tentacle-6-u'), location6_hp_max_base_mod: 0,
                location7_table_start: 13, location7_table_end: 14, location7_name: getTranslationByKey('tentacle-7-u'), location7_hp_max_base_mod: 0,
                location8_table_start: 15, location8_table_end: 16, location8_name: getTranslationByKey('tentacle-8-u'), location8_hp_max_base_mod: 0,
                location9_table_start: 17, location9_table_end: 18, location9_name: getTranslationByKey('body-u'), location9_hp_max_base_mod: 1,
                location10_table_start: 19, location10_table_end: 20, location10_name: getTranslationByKey('head-u'), location10_hp_max_base_mod: 2,
                location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: negative_hp_max_base,
                location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: negative_hp_max_base,
                location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 1, location11_display: 0, location12_display: 0,
                location_notes_1_display: 0, location_notes_7_display: 0, location_notes_8_display: 0, location_notes_9_display: 0, location_notes_10_display: 1
            });
        } else if (v.hit_locations === "pachyderm") {
            setAttrs({
                location1_table_start: 1, location1_table_end: 2, location1_name: getTranslationByKey('rear-right-leg-u'), location1_hp_max_base_mod: 0,
                location2_table_start: 3, location2_table_end: 4, location2_name: getTranslationByKey('rear-left-leg-u'), location2_hp_max_base_mod: 0,
                location3_table_start: 5, location3_table_end: 8, location3_name: getTranslationByKey('hindquarters-u'), location3_hp_max_base_mod: 1,
                location4_table_start: 9, location4_table_end: 12, location4_name: getTranslationByKey('forequarters-u'), location4_hp_max_base_mod: 2,
                location5_table_start: 13, location5_table_end: 14, location5_name: getTranslationByKey('front-right-leg-u'), location5_hp_max_base_mod: 0,
                location6_table_start: 15, location6_table_end: 16, location6_name: getTranslationByKey('front-left-leg-u'), location6_hp_max_base_mod: 0,
                location7_table_start: 17, location7_table_end: 17, location7_name: getTranslationByKey('trunk-u'), location7_hp_max_base_mod: -1,
                location8_table_start: 18, location8_table_end: 20, location8_name: getTranslationByKey('head-u'), location8_hp_max_base_mod: 0,
                location9_table_start: 0, location9_table_end: 0, location9_name: " ", location9_hp_max_base_mod: negative_hp_max_base,
                location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: negative_hp_max_base,
                location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: negative_hp_max_base,
                location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: negative_hp_max_base,
                location2to7_display: 1, location8_display: 1, location9_display: 0, location10_display: 0, location11_display: 0, location12_display: 0,
                location_notes_1_display: 0, location_notes_7_display: 0, location_notes_8_display: 1, location_notes_9_display: 0, location_notes_10_display: 0
            });
        } else if (v.hit_locations === "quadruped") {
            setAttrs({
                location1_table_start: 1, location1_table_end: 2, location1_name: getTranslationByKey('rear-right-leg-u'), location1_hp_max_base_mod: 0,
                location2_table_start: 3, location2_table_end: 4, location2_name: getTranslationByKey('rear-left-leg-u'), location2_hp_max_base_mod: 0,
                location3_table_start: 5, location3_table_end: 7, location3_name: getTranslationByKey('hindquarters-u'), location3_hp_max_base_mod: 1,
                location4_table_start: 8, location4_table_end: 10, location4_name: getTranslationByKey('forequarters-u'), location4_hp_max_base_mod: 2,
                location5_table_start: 11, location5_table_end: 13, location5_name: getTranslationByKey('front-right-leg-u'), location5_hp_max_base_mod: 0,
                location6_table_start: 14, location6_table_end: 16, location6_name: getTranslationByKey('front-left-leg-u'), location6_hp_max_base_mod: 0,
                location7_table_start: 17, location7_table_end: 20, location7_name: getTranslationByKey('head-u'), location7_hp_max_base_mod: 0,
                location8_table_start: 0, location8_table_end: 0, location8_name: " ", location8_hp_max_base_mod: negative_hp_max_base,
                location9_table_start: 0, location9_table_end: 0, location9_name: " ", location9_hp_max_base_mod: negative_hp_max_base,
                location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: negative_hp_max_base,
                location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: negative_hp_max_base,
                location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: negative_hp_max_base,
                location2to7_display: 1, location8_display: 0, location9_display: 0, location10_display: 0, location11_display: 0, location12_display: 0,
                location_notes_1_display: 0, location_notes_7_display: 1, location_notes_8_display: 0, location_notes_9_display: 0, location_notes_10_display: 0
            });
        } else if (v.hit_locations === "serpentine") {
            setAttrs({
                location1_table_start: 1, location1_table_end: 3, location1_name: getTranslationByKey('tail-tip-u'), location1_hp_max_base_mod: 0,
                location2_table_start: 4, location2_table_end: 5, location2_name: getTranslationByKey('mid-end-length-u'), location2_hp_max_base_mod: 0,
                location3_table_start: 6, location3_table_end: 7, location3_name: getTranslationByKey('fore-end-length-u'), location3_hp_max_base_mod: 0,
                location4_table_start: 8, location4_table_end: 9, location4_name: getTranslationByKey('rear-mid-length-u'), location4_hp_max_base_mod: 1,
                location5_table_start: 10, location5_table_end: 12, location5_name: getTranslationByKey('mid-mid-length-u'), location5_hp_max_base_mod: 1,
                location6_table_start: 13, location6_table_end: 14, location6_name: getTranslationByKey('fore-mid-length-u'), location6_hp_max_base_mod: 1,
                location7_table_start: 15, location7_table_end: 16, location7_name: getTranslationByKey('rear-fore-length-u'), location7_hp_max_base_mod: 0,
                location8_table_start: 17, location8_table_end: 18, location8_name: getTranslationByKey('mid-fore-length-u'), location8_hp_max_base_mod: 0,
                location9_table_start: 19, location9_table_end: 20, location9_name: getTranslationByKey('head-u'), location9_hp_max_base_mod: 0,
                location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: negative_hp_max_base,
                location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: negative_hp_max_base,
                location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: negative_hp_max_base,
                location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 0, location11_display: 0, location12_display: 0,
                location_notes_1_display: 0, location_notes_7_display: 0, location_notes_8_display: 0, location_notes_9_display: 1, location_notes_10_display: 0
            });
        } else if (v.hit_locations === "tailed_arachnid") {
            setAttrs({
                location1_table_start: 1, location1_table_end: 2, location1_name: getTranslationByKey('tail-u'), location1_hp_max_base_mod: 0,
                location2_table_start: 3, location2_table_end: 3, location2_name: getTranslationByKey('rear-right-leg-u'), location2_hp_max_base_mod: -1,
                location3_table_start: 4, location3_table_end: 4, location3_name: getTranslationByKey('rear-left-leg-u'), location3_hp_max_base_mod: -1,
                location4_table_start: 5, location4_table_end: 5, location4_name: getTranslationByKey('mid-right-leg-u'), location4_hp_max_base_mod: -1,
                location5_table_start: 6, location5_table_end: 6, location5_name: getTranslationByKey('mid-left-leg-u'), location5_hp_max_base_mod: -1,
                location6_table_start: 7, location6_table_end: 7, location6_name: getTranslationByKey('fore-right-leg-u'), location6_hp_max_base_mod: -1,
                location7_table_start: 8, location7_table_end: 8, location7_name: getTranslationByKey('fore-left-leg-u'), location7_hp_max_base_mod: -1,
                location8_table_start: 9, location8_table_end: 12, location8_name: getTranslationByKey('thorax-u'), location8_hp_max_base_mod: 1,
                location9_table_start: 13, location9_table_end: 15, location9_name: getTranslationByKey('right-pincer-u'), location9_hp_max_base_mod: 0,
                location10_table_start: 16, location10_table_end: 18, location10_name: getTranslationByKey('left-pincer-u'), location10_hp_max_base_mod: 0,
                location11_table_start: 19, location11_table_end: 20, location11_name: getTranslationByKey('cephalothorax-u'), location11_hp_max_base_mod: 2,
                location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: negative_hp_max_base,
                location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 1, location11_display: 1, location12_display: 0,
                location_notes_1_display: 0, location_notes_7_display: 0, location_notes_8_display: 0, location_notes_9_display: 0, location_notes_10_display: 0
            });
        } else if (v.hit_locations === "tailed_biped") {
            setAttrs({
                location1_table_start: 1, location1_table_end: 3, location1_name: getTranslationByKey('tail-u'), location1_hp_max_base_mod: 0,
                location2_table_start: 4, location2_table_end: 5, location2_name: getTranslationByKey('right-leg-u'), location2_hp_max_base_mod: 0,
                location3_table_start: 6, location3_table_end: 7, location3_name: getTranslationByKey('left-leg-u'), location3_hp_max_base_mod: 0,
                location4_table_start: 8, location4_table_end: 10, location4_name: getTranslationByKey('abdomen-u'), location4_hp_max_base_mod: 1,
                location5_table_start: 11, location5_table_end: 14, location5_name: getTranslationByKey('chest-u'), location5_hp_max_base_mod: 2,
                location6_table_start: 15, location6_table_end: 16, location6_name: getTranslationByKey('right-arm-u'), location6_hp_max_base_mod: -1,
                location7_table_start: 17, location7_table_end: 18, location7_name: getTranslationByKey('left-arm-u'), location7_hp_max_base_mod: -1,
                location8_table_start: 19, location8_table_end: 20, location8_name: getTranslationByKey('head-u'), location8_hp_max_base_mod: 0,
                location9_table_start: 0, location9_table_end: 0, location9_name: " ", location9_hp_max_base_mod: negative_hp_max_base,
                location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: negative_hp_max_base,
                location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: negative_hp_max_base,
                location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: negative_hp_max_base,
                location2to7_display: 1, location8_display: 1, location9_display: 0, location10_display: 0, location11_display: 0, location12_display: 0,
                location_notes_1_display: 0, location_notes_7_display: 0, location_notes_8_display: 1, location_notes_9_display: 0, location_notes_10_display: 0
            });
        } else if (v.hit_locations === "tailed_quadruped") {
            setAttrs({
                location1_table_start: 1, location1_table_end: 3, location1_name: getTranslationByKey('tail-u'), location1_hp_max_base_mod: 0,
                location2_table_start: 4, location2_table_end: 5, location2_name: getTranslationByKey('rear-right-leg-u'), location2_hp_max_base_mod: 0,
                location3_table_start: 6, location3_table_end: 7, location3_name: getTranslationByKey('rear-left-leg-u'), location3_hp_max_base_mod: 0,
                location4_table_start: 8, location4_table_end: 10, location4_name: getTranslationByKey('hindquarters-u'), location4_hp_max_base_mod: 1,
                location5_table_start: 11, location5_table_end: 14, location5_name: getTranslationByKey('forequarters-u'), location5_hp_max_base_mod: 2,
                location6_table_start: 15, location6_table_end: 16, location6_name: getTranslationByKey('front-right-leg-u'), location6_hp_max_base_mod: -1,
                location7_table_start: 17, location7_table_end: 18, location7_name: getTranslationByKey('front-left-leg-u'), location7_hp_max_base_mod: -1,
                location8_table_start: 19, location8_table_end: 20, location8_name: getTranslationByKey('head-u'), location8_hp_max_base_mod: 0,
                location9_table_start: 0, location9_table_end: 0, location9_name: " ", location9_hp_max_base_mod: negative_hp_max_base,
                location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: negative_hp_max_base,
                location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: negative_hp_max_base,
                location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: negative_hp_max_base,
                location2to7_display: 1, location8_display: 1, location9_display: 0, location10_display: 0, location11_display: 0, location12_display: 0,
                location_notes_1_display: 0, location_notes_7_display: 0, location_notes_8_display: 1, location_notes_9_display: 0, location_notes_10_display: 0
            });
        } else if (v.hit_locations === "winged_biped") {
            setAttrs({
                location1_table_start: 1, location1_table_end: 3, location1_name: getTranslationByKey('right-leg-u'), location1_hp_max_base_mod: 0,
                location2_table_start: 4, location2_table_end: 6, location2_name: getTranslationByKey('left-leg-u'), location2_hp_max_base_mod: 0,
                location3_table_start: 7, location3_table_end: 9, location3_name: getTranslationByKey('abdomen-u'), location3_hp_max_base_mod: 1,
                location4_table_start: 10, location4_table_end: 10, location4_name: getTranslationByKey('chest-u'), location4_hp_max_base_mod: 2,
                location5_table_start: 11, location5_table_end: 12, location5_name: getTranslationByKey('right-wing-u'), location5_hp_max_base_mod: 0,
                location6_table_start: 13, location6_table_end: 14, location6_name: getTranslationByKey('left-wing-u'), location6_hp_max_base_mod: 0,
                location7_table_start: 15, location7_table_end: 16, location7_name: getTranslationByKey('right-arm-u'), location7_hp_max_base_mod: -1,
                location8_table_start: 17, location8_table_end: 18, location8_name: getTranslationByKey('left-arm-u'), location8_hp_max_base_mod: -1,
                location9_table_start: 19, location9_table_end: 20, location9_name: getTranslationByKey('head-u'), location9_hp_max_base_mod: 0,
                location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: negative_hp_max_base,
                location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: negative_hp_max_base,
                location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: negative_hp_max_base,
                location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 0, location11_display: 0, location12_display: 0,
                location_notes_1_display: 0, location_notes_7_display: 0, location_notes_8_display: 0, location_notes_9_display: 1, location_notes_10_display: 0
            });
        } else if (v.hit_locations === "winged_insect") {
            setAttrs({
                location1_table_start: 1, location1_table_end: 1, location1_name: getTranslationByKey('rear-right-leg-u'), location1_hp_max_base_mod: -1,
                location2_table_start: 2, location2_table_end: 2, location2_name: getTranslationByKey('rear-left-leg-u'), location2_hp_max_base_mod: -1,
                location3_table_start: 3, location3_table_end: 4, location3_name: getTranslationByKey('metathorax-u'), location3_hp_max_base_mod: 1,
                location4_table_start: 5, location4_table_end: 5, location4_name: getTranslationByKey('mid-right-leg-u'), location4_hp_max_base_mod: -1,
                location5_table_start: 6, location5_table_end: 6, location5_name: getTranslationByKey('mid-left-leg-u'), location5_hp_max_base_mod: -1,
                location6_table_start: 7, location6_table_end: 10, location6_name: getTranslationByKey('prothorax-u'), location6_hp_max_base_mod: 2,
                location7_table_start: 11, location7_table_end: 12, location7_name: getTranslationByKey('right-wing-u'), location7_hp_max_base_mod: -1,
                location8_table_start: 13, location8_table_end: 14, location8_name: getTranslationByKey('left-wing-u'), location8_hp_max_base_mod: -1,
                location9_table_start: 15, location9_table_end: 16, location9_name: getTranslationByKey('front-right-leg-u'), location9_hp_max_base_mod: -1,
                location10_table_start: 17, location10_table_end: 18, location10_name: getTranslationByKey('front-left-leg-u'), location10_hp_max_base_mod: -1,
                location11_table_start: 19, location11_table_end: 20, location11_name: getTranslationByKey('head-u'), location11_hp_max_base_mod: 0,
                location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: negative_hp_max_base,
                location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 1, location11_display: 1, location12_display: 0,
                location_notes_1_display: 0, location_notes_7_display: 0, location_notes_8_display: 0, location_notes_9_display: 0, location_notes_10_display: 0
            });
        } else if (v.hit_locations === "winged_quadruped") {
            setAttrs({
                location1_table_start: 1, location1_table_end: 2, location1_name: getTranslationByKey('rear-right-leg-u'), location1_hp_max_base_mod: 0,
                location2_table_start: 3, location2_table_end: 4, location2_name: getTranslationByKey('rear-left-leg-u'), location2_hp_max_base_mod: 0,
                location3_table_start: 5, location3_table_end: 7, location3_name: getTranslationByKey('hindquarters-u'), location3_hp_max_base_mod: 1,
                location4_table_start: 8, location4_table_end: 10, location4_name: getTranslationByKey('forequarters-u'), location4_hp_max_base_mod: 2,
                location5_table_start: 11, location5_table_end: 12, location5_name: getTranslationByKey('right-wing-u'), location5_hp_max_base_mod: -1,
                location6_table_start: 13, location6_table_end: 14, location6_name: getTranslationByKey('left-wing-u'), location6_hp_max_base_mod: -1,
                location7_table_start: 15, location7_table_end: 16, location7_name: getTranslationByKey('front-right-leg-u'), location7_hp_max_base_mod: 0,
                location8_table_start: 17, location8_table_end: 18, location8_name: getTranslationByKey('front-left-leg-u'), location8_hp_max_base_mod: 0,
                location9_table_start: 19, location9_table_end: 20, location9_name: getTranslationByKey('head-u'), location9_hp_max_base_mod: 0,
                location10_table_start: 0, location10_table_end: 0, location10_name: " ", location10_hp_max_base_mod: negative_hp_max_base,
                location11_table_start: 0, location11_table_end: 0, location11_name: " ", location11_hp_max_base_mod: negative_hp_max_base,
                location12_table_start: 0, location12_table_end: 0, location12_name: " ", location12_hp_max_base_mod: negative_hp_max_base,
                location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 0, location11_display: 0, location12_display: 0,
                location_notes_1_display: 0, location_notes_7_display: 0, location_notes_8_display: 0, location_notes_9_display: 1, location_notes_10_display: 0
            });
        } else {
            setAttrs({
                location1_table_start: 0, location1_table_end: 0, location1_name: "", location1_hp_max_base_mod: negative_hp_max_base,
                location2_table_start: 0, location2_table_end: 0, location2_name: "", location2_hp_max_base_mod: negative_hp_max_base,
                location3_table_start: 0, location3_table_end: 0, location3_name: "", location3_hp_max_base_mod: negative_hp_max_base,
                location4_table_start: 0, location4_table_end: 0, location4_name: "", location4_hp_max_base_mod: negative_hp_max_base,
                location5_table_start: 0, location5_table_end: 0, location5_name: "", location5_hp_max_base_mod: negative_hp_max_base,
                location6_table_start: 0, location6_table_end: 0, location6_name: "", location6_hp_max_base_mod: negative_hp_max_base,
                location7_table_start: 0, location7_table_end: 0, location7_name: "", location7_hp_max_base_mod: negative_hp_max_base,
                location8_table_start: 0, location8_table_end: 0, location8_name: "", location8_hp_max_base_mod: negative_hp_max_base,
                location9_table_start: 0, location9_table_end: 0, location9_name: "", location9_hp_max_base_mod: negative_hp_max_base,
                location10_table_start: 0, location10_table_end: 0, location10_name: "", location10_hp_max_base_mod: negative_hp_max_base,
                location11_table_start: 0, location11_table_end: 0, location11_name: "", location11_hp_max_base_mod: negative_hp_max_base,
                location12_table_start: 0, location12_table_end: 0, location12_name: "", location12_hp_max_base_mod: negative_hp_max_base,
                location2to7_display: 1, location8_display: 1, location9_display: 1, location10_display: 1, location11_display: 1, location12_display: 1,
                location_notes_1_display: 0, location_notes_7_display: 0, location_notes_8_display: 0, location_notes_9_display: 0, location_notes_10_display: 0
            });
        }
    });
});

//Simplified combat sets hit locations
// See simplified combat in the settings scripts

// =Encumbrance

// =Fatigue
const calc_fatigue = function() {
    getAttrs(["fatigue", "healing_rate"], function(v) {
        const healing_rate = parseInt(v.healing_rate);
        const fatigue = parseInt(v.fatigue);
        const fatigue_skills = ['5', '5', '4', '3', '3', '2', '2', '1', '1', '0'];
        const movement_rate_fatigue = ['*0', '*0', '*0', '*0', '*.5', '*.5', '-2', '-1', '+0', '+0'];
        const fatigue_recovery = ['-', 48, 36, 24, 18, 12, 6, 3, .25, 0];
        let fatigue_recovery_final = '-';
        const action_points_fatigue = ['na', 'na','na', '-3', '-2', '-1', '0', '0', '0', '0'];
        const initiative_bonus_fatigue = ['-99', '-99','-99', '-8', '-6', '-4', '-2', '0', '0', '0'];

        if(fatigue_recovery[fatigue] !== '-') {
            fatigue_recovery_final = fatigue_recovery[fatigue] / healing_rate;
        }

        setAttrs({
            fatigue_skills: fatigue_skills[fatigue],
            movement_rate_fatigue: movement_rate_fatigue[fatigue],
            fatigue_recovery: fatigue_recovery_final,
            action_points_fatigue: action_points_fatigue[fatigue],
            initiative_bonus_fatigue: initiative_bonus_fatigue[fatigue]
        });
    });
};
on("change:fatigue", function() { calc_fatigue(); });

// =Skills
// Generic Skill function
const calc_skill = (skill) => {
    getAttrs(['str', 'con', 'dex', 'int', 'pow', 'cha', `${skill}_char1`, `${skill}_char2`, `${skill}_experience`, `${skill}_other`], function(v) {
        console.log("Calculating skill " + skill);
        let setObj = {};
        let char1_value = 0;
        let char2_value = 0;
        let skill_enc_value = 0;

        if (v[`${skill}_char1`] === "@{str}") {
            char1_value = parseInt(v.str);
            skill_enc_value = 1;
        } else if (v[`${skill}_char1`] === "@{con}") {
            char1_value = parseInt(v.con);
        } else if (v[`${skill}_char1`] === "@{dex}") {
            char1_value = parseInt(v.dex);
            skill_enc_value = 1;
        } else if (v[`${skill}_char1`] === "@{siz}") {
            char1_value = parseInt(v.siz);
        } else if (v[`${skill}_char1`] === "@{int}") {
            char1_value = parseInt(v.int);
        } else if (v[`${skill}_char1`] === "@{pow}") {
            char1_value = parseInt(v.pow);
        } else if (v[`${skill}_char1`] === "@{cha}") {
            char1_value = parseInt(v.cha);
        } else if (v[`${skill}_char1`] === "21-@{int}") {
            char1_value = 21 - parseInt(v.int);
        }

        if (v[`${skill}_char2`] === "@{str}") {
            char2_value = parseInt(v.str);
            skill_enc_value = 1;
        } else if (v[`${skill}_char2`] === "@{con}") {
            char2_value = parseInt(v.con);
        } else if (v[`${skill}_char2`] === "@{dex}") {
            char2_value = parseInt(v.dex);
            skill_enc_value = 1;
        } else if (v[`${skill}_char2`] === "@{siz}") {
            char2_value = parseInt(v.siz);
        } else if (v[`${skill}_char2`] === "@{int}") {
            char2_value = parseInt(v.int);
        } else if (v[`${skill}_char2`] === "@{pow}") {
            char2_value = parseInt(v.pow);
        } else if (v[`${skill}_char2`] === "@{cha}") {
            char2_value = parseInt(v.cha);
        }

        setObj[skill + "_total"] = char1_value + char2_value + parseInt(v[`${skill}_experience`]) + parseInt(v[`${skill}_other`]);
        setObj[skill + "_encumbered"] = skill_enc_value;
        setObj[skill + "_id"] = skill;

        setAttrs(setObj);
    });
};
// Standard Skill Triggers
['athletics'].forEach(skill => {
    on(`change:str change:dex change:con change:siz change:int change:pow change:cha change:${skill}_char1 change:${skill}_char2 change:${skill}_experience change:${skill}_other`, function() { calc_skill(skill); });
});
// Professional Skill Triggers
on("change:repeating_professionalskill:char1 change:repeating_professionalskill:char2 change:repeating_professionalskill:experience change:repeating_professionalskill:other change:repeating_professionalskill:encumbered", function(event) {
    let sourceAttrSplit = event.sourceAttribute.split('_');
    calc_skill("repeating_professionalskill_" + sourceAttrSplit[2]);
});
on("change:str change:dex change:siz change:con change:int change:pow change:cha", function(event) {
    getSectionIDs("repeating_professionalskill", function(idarray) {
        if(idarray.length > 0) {
            _.each(idarray, function(id, i) {
                calc_skill("repeating_professionalskill_" + id);
            });
        }
    });
});

// =Passions
// Only calculated field is tenacity_dependencies, which is handled in calc_tenacity

// =Abilities
const calc_ability = (ability) => {
    getAttrs([`${ability}_roll_skill_id`, `${ability}_other_skill_id`, `${ability}_type`,`${ability}_traits`, 'character_name'], function(v) {
        let setObj = {};
        // Set the ID
        setObj[ability + "_id"] = ability;

        // Toggle shaping if sorcery type
        if (v[`${ability}_type`] === "sorcery_spell") {
            setObj[ability + "_show_shaping"] = 1;
            setObj[ability + "_shaping_traits"] = "{{combine=[[@{shaped_combine}]]}} @{shaped_duration} @{shaped_range} @{shaped_targets} {{ablation=[[@{shaped_ablation}]]}} {{focus=[[@{shaped_focus}]]}} {{fortune=[[@{shaped_fortune}]]}} {{precision=[[@{shaped_precision}]]}} {{swiftness=[[@{shaped_swiftness}]]}}";//{{cost=[[1+?{Components Shaped|0}+@{shaped_combine}]]}} {{time=[[?{Components Shaped|0}+1-@{shaped_swiftness}]]}}";
        } else {
            setObj[ability + "_show_shaping"] = 0;
            setObj[ability + "_shaping_traits"] = "";
        }

        // Set Traits display value
        setObj[ability + "_traits_display"] = v[`${ability}_traits`].replace(/\n/g, ", ");

        // Have to treat standard skill different to get the proper translation
        if (v[`${ability}_roll_skill_id`] === "") {
            setObj[ability + "_roll_skill_name"] = "";
            setObj[ability + "_roll_skill_value"] = "";
            setObj[ability + "_roll_skill_roll"] = "";
        } else if (v[`${ability}_roll_skill_id`].startsWith("repeating_")) {
            setObj[ability + "_roll_skill_name"] = "@{" + v[`${ability}_roll_skill_id`] + "_name}";
            setObj[ability + "_roll_skill_value"] = "@{" + v[`${ability}_roll_skill_id`] + "_total}";
            setObj[ability + "_roll_skill_roll"] = "%{" + v["character_name"] + "|" + v[`${ability}_roll_skill_id`] + "_roll}";
        } else {
            let rollTranslationKey = v[`${ability}_roll_skill_id`].replace(/_/g, "-") + "-u";
            setObj[ability + "_roll_skill_name"] = getTranslationByKey(rollTranslationKey);
            setObj[ability + "_roll_skill_value"] = "@{" + v[`${ability}_roll_skill_id`] + "_total}";
            setObj[ability + "_roll_skill_roll"] = "%{" + v["character_name"] + "|" + v[`${ability}_roll_skill_id`] + "_roll}";
        }


        // Have to treat standard skill different to get the proper translation
        if (v[`${ability}_other_skill_id`] === "") {
            setObj[ability + "_other_skill_name"] = "";
            setObj[ability + "_other_skill_value"] = "";
        } else if (v[`${ability}_other_skill_id`].startsWith("repeating_")) {
            setObj[ability + "_other_skill_name"] = "@{" + v[`${ability}_other_skill_id`] + "_name}";
            setObj[ability + "_other_skill_value"] = "@{" + v[`${ability}_other_skill_id`] + "_total}";
        } else {
            let otherTranslationKey = v[`${ability}_other_skill_id`].replace(/_/g, "-") + "-u";
            setObj[ability + "_other_skill_name"] = getTranslationByKey(otherTranslationKey);
            setObj[ability + "_other_skill_value"] = "@{" + v[`${ability}_other_skill_id`] + "_total}";
        }

        setAttrs(setObj);
    });
};
// Ability Triggers
on("change:repeating_ability", function(event) {
    let sourceAttrSplit = event.sourceAttribute.split('_');
    calc_ability("repeating_ability_" + sourceAttrSplit[2]);
});

// =Gear
const calc_gear_traits = (gear) => {
    getAttrs([`${gear}_traits`], function(v) {
        let setObj = {};

        // Set Traits display value
        setObj[gear + "_traits_display"] = v[`${gear}_traits`].replace(/\n/g, ", ");

        setAttrs(setObj);
    });
};
// Gear Triggers
on("change:repeating_equipment:traits", function(event) {
    let sourceAttrSplit = event.sourceAttribute.split('_');
    calc_gear_traits("repeating_equipment_" + sourceAttrSplit[2]);
});

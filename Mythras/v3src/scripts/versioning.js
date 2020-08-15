// ##### Versioning #####
// Upgrade Functions
function upgrade_1_9_1_to_2_0() {
    getAttrs(["fatigue", "action_points_swiftness", "damage_mod_mighty", "healing_rate_healthy", "hit_locations_robust", "cult_spirit_limit", "notes"], function(v) {
        var newattrs = {};

        // Copy notes to system notes
        if (v.notes) {
            newattrs["system_notes"] = v.notes;
        }

        // Convert cult Spirit Limit to number base and rename
        if (v.cult_spirit_limit === "ceil(@{cha}*.25)") {
            newattrs["animism_cult_rank"] = 1;
        } else if (v.cult_spirit_limit === "ceil(@{cha}*.5)") {
            newattrs["animism_cult_rank"] = 2;
        } else if (v.cult_spirit_limit === "ceil(@{cha}*.75)") {
            newattrs["animism_cult_rank"] = 3;
        } else if (v.cult_spirit_limit === "@{cha}") {
            newattrs["animism_cult_rank"] = 4;
        } else if (v.cult_spirit_limit === "@{cha}+0") {
            newattrs["animism_cult_rank"] = 5;
        } else {
            newattrs["animism_cult_rank"] = 1;
        }

        // Convert Fatigue to Number Base
        if(v["fatigue"] === "Fresh") {
            newattrs["fatigue"] = 9;
        }
        else if(v["fatigue"] === "Winded") {
            newattrs["fatigue"] = 8;
        }
        else if(v["fatigue"] === "Tired") {
            newattrs["fatigue"] = 7;
        }
        else if(v["fatigue"] === "Wearied") {
            newattrs["fatigue"] = 6;
        }
        else if(v["fatigue"] === "Exhausted") {
            newattrs["fatigue"] = 5;
        }
        else if(v["fatigue"] === "Debilitated") {
            newattrs["fatigue"] = 4;
        }
        else if(v["fatigue"] === "Incapacitated") {
            newattrs["fatigue"] = 3;
        }
        else if(v["fatigue"] === "Semi-Conscious") {
            newattrs["fatigue"] = 2;
        }
        else if(v["fatigue"] === "Comatose") {
            newattrs["fatigue"] = 1;
        }
        else if(v["fatigue"] === "Dead") {
            newattrs["fatigue"] = 0;
        }
        else {
            newattrs["fatigue"] = 9;
        }

        if (v.action_points_swiftness) {
            newattrs["action_points_add_one"] = v.action_points_swiftness;
        }
        if (v.damage_mod_mighty) {
            newattrs["damage_mod_add_pow"] = v.damage_mod_mighty;
        }
        if (v.healing_rate_healthy) {
            newattrs["healing_rate_double"] = v.healing_rate_healthy;
        }
        if (v.hit_locations_robust) {
            newattrs["hp_use_pow"] = v.hit_locations_robust;
        }

        setAttrs(newattrs);
    });

    getSectionIDs("repeating_mspower", function(idarray) {
        for(var i=0; i < idarray.length; i++) {
            var id = idarray[i];

            var old_name = "repeating_mspower_" + id + "_name";
            var old_fumbled = "repeating_mspower_" + id + "_fumbled";
            var old_trained = "repeating_mspower_" + id + "_trained";
            var old_augment = "repeating_mspower_" + id + "_augment";
            var old_penalty = "repeating_mspower_" + id + "_penalty";
            var old_sphere = "repeating_mspower_" + id + "_sphere";
            var old_arc = "repeating_mspower_" + id + "_arc";
            var old_details = "repeating_mspower_" + id + "_details";
            var old_experience = "repeating_mspower_" + id + "_experience";
            var old_other = "repeating_mspower_" + id + "_other";
            var old_cost = "repeating_mspower_" + id + "_cost";
            var old_description = "repeating_mspower_" + id + "_description";
            getAttrs([old_name, old_fumbled, old_trained, old_augment, old_penalty, old_sphere, old_arc, old_details, old_experience, old_other, old_cost, old_description], function(v) {
                var newrowid = generateRowID();
                var newrowattrs = {};

                if (v[old_name]) { newrowattrs["repeating_psionicpower_" + newrowid + "_name"] = v[old_name]; }
                if (v[old_fumbled]) { newrowattrs["repeating_psionicpower_" + newrowid + "_fumbled"] = v[old_fumbled]; }
                if (v[old_trained]) { newrowattrs["repeating_psionicpower_" + newrowid + "_trained"] = v[old_trained]; }
                if (v[old_augment]) { newrowattrs["repeating_psionicpower_" + newrowid + "_temp"] = v[old_augment]; }
                if (v[old_penalty]) { newrowattrs["repeating_psionicpower_" + newrowid + "_penalty"] = v[old_penalty]; }
                if (v[old_sphere]) { newrowattrs["repeating_psionicpower_" + newrowid + "_sphere"] = v[old_sphere]; }
                if (v[old_arc]) { newrowattrs["repeating_psionicpower_" + newrowid + "_arc"] = v[old_arc]; }
                if (v[old_details]) { newrowattrs["repeating_psionicpower_" + newrowid + "_details"] = v[old_details]; }
                if (v[old_experience]) { newrowattrs["repeating_psionicpower_" + newrowid + "_experience"] = v[old_experience]; }
                if (v[old_other]) { newrowattrs["repeating_psionicpower_" + newrowid + "_other"] = v[old_other]; }
                if (v[old_cost]) { newrowattrs["repeating_psionicpower_" + newrowid + "_cost"] = v[old_cost]; }
                if (v[old_description]) { newrowattrs["repeating_psionicpower_" + newrowid + "_description"] = v[old_description]; }
                setAttrs(newrowattrs);
            });
        }
    });

    getSectionIDs("repeating_ladiscipline", function(idarray) {
        for(var i=0; i < idarray.length; i++) {
            var id = idarray[i];

            var old_name = "repeating_ladiscipline_" + id + "_name";
            var old_fumbled = "repeating_ladiscipline_" + id + "_fumbled";
            var old_trained = "repeating_ladiscipline_" + id + "_trained";
            var old_augment = "repeating_ladiscipline_" + id + "_augment";
            var old_penalty = "repeating_ladiscipline_" + id + "_penalty";
            var old_details = "repeating_ladiscipline_" + id + "_details";
            var old_experience = "repeating_ladiscipline_" + id + "_experience";
            var old_other = "repeating_ladiscipline_" + id + "_other";
            var old_discipline_talents = "repeating_ladiscipline_" + id + "_discipline_talents";
            getAttrs([old_name, old_fumbled, old_trained, old_augment, old_penalty, old_details, old_experience, old_other, old_discipline_talents], function(v) {
                var newrowid = generateRowID();
                var newrowattrs = {};
                if (v[old_name]) { newrowattrs["repeating_discipline_" + newrowid + "_name"] = v[old_name]; }
                if (v[old_fumbled]) { newrowattrs["repeating_discipline_" + newrowid + "_fumbled"] = v[old_fumbled]; }
                if (v[old_trained]) { newrowattrs["repeating_discipline_" + newrowid + "_trained"] = v[old_trained]; }
                if (v[old_augment]) { newrowattrs["repeating_discipline_" + newrowid + "_temp"] = v[old_augment]; }
                if (v[old_penalty]) { newrowattrs["repeating_discipline_" + newrowid + "_penalty"] = v[old_penalty]; }
                if (v[old_details]) { newrowattrs["repeating_discipline_" + newrowid + "_details"] = v[old_details]; }
                if (v[old_experience]) { newrowattrs["repeating_discipline_" + newrowid + "_experience"] = v[old_experience]; }
                if (v[old_other]) { newrowattrs["repeating_discipline_" + newrowid + "_other"] = v[old_other]; }
                if (v[old_discipline_talents]) { newrowattrs["repeating_discipline_" + newrowid + "_discipline_talents"] = v[old_discipline_talents]; }
                setAttrs(newrowattrs);
            });
        }
    });

    getSectionIDs("repeating_latalent", function(idarray) {
        for(var i=0; i < idarray.length; i++) {
            var id = idarray[i];

            const old_name = "repeating_latalent_" + id + "_name";
            const old_description = "repeating_latalent_" + id + "_description";
            const old_intensity = "repeating_latalent_" + id + "_intensity";
            const old_range = "repeating_latalent_" + id + "_range";
            const old_duration = "repeating_latalent_" + id + "_duration";
            const old_area = "repeating_latalent_" + id + "_area";
            const old_cost = "repeating_latalent_" + id + "_cost";
            const old_resist = "repeating_latalent_" + id + "_resist";
            const old_damage = "repeating_latalent_" + id + "_damage";
            const old_macro = "repeating_latalent_" + id + "_macro";
            const old_details = "repeating_latalent_" + id + "_details";
            getAttrs([old_name, old_description, old_intensity, old_range, old_duration, old_area, old_cost, old_resist, old_damage, old_macro, old_details], function(v) {
                var newrowid = generateRowID();
                var newrowattrs = {};
                if (v[old_name]) { newrowattrs["repeating_psionictalent_" + newrowid + "_name"] = v[old_name]; }
                if (v[old_description]) { newrowattrs["repeating_psionictalent_" + newrowid + "_description"] = v[old_description]; }
                if (v[old_intensity]) {
                    newrowattrs["repeating_psionictalent_" + newrowid + "_intensity"] = v[old_intensity].replace("_ladiscipline_", "_discipline_");
                }
                if (v[old_range]) { newrowattrs["repeating_psionictalent_" + newrowid + "_range"] = v[old_range]; }
                if (v[old_duration]) { newrowattrs["repeating_psionictalent_" + newrowid + "_duration"] = v[old_duration]; }
                if (v[old_area]) { newrowattrs["repeating_psionictalent_" + newrowid + "_area"] = v[old_area]; }
                if (v[old_cost]) { newrowattrs["repeating_psionictalent_" + newrowid + "_cost"] = v[old_cost]; }
                if (v[old_resist]) { newrowattrs["repeating_psionictalent_" + newrowid + "_resist"] = v[old_resist]; }
                if (v[old_damage]) { newrowattrs["repeating_psionictalent_" + newrowid + "_damage"] = v[old_damage]; }
                if (v[old_macro]) { newrowattrs["repeating_psionictalent_" + newrowid + "_macro"] = v[old_macro]; }
                if (v[old_details]) { newrowattrs["repeating_psionictalent_" + newrowid + "_details"] = v[old_details]; }
                setAttrs(newrowattrs);
            });
        }
    });

    getSectionIDs("repeating_shield", function(idarray) {
        for(var i=0; i < idarray.length; i++) {
            var id = idarray[i];

            var old_name = "repeating_shield_" + id + "_name";
            var old_damage_mod_toggle = "repeating_shield_" + id + "_damage_mod_toggle";
            var old_damage = "repeating_shield_" + id + "_damage";
            var old_size = "repeating_shield_" + id + "_size";
            var old_reach = "repeating_shield_" + id + "_reach";
            var old_ap = "repeating_shield_" + id + "_ap";
            var old_hp = "repeating_shield_" + id + "_hp";
            var old_hp_max = "repeating_shield_" + id + "_hp_max";
            var old_notes = "repeating_shield_" + id + "_notes";
            var old_details = "repeating_shield_" + id + "_details";
            var old_enc = "repeating_shield_" + id + "_enc";
            getAttrs([old_name, old_damage_mod_toggle, old_damage, old_size, old_reach, old_ap, old_hp, old_details, old_hp_max, old_notes, old_enc], function(v) {
                var newrowid = generateRowID();
                var newrowattrs = {};

                if (v[old_name]) { newrowattrs["repeating_meleeweapon_" + newrowid + "_name"] = v[old_name]; }
                if (v[old_damage_mod_toggle]) { newrowattrs["repeating_meleeweapon_" + newrowid + "_damage_mod_toggle"] = v[old_damage_mod_toggle]; }
                if (v[old_damage]) { newrowattrs["repeating_meleeweapon_" + newrowid + "_damage"] = v[old_damage]; }
                if (v[old_size]) { newrowattrs["repeating_meleeweapon_" + newrowid + "_size"] = v[old_size]; }
                if (v[old_reach]) { newrowattrs["repeating_meleeweapon_" + newrowid + "_reach"] = v[old_reach]; }
                if (v[old_ap]) { newrowattrs["repeating_meleeweapon_" + newrowid + "_ap"] = v[old_ap]; }
                if (v[old_hp]) { newrowattrs["repeating_meleeweapon_" + newrowid + "_hp"] = v[old_hp]; }
                if (v[old_hp_max]) { newrowattrs["repeating_meleeweapon_" + newrowid + "_hp_max"] = v[old_hp_max]; }
                if (v[old_details]) { newrowattrs["repeating_meleeweapon_" + newrowid + "_details"] = v[old_details]; }
                if (v[old_notes]) { newrowattrs["repeating_meleeweapon_" + newrowid + "_notes"] = v[old_notes]; }
                if (v[old_enc]) { newrowattrs["repeating_meleeweapon_" + newrowid + "_enc"] = v[old_enc]; }
                setAttrs(newrowattrs);
            });
        }
    });

    getSectionIDs("repeating_firearm", function(idarray) {
        for(var i=0; i < idarray.length; i++) {
            var id = idarray[i];

            var old_name = "repeating_firearm_" + id + "_name";
            var old_damage = "repeating_firearm_" + id + "_damage";
            var old_fire_rate = "repeating_firearm_" + id + "_fire-rate";
            var old_range = "repeating_firearm_" + id + "_range";
            var old_ammo = "repeating_firearm_" + id + "_ammo";
            var old_ammo_max = "repeating_firearm_" + id + "_ammo_max";
            var old_load = "repeating_firearm_" + id + "_load";
            var old_notes = "repeating_firearm_" + id + "_notes";
            var old_details = "repeating_firearm_" + id + "_details";
            var old_enc = "repeating_firearm_" + id + "_enc";
            getAttrs([old_name, old_damage, old_fire_rate, old_range, old_ammo, old_ammo_max, old_details, old_load, old_notes, old_enc], function(v) {
                var newrowid = generateRowID();
                var newrowattrs = {};

                if (v[old_name]) { newrowattrs["repeating_rangedweapon_" + newrowid + "_name"] = v[old_name]; }
                if (v[old_damage]) { newrowattrs["repeating_rangedweapon_" + newrowid + "_damage"] = v[old_damage]; }
                if (v[old_fire_rate]) { newrowattrs["repeating_rangedweapon_" + newrowid + "_rate"] = v[old_fire_rate]; }
                if (v[old_range]) { newrowattrs["repeating_rangedweapon_" + newrowid + "_range"] = v[old_range]; }
                if (v[old_ammo]) { newrowattrs["repeating_rangedweapon_" + newrowid + "_ammo"] = v[old_ammo]; }
                if (v[old_ammo_max]) { newrowattrs["repeating_rangedweapon_" + newrowid + "_ammo_max"] = v[old_ammo_max]; }
                if (v[old_load]) { newrowattrs["repeating_rangedweapon_" + newrowid + "_load"] = v[old_load]; }
                if (v[old_details]) { newrowattrs["repeating_rangedweapon_" + newrowid + "_details"] = v[old_details]; }
                if (v[old_notes]) { newrowattrs["repeating_rangedweapon_" + newrowid + "_notes"] = v[old_notes]; }
                if (v[old_enc]) { newrowattrs["repeating_rangedweapon_" + newrowid + "_enc"] = v[old_enc]; }
                setAttrs(newrowattrs);
            });
        }
    });

    getSectionIDs("repeating_missileweapon", function(idarray) {
        for(var i=0; i < idarray.length; i++) {
            var id = idarray[i];

            var old_name = "repeating_missileweapon_" + id + "_name";
            var old_damage_mod_toggle = "repeating_shield_" + id + "_damage_mod_toggle";
            var old_damage = "repeating_missileweapon_" + id + "_damage";
            var old_force = "repeating_missileweapon_" + id + "_force";
            var old_range = "repeating_missileweapon_" + id + "_range";
            var old_impale_size = "repeating_missileweapon_" + id + "_impale_size";
            var old_ap = "repeating_missileweapon_" + id + "_ap";
            var old_load = "repeating_missileweapon_" + id + "_load";
            var old_notes = "repeating_missileweapon_" + id + "_notes";
            var old_details = "repeating_missileweapon_" + id + "_details";
            var old_enc = "repeating_missileweapon_" + id + "_enc";
            var old_hp = "repeating_missileweapon_" + id + "_hp";
            var old_hp_max = "repeating_missileweapon_" + id + "_hp_max";
            getAttrs([old_name, old_damage_mod_toggle, old_damage, old_force, old_range, old_impale_size, old_ap, old_details, old_load, old_notes, old_enc, old_hp, old_hp_max], function(v) {
                var newrowid = generateRowID();
                var newrowattrs = {};

                if (v[old_name]) { newrowattrs["repeating_rangedweapon_" + newrowid + "_name"] = v[old_name]; }
                if (v[old_damage_mod_toggle]) {
                    if (v[old_damage_mod_toggle] == "@{damage_mod}") {
                        newrowattrs["repeating_rangedweapon_" + newrowid + "_damage_mod_toggle"] = 1;
                    } else {
                        newrowattrs["repeating_rangedweapon_" + newrowid + "_damage_mod_toggle"] = v[old_damage_mod_toggle];
                    }
                }
                if (v[old_damage]) { newrowattrs["repeating_rangedweapon_" + newrowid + "_damage"] = v[old_damage]; }
                if (v[old_force]) { newrowattrs["repeating_rangedweapon_" + newrowid + "_force"] = v[old_force]; }
                if (v[old_range]) { newrowattrs["repeating_rangedweapon_" + newrowid + "_range"] = v[old_range]; }
                if (v[old_impale_size]) { newrowattrs["repeating_rangedweapon_" + newrowid + "_impale_size"] = v[old_impale_size]; }
                if (v[old_ap]) { newrowattrs["repeating_rangedweapon_" + newrowid + "_ap"] = v[old_ap]; }
                if (v[old_load]) { newrowattrs["repeating_rangedweapon_" + newrowid + "_load"] = v[old_load]; }
                if (v[old_details]) { newrowattrs["repeating_rangedweapon_" + newrowid + "_details"] = v[old_details]; }
                if (v[old_notes]) { newrowattrs["repeating_rangedweapon_" + newrowid + "_notes"] = v[old_notes]; }
                if (v[old_enc]) { newrowattrs["repeating_rangedweapon_" + newrowid + "_enc"] = v[old_enc]; }
                if (v[old_hp]) { newrowattrs["repeating_rangedweapon_" + newrowid + "_hp"] = v[old_hp]; }
                if (v[old_hp_max]) { newrowattrs["repeating_rangedweapon_" + newrowid + "_hp_max"] = v[old_hp_max]; }
                setAttrs(newrowattrs);
            });
        }
    });

    // Convert Learned to Sheet workers
    getAttrs(["arcane_casting_learned", "channel_learned", "fata_learned", "folk_magic_learned", "trance_learned", "exhort_learned", "type"], function(v) {
        var newvattrs = {};

        if (v.arcane_casting_learned) {
            if (v.arcane_casting_learned == "@{arcane_casting_base}") {
                newattrs["arcane_casting_learned"] = 1;
            }
        }

        if (v.channel_learned) {
            if (v.channel_learned == "@{channel_base}") {
                newattrs["channel_learned"] = 1;
            }
        }

        if (v.fata_learned) {
            if (v.fata_learned == "@{fata_base}") {
                newattrs["fata_learned"] = 1;
            }
        }

        if (v.folk_magic_learned) {
            if (v.folk_magic_learned == "@{folk_magic_base}") {
                newattrs["folk_magic_learned"] = 1;
            }
        }

        if (v.trance_learned) {
            if (v.trance_learned == "@{trance_base}") {
                newattrs["trance_learned"] = 1;
            }
        }

        if (v.exhort_learned) {
            if (v.exhort_learned == "@{exhort_base}") {
                newattrs["exhort_learned"] = 1;
            }
        }

        if (v.type) {
            if (v.type == "npc") {
                newattrs["type"] = "pc";
            }
        }

        setAttrs(newvattrs);
    });

    // Recalc Chars
    console.log("recalc fatigue");
    calc_fatigue();

    console.log("recalc str");
    calc_str();

    console.log("recalc deps");
    getSectionIDs("repeating_dependency", function(idarray) {
        if(idarray.length > 0) {
            _.each(idarray, function(currentID, i) {
                calc_passion("repeating_dependency_" + currentID);
            });
        }
    });

    console.log("recalc dex");
    calc_con();

    // Run calc for skills there really need it first
    console.log("recalc status");
    calc_skill("status", "0", "0", 1);

    console.log("recalc con");
    calc_siz();

    console.log("recalc passions");
    getSectionIDs("repeating_passion", function(idarray) {
        if(idarray.length > 0) {
            _.each(idarray, function(currentID, i) {
                calc_passion("repeating_passion_" + currentID);
            });
        }
    });

    console.log("recalc siz");
    calc_dex();

    console.log("recalc affiliations");
    getSectionIDs("repeating_affiliation", function(idarray) {
        if(idarray.length > 0) {
            _.each(idarray, function(currentID, i) {
                calc_skill("repeating_affiliation_" + currentID, "0", "0", 1);
            });
        }
    });

    console.log("recalc int");
    calc_int();

    console.log("recalc melee enc");
    calc_melee_enc();

    console.log("recalc pow");
    calc_pow();

    console.log("recalc ranged enc")
    calc_ranged_enc();

    console.log("recalc cha");
    calc_cha();

}

function upgrade_2_1_to_2_2() {
    var newattrs = {};
    getAttrs(["hp_use_pow", "damage_mod_add_pow"], function(v) {
        console.log("Convert hp_use_pow to hp_calc");
        if(v["hp_use_pow"]) {
            newattrs["hp_calc"] = v["hp_use_pow"];
        } else {
            newattrs["hp_calc"] = "0";
        }

        console.log("Convert damage_mod_add_pow to damage_mod_calc");
        if(v["damage_mod_add_pow"]) {
            newattrs["damage_mod_calc"] = v["damage_mod_add_pow"];
        } else {
            newattrs["damage_mod_calc"] = "0";
        }

        setAttrs(newattrs);
    });

    calc_hp_max_base();
    calc_simplified_hp();
    calc_damage_mod();
    calc_initiative();
}

function upgrade_2_7_to_3_0() {
    var newattrs = {};
    /* Ensure Thennala Style is updated to Default */
    getAttrs(["hp_use_pow", "damage_mod_add_pow"], function(v) {

        setAttrs(newattrs);
    });
}

var versioning = function() {
    getAttrs(["version"], function(v) {
        console.log("Current Sheet Version = " + v["version"]);
        if(v["version"] === "1.9.1") {
            console.log("upgrading to v2.0");
            upgrade_1_9_1_to_2_0();
            setAttrs({version: "2.0"});
            versioning();
        }
        else if(v["version"] === "2.0.0") {
            setAttrs({version: "2.0"});
            versioning();
        }
        else if(v["version"] === "2") {
            setAttrs({version: "2.0"});
            versioning();
        }
        else if(v["version"] === "2.0") {
            console.log("upgrading to v2.1");
            setAttrs({version: "2.1"});
            versioning();
        }
        else if(v["version"] === "2.1") {
            console.log("upgrading to v2.2");
            upgrade_2_1_to_2_2();
            setAttrs({version: "2.2"});
            versioning();
        }
        else if(v["version"] === "2.2") {
            console.log("upgrading to v2.3");
            setAttrs({version: "2.3"});
            versioning();
        }
        else if(v["version"] === "2.3") {
            console.log("upgrading to v2.4");
            setAttrs({version: "2.4"});
            versioning();
        }
        else if(v["version"] === "2.4") {
            console.log("upgrading to v2.5");
            setAttrs({version: "2.5"});
            versioning();
        }
        else if(v["version"] === "2.5") {
            console.log("upgrading to v2.6");
            calc_confidence();
            calc_social_initiative();
            calc_composure();
            calc_integrity();
            calc_resolve();
            setAttrs({version: "2.6"});
            versioning();
        }
        else if(v["version"] === "2.6") {
            console.log("upgrading to v2.7");
            setAttrs({version: "2.7"});
            versioning();
        }
        /*else if(v["version"] === "2.7") {
            console.log("upgrading to v3.0");
            setAttrs({version: "3.0"});
            versioning();
        }*/
        else {
            console.log("Sheet fully updated");
        }
    });
}

//Check for sheet version updates
on("sheet:opened", function() {
    console.log("Checking sheet versions")
    versioning();
});
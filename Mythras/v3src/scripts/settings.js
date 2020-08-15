// Campaign Options
const campaign_options = function() {
    getAttrs(["setting_option", "luck_points_rank_option", "the_soot_standard_option", "extended_conflict_enabled_option", "magic_points_enabled_option", "power_points_enabled_option", "prana_points_enabled_option", "strangeness_enabled_option", "tenacity_enabled_option", "simplified_combat_enabled_option", "dependencies_enabled_option", "peculiarities_enabled_option", "herculean_mod_option"], function(v) {
        let newoptions = {};
        // Default Setting Configs
        let setting_configs = {
            luck_points_rank: "0",
            the_soot_standard: "0",
            extended_conflict_enabled: "0",
            magic_points_enabled: "1",
            power_points_enabled: "0",
            prana_points_enabled: "0",
            strangeness_enabled: "0",
            tenacity_enabled: "0",
            simplified_combat_enabled: "0",
            dependencies_enabled: "0",
            peculiarities_enabled: "0",
            herculean_mod: .1
        };
        // Setting Overrides
        if(v["setting_option"] === "luther_arkwright") {
            setting_configs["magic_points_enabled"] = "0";
            setting_configs["prana_points_enabled"] = "1";
            setting_configs["tenacity_enabled"] = "1";
            setting_configs["dependencies_enabled"] = "1";
        } else if(v["setting_option"] === "agony_and_ecstasy") {
            setting_configs["magic_points_enabled"] = "0";
            setting_configs["power_points_enabled"] = "1";
        } else if(v["setting_option"] === "worlds_united") {
            setting_configs["magic_points_enabled"] = "0";
            setting_configs["tenacity_enabled"] = "1";
        } else if(v["setting_option"] === "classic_fantasy") {
            setting_configs["luck_points_rank"] = "1";
        } else if(v["setting_option"] === "m-space") {
            setting_configs["extended_conflict_enabled"] = "1";
            setting_configs["magic_points_enabled"] = "0";
            setting_configs["power_points_enabled"] = "1";
            setting_configs["strangeness_enabled"] = "1";
            setting_configs["herculean_mod"] = ".2";
        } else if(v["setting_option"] === "odd_soot") {
            setting_configs["the_soot_standard"] = "1";
            setting_configs["extended_conflict_enabled"] = "1";
            setting_configs["magic_points_enabled"] = "0";
            setting_configs["power_points_enabled"] = "1";
            setting_configs["strangeness_enabled"] = "1";
            setting_configs["peculiarities_enabled"] = "1";
            setting_configs["herculean_mod"] = ".2";
        } else if(v["setting_option"] === "monster_island") {
        } else if(v["setting_option"] === "mythic_britain") {
        } else if(v["setting_option"] === "thennla") {
        } else if(v["setting_option"] === "mythic_constantinople") {
        } else if(v["setting_option"] === "mythic_rome") {
        } else if(v["setting_option"] === "after_the_vampire_wars") {
        } else if(v["setting_option"] === "mythras_imperative") {
            setting_configs["herculean_mod"] = ".2";
        }

        // Herculean Mod
        if(v["herculean_mod_option"] === "default") {
            newoptions["herculean_mod"] = setting_configs["herculean_mod"];
        } else {
            newoptions["herculean_mod"] = v["herculean_mod_option"];
        }

        // Add Rank to Luck
        if(v["luck_points_rank_option"] === "default") {
            newoptions["luck_points_rank"] = setting_configs["luck_points_rank"];
        } else {
            newoptions["luck_points_rank"] = v["luck_points_rank_option"];
        }

        // The Soot Standard
        if(v["the_soot_standard_option"] === "default") {
            newoptions["the_soot_standard"] = setting_configs["the_soot_standard"];
        } else {
            newoptions["the_soot_standard"] = v["the_soot_standard_option"];
        }

        // Extended Conflict Resolution Enabled
        if(v["extended_conflict_enabled_option"] === "default") {
            newoptions["extended_conflict_enabled"] = setting_configs["extended_conflict_enabled"];
        } else {
            newoptions["extended_conflict_enabled"] = v["extended_conflict_enabled_option"];
        }

        // Magic Points Enabled
        if(v["magic_points_enabled_option"] === "default") {
            newoptions["magic_points_enabled"] = setting_configs["magic_points_enabled"];
        } else {
            newoptions["magic_points_enabled"] = v["magic_points_enabled_option"];
        }

        // Power Points Enabled
        if(v["power_points_enabled_option"] === "default") {
            newoptions["power_points_enabled"] = setting_configs["power_points_enabled"];
        } else {
            newoptions["power_points_enabled"] = v["power_points_enabled_option"];
        }

        // Prana Points Enabled
        if(v["prana_points_enabled_option"] === "default") {
            newoptions["prana_points_enabled"] = setting_configs["prana_points_enabled"];
        } else {
            newoptions["prana_points_enabled"] = v["prana_points_enabled_option"];
        }

        // Strangeness Enabled
        if(v["strangeness_enabled_option"] === "default") {
            newoptions["strangeness_enabled"] = setting_configs["strangeness_enabled"];
        } else {
            newoptions["strangeness_enabled"] = v["strangeness_enabled_option"];
        }

        // Tenacity Enabled
        if(v["tenacity_enabled_option"] === "default") {
            newoptions["tenacity_enabled"] = setting_configs["tenacity_enabled"];
        } else {
            newoptions["tenacity_enabled"] = v["tenacity_enabled_option"];
        }

        // Simplified Combat Enabled
        if(v["simplified_combat_enabled_option"] === "default") {
            newoptions["simplified_combat_enabled"] = setting_configs["simplified_combat_enabled"];
        } else {
            newoptions["simplified_combat_enabled"] = v["simplified_combat_enabled_option"];
        }
        if(newoptions["simplified_combat_enabled"] === "0") {
            newoptions["hit_locations"] = "simplified";
        }

        // Dependencies Enabled
        if(v["dependencies_enabled_option"] === "default") {
            newoptions["dependencies_enabled"] = setting_configs["dependencies_enabled"];
        } else {
            newoptions["dependencies_enabled"] = v["dependencies_enabled_option"];
        }

        // Peculiarities Enabled
        if(v["peculiarities_enabled_option"] === "default") {
            newoptions["peculiarities_enabled"] = setting_configs["peculiarities_enabled"];
        } else {
            newoptions["peculiarities_enabled"] = v["peculiarities_enabled_option"];
        }

        setAttrs(newoptions);
    });
};

//Set campaign options if any change
on("change:setting_option change:luck_points_rank_option change:the_soot_standard_option change:extended_conflict_enabled_option change:magic_points_enabled_option change:power_points_enabled_option change:prana_points_enabled_option change:strangeness_enabled_option change:tenacity_enabled_option change:simplified_combat_enabled_option change:dependencies_enabled_option change:peculiarities_enabled_option change:herculean_mod_option", function() {
    console.log("Setting campaign options");
    campaign_options();
});

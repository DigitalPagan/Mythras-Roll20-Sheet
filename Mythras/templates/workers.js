/* Common Scripts */
const checkboxList = ["config", "help", "edit", "whisper", "show_name", "dependencies", "extended_conflict_resolution",
    "fire_rate", "magic_points", "power_points", "prana_points", "rank", "reach", "simplified_combat", "social_conflict",
    "tenacity"];
checkboxList.forEach(function(button) {
    on(`clicked:${button}`, function() {
        const flag = `${button}_enabled`;
        // Check the current value of the hidden flag.
        getAttrs([flag], function(v) {
            // Update the value of the hidden flag to "1" for checked or "0" for unchecked.
            setAttrs({
                [flag]: v[flag] !== "1" ? "1" : "0"
            });
        });
    });
});

/* Sheet Type Specific Worker Scripts */
{% if battle_units %}{% include 'mythras/battle_unit.js' %}{% endif %}
{% include 'character/character.js' %}
{% if ships %}{% include 'mythras/ship.js' %}{% endif %}
{% if vehicles == 'mythras' %}{% include 'mythras/vehicle.js' %}{% endif %}
{% if vehicles == 'frostbyte' %}{% include 'frostbyte/vehicle.js' %}{% endif %}
{% if solar_systems %}{% include 'frostbyte/solar_system.js' %}{% endif %}


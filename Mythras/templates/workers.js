/* Option Bar Scripts */
on(`clicked:edit`, function() {
    getAttrs(['edit'], function(v) {
        setAttrs({
            ['edit']: v['edit'] !== "1" ? "1" : "0"
        });
    });
});

on(`clicked:roll_display`, function() {
    getAttrs(['roll_display'], function(v) {
        setAttrs({
            ['roll_display']: v['roll_display'] !== "/w gm" ? "/w gm" : " "
        });
    });
});

on(`clicked:name_display`, function() {
    getAttrs(['name_display'], function(v) {
        setAttrs({
            ['name_display']: v['name_display'] !== "{{'{{character=@{character_name}}}'}}" ? "{{'{{character=@{character_name}}}'}}" : " "
        });
    });
});

/* Sheet Type Specific Worker Scripts */
{% if battle_units %}{% include 'mythras/battle_unit.js' %}{% endif %}
{% include 'character/character.js' %}
{% if ships %}{% include 'mythras/ship.js' %}{% endif %}
{% if vehicles == 'mythras' %}{% include 'mythras/vehicle.js' %}{% endif %}
{% if vehicles == 'frostbyte' %}{% include 'frostbyte/vehicle.js' %}{% endif %}
{% if star_systems %}{% include 'star_system/star_system.js' %}{% endif %}


on('change:unit_strength', function(event) {
    getAttrs(['unit_strength', 'unit_frontage'], function (v) {
        const strength = parseInt(v['unit_strength']) || 0;
        const frontage = parseInt(v['unit_frontage']) || 0;
        setAttrs({
            "unit_depth": Math.floor(strength / frontage)
        });
    });
});

on('change:unit_frontage change:unit_type_multiplier', function(event) {
    getAttrs(['unit_strength', 'unit_frontage', 'unit_type_multiplier'], function (v) {
        const strength = parseInt(v['unit_strength']) || 0;
        const frontage = parseInt(v['unit_frontage']) || 0;
        const multiplier = parseInt(v['unit_type_multiplier']) || 0;
        const newDamageStep = Math.ceil((frontage * multiplier) / 15);
        setAttrs({
            "unit_depth": Math.floor(strength / frontage),
            "unit_damage": damageModTable(newDamageStep)
        });
    });
});

function upgradeBattleUnit3Dot0() {
    getAttrs(['unit_notes', 'unit_strength', 'unit_frontage', 'unit_type_multiplier'], function (v) {
        let newAttrs = {'version': '3.0'};

        const strength = parseInt(v['unit_strength']) || 0;
        const frontage = parseInt(v['unit_frontage']) || 0;
        const multiplier = parseInt(v['unit_type_multiplier']) || 0;
        const newDamageStep = Math.ceil((frontage * multiplier) / 15);
        newAttrs["unit_depth"] = Math.floor(strength / frontage);
        newAttrs["unit_damage"] = damageModTable(newDamageStep);

        /* Convert Notes */
        if (v['unit_notes']) {
            newAttrs['sheet_notes'] = v['unit_notes'];
        }

        setAttrs(newAttrs);
    });
}
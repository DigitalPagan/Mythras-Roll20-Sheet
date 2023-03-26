const vehicleSystemsTable = {
    "terrestrial": [
        getTranslationByKey('cargo_compartment'),
        getTranslationByKey('communications'),
        getTranslationByKey('controls'),
        getTranslationByKey('drive') + "/" + getTranslationByKey('repulsorlift'),
        getTranslationByKey('pilot') + "/" + getTranslationByKey('passengers'),
        getTranslationByKey('power_core'),
        getTranslationByKey('sensors'),
        getTranslationByKey('weapons'),
        '',
        ''
    ],
    "spaceship": [
        getTranslationByKey('avionics'),
        getTranslationByKey('communications'),
        getTranslationByKey('crew'),
        getTranslationByKey('hold') + "/" + getTranslationByKey('hanger_bay'),
        getTranslationByKey('hyperdrive'),
        getTranslationByKey('reactor_core'),
        getTranslationByKey('sensors'),
        getTranslationByKey('shields'),
        getTranslationByKey('sublight_drive'),
        getTranslationByKey('weapons')
    ]
}

function calcSystemHits(num, v) {
    const hitsBase = parseInt(v['vehicle_size']) || 1;
    const hitsMod = parseInt(v[`vehicle_system${num}_hits_mod`]) || 0;
    const hitsCurr = parseInt(v[`vehicle_system${num}_hits`]) || 0;
    const hitsMaxCurr = parseInt(v[`vehicle_system${num}_hits_max`]) || 0;
    const newMax = hitsBase + hitsMod;
    const diff = hitsCurr - hitsMaxCurr;
    return {[`vehicle_system${num}_hits`]: newMax + diff, [`vehicle_system${num}_hits_max`]: newMax};
}

function calcAllSystemHits(v) {
    return {
        ...calcSystemHits('1', v),
        ...calcSystemHits('2', v),
        ...calcSystemHits('3', v),
        ...calcSystemHits('4', v),
        ...calcSystemHits('5', v),
        ...calcSystemHits('6', v),
        ...calcSystemHits('7', v),
        ...calcSystemHits('8', v),
        ...calcSystemHits('9', v),
        ...calcSystemHits('10', v)
    }
}

on('change:vehicle_size', function(event) {
    if (event.sourceType === "sheetworker") {return;}

    getAttrs(['vehicle_size', 'vehicle_system1_hits', 'vehicle_system1_hits_mod', 'vehicle_system1_hits_max',
        'vehicle_system2_hits', 'vehicle_system2_hits_mod', 'vehicle_system2_hits_max',
        'vehicle_system3_hits', 'vehicle_system3_hits_mod', 'vehicle_system3_hits_max',
        'vehicle_system4_hits', 'vehicle_system4_hits_mod', 'vehicle_system4_hits_max',
        'vehicle_system5_hits', 'vehicle_system5_hits_mod', 'vehicle_system5_hits_max',
        'vehicle_system6_hits', 'vehicle_system6_hits_mod', 'vehicle_system6_hits_max',
        'vehicle_system7_hits', 'vehicle_system7_hits_mod', 'vehicle_system7_hits_max',
        'vehicle_system8_hits', 'vehicle_system8_hits_mod', 'vehicle_system8_hits_max',
        'vehicle_system9_hits', 'vehicle_system9_hits_mod', 'vehicle_system9_hits_max',
        'vehicle_system10_hits', 'vehicle_system10_hits_mod', 'vehicle_system10_hits_max'], function(v) {
        setAttrs(calcAllSystemHits(v));
    });
});

['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].forEach(num => {
    on(`change:vehicle_system${num}_hits_mod`, function(event) {
        if (event.sourceType === "sheetworker") {return;}

        getAttrs(['vehicle_size', `vehicle_system${num}_hits`, `vehicle_system${num}_hits_mod`, `vehicle_system${num}_hits_max`], function(v) {
            setAttrs(calcSystemHits(num, v))
        });
    });
});


on(`change:mythras_vehicle_type`, function(event) {
    if (event.sourceType === "sheetworker") {return;}

    let newAttrs = {}
    if (event.newValue === 'spaceship') {
        newAttrs['vehicle_system_die'] = '1d10';
        newAttrs['vehicle_starship_system_display'] = '1';
    } else {
        newAttrs['vehicle_system_die'] = '1d8';
        newAttrs['vehicle_starship_system_display'] = '0';
    }
    for (let i = 0; i < 10; i++) {
        const systemNum = i + 1;
        newAttrs[`vehicle_system${systemNum}_name`] = vehicleSystemsTable[event.newValue][i];
    }
    setAttrs(newAttrs);
});

function upgradeVehicle3Dot0() {
    setAtrs({
        'version': '3.0',
        'hit_location_roll': '@{vehicle_system_roll}',
        'hit_location_low_roll': '@{vehicle_system_roll}',
        'hit_location_high_roll': '@{vehicle_system_roll}'
    });
}
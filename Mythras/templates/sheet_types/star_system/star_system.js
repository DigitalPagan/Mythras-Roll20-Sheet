function upgradeStarSystem3Dot0() {
    getAttrs(['system_notes'], function (v) {
        let newAttrs = {'version': '3.0'};

        /* Convert Notes */
        if (v['system_notes']) {
            newAttrs['sheet_notes'] = v['system_notes'];
        }

        setAttrs(newAttrs);
    });
}
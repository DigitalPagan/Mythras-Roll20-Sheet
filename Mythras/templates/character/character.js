const charactertabs = ["all","core","abilities","equipment","background","notes","compact"];
charactertabs.forEach(button => {
    on(`clicked:character_tab_${button}`, function() {
        setAttrs({
            character_tab: button
        });
    });
});
class ButtonLogic {

    constructor() { }

    applyButtonBehavior(pixiParentContainer, index, name) {
        if (pixiParentContainer.getChildAt(index)) {
            var test = new PIXI.Graphics();
            test = pixiParentContainer.getChildAt(index);
            pixiParentContainer.removeChildAt(index);
            test.name = name;

            test.interactive = true;
            test.buttonMode = true;

            test
                .on('pointerdown', (event) => {
                    // hier dann buy function aufrufen

                    // 1 durch buyAmount ersetzen für Menge kaufen, im Layout buyAmount setzen
                    gameData.buyProduction(name, buyAmount);
                })
                .on('pointerover', (event) => {
                    //console.log("skrrr");
                })
                .on('pointerout', (event) => {
                    //console.log("ahhh");
                });

            pixiParentContainer.addChildAt(test, index);
        }
    }

    onButtonOver() {
        //alert("Button Over");
    }

}
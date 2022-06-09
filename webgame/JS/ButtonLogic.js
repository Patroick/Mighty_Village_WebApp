class ButtonLogic {

    constructor() { }

    applyButtonBehavior(pixiParentContainer, index, name) {
        if (pixiParentContainer.getChildAt(index)) {
            //var childContainer = new PIXI.Graphics();

            var childContainer = pixiParentContainer.getChildAt(index);
            pixiParentContainer.removeChildAt(index);

            childContainer.name = name;
            childContainer.interactive = true;
            childContainer.buttonMode = true;

            childContainer
                .on('pointerdown', (event) => {
                    // hier dann buy function aufrufen

                    // 1 durch buyAmount ersetzen für Menge kaufen, im Layout buyAmount setzen
                    gameData.buyProduction(name, buyAmount);
                });

            pixiParentContainer.addChildAt(childContainer, index);
        }
    }

    applyResetButtonBehavior(pixiParentContainer, index) {

        var childContainer = pixiParentContainer.getChildAt(index);

        childContainer.interactive = true;
        childContainer.buttonMode = true;

        childContainer
            .on('pointerdown', (event) => {
                gameData.eraseAllGameData();
            });
    }

}
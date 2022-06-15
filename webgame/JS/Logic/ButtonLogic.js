class ButtonLogic {

    constructor() { }

    applyButtonBehavior(pixiParentContainer, index, name) {

        var childContainer = pixiParentContainer.getChildAt(index);
        pixiParentContainer.removeChildAt(index);

        childContainer.name = name;
        childContainer.interactive = true;
        childContainer.buttonMode = true;

        childContainer
            .on('pointerdown', (event) => {
                gameData.buyProduction(name, buyAmount);
            });

        pixiParentContainer.addChildAt(childContainer, index);

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
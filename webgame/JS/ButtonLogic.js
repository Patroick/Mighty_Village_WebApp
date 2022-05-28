class ButtonLogic {

    constructor(){}

    applyButtonBehavior(pixiParentContainer, index, name) {
        if (pixiParentContainer.getChildAt(index)) {
            var test = new PIXI.Graphics();
            test = pixiParentContainer.getChildAt(index);
            pixiParentContainer.removeChildAt(index);
            test.name = name;

            console.log();

            test.interactive = true;
            test.buttonMode = true;

            test
                .on('pointerdown', this.onButtonDown)
                .on('pointerover', this.onButtonOver);

            pixiParentContainer.addChildAt(test, index);
        }
    }

    onButtonDown() {
        alert("hilfe");
        
    }

    onButtonOver() {
        //alert("Button Over");
    }

}
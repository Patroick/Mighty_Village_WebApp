class ButtonLogic {

    constructor(){}

    applyButtonBehavior(pixiParentContainer, index) {
        if (pixiParentContainer.getChildAt(index)) {
            var test = new PIXI.Graphics();
            test = pixiParentContainer.getChildAt(index);
            pixiParentContainer.removeChildAt(index);
            /*
            var i = 0;
            if(i % 2 == 0){
                test.beginFill(0x3f888f);
                i++;
            } else {
                test.beginFill(0x581010);
                i++;
            }
            //test.beginFill(0x3f888f);
            
            test.drawRect(
                test.x,
                0,
                test.width,
                test.height
            )
            test.endFill();
            */

            test.interactive = true;
            test.buttonMode = true;

            test
                .on('pointerdown', this.onButtonDown)
                .on('pointerover', this.onButtonOver);

            pixiParentContainer.addChildAt(test, index);
        }
    }

    onButtonDown() {
        alert("Button Down");
        
    }

    onButtonOver() {
        //alert("Button Over");
    }

}
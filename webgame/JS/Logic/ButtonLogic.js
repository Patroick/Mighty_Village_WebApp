/*  
    Beinhaltet Methoden um mitgegeben Containern ein Knopf-Verhalten zu verleihen
*/

class ButtonLogic {

    /*
        Leerer Constructor, da nichts initializiert werden muss
    */
    constructor() { }

    /*
        applyButtonBehavior(pixiParentContainer, index, name)
        Verwandelt einen Container in einen Klickbaren Button, über den Produktionsgebäude gekauft werden können
        Parameter
            -> Parent Container des zukünftigen Buttons
            -> Index von dem Contaner im Parent Container
            -> Name des Productionsgebäudes, für die buyProduction(name, buyAmount) funktion
        Return -> kein Returnwert
    */
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

    /*
        applyResetButtonBehavior(pixiParentContainer, index)
        Verwandelt einen Container in einen Reset Button, um den Spielstand zurückzusetzen
        Parameter
            -> Parent Container des zukünftigen Reset Buttons
            -> Index von dem Contaner im Parent Container
        Return -> kein Returnwert
    */
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
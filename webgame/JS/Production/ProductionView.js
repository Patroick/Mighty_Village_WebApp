class ProductionView {

    constructor() {
        this.productions = new Array();
        this.baseProductions;
        this.generateProductionUpgrades();
    }

    // Wenn beim Laden vom Cookie nichts vorhanden ist
    generateProductionUpgrades() {
        this.baseProductions = new Array(
            [new ProductionUpgrade("Farm", 1, 10, 1.2, 1.025), 1],
            [new ProductionUpgrade("Holzfäller", 3, 50, 1.2, 1.025), 1],
            [new ProductionUpgrade("Erz-Mine", 3, 50, 1.2, 1.025), 1],
            [new ProductionUpgrade("Schmied", 3, 50, 1.2, 1.025), 1],
            [new ProductionUpgrade("Edlestein-Mine", 3, 50, 1.2, 1.025), 1],
            [new ProductionUpgrade("Juwelier", 3, 50, 1.2, 1.025), 1],
            [new ProductionUpgrade("Testiest", 3, 50, 1.2, 1.025), 1]);


        this.productions = this.baseProductions;
    }

    // Wenn beim Laden vom Cookie schon etwas gespeichert wurde
    loadfromCookie() {

    }

    addProduction(type, balance, numberOfPurchases) {

        let buyingPrice = 0;
        let generatingValue = 0;
        let price = 0;

        for (let i = 0; i < numberOfPurchases; i++) {
            //buyingPrice += type.price * type.priceIncrease;
            buyingPrice += 1.25 * 1.025;
        }

        if (balance > buyingPrice) {

            for (let i = 0; i < numberOfPurchases; i++) {

                for (let j = 0; j < this.productions.length; j++) {
                    if (this.productions[j][0]["productionType"].localeCompare(this.type)) {
                        console.log(this.productions[j][1]);
                    } else {
                        console.log("ah");
                    }
                }

                generatingValue += type.generatingValue * type.generationIncrease;
                price += type.price * type.priceIncrease;

            }

        } else {
            console.log("Ihr guthaben ist zu wenig um " + numberOfPurchases + " Produktionsgebäude vom Typ " + type + " zu kaufen!");
        }

    }

    get() {
        console.log(this.productions);
    }

    getContainers() {
        return this.productions;
    }
}
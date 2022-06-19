/*
    Beinhaltet den Constructor für ein Produktionsupgrade und die Logik um mit dem Produktionsupgrade zu arbeiten
*/

class ProductionUpgrade {

    /*
        constructor(productionType, generatingValue, price)
        Erstellt ein neues Produktionsupgrade Objekt mit den mitgegebenen Parametern und einer Menge von 0
        Parameter
            -> Name des Produktionsgebäude (z.B. "Farm" oder "Schmied")
            -> Menge der erzeugten Münzen pro Sekunde
            -> Kosten des Produktionsgebäude
        Return -> kein Returnwert
    */
    constructor(productionType, generatingValue, price) {
        this.productionType = productionType;
        this.generatingValue = generatingValue;
        this.price = price;
        this.amount = 0;
    }

    /*
        addProduction(amount)
        erhäht die Menge des Produktionsgebäude beim aufrufen der Methode um die als Parameter mitgegebene Menge
        Parameter
            -> Menge welche gekauft werden soll
        Return -> kein Returnwert
    */
    addProduction(amount) {
        this.amount += amount;
    }

    /*
        getProductionValue()
        
        Parameter -> keine Parameter
        Return -> 
    */
    getProductionValue() {
        return this.generatingValue * this.calcMultiplier() * this.amount;
    }

    getBuyingPrice(amount) {

        let buyingPrice = 0;

        for(let i = 0; i < amount; i++) {
            buyingPrice += this.price * 1.15 ** (this.amount + amount - 1);
        }

        return buyingPrice;
    }

    getAmount() {
        return this.amount;
    }

    getProductionAmount(amount) {
        return this.generatingValue * this.calcMultiplier() * amount;
    }

    calcMultiplier() {
        let amount = this.amount;
        let multiplier = 1;
        if(amount >= 10){
            while(amount >= 10) {
                amount -= 10;
                multiplier *= 2;
            }
        }
        return multiplier;
    }

}
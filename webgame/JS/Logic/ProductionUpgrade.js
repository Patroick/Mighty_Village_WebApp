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
        Return
            -> kein Returnwert
    */
    constructor(productionType, generatingValue, price) {
        this.productionType = productionType;
        this.generatingValue = generatingValue;
        this.price = price;
        this.amount = 0;
    }

    /*
        addProduction(amount)
        erhöht die Menge des Produktionsgebäudes beim aufrufen der Methode um die als Parameter mitgegebene Menge
        Parameter
            -> Menge welche gekauft werden soll
        Return
            -> kein Returnwert
    */
    addProduction(amount) {
        this.amount += amount;
    }

    /*
        getProductionValue()
        Gibt die Menge zurück welche von der Produktion generiert wird
        Parameter -> keine Parameter
        Return -> 
    */
    getProductionValue() {
        return this.generatingValue * this.calcMultiplier() * this.amount;
    }

    /*
        getBuyingPrice(amount)
        Berechnet den Preis für den Kauf eines Produktionsupgrades
        Parameter
            -> Menge wieviel Produktionen gekauft werden sollen
        Return
            -> Kaufpreis
    */

    getBuyingPrice(amount) {

        let buyingPrice = 0;

        for(let i = 0; i < amount; i++) {
            buyingPrice += this.price * 1.15 ** (this.amount + amount - 1);
        }

        return buyingPrice;
    }

    /*
        getAmount()
        Gibt Menge der Produktion zurück
        Parameter
            -> keine Parameter
        Return
            -> Menge der Produktion
    */

    getAmount() {
        return this.amount;
    }

    /*
        getProductionAmount(buyAmount)
        Gibt die Menge zurück welche von der Produktion generiert wird basierend darauf wieviel Produktionen gekauft werden sollen
        Parameter
            -> Menge wie viele Produktionen gekauft werden sollen
        Return
            -> Menge welche von der Produktion generiert wird
    */

    getProductionAmount(buyAmount) {
        return this.generatingValue * this.calcMultiplier() * buyAmount;
    }

    /*
        calcMultiplier()
        Berechnet den aktuellen Multiplier für die Produktiongeneration
        Parameter
            -> keine Parameter
        Return
            -> Multiplier für die Produktiongeneration
    */

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
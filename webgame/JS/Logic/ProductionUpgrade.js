class ProductionUpgrade {

    constructor(productionType, generatingValue, price) {
        this.productionType = productionType;
        this.generatingValue = generatingValue;
        this.price = price;
        this.amount = 0;
    }

    addProduction(amount) {
        this.amount += amount;
    }

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
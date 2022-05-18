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
        return this.generatingValue * this.amount;
    }

    getBuyingPrice(amount) {

        let buyingPrice = 0;

        for(let i = 0; i < amount; i++) {
            buyingPrice += this.price * 1.15 ** (this.amount + amount);
        }

        return buyingPrice;
    }

}
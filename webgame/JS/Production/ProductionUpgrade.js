class ProductionUpgrade {

    productionType;
    generatingValue;
    price;
    generationIncrease;
    priceIncrease;
    amount;

    constructor(productionType, generatingValue, price, generationIncrease, priceIncrease) {
        this.productionType = productionType;
        this.generatingValue = generatingValue;
        this.price = price;
        this.generationIncrease = generationIncrease;
        this.priceIncrease = priceIncrease;
        this.amount += 1;
    }

}
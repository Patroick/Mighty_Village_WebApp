class ProductionView {

    constructor(){
        productions = new Array();
    }

    addProduction(productionType) {
        productions.push(new Production(productionType));
    }
}
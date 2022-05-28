class GameData{
    
    constructor(){

    this.productions = new Array(
        // newProductionUpgrade(Name, )
        new ProductionUpgrade("Farm", 1, 10),
        new ProductionUpgrade("Holzfäller", 3, 50),
        new ProductionUpgrade("Erz-Mine", 3, 50),
        new ProductionUpgrade("Schmied", 3, 50),
        new ProductionUpgrade("Edelstein-Mine", 3, 50),
        new ProductionUpgrade("Juwelier", 3, 50),
        new ProductionUpgrade("Testiest", 3, 50));

    }

    buyProduction(productionName, amount){
        for(let i = 0; i < this.productions.length; i++){
            if(this.productions[i].productionType == productionName){
                if(counter.counter > this.productions[i].getBuyingPrice(amount)){
                    counter.decrease(this.productions[i].getBuyingPrice(amount));
                    this.productions[i].addProduction(amount);
                }
            }
        }
    }
}
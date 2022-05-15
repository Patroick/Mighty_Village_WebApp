class GameData{
    
constructor(){

    this.productions = new Array(
        [new ProductionUpgrade("Farm", 1, 10), 0],
        [new ProductionUpgrade("Holzfäller", 3, 50), 0],
        [new ProductionUpgrade("Erz-Mine", 3, 50), 0],
        [new ProductionUpgrade("Schmied", 3, 50), 0],
        [new ProductionUpgrade("Edlestein-Mine", 3, 50), 0],
        [new ProductionUpgrade("Juwelier", 3, 50), 0],
        [new ProductionUpgrade("Testiest", 3, 50), 0]);
    }

    buyProduction(productionName, amount){
        for(let i = 0; i < this.productions.length; i++){
            if(this.productions[i][0].productionType == productionName){
                this.productions[i][1] += amount;
            }
        }
    }

}
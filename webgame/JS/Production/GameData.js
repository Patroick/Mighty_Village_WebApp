class GameData{

    productions;
    currencyCount;
    upgrades;
    achievements;

    gameDataArray = new Array();
    
    constructor(){

    this.productions = new Array(
        // newProductionUpgrade(Name, ProductionAmount, Price)
        new ProductionUpgrade("Farm", 1, 10),
        new ProductionUpgrade("Holzfäller", 3, 50),
        new ProductionUpgrade("Erz-Mine", 3, 50),
        new ProductionUpgrade("Schmied", 3, 50),
        new ProductionUpgrade("Edelstein-Mine", 3, 50),
        new ProductionUpgrade("Juwelier", 3, 50),
        new ProductionUpgrade("Testiest", 3, 50));

    this.currencyCount = 0;

    this.upgrades = new Array();

    this.achievements = new Array();

    this.gameDataArray = new Array();

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

    fetchGameData(){
        gameDataArray.push(this.productions);
        gameDataArray.push(this.currencyCount);
        gameDataArray.push(this.upgrades);
        gameDataArray.push(this.achievements);
    }

    getAllGameData() {
        // Hier die ganze derzeitige GameData zurück geben.
        // Bsp. Array mit allen Produktionsgebäuden mit allen Values

        return this.gameDataArray;
    }

    overrideGameData(gameDataArray){
        this.productions = gameDataArray.productions;
        this.currencyCount = gameDataArray.currencyCount;
        this.upgrades = gameDataArray.upgrades;
        this.achievements = gameDataArray.achievements;
    }
}
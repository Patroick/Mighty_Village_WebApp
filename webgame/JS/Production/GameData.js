class GameData {

    productions;
    currencyCount;
    achievements;
    pictures = [
        "pictures/bauernhof.png",
        "pictures/holzhutte.png",
        "pictures/mine.png",
        "pictures/schmied.png",
        "pictures/spitzhacke.png",
        "pictures/spitzhacke.png",
        "pictures/spitzhacke.png",
        "pictures/spitzhacke.png"
    ];

    gameDataArray;

    constructor() {

        this.productions = new Array(
            // newProductionUpgrade(Name, ProductionAmount, Price)
            new ProductionUpgrade("Farm", 1, 100),
            new ProductionUpgrade("Holzfäller", 5, 500),
            new ProductionUpgrade("Erz-Mine", 30, 3000),
            new ProductionUpgrade("Schmied", 100, 10000),
            new ProductionUpgrade("Edelstein-Mine", 500, 50000),
            new ProductionUpgrade("Juwelier", 2000, 200000),
            new ProductionUpgrade("Testiest", 5000, 500000));
        this.currencyCount = 0;
        this.achievements = new Array(new Achievement("1k Gold", 1000, "pictures/gem.png"),
            new Achievement("10k Gold", 10000, "pictures/purplegem.png"),
            new Achievement("100k Gold", 100000, "pictures/ruby.png"),
            new Achievement("1M Gold", 1000000, "pictures/diamond.png"),
            new Achievement("10M Gold", 10000000, "pictures/golddiamond.png"),
            new Achievement("100M Gold", 100000000, "pictures/pinkdiamond.png"));
        this.gameDataArray = new Array(this.productions, this.currencyCount, this.achievements);
    }

    buyProduction(productionName, amount) {
        for (let i = 0; i < this.productions.length; i++) {
            if (this.productions[i].productionType == productionName) {
                if (counter.counter > this.productions[i].getBuyingPrice(amount)) {
                    counter.decrease(this.productions[i].getBuyingPrice(amount));
                    this.productions[i].addProduction(amount);
                }
            }
        }
    }

    getCurrentProductionUpgradePrice(productionName){
        for (let i = 0; i < this.productions.length; i++) {
            if (this.productions[i].productionType == productionName) {
                return this.productions[i].getBuyingPrice(1);
            }
        }
    }

    checkAchievements() {
        for (let i = 0; i < this.achievements.length; i++) {
            this.achievements[i].check();
        }
    }

    getNextAchievementName(){
        for (let i = 0; i < this.achievements.length; i++) {
            if(this.achievements[i].status == false){
                return "Nächstes Achievement: " + this.achievements[i].name;
            } else if(i == this.achievements.length- 1){
            return "Keine Achievements mehr";
            }
        }
    }

    getCurrentAchievement(){
        for (let i = 0; i < this.achievements.length; i++) {
            if(this.achievements[i].status == false){
                if(i == 0){
                    return this.achievements[i];
                } else
                return this.achievements[i - 1];
            } else if(i == this.achievements.length- 1){

            return this.achievements[this.achievements.length - 1];
            }
        }
    }


    getCurrentCurrencyCount(currencyCount){
        this.currencyCount = currencyCount;
    }

    fetchGameData() {

        var tempProductions = this.productions;
        var tempCurrencyCount = this.currencyCount;
        var tempAchievements = this.achievements;

        this.gameDataArray = [];
        this.productions = [];

        for (let i = 0; i < tempProductions.length; i++){
            this.productions[i] = new ProductionUpgrade(
                tempProductions[i].productionType,
                tempProductions[i].generatingValue,
                tempProductions[i].price
            );
            this.productions[i].amount = tempProductions[i].amount;
        }
        this.gameDataArray.push(this.productions);
        this.gameDataArray.push(tempCurrencyCount);
        this.gameDataArray.push(tempAchievements);


        this.overrideGameData(this.gameDataArray);

    }

    getAllGameData() {
        // Hier die ganze derzeitige GameData zurück geben.
        // Bsp. Array mit allen Produktionsgebäuden mit allen Values

        this.fetchGameData();
        
        return this.gameDataArray;
    }

    overrideGameData(gameDataArray) {

        var productionsArrayLength = this.productions.length;
        var tempProductions = gameDataArray[0];

        this.productions = [];
        this.currencyCount = 0;

        for(var i = 0; i < productionsArrayLength; i++){
            this.productions[i] = new ProductionUpgrade(
                tempProductions[i].productionType,
                tempProductions[i].generatingValue,
                tempProductions[i].price
            );
            this.productions[i].amount = tempProductions[i].amount;
        }
        this.currencyCount = gameDataArray[1];
        counter.counter = this.currencyCount;
        //this.achievements = gameDataArray[2];

        for (let i = 0; i < this.achievements.length; i++) {
            this.achievements[i].amount = gameDataArray[2][i].amount;
        }
    }
}
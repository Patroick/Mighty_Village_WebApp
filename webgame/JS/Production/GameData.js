class GameData {

    productions;
    currencyCount;
    upgrades;
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

    gameDataArray = new Array();

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
        this.upgrades = new Array();
        this.achievements = new Array(new Achievement("1k Gold", 1000, "pictures/gem.png"),
            new Achievement("10k Gold", 10000, "pictures/purplegem.png"),
            new Achievement("100k Gold", 100000, "pictures/ruby.png"),
            new Achievement("1M Gold", 1000000, "pictures/diamond.png"),
            new Achievement("10M Gold", 10000000, "pictures/golddiamond.png"),
            new Achievement("100M Gold", 100000000, "pictures/pinkdiamond.png"));
        this.gameDataArray = new Array();

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

    fetchGameData() {
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

    overrideGameData(gameDataArray) {
        this.productions = gameDataArray.productions;
        this.currencyCount = gameDataArray.currencyCount;
        this.upgrades = gameDataArray.upgrades;
        this.achievements = gameDataArray.achievements;
    }
}
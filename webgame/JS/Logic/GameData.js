/*  
    Beinhaltet alle Produktionsgebäude, den derzeitigen Stand der Münzen, die Achievements, die Bilder für die Produktionsgebäude
    und ein GameDataArray welches die Produktionsgebäude, den Stand der Münzen und die Achievements beinhaltet.
*/
class GameData {

    //Array aller Produktionsgebäude
    productions;

    //Datenfeld der derzeitigen Stand der Münzen
    currencyCount;

    //Array aller Achievements
    achievements;

    //Array aller Bilder welche für die Produktionsgebäude verwendet werden
    pictures = [
        "pictures/bauernhof.png",
        "pictures/holzhutte.png",
        "pictures/mine.png",
        "pictures/schmied.png",
        "pictures/juwelier.png",
        "pictures/edelsteinmine.png",
        "pictures/schloss.png"
    ];

    //Array der Spieldaten
    gameDataArray;

    /*
        constructor()
        Erstellt ein neues GameData Objekt mit jeweils einem Array aller Produktionsgebäude, einem Array mit allen
        Achievements und eine Variable für den Münzen stand welche zur Speicherung in das Array gameDataArray
        geschrieben werden
        Parameter
            -> keine Parameter
        Return
            -> kein Returnwert
    */
    constructor() {

        this.productions = [new ProductionUpgrade("Farm", 0.1, 10),
            new ProductionUpgrade("Holzfäller", 0.5, 100),
            new ProductionUpgrade("Erz-Mine", 2.5, 1000),
            new ProductionUpgrade("Schmied", 5, 4000),
            new ProductionUpgrade("Juwelier", 12.5, 20000),
            new ProductionUpgrade("Edelstein-Mine", 31.25, 100000),
            new ProductionUpgrade("Schloss", 78, 500000)];
        this.currencyCount = 0;
        this.achievements = [new Achievement("10k Gold", 10000, "pictures/gem.png"),
            new Achievement("100k Gold", 100000, "pictures/purplegem.png"),
            new Achievement("1M Gold", 1000000, "pictures/ruby.png"),
            new Achievement("10M Gold", 10000000, "pictures/diamond.png"),
            new Achievement("100M Gold", 100000000, "pictures/golddiamond.png"),
            new Achievement("1B Gold", 1000000000, "pictures/pinkdiamond.png")];
        this.gameDataArray = [this.productions, this.currencyCount, this.achievements];
    }

    /*
        buyProduction()
        Bei genügend Münzen wird die Menge des Produktionsgebäudes erhöht
        Parameter
            -> Name des zu kaufenden Produktionsgebäudes
            -> Menge wie viel Produktionsgebäude gekauft werden soll
        Return
            -> kein Returnwert
    */

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

    /*
        checkAchievements()
        Prüft ob ein Achievement erreicht wurde, wird jeden Frame aufgerufen
        Parameter
            -> keine Parameter
        Return
            -> kein Returnwert
    */

    checkAchievements() {
        for (let i = 0; i < this.achievements.length; i++) {
            this.achievements[i].check();
        }
    }

    /*
        getNextAchievementName()
        Gibt den Name des nächsten Achievements zurück, Wird für Achievement Anzeige verwendet
        Parameter
            -> keine Parameter
        Return
            -> Name des nächsten Achievements
    */

    getNextAchievementName() {
        for (let i = 0; i < this.achievements.length; i++) {
            if (this.achievements[i].status == false) {
                return "Nächstes Achievement: " + convertNumber(Math.round(counter.alLTime)) + " / " + this.achievements[i].name;
            } else if (i == this.achievements.length - 1) {
                return 'Verwenden Sie den Code "MightyVillageMaster" im Hauptspiel für eine Belohnung!';
            }
        }
    }

    /*
        getCurrentAchievement()
        Findet das aktuelle Achievement und gibt es zurück, wird zum setzen des Skins verwendet
        Parameter
            -> keine Parameter
        Return
            -> Achievement Objekt
    */

    getCurrentAchievement() {

        for (let i = 0; i < this.achievements.length; i++) {

            if (this.achievements[i].status == false) {
                if (i == 0) {
                    return this.achievements[i];
                } else
                    return this.achievements[i - 1];
            } else if (i == this.achievements.length - 1) {

                return this.achievements[this.achievements.length - 1];
            }
        }
    }

    /*
        getCurrentCurrencyCount()
        Holt sich den aktuellen Münzstand und speichert ihn in der Variable currencyCount
        Parameter
            -> keine Parameter
        Return
            -> kein Returnwert
    */

    getCurrentCurrencyCount(currencyCount) {
        this.currencyCount = currencyCount;
    }

    /*
        getAllGameData()
        Gibt ein Array mit akutellen Spiel Daten zurück
        Parameter -> keine Parameter
        Return 
            -> Alle aktuell vorhandenen Produktionsgebäude
            -> aktueller Stand der Münzen
            -> Stand der Achievements
            -> den allTime Münzen Stand
    */
    getAllGameData() {

        this.gameDataArray[0] = this.productions;
        this.gameDataArray[1] = this.currencyCount;
        this.gameDataArray[2] = this.achievements;
        this.gameDataArray[3] = counter.alLTime;

        return this.gameDataArray;
    }

    /*  
        overrideGameData(gameDataArray)
        Überschreibt das vorhandene Spieldaten Array mit als Parameter als Array mitgegebene Spieldaten
        Parameter -> [] -> Array mit GameData
        Return -> kein Returnwert
    */
    overrideGameData(gameDataArray) {

        for (var i = 0; i < this.productions.length; i++) {
            this.productions[i] = new ProductionUpgrade(
                gameDataArray[0][i].productionType,
                gameDataArray[0][i].generatingValue,
                gameDataArray[0][i].price
            );
            this.productions[i].amount = gameDataArray[0][i].amount;
        }

        this.currencyCount = gameDataArray[1];

        counter.counter = this.currencyCount;
        counter.alLTime = gameDataArray[3];
        for (let i = 0; i < this.achievements.length; i++) {
            this.achievements[i].status = gameDataArray[2][i].status;
        }
    }

    /*
        eraseAllGameData()
        Leert das Array mit den Spieldaten um so den Spielstand zurückzustzen
        Parameter -> keine Parameter
        Return -> kein Returnwert
    */
    eraseAllGameData() {

        for (let i = 0; i < this.productions.length; i++) {
            this.productions[i].amount = 0;
        }

        for (let i = 0; i < this.achievements.length; i++) {
            this.achievements[i].status = false;
        }

        this.currencyCount = 0;

        this.gameDataArray[0] = this.productions;
        this.gameDataArray[1] = this.currencyCount;
        this.gameDataArray[2] = this.achievements;
        this.gameDataArray[3] = counter.alLTime;

        counter.counter = 0;
        counter.alLTime = 0;

        coin.texture = new PIXI.Texture.from("pictures/muenze.png");
    }

    /*
        getAllProductionValue()
        Gibt ein Array mit akutellen Spiel Daten zurück
        Parameter -> keine Parameter
        Return -> derzeitige Summe der Münzen/sec aller Produktionsgebäude
    */
    getAllProductionValue() {
        let amount = 0;

        for (let i = 0; i < this.productions.length; i++) {
            amount += this.productions[i].getProductionValue();
        }

        return Math.round(amount * 100) / 100;
    }
}
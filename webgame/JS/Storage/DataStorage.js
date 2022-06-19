/*
    Beinhaltet die Logik um den Spielstand in einem Cookie abzuspeichern und wieder zu laden
*/

class DataStorage {

    /*
        Beinhaltet die Daten die in den/von dem Cookie geladen werden
    */
    dataArray;

    /*
        constructor()
        Beim erstellen einen DataStorage Objektes wird ein dazugehöriges dataArray für die Daten erstellt
        Parameter -> keine Parameter
        Return -> kein Returnwert
    */
    constructor(){
        this.dataArray = new Array();
    }

    /*
        saveData()
        Speichert alle derzeit vorhandenen Daten des dataArrays in den Cookie ab, mit Ablaufdatum in der Zukunft, damit der Cookie erhalten bleibt
        Parameter -> keine Parameter
        Return -> kein Returnwert
    */
    saveData() {
        document.cookie = JSON.stringify(this.dataArray) + ";expires=Thu, 18 Dec 2100 12:00:00 UTC;";
    }

    /*
        loadData()
        Ladet alle vorhandenen Daten vom Cookie und speichert sie im dataArray 
        Parameter -> keine Parameter
        Return -> geladenes dataArray vom Cookie
    */
    loadData() {
        this.dataArray = JSON.parse(document.cookie);

        for(var i = 0; i < this.dataArray[0].length; i++){
            var tempAmount = this.dataArray[0][i].amount;
            this.dataArray[0][i] = new ProductionUpgrade(
                this.dataArray[0][i].productionType,
                this.dataArray[0][i].generatingValue,
                this.dataArray[0][i].price
            );
            this.dataArray[0][i].amount = tempAmount;
        }

        return this.dataArray;
    }

    /*
        collectData(data)
        Speichert die mitgegebenen Daten in das dataArray
        Parameter -> Daten die gespeichert werden sollen
        Return -> kein Returnwert
    */
    collectData(data) {
        this.dataArray = data;
    }

}
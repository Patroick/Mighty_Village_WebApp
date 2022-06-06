class DataStorage {

    // hier vll JSON.stringify(); verwenden? sollte fürs Object speichern gut funktionieren laut dem Internetz;

    dataArray;

    constructor(){
        this.dataArray = new Array();
    }

    //Implementierung folgt

    saveData() {
        document.cookie = JSON.stringify(this.dataArray);
    }

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

    collectData(data) {
        this.clearData();
        this.dataArray = data;
    }

    clearData(){
        this.dataArray = [];
    }

}
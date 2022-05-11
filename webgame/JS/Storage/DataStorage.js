class DataStorage {

    // hier vll JSON.stringify(); verwenden? sollte fürs Object speichern gut funktionieren laut dem Internetz;

    dataArray  = new Array();

    //Implementierung folgt

    saveData() {
        document.cookie = this.dataArray;
    }

    loadData() {
        let x = document.cookie;
    }

    collectData(data) {
        this.dataArray.push(data);
    }

}
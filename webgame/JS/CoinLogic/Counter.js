class Counter{

    constructor(){
        this.counter = 0;
    }

    increase(amount){
        this.counter += amount;
        this.update();
    }

    decrease(amount){
        this.counter -= amount;
        this.update();
    }

    update(){

        // Anzeige Conversion zu Mio / Bio / etc... hier 
        //https://github.com/Trixter9994/Cookie-Clicker-Source-Code/blob/master/main.js
        // Zeile 106

        textCounter.text = convertNumber(this.counter) + " Münzen";
    }
}

function convertNumber(number){
    return new Intl.NumberFormat(undefined, {
        notation: 'compact',
        maximumFractionDigits: 4,
    }).format(Math.round(number));

}

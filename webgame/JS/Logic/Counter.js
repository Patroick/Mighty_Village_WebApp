class Counter{
    constructor(){
        this.alLTime = 0;
        this.counter = 0;
    }

    increase(amount){
        this.alLTime += amount;
        this.counter += amount;
        textCounter.text = convertNumber(this.counter) + " Münzen";
    }

    decrease(amount){
        this.counter -= amount;
        textCounter.text = convertNumber(this.counter) + " Münzen";
    }

    set(amount){
        this.counter = amount;
    }



}


suffix=[""," k", " M", " B", " T", " Qa", " Qi"];

function convertNumber(counter){

    // Anzeige Conversion zu Mio / Bio / etc... hier
    //https://github.com/Trixter9994/Cookie-Clicker-Source-Code/blob/master/main.js
    // Zeile 106

    let suffixIndex = 0;

    if(counter > 1000){
        while(Math.round(counter) > 1000){
            counter /= 1000;
            suffixIndex++;
        }
    } else {
        counter = Math.round(counter);
    }

    counter = Math.round(counter * 100) / 100 + suffix[suffixIndex];

    return counter;
}

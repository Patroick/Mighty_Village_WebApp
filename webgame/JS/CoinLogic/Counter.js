class Counter{
    constructor(){
        this.alLTime = 0;
        this.counter = 0;
        this.suffix=[""," k", " M", " B", " T", " Qa", " Qi"]
    }

    increase(amount){
        this.alLTime += amount;
        this.counter += amount;
        this.update();
    }

    decrease(amount){
        this.counter -= amount;
        this.update();
    }

    set(amount){
        this.counter = amount;
    }


    update(counter){

        // Anzeige Conversion zu Mio / Bio / etc... hier 
        //https://github.com/Trixter9994/Cookie-Clicker-Source-Code/blob/master/main.js
        // Zeile 106

        var counter = this.counter;
        var suffixIndex = 0;

        if(counter > 1000){
            while(Math.round(counter) > 1000){
                counter /= 1000;
                suffixIndex++;
            }   
        } else {
            counter = Math.round(counter);
        }

        counter = Math.round(counter * 100) / 100 + this.suffix[suffixIndex]; // Runden auf 2 Nachkommastellen

        textCounter.text = counter + " Münzen";
        return counter;
    }
}

function convertNumber(number){
    return new Intl.NumberFormat(undefined, {
        notation: 'compact',
        maximumFractionDigits: 4,
    }).format(Math.round(number));

}

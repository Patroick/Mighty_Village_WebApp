// Beinhaltet den aktuellen Counter so wie den Allzeit Counter mit dazugehörigen Funktionen zum Erhöhen und Verringern

class Counter{

    /*
        constructor()
        Konstruktor erstellt ein neues Counter Objekt und setzt die Counter Variablen auf 0
        Parameter
            -> keine Parameter
        Return
            -> kein Returnwert
    */

    constructor(){
        this.alLTime = 0;
        this.counter = 0;
    }

    /*
        increase(amount)
        Erhöht den Counter um die angegebene Menge, wird für Produktionen sowie das klickebare Objekt verwendet und
        aktualisiert das Textfeld welches den Counter anzeigt
        Parameter
            -> Wert um den der Counter erhöht werden soll
        Return
            -> kein Returnwert
    */

    increase(amount){
        this.alLTime += amount;
        this.counter += amount;
        textCounter.text = convertNumber(this.counter) + " Münzen";
    }

    /*
        decrease(amount)
        Verringert den Counter um die angegebene Menge, wird beim Kaufen von Produktionen verwendet und aktualisiert
        das Textfeld, welches den Counter anzeigt
        Parameter
            -> Wert, um den der Counter verringert werden soll
        Return
            -> kein Returnwert
    */

    decrease(amount){
        this.counter -= amount;
        textCounter.text = convertNumber(this.counter) + " Münzen";
    }
}


suffix=[""," k", " M", " B", " T", " Qa", " Qi"];

/*
        convertNumber()
        Wandelt einen Zahlenwert in einen leichter lesbares Format um
        Parameter
            -> den zu konvertierenden Zahlenwert
        Return
            -> konvertierter Zahlenwert
*/

function convertNumber(counter){

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

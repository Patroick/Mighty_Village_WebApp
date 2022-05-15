class Counter{

    constructor(){
        this.counter = 0;
    }

    increase(amount){
        this.counter += amount;

        textCounter.text = "Münzen: " + convertNumber(this.counter);
    }
}

function convertNumber(number){
    return new Intl.NumberFormat(undefined, {
        notation: 'compact',
        maximumFractionDigits: 4,
    }).format(Math.round(number));

}

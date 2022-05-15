class Counter{

    constructor(){
        this.counter = 0;
    }

    increase(amount){
        this.counter += amount;

        textCounter.text = convertNumber(this.counter) + " Münzen";
    }
}

function convertNumber(number){
    return new Intl.NumberFormat(undefined, {
        notation: 'compact',
        maximumFractionDigits: 4,
    }).format(Math.round(number));

}

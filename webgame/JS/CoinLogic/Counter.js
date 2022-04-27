class Counter{

    constructor(){
        this.counter = 0;
    }

    increase(amount){
        this.counter += amount;
        textCounter.text = "Münzen: " + counter.counter;
    }
}

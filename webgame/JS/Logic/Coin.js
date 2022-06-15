class Coin extends PIXI.Sprite{
    constructor(texture, audio){
        super(PIXI.Texture.from(texture));
        this.increment = 1;
        this.height = app.renderer.height / 2;
        this.width = app.renderer.height / 2;
        this.sound = PIXI.sound.Sound.from({
            url: audio,
            volume: 0.15
        });
    }

    clickDown(e){

        // Klick Indikator

        let text = createNewText("+ " + convertNumber(this.increment), 1, 0, 0, 0.5, 0.5);
        text.anchor.set(0.5, 0.5);
        text.x = e.data.getLocalPosition(this).x + Math.floor(Math.random() * coin.x/ 10);
        text.y = e.data.getLocalPosition(this).y;
        this.addChild(text);

        // Counter erhöhung 

        counter.increase(this.increment);
        this.scale.x /= 1.1;
        this.scale.y /= 1.1;
        this.sound.play();
    }

    clickUp(counter){
        this.scale.x *= 1.1;
        this.scale.y *= 1.1;
    }

    hoverOver(){
        this.scale.x /= 1.1;
        this.scale.y /= 1.1;
    }

    cancel(){
        this.height = app.renderer.height / 2;
        this.width = app.renderer.height / 2;
    }

}
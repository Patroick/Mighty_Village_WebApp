class Coin extends PIXI.Sprite{
    constructor(texture, audio){
        super(PIXI.Texture.from(texture));
        this.increment = 1;
        this.sound = PIXI.sound.Sound.from({
            url: audio,
            volume: 0.15
        });
    }

    clickDown(e){

        // Klick Indikator

        if(this.text != null){
            this.removeText();
        }
        this.text = new PIXI.Text("+ " + convertNumber(this.increment) ,{ fontFamily: "pixel"});
        this.text.anchor.set(0.5, 0.5);
        this.text.resolution = 2;
        this.text.x = e.data.global.x -coin.x / 20 + Math.floor(Math.random() * coin.x/ 10); // e.data.global zum einlesen der Zeigerposition
        this.text.y = e.data.global.y;
        app.stage.addChild(this.text); // Der Text wird hier der app stage hinzugefügt da die globale Zeigerposition abgefragt wird

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

    removeText(){
        if(this.text != null){
            this.text.destroy();
        }
    }
}
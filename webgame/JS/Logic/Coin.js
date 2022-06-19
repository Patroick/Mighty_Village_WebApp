/*
Erweitert die PIXI Klasse Sprite und beinhaltet Methoden zur Animation des Sprites sowie die
erhöhung des Counters bei Klick
 */

class Coin extends PIXI.Sprite{

    /*
        constructor(texture, audio)
        Erstellt ein neues Coin Objekt mit den mitgegebenen Parametern
        Parameter
            -> Sprite (Bild) des Coins
            -> Audio (Sound) bei Klick des Coins
        Return
            -> kein Returnwert
    */

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

    /*
        clickDown(e)
        Bei Klick des Coins wird der Sprite kleiner, der Counter erhöht, ein Sound abgespielt und ein Text erstellt
        Parameter
            -> Event Objekt
        Return
            -> kein Returnwert
    */

    clickDown(e){

        // Klick Indikator

        let text = createNewText("+ " + convertNumber(this.increment), 1, 0, 0, 0.5, 0.5);
        text.anchor.set(0.5, 0.5);
        text.x = e.data.getLocalPosition(this).x + Math.floor(Math.random() * coin.x/ 10);
        text.y = e.data.getLocalPosition(this).y;
        this.addChild(text);

        // Counter erhöhung 

        counter.increase(this.increment);

        // Anpassung der Größe des Sprites
        this.scale.x /= 1.1;
        this.scale.y /= 1.1;

        // Sound abspielen

        this.sound.play();
    }

    /*
        clickUp()
        Vergrößert Sprite bei Beenden des Klickes
        Parameter
            -> keine Parameter
        Return
            -> kein Returnwert
    */

    clickUp(){
        this.scale.x *= 1.1;
        this.scale.y *= 1.1;
    }

    /*
        cancel()
        Sollte ein Klick nicht abgeschlossen werden, wird der Sprite wieder zurück auf die ursprüngliche Größe gesetzt
        Parameter
            -> keine Parameter
        Return
            -> kein Returnwert
    */

    cancel(){
        this.height = app.renderer.height / 2;
        this.width = app.renderer.height / 2;
    }

}
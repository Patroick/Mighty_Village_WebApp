/*
    Beinhaltet Name, Benötigter Punktestand, Skin (Bild) für Klickbares Objekt, einen Status, ob der Erfolg erreicht wurde oder nicht sowie
    Methoden zur prüfung, ob der Erfolg erreicht wurde und eine Methode zum Aktualisieren des Skins
*/

class Achievement {

    /*
        constructor(name, counter, skin)
        Konstruktor erstellt ein neues Achievement Objekt mit den mitgegebenen Parametern
        Parameter
            -> Name des Achievements
            -> Benötigter Punktestand
            -> Skin (Bild) für Klickbares Objekt
        Return
            -> kein Returnwert
    */

    constructor(name, counter, skin) {

        this.name = name;
        this.counter = counter;
        this.skin = skin;
        this.status = false;
    }


    /*
        check()
        Setzt den Status des Achievements auf true, wenn der benötigte Allzeitpunktestand erreicht wurde
        Parameter
            -> keine Parameter
        Return
            -> kein Returnwert
    */

    check() {
        if (counter.alLTime >= this.counter) {
            this.status = true;
        }
    }

    /*
        setSkin()
        Setzt den Skin des klickbaren Objekts auf das Bild des Achievements wenn der Erfolg erreicht wurde
        Parameter
            -> keine Parameter
        Return
            -> kein Returnwert
    */

    setSkin() {
        if (this.status) {
            coin.texture = PIXI.Texture.from(this.skin);
        }
    }
}

// Klasse muss für Tests exportiert werden

try{
module.exports = Achievement;
}catch(e){}
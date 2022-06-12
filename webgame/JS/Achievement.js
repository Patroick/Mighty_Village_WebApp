class Achievement {
    constructor(name, counter, skin) {
        this.name = name;
        this.counter = counter;
        this.skin = skin;
        this.status = false;
    }

    check() {
        if (counter.alLTime >= this.counter) {
            this.status = true;
        }
    }

    setSkin() {
        if (this.status) {
            coin.texture = PIXI.Texture.from(this.skin);
        }
    }
}

try{
module.exports = Achievement;
}catch(e){}
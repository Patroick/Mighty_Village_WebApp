class ShopProduction extends PIXI.Container {
    constructor() {
        super();
        this.productions = gameData;
        this.backgroundUpgradeAmount = new PIXI.Graphics();
        this.backgroundUpgrades = new PIXI.Graphics();
        this.backgroundUpgrades.interactive = true;
        this.backgroundUpgrades.buttonMode = true;

        this.addChild(this.backgroundUpgradeAmount);
        this.addChild(this.backgroundUpgrades);
        this.backgroundUpgrades.on('pointerdown', this.clickDown)
    }

    clickDown() {
        gameData.buyProduction("Farm", 1);
    }
}
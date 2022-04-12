

let app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    resolution: 1,
});

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoDensity = true;
document.body.appendChild(app.view);

setup();

window.addEventListener('resize', resize);

function resize() {
    app.resizeTo = window;
    setLayout();
}


function setup(){

    // Upgrade Shop Text

    containerUpgradeShop = new PIXI.Container();
    backgroundUpgradeShopTitle = new PIXI.Graphics();
    textUpgradeShopTitle = new PIXI.Text('Upgrade Shop', { fontFamily: 'Helvetica', fontSize: 32, fill: 0x000000 });
    textUpgradeShopTitle.resolution = 2; //Bessere Lösung??? Sieht immernoch verpixelt aus
    textUpgradeShopTitle.anchor.set(0.5, 0.5);
    
    app.stage.addChild(containerUpgradeShop);
    containerUpgradeShop.addChild(backgroundUpgradeShopTitle);
    containerUpgradeShop.addChild(textUpgradeShopTitle);

    // Produktions Anzeige 

    containerProduction = new PIXI.Container();
    backgroundProductionTitle = new PIXI.Graphics();
    textProductionTitle = new PIXI.Text('Production', { fontFamily: 'Helvetica', fontSize: 32, fill: 0x000000 });
    textProductionTitle.anchor.set(0.5, 0.5);
    textProductionTitle.interactive = true;
    textProductionTitle.cursor = "text";
    textProductionTitle.resolution = 2;
    backgroundProduction = new PIXI.Graphics();
    
    app.stage.addChild(containerProduction);
    containerProduction.addChild(backgroundProductionTitle);
    containerProduction.addChild(textProductionTitle);
    containerProduction.addChild(backgroundProduction);

    // Coin

    containerCoin = new PIXI.Container();
    backgroundCoin = new PIXI.Graphics();

    counter = new Counter();
    coin = new Coin.from("pictures/muenze.png");
    coin.anchor.set(0.5);
    coin.interactive = true;
    coin.buttonMode= true;

    textCounter = new PIXI.Text("Münzen " + counter.counter, { fontFamily: 'Helvetica', fontSize: 32, fill: 0x000000 });
    textCounter.anchor.set(0.5, 0.5);
    textCounter.resolution = 2;

    app.stage.addChild(containerCoin);
    containerCoin.addChild(backgroundCoin);
    containerCoin.addChild(coin);
    containerCoin.addChild(textCounter);

    // Shop

    containerShop = new PIXI.Container();
    backgroundUpgradeAmount = new PIXI.Graphics();
    containerUpgrades = new PIXI.Container();
    backgroundUpgrades = new PIXI.Graphics();

    app.stage.addChild(containerShop);
    containerShop.addChild(backgroundUpgradeAmount);
    containerShop.addChild(containerUpgrades);
    containerUpgrades.addChild(backgroundUpgrades);

    setLayout();
}

function setLayout(){

    backgroundProductionTitle.clear();
    backgroundProduction.clear();
    backgroundUpgradeShopTitle.clear();
    backgroundCoin.clear();
    backgroundUpgradeAmount.clear();

    // Upgrade Shop Text

    containerUpgradeShop.x = (app.renderer.width - app.renderer.width / 5);
    containerUpgradeShop.y = 0;
    backgroundUpgradeShopTitle.beginFill(0xf58952);
    backgroundUpgradeShopTitle.drawRect(0, 0, app.renderer.width / 5, app.renderer.height / 8);
    backgroundUpgradeShopTitle.endFill();
    textUpgradeShopTitle.x = backgroundUpgradeShopTitle.width / 2;
    textUpgradeShopTitle.y = backgroundUpgradeShopTitle.height / 2;

    // Produktionsanzeige

    containerProduction.x = 0;
    containerProduction.y = 0;
    backgroundProductionTitle.beginFill(0xfffb12);
    backgroundProductionTitle.drawRect(0, 0, app.renderer.width / 4, app.renderer.height / 8);
    backgroundProductionTitle.endFill();
    textProductionTitle.x = backgroundProductionTitle.width / 2;
    textProductionTitle.y = backgroundProductionTitle.height / 2;
    backgroundProduction.beginFill(0xffb8b8);
    backgroundProduction.drawRect(0, backgroundProductionTitle.height, backgroundProductionTitle.width, app.renderer.height - backgroundProductionTitle.height - app.renderer.height / 15);
    backgroundProduction.endFill();

    // Coin

    containerCoin.x = backgroundProductionTitle.width;
    containerCoin.y = 0;
    backgroundCoin.beginFill(0xa4e5f9);
    backgroundCoin.drawRect(0, 0, app.renderer.width - backgroundProductionTitle.width - backgroundUpgradeShopTitle.width, app.renderer.height - app.renderer.height / 15);
    backgroundCoin.endFill();

    coin.x = containerCoin.width / 2;
    coin.y = containerCoin.height / 2;
    coin.scale.x = containerCoin.width/1000;
    coin.scale.y = containerCoin.width/1000;

    textCounter.x = containerCoin.width / 2;
    textCounter.y = containerCoin.height / 13;

    // Shop

    containerShop.x = (app.renderer.width - app.renderer.width / 5);
    containerShop.y = backgroundUpgradeShopTitle.height;

    backgroundUpgradeAmount.beginFill(0x39c107);
    backgroundUpgradeAmount.drawRect(0,0, app.renderer.width / 5, app.renderer.height / 6);
    backgroundUpgradeAmount.endFill();

    containerUpgrades.x = 0;
    containerUpgrades.y = backgroundUpgradeAmount.height;

    backgroundUpgrades.beginFill(0xf63939);
    backgroundUpgrades.drawRect(0, 0, app.renderer.width/5, app.renderer.height - backgroundUpgradeAmount.height - backgroundUpgradeShopTitle.height - app.renderer.height / 15);
    backgroundUpgrades.endFill();
}

function gameLoop(){


}
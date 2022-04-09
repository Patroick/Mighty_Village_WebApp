
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
    objMiddleLeft = new PIXI.Graphics();
    
    app.stage.addChild(containerProduction);
    containerProduction.addChild(backgroundProductionTitle);
    containerProduction.addChild(textProductionTitle);
    containerProduction.addChild(objMiddleLeft);

    // Coin

    containerCoin = new PIXI.Container();
    backgroundCoin = new PIXI.Graphics();

    app.stage.addChild(containerCoin);

    setLayout();
}

function setLayout(){

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
    objMiddleLeft.beginFill(0xffb8b8);
    objMiddleLeft.drawRect(0, backgroundProductionTitle.height, backgroundProductionTitle.width, app.renderer.height - backgroundProductionTitle.height - app.renderer.height / 15);
    objMiddleLeft.endFill();

    // Coin

    containerCoin.x = backgroundProductionTitle.width;
    container.y = 0;

}
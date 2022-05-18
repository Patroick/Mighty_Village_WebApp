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

app.ticker.add(delta => gameLoop(delta));


function setup(){

    gameData = new GameData();

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
    coinLine = new PIXI.Graphics();

    counter = new Counter();
    coin = new Coin("pictures/muenze.png", "audio/coin.wav");
    coin.anchor.set(0.5);
    coin.interactive = true;
    coin.buttonMode = true;

    textCounter = new PIXI.Text("Münzen " + counter.counter, { fontFamily: "pixel", fontSize: 52, fill: 0x000000 });
    textCounter.anchor.set(0.5, 0.5);
    textCounter.resolution = 2;

    app.stage.addChild(containerCoin);
    containerCoin.addChild(backgroundCoin);
    containerCoin.addChild(coin);
    containerCoin.addChild(textCounter);
    containerCoin.addChild(coinLine);

    coin.on('pointerdown', coin.clickDown)
        .on('pointerup', coin.clickUp)
        .on('pointerupoutside', coin.clickUp)
        .on('pointerover', coin.clickUp)
        .on('pointerout', coin.hoverOver);


    // Shop

    containerShop = new ShopProduction();

    app.stage.addChild(containerShop);

    // Bottom

    containerBottom = new PIXI.Container();
    backgroundBottom = new PIXI.Graphics();

    app.stage.addChild(containerBottom);
    containerBottom.addChild(backgroundBottom);

    setLayout();
}

function setLayout(){

    backgroundProductionTitle.clear();
    backgroundProduction.clear();
    backgroundUpgradeShopTitle.clear();
    backgroundCoin.clear();
    containerShop.backgroundUpgradeAmount.clear();

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

    coin.x = backgroundCoin.width / 2;
    coin.y = backgroundCoin.height / 2;
    coinLine.x = 0;
    coinLine.y = backgroundCoin.height - backgroundCoin.height / 10;
    coin.scale.x = containerCoin.width/1000;
    coin.scale.y = containerCoin.width/1000;

    textCounter.x = backgroundCoin.width / 2;
    textCounter.y = backgroundCoin.height / 13;

    // Shop

    containerShop.x = (app.renderer.width - app.renderer.width / 5);
    containerShop.y = backgroundUpgradeShopTitle.height;

    containerShop.backgroundUpgradeAmount.beginFill(0x39c107);
    containerShop.backgroundUpgradeAmount.drawRect(0,0, app.renderer.width / 5, app.renderer.height / 6);
    containerShop.backgroundUpgradeAmount.endFill();

    containerShop.backgroundUpgrades.x = 0;
    containerShop.backgroundUpgrades.y = containerShop.backgroundUpgradeAmount.height;

    containerShop.backgroundUpgrades.beginFill(0xf63939);
    containerShop.backgroundUpgrades.drawRect(0, 0, app.renderer.width/5, app.renderer.height - containerShop.backgroundUpgradeAmount.height - backgroundUpgradeShopTitle.height - app.renderer.height / 15);
    containerShop.backgroundUpgrades.endFill();

    // Bottom

    containerBottom.x = 0;
    containerBottom.y = app.renderer.height - app.renderer.height / 15;
    backgroundBottom.beginFill(0xfefdc2);
    backgroundBottom.drawRect(0, 0, app.renderer.width, app.renderer.height / 15);
    backgroundBottom.endFill();

    productionUpgrades();

}

function gameLoop(delta){

    counter.increase(calculateProduction()/100);

    if(coin.text != null){
        coin.text.y -= 10  
        coin.text.alpha -= 0.03;
        if(coin.text.y < coin.y / 3){
            containerCoin.removeChild(coin.text);
        }  
    }

    /* coinLine.lineStyle(2, 0xFFFF00);
    coinLine.bezierCurveTo(
        backgroundCoin.width / 3, -100,
        backgroundCoin.width / 2 ,100,
        backgroundCoin.width, -50);
    coinLine.lineTo(backgroundCoin.height, backgroundCoin.width);
    coinLine.lineTo(0, backgroundCoin.height);
    coinLine.lineTo(0,0)

    coinLine.beginFill(0xFFFF00); */
    
}

function productionUpgrades(){

    this.productions = gameData.productions;
    this.array = new Array();

    for(let i = 0; i < this.productions.length; i++){
        productionUpgrade = new PIXI.Container();
        backgroundProductionContainer = new PIXI.Graphics();
        textProduction = new PIXI.Text(productions[i][0]["productionType"], { fontFamily: 'Helvetica', fontSize: 32, fill: 0x000000 });
        textProduction.resolution = 2; 
        textProduction.anchor.set(0.5, 0.5);
        
        if(i % 2 == 0){
            backgroundProductionContainer.beginFill(0xff5733);
        } else{
            backgroundProductionContainer.beginFill(0x8aff33);
        }
        backgroundProductionContainer.drawRect(
            0, 
            backgroundProductionTitle.height + (app.renderer.height / 8) * i, 
            containerProduction.width, 
            backgroundProductionTitle.height + (app.renderer.height / this.productions.length) / 25
                                                );
        backgroundProductionContainer.endFill();
       
        textProduction.x = backgroundProduction.width / 2;
        textProduction.y += backgroundProductionTitle.height * i + backgroundProductionTitle.height * 1.5;

        containerProduction.addChild(productionUpgrade);
        containerProduction.addChild(backgroundProductionContainer);
        containerProduction.addChild(textProduction);
    }

    // fürs Scrollen, das Coin durch den Container ersetzen

    // document.body.addEventListener("wheel", function (event) {
    //     event.preventDefault()
    // });

    // coin.on('scroll', (ev) => {
    //     coin.y -= ev.wheelDelta;
    // });

    // const mousePosition = new PIXI.Point();

    // app.view.addEventListener('wheel', (ev) => {
    //     mousePosition.set(ev.clientX, ev.clientY);

    //     const found = app.renderer.plugins.interaction.hitTest(
    //         mousePosition,
    //         app.stage
    //     );

    //     if (found) { found.emit('scroll', ev); }
    // });
} 

function shopUpgrade() {

}

function playerUpgrade() {
    
}

function calculateProduction(){

    let value = 0;

    for(let i = 0; i < gameData.productions.length; i++){
        value += gameData.productions[i][0]["generatingValue"] * gameData.productions[i][1];
    }

    return value;

}
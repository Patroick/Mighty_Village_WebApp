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


function setup() {

    counter = new Counter();
    gameData = new GameData();
    buttonLogic = new ButtonLogic();
    font = new PIXI.TextStyle({ fontFamily: "pixel", fontSize: 52, fill: 0x000000 })

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

    coin = new Coin("pictures/muenze.png", "audio/coin.wav");
    coin.anchor.set(0.5);
    coin.interactive = true;
    coin.buttonMode = true;

    textCounter = new PIXI.Text("Münzen " + counter.counter);
    textCounter.style = font;
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

function setLayout() {

    backgroundProductionTitle.clear();
    backgroundProduction.clear();
    backgroundUpgradeShopTitle.clear();
    backgroundCoin.clear();
    containerShop.backgroundUpgradeAmount.clear();

    // Upgrade Shop Text

    containerUpgradeShop.x = (app.renderer.width - app.renderer.width / 5);
    containerUpgradeShop.y = 0;
    backgroundUpgradeShopTitle.beginFill(0xf00457);
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
    coin.scale.x = containerCoin.width / 1000;
    coin.scale.y = containerCoin.width / 1000;

    textCounter.x = backgroundCoin.width / 2;
    textCounter.y = backgroundCoin.height / 13;

    // Shop

    containerShop.x = (app.renderer.width - app.renderer.width / 5);
    containerShop.y = backgroundUpgradeShopTitle.height;


    containerShop.backgroundUpgrades.width = app.renderer.width / 5;
    containerShop.backgroundUpgrades.height = app.renderer.height / 6;

    containerShop.backgroundUpgradeAmount.beginFill(0x39c107);
    containerShop.backgroundUpgradeAmount.drawRect(0, 0, app.renderer.width / 5, app.renderer.height / 6);
    containerShop.backgroundUpgradeAmount.endFill();

    containerShop.backgroundUpgrades.x = 0;
    containerShop.backgroundUpgrades.y = containerShop.backgroundUpgradeAmount.height;

    containerShop.backgroundUpgrades.beginFill(0xf000043);
    containerShop.backgroundUpgrades.drawRect(0, 0, app.renderer.width / 5, app.renderer.height - containerShop.backgroundUpgradeAmount.height - backgroundUpgradeShopTitle.height - app.renderer.height / 15);
    containerShop.backgroundUpgrades.endFill();

    // Bottom

    containerBottom.x = 0;
    containerBottom.y = app.renderer.height - app.renderer.height / 15;
    backgroundBottom.beginFill(0xfefdc2);
    backgroundBottom.drawRect(0, 0, app.renderer.width, app.renderer.height / 15);
    backgroundBottom.endFill();

    displayProductions();
    displayShopButtons();
    displayShopUpgrades();

    dataStore = new DataStorage();

    dataStore.collectData(gameData.getAllGameData());
    dataStore.saveData();

}

function gameLoop(delta) {

    counter.increase(calculateProduction() / 100);

    if (coin.text != null) {
        coin.text.y -= 10
        coin.text.alpha -= 0.03;
        if (coin.text.y < coin.y / 3) {
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

function displayProductions() {

    this.productions = gameData.productions;

    for (let i = 0; i < this.productions.length; i++) {
        productionUpgrade = new PIXI.Container();
        backgroundProductionContainer = new PIXI.Graphics();
        textProduction = new PIXI.Text(productions[i]["productionType"], { fontFamily: 'Helvetica', fontSize: 32, fill: 0x000000, align: 'left' });
        textProduction.resolution = 2;
        textProduction.anchor.set(0, 1);

        textAmountProduction = new PIXI.Text(productions[i]["productionType"], { fontFamily: 'Helvetica', fontSize: 16, fill: 0x000000, align: 'right' });
        textAmountProduction.resolution = 2;
        textAmountProduction.anchor.set(0, 1.5);

        //textGenerationOfProduction

        if (i % 2 == 0) {
            backgroundProductionContainer.beginFill(0xff5733);
        } else {
            backgroundProductionContainer.beginFill(0x8aff33);
        }
        backgroundProductionContainer.drawRect(
            0,
            backgroundProductionTitle.height + (app.renderer.height / 8) * i,
            app.renderer.width / 4,
            app.renderer.height / 8
        );
        backgroundProductionContainer.endFill();

        //textProduction.x = backgroundProduction.width / 2;
        textProduction.y += backgroundProductionTitle.height * i + backgroundProductionTitle.height * 1.25;
        textAmountProduction.y = textProduction.y

        containerProduction.addChild(productionUpgrade);
        productionUpgrade.addChild(backgroundProductionContainer);
        productionUpgrade.addChild(textProduction);
        productionUpgrade.addChild(textAmountProduction);
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

function displayShopButtons() {
    this.shop = gameData.productions;
    for (let i = 0; i < this.shop.length; i++) {
        upgradeButton = new PIXI.Container();
        backgroundUpgradeButton = new PIXI.Graphics();
        textUpgradeButton = new PIXI.Text(productions[i]["productionType"], { fontFamily: 'Helvetica', fontSize: 32, fill: 0x000000 });
        textUpgradeButton.resolution = 2;
        textUpgradeButton.anchor.set(0.5, 0.5);

        if (i % 2 == 0) {
            backgroundUpgradeButton.beginFill(0x3f888f);
        } else {
            backgroundUpgradeButton.beginFill(0xFF00FF);
        }

        backgroundUpgradeButton.y -= containerShop.backgroundUpgradeAmount.height

        backgroundUpgradeButton.drawRect(
            0,
            backgroundUpgradeShopTitle.height + containerShop.backgroundUpgradeAmount.height / 0.8 + (app.renderer.height / 8) * i,
            app.renderer.width / 5,
            app.renderer.height / 8
        );

        backgroundUpgradeButton.endFill();

        textUpgradeButton.x = backgroundUpgradeShopTitle.width / 2;
        textUpgradeButton.y += (backgroundProductionTitle.height * i) + backgroundUpgradeButton.height / 0.55;

        containerShop.addChild(upgradeButton);
        upgradeButton.addChild(backgroundUpgradeButton);
        upgradeButton.addChild(textUpgradeButton);

        buttonLogic.applyButtonBehavior(upgradeButton, 0, productions[i]["productionType"]);
    }
}

function displayShopUpgrades() {
    containerShop.backgroundUpgradeAmount.interactive = true;

    containerShop.backgroundUpgradeAmount.on('pointerover', function () {
        containerShop.backgroundUpgradeAmount.beginFill(0x0000FF);
        containerShop.backgroundUpgradeAmount.drawRect(0, 0, app.renderer.width / 5, app.renderer.height / 6);
        containerShop.backgroundUpgradeAmount.endFill();

    });

    containerShop.backgroundUpgradeAmount.on('pointerout', function () {
        containerShop.backgroundUpgradeAmount.beginFill(0xFFFF00);
        containerShop.backgroundUpgradeAmount.drawRect(0, 0, app.renderer.width / 5, app.renderer.height / 6);
        containerShop.backgroundUpgradeAmount.endFill();
    });
}

function calculateProduction() {

    let value = 0;

    for (let i = 0; i < gameData.productions.length; i++) {
        value += gameData.productions[i].getProductionValue();
    }

    return value;

}
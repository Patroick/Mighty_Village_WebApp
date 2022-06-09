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

    buyAmount = 1;

    dataStore = new DataStorage();
    counter = new Counter();
    gameData = new GameData();
    buttonLogic = new ButtonLogic();
    font = new PIXI.TextStyle({ fontFamily: "pixel", fontSize: 52, fill: 0x000000 })

    if(document.cookie){
        gameData.overrideGameData(dataStore.loadData());
    }

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

    achievementText = new PIXI.Text("Nächstes Achievement: ");
    achievementText.font = font;
    achievementText.resolution = 2;

    containerResetButton = new PIXI.Container();
    backgroundResetButton = new PIXI.Graphics();

    resetButtonTextFirst = new PIXI.Text("Spielstand", { fontFamily: 'Helvetica', fontSize: 22, fill: 0x000000 });
    resetButtonTextFirst.font = font;
    resetButtonTextFirst.resolution = 2;

    resetButtonTextSecond = new PIXI.Text("\nzurücksetzen", { fontFamily: 'Helvetica', fontSize: 22, fill: 0x000000 });
    resetButtonTextSecond.font = font;
    resetButtonTextSecond.resolution = 2;

    app.stage.addChild(containerBottom);
    containerBottom.addChild(backgroundBottom);

    containerBottom.addChild(achievementText);

    containerBottom.addChild(containerResetButton);
    containerResetButton.addChild(backgroundResetButton);
    containerResetButton.addChild(resetButtonTextFirst);
    containerResetButton.addChild(resetButtonTextSecond);

    buttonLogic.applyResetButtonBehavior(containerResetButton, 0);

    setLayout();
}

function setLayout() {

    backgroundProductionTitle.clear();
    backgroundProduction.clear();
    backgroundUpgradeShopTitle.clear();
    backgroundCoin.clear();
    containerShop.backgroundUpgradeAmount.clear();
    backgroundResetButton.clear();

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

    containerShop.backgroundUpgradeAmount.beginFill(0xFFA500);
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

    achievementText.x = 0;
    achievementText.y = backgroundBottom.height / 3;

    containerResetButton.x = app.renderer.width * 0.865;
    containerResetButton.y = containerBottom.height / 6;

    backgroundResetButton.beginFill(0x800303);
    backgroundResetButton.drawRect(0, 0, containerResetButton.width / 0.85, app.renderer.height / 25);
    backgroundResetButton.endFill();

    resetButtonTextFirst.x = containerResetButton.width / 7;
    resetButtonTextFirst.y = containerResetButton.y * 0.3;

    resetButtonTextSecond.x = containerResetButton.width / 15;
    resetButtonTextSecond.y = containerResetButton.y * 0.01;

    displayProductions();
    displayShopButtons();
    displayBuyAmountButtons();
    //displayShopUpgrades();


    //dataStore.collectData(gameData.getAllGameData());
    //dataStore.saveData();

}

function gameLoop(delta) {

    counter.increase(calculateProduction() / 100);
    updateDisplayProduction();
    updateDisplayShopButtons();

    gameData.checkAchievements();
    gameData.getCurrentCurrencyCount(this.counter.counter);

    if (coin.text != null) {
        coin.text.y -= 10
        coin.text.alpha -= 0.03;
        if (coin.text.y < coin.y / 3) {
            containerCoin.removeChild(coin.text);
        }
    }

    achievementText.text = gameData.getNextAchievementName();
    gameData.getCurrentAchievement().setSkin();

    
    dataStore.collectData(gameData.getAllGameData());
    dataStore.saveData();

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
    this.pictures = gameData.pictures;
    for (let i = 0; i < this.productions.length; i++) {
        productionUpgrade = new PIXI.Container();
        backgroundProductionContainer = new PIXI.Graphics();
        textProduction = new PIXI.Text(productions[i]["productionType"], { fontFamily: 'Helvetica', fontSize: 32, fill: 0x000000, align: 'right' });
        textProduction.resolution = 2;
        textProduction.anchor.set(-0.05, 0.5);

        textGenerationPerSecond = new PIXI.Text("Münzen/sec: " + productions[i].getProductionValue(), { fontFamily: 'Helvetica', fontSize: 16, fill: 0x000000, align: 'left' });
        textGenerationPerSecond.resolution = 2;
        textGenerationPerSecond.anchor.set(-0.07, -1.5);

        textAmountProduction = new PIXI.Text("Menge: " + productions[i].getAmount(), { fontFamily: 'Helvetica', fontSize: 16, fill: 0x000000, align: 'left' });
        textAmountProduction.resolution = 2;
        textAmountProduction.anchor.set(-0.1, -3);

        productionIcon = new PIXI.Sprite.from(pictures[i]);
        productionIcon.anchor.set(-0.05, 0.3);

        productionIcon.scale.x *= 0.15;
        productionIcon.scale.y *= 0.15;

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
        textAmountProduction.y = textProduction.y;
        textGenerationPerSecond.y = textAmountProduction.y;

        productionIcon.x += backgroundProductionContainer.width / 1.3;
        productionIcon.y += textProduction.y + backgroundProductionContainer.height / 9;

        containerProduction.addChild(productionUpgrade);
        productionUpgrade.addChild(backgroundProductionContainer);
        productionUpgrade.addChild(textProduction);
        productionUpgrade.addChild(textAmountProduction);
        productionUpgrade.addChild(textGenerationPerSecond);
        productionUpgrade.addChild(productionIcon);
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

function updateDisplayProduction() {

    for (let i = 0; i < productions.length; i++) {
        containerProduction.getChildAt(i + 3).getChildAt(2).text = "Menge: " + productions[i].getAmount(); // + 3 weil der erste Produktions Container bei 3 startet 
        containerProduction.getChildAt(i + 3).getChildAt(3).text = "Münzen/sec: " + productions[i].getProductionValue();
    }

}

function updateDisplayShopButtons() {
    for (let i = 0; i < productions.length; i++) {
        containerShop.getChildAt(i + 2).getChildAt(2).text = "Preis: " + Math.round(productions[i].getBuyingPrice(buyAmount));
    }
}


function displayShopButtons() {
    this.shop = gameData.productions;
    for (let i = 0; i < this.shop.length; i++) {
        upgradeButton = new PIXI.Container();
        backgroundUpgradeButton = new PIXI.Graphics();
        textUpgradeButton = new PIXI.Text(productions[i]["productionType"], { fontFamily: 'Helvetica', fontSize: 32, fill: 0x000000 });
        textUpgradeButton.resolution = 2;
        textUpgradeButton.anchor.set(0.5, 0.5);

        textPriceUpgrade = new PIXI.Text("Preis: " + Math.round(productions[i].getBuyingPrice(1)), { fontFamily: 'Helvetica', fontSize: 16, fill: 0x000000, align: 'left' });
        textPriceUpgrade.resolution = 2;
        textPriceUpgrade.anchor.set(-0.07, -1.5);

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
        textUpgradeButton.y += (backgroundProductionTitle.height * i) + backgroundUpgradeButton.height / 0.65;

        textPriceUpgrade.x = textUpgradeButton.x / 15;
        textPriceUpgrade.y = textUpgradeButton.y + backgroundUpgradeShopTitle.height / 5;

        containerShop.addChild(upgradeButton);
        upgradeButton.addChild(backgroundUpgradeButton);
        upgradeButton.addChild(textUpgradeButton);
        upgradeButton.addChild(textPriceUpgrade)

        buttonLogic.applyButtonBehavior(upgradeButton, 0, productions[i]["productionType"]);
    }
}

/*
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
*/

function displayBuyAmountButtons() {
    buyOne = new PIXI.Container();
    buyFive = new PIXI.Container();
    buyTen = new PIXI.Container();

    buyOneBackground = new PIXI.Graphics();
    buyFiveBackground = new PIXI.Graphics();
    buyTenBackground = new PIXI.Graphics();

    buyAmountText = new PIXI.Text("Menge", { fontFamily: 'Helvetica', fontSize: 32, fill: 0x000000 });
    buyAmountText.resolution = 2;
    buyAmountText.anchor.set(0.5, 0.5);

    buyOneText = new PIXI.Text("x1", { fontFamily: 'Helvetica', fontSize: 16, fill: 0x000000 });
    buyOneText.resolution = 2;
    buyOneText.anchor.set(0.5, 0.5);

    buyFiveText = new PIXI.Text("x5", { fontFamily: 'Helvetica', fontSize: 16, fill: 0x000000 });
    buyFiveText.resolution = 2;
    buyFiveText.anchor.set(0.5, 0.5);

    buyTenText = new PIXI.Text("x10", { fontFamily: 'Helvetica', fontSize: 16, fill: 0x000000 });
    buyTenText.resolution = 2;
    buyTenText.anchor.set(0.5, 0.5);

    buyAmountText.x = backgroundUpgradeShopTitle.width / 2;
    buyAmountText.y = backgroundUpgradeShopTitle.height / 3;

    buyOneBackground.beginFill(0x89CFF0);
    buyOneBackground.drawRect(
        backgroundUpgradeShopTitle.width / 6,
        backgroundUpgradeShopTitle.height / 1.5,
        backgroundUpgradeShopTitle.width / 5.5,
        backgroundUpgradeShopTitle.height / 3
    );
    buyOneBackground.endFill();

    buyFiveBackground.beginFill(0x40B5AD);
    buyFiveBackground.drawRect(
        backgroundUpgradeShopTitle.width / 2.4,
        backgroundUpgradeShopTitle.height / 1.5,
        backgroundUpgradeShopTitle.width / 5.5,
        backgroundUpgradeShopTitle.height / 3
    );
    buyFiveBackground.endFill();
    
    buyTenBackground.beginFill(0x088F8F);
    buyTenBackground.drawRect(
        backgroundUpgradeShopTitle.width / 1.5,
        backgroundUpgradeShopTitle.height / 1.5,
        backgroundUpgradeShopTitle.width / 5.5,
        backgroundUpgradeShopTitle.height / 3
    );
    buyTenBackground.endFill();

    buyOneText.x = backgroundUpgradeShopTitle.width / 3.9;
    buyOneText.y = backgroundUpgradeShopTitle.height * 0.825;

    buyFiveText.x = backgroundUpgradeShopTitle.width / 2;
    buyFiveText.y = backgroundUpgradeShopTitle.height * 0.825;

    buyTenText.x = backgroundUpgradeShopTitle.width / 1.325;
    buyTenText.y = backgroundUpgradeShopTitle.height * 0.825;

    containerShop.addChild(buyOne);
    containerShop.addChild(buyFive);
    containerShop.addChild(buyTen);
    containerShop.addChild(buyAmountText);
    buyOne.addChild(buyOneBackground);
    buyFive.addChild(buyFiveBackground);
    buyTen.addChild(buyTenBackground);
    buyOne.addChild(buyOneText);
    buyFive.addChild(buyFiveText);
    buyTen.addChild(buyTenText);

    buyOneBackground.interactive = true;
    buyFiveBackground.interactive = true;
    buyTenBackground.interactive = true;

    buyOneBackground.buttonMode = true;
    buyFiveBackground.buttonMode = true;
    buyTenBackground.buttonMode = true;

    buyOneBackground.on('pointerdown', (event) => {
        this.buyAmount = 1;

        buyOneBackground.clear();
        buyOneBackground.beginFill(0x6490A4);
        buyOneBackground.drawRect(
            backgroundUpgradeShopTitle.width / 6,
            backgroundUpgradeShopTitle.height / 1.5,
            backgroundUpgradeShopTitle.width / 5.5,
            backgroundUpgradeShopTitle.height / 3
        );
        buyOneBackground.endFill();

        buyFiveBackground.clear();
        buyFiveBackground.beginFill(0x40B5AD);
        buyFiveBackground.drawRect(
            backgroundUpgradeShopTitle.width / 2.4,
            backgroundUpgradeShopTitle.height / 1.5,
            backgroundUpgradeShopTitle.width / 5.5,
            backgroundUpgradeShopTitle.height / 3
        );
        buyFiveBackground.endFill();

        buyTenBackground.clear();
        buyTenBackground.beginFill(0x088F8F);
        buyTenBackground.drawRect(
            backgroundUpgradeShopTitle.width / 1.5,
            backgroundUpgradeShopTitle.height / 1.5,
            backgroundUpgradeShopTitle.width / 5.5,
            backgroundUpgradeShopTitle.height / 3
        );
        buyTenBackground.endFill();
    });

    buyFiveBackground.on('pointerdown', (event) => {
        this.buyAmount = 5;

        buyOneBackground.clear();
        buyOneBackground.beginFill(0x89CFF0);
        buyOneBackground.drawRect(
            backgroundUpgradeShopTitle.width / 6,
            backgroundUpgradeShopTitle.height / 1.5,
            backgroundUpgradeShopTitle.width / 5.5,
            backgroundUpgradeShopTitle.height / 3
        );
        buyOneBackground.endFill();

        buyFiveBackground.clear();
        buyFiveBackground.beginFill(0x2A746F);
        buyFiveBackground.drawRect(
            backgroundUpgradeShopTitle.width / 2.4,
            backgroundUpgradeShopTitle.height / 1.5,
            backgroundUpgradeShopTitle.width / 5.5,
            backgroundUpgradeShopTitle.height / 3
        );
        buyFiveBackground.endFill();

        buyTenBackground.clear();
        buyTenBackground.beginFill(0x088F8F);
        buyTenBackground.drawRect(
            backgroundUpgradeShopTitle.width / 1.5,
            backgroundUpgradeShopTitle.height / 1.5,
            backgroundUpgradeShopTitle.width / 5.5,
            backgroundUpgradeShopTitle.height / 3
        );
        buyTenBackground.endFill();
    });

    buyTenBackground.on('pointerdown', (event) => {
        this.buyAmount = 10;

        buyOneBackground.clear();
        buyOneBackground.beginFill(0x89CFF0);
        buyOneBackground.drawRect(
            backgroundUpgradeShopTitle.width / 6,
            backgroundUpgradeShopTitle.height / 1.5,
            backgroundUpgradeShopTitle.width / 5.5,
            backgroundUpgradeShopTitle.height / 3
        );
        buyOneBackground.endFill();

        buyFiveBackground.clear();
        buyFiveBackground.beginFill(0x40B5AD);
        buyFiveBackground.drawRect(
            backgroundUpgradeShopTitle.width / 2.4,
            backgroundUpgradeShopTitle.height / 1.5,
            backgroundUpgradeShopTitle.width / 5.5,
            backgroundUpgradeShopTitle.height / 3
        );
        buyFiveBackground.endFill();

        buyTenBackground.clear();
        buyTenBackground.beginFill(0x085B5B);
        buyTenBackground.drawRect(
            backgroundUpgradeShopTitle.width / 1.5,
            backgroundUpgradeShopTitle.height / 1.5,
            backgroundUpgradeShopTitle.width / 5.5,
            backgroundUpgradeShopTitle.height / 3
        );
        buyTenBackground.endFill();
    });
}

function calculateProduction() {

    let value = 0;

    for (let i = 0; i < gameData.productions.length; i++) {
        value += gameData.productions[i].getProductionValue();
    }

    return value;

}

/*
    Scrolling

  document.body.addEventListener("wheel", function (event) {
        event.preventDefault()
    });

    coin.on('scroll', (ev) => {
        coin.y -= ev.wheelDelta;
    });

    const mousePosition = new PIXI.Point();

    app.view.addEventListener('wheel', (ev) => {
        mousePosition.set(ev.clientX, ev.clientY);

        const found = app.renderer.plugins.interaction.hitTest(
            mousePosition,
            app.stage
        );

        if (found) { found.emit('scroll', ev); }
    });
*/
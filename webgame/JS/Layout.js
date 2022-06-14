let app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    resolution: 1,
});

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
document.body.appendChild(app.view);

fontSize = 32;
font = { fontFamily: 'Helvetica', fontSize: fontSize, fill: 0x000000, align: 'left' };

setup();

window.addEventListener('resize', resize);

function resize() {
    app.resizeTo = window;
    setLayout();
}

ticker = app.ticker;
ticker.minFPS = 1;
app.ticker.maxFPS = 60;

//let timeBlur;
//let timeFocus;

window.onblur = () => {
    //timeBlur = Date.now();
    //console.log(counter.counter);
    ticker.stop();
    setInterval(() => {
        gameLoop(1);
    }, 1000);
}

window.onfocus = () => {
    //timeFocus = Date.now();
    //console.log(counter.counter);
    //console.log((timeFocus - timeBlur) / 1000);
    clearInterval();
    ticker.start();
}

if (ticker.started) {
    app.ticker.add(delta => gameLoop(delta));
}


setInterval(() => { app.ticker.update() }, 1000);

function setup() {

    buyAmount = 1;

    dataStore = new DataStorage();
    counter = new Counter();
    gameData = new GameData();
    buttonLogic = new ButtonLogic();
    productions = gameData.productions;
    pictures = gameData.pictures;

    if (document.cookie) {
        gameData.overrideGameData(dataStore.loadData());
    }

    // Upgrade Shop Text

    containerUpgradeShop = new PIXI.Container();
    backgroundUpgradeShopTitle = new PIXI.Graphics();

    textUpgradeShopTitle = createNewText("Upgrade Shop", 1, 0, 0, 0.5, 0.5);

    app.stage.addChild(containerUpgradeShop);
    containerUpgradeShop.addChild(backgroundUpgradeShopTitle);
    containerUpgradeShop.addChild(textUpgradeShopTitle);

    // Produktions Anzeige 

    containerProduction = new PIXI.Container();
    backgroundProductionTitle = new PIXI.Graphics();

    textProductionTitle = createNewText("Production", 1, 0, 0, 0.5, 0.5);

    backgroundProduction = new PIXI.Graphics();
    containerProductions = new PIXI.Container();

    app.stage.addChild(containerProduction);
    containerProduction.addChild(backgroundProductionTitle);
    containerProduction.addChild(textProductionTitle);
    containerProduction.addChild(backgroundProduction);

    containerProduction.addChild(containerProductions);

    // Coin

    containerCoin = new PIXI.Container();
    backgroundCoin = new PIXI.Graphics();
    coinLine = new PIXI.Graphics();

    coin = new Coin("pictures/muenze.png", "audio/coin.wav");
    coin.anchor.set(0.5);
    convertToButton(coin);

    textCounter = createNewText("Münzen " + counter.counter, 1, 0, 0, 0.5, 0.5);

    app.stage.addChild(containerCoin);
    containerCoin.addChild(backgroundCoin);
    containerCoin.addChild(coin);
    containerCoin.addChild(textCounter);
    containerCoin.addChild(coinLine);

    coin.on('pointerdown', coin.clickDown)
        .on('pointerup', coin.clickUp)
        .on('pointerupoutside', coin.clickUp)
        .on('pointerover', coin.clickUp)
        .on('pointerout', coin.hoverOver)
        .on('pointercancel', coin.cancel);

    // Shop

    containerShop = new ShopProduction();

    app.stage.addChild(containerShop);

    containerProductionShop = new PIXI.Container();
    containerShop.addChild(containerProductionShop);

    // Bottom

    containerBottom = new PIXI.Container();
    backgroundBottom = new PIXI.Graphics();

    achievementText = createNewText("Nächstes Achievement: ", 1, 0, 0, 0, 0);

    containerResetButton = new PIXI.Container();
    backgroundResetButton = new PIXI.Graphics();

    resetButtonTextFirst = createNewText("Spielstand", 2, 0, 0, 0, 0);

    resetButtonTextSecond = createNewText("\nzurücksetzen", 2, 0, 0, 0, 0);

    app.stage.addChild(containerBottom);
    containerBottom.addChild(backgroundBottom);

    containerBottom.addChild(achievementText);

    containerBottom.addChild(containerResetButton);
    containerResetButton.addChild(backgroundResetButton);
    containerResetButton.addChild(resetButtonTextFirst);
    containerResetButton.addChild(resetButtonTextSecond);

    buttonLogic.applyResetButtonBehavior(containerResetButton, 0);

    // Production Upgrade

    for (let i = 0; i < productions.length; i++) {
        let productionUpgrade = new PIXI.Container();
        let backgroundProductionContainer = new PIXI.Graphics();

        let textProduction = createNewText(productions[i]["productionType"], 0.75, 0, 0, 0, 0);
        let textGenerationPerSecond = createNewText("Münzen/sec: " + productions[i]["generatingValue"], 2, 0, 0, 0, 0);
        let textAmountProduction = createNewText("Menge: " + productions[i]["amount"], 2, 0, 0, 0, 0);

        let productionIcon = createNewSprite(pictures[i], 0, 0, 0, 0, 0);

        containerProductions.addChild(productionUpgrade);
        productionUpgrade.addChild(backgroundProductionContainer);
        backgroundProductionContainer.addChild(textProduction);
        backgroundProductionContainer.addChild(textAmountProduction);
        backgroundProductionContainer.addChild(textGenerationPerSecond);
        backgroundProductionContainer.addChild(productionIcon);

    }

    for (let i = 0; i < productions.length; i++) {

        let upgradeButton = new PIXI.Container();
        let backgroundUpgradeButton = new PIXI.Graphics();

        let textUpgradeButton = createNewText(productions[i]["productionType"], 1, 0, 0, 0, 0);
        let textPriceUpgrade = createNewText("Preis: " + Math.round(productions[i].getBuyingPrice(1)), 2, 0, 0, 0, 0);
        let textCoinProductionPerSecond = createNewText("Münzen/sec: " + Math.round(productions[i].getProductionAmount(buyAmount)), 2, 0, 0, 0, 0);

        containerProductionShop.addChild(upgradeButton);
        upgradeButton.addChild(backgroundUpgradeButton);
        backgroundUpgradeButton.addChild(textUpgradeButton);
        backgroundUpgradeButton.addChild(textPriceUpgrade);
        backgroundUpgradeButton.addChild(textCoinProductionPerSecond);

        buttonLogic.applyButtonBehavior(upgradeButton, 0, productions[i]["productionType"]);
    }

    // Buy Buttons & Backgrounds

    buyOne = new PIXI.Container();
    buyFive = new PIXI.Container();
    buyTen = new PIXI.Container();

    buyOneBackground = new PIXI.Graphics();
    buyFiveBackground = new PIXI.Graphics();
    buyTenBackground = new PIXI.Graphics();

    buyAmountText = createNewText("Menge", 1, 0, 0, 0, 0);
    buyOneText = createNewText("x1", 2, 0, 0, 0, 0);
    buyFiveText = createNewText("x5", 2, 0, 0, 0, 0);
    buyTenText = createNewText("x10", 2, 0, 0, 0, 0);

    setLayout();
}

function setLayout() {

    backgroundProductionTitle.clear();
    backgroundProduction.clear();
    backgroundUpgradeShopTitle.clear();
    backgroundCoin.clear();
    containerShop.backgroundUpgradeAmount.clear();
    backgroundResetButton.clear();
    containerShop.backgroundUpgrades.clear();

    buyOneBackground.clear();
    buyFiveBackground.clear();
    buyTenBackground.clear();


    // hier noch ne changeText methode machen
    buyAmountText.destroy();
    buyOneText.destroy();
    buyFiveText.destroy();
    buyTenText.destroy();

    // Upgrade Shop Text

    setContainerCoordinates(containerUpgradeShop, app.renderer.width - app.renderer.width / 5, 0);

    drawContainerLine(backgroundUpgradeShopTitle, 2);

    drawRectangle(backgroundUpgradeShopTitle, 0xD6862B, 0, 0, app.renderer.width / 5, app.renderer.height / 8);

    setTextCoordinates(textUpgradeShopTitle, backgroundUpgradeShopTitle.width / 2, backgroundUpgradeShopTitle.height / 2);

    // Produktionsanzeige

    setContainerCoordinates(containerProduction, 0, 0);

    drawContainerLine(backgroundProductionTitle, 2);

    drawRectangle(backgroundProductionTitle, 0x5B53B5, 0, 0, app.renderer.width / 4, app.renderer.height / 8);

    setTextCoordinates(textProductionTitle, backgroundProductionTitle.width / 2, backgroundProductionTitle.height / 2);

    drawRectangle(backgroundProduction, 0xE0E0DC, 0, backgroundProductionTitle.height, backgroundProductionTitle.width, app.renderer.height - backgroundProductionTitle.height - app.renderer.height / 15);

    setContainerCoordinates(containerProductions, containerProductions.x, backgroundProductionTitle.height);

    // Productions zeichnen

    for (let i = 0; i < productions.length; i++) {

        containerProductions.getChildAt(i).getChildAt(0).clear();

        setContainerCoordinates(containerProductions.getChildAt(i).getChildAt(0), containerProductions.x, 0)

        setContainerCoordinates(containerProductions.getChildAt(i).getChildAt(0), 30, containerProductions.getChildAt(i).getChildAt(0).y);
        drawContainerLine(containerProductions.getChildAt(i).getChildAt(0), 1);
        drawMultipleRectangle(containerProductions.getChildAt(i).getChildAt(0), 0x938FBD, 0, 0, (window.innerWidth / 4) - 30, app.renderer.height / 8, -(backgroundProductionTitle.height) * i);

        changeText(containerProductions.getChildAt(i).getChildAt(0).getChildAt(0), 0.75, 10, containerProductions.getChildAt(i).getChildAt(0).height / 5, 0, 0.5);
        changeText(containerProductions.getChildAt(i).getChildAt(0).getChildAt(1), 2, 10, containerProductions.getChildAt(i).getChildAt(0).height / 1.8, 0, 0.5);
        changeText(containerProductions.getChildAt(i).getChildAt(0).getChildAt(2), 2, 10, containerProductions.getChildAt(i).getChildAt(0).height / 1.4, 0, 0.5);

        changeSprite(containerProductions.getChildAt(i).getChildAt(0).getChildAt(3), containerProductions.getChildAt(i).getChildAt(0).width / 1.25, containerProductions.getChildAt(i).getChildAt(0).height / 2, 0.15, 0.15, 0.5);

    }

    // Coin

    setContainerCoordinates(containerCoin, backgroundProductionTitle.width, 0);

    drawContainerLine(backgroundCoin, 2);

    drawRectangle(backgroundCoin, 0xCEDDF0, 0, 0, app.renderer.width - backgroundProductionTitle.width - backgroundUpgradeShopTitle.width, app.renderer.height - app.renderer.height / 15);

    setObjectCoordinates(coin, backgroundCoin.width / 2, backgroundCoin.height / 2);

    setObjectScale(coin, containerCoin.width / 1000, containerCoin.width / 1000);

    setTextCoordinates(textCounter, backgroundCoin.width / 2, backgroundCoin.height / 13);

    // Shop

    setContainerCoordinates(containerShop, app.renderer.width - app.renderer.width / 5, backgroundUpgradeShopTitle.height);

    setContainerDimensions(containerShop.backgroundUpgrades, app.renderer.width / 5, app.renderer.height / 6)

    drawContainerLine(containerShop.backgroundUpgradeAmount, 2);

    drawRectangle(containerShop.backgroundUpgradeAmount, 0xFCA00A, 0, 0, app.renderer.width / 5, app.renderer.height / 6);

    setContainerCoordinates(containerShop.backgroundUpgrades, 0, containerShop.backgroundUpgradeAmount.height);

    drawRectangle(containerShop.backgroundUpgrades, 0xE0E0DC, 0, 0, app.renderer.width / 5, app.renderer.height - containerShop.backgroundUpgradeAmount.height - backgroundUpgradeShopTitle.height - app.renderer.height / 15);

    setContainerCoordinates(containerProductionShop, containerProductionShop.x, containerShop.backgroundUpgradeAmount.height);

    // Shop Buttons zeichnen

    for (let i = 0; i < productions.length; i++) {

        containerProductionShop.getChildAt(i).getChildAt(0).clear();

        setContainerCoordinates(containerProductionShop.getChildAt(i).getChildAt(0), containerProductionShop.x, 0);

        drawContainerLine(containerProductionShop.getChildAt(i).getChildAt(0), 1);
        drawMultipleRectangle(containerProductionShop.getChildAt(i).getChildAt(0), 0xFFCD5D, containerUpgradeShop.getChildAt(0).x, 0, (window.innerWidth / 5) - 30, app.renderer.height / 9, (-containerShop.backgroundUpgradeAmount.height/1.5) * i);

        changeText(containerProductionShop.getChildAt(i).getChildAt(0).getChildAt(0), 1, containerProductionShop.getChildAt(i).getChildAt(0).width / 2, containerProductionShop.getChildAt(i).getChildAt(0).height / 5, 0.5, 0.5);
        changeText(containerProductionShop.getChildAt(i).getChildAt(0).getChildAt(1), 2, containerProductionShop.getChildAt(i).getChildAt(0).width / 20, containerProductionShop.getChildAt(i).getChildAt(0).height / 1.8, 0, 0.5);
        changeText(containerProductionShop.getChildAt(i).getChildAt(0).getChildAt(2), 2, containerProductionShop.getChildAt(i).getChildAt(0).width / 20, containerProductionShop.getChildAt(i).getChildAt(0).height / 1.3, 0, 0.5);

    }

    // Bottom

    setContainerCoordinates(containerBottom, 0, app.renderer.height - app.renderer.height / 15);

    drawContainerLine(backgroundBottom, 2);

    drawRectangle(backgroundBottom, 0xD66D60, 0, 0, app.renderer.width, app.renderer.height / 15);

    setTextCoordinates(achievementText, containerBottom.width / 200, backgroundBottom.height / 3);

    setContainerCoordinates(containerResetButton, app.renderer.width * 0.865, containerBottom.height / 6);

    drawContainerLine(backgroundResetButton, 2);

    drawRectangle(backgroundResetButton, 0xD6443D, 0, 0, containerResetButton.width / 0.85, app.renderer.height / 25);

    setTextCoordinates(resetButtonTextFirst, containerResetButton.width / 7, containerResetButton.y * 0.3);

    setTextCoordinates(resetButtonTextSecond, containerResetButton.width / 15, containerResetButton.y * 0.01);

    // Buy Button Text

    buyAmountText = createNewText("Menge", 1, backgroundUpgradeShopTitle.width / 2, backgroundUpgradeShopTitle.height / 3, 0.5, 0.5);
    buyOneText = createNewText("x1", 2, backgroundUpgradeShopTitle.width / 3.9, backgroundUpgradeShopTitle.height * 0.825, 0.5, 0.5);
    buyFiveText = createNewText("x5", 2, backgroundUpgradeShopTitle.width / 2, backgroundUpgradeShopTitle.height * 0.825, 0.5, 0.5);
    buyTenText = createNewText("x10", 2, backgroundUpgradeShopTitle.width / 1.325, backgroundUpgradeShopTitle.height * 0.825, 0.5, 0.5);

    // Display Funktionen

    //displayProductions();
    //displayShopButtons();
    displayBuyAmountButtons();

}

function gameLoop(delta) {

    counter.increase(calculateProduction() / 60 * delta);
    updateDisplayProduction();
    updateDisplayShopButtons();

    gameData.checkAchievements();
    gameData.getCurrentCurrencyCount(this.counter.counter);

    for (let i = 0; i < coin.children.length; i++) {
        coin.getChildAt(i).y -= 3;
        coin.getChildAt(i).alpha -= 0.01;
        if (coin.getChildAt(i).alpha <= 0) {
            coin.removeChildAt(i);
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

/*
function displayProductions() {

    this.productions = gameData.productions;
    this.pictures = gameData.pictures;

    for (let i = 0; i < this.productions.length; i++) {
        let productionUpgrade = new PIXI.Container();
        let backgroundProductionContainer = new PIXI.Graphics();

        backgroundProductionContainer.x = 30;
        drawContainerLine(backgroundProductionContainer, 1);
        drawMultipleRectangle(backgroundProductionContainer, 0x938FBD, 0, 0, app.renderer.width / 4 - 30, app.renderer.height / 8, -(app.renderer.height / 8) * i);

        let textProduction = createNewText(productions[i]["productionType"], 0.75, 10, backgroundProductionContainer.height / 5, 0, 0.5);
        let textGenerationPerSecond = createNewText("Münzen/sec: " + productions[i]["generatingValue"], 2, 10, backgroundProductionContainer.height / 1.8, 0, 0.5);
        let textAmountProduction = createNewText("Menge: " + productions[i]["amount"], 2, 10, backgroundProductionContainer.height / 1.4, 0, 0.5);

        let productionIcon = createNewSprite(pictures[i], backgroundProductionContainer.width / 1.25, backgroundProductionContainer.height / 2, 0.15, 0.15, 0.5);

        containerProductions.addChild(productionUpgrade);
        productionUpgrade.addChild(backgroundProductionContainer);
        backgroundProductionContainer.addChild(textProduction);
        backgroundProductionContainer.addChild(textAmountProduction);
        backgroundProductionContainer.addChild(textGenerationPerSecond);
        backgroundProductionContainer.addChild(productionIcon);

    }
}
*/

function updateDisplayProduction() {

    for (let i = 0; i < productions.length; i++) {
        containerProductions.getChildAt(i).getChildAt(0).getChildAt(1).text = "Menge: " + convertNumber(productions[i].getAmount());
        containerProductions.getChildAt(i).getChildAt(0).getChildAt(2).text = "Münzen/sec: " + convertNumber(Math.round(productions[i].getProductionValue() * 100) / 100);
    }

}

function updateDisplayShopButtons() {
    for (let i = 0; i < productions.length; i++) {
        containerProductionShop.getChildAt(i).getChildAt(0).getChildAt(1).text = "Preis: " + convertNumber(Math.round(productions[i].getBuyingPrice(buyAmount)));
        containerProductionShop.getChildAt(i).getChildAt(0).getChildAt(2).text = "Münzen/sec: " + convertNumber(Math.round(productions[i].getProductionAmount(buyAmount) * 100) / 100);
    }
}

/*
function displayShopButtons() {

    this.shop = gameData.productions;

    for (let i = 0; i < this.shop.length; i++) {
        let upgradeButton = new PIXI.Container();
        let backgroundUpgradeButton = new PIXI.Graphics();

        drawContainerLine(backgroundUpgradeButton, 1);
        drawMultipleRectangle(backgroundUpgradeButton, 0xFFCD5D, backgroundUpgradeButton.x, containerShop.backgroundUpgradeAmount.height + (app.renderer.height / 8) * i, app.renderer.width / 5 - 30, app.renderer.height / 8, containerShop.backgroundUpgradeAmount.height);

        let textUpgradeButton = createNewText(productions[i]["productionType"], 1, backgroundUpgradeButton.width / 2, (backgroundProductionTitle.height * i) + backgroundUpgradeButton.height / 0.65, 0.5, 0.5);
        let textPriceUpgrade = createNewText("Preis: " + Math.round(productions[i].getBuyingPrice(1)), 2, textUpgradeButton.x, textUpgradeButton.y + backgroundUpgradeShopTitle.height / 5, 0.5, 0.5);
        let textCoinProductionPerSecond = createNewText("Münzen/sec: " + Math.round(productions[i].getProductionAmount(buyAmount)), 2, textUpgradeButton.x, textUpgradeButton.y + backgroundUpgradeShopTitle.height / 2, 0.5, 0.5);

        containerProductionShop.addChild(upgradeButton);
        upgradeButton.addChild(backgroundUpgradeButton);
        backgroundUpgradeButton.addChild(textUpgradeButton);
        backgroundUpgradeButton.addChild(textPriceUpgrade);
        backgroundUpgradeButton.addChild(textCoinProductionPerSecond);

        buttonLogic.applyButtonBehavior(upgradeButton, 0, productions[i]["productionType"]);
    }
}
*/

function displayBuyAmountButtons() {

    drawContainerLine(buyOneBackground, 1);
    drawContainerLine(buyFiveBackground, 1);
    drawContainerLine(buyTenBackground, 1);

    drawRectangle(buyOneBackground, 0x6BB6D6, backgroundUpgradeShopTitle.width / 6, backgroundUpgradeShopTitle.height / 1.5, backgroundUpgradeShopTitle.width / 5.5, backgroundUpgradeShopTitle.height / 3);
    drawRectangle(buyFiveBackground, 0x6BB6D6, backgroundUpgradeShopTitle.width / 2.4, backgroundUpgradeShopTitle.height / 1.5, backgroundUpgradeShopTitle.width / 5.5, backgroundUpgradeShopTitle.height / 3);
    drawRectangle(buyTenBackground, 0x6BB6D6, backgroundUpgradeShopTitle.width / 1.5, backgroundUpgradeShopTitle.height / 1.5, backgroundUpgradeShopTitle.width / 5.5, backgroundUpgradeShopTitle.height / 3);

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

    convertToButton(buyOneBackground);
    convertToButton(buyFiveBackground);
    convertToButton(buyTenBackground);

    buyOneBackground.on('pointerdown', (event) => {
        this.buyAmount = 1;
        drawRectangle(buyOneBackground, 0x6490A4, backgroundUpgradeShopTitle.width / 6, backgroundUpgradeShopTitle.height / 1.5, backgroundUpgradeShopTitle.width / 5.5, backgroundUpgradeShopTitle.height / 3);
        drawRectangle(buyFiveBackground, 0x6BB6D6, backgroundUpgradeShopTitle.width / 2.4, backgroundUpgradeShopTitle.height / 1.5, backgroundUpgradeShopTitle.width / 5.5, backgroundUpgradeShopTitle.height / 3);
        drawRectangle(buyTenBackground, 0x6BB6D6, backgroundUpgradeShopTitle.width / 1.5, backgroundUpgradeShopTitle.height / 1.5, backgroundUpgradeShopTitle.width / 5.5, backgroundUpgradeShopTitle.height / 3);
    });

    buyFiveBackground.on('pointerdown', (event) => {
        this.buyAmount = 5;
        drawRectangle(buyOneBackground, 0x6BB6D6, backgroundUpgradeShopTitle.width / 6, backgroundUpgradeShopTitle.height / 1.5, backgroundUpgradeShopTitle.width / 5.5, backgroundUpgradeShopTitle.height / 3);
        drawRectangle(buyFiveBackground, 0x6490A4, backgroundUpgradeShopTitle.width / 2.4, backgroundUpgradeShopTitle.height / 1.5, backgroundUpgradeShopTitle.width / 5.5, backgroundUpgradeShopTitle.height / 3);
        drawRectangle(buyTenBackground, 0x6BB6D6, backgroundUpgradeShopTitle.width / 1.5, backgroundUpgradeShopTitle.height / 1.5, backgroundUpgradeShopTitle.width / 5.5, backgroundUpgradeShopTitle.height / 3);
    });

    buyTenBackground.on('pointerdown', (event) => {
        this.buyAmount = 10;
        drawRectangle(buyOneBackground, 0x6BB6D6, backgroundUpgradeShopTitle.width / 6, backgroundUpgradeShopTitle.height / 1.5, backgroundUpgradeShopTitle.width / 5.5, backgroundUpgradeShopTitle.height / 3);
        drawRectangle(buyFiveBackground, 0x6BB6D6, backgroundUpgradeShopTitle.width / 2.4, backgroundUpgradeShopTitle.height / 1.5, backgroundUpgradeShopTitle.width / 5.5, backgroundUpgradeShopTitle.height / 3);
        drawRectangle(buyTenBackground, 0x6490A4, backgroundUpgradeShopTitle.width / 1.5, backgroundUpgradeShopTitle.height / 1.5, backgroundUpgradeShopTitle.width / 5.5, backgroundUpgradeShopTitle.height / 3);
    });
}

function calculateProduction() {

    let value = 0;

    for (let i = 0; i < gameData.productions.length; i++) {
        value += gameData.productions[i].getProductionValue();
    }

    return value;

}

scrollingContainer(containerProductionShop, "right", app.renderer.width / 5, app.renderer.height - backgroundUpgradeShopTitle.height - containerShop.backgroundUpgradeAmount.height - app.renderer.height / 15);
scrollingContainer(containerProductions, "left", app.renderer.width / 4, app.renderer.height - backgroundProductionTitle.height - app.renderer.height / 15);

function scrollingContainer(container, position, width, height) {
    let mask = new PIXI.Graphics();

    drawRectangle(mask, 0x000000, 0, 0, width, height);

    container.mask = mask;
    container.addChild(mask);

    let scrollBar = new PIXI.Graphics();
    scrollBar.beginFill(0x999896);
    let x;
    if (position == "right") {
        x = container.width
    } else {
        x = 0
    }
    scrollBar.drawRect(x, 0, 30, mask.height - (container.height - mask.height));
    scrollBar.interactive = true;
    container.addChild(scrollBar);

    let oldPosition;
    let newPosition;
    let dragging = false;

    scrollBar
        .on('pointerdown', (ev) => {
            oldPosition = ev.data.getLocalPosition(container);
            dragging = true;
        })
        .on('pointerup', (ev) => {
            dragging = false;
        })
        .on('pointerout', (ev) => {
            dragging = false;
        })
        .on('pointermove', (ev) => {
            if (dragging == true) {
                newPosition = ev.data.getLocalPosition(container);
                let distance = newPosition.y - oldPosition.y
                if (scrollBar.y + distance >= -1 && scrollBar.y + scrollBar.height + distance <= container.mask.height) {
                    scrollBar.y += distance;
                    for (let i = 0; i < productions.length; i++) {
                        container.getChildAt(i).y -= newPosition.y - oldPosition.y;
                    }
                    oldPosition = ev.data.getLocalPosition(container);
                }
            }
        });
}

function drawContainerLine(container, width) {
    container.line.alignment = 0;
    container.line.color = 0x000000;
    container.line.width = width;
    container.line.visible = true;
}

function drawRectangle(container, color, x, y, width, height) {
    container.beginFill(color);
    container.drawRect(
        x,
        y,
        width,
        height
    );
    container.endFill();
}

function drawMultipleRectangle(container, color, x, y, width, height, yChange) {
    container.y -= yChange;
    container.beginFill(color);
    container.drawRect(
        x,
        y,
        width,
        height
    );
    container.endFill();
}

function setContainerCoordinates(container, x, y) {
    container.x = x;
    container.y = y;
}

function setContainerDimensions(container, width, height) {
    container.width = width;
    container.height = height;
}

function convertToButton(background) {
    background.interactive = true;
    background.buttonMode = true;
}

function createNewText(text, size, x, y, anchorX, anchorY) {
    let tempText = new PIXI.Text(text, { fontFamily: 'Helvetica', fontSize: fontSize / size, fill: 0x000000 });
    tempText.resolution = 2;
    tempText.anchor.set(anchorX, anchorY);
    setTextCoordinates(tempText, x, y);
    return tempText;
}

function changeText(text, size, x, y, anchorX, anchorY) {
    text.style = { fontFamily: 'Helvetica', fontSize: fontSize / size, fill: 0x000000 };
    text.x = x;
    text.y = y;
    text.anchor.set(anchorX, anchorY);
}

function setTextCoordinates(text, x, y) {
    text.x = x;
    text.y = y;
}

function createNewSprite(sprite, x, y, scaleX, scaleY, anchor) {
    let tempSprite = new PIXI.Sprite.from(sprite);
    tempSprite.x = x;
    tempSprite.y = y;
    tempSprite.scale.x *= scaleX;
    tempSprite.scale.y *= scaleY;
    tempSprite.anchor.set(anchor);
    return tempSprite;
}

function changeSprite(sprite, x, y, scaleX, scaleY, anchor) {
    sprite.x = x;
    sprite.y = y;
    sprite.scale.x = scaleX;
    sprite.scale.y = scaleY;
    sprite.anchor.set(anchor);
}

function setObjectCoordinates(object, x, y) {
    object.x = x;
    object.y = y;
}

function setObjectScale(object, scaleX, scaleY) {
    object.scale.x = scaleX;
    object.scale.y = scaleY;
}

/* Scrolling
for (let i = 0; i < gameData.productions.length; i++) {
        container.getChildAt(i + 2).getChildAt(0).on('scroll', (ev) => {
            var scrollSpeed = ev.wheelDelta ;
                if (container.getChildAt(2).y <= 0 && container.height + container.getChildAt(2).y >= container.mask.height) {
                    console.log(scrollSpeed)
                    if (container.getChildAt(2).y - scrollSpeed <= 0 && container.height + container.getChildAt(2).y - scrollSpeed * 2>= container.mask.height ) {
                        for (let i = 0; i < productions.length; i++) {

                            container.getChildAt(i + 2).y -= scrollSpeed;
                        }
                    }
                }

            shopMask.interactive = false;
        });
    }


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

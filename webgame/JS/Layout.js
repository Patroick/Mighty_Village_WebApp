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

app.ticker.add(delta => gameLoop(delta));



function setup() {

    buyAmount = 1;

    dataStore = new DataStorage();
    counter = new Counter();
    gameData = new GameData();
    buttonLogic = new ButtonLogic();

    if (document.cookie) {
        gameData.overrideGameData(dataStore.loadData());
    }

    // Upgrade Shop Text

    containerUpgradeShop = new PIXI.Container();
    backgroundUpgradeShopTitle = new PIXI.Graphics();
    textUpgradeShopTitle = new PIXI.Text('Upgrade Shop', font);
    textUpgradeShopTitle.resolution = 2;
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
    coin.interactive = true;
    coin.buttonMode = true;

    textCounter = new PIXI.Text("Münzen " + counter.counter, font);
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
        .on('pointerout', coin.hoverOver)
        .on('pointercancel', coin.cancel);

    // Shop

    containerShop = new ShopProduction();

    app.stage.addChild(containerShop);


    containerProductionShop = new PIXI.Container();
    containerShop.addChild(containerProductionShop)

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

    font = { fontFamily: 'Helvetica', fontSize: app.renderer.width / 50, fill: 0x000000 };

    backgroundProductionTitle.clear();
    backgroundProduction.clear();
    backgroundUpgradeShopTitle.clear();
    backgroundCoin.clear();
    containerShop.backgroundUpgradeAmount.clear();
    backgroundResetButton.clear();

    // Upgrade Shop Text

    containerUpgradeShop.x = (app.renderer.width - app.renderer.width / 5);
    containerUpgradeShop.y = 0;

    drawContainerLine(backgroundUpgradeShopTitle, 2);

    backgroundUpgradeShopTitle.beginFill(0xD6862B);
    backgroundUpgradeShopTitle.drawRect(0, 0, app.renderer.width / 5, app.renderer.height / 8);
    backgroundUpgradeShopTitle.endFill();
    textUpgradeShopTitle.x = backgroundUpgradeShopTitle.width / 2;
    textUpgradeShopTitle.y = backgroundUpgradeShopTitle.height / 2;
    textUpgradeShopTitle.style = font

    // Produktionsanzeige

    containerProduction.x = 0;
    containerProduction.y = 0;

    drawContainerLine(backgroundProductionTitle, 2);

    backgroundProductionTitle.beginFill(0x5B53B5);
    backgroundProductionTitle.drawRect(0, 0, app.renderer.width / 4, app.renderer.height / 8);
    backgroundProductionTitle.endFill();
    textProductionTitle.x = backgroundProductionTitle.width / 2;
    textProductionTitle.y = backgroundProductionTitle.height / 2;
    backgroundProduction.beginFill(0xE0E0DC);
    backgroundProduction.drawRect(0, backgroundProductionTitle.height, backgroundProductionTitle.width, app.renderer.height - backgroundProductionTitle.height - app.renderer.height / 15);
    backgroundProduction.endFill();

    containerProductions.y += backgroundProductionTitle.height;

    // Coin

    containerCoin.x = backgroundProductionTitle.width;
    containerCoin.y = 0;

    drawContainerLine(backgroundCoin, 2);

    backgroundCoin.beginFill(0xCEDDF0);
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

    drawContainerLine(containerShop.backgroundUpgradeAmount, 2);

    containerShop.backgroundUpgradeAmount.beginFill(0xFCA00A);
    containerShop.backgroundUpgradeAmount.drawRect(0, 0, app.renderer.width / 5, app.renderer.height / 6);
    containerShop.backgroundUpgradeAmount.endFill();

    containerShop.backgroundUpgrades.x = 0;
    containerShop.backgroundUpgrades.y = containerShop.backgroundUpgradeAmount.height;

    containerShop.backgroundUpgrades.beginFill(0xE0E0DC);
    containerShop.backgroundUpgrades.drawRect(0, 0, app.renderer.width / 5, app.renderer.height - containerShop.backgroundUpgradeAmount.height - backgroundUpgradeShopTitle.height - app.renderer.height / 15);
    containerShop.backgroundUpgrades.endFill();


    containerProductionShop.y += containerShop.backgroundUpgradeAmount.height;

    // Bottom

    containerBottom.x = 0;
    containerBottom.y = app.renderer.height - app.renderer.height / 15;

    drawContainerLine(backgroundBottom,2);

    backgroundBottom.beginFill(0xD66D60);
    backgroundBottom.drawRect(0, 0, app.renderer.width, app.renderer.height / 15);
    backgroundBottom.endFill();

    achievementText.x = containerBottom.width / 200;
    achievementText.y = backgroundBottom.height / 3;

    containerResetButton.x = app.renderer.width * 0.865;
    containerResetButton.y = containerBottom.height / 6;

    drawContainerLine(backgroundResetButton,2);

    backgroundResetButton.beginFill(0xD6443D);
    backgroundResetButton.drawRect(0, 0, containerResetButton.width / 0.85, app.renderer.height / 25);
    backgroundResetButton.endFill();

    resetButtonTextFirst.x = containerResetButton.width / 7;
    resetButtonTextFirst.y = containerResetButton.y * 0.3;

    resetButtonTextSecond.x = containerResetButton.width / 15;
    resetButtonTextSecond.y = containerResetButton.y * 0.01;

    displayProductions();
    displayShopButtons();
    displayBuyAmountButtons();

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
        let productionUpgrade = new PIXI.Container();
        let backgroundProductionContainer = new PIXI.Graphics();
        backgroundProductionContainer.x = 30;

        drawContainerLine(backgroundProductionContainer, 1);
        drawMultipleRectangle(backgroundProductionContainer, 0x938FBD, 0, 0, app.renderer.width / 4 - 30, app.renderer.height / 8, -(app.renderer.height / 8) * i);

        let textProduction = createNewText(productions[i]["productionType"], 1, 10, backgroundProductionContainer.height / 5, 0, 0.5);
        let textGenerationPerSecond = createNewText(productions[i]["productionType"], 2, 10, backgroundProductionContainer.height / 2, 0, 0.5);
        let textAmountProduction = createNewText(productions[i]["productionType"], 2, 10, backgroundProductionContainer.height / 1.5, 0, 0.5);

        let productionIcon = createNewSprite(pictures[i], backgroundProductionContainer.width / 1.25, backgroundProductionContainer.height / 2 , 0.15, 0.15, 0.5);

        containerProductions.addChild(productionUpgrade);
        productionUpgrade.addChild(backgroundProductionContainer);
        backgroundProductionContainer.addChild(textProduction);
        backgroundProductionContainer.addChild(textAmountProduction);
        backgroundProductionContainer.addChild(textGenerationPerSecond);
        backgroundProductionContainer.addChild(productionIcon);

    }
}

function updateDisplayProduction() {

    for (let i = 0; i < productions.length; i++) {
        containerProductions.getChildAt(i).getChildAt(0).getChildAt(1).text = "Menge: " + productions[i].getAmount(); // + 3 weil der erste Produktions Container bei 3 startet
        containerProductions.getChildAt(i).getChildAt(0).getChildAt(2).text = "Münzen/sec: " + productions[i].getProductionValue();
    }

}

function updateDisplayShopButtons() {
    for (let i = 0; i < productions.length; i++) {
        containerProductionShop.getChildAt(i).getChildAt(0).getChildAt(1).text = "Preis: " + Math.round(productions[i].getBuyingPrice(buyAmount));
        containerProductionShop.getChildAt(i).getChildAt(0).getChildAt(2).text = "Münzen/sec: " + Math.round(productions[i].getProductionAmount(buyAmount));
    }
}


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

function displayBuyAmountButtons() {

    buyOne = new PIXI.Container();
    buyFive = new PIXI.Container();
    buyTen = new PIXI.Container();

    buyOneBackground = new PIXI.Graphics();
    buyFiveBackground = new PIXI.Graphics();
    buyTenBackground = new PIXI.Graphics();

    drawContainerLine(buyOneBackground, 1);
    drawContainerLine(buyFiveBackground, 1);
    drawContainerLine(buyTenBackground, 1);

    buyAmountText = createNewText("Menge", 1, backgroundUpgradeShopTitle.width / 2, backgroundUpgradeShopTitle.height / 3, 0.5, 0.5);
    buyOneText = createNewText("x1", 2, backgroundUpgradeShopTitle.width / 3.9, backgroundUpgradeShopTitle.height * 0.825, 0.5, 0.5);
    buyFiveText = createNewText("x5", 2, backgroundUpgradeShopTitle.width / 2, backgroundUpgradeShopTitle.height * 0.825, 0.5, 0.5);
    buyTenText = createNewText("x10", 2, backgroundUpgradeShopTitle.width / 1.325, backgroundUpgradeShopTitle.height * 0.825, 0.5, 0.5);

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

scrollingContainer(containerProductionShop, "right",app.renderer.width / 5, app.renderer.height - backgroundUpgradeShopTitle.height - containerShop.backgroundUpgradeAmount.height - app.renderer.height / 15);
scrollingContainer(containerProductions, "left", app.renderer.width / 4, app.renderer.height - backgroundProductionTitle.height - app.renderer.height / 15);

function scrollingContainer(container, position, width, height) {
    let mask = new PIXI.Graphics();

    mask.beginFill(0x000000);
    mask.drawRect(0, 0, width , height);
    mask.endFill();

    container.mask = mask;
    container.addChild(mask);

    let scrollBar = new PIXI.Graphics();
    scrollBar.beginFill(0x999896);
    let x;
    if(position == "right"){
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
        .on('pointerdown', (ev) =>{
            oldPosition = ev.data.getLocalPosition(container);
            dragging = true;
        })
        .on('pointerup', (ev) =>{
            dragging = false;
        })
        .on('pointerout', (ev) =>{
            dragging = false;
        })
        .on('pointermove', (ev) =>{
            if(dragging == true) {
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

function convertToButton(background) {
    background.interactive = true;
    background.buttonMode = true;
}

function createNewText(text, size, x, y, anchorx, anchory) {
    let tempText = new PIXI.Text(text, { fontFamily: 'Helvetica', fontSize: fontSize / size, fill: 0x000000 });
    tempText.resolution = 2;
    tempText.anchor.set(anchorx, anchory);
    tempText.x = x;
    tempText.y = y;
    return tempText;
}

function createNewSprite(sprite, x, y, scalex, scaley, anchor) {
    let tempSprite = new PIXI.Sprite.from(sprite);
    tempSprite.x = x;
    tempSprite.y= y;
    tempSprite.scale.x *= scalex;
    tempSprite.scale.y *= scaley;
    tempSprite.anchor.set(anchor);
    return tempSprite;
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

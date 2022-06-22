// Erstellt eine neue PIXI Applikation mit der aktuellen Fensterbreite und Fensterhöhe und setzt die Auflösung auf 1
let app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    resolution: 1,
});


// Event Listener für ein Resize Event des Browser Fensters
window.addEventListener('resize', resize);

// Setzt die Canvas Position absolut 
app.renderer.view.style.position = "absolute";
// Setzt die Display Art des Canvas auf block
app.renderer.view.style.display = "block";

// App wird als Kind auf das aktuelle Dokument hinzugefügt
document.body.appendChild(app.view);

// Globale schriftgröße, welche sich an die größe des Bildschirms anpasst
fontSize = window.innerWidth / 60;

// Globale font
font = { fontFamily: 'Helvetica', fontSize: fontSize, fill: 0x000000, align: 'left' };

// Methodenaufruf der setup Methode
setup();

/*
    Wird vom Event Lisetener bei einem Resize Event aufgerufen
    Passt die Größe der App and die größe des Fensters an
    Ruft die setLayout() Methode auf um die vorherigen Hintergründe und Texte zu entfernen um diese anschließend passend zur Fenstergröße neu zu zeichnen
    location.reload() ladet das ganze Fenster nochmal neu, da wir bei Resize auf ein größeres Fenster ein Problem hatten welches unlösbar scheint
*/
function resize() {
    app.resizeTo = window;
    setLayout();
    location.reload();
}

ticker = app.ticker;
ticker.minFPS = 1;
app.ticker.maxFPS = 60;

//let timeBlur;
//let timeFocus;

/*
    Falls die App in den Hintergrund verschoben wird, also kein aktiver Tab mehr ist, wird das Intervall erhöht,
    damit die App mit der gleichen Geschwindigkeit im Hintergrund weiterläuft
*/
window.onblur = () => {
    //timeBlur = Date.now();
    //console.log(counter.counter);
    ticker.stop();
    setInterval(() => {
        gameLoop(1);
    }, 1000);
}

// Wird das Fenster wieder in Focus gebracht, resetet sich das Intervall und der originale Ticker bestimmt wieder die geschwindigkeit
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

// Erstellt Objekte und Elemente erhalten ihre Logik
function setup() {

    // Buy Amount (die Menge die bei Klicken auf eine Productionscontainer beim Kauf verwendet wird, also die Menge) wird standardmäßig auf 1 gesetzt
    buyAmount = 1;

    // Erzeugen von neuen Objekten welche für den Gameloop und das Spiel an sich benötigt werden
    dataStore = new DataStorage();
    counter = new Counter();
    gameData = new GameData();
    buttonLogic = new ButtonLogic();

    // Arrays welche die Produktionsgeböude und die Bilder beinhalten
    productions = gameData.productions;
    pictures = gameData.pictures;

    // Wenn Cookie vorhanden -> Spieldaten überschreiben
    if (document.cookie) {
        gameData.overrideGameData(dataStore.loadData());
    }

    // Upgrade Shop Text

    // Neuen Pixi Container erstellen
    containerUpgradeShop = new PIXI.Container();

    // Neue Pixi Graphic erstellen
    backgroundUpgradeShopTitle = new PIXI.Graphics();

    /* 
        Text wird initialisiert mit Text der angezeigt wird, Fontsize, Koordinaten und wo im Text sich die Anker Punkte befinden.
        d.h. Anchor 0.5, 0.5 = Anchor ist Mittig im Text und somit wird der Text von diesem Punkt aus verschoben
        Anchor 0, 0.5 wäre ganz links (x = 0) und in der Mitte auf der y-Achse
    */
    textUpgradeShopTitle = createNewText("Upgrade Shop", 1, 0, 0, 0.5, 0.5);

    // fügt den ContainerUpgradeShop als Kind auf die app.stage hinzu
    app.stage.addChild(containerUpgradeShop);

    // fügt den backgroundUpgradeShopTitle und textUpgradeShopTitle als Kind auf den containerUpgradeShop hinzu
    containerUpgradeShop.addChild(backgroundUpgradeShopTitle);
    containerUpgradeShop.addChild(textUpgradeShopTitle);

    // Produktions Anzeige 

    containerProduction = new PIXI.Container();
    backgroundProductionTitle = new PIXI.Graphics();

    textProductionTitle = createNewText("Production", 1, 0, 0, 0.5, 0.5);
    textProductionValuePerSecond = createNewText("Generation/sec: " + gameData.getAllProductionValue(), 2, 0, 0, 0.5, 0.5);

    backgroundProduction = new PIXI.Graphics();
    containerProductions = new PIXI.Container();

    app.stage.addChild(containerProduction);
    containerProduction.addChild(backgroundProductionTitle);
    containerProduction.addChild(textProductionTitle);
    containerProduction.addChild(backgroundProduction);
    containerProduction.addChild(containerProductions);
    containerProduction.addChild(textProductionValuePerSecond);

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
        .on('pointerout', coin.cancel)
        .on('pointercancel', coin.cancel);

    // Shop

    containerShop = new PIXI.Container();
    backgroundUpgradeAmount = new PIXI.Graphics();
    backgroundUpgrades = new PIXI.Graphics();

    containerShop.addChild(backgroundUpgradeAmount);
    containerShop.addChild(backgroundUpgrades);

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

    /* 
        Erstellt für jedes Produktionsgebäude im productions Array einen Container, einen Hintergrund, 3 Texte und 1 Sprite (dieser kommt vom pictures Array)
        Anschließend werden jeweils mit addChild auf die passenden Container hinzugefügt
    */
    for (let i = 0; i < productions.length; i++) {
        let productionUpgrade = new PIXI.Container();
        let backgroundProductionContainer = new PIXI.Graphics();

        let textProduction = createNewText(productions[i]["productionType"], 0.75, 0, 0, 0, 0);
        let textGenerationPerSecond = createNewText("Münzen/sec: " + convertNumber(productions[i]["generatingValue"]), 2, 0, 0, 0, 0);
        let textAmountProduction = createNewText("Menge: " + productions[i]["amount"], 2, 0, 0, 0, 0);

        let productionIcon = createNewSprite(pictures[i], 0, 0, 0, 0, 0);

        containerProductions.addChild(productionUpgrade);
        productionUpgrade.addChild(backgroundProductionContainer);
        backgroundProductionContainer.addChild(textProduction);
        backgroundProductionContainer.addChild(textAmountProduction);
        backgroundProductionContainer.addChild(textGenerationPerSecond);
        backgroundProductionContainer.addChild(productionIcon);

    }

    /*
        Erstellt für jedes Produktionsgebäude im productions Array einen Container einen Hintergrund und 3 Texte im Upgrade Shop
        Anschließend werden jeweils mit addChild auf die passenden Container hinzugefügt
        Am Ende wird noch jedem "Button" Container die Button Behavior hinzugefügt, damit man Produktionsgebäude kaufen kann
    */
    for (let i = 0; i < productions.length; i++) {

        let upgradeButton = new PIXI.Container();
        let backgroundUpgradeButton = new PIXI.Graphics();

        let textUpgradeButton = createNewText(productions[i]["productionType"], 1, 0, 0, 0, 0);
        let textPriceUpgrade = createNewText("Preis: " + Math.round(productions[i].getBuyingPrice(1)), 2, 0, 0, 0, 0);
        let textCoinProductionPerSecond = createNewText("Münzen/sec: " + productions[i].getProductionAmount(buyAmount), 2, 0, 0, 0, 0);

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

/*
    Objekte werden gezeichnet und richtig positioniert
    Im Gegensatz zum setup wird das setLayout während dem ganzen Spielverlauf immer wieder aufgerufen, etwas bei einem Window Resize
*/
function setLayout() {

    // Die Graphic Container werden mit clear wieder transparent und somit ist die Farbe weg um sie Anschließend wieder neu zu zeichnen
    backgroundProductionTitle.clear();
    backgroundProduction.clear();
    backgroundUpgradeShopTitle.clear();
    backgroundCoin.clear();
    backgroundUpgradeAmount.clear();
    backgroundResetButton.clear();
    backgroundUpgrades.clear();

    buyOneBackground.clear();
    buyFiveBackground.clear();
    buyTenBackground.clear();


    // Zerstört die Texte von den Mengen Buttons und der Überschrifft, damit diese nicht beim Resizen doppelt angezeigt werden
    buyAmountText.destroy();
    buyOneText.destroy();
    buyFiveText.destroy();
    buyTenText.destroy();

    // Upgrade Shop Text

    // Setzt die Container Koordinaten vom containerUpgradeShop
    setContainerCoordinates(containerUpgradeShop, app.renderer.width - app.renderer.width / 5, 0);

    // Zeichnet die Border um den Hintergrund des Containers
    drawContainerLine(backgroundUpgradeShopTitle, 2);

    // Zeichnet das Rechteck für den Hintergrund mit der mitgegebenen Farbe und den mitgegebenen Koordinaten und Dimensionen
    drawRectangle(backgroundUpgradeShopTitle, 0xD6862B, 0, 0, app.renderer.width / 5, app.renderer.height / 8);

    // Setzt die Koordinaten des Textes
    setTextCoordinates(textUpgradeShopTitle, backgroundUpgradeShopTitle.width / 2, backgroundUpgradeShopTitle.height / 2);

    // Produktionsanzeige

    setContainerCoordinates(containerProduction, 0, 0);

    drawContainerLine(backgroundProductionTitle, 2);

    drawRectangle(backgroundProductionTitle, 0x5B53B5, 0, 0, app.renderer.width / 4, app.renderer.height / 8);

    setTextCoordinates(textProductionTitle, backgroundProductionTitle.width / 2, backgroundProductionTitle.height / 2.5);

    setTextCoordinates(textProductionValuePerSecond, backgroundProductionTitle.width / 2, backgroundProductionTitle.height / 1.5);

    drawRectangle(backgroundProduction, 0xE0E0DC, 0, backgroundProductionTitle.height, backgroundProductionTitle.width, app.renderer.height - backgroundProductionTitle.height - app.renderer.height / 15);

    setContainerCoordinates(containerProductions, containerProductions.x, backgroundProductionTitle.height);

    // Productions zeichnen

    // Zeichnet die Container für die Produktionsgebäude anzeige
    for (let i = 0; i < productions.length; i++) {

        containerProductions.getChildAt(i).getChildAt(0).clear();

        setContainerCoordinates(containerProductions.getChildAt(i).getChildAt(0), containerProductions.x, 0)

        setContainerCoordinates(containerProductions.getChildAt(i).getChildAt(0), 30, containerProductions.getChildAt(i).getChildAt(0).y);
        drawContainerLine(containerProductions.getChildAt(i).getChildAt(0), 1);
        drawMultipleRectangle(containerProductions.getChildAt(i).getChildAt(0), 0x938FBD, 0, 0, (window.innerWidth / 4) - 30, app.renderer.height / 8, -(backgroundProductionTitle.height) * i);

        changeText(containerProductions.getChildAt(i).getChildAt(0).getChildAt(0), 0.75, 10, containerProductions.getChildAt(i).getChildAt(0).height / 5, 0, 0.5);
        changeText(containerProductions.getChildAt(i).getChildAt(0).getChildAt(1), 2, 10, containerProductions.getChildAt(i).getChildAt(0).height / 1.8, 0, 0.5);
        changeText(containerProductions.getChildAt(i).getChildAt(0).getChildAt(2), 2, 10, containerProductions.getChildAt(i).getChildAt(0).height / 1.4, 0, 0.5);

        // Ändert die Sprite Koordinaten und die Dimension
        changeSprite(containerProductions.getChildAt(i).getChildAt(0).getChildAt(3), containerProductions.getChildAt(i).getChildAt(0).width / 1.25, containerProductions.getChildAt(i).getChildAt(0).height / 2,
            (containerProductions.getChildAt(i).getChildAt(0).height / 167) * 0.15, (containerProductions.getChildAt(i).getChildAt(0).height / 167) * 0.15, 0.5);

    }

    // Coin

    setContainerCoordinates(containerCoin, backgroundProductionTitle.width, 0);

    drawContainerLine(backgroundCoin, 2);

    drawRectangle(backgroundCoin, 0xCEDDF0, 0, 0, app.renderer.width - backgroundProductionTitle.width - backgroundUpgradeShopTitle.width, app.renderer.height - app.renderer.height / 15);

    // Setzt 
    setObjectCoordinates(coin, backgroundCoin.width / 2, backgroundCoin.height / 2);

    // Setzt die Scale des Coin Objektes auf die mitgegebenen Parameter
    setObjectScale(coin, containerCoin.width / 1000, containerCoin.width / 1000);

    setTextCoordinates(textCounter, backgroundCoin.width / 2, backgroundCoin.height / 13);

    // Shop

    setContainerCoordinates(containerShop, app.renderer.width - app.renderer.width / 5, backgroundUpgradeShopTitle.height);

    setContainerDimensions(backgroundUpgrades, app.renderer.width / 5, app.renderer.height / 6)

    drawContainerLine(backgroundUpgradeAmount, 2);

    drawRectangle(backgroundUpgradeAmount, 0xFCA00A, 0, 0, app.renderer.width / 5, app.renderer.height / 6);

    setContainerCoordinates(backgroundUpgrades, 0, backgroundUpgradeAmount.height);

    drawRectangle(backgroundUpgrades, 0xE0E0DC, 0, 0, app.renderer.width / 5, app.renderer.height - backgroundUpgradeAmount.height - backgroundUpgradeShopTitle.height - app.renderer.height / 15);

    setContainerCoordinates(containerProductionShop, containerProductionShop.x, backgroundUpgradeAmount.height);

    // Shop Buttons zeichnen

    // Zeichnet die Shop Buttons
    for (let i = 0; i < productions.length; i++) {

        containerProductionShop.getChildAt(i).getChildAt(0).clear();

        setContainerCoordinates(containerProductionShop.getChildAt(i).getChildAt(0), containerProductionShop.x, 0);

        drawContainerLine(containerProductionShop.getChildAt(i).getChildAt(0), 1);
        drawMultipleRectangle(containerProductionShop.getChildAt(i).getChildAt(0), 0xFFCD5D, containerUpgradeShop.getChildAt(0).x, 0, (window.innerWidth / 5) - 30, app.renderer.height / 9, (-backgroundUpgradeAmount.height/1.5) * i);

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

    displayBuyAmountButtons();

}

function gameLoop(delta) {

    counter.increase(calculateProduction() / 60 * delta);
    updateDisplayProduction();
    updateDisplayShopButtons();
    updateGenerationPerSecond();

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

// Local Storage anstatt cookies


function updateDisplayProduction() {

    for (let i = 0; i < productions.length; i++) {
        containerProductions.getChildAt(i).getChildAt(0).getChildAt(1).text = "Menge: " + convertNumber(productions[i].getAmount());
        containerProductions.getChildAt(i).getChildAt(0).getChildAt(2).text = "Münzen/sec: " + Math.round(productions[i].getProductionValue() * 100 )/ 100;
    }

}

function updateDisplayShopButtons() {
    for (let i = 0; i < productions.length; i++) {
        containerProductionShop.getChildAt(i).getChildAt(0).getChildAt(1).text = "Preis: " + convertNumber(Math.round(productions[i].getBuyingPrice(buyAmount)));
        containerProductionShop.getChildAt(i).getChildAt(0).getChildAt(2).text = "Münzen/sec: " + Math.round(productions[i].getProductionAmount(buyAmount) * 100) / 100;
    }
}

function updateGenerationPerSecond() {
    containerProduction.getChildAt(4).text = "Generation/sec: " + gameData.getAllProductionValue();
}

// Zeichnet die Mengen Buttons x1, x5 und x10 mit den dazugehörigen Texten und Funktionen der Buttons (Behavior)
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

scrollingContainer(containerProductionShop, "right", app.renderer.width / 5, app.renderer.height - backgroundUpgradeShopTitle.height - backgroundUpgradeAmount.height - app.renderer.height / 15);
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

/*
    Die Nachfolgenden Funktionen dienen dazu, den Code eine möglichst lose Kopplung zu geben
    Es wurden dadurch sehr viele Zeilen Code weniger und der Code ist übersichtlicher
*/

// Zeichnet die Border mit der mitgegebenen Breite (in px) bei dem mitgegebenen Container 
function drawContainerLine(container, width) {
    container.line.alignment = 0;
    container.line.color = 0x000000;
    container.line.width = width;
    container.line.visible = true;
}

// Zeichnet den Hintergrund als ein Rechteck mit dem mitgebenen Parametern
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

/*
    Zeichnet den Hintergrund als ein Rechteck mit dem mitgebenen Parametern
    Wird in den for loops verwendet, da sich dort die y Koordinate stets ändert
*/
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

// Setzt die Koordinaten des mitgegebenen Containers auf die mitgegebenen Koordinaten
function setContainerCoordinates(container, x, y) {
    container.x = x;
    container.y = y;
}

// Setzt die Dimension des mitgegebenen Containers auf die mitgegebenen Dimensionen
function setContainerDimensions(container, width, height) {
    container.width = width;
    container.height = height;
}

// Macht den mitgegebenen Container interaktiv und zu einem Button 
function convertToButton(container) {
    container.interactive = true;
    container.buttonMode = true;
}

// Erstellt einen neuen Text mit den mitgegebenen Parametern
function createNewText(text, size, x, y, anchorX, anchorY) {
    let tempText = new PIXI.Text(text, { fontFamily: 'Helvetica', fontSize: fontSize / size, fill: 0x000000 });
    tempText.resolution = 2;
    tempText.anchor.set(anchorX, anchorY);
    setTextCoordinates(tempText, x, y);
    return tempText;
}

// Ändert die Eigenschaften des Textes auf die mitgegebenen Parameter
function changeText(text, size, x, y, anchorX, anchorY) {
    text.style = { fontFamily: 'Helvetica', fontSize: fontSize / size, fill: 0x000000 };
    text.x = x;
    text.y = y;
    text.anchor.set(anchorX, anchorY);
}

// Setzt die Text Koordinaten auf die mitgebenen Parameter
function setTextCoordinates(text, x, y) {
    text.x = x;
    text.y = y;
}

// Erstellt einen neuen Sprite mit den mitgebenen Parametern
function createNewSprite(sprite, x, y, scaleX, scaleY, anchor) {
    let tempSprite = new PIXI.Sprite.from(sprite);
    tempSprite.x = x;
    tempSprite.y = y;
    tempSprite.scale.x *= scaleX;
    tempSprite.scale.y *= scaleY;
    tempSprite.anchor.set(anchor);
    return tempSprite;
}

// Ändert die Eigenschaften des Sprites auf die mitgebenen Parameter
function changeSprite(sprite, x, y, scaleX, scaleY, anchor) {
    sprite.x = x;
    sprite.y = y;
    sprite.scale.x = scaleX;
    sprite.scale.y = scaleY;
    sprite.anchor.set(anchor);
}

// Setzt die Koordinaten des Ojektes auf die mitgebenen Parameter
function setObjectCoordinates(object, x, y) {
    object.x = x;
    object.y = y;
}

// Setzt die Scale des Objektes auf die mitgebenen Parameter
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

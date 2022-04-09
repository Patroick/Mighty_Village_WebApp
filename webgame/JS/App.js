let app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    resolution: 1
});

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoDensity = true;

document.body.appendChild(app.view);

setup();

window.addEventListener('resize', resize);

function resize() {
    app.resizeTo = window;
    setup();
}

// *----------------------------------------------------------------*
// *----------------------------------------------------------------*
// *----------------------------------------------------------------*

function setup() {

    let containerUpgradeShop = new PIXI.Container();
    app.stage.addChild(containerUpgradeShop);


    containerUpgradeShop.x = (app.renderer.width - app.renderer.width / 5);
    containerUpgradeShop.y = 0;

    let objTopRight = new PIXI.Graphics();
    objTopRight.beginFill(0xf58952);
    // drawRect (x,y,w,h) ---> Param 1 = x-Coordinate, Param 2 = y-Coordinate, Param 3 = width, Param 4 = height
    objTopRight.drawRect(0, 0, app.renderer.width / 5, app.renderer.height / 8);
    objTopRight.endFill();
    containerUpgradeShop.addChild(objTopRight);

    let textUpgradeShop = new PIXI.Text('Upgrade Shop', { fontFamily: 'Helvetica', fontSize: 32, fill: 0x000000 });
    textUpgradeShop.anchor.set(0.5, 0.5);
    textUpgradeShop.x = containerUpgradeShop.width / 2;
    textUpgradeShop.y = containerUpgradeShop.height / 2;
    textUpgradeShop.resolution = 2;
    containerUpgradeShop.addChild(textUpgradeShop);

    // *----------------------------------------------------------------*
    // *----------------------------------------------------------------*
    // *----------------------------------------------------------------*

    let containerProduction = new PIXI.Container();
    app.stage.addChild(containerProduction);

    containerProduction.x = 0;
    containerProduction.y = 0;

    let objMiddleLeftTitle = new PIXI.Graphics();
    objMiddleLeftTitle.beginFill(0xfffb12);
    objMiddleLeftTitle.drawRect(0, 0, window.innerWidth / 4, window.innerHeight / 8);
    objMiddleLeftTitle.endFill();
    containerProduction.addChild(objMiddleLeftTitle);

    let textProductionTitle = new PIXI.Text('Production', { fontFamily: 'Helvetica', fontSize: 32, fill: 0x000000 });
    textProductionTitle.anchor.set(0.5, 0.5);
    textProductionTitle.x = objMiddleLeftTitle.width / 2;
    textProductionTitle.y = objMiddleLeftTitle.height / 2;
    containerProduction.addChild(textProductionTitle);
    textProductionTitle.interactive = true;
    textProductionTitle.resolution = 2;
    textProductionTitle.cursor = "text";


    let objMiddleLeft = new PIXI.Graphics();
    objMiddleLeft.beginFill(0xffb8b8);
    objMiddleLeft.drawRect(0, objMiddleLeftTitle.height, objMiddleLeftTitle.width, window.innerHeight - objMiddleLeftTitle.height - window.innerHeight / 15);
    objMiddleLeft.endFill();
    containerProduction.addChild(objMiddleLeft);
    // // *----------------------------------------------------------------*

    let containerCoin = new PIXI.Container();
    app.stage.addChild(containerCoin);

    containerCoin.x = objMiddleLeftTitle.width;
    containerCoin.y = 0;

    let objMiddle = new PIXI.Graphics();
    objMiddle.beginFill(0xa4e5f9);
    objMiddle.drawRect(0, 0, window.innerWidth - objMiddleLeftTitle.width - objTopRight.width, window.innerHeight - window.innerHeight / 15);
    objMiddle.endFill();
    containerCoin.addChild(objMiddle);

    let coin = new PIXI.Sprite.from("pictures/muenze.png");
    coin.anchor.set(0.5);
    coin.x = containerCoin.width / 2;
    coin.y = containerCoin.height / 2;
    coin.scale.x = 0.7;
    coin.scale.y = 0.7;


    containerCoin.addChild(coin);

    coin.interactive = true;
    coin.buttonMode = true;
    coin.on('pointerdown', clickDown)
        .on('pointerup', clickUp)
        .on('pointerupoutside', clickUp)
        .on('pointerover', clickUp)
        .on('pointerout', hoverOver);
    let counter = 0;

    let textCounter = new PIXI.Text("Münzen: " + counter, { fontFamily: 'Helvetica', fontSize: 32, fill: 0x000000 });

    textCounter.anchor.set(0.5, 0.5);
    textCounter.x = containerCoin.width / 2;
    textCounter.y = containerCoin.height / 13;
    textCounter.resolution = 2;
    containerCoin.addChild(textCounter);


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


    function clickDown() {
        counter++;
        coin.scale.x /= 1.1;
        coin.scale.y /= 1.1;
        textCounter.text = "Münzen: " + counter;

    }

    function clickUp() {
        coin.scale.x *= 1.1;
        coin.scale.y *= 1.1;
    }

    function hoverOver() {
        coin.scale.x /= 1.1;
        coin.scale.y /= 1.1;
    }


    // // *----------------------------------------------------------------*

    let containerShop = new PIXI.Container();
    app.stage.addChild(containerShop);

    containerShop.x = (window.innerWidth - window.innerWidth / 5);
    containerShop.y = objTopRight.height;


    let objUpgradeAmount = new PIXI.Graphics();
    objUpgradeAmount.beginFill(0x39c107);
    objUpgradeAmount.drawRect(0, 0, window.innerWidth / 5, window.innerHeight / 6);
    objUpgradeAmount.endFill();
    containerShop.addChild(objUpgradeAmount
    );

    let containerUpgrades = new PIXI.Container();
    containerShop.addChild(containerUpgrades);
    containerUpgrades.x = 0;
    containerUpgrades.y = objUpgradeAmount.height;

    let objMiddleRight = new PIXI.Graphics();
    objMiddleRight.beginFill(0xf63939);
    objMiddleRight.drawRect(0, 0, window.innerWidth / 5, window.innerHeight - objUpgradeAmount.height - objTopRight.height - window.innerHeight / 15);
    objMiddleRight.endFill();
    containerUpgrades.addChild(objMiddleRight);

    let containerUpgrade = new PIXI.Container();
    containerUpgrades.addChild(containerUpgrade);

    // drawRect (x,y,w,h) ---> Param 1 = x-Coordinate, Param 2 = y-Coordinate, Param 3 = width, Param 4 = height

    let objUpgrade1 = new PIXI.Graphics();
    objUpgrade1.beginFill(0xfefdc2);
    objUpgrade1.drawRect(objMiddleRight.width / 20, objMiddleRight.height / 20, objMiddleRight.width / 1.1, objMiddleRight.height / 5);
    objUpgrade1.endFill();
    containerUpgrade.addChild(objUpgrade1);

    let objUpgrade2 = new PIXI.Graphics();
    objUpgrade2.beginFill(0xfffb12);
    objUpgrade2.drawRect(objMiddleRight.width / 20, objMiddleRight.height / 3.5, objMiddleRight.width / 1.1, objMiddleRight.height / 5);
    objUpgrade2.endFill();
    containerUpgrade.addChild(objUpgrade2);

    let objUpgrade3 = new PIXI.Graphics();
    objUpgrade3.beginFill(0x03fce3);
    objUpgrade3.drawRect(objMiddleRight.width / 20, objMiddleRight.height / 1.9, objMiddleRight.width / 1.1, objMiddleRight.height / 5);
    objUpgrade3.endFill();
    containerUpgrade.addChild(objUpgrade3);

    let objUpgrade4 = new PIXI.Graphics();
    objUpgrade4.beginFill(0x0324fc);
    objUpgrade4.drawRect(objMiddleRight.width / 20, objMiddleRight.height / 1.31, objMiddleRight.width / 1.1, objMiddleRight.height / 5);
    objUpgrade4.endFill();
    containerUpgrade.addChild(objUpgrade4);


    // 0,175

    // // *----------------------------------------------------------------*
    // // *----------------------------------------------------------------*
    // // *----------------------------------------------------------------*

    let containerBottom = new PIXI.Container();
    app.stage.addChild(containerBottom);

    containerBottom.x = 0;
    containerBottom.y = window.innerHeight - window.innerHeight / 15;

    let objBottom = new PIXI.Graphics();
    objBottom.beginFill(0xfefdc2);
    objBottom.drawRect(0, 0, window.innerWidth, window.innerHeight / 15);
    objBottom.endFill();
    containerBottom.addChild(objBottom);

}

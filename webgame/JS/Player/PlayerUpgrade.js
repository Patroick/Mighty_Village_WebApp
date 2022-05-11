class PlayerUpgrade{

    upgradeMultiplier;
    upgradeCost;
    upgradeBonusProductions;

    // Muss noch überlegen wie das mit den Bonus Productionsgebäuden läuft, wegen typ mitgeben und so
    constructor(upgradeMultiplier, upgradeCost, upgradeBonusProductions){
        this.upgradeMultiplier = upgradeMultiplier;
        this.upgradeCost = upgradeCost;
        this.upgradeBonusProductions = upgradeBonusProductions;
    }

}
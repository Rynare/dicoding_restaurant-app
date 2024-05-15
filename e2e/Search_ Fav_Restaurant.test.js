const assert = require('assert');

Feature("Searching restaurant from favorite list");

Scenario("Mencari restoran favorite", async ({ I }) => {
    const restaurantNames = [];

    for (let index = 1; index <= 5; index++) {
        const currentElem = `.restaurant-list .card:nth-child(${index}) .card-footer a`
        I.amOnPage('/');
        I.seeElement(currentElem);
        I.click(locate(currentElem).first());
        I.seeElement(".foods li")
        restaurantNames[index] = await I.grabTextFrom(`.restaurant-name`)
        I.click(locate(".fav-btn.btn").first())
    }
    
    I.amOnPage('/#/favorites');
    
    I.seeElement(".restaurant-list .card")
    const visibleFavoriteRestaurant = await I.grabNumberOfVisibleElements('.restaurant-list .card');
    
    assert.strictEqual(visibleFavoriteRestaurant,restaurantNames.length - 1)
    
    restaurantNames.forEach(async (restoName) => {
        I.seeElement('.search-bar .search-input');
        I.fillField('.search-bar .search-input', restoName);
        I.pressKey('Enter');
        
        I.seeElement('.restaurant-list .card')
        const foundedCount = await I.grabNumberOfVisibleElements('.restaurant-list .card');
        
        if (foundedCount >= 2) {
            let isTruthy = false;
            for (let cursor = 1; cursor <= foundedCount; cursor++) {
                I.seeElement('.restaurant-list .card')
                const title_nth = await I.grabTextFrom(`.restaurant-list .card:nth-child(${cursor}) #restaurant-name`);
                if (title_nth === restoName) {
                    isTruthy = true
                    break;
                }
            }
            assert.strictEqual(isTruthy, true)
        } else if (foundedCount <= 0){
            assert.strictEqual(false, true);
        } else {
            I.seeElement('.restaurant-list .card')
            const foundedName = await I.grabTextFrom(`.card #restaurant-name`)
            assert.strictEqual(foundedName, restoName)
        }
    });
  });


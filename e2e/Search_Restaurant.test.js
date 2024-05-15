const assert = require('assert');

Feature("Search Restaurant");

Scenario('searching restaurant by name', async ({ I }) => {
    I.amOnPage('/');

    I.seeElement('.search-bar .search-input');
    const firstRestaurantName = await I.grabTextFrom('.restaurant-list .card #restaurant-name')
    I.fillField('.search-bar .search-input', firstRestaurantName);
    I.pressKey('Enter');

    I.seeElement(".restaurant-list .card")
    const visibleRestaurantCount = await I.grabNumberOfVisibleElements('.restaurant-list .card');
    let isTrue = false;
    for (let i = 1; i <= visibleRestaurantCount; i++) {
        const restaurantName = await I.grabTextFrom(`.restaurant-list .card:nth-child(${i}) #restaurant-name`);
        if (restaurantName === firstRestaurantName) {
            isTrue = true;
            break; 
        }
    }

    assert(isTrue, 'Restaurant found in search results.');
});

Scenario('searching restaurant by empty', async ({ I }) => {
    I.amOnPage('/');
    
    I.seeElement(".restaurant-list .card")
    const visibleRestaurantCountFirst = await I.grabNumberOfVisibleElements('.restaurant-list .card');
    
    I.seeElement('.search-bar .search-input');
    I.fillField('.search-bar .search-input', "rdtcuygvibhnjkm");
    I.pressKey('Enter');
    I.fillField('.search-bar .search-input', "");
    I.pressKey('Enter');
    
    I.seeElement(".restaurant-list .card")
    const visibleRestaurantCountFinal = await I.grabNumberOfVisibleElements('.restaurant-list .card');

    if (visibleRestaurantCountFinal === visibleRestaurantCountFirst) {
        assert(true, 'All Restaurant showed in search results while empty.');
    } else {
        assert(false, 'All restaurant not showed in search results while empty.'); 
    }

});

Scenario('searching restaurant but no result', async ({ I }) => {
    I.amOnPage('/');

    I.seeElement('.search-bar .search-input');
    I.fillField('.search-bar .search-input', "rdtcuygvibhnjkm");
    I.pressKey('Enter');
    
    I.seeElement("#empty_restaurant_list")
    I.see("Upps...Data tidak ditemukan.","#empty_restaurant_list")
});


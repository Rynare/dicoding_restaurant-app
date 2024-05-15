Feature("Liking Restaurant");

Before(({ I }) => {
  I.amOnPage('/#/favorites');
});

Scenario("Showing empty favorite restaurant", ({ I }) => {
    I.seeElement('.favorite-restaurant-list');
    I.see("Kamu belum menambahkan restoran ke daftar favorite.", "#empty_restaurant_list")
  });
  
Scenario("Like and unlike restaurant", ({ I }) => {
    I.amOnPage('/');
    I.seeElement('.restaurant-list');
  I.click(locate('.restaurant-list .card-footer a').first());
  
  I.seeElement(".fav-btn.btn")
  I.click(locate(".fav-btn.btn").first())
  
  I.amOnPage('/#/favorites');
  I.seeElement('.favorite-restaurant-list .card');
  I.click(locate('.favorite-restaurant-list .card a').first());
  I.seeElement(".fav-btn.btn")
  I.click(locate(".fav-btn.btn").first())
  
  I.amOnPage('/#/favorites');
  I.see("Kamu belum menambahkan restoran ke daftar favorite.", "#empty_restaurant_list")
});


const assert = require('assert');

Feature("Post New Comment");

Scenario("Memposting komentar pada halaman detail restoran", async ({ I }) => {
    I.amOnPage("/");
    
    I.seeElement(".restaurant-list .card");
    const firstRestaurant = locate(`.restaurant-list .card .card-footer a`).first();
    I.click(firstRestaurant);
    
    I.seeElement(".foods li");
    
    I.seeElement(".review-bubble")
    const totalCommentsBefore = await I.grabNumberOfVisibleElements(".review-bubble");
    
    const username = "upin";
    const comment = "Ini adalah komentar upin dari kampung durian runtuh";
    
    I.fillField('form input', username);
    I.fillField('form textarea', comment);

    I.click(locate(`form button[type=submit]`).first());
    
    I.waitForVisible(".review-bubble", 5); 
    
    const totalCommentsAfter = await I.grabNumberOfVisibleElements(".review-bubble");
    const expectedTotalComments = totalCommentsBefore + 1;
    assert.equal(totalCommentsAfter, expectedTotalComments, `Jumlah komentar tidak bertambah setelah posting.`)
});

/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* All of the tests within the $() function,
 * since some of these tests may require DOM elements. This is to ensure they  * don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* Test to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('url defined', function() {
           for(let feed of allFeeds) {
           expect(feed.url).toBeDefined();
           expect(feed.url.length).not.toBe(0);
         }
       });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('name defined', function() {
           for(let feed of allFeeds) {
           expect(feed.name).toBeDefined();
           expect(feed.name.length).not.toBe(0);
         }
       });
    });


    /* Test suite named "The menu" */
    describe('The menu', function() {


        /* Test that ensures the menu element is
         * hidden by default.
         */
     it('is hidden', function() {
       expect(document.querySelector('body').classList.contains('menu-hidden')).toBe(true);
     });
         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked.
          */
      it('changes visibility when clicked', function() {
        const menu = document.querySelector('.menu-icon-link');

        menu.click(); // simulate a 'click' event
        expect(document.querySelector('body').classList.contains('menu-hidden')).toBe(false); //expect false because after the simulated 'click' menu should not be hidden.
        menu.click(); // simulate a second 'click' event
        expect(document.querySelector('body').classList.contains('menu-hidden')).toBe(true); //expect true after second simulated 'click' to return menu to hidden.
      });
    });
    /* Test suite named "Initial Entries" */
    describe('Initial Entries', function() {


        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Utilizing Jasmine's beforeEach and asynchronous done() function, we * trigger the asynchronous loadFeed() before Jasmine resumes testing.
         */
       beforeEach(function(done) {
         loadFeed(0, done);
       });

       it('has a single .entry', function() {
       const feed = document.querySelector('.feed');
       expect(feed.querySelectorAll('.entry').length > 0).toBe(true);
       });
     });
    /* Test suite named "New Feed Selection'" */
    describe ('New Feed Selection', function() {
      const feed = document.querySelector('.feed');
        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Again, by utilizing beforeEach & done(), we are able to run the
         * asynchronous loadFeed() before Jasmine resumes testing.
         */

     beforeEach(function (done) {
       loadFeed(1, function() {  // loads first feed
          feedOne = $('.feed').html();  // using jQuery to save its contents in a variable.
          loadFeed(2, function() { // loads second feed as callback of first.
                feedTwo = $('.feed').html();  // saves contents of second feed.
               done();  // calls done() to exit and run the spec.
             });
           });
      });
         it('loads new feed', function() {
           expect(feedOne).not.toBe(feedTwo);
       });
     });
}());

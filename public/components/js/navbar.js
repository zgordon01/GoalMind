$(function () {
    $('.navbar-toggle').click(function () {
        $('.navbar-nav').toggleClass('slide-in');
        $('.side-body').toggleClass('body-slide-in');
        //$('#search').removeClass('in').addClass('collapse').slideUp(200);
        /// uncomment code for absolute positioning tweek see top comment in css
        //$('.absolute-wrapper').toggleClass('slide-in');

    });

    //This will hide the nav if you click on any of the sidenav links (add class = toggle for this effect)
    $('.toggle').click(function () {
        $('.navbar-nav').toggleClass('slide-in');
        $('.side-body').toggleClass('body-slide-in');
        //$('#search').removeClass('in').addClass('collapse').slideUp(200);
        /// uncomment code for absolute positioning tweek see top comment in css
        //$('.absolute-wrapper').toggleClass('slide-in');

    });

    //This will hide nav if you click into the main document
    //fix for side nav not hiding
    $(document).click(function(event) {
        if($(event.target).closest('#main-content').length){
            $('.navbar-nav').removeClass('slide-in');
            $('.side-body').removeClass('body-slide-in');
        }

    });
});

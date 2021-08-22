// var prevScrollpos = 0;
// $("nav").css("top", "0");

// $(window).scroll(() => {
//     var currentScrollPos = window.pageYOffset;

//     if (prevScrollpos > currentScrollPos) {
//         $("nav").css("top", "0");
//     } else {
//         $("nav").css("top", "-100px");
//     }

//     prevScrollpos = currentScrollPos;
// });

const showSynopsis = () => {
    $("#synCont").removeClass('hide')
    $("#more").addClass('hide')
}

const hideSynopsis = () => {
    $("#synCont").addClass('hide')
    $("#more").removeClass('hide')
}

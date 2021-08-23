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

const readMore = () => {
    $(".extra").removeClass('hide')
    $("#more").addClass('hide')
}

const readLess = () => {
    $(".extra").addClass('hide')
    $("#more").removeClass('hide')
}

const showFloor = (floorNo) => {
    $(".floorInfo section").removeClass("visible")
    $(".floor-"+ floorNo).addClass("visible")
}
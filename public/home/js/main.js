const readMore = () => {
    $(".extra").removeClass('hide')
    $(".more").addClass('hide')
}

const readLess = () => {
    $(".extra").addClass('hide')
    $(".more").removeClass('hide')
}

const showFloor = (floorNo) => {
    $(".floorInfo section").removeClass("visible")
    $(".floor-"+ floorNo).addClass("visible")
}   
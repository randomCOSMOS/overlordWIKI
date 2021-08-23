const menu = () => {
    $("nav ul").toggleClass("hide")
    $(".links img").toggleClass("up")
}

document.addEventListener('click', (e) => {
    if ($(e.target).closest('nav').length === 0) {
        $("nav ul").addClass("hide")
        $(".links img").removeClass("up")
    }
})
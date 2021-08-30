function menu() {
    $("nav ul").toggleClass("links")
    $(".menu img").toggleClass("up")
}

document.addEventListener('click', (e) => {
    if ($(e.target).closest('nav').length === 0 && $(window).width() < 800) {
        $("nav ul").addClass("links")
        $(".menu img").removeClass("up")
    }
})
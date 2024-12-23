let swiperProjects = new Swiper("projects__container", {
    loop:true,
    spacebetween: 24,

    navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
    },
    pagination: {
    el: ".swiper-pagination",
    },
    mousewheel: true,
    keyboard: true,
});

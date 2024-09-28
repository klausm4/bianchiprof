function carousel() {
    $(document).ready(function () {
        $(".slider").slick({
          arrows: true,
          slidesToShow: 4,
          speed: 1000,
          easing: "linear",
          autoplay: true,
          centerMode: false,
          variableWidth: false,
          responsive: [
            {
              breakpoint: 1220,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 978,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 560,
              settings: {
                slidesToShow: 1,
              },
            },
          ],
        });
      });
};

export default carousel;
$(document).ready(function () {
    let timer: any;

    function setAmounts() {
        $("#amount1").val(($("#slider-range") as any).slider("values", 0));
        $("#amount2").val(($("#slider-range") as any).slider("values", 1));
    }

    ($("#slider-range") as any).slider({
        range: true,
        min: 0,
        max: 15000000,
        step: 500,
        values: [1800000, 9000000],
        slide: () => {
            setAmounts();
        }
    });

    setTimeout(() => {
        $(".loading").removeClass("loading");

        ($("#start-date-picker") as any).daterangepicker({
            "autoApply": true,
            // @ts-ignore: moment is imported
            "startDate": moment(),
            // @ts-ignore: moment is imported
            "endDate": moment().add(1, "days")
        });

        setAmounts();
        ($(document) as any).tooltip({
            position: {
                my: "center top-40",
                at: "center top"
            }
        });
    }, 3000);

    $(".hotel-thumbnails img").hover(() => {
        const thisPreview = $($(this).parents().parents().parents(".hotel-item").children(".thumbnail-preview"));
        const source_image = $(this).attr("src");
        thisPreview.children("img").attr("src", source_image);
        thisPreview.css("display", "block");
        if (timer) {
            clearTimeout(timer);
        }
    });

    $(".hotel-thumbnails img").mouseleave(() => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            $(".thumbnail-preview img").attr("src", "");
            $(".thumbnail-preview").css("display", "none");
        }, 200);
    });

    $(".hotel-item").click(() => {
        location.href = "/hotel-detail";
    });

    function initMap() {
        // @ts-ignore: google object from imported js
        const map = new google.maps.Map(document.getElementById("google-map"), {
            center: { lat: 21.008164, lng: 105.791835 },
            zoom: 16
        });
    }

    $(".occupancy-box").click(() => {
        $(".occupancy-edit").css("display", "block");
        $(".search-result-backdrop").css("display", "block");
    });
    $("#destination-input").click(() => {
        $(".destination-search-results").css("display", "block");
        $(".search-result-backdrop").css("display", "block");
    });
    $(".search-result-backdrop").click(() => {
        $(this).css("display", "none");

        $(".popup-result").css("display", "none");
    });
    $(".popup-result ul li").click(() => {
        $(".search-result-backdrop").css("display", "none");
        $(".popup-result").css("display", "none");
    });

    const setSpanText = (unit: string, amount: number) => {
        if (unit === "Adults") {
            $("span.adults-text").text(amount + " adults, ");
        } else if (unit === "Children") {
            $("span.children-text").text(amount + " children");
        } else {
            $("span.rooms").text(amount + " rooms");
        }
    };

    $("span.minus").click(() => {
        const $amount = $(this).siblings(".amount");
        const $unit = $(this).siblings(".unit");

        let amount = parseInt($amount.attr("data-amount"));
        const allowZero = $amount.attr("data-allow-zero");
        const unit = $unit.text();
        if (amount > 1 || (allowZero && amount == 1)) {
            amount--;
            $amount.attr("data-amount", amount);
            $amount.text(amount);

            setSpanText(unit, amount);
        }
    });
    $("span.plus").click(() => {
        const $amount = $(this).siblings(".amount");
        const $unit = $(this).siblings(".unit");

        let amount = parseInt($amount.attr("data-amount"));
        const unit = $unit.text();

        amount++;
        $amount.attr("data-amount", amount);
        $amount.text(amount);

        setSpanText(unit, amount);
    });

});

$(document).ready(() => {
    setTimeout(() => {
        $(".loading").removeClass("loading");

        ($("#start-date-picker") as any).daterangepicker({
            "autoApply": true,
            // @ts-ignore: moment is imported
            "startDate": moment(),
            // @ts-ignore: moment is imported
            "endDate": moment().add(1, "days")
        });
    }, 3000);

    $("#destination-input").focus(() => {
        $(".destination-search-results").css("display", "block");
        $(".search-result-backdrop").css("display", "block");
        $(".occupancy-edit").css("display", "none");
    });

    $(".occupancy-box").click(() => {
        $(".occupancy-edit").css("display", "block");
        $(".destination-search-results").css("display", "none");
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

    $(".search-button").click(() => {
        $(this).addClass("on-load");
        setTimeout(() => {
            location.href = "/search";
        }, 2500);
    });

    const setSpanText: Function = (unit: string, amount: number) => {
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

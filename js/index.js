$(function () {
    var runPage;
    var $window = $(window);
    var $body = $("body");

    var windowsWidth = $window.width();
    windowsHeight = $window.height();
    resizeMe(windowsHeight, windowsWidth);

    $("input").placeholder();
    $(".flex-direction-nav li a").text("");
    runPage = new FullPage({
        id: 'pageContain',
        slideTime: 800,
        effect: {
            transform: {
                translate: 'X',

                scale: [1, 1],
                rotate: [0, 0]
            },
            opacity: [0, 1]
        },
        mode: 'wheel,touch',
        easing: 'ease',
        callback: function (index) {

            var pageNum = runPage.thisPage();

            var flag = runPage.thisPage() + 1;

            $(".navPart").find("#moveDv").removeClass().attr("class", "move" + flag);

            $(".navPart").find(".blockDv").find("li").siblings().removeClass("active");

            var num = runPage.thisPage();
            for (var i = 0; i <= num; i++) {
                $(".navPart").find(".blockDv").children().eq(i).addClass("active");
            }
            decideShowDv(index);
        },
        beforeChange: function (index, thisPage) {   // callback before pageChange
            decideShowDv(index + 1);
        }

    });
    $(".blockDv .item").mouseenter(function () {
        var flag = $(this).attr("data-flag");
        $(".nav-notice #" + flag).show().siblings().hide();
    });

    $("#goToPage7").click(function () {
        runPage.go(6);
    });
    $(".blockDv .item").mouseleave(function() {
        $(".nav-notice").children().hide();
    });
    function decideShowDv(index) {
        if ($(".page5").hasClass("current") || $(".page6").hasClass("current")) {
            $(".logoPart,.bullonPart").hide();
        } else {
            $(".logoPart,.bullonPart").show();
        }
    }

    $("#confirmForm").click(function () {
        if (verifycontainer("fillInform")) {
            $(".successPart ,.successDv").fadeIn();
        }
    });

    $("#closeSuccessDv").click(function () {
        $(".successPart ,.successDv").fadeOut();
    });

    $(".nav-contral img").click(function () {

        var num_index = $(".dvOverShow").find(".teacherIntro").length - 1;
        var s_width = num_index * $(".dvOverShow").find(".teacherIntro").width();
        if ($(this).attr("class") == "rightImg") {

            $(".dvOverShow").animate({ marginLeft: "-" + (num_index * 512) + "px" }, 400);
        } else if ($(this).attr("class") == "leftImg") {
            $(".dvOverShow").animate({ marginLeft: 0 }, 400);
        }
    });

    //function hideMinorDv(index) {

    //    if (index == 3 || index == 4) {
    //        $(".logoPart,.bullonPart").hide();
    //    } else {
    //        $(".logoPart,.bullonPart").show();
    //    }

    //}

    $(".logoPart").hover(function () {
        if ($(this).find(".chatWayDv").css("display") == "none") {
            $(this).addClass("current");
        } else {
            $(this).removeClass("current");
        }
    });

    $(".navPart").find(".blockDv").find("li").click(function () {
        var index = $(this).index();
        runPage.go(index);
    });

    $window.resize(function () {
        var windowsWidth = $window.width();
        windowsHeight = $window.height();
        resizeMe(windowsHeight, windowsWidth);

    });

    $(".navPart").find(".blockDv").find(".item").click(function () {


        var num = $(this).index();
        var flag = $(this).attr("flag");


        if (num == 4 || num == 5) {
            $(".logoPart ,.bullonPart").hide();
        } else {
            $(".logoPart ,.bullonPart").show();
        }

        $(".navPart").find("#moveDv").removeClass().attr("class", flag);

        $(this).siblings().removeClass("active");

        for (var i = 0; i <= num; i++) {
            $(".navPart").find(".blockDv").children().eq(i).addClass("active");
        }
    });

    function resizeMe(displayHeight, displayWidth) {
        //Standard dimensions, for which the body font size is correct
        var preferredHeight = 825;
        var preferredWidth = 900;

        if (displayHeight < preferredHeight || displayWidth < preferredWidth) {
            var heightPercentage = (displayHeight * 100) / preferredHeight;
            var widthPercentage = (displayWidth * 100) / preferredWidth;
            var percentage = Math.min(heightPercentage, widthPercentage);
            var newFontSize = percentage.toFixed(2);

            $body.css('font-size', newFontSize + '%');
        } else {
            $body.css('font-size', '100%');
        }
    }

    function verifycontainer(container) {

        var newContainer = $("#" + container);

        var inputs = newContainer.find("input,select,textarea");

        for (var i = 0; i < inputs.length; i++) {

            var input = inputs.eq(i);
            var type = input.attr("type");
            var value = input.val();

            if (value == "") {
                var msg = "";

                if (input.is("input") || input.is("textarea")) {
                    msg = "内容不能为空!";
                    if (input.is("input:radio")) {
                        msg = "请选择项!";
                    }
                } else if (input.is("select")) {
                    msg = "请选择项!";
                }

                formTip(msg, newContainer.find($(input)));

                return false;
            }
        }


        return true;
    }


    function formTip(msg, control, options) {

        var tips = $(".form-tips");
        if (tips.length == 0) {
            tips = $("<div class=\"form-tips\"></div>");
            var tiparrow = $("<div class=\"arrow\"></div>");
            var tipbox = $("<div class=\"tip-box\"></div>");

            var tipleftbox = $("<div class=\"tip-left-box\"></div>");
            var tipcenterbox = $("<div class=\"tip-center-box\"></div>");
            var tiprightbox = $("<div class=\"tip-right-box\"></div>");
            tipleftbox.append($("<div class=\"tip-top\"></div><div class=\"tip-center\"></div><div class=\"tip-bottom\"></div>"));
            tipcenterbox.append($("<div class=\"tip-top\"></div><div class=\"tip-content\"></div><div class=\"tip-bottom\"></div>"));
            tiprightbox.append($("<div class=\"tip-top\"></div><div class=\"tip-center\"></div><div class=\"tip-bottom\"></div>"));
            tipbox.append(tipleftbox);
            tipbox.append(tipcenterbox);
            tipbox.append(tiprightbox);
            tips.append(tiparrow);
            tips.append(tipbox);

            $("body").append(tips);
        }

        tips.stop(true, true).css("visibility", "hidden").show().find(".tip-content").text(msg);

        var $self = $(control);
        var $control = $self;
        if ($self.length > 0) {
            tips.appendTo($self.parent());
        }
        var height = 0, width = 0;
        if ($self.get(0).tagName == "SELECT" && $self.next(".bootstrap-select").length > 0) {
            $control = $self.next(".bootstrap-select");
        }

        height = $control.outerHeight(true);
        width = $control.outerWidth(true);


        tips.width(tips.find(".tip-content").outerWidth(true) + 4 * 2 + 5 + 10);
        tips.css("margin-top", "-" + ((height / 2) + (tips.height() / 2)) + "px");
        tips.css("margin-left", (width + 10) + "px");

        if (!options || options.focus == true) {
            $self.focus();
        }

        tips.css("visibility", "visible").delay(4000).fadeOut(600);

        return $self;
    };

});
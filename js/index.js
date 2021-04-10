window.onload = function() {
    //banner轮播图
    (function() {
        // let oImg = document.getElementsByTagName("img");
        // console.log(oImg);
        // oImg[2].style.opacity = 0;
        let oDiv = document.querySelector(".littleul");
        let oUl = document.querySelector(".bigul");
        let oPoint = oDiv.getElementsByTagName("div");
        // console.log(oPoint);
        let oLi = oUl.getElementsByTagName("li");
        // console.log(oLi);
        let timer = null;
        for (let a = 0; a < oLi.length; a++) {
            oLi[a].style.opacity = 0;
        }
        oLi[0].style.opacity = 1;
        for (let i = 0; i < oPoint.length; i++) {
            oPoint[i].onmouseover = function() {
                // console.log(i);
                $(this).addClass("active").siblings().removeClass("active");
                for (let j = 0; j < oLi.length; j++) {
                    if (j != i) {
                        // console.log(1);
                        // oImg[j].style.opacity = 0;
                        startMove(oLi[j], { "opacity": 0 });
                    } else {
                        // oImg[j].style.opacity = 1;
                        startMove(oLi[j], { "opacity": 100 });
                    }
                }
            }
        }
        oUl.onmouseover = function() {
            clearInterval(timer);
        }
        oUl.onmouseout = function() {
            // clearInterval(timer);
            timer = setInterval(function() {
                move();
            }, 3000);
        }
        let count = 1;

        function move() {
            $(".littleul div").eq(count).addClass("active").siblings().removeClass("active");
            for (let i = 0; i < oLi.length; i++) {
                startMove(oLi[i], { "opacity": 0 });
            }
            startMove(oLi[count], { "opacity": 100 });
            // console.log(oImg[count]);
            count++;
            if (count > oLi.length - 1) {
                count = 0;
            }
        }
        timer = setInterval(function() {
            move();
            // console.log(1);
        }, 3000);
    })();

    (function() {
        $(".menumore li").mouseover(function() {
            $(this).addClass("hover").siblings().removeClass("hover");
        });
        $(".menumore li").mouseout(function() {
            $(this).removeClass("hover").siblings().removeClass("hover");
        });
    })();
};
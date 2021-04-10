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
    //垂直导航栏鼠标悬浮移入移出控制
    (function() { //使用mouseenter和mouseleave来解决冒泡捕获问题
        $(".menumore li").mouseenter(function() {
            $(this).addClass("hover").siblings().removeClass("hover");
            console.log(1);
        });
        $(".menumore li").mouseleave(function() {
            $(this).removeClass("hover").siblings().removeClass("hover");
            // console.log(1);
        });
    })();
    //从接口读取hotsale数据
    (function() {
        $.getJSON("http://127.0.0.1:3000/commodity", (res) => {
            // console.log(res);
            let str = "";
            res.forEach(item => { //在热销爆款处写入数据
                str += `
                <li>
                    <a href="detail.html?id=${item.id}">
                        <img src="${item.img}" alt="">
                    </a>
                    <p>${item.title}</p>
                    <span>￥${item.price}</span>
                </li>
                `;
            });
            $(".hotlistul").html(str);
        })
    })();
    //小轮播
    (function() {
        /* let oSliderBox = document.getElementById("sliderBox"); */
        let oUl = document.getElementById("sliderList");
        let aList = oUl.children;
        let perWidth = aList[0].offsetWidth; //单位宽，即每次移动的距离
        let len = aList.length;
        oUl.style.width = len * perWidth + "px";


        //定时器 控制ul的移动
        let count = 0;
        let timer = setInterval(function() {
            move();
        }, 3000)

        function move() {
            count++;
            if (count == aList.length) {
                oUl.style.left = 0; //在空白区块出现之前，把UL的位置改变一下，让实际的第一张展示在轮播区域；里
                count = 1; //为了下一张出现第二张
            }
            if (count == -1) {
                oUl.style.left = -perWidth * (len - 1) + "px"; //倒数第一张
                count = len - 2;
            }
            startMove(oUl, {
                "left": -perWidth * count
            });
        }

        //箭头
        let arrow = document.querySelector(".arr");

        let aBtns = arrow.children;

        //左箭头321321
        aBtns[0].onclick = function() {
            count -= 2;
            move();
        }

        //右箭头 123123
        aBtns[1].onclick = function() {

                move();

            }
            //清定时器
        $(".choiceslider").mouseenter(function() {
            clearInterval(timer);
        });
        //重新开启定时器
        $(".choiceslider").mouseleave(function() {
            timer = setInterval(function() {
                move();
            }, 3000)
        });
    })();
};
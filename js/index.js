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
    //从接口载入hotsale数据
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
    //“帮您选酒”模块小轮播
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
        let arrow = document.querySelectorAll(".arr");

        let aBtns = arrow[0].children;

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
    //“帮您选酒”模块“必备口粮”载入数据
    (function() {
        $.getJSON("http://localhost:3000/mustbuy", (res) => {
            // console.log(res);
            let str = "";
            res.forEach(item => { //在热销爆款处写入数据
                str += `
                <li>
                    <a href="detail.html?id=${item.id}"><img src="${item.img}" alt=""></a>
                    <span>￥${item.price}</span>
                    <a href="detail.html?id=${item.id}">
                        <p>${item.title}</p>
                    </a>
                </li>
                `;
            });
            $(".choicebox1").html(str);
        })
    })();
    //“帮您选酒”模块“送礼佳品”载入数据
    (function() {
        $.getJSON("http://localhost:3000/gift", (res) => {
            // console.log(res);
            let str = "";
            res.forEach(item => { //在热销爆款处写入数据
                str += `
                <li>
                    <a href="detail.html?id=${item.id}"><img src="${item.img}" alt=""></a>
                    <span>￥${item.price}</span>
                    <a href="detail.html?id=${item.id}">
                        <p>${item.title}</p>
                    </a>
                </li>
                `;
            });
            $(".choicebox2").html(str);
        })
    })();
    //“帮您选酒”模块“大型宴请”载入数据
    (function() {
        $.getJSON("http://localhost:3000/fete", (res) => {
            // console.log(res);
            let str = "";
            res.forEach(item => { //在热销爆款处写入数据
                str += `
                <li>
                    <a href="detail.html?id=${item.id}"><img src="${item.img}" alt=""></a>
                    <span>￥${item.price}</span>
                    <a href="detail.html?id=${item.id}">
                        <p>${item.title}</p>
                    </a>
                </li>
                `;
            });
            $(".choicebox3").html(str);
        })
    })();
    //划过切换列表版面
    (function() {
        $(".choiceme").each(function() { //重点在于解决如何通过一个函数使页面内所有和“帮您选酒”模块一样的商品列表都可以切换，在这里遍历所有存放要切换的ul的choiceme盒子
            let thisul = $(this).parent().siblings(".choicebottom").children(".choiceright").children(); //这里是获取鼠标悬浮的选项相对应该模块的切换列表ul，使之对应此选项
            $($(this).children()).mouseenter(function() { //jquery真的好好用啊！哈哈，爱了！！！
                $(this).addClass("active").siblings().removeClass("active");
                let index = $(this).index();
                thisul.eq(index).addClass("activebox").siblings().removeClass("activebox");
            });
        });

    })();
    //“白酒馆”模块小轮播
    (function() {
        /* let oSliderBox = document.getElementById("sliderBox"); */
        let oUl = document.getElementById("sliderList1");
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
        let arrow = document.querySelectorAll(".arr");

        let aBtns = arrow[1].children;

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
    //“葡萄酒馆”模块小轮播
    (function() {
        /* let oSliderBox = document.getElementById("sliderBox"); */
        let oUl = document.getElementById("sliderList2");
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
        let arrow = document.querySelectorAll(".arr");

        let aBtns = arrow[2].children;

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
    //“洋酒&啤酒馆”模块小轮播
    (function() {
        /* let oSliderBox = document.getElementById("sliderBox"); */
        let oUl = document.getElementById("sliderList3");
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
        let arrow = document.querySelectorAll(".arr");

        let aBtns = arrow[3].children;

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
    //楼梯
    (function() {
        var flag = true;
        let floor = $(".choicewinewrap").children().children(".floor");
        $(window).scroll(function() {
            console.log($(this).scrollTop());
            //滚动条滚动到一定位置，左边的导航显示
            if (flag) {
                var st = $(this).scrollTop();
                if (st >= 1000 && st <= 4000) {
                    $(".floorcontrol").fadeIn();
                } else {
                    $(".floorcontrol").fadeOut();
                }
                //内容区块展示时，对应的导航点亮
                floor.each(function() {
                    // console.log($(this).offset().top);
                    if (st >= $(this).offset().top - $(this).outerHeight() / 2) {
                        var index = $(this).index();
                        $(".floorcontrol li").eq(index).addClass("littlehover").siblings().removeClass("littlehover");
                    }
                })
            }

        })

        //点击导航时，对应的内容区块展示
        $(".floorcontrol li").click(function() {
            flag = false;
            var index = $(this).index();

            $("body,html").stop().animate({
                "scrollTop": floor.eq(index).offset().top
            }, 500, function() {
                flag = true;
            });

            $(this).addClass("hover").siblings().removeClass("hover");
        })
    })();
    //“品牌旗舰店”模块小轮播
    (function() {
        /* let oSliderBox = document.getElementById("sliderBox"); */
        let oUl = document.getElementById("sliderList4");
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
        let arrow = document.querySelectorAll(".arr");

        let aBtns = arrow[4].children;
        console.log(aBtns);
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
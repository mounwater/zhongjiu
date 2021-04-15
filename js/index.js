window.onload = function() {
    //读取用户名
    (function() {
        // console.log($.cookie("username"));
        let str = `<a class="exit">　退出登录</a>`;
        if ($.cookie("username") == "" || $.cookie("username") == "null" || $.cookie("username") == undefined) {} else {
            // console.log(1);
            $(".topul").html("已登录祝您购物愉快！" + $.cookie("username") + str);
            //获取购物车数据（数量）
            let id = $.cookie("userid");
            $.get("http://jx.xuzhixiang.top/ap/api/cart-list.php", { id: id }, (res) => {
                let count = res.data.length;
                $(".cartcount").html(count);

            });
        }
    })();
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
    //从接口载入数据
    (function() {
        $.get("http://jx.xuzhixiang.top/ap/api/productlist.php", { uid: 51055, pagesize: 24 }, (res) => {
            // console.log(res);
            res = res.data;
            // console.log(res);
            res = res.reverse(); //数组倒序
            // console.log(res);
            let str = "";
            for (let i = 0; i < 10; i++) { //在热销爆款处写入数据
                str += `
                <li>
                    <a href="detail.html?id=${res[i].pid}">
                        <img src="${res[i].pimg}" alt="">
                    </a>
                    <p>${res[i].pname}</p>
                    <span>￥${res[i].pprice}</span>
                </li>
                `;
            }
            $(".hotlistul").html(str);
            let str1 = "";
            for (let i = 10; i < 18; i++) { //在白酒馆处写入数据
                // console.log(res[i]);
                str1 += `
                <li>
                    <a href="detail.html?id=${res[i].pid}"><img src="${res[i].pimg}" alt=""></a>
                    <span>￥${res[i].pprice}</span>
                    <a href="detail.html?id=${res[i].pid}">
                        <p>${res[i].pname}</p>
                    </a>
                </li>
                `;
            }
            $(".choicebox1").html(str1);
            let str2 = "";
            for (let i = 18; i < 19; i++) { //在葡萄酒馆处写入数据
                str2 += `
                <li>
                    <a href="detail.html?id=${res[i].pid}"><img src="${res[i].pimg}" alt=""></a>
                    <span>￥${res[i].pprice}</span>
                    <a href="detail.html?id=${res[i].pid}">
                        <p>${res[i].pname}</p>
                    </a>
                </li>
                `;
            }
            $(".choicebox2").html(str2);
            let str3 = "";
            for (let i = 19; i < 24; i++) { //在洋酒馆处写入数据
                // console.log(res[i]);
                str3 += `
                <li>
                    <a href="detail.html?id=${res[i].pid}"><img src="${res[i].pimg}" alt=""></a>
                    <span>￥${res[i].pprice}</span>
                    <a href="detail.html?id=${res[i].pid}">
                        <p>${res[i].pname}</p>
                    </a>
                </li>
                `;
            }
            $(".choicebox3").html(str3);
        })
    })();
    //“帮您选酒”模块左侧小轮播 没有用jquery改写，所以兼容性不好，不能让所有小轮播都使用，只能一个轮播写一个js控制
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
    //楼梯控制
    (function() {
        var flag = true;
        let floor = $(".choicewinewrap").children().children(".floor");
        $(window).scroll(function() {
            // console.log($(this).scrollTop());
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

            $(this).addClass("littlehover").siblings().removeClass("littlehover");
        })
    })();
    //“品牌旗舰店”模块轮播
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
        // console.log(aBtns);
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
    //退出登录
    (function() {
        $(".exit").click(function() {
            let choice = confirm("用户" + $.cookie("username") + "，您确定要退出登录吗？");
            if (choice) {
                $.cookie("username", null);
                $.cookie("userid", null);
                location.href = "../";
            } else {
                return;
            }
        });
    })();
};
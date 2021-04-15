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
    //设置划过“全部商品分类”显示menu
    (function() {
        $(".sliderwrap").css({
            position: "absolute",
            top: "187px",
            left: "0px",
            zIndex: "-1" //为了不影响详情展示
        });
        $(".menuleft").css({
            display: "none"
        });
        $(".navleft").mouseenter(function() {
            $(".sliderwrap").css({
                zIndex: "3"
            });
            $(".menuleft").css({
                display: "block"
            });
        });
        $(".menuleft").mouseleave(function() {
            $(".menuleft").css({
                display: "none"
            });
            $(".sliderwrap").css({
                zIndex: "-1"
            });
        });
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
    //获取id展示对应商品
    (function() {
        let id = location.search.split("=")[1];
        // console.log(id);
        $.get("http://jx.xuzhixiang.top/ap/api/detail.php", { id: id }, (res) => {
            console.log(res);
            res = res.data;
            $(".imgthere").attr("src", res.pimg);
            $(".title").text(res.pname);
            $(".price").text(res.pprice);
        });
    })();
    //放大镜
    (function() {
        function Zoom() {
            // console.log(this);
            this.zoomBox = document.getElementById("zoomBox");
            this.midArea = document.getElementById("midArea");
            this.midImg = this.midArea.children[0];
            this.zoom = document.getElementById("zoom");
            this.bigArea = document.getElementById("bigArea");
            this.bigImg = this.bigArea.children[0];

            this.smallArea = document.getElementById("smallArea");
            this.smallImg = this.smallArea.children;



            this.midArea.onmouseover = () => {
                this.zoom.style.display = "block";
                this.bigArea.style.display = "block";
            }
            this.midArea.onmouseout = () => {
                this.zoom.style.display = "none";
                this.bigArea.style.display = "none";
            }
            this.midArea.onmousemove = (e) => {
                let evt = e || event;
                let mw = this.midArea.offsetWidth - this.zoom.offsetWidth;
                let mh = this.midArea.offsetHeight - this.zoom.offsetHeight;
                //let l = evt.offsetX - this.zoom.offsetWidth / 2;
                //let t = evt.offsetY - this.zoom.offsetHeight / 2;
                let l = evt.pageX - this.zoomBox.offsetLeft - this.zoom.offsetWidth / 2;
                let t = evt.pageY - this.zoomBox.offsetTop - this.zoom.offsetHeight / 2;

                l = l <= 0 ? 0 : l >= mw ? mw : l;
                t = t <= 0 ? 0 : t >= mh ? mh : t;

                console.log(mw, mh);

                this.zoom.style.left = l + "px";
                this.zoom.style.top = t + "px";


                this.bigImg.style.left = -this.zoom.offsetLeft / this.midArea.offsetWidth * this.bigImg
                    .offsetWidth + "px";
                this.bigImg.style.top = -this.zoom.offsetTop / this.midArea.offsetHeight * this.bigImg
                    .offsetHeight + "px";

            }

            for (let i = 0; i < this.smallImg.length; i++) {
                this.smallImg[i].onclick = () => {
                    this.bigImg.src = this.midImg.src = this.smallImg[i].src;
                }
            }
        }

        new Zoom();
    })();
    //数量控制
    (function() {
        $(".minus").click(function() {
            if ($(".count").val() == 1) {

            } else {
                // console.log(parseInt($(".count").val()));
                let count = parseInt($(".count").val());
                count -= 1;
                $(".count").val(count);
            }
        });
        $(".add").click(function() {
            let count = parseInt($(".count").val());
            count += 1;
            $(".count").val(count);
        });
    })();
    //加入购物车
    (function() {
        $(".addbtn").click(function() {
            //查询用户id
            if ($.cookie("username") == "" || $.cookie("username") == "null" || $.cookie("username") == undefined) {
                let yes = confirm("您还未登录本商城！是否跳转至登录页面？");
                if (yes) {
                    location.href = "../login.html";
                    return;
                } else {
                    return;
                }
            } else {
                // let name = $.cookie("username");
                let id = $.cookie("userid");
                let pcount = $(".count").val();
                let pid = location.search.split("=")[1];
                $.get("http://jx.xuzhixiang.top/ap/api/add-product.php", { uid: id, pid: pid, pnum: pcount }, (res) => {
                    console.log(res.msg);
                    if (res.msg == "修改成功" || res.msg == "插入成功") {
                        let yes = confirm("加入购物车成功！是否跳转至购物车？");
                        if (yes) {
                            location.href = "../cart.html";
                        } else {
                            let id = $.cookie("userid");
                            $.get("http://jx.xuzhixiang.top/ap/api/cart-list.php", { id: id }, (res) => {
                                let count = res.data.length;
                                $(".cartcount").html(count);
                            });
                        }
                    }
                });
            }
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
}
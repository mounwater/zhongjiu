//读取用户名
(function() {
    // console.log($.cookie("username"));
    let str = `<a class="exit">　退出登录</a>`;
    if ($.cookie("username") == "" || $.cookie("username") == "null" || $.cookie("username") == undefined) {} else {
        // console.log(1);
        $(".topul").html("已登录祝您购物愉快！" + $.cookie("username") + str);
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
//获取当前用户的购物车数据
(function() {
    let id = $.cookie("userid");
    let str = "";
    $.get("http://jx.xuzhixiang.top/ap/api/cart-list.php", { id: id }, (res) => {
        // console.log(res.data);
        res = res.data;
        res.forEach((item) => {
            // console.log(item);
            str += `
                <tr id="${item.pid}">
                    <td class="img">
                        <a href="../detail.html?id=${item.pid}"><img src="${item.pimg}" alt=""></a>
                    </td>
                    <td class="name">${item.pname}</td>
                    <td class="desc">${item.pdesc}</td>
                    <td>￥<span class="price">${item.pprice}</span></td>
                    <td class="thiscount">
                        <div class="countwrap">
                            <span class="minus fl">-</span>
                            <input type="text" class="count fl" value="${item.pnum}">
                            <span class="add fl">+</span>
                        </div>
                    </td>
                    <td>￥<span class="thissum">${item.pprice*item.pnum}</span></td>
                    <td class="do">
                        <input type="button" value="删除" class="delbtn">
                    </td>
                </tr>
                <hr>
                `;
            // $(".showthere").append(str);
        });
        // console.log(str);
        $(".showthere").html(str);
    });
})();
window.onload = function() {
    //数量控制
    (function() {
        //计算合计价格
        function getallsum() {
            let sum = 0;
            $(".thissum").each(function() {
                // console.log($(this));
                sum += parseInt($(this).text());
            });
            return sum;
        }
        $(".allsum").text(getallsum());
        let id = $.cookie("userid");

        function useajax(count, pid) {
            $.get("http://jx.xuzhixiang.top/ap/api/cart-update-num.php", { uid: id, pid: pid, pnum: count }, (res) => {
                console.log(res);
            });
        }
        $(".minus").click(function() {
            // console.log(1);
            let pid = $(this).parent().parent().parent().attr("id");
            // console.log(pid);
            if ($(this).siblings(".count").val() == 1) {

            } else {
                // console.log(parseInt($(".count").val()));
                let count = parseInt($(this).siblings(".count").val()); //获取对应栏的商品数量
                count -= 1; //改变商品数量
                $(this).siblings(".count").val(count); //更新页面里的对应栏的商品数量
                $(this).parent().parent().siblings().children(".thissum").html(parseInt($(this).parent().parent().siblings().children(".price").text()) * count); //修改单个商品总价
                useajax(count, pid);
                $(".allsum").text(getallsum());

            }
        });
        $(".add").click(function() {
            // console.log(2);
            let pid = $(this).parent().parent().parent().attr("id");
            let count = parseInt($(this).siblings(".count").val());
            count += 1;
            $(this).siblings(".count").val(count);
            $(this).parent().parent().siblings().children(".thissum").html(parseInt($(this).parent().parent().siblings().children(".price").text()) * count);
            useajax(count, pid);
            $(".allsum").text(getallsum());
        });
        //获取文本框数量
        $(".count").on("input", function() { //绑定input事件
            console.log($(this));
            let count = $(this).val();
            if (count >= 1) {
                let pid = $(this).parent().parent().parent().attr("id");
                $(this).parent().parent().siblings().children(".thissum").html(parseInt($(this).parent().parent().siblings().children(".price").text()) * count); //修改单个商品总价
                useajax(count, pid);
                $(".allsum").text(getallsum());
            } else {
                $(this).val(1);
                let pid = $(this).parent().parent().parent().attr("id");
                $(this).parent().parent().siblings().children(".thissum").html(parseInt($(this).parent().parent().siblings().children(".price").text())); //修改单个商品总价
                useajax(1, pid);
                $(".allsum").text(getallsum());
            }
        });
        //删除按钮
        $(".delbtn").click(function() {
            let yes = confirm("即将删除该商品，是否删除？");
            if (yes) {
                $(this).parent().parent().remove();
                let pid = $(this).parent().parent().attr("id");
                $.get("http://jx.xuzhixiang.top/ap/api/cart-delete.php", { uid: id, pid: pid }, (res) => {
                    console.log(res);
                });
                $(".allsum").text(getallsum());
            }
        });
    })();
    //退出登录
    (function() {
        $(".exit").click(function() {
            let choice = confirm("用户" + $.cookie("username") + "，您确定要退出登录吗？");
            if (choice) {
                $.cookie("username", null);
                // $.cookie("userid", null);
                location.href = "../";
            } else {
                return;
            }
        });
    })();
}
//首先将购物车和空购物车提示都设置隐藏
$(".cart").hide();
$(".emptycart").hide();
//读取用户名
(function() {
    // console.log($.cookie("username"));
    let str = `<a class="exit">　退出登录</a>`;
    if ($.cookie("username") == "" || $.cookie("username") == "null" || $.cookie("username") == undefined) {
        let yes = confirm("您还未登录！即将跳转至首页，是否去登录？"); //检测用户是否登录
        if (yes) {
            location.href = "../login.html";
        } else {
            location.href = "../";
        }
    } else {
        // console.log(1);
        $(".topul").html("已登录祝您购物愉快！" + $.cookie("username") + str);
        //获取购物车数据（数量）
        let id = $.cookie("userid");
        $.get("http://jx.xuzhixiang.top/ap/api/cart-list.php", { id: id }, (res) => {
            let count = res.data.length;
            //写入购物车数量
            if (count == 0) { //判断购物车中商品种类的数量，为0时隐藏购物车，显示空购物车提示
                cart();
            } else { //不为0时隐藏空购物车提示，显示购物车提示
                emptycart();
            }
            $(".cartcount").html(count);
            $(".comcount").html(count);
        });
    }
})();
//设置购物车隐藏，空购物车提示
function cart() {
    $(".cart").hide();
    $(".emptycart").show();
}
//设置空购物车提示隐藏，购物车显示
function emptycart() {
    $(".emptycart").hide();
    $(".cart").show();
}
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
    let id = $.cookie("userid"); //获取当前用户id
    let str = "";
    $.get("http://jx.xuzhixiang.top/ap/api/cart-list.php", { id: id }, (res) => {
        res = res.data;
        if (res.length != 0) { //这里是判断一开始加载页面购物车是否有数据，0条时将全选框置为flase,不为0时置为选中
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);
        }
        res.forEach((item) => { //利用模板字符串插入html结构
            str += `
                <tr id="${item.pid}">
                <td class="check"><input type="checkbox" class="checkthis"></td>
                    <td class="img">
                        <a href="../detail.html?id=${item.pid}"><img src="${item.pimg}" alt=""></a>
                    </td>
                    <td class="name">${item.pname}</td>
                    <td class="desc">${item.pdesc}</td>
                    <td>￥<span class="price">${item.pprice}</span></td>
                    <td class="thiscount">
                        <div class="countwrap clean">
                            <span class="minus fl">-</span>
                            <input type="text" class="count fl" value="${item.pnum}">
                            <span class="add fl">+</span>
                        </div>
                    </td>
                    <td class="thispsum pay">￥<span class="thissum">${item.pprice*item.pnum}</span></td>
                    <td class="do">
                        <input type="button" value="删除" class="delbtn">
                    </td>
                </tr>
                <hr>
                `;
        });
        $(".showthere").html(str);
        (function() {
            //获取购物车数据（数量）函数updatecartcount
            function updatecartcount() {
                console.log("del");
                let id = $.cookie("userid");
                $.get("http://jx.xuzhixiang.top/ap/api/cart-list.php", { id: id }, (res) => {
                    let count = res.data.length;
                    //写入购物车数量
                    console.log(res);
                    if (count == 0) {
                        console.log("hide");
                        cart();
                    } else {
                        emptycart();
                    }
                    $(".cartcount").html(count);
                    $(".comcount").html(count);
                });
            }
            //数量控制
            (function() {
                //计算合计价格函数getallsum
                function getallsum() {
                    let sum = 0;
                    $(".checkthis").each(function() { //遍历所有单选框
                        if ($(this).prop("checked") == true) { //获取所有被选中的单选框
                            sum += parseInt($(this).parent().parent().children(".thispsum").children(".thissum").text()); //获取所有被选中单选框所对应的“单个商品总价”里的价格，进行累加求和
                        }
                    });
                    return sum;
                }
                $(".allsum").text(getallsum());
                let id = $.cookie("userid");
                //更新购物车函数useajax，两个参数，第一个参数为该商品最新数量，第二个参数为商品id
                function useajax(count, pid) {
                    $.get("http://jx.xuzhixiang.top/ap/api/cart-update-num.php", { uid: id, pid: pid, pnum: count }, (res) => {
                        console.log(res);
                    });
                }
                //给每一个减添加点击事件（隐式遍历）
                $(".minus").click(function() {
                    let pid = $(this).parent().parent().parent().attr("id"); //获取所点击的减号对应的商品id（在生成html结构时已经将pid写入id属性）
                    if ($(this).siblings(".count").val() == 1) {
                        //数量为1时不进行操作
                    } else {
                        let count = parseInt($(this).siblings(".count").val()); //获取对应栏的商品数量
                        count -= 1; //改变商品数量
                        $(this).siblings(".count").val(count); //更新页面里的对应栏的商品数量
                        $(this).parent().parent().siblings().children(".thissum").html(parseInt($(this).parent().parent().siblings().children(".price").text()) * count); //修改单个商品总价
                        useajax(count, pid); //调用更新购物车函数更新购物车数据
                        $(".allsum").text(getallsum()); //调用计算合计价格函数更新合计框里的全部商品总价
                    }
                });
                //给每一个加添加点击事件（隐式遍历）
                $(".add").click(function() {
                    let pid = $(this).parent().parent().parent().attr("id");
                    let count = parseInt($(this).siblings(".count").val());
                    count += 1;
                    $(this).siblings(".count").val(count);
                    $(this).parent().parent().siblings().children(".thissum").html(parseInt($(this).parent().parent().siblings().children(".price").text()) * count);
                    useajax(count, pid);
                    $(".allsum").text(getallsum());
                });
                //获取文本框数量
                $(".count").on("input", function() { //给文本框绑定input事件
                    // console.log($(this));
                    let count = $(this).val(); //获取文本框的值
                    if (count >= 1) { //如果输入值大于等于1
                        let pid = $(this).parent().parent().parent().attr("id"); //获取被改变的文本框对应的商品id
                        $(this).parent().parent().siblings().children(".thissum").html(parseInt($(this).parent().parent().siblings().children(".price").text()) * count); //修改单个商品总价
                        useajax(count, pid); //更新购物车数据
                        $(".allsum").text(getallsum()); //更新全部商品总价
                    } else { //如果输入值小于1，或者输入值不为1（非数字字符）
                        $(this).val(1); //将数量固定为1
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
                        $(this).parent().parent().remove(); //移除删除按钮所在的一条购物车数据展示栏
                        let pid = $(this).parent().parent().attr("id");
                        $.get("http://jx.xuzhixiang.top/ap/api/cart-delete.php", { uid: id, pid: pid }, (res) => {
                            console.log(res);
                            updatecartcount(); //重新获取一下购物车数据，写入购物车数量
                        });
                        allcheck(); //调用更新全选框状态
                        $(".allsum").text(getallsum()); //更新全部商品总价

                    }
                });
                //全选按钮
                $(".checkthis").prop("checked", true); //一开始就把所有单选框选中
                $(".allsum").text(getallsum()); //加载页面时就计算一下全部商品总价
                $(".checkall").click(function() {
                    // console.log("ok");
                    //prop能够获取到checked属性值
                    $(".checkthis").prop("checked", $(this).prop("checked")); //将所有单选框置为选中
                    $(".allsum").text(getallsum()); //调用函数更新全部商品总价
                });
                //更新全选框状态函数allcheck
                function allcheck() {
                    let checked = 0;
                    if (!$(".checkthis")[0]) { //判断当前购物车中是否有展示商品栏，没有就将全选框置为false
                        $(".checkall").prop("checked", false);
                        return;
                    }
                    $(".checkthis").each(function(i) { //遍历所有单选框
                        if ($(this).prop("checked") == true) {
                            checked++; //计算状态为选中的单选框数量
                        }
                    });
                    //判断是否全部为选中状态
                    if (checked == $(".checkthis").length) { //如果被选中单选框数量和单选框数量相等
                        $(".checkall").prop("checked", true); //将全选框置为选中
                    } else {
                        $(".checkall").prop("checked", false); //将全选框取消选中
                    }
                }
                //单个选中按钮
                $(".checkthis").click(function() {
                    //计算选中状态的复选框数量
                    allcheck();
                    $(".allsum").text(getallsum()); //更新全部商品总价
                });
                //删除选中商品按钮、
                $(".delall").click(function() {
                    let yes = confirm("确定删除选中的商品？");
                    if (yes) {
                        $(".checkthis").each(function(i) { //遍历所有单选框
                            if ($(this).prop("checked") == true) {
                                let pid = $(this).parent().parent().attr("id");
                                $(this).parent().parent().remove();
                                $.get("http://jx.xuzhixiang.top/ap/api/cart-delete.php", { uid: id, pid: pid }, (res) => {
                                    console.log(res);
                                    allcheck(); //调用更新全选框状态
                                    $(".allsum").text(getallsum()); //更新全部商品总价
                                    updatecartcount(); //重新获取一下购物车数据，写入购物车数量
                                });
                            }
                        });
                    } else {}
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
        })();
    });
})();
// console.log($(".price"));
// window.onload = function() {

// }
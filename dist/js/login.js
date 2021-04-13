window.onload = function() {
    //切换扫码登录模块
    (function() {
        $(".choice li").click(function() {
            $(this).addClass("active").siblings().removeClass("active");
            let index = $(this).index();
            $(".change").children(".changebox").eq(index).addClass("choicethis").siblings().removeClass("choicethis");
        });
    })();
    //登录总体控制
    (function() {
        let flag = true;
        $(".username").blur(function() {
            console.log(1);
            if ($(this).val() == "") {
                flag = false;
                $(this).siblings(".warn").text("用户名不能为空！");
            } else {
                flag = true;
                $(this).siblings(".warn").text("");
            }
        });
        $(".password").blur(function() {
            if ($(this).val() == "") {
                flag = false;
                $(this).siblings(".warn").text("不能为空！");
            } else {
                flag = true;
                $(this).siblings(".warn").text("");
            }
        });
        $(".loginbtn").click(function() {
            let username = $(".username").val();
            let password = $(".password").val();
            if (username == "" || password == "") {
                flag = false;
            }
            if (!flag) {
                alert("登录失败！请确认信息无误后重试！");
                return;
            }
            /* $.ajax({url:"http://localhost:3000/users",data:{name:$(".username").val(),password:$(".password").val()}}); */
            $.get("http://jx.xuzhixiang.top/ap/api/login.php", { username: username, password: password }, (res) => {
                // console.log(res.data);
                if (res.code == 1) {
                    $.cookie("username", username);
                    $.cookie("userid", res.data.id);
                    location.href = "../";
                } else {
                    alert("用户名密码错误！请重试！");
                }
            });
        });
    })();
}
window.onload = function() {
    (function() {
        let flag = false;
        //用户名框
        $(".username").blur(function() {
            if ($(this).val() == "") {
                // flag = false;//突然发现这种验证形式有bug我在后面改了
                $(this).siblings(".warn").addClass("error").text("用户名不能为空！");
            } else {
                // flag = true;
                $(this).siblings(".warn").removeClass("error").text("");
            }
        });
        //手机号框
        $(".phonenum").blur(function() {
            let reg = /^1[3456789]\d{9}$/;
            if (!reg.test($(this).val())) {
                $(this).siblings(".warn").addClass("error").text("手机号格式错误！");
            } else {
                $(this).siblings(".warn").removeClass("error").text("");
            }
        });
        let numflag = false; //这里设置一个新的检测器
        //密码框
        $(".pwd").blur(function() {
            if ($(this).val() == "") {
                numflag = false; //修改新检测器
                $(this).siblings(".warn").addClass("error").text("密码不能为空！");
            } else {
                numflag = true;
                $(this).siblings(".warn").removeClass("error").text("");
            }
        });
        //确认密码框
        $(".confirm").blur(function() {
            let beforenum = $(".pwd").val();
            if (numflag) { //先判断第一个密码框是否为空
                if ($(this).val() != beforenum) {
                    $(this).siblings(".warn").addClass("error").text("两次密码不符！");
                } else {
                    $(this).siblings(".warn").removeClass("error").text("");
                }
            } else {
                $(this).siblings(".warn").addClass("error").text("请先输入第一次密码！");
            }
        });
        //注册按钮
        $(".registerbtn").click(function() {
            let username = $(".username").val();
            let pwd = $(".pwd").val();
            let phonenum = $(".phonenum").val();
            // console.log($(".warn").text());
            //prop可以检测checked属性值
            if (!$(".checkbox").prop("checked")) {
                flag = false;
                alert("请您阅读用户协议勾选同意后重试！");
                return;
            }
            let newflag = true;
            $(".txt").each(function(i) { //遍历所有文本框，检测是否为空
                if ($(this).val() == "") {
                    newflag = false;
                }
            });
            if ($(".warn").text() == "" && newflag) { //通过判断error是否存在和所有文本框的内容不为空来验证所有输入是否合规
                $.ajax({
                    url: "http://jx.xuzhixiang.top/ap/api/reg.php",
                    type: "get", //新增
                    data: { username: username, password: pwd },
                    success: (res) => {
                        console.log(res);
                        if (res.code == 1) {
                            let yes = confirm("注册成功！是否进入登录页面？");
                            if (yes) {
                                location.href = "../login.html";
                            }
                        } else {
                            alert("注册失败！请重试！");
                        }
                    }
                });
            } else {
                alert("请填写所有信息确认正确后重试！");
            }
        });
    })();
};
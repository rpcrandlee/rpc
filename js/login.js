$(function () {
    //表单校验
    var $form = $("form");
    $form.bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: "用户名不能为空"
                    },
                    callback: {
                        message: "用户名不存在"
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: "用户密码不能为空"
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: "密码长度是6-12位"
                    },
                    callback: {
                        message: "密码错误"
                    }
                }
            }
        }
    });

    //表单校验成功事件
    $form.on("success.form.bv", function (e) {
        //阻止浏览器默认行为
        e.preventDefault();
        console.log("哈哈");
        $.ajax({
            type: "post",
            url: "/employee/employeeLogin",
            data: $form.serialize(),
            success: function (data) {
                console.log(data);
                if (data.success) {
                    location.href = "index.html";
                }
                if (data.error === 1000) {
                    $form.data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
                }
                if (data.error === 1001) {
                    $form.data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
                }
            }
        })
    });
    $("[type='reset']").on("click", function () {
        $form.data("bootstrapValidator").resetForm();
    });
})
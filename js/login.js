/**
 * Created by Administrator on 2016/9/29.
 */
/*-------------------手机号-----------------------*/
var username = document.getElementById("username");
username.onfocus = username.onblur = username.onkeyup = checkUsername;

function checkUsername(e){
    var _e = window.event||e;
    var v = username.value;  //用户名中的内容
    var tip = document.getElementById("error_ds");
    if(_e.type=="focus"){  //获取焦点事件
        if(v.length==0){  //文本框中的内容为空时，显示默认提示信息
            tip.style.display = "none";
            tip.innerHTML="";
            return false;
        }
    }

    if(_e.type=="blur"){
        if(v.length==0){
            tip.style.display = "block";
            tip.innerHTML="请输入手机号码";
            return false;
        }
    }

    /*其他情况（用户输入的时候或点击注册按钮的时候）*/
    if(v.length==0){  //文本框为空的情况下
        tip.style.display = "block";
        tip.innerHTML = "请输入手机号码";
        return false;
    }else{  //文本框不为空的情况
        if(regExpManger.mobileReg.test(v)){  //格式正确
            tip.style.display = "none";
            return true;
        }else{
            tip.style.display = "block";
            tip.innerHTML = "手机号码格式错误";
            return false;
        }
    }
}
/*------------------密码验证----------------------*/
var password = document.getElementById("password");  //获取用户名节点对象
password.onfocus = password.onblur = password.onkeyup = checkPassword;


function checkPassword(e){
    var _e = window.event||e;
    var v = password.value;  //用户名中的内容
    var tip = document.getElementById("error_dsp");
    if(_e.type=="focus"){  //获取焦点事件
        if(v.length==0){  //文本框中的内容为空时，显示默认提示信息
            tip.style.display = "none";
            tip.innerHTML="";
            return false;
        }
    }

    if(_e.type=="blur"){
        if(v.length==0){
            tip.style.display = "block";
            tip.innerHTML="请输入密码";
            return false;
        }
    }

    /*其他情况（用户输入的时候或点击注册按钮的时候）*/
    if(v.length==0){  //文本框为空的情况下
        tip.style.display = "block";
        tip.innerHTML = "请输入密码";
        return false;
    }else{  //文本框不为空的情况
        if(v.length>=6&&v.length<=20){ //长度符合
            tip.style.display = "block";
            tip.innerHTML = "可以使用";
            return true;
        }else{  //长度不符合
            tip.style.display = "block";
            tip.innerHTML = "密码长度不正确";
            return false;
        }
    }
}
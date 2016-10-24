/**
 * Created by Administrator on 2016/9/29.
 */
/*------------------手机号----------------------*/
var userName = document.getElementById("phone");  //获取用户名节点对象
userName.onfocus = userName.onblur = userName.onkeyup = checkUserName;

function checkUserName(e){
    var _e = window.event||e;
    var v = userName.value;  //用户名中的内容
    var tip = document.querySelector(".tipsInfo");//信息提示容器节点对象
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

/*------------------验证码----------------------*/
var code = document.getElementById("phoneCode");  //获取用户名节点对象
code.onfocus = code.onblur = code.onkeyup = checkCode;
var code2 = document.getElementById("code2");

function checkCode(e){
    var _e = window.event||e;
    var v = code.value;  //用户名中的内容
    var tip = document.querySelector(".tipsInfo");//信息提示容器节点对象
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
            tip.innerHTML="请输入验证码";
            return false;
        }
    }

    /*其他情况（用户输入的时候或点击注册按钮的时候）*/
    if(v.length==0){  //文本框为空的情况下
        tip.style.display = "block";
        tip.innerHTML = "请输入验证码";
        return false;
    }else{  //文本框不为空的情况
        if(code.value==code2.value){  //格式正确
            tip.style.display = "none";
            return true;
        }else{
            tip.style.display = "block";
            tip.innerHTML = "验证码格式错误";
            return false;
        }
    }

}
/*------------------密码验证----------------------*/
var tbPassword1 = document.getElementById("userpwd");  //获取用户名节点对象
tbPassword1.onfocus = tbPassword1.onblur = tbPassword1.onkeyup = checkPassword;


function checkPassword(e){
    var _e = window.event||e;
    var v = tbPassword1.value;  //用户名中的内容
    var tip = document.querySelector(".tipsInfo");//信息提示容器节点对象

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
            var leval = getLevel(v);
            switch(leval){
                case 1:
                    tip.style.display = "block";
                    tip.innerHTML = "安全强度较弱，但是可以使用";
                    break;
                case 2:
                    tip.style.display = "block";
                    tip.innerHTML = "安全强度适中，可以使用三种以上的组合来提高安全强度"
                    break;
                default:
                    tip.style.display = "block";
                    tip.innerHTML = "你的密码很安全"

            }
            return true;
        }else{  //长度不符合
            tip.style.display = "block";
            tip.innerHTML = "密码长度不正确"
            return false;
        }
    }
}

/*------------------确认密码----------------------*/
var tbPassword2 = document.getElementById("userpwd1");  //获取用户名节点对象
tbPassword2.onfocus = tbPassword2.onblur = tbPassword2.onkeyup = checkPassword2;


function checkPassword2(e){
    var _e = window.event||e;
    var v = tbPassword2.value;//用户名中的内容
    var v2 = tbPassword1.value;
    var tip = document.querySelector(".tipsInfo");//信息提示容器节点对象
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
        if(v2==v){ //长度符合
            tip.style.display = "block";
            tip.innerHTML = "可以使用";
            return true;
        }else{  //长度不符合
            tip.style.display = "block";
            tip.innerHTML = "两次输入不一致，请重新输入";
            return false;
        }
    }
}
/*--------------------------注册追踪------------------------------------*/
var btn = document.getElementById("btn_reg");
var agree =  document.getElementById("agree");
var tip = document.querySelector(".tipsInfo");

btn.onclick = function(){
    //console.log("1");
    if(agree.checked){
        if(checkPassword()&&checkPassword2()&&checkCode()&&checkUserName()){
            alert("恭喜您成为我们的会员~！");
            location.href = "login.html";
        }
    }else{
        tip.style.display = "block";
        tip.innerHTML="请先同意协议";
    }
}






var hide = document.getElementById("getPhoneCode");
//var code2 = document.getElementById("code2"); //隐藏域节点对象
var arr = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9"];
/*点击验证码切换验证码并改变隐藏域的值*/
hide.onclick = function(){
    var str = "";
    for(var i = 0;i<4;i++){
        var index = parseInt(Math.random()*arr.length);
        str+=arr[index];
    }
    hide.innerHTML = str;
    code2.value = hide.innerHTML;
}

function getLevel(pwd){
    var leval = 0;  //级别
    var isHasWord = false;  //没有记录过
    var isHasNumber = false;  //没有记录过
    var isHasOther = false;   //没有记录过
    for(var i = 0;i<pwd.length;i++){
        //abc123&
        if(regExpManger.wordReg.test(pwd[i])){
            if(isHasWord){  //true
                continue;
            }else{   //
                isHasWord = true;
                leval+=1;
            }
        }else if(regExpManger.numReg.test(pwd[i])){
            if(isHasNumber){  //true
                continue;
            }else{   //
                isHasNumber = true;
                leval+=1;
            }
        }else{
            if(isHasOther){  //true
                continue;
            }else{   //
                isHasOther = true;
                leval+=1;
            }
        }
    }

    return leval; //级别
}


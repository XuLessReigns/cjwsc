/**
 * Created by Administrator on 2016/10/6.
 */
var opeateCookie = {
    createPid:function(st){
        var str = $.cookie("shangp");
        if(!str){
            $.cookie("shangp",st);
        }else{
            var cols = str.split("|");    //每列商品
            var pi = st.split("#");
            for(var i=0,leng=cols.length;i<leng;i++){
                var o = cols[i];
                var rows = o.split("#");
                if(rows[0]==pi[0]&&rows[6]==pi[6]){
                  rows[7] =  parseInt(rows[7])+parseInt(pi[7]);
                  cols[i]= rows.join("#");
                    break;
                }
                if(i==leng-1){
                    cols[leng] = st;
                }
            }
            str = cols.join("|");
            $.cookie("shangp",str);
        }
    },
    objChangestr:function(arr){
        var str = "";
        $.each(arr,function(i,o){
            if(i!=(arr.length-1)){
                str += o+"#";
            }else{
                str += o;
            }
        })
        return str;
    },
    addPid:function(pid,siz,flag){
       var str = $.cookie("shangp");
        var cols = str.split("|");
        $.each(cols,function(i,o){
            var rows = o.split("#");
            if(rows[0]==pid&&rows[6]==siz){
                if(flag){
                    rows[7] = parseInt(rows[7])+1;
                }else{
                    rows[7] = parseInt(rows[7])-1;
                }
               cols[i]=rows.join("#");
                str = cols.join("|");
                $.cookie("shangp",str);
            }
        })
    },
    removePid:function(pid,siz){
        var str = $.cookie("shangp");
        var cols = str.split("|");
         $.each(cols,function(i,o){
            var rows = o.split("#");
            if(rows[0]==pid&&rows[6]==siz){
                cols.splice(i,1);
                str = cols.join("|");
                $.cookie("shangp",str);
                return false;
            }
        })

    }
}
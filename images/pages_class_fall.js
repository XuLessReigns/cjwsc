/**
 * Created with JetBrains WebStorm.
 * User: xufengqi
 * Date: 13-5-3
 * Time: 下午4:42
 * To change this template use File | Settings | File Templates.
 */

var pages_class = function(pagesize, page, total) {
    this.pagesize = pagesize;
    this.pageNum = Math.ceil(total / pagesize);
    this.page = page;
    this.total = total;
    if(arguments.length===4){
        this.toAjaxPage = arguments[3];
    }else{
        this.toAjaxPage = 'ajaxPage';
    }
    this.displaynum = 3;
};
var pro = pages_class.prototype;
pro.config = {
    'header':"个记录", 
    "prev":"上一页", 
    "next":"下一页", 
    "first":"首 页", 
    "last":"尾 页"
};
pro.start = function () {
    if (this.total == 0) {
        return 0;
    } else {
        return (this.page - 1) * this.pagesize + 1;
    }
};
pro.end = function () {
    return Math.min(this.page * this.pagesize, this.total);
}

pro.first = function () {
    var html = "";
    if (this.page - this.displaynum>=1) {
        html += "<a href='javascript:"+this.toAjaxPage+"(1)' class='pagefirst ks-button'>1</a><!--<span class='page_more'>...</span>-->";
    }
    return html;
}
pro.last = function() {
    var html = "";
    if (this.page + this.displaynum + 1 <= this.pageNum){
        html ="<!--<span class='page_more'>...</span>--><a href='javascript:"+this.toAjaxPage+"("+this.pageNum+")' class='pagelast ks-button'>"+this.pageNum+"</a>";
    }
    return html;
}
pro.prev = function () {
    var html = "";
    if (this.page !== 1) {
        html += "<a href='javascript:"+this.toAjaxPage+"("+(this.page-1)+")' class='pagepre ks-button'>" + this.config["prev"] + "</a>";
    }else{
         html += "<a href='javascript:void(0);' class='pagepre ks-button'>" + this.config["prev"] + "</a>";
    }
    return html;
}
pro.next = function() {
    var html = "";
    if (this.page !==  this.pageNum){
        html = "<a href='javascript:"+this.toAjaxPage+"("+(this.page+1)+")' class='pagenext ks-button'>"+this.config["next"]+"</a>";
    }else{
        html = "<a href='javascript:void(0);' class='pagenext ks-button'>"+this.config["next"]+"</a>";
    }
    return html;
}
pro.pageList = function () {
    var linkPage = "";
    var inum = this.displaynum;
    var page = 0;
    for (var i = inum; i >= 1; i--) {
        page = this.page - i;
        if (page < 1 ) {
            continue;
        }
        linkPage += "<a href='javascript:"+this.toAjaxPage+"("+page+")' class='pagecommon ks-button'>" + page + "</a>";
    }
    linkPage += "<a class='page-cur ks-button'>" + this.page + "</a>";

    for (var i = 1; i <= inum; i++) {
        page = this.page + i;
        if (page <= this.pageNum) {
            linkPage += "<a href='javascript:"+this.toAjaxPage+"("+page+")' class='pagecommon ks-button'>" + page + "</a>";
        } else {
            break;
        }
    }
    return linkPage;
}
pro.goPage = function() {
    return '<span class="total"><input type="text" class="txt" onkeydown="javascript:if(event.keyCode==13){var page=(this.value>' +this.pageNum+')?' +
    this.pageNum+ ':this.value;'+this.toAjaxPage+'(page)}" value="' +this.page+ '" ' +
    'style="width:25px"><input type="button" class="ks-button_class" value="确定"' +
    ' onclick="javascript:var page=(this.previousSibling.value>' +this.pageNum+ ')?' +
    this.pageNum+ ':this.previousSibling.value;' +
    ''+this.toAjaxPage+'(page)"></span>';
}

pro.fpage = function() {
    if(arguments.length<1){
        var display = [];
    } else {
        var display = arguments[0];
    }
    var html = [];
    html[0] = "共有<b>"+this.pageNum+"</b>页";
    html[1] = "每页显示<b>" + (this.end() - this.start() + 1) + "</b>条，本页〉<b>"+this.start()+"-"+this.end()+"</b>条";
    html[2] = "第<b>"+this.page+"</b>页";
    html[3] = this.prev();
    html[4] = this.first();
    html[5] = this.pageList();
    html[6] = this.last();
    html[7] = this.next();
    html[8] = this.goPage();
    var fpage = '';
    for(var i in display){
        fpage += html[display[i]];
    }
    return  fpage;
};
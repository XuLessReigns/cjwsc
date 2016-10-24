KISSY.add(function (S, Node, Slide,Switchable,DD) {
    var $ = Node.all;
    var self = {
        init: function () {
        },
        functions: {
            loadWidget: function (selector,moduleName) {
                $(selector).each(function (item) {
                        // 'prevBtnCls':'tu_prev',                       'nextBtnCls':'tu_next'
                        if (!item.attr("loaded")) {
                            item.attr("loaded", "loaded");

                            try {
                                var data_widget_config = eval("(" + item.attr("data-widget-config") + ")");
                                if (S.Features.isTouchEventSupported()) {
                                    if(moduleName.indexOf('shop-um-sys_top_slide')){
                                        data_widget_config.effect = 'vSlide';
                                    }
                                    if ( moduleName === 'tshop-um-sys_recommend5') {
                                        data_widget_config.effect = 'hSlide';
                                    }
                                }
                            } catch (e) {
                                S.log(e);
                                S.log(moduleName);
                            }


                           var widgetType =   item.attr("date-type")?item.attr("date-type"):"slide";

                            if(widgetType==='accordion'){
                                try {
                                    var Accordion = Switchable.Accordion;
                                    Accordion(item, data_widget_config);
                                } catch (e) {
                                    S.log(e);
                                }
                            }else{

                                try {
                                    var widgetItem = new Slide(item, data_widget_config);
                                } catch (e) {
                                    S.log(e);
                                }
                                item.all("." + data_widget_config.prevBtnCls).on("click", function () {
                                    widgetItem.previous();
                                });
                                item.all("." + data_widget_config.nextBtnCls).on("click", function () {
                                    widgetItem.next();
                                });

                            }






                        }
                    }
                );
            }
        }
    };
    return self;
}, {
    requires: [ "node", "gallery/slide/2.0.3/index","gallery/switchable/1.3.1/index","dd"]
});

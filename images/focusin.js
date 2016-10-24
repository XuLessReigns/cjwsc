/*
Copyright 2013, KISSY v1.42
MIT Licensed
build time: Dec 4 22:15
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 event/dom/focusin
*/

KISSY.add("event/dom/focusin", ["event/dom/base"], function(S, require) {
  var DomEvent = require("event/dom/base");
  var Special = DomEvent.Special;
  S.each([{name:"focusin", fix:"focus"}, {name:"focusout", fix:"blur"}], function(o) {
    var key = S.guid("attaches_" + S.now() + "_");
    Special[o.name] = {setup:function() {
      var doc = this.ownerDocument || this;
      if(!(key in doc)) {
        doc[key] = 0
      }
      doc[key] += 1;
      if(doc[key] === 1) {
        doc.addEventListener(o.fix, handler, true)
      }
    }, tearDown:function() {
      var doc = this.ownerDocument || this;
      doc[key] -= 1;
      if(doc[key] === 0) {
        doc.removeEventListener(o.fix, handler, true)
      }
    }};
    function handler(event) {
      var target = event.target;
      return DomEvent.fire(target, o.name)
    }
  });
  return DomEvent
});


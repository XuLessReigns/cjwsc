KISSY.add(function (S, DOM, Event, Switchable, undefined) {
    var DURATION = 200,
        win = S.Env.host,
        checkElemInViewport = function (elem) {
            var scrollTop = DOM.scrollTop(),
                vh = DOM.viewportHeight(),
                elemOffset = DOM.offset(elem),
                elemHeight = DOM.height(elem);
            return elemOffset.top > scrollTop &&
                elemOffset.top + elemHeight < scrollTop + vh;
        };
    S.mix(Switchable.Config, {
        pauseOnScroll: false,
        autoplay: false,
        interval: 5,
        pauseOnHover: true
    });
    Switchable.addPlugin({

        name: 'autoplay',

        init: function (host) {

            var cfg = host.config,
                interval = cfg.interval * 1000,
                timer;

            if (!cfg.autoplay) {
                return;
            }

            if (cfg.pauseOnScroll) {
                host.__scrollDetect = S.buffer(function () {
                    host[checkElemInViewport(host.container) ? 'start' : 'stop']();
                }, DURATION);
                Event.on(win, "scroll", host.__scrollDetect);
            }

            function startAutoplay() {
                timer = S.later(function () {
                    if (host.paused) {
                        return;
                    }
                    host.next();
                }, interval, true);
            }

            startAutoplay();

            host.stop = function () {

                if (timer) {
                    timer.cancel();
                    timer = undefined;
                }
                host.paused = true;
            };

            host.start = function () {

                if (timer) {
                    timer.cancel();
                    timer = undefined;
                }
                host.paused = false;
                startAutoplay();
            };
            if (cfg.pauseOnHover) {
                Event.on(host.container, 'mouseenter', host.stop, host);
                Event.on(host.container, 'mouseleave', host.start, host);
            }
        },
        destroy: function (host) {
            if (host.__scrollDetect) {
                Event.remove(win, "scroll", host.__scrollDetect);
                host.__scrollDetect.stop();
            }
        }
    });
    return Switchable;
}, { requires: ["dom", "event", "./base"]});
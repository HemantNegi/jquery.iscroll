/*!
 * jquery.iscroll - v1.0.0
 * https://github.com/HemantNegi/jquery.iscroll
 * 2015-05-27
 *
 * Copyright 2015 Hemant Negi
 * Email : hemant.frnz@gmail.com
 * Compressor http://refresh-sf.com/
 */

function iscroll($e, options) {
    var O = this,
        _isWindow = ($e.css('overflow-y') === 'visible'),
        $scroll = _isWindow? $(document) : $e,
        stopReqs = false,
        reqUrl = '',
        isLoading = false,
        loader = null,
        ctr=0;



    O.S = {
        Loadingoffset: 20,
        optionsData: {},
        loadingHtml: '<small>Loading...</small>', // null
        sendReqonInit:false,
        autoTrigger: true, //must be true for autoTriggerUntil
        autoTriggerUntil: false,
        next:'a:last',
        onBeginRequest: null,
        ondataArrival: null
    };


    O.RequestItems = function () {

        if (stopReqs || isLoading) return;
        isLoading = true;

        if(O.S.loadingHtml)
            loader = $(O.S.loadingHtml);
            $e.append(loader);

        if (O.S.onBeginRequest != null) O.S.onBeginRequest();
        ctr++;

        $.get(reqUrl, O.S.optionsData, function (d) {

                loader.remove();
                if (O.S.ondataArrival != null) O.S.ondataArrival(d);

                $e.append(d);

                if(O.S.autoTriggerUntil && ctr >= O.S.autoTriggerUntil){
                   O.S.autoTriggerUntil = O.S.autoTrigger = false;
                   $scroll.off('scroll.sq');
                }
                O.setNext();

                isLoading = false;
            });
    };

    O.setNext = function(){
        var _n = $e.find(O.S.next);
        reqUrl = _n.attr('href');
       if (!reqUrl)
            stopReqs = true;

        if(O.S.autoTrigger) {
            _n.remove();
        }
       else{
            _n.removeAttr('href').on('click',function(){
                O.RequestItems();
                _n.remove();
            });
        }
    };


    this.ConnectScrollLoad = function () {
        $scroll.on('scroll.sq', function () {
                var iHeight = _isWindow ? $scroll.height() : $scroll.prop('scrollHeight');
                var tHeight = _isWindow ? $(window).height() : $scroll.height();
                //$('.testing').scrollTop() >= $('.testing').prop('scrollHeight') - $('.testing').height() - O.S.Loadingoffset
                //$(document).scrollTop() >= $(document).height() - $(window).height() - O.S.Loadingoffset
                if ($scroll.scrollTop() >= iHeight - tHeight - O.S.Loadingoffset) {
                    O.RequestItems();
                }
        });
    };


    this.init = function () {
        $.extend(this.S, options);
        if(O.S.autoTrigger)O.ConnectScrollLoad();
        O.setNext();
        if (O.S.sendReqonInit)
            O.RequestItems();
    }
    this.init();
}


$.fn.iscroll = function(m) {
    return this.each(function() {
        var $this = $(this),
            data = $this.data('iscroll');

        // return if already initialized.
        if (data && data.initialized) {
            return;
        }
        data = new iscroll($this, m);
    });
};

(function(){
    var _addEventListener = null, _eventQueue = [], _handleCounter = 0;

    var _isJSLibLoaded = function(){
        return (window.jQuery && window.jQuery.Event);
    };

    if(window.addEventListener){
        _addEventListener = function(el, eType, fn){
            el.addEventListener(eType, fn, false);
        };
    }
    else if(window.attachEvent){
        _addEventListener = function(el, eType, fn){
            el.addEventListener('on'+eType, fn, false);
        };
    }

    var _handleClick = function(evt){
        _eventQueue.push(evt);
    };
    
    var _handleOnloadEvent = function(){
        if(_isJSLibLoaded()){
            $(document).unbind('click', _handleClick);
            
            for(var i; i < _eventQueue.length; i++){
                var $elemTarget = $(event.target);

                if($elemTarget){
                    $elemTarget.trigger('click');
                }
            }
            
        }
        //try again later, but at most only 5 times
        else if(_handleCounter < 5){
            setTimeout( _handleOnloadEvent, 250);
            _handleCounter++;
        }
    };

    if(_addEventListener && !_isJSLibLoaded()){
        _addEventListener(document, 'click', _handleClick);

        _addEventListener(window, 'load', _handleOnloadEvent);
    }

})();
(function(){
    var _addEventListener = null, _removeEventListener = null, _eventQueue = [], _handleCounter = 0;

    var _isJSLibLoaded = function(){
        return (window.jQuery && window.jQuery.Event);
    };

    if(window.addEventListener){
        _addEventListener = function(el, eType, fn){
            el.addEventListener(eType, fn, false);
        };
        
        _removeEventListener = function(el, eType, fn){
            el.removeEventListener(eType, fn, false);
        };
    }
    else if(window.attachEvent){
        _addEventListener = function(el, eType, fn){
            el.addEventListener('on'+eType, fn, false);
        };
        
        _removeEventListener = function(el, eType, fn){
            el.removeEventListener('on'+eType, fn, false);
        };
    }

    var _handleClick = function(evt){
        evt.preventDefault();
        evt.stopPropagation();
        
        if(!_isJSLibLoaded()){
            _eventQueue.push(evt);
        }
    };
    
    var _handleOnloadEvent = function(){
        if(_isJSLibLoaded()){
            _removeEventListener(document, 'click', _handleClick);
            
            for(var i = 0; i < _eventQueue.length; i++){
                var eventPath = _eventQueue[i].path;
                if(!eventPath){
                    break;
                }
                // Use trigger handler to only trigger javascript events
                for(var j = 0; j < eventPath.length; j++){
                    $(eventPath[j]).triggerHandler('click');
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
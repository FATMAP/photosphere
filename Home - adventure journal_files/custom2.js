//jQuery(document).ready(function($){
jQuery(window).load(function($){	

 	var _now = Date.now || function() { return new Date().getTime(); };
	var _debounce = function(func, wait, immediate) {
	var timeout;
	return function() {
	        var context = this, args = arguments;
	        var later = function() {
	            timeout = null;
	            if (!immediate) func.apply(context, args);
	        };
	        var callNow = immediate && !timeout;
	        clearTimeout(timeout);
	        timeout = setTimeout(later, wait);
	        if (callNow) func.apply(context, args);
	    };
	};

	var elementExists = document.getElementById('width');
	if(typeof(elementExists) != 'undefined' && elementExists != null ){
		document.getElementById('width').innerHTML = window.innerWidth || document.documentElement.clientWidth;
	
		window.addEventListener("resize", _debounce(function() {
		    console.log ("Doing refresh");
		    document.getElementById ("width").innerHTML = window.innerWidth || document.documentElement.clientWidth;
		    googletag.pubads().refresh([window.slot1,window.slot2]);
		  }, 200)
		);
	}

				
});


	

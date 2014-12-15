(function(window){
	/* RequestAnimationFrame
	 * From Erik Moller's polyfill
	 * Adapted to return an animationFrame object
	 * http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
	*/

	//don't pollute the window scope
	var requestAnimationFrame = window.requestAnimationFrame;
	var cancelAnimationFrame  = window.cancelAnimationFrame || window.cancelRequestAnimationFrame;

	var getTime = (function(){
		if(typeof window.performance === 'undefined' || !window.performance.now){
			return function(){ return window.Date.now() };
		}else{
			return function(){ return window.performance.now(); };
		}
	})();

	(function(requestAnimationFrame, cancelAnimationFrame){

		var lastTime = 0;
		var vendors = ['webkit', 'moz', 'ms'];
		for(var x = 0; x < vendors.length && !requestAnimationFrame; ++x) {
			requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
			cancelAnimationFrame =
			  window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
		}

		if(!requestAnimationFrame){
			requestAnimationFrame = function(callback, element) {
				var currTime = new Date().getTime();
				var timeToCall = Math.max(0, 16 - (currTime - lastTime));
				var id = window.setTimeout(function(){
					callback(currTime + timeToCall);
				}, timeToCall);
				lastTime = currTime + timeToCall;
				return id;
			};
		}

		if(!cancelAnimationFrame){
			cancelAnimationFrame = function(id){
				clearTimeout(id);
			};
		}
	})(requestAnimationFrame, cancelAnimationFrame);

	var loopy = {};
	loopy.request = function(callback){
		/* Create a wrapper which gives change in time (deltaTime) to the callback, rather
		 * than the current time which is what normal window.requestAnimationFrame does
		 */
		var startTime = getTime();
		return requestAnimationFrame.call(window, function(){
			var currentTime = getTime();
			var deltaTime = currentTime - startTime; //time since request was made
			callback(deltaTime);
		});
	}

	loopy.loop = function(callback){
		/* Often a rAF loop is needed,
		 * Here we pass both the time since last frame (deltaTime) and time since start of loop (timeElapsed)
		 * into the animationframe callback.
		 * To stop the loop, the cancel method must be called on the callback context or the return value.
		 *
		 * Usage:
		 * var anim = loopy.loop(function(deltaTime, timeElapsed){
		 *   if(timeElapsed > 1000){ //1 second
		 *     this.cancel();
		 *   }
		 *   //do some animation using the time values deltaTime and timeElapsed
		 * });
		 *
		 * anim.cancel(); //this will also cancel the animation
		 */
		var startTime = previousTime = getTime();
		var context = {
			'requestId' : null,
			'cancel' : function(){
				loopy.cancel.call(window, this.requestId);
			},
			'frame'  : 0,
		};
		(function loop(){
			context.requestId = requestAnimationFrame.call(window, function(){
				loop.call(context);
			});

			var currentTime = getTime();
			var deltaTime = currentTime - previousTime;
			var timeElapsed = currentTime - startTime;

			callback.call(context, deltaTime, timeElapsed);

			context.frame++;
			previousTime = currentTime;
		}.call(context));
		return context;
	}

	loopy.cancel = function(id){
		cancelAnimationFrame.call(window, id);
	}

	//expose globally
	window.loopy = loopy;

	//support AMD
	if(typeof window.define === "function" && window.define.amd){
		window.define("loopy", [], function(){
			return window.loopy;
		});
	}

})(window);

var extend = require('extend');

module.exports = function(loopy){
	/*
	 * Exponential decay or growth
	 * Options:
	 *   initial: initial value to grow or decay
	 *   halflife: time taken to halve, or double the value (miliseconds)
	 *   growth: if true, value increases exponentially instead of decreasing.
	 */
	loopy.exponential = function(callback, options){
		options = extend({
			initial : 100,
			halflife : 1000, //miliseconds
			growth: false, //true for growth instead of decay
		}, options);

		var decay = (options.growth ? 1 : -1) * Math.log(2) / (options.halflife);
		return loopy(function(deltaTime, timeElapsed){
			var value = options.initial * Math.exp(timeElapsed * decay);
			callback.call(this, value, deltaTime, timeElapsed);
		});
	};

	/*
	 * Sinusoidal oscillation
	 * Options:
	 *   amplitude: maximum value returned
	 *   phase: angle in radians to adjust the phase
	 *   period: time for one full sinusoidal cycle
	 */
	loopy.sinusoidal = function(callback, options){
		options = extend({
			amplitude: 100,
			phase: 0, //radians
			period: 1000, //miliseconds
		}, options);

		var frequency = 2 * Math.PI / options.period;
		return loopy(function(deltaTime, timeElapsed){
			var angle = options.phase + timeElapsed * frequency;
			var value = options.amplitude * Math.sin(angle);

			callback.call(this, value, deltaTime, timeElapsed);
		});
	};

	loopy.scroll = function(callback, options){
		var getWindowPosition = function(){
			return {
				x : window.pageXOffset,
				y : window.pageYOffset
			};
		};
		var previousWindowPosition = getWindowPosition();
		return loopy(function(deltaTime, timeElapsed){
			var windowPosition = getWindowPosition();
			if(windowPosition.y !== previousWindowPosition.y || windowPosition.x !== previousWindowPosition.x){
				callback.call(this, deltaTime, timeElapsed);
				previousWindowPosition = windowPosition;
			}
		});
	};
};

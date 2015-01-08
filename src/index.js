var loopy = require('./core.js');
require('./animation-helpers.js')(loopy);

//expose to browsers
if(typeof window != "undefined"){
	window.loopy = loopy;

	//support AMD
	if(typeof window.define === "function" && window.define.amd){
		window.define("loopy", [], function(){
			return window.loopy;
		});
	}
}

module.exports = loopy;

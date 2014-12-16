(function(loopy){
	loopy.merge = function(defaults, target){
		target = target || {};
		for(var name in defaults){
			if(target[name] === undefined){
				target[name] = defaults[name];
			}
		}
		return target;
	};
})(window.loopy);

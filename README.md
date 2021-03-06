#LoopyJS

A polyfill and wrapper for requestAnimationFrame, providing common functionality for animation and timing loops

##NPM

```
$ npm install loopyjs
```

##Build

Make sure you have grunt-cli installed

```
$ npm install

$ grunt build
```

##Usage

Loop some code, and cancel the loop after 1000ms

```js
var animation = loopy(function(deltaTime, timeElapsed){
	//deltaTime: time since last loop
	//timeElapsed: time since looping started

	if(timeElapsed) >= 1000){
		animation.cancel();
	}

	//your loop code here
	console.log("Here is another loop!");
});
```

You can use the `this` context

```js
loopy(function(deltaTime, timeElapsed){
	if(timeElapsed >= 1000){
		this.cancel();
	}
});
```

You can access other less common information with `this` context

```js
loopy(function(deltaTime, timeElapsed){
	console.log("Currently running frame number: " + this.frame);
});
```

You can use loopy.request like you would normally use requestAnimationFrame, except the callback time is given as time since the request, instead of currentTime

```js
loopy.request(function(deltaTime){
	console.log("It was " + deltaTime + "since we made the request to run this code");
});
```

You can use built-in animation helpers.

```js
var options = {
	initial : 100,
	halflife : 1000, //miliseconds
	growth: false, //true for growth instead of decay
};

loopy.exponential(function(value, deltaTime, timeElapsed){
	console.log("Exponentially decreasing value : " + value);
}, options);
```

```js
var options = {
	amplitude: 100,
	phase: 0, //radians
	period: 1000, //miliseconds
};

loopy.sinusoidal(function(value, deltaTime, timeElapsed){
	console.log("Sinusoidal value : " + value);
}, options);
```

You should *never* place code inside an event handler that is listening to the window ```scroll``` event.
This is because the scroll event can be fired a lot more than is needed, slowing down the browser. 
Instead, you can use the ```loopy.scroll(callback);``` method

```js
loopy.scroll(function(deltaTime, timeElapsed){
	var scrollPosition = window.pageYOffset;

	//react to a change in scroll position here...
});
```

##Contributing

All help is welcome!

Possible future updates include

* More tests
* Examples
* Wrapper for common animations
	* Linear
	* Bezier easing
* Animation time config
* Play / Pause / Rewind methods

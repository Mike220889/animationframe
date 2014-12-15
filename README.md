#LoopyJS

A polyfill and wrapper for requestAnimationFrame, providing common functionality for animation and timing loops

##Build

Make sure you have grunt-cli installed

```
$ npm install

$ grunt build
```

##Usage

Loop some code, and cancel the loop after 1000ms

```js
var animation = loopy.loop(function(deltaTime, timeElapsed){
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
loopy.loop(function(deltaTime, timeElapsed){
	if(timeElapsed >= 1000){
		this.cancel();
	}
});
```

You can access other less common information with `this` context

```js
loopy.loop(function(deltaTime, timeElapsed){
	console.log("Currently running frame number: " + this.frame);
});
```

You can use loopy.request like you would normally use requestAnimationFrame, except the callback time is given as time since the request, instead of currentTime

```js
loopy.request(function(deltaTime){
	console.log("It was " + deltaTime + "since we made the request to run this code");
});
```

##Contributing

All help is welcome!

Possible future updates include

* More tests
* Examples
* Wrapper for common animations
	* Linear
	* Exponential increase / decrease
	* Sinusoidal
	* Bezier easing
* Animation time config
* Play / Pause / Rewind methods

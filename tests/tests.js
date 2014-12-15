QUnit.test("loopy exists in global scope", function(assert){
	assert.ok(window.loopy);
});

QUnit.test("loopy's API is defined", function(assert){
	assert.expect(3);

	assert.equal(typeof window.loopy.loop, "function");
	assert.equal(typeof window.loopy.request, "function");
	assert.equal(typeof window.loopy.cancel, "function");
});

QUnit.test("Can start a loop", function(assert){
	var done = assert.async();
	window.loopy.loop(function(deltaTime, timeElapsed){
		assert.ok(true);
		this.cancel();
		done();
	});
});

QUnit.test("Loop context equals return value", function(assert){
	var done = assert.async(3);
	var animation = window.loopy.loop(function(deltaTime, timeElapsed){
		assert.notEqual(undefined, this);
		assert.notEqual(undefined, animation);
		assert.deepEqual(animation, this);
		this.cancel();
		done();
	});
});

QUnit.test("Can cancel a loop", function(assert){
	var done = assert.async();
	var counter = 0;
	window.loopy.loop(function(deltaTime, timeElapsed){
		counter++;
		this.cancel();
		window.setTimeout(function(){
			//wait a while to make sure there are no more loops
			assert.equal(counter, 1);
			done();
		}, 400);
	});
});

QUnit.test("Loop context contains frame number", function(assert){
	var done = assert.async();
	var counter = 0;
	window.loopy.loop(function(deltaTime, timeElapsed){
		assert.equal(this.frame, counter);
		counter++;
		if(counter >= 5){
			this.cancel();
			done();
		}
	});
});

QUnit.test("Loop returns deltaTime", function(assert){
	var done = assert.async();
	var counter = 0;
	window.loopy.loop(function(deltaTime, timeElapsed){
		assert.ok(deltaTime);
		counter++;
		if(counter > 5){
			this.cancel();
			done();
		}
	});
});

QUnit.test("Loop returns incrementing timeElapsed", function(assert){
	var done = assert.async();
	var previousTime = 0;
	var counter = 0;
	window.loopy.loop(function(deltaTime, timeElapsed){
		assert.ok(timeElapsed - previousTime > 0);
		previousTime = timeElapsed;
		counter++;
		if(counter > 5){
			this.cancel();
			done();
		}
	});
});

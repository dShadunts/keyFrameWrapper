window.onload = function(){
	//HTML elements to animate
	let box = document.getElementById('boxToAnimate');
	let triangle = document.getElementById('triangleToAnimate');
	let heart = document.getElementById('heartToAnimate');

	box = new AnimatedElement(box, {
		animationProperties: boxAnimationProperties, 
		animationConfig: boxAnimationConfig, 
		animationControlsConfig: {button: '#playPauseBox', range: '#seekBox'}
	});
	triangle = new AnimatedElement(triangle, {
		animationProperties: triangleAnimationProperties,
		animationControlsConfig: {button: '#playPauseTriangle', range: '#seekTriangle'}
	});
	heart = new AnimatedElement(heart, {
		animationProperties: heartAnimationProperties, 
		animationConfig: heartAnimationConfig
	});

	/* add properties and configs dynamically */
	triangle.setAnimationConfigRule(triangleAnimationConfig);
	triangle.setAnimationPropertyRule({'border-radius': '50px'}, '100%'); //existing state
	triangle.setAnimationPropertyRule({'border-left': '100px solid blue'}, '50%'); //new state
	box.setAnimationConfigRule({'animation-timing-function': 'linear'});
}
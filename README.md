# keyFrameWrapper

Task: Write a JS wrapper for CSS3 keyframe animations for supporting play/pause and seek functionality. Use only JS without Libraries or NPM packages.

  AnimatedElement is a JavaScript wrapper for CSS3 keyframe animations. Objects created with that class support play/pause and seek functionality. Playing and Pausing is done by manipulating webkitAnimationPlayState property of HTML element's style. Seek functionality is supported by keeping track of the time when animation starts to run and animation delay.  
  
  # Usage
  
  Download animated-element.js and helper-functions.js and import them in your html file. After that you can animate HTML elements of your web page by creating AnimatedElement object.
  
  ```sh
let divElement = document.getElementById('divElementToAnimate');

const animationProperties = [
	{
		state: 'from',
		transform: 'scale(1)'
	},
	{
		state: 'to',
		transform: 'scale(2)'
	}
];

const animationConfig = {
	'animation-duration': '2s',
	'animation-direction': 'alternate',
	'animation-timing-function': 'ease-in-out',
	'animation-iteration-count': 'infinite'
};

const animationControlsConfig = {button: '#playPauseButton', range: '#seekRange'}

let animatedDiv = new AnimatedElement(divElement, {animationProperties, animationConfig, animationControlsConfig})
```

You can find examples of animationProperties, animationConfig, animationControlsConfig in animation-properties-elements.js file. Examples of using the class are in animation-setup.js file.
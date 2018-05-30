/* 
* Wrapper class to animate elements
*/
class AnimatedElement {

	/*
	* Sets the properties and animates the element.
	* element: HTML Element to be animated
	* animationProperties: the array of objects which have state and css rules associated with that state.
	* animationConfig: Optional parameter containing rules for configuring animation like Direction, Duration etc.
	* animationControlsConfig: Optional parameter containing ids of button and range elements
	*/
	constructor(element, {
		animationProperties = HelperFunctions.requiredParameter`animationProperties`,
		animationConfig = {},
		animationControlsConfig
	}){
		this.element = element;
		this.animationProperties = animationProperties;
		this.animationConfig = animationConfig;
		this.animationName = `animatedElement-${HelperFunctions.randomString(4)}`;

		const buttonId = HelperFunctions.get(animationControlsConfig, 'button');
		const rangeId = HelperFunctions.get(animationControlsConfig, 'range');
		this.playPauseButton = document.querySelector(buttonId);
		this.seekRange = document.querySelector(rangeId);
		//booleans to set the event listener only once, used for reAnimating
		this.isPlayPauseEventAttached = false;
		this.isSeekEventAttached = false;
		//the time in milliseconds when animation runs
		this.startTime = 0;
		//the time in milliseconds that was already played
		this.delay = 0;
		this.keyFrameAnimate();
	}

	/*
	* Generates the style element for keyFrame animation and appends it to head
	* Binds animationConfigs to the element using css class
	* Sets the event listeners for button and range
	* Accessability: private
	*/
	keyFrameAnimate(){
		let animationRules = '';
		this.keyFrameStyle = document.createElement('style');
		this.keyFrameStyle.type = 'text/css';

		//create proper keyframe string for style element
		this.animationProperties
			.map(obj => this.keyFrameStateFrom(obj))
			.map(styleObj => this.stringify(styleObj))
			.forEach(stringified => animationRules += stringified);

		this.keyFrameStyle.innerHTML = `@keyframes ${this.animationName} {${animationRules}}`;
		document.getElementsByTagName('head')[0].appendChild(this.keyFrameStyle);

		//cache the time when animation starts
		this.element.addEventListener("animationstart", () => this.startTime = (new Date()).getTime());

		//set styles of animation configs
		Object.assign(this.animationConfig, {'animation-name': this.animationName});
		this.appendCssClass(`${this.animationName}_class`, this.animationConfig);

		//If button and range were provided set event handlers(range is pointless without animation-duration)
		if(this.playPauseButton !== null && !this.isPlayPauseEventAttached){
			this.isPlayPauseEventAttached = true;
			this.playPauseButton.addEventListener('click', this.switchRunningState.bind(this));
		}
		if(!this.isSeekEventAttached && this.seekRange !== null && this.animationConfig.hasOwnProperty('animation-duration')){
			this.isSeekEventAttached = true;
			const duration = +this.animationConfig['animation-duration'].split('s')[0];
			this.seekRange.setAttribute('min', 0);
			this.seekRange.setAttribute('max', 100);
			this.seekRange.addEventListener('mousedown', this.pause.bind(this));
			this.seekRange.addEventListener('input', this.seek(duration*1000).bind(this));
			this.seekRange.addEventListener('mouseup', this.run.bind(this));
		}
	}

	/*
	* Generates a single keyframe state row from object
	* which has a state and css properties associated with that state.
	* Accessability: private
	*/
	 keyFrameStateFrom(obj) {
		const {state, ...styleProperties} = obj;
		return {
			[state]: styleProperties
		};
	}

	/*
	* Generates a string of a single keyframe row object
	* which should be in the final @keyFrame block
	* Accessability: private
	*/
	stringify(obj) {
		const state = Object.keys(obj)[0];
		let styleBlock = '';
		[...Object.keys(obj[state])].forEach(key => styleBlock += `${key}: ${obj[state][key]};`);
		return `${state} { ${styleBlock} }`;
	}

	/*
	* Creates a css class with given name and rules and adds it to the element classList
	* Accessability: public
	*/
	appendCssClass(className, classRules) {
		const style = document.createElement('style');
		let classRulesString = '';
		for(let key in classRules){
			classRulesString += `${key}: ${classRules[key]}; `;
		}
		style.type = 'text/css';
		style.innerHTML = `.${className} { ${classRulesString} }`;
		document.getElementsByTagName('head')[0].appendChild(style);
		this.element.classList.add(className);
	}

	/*
	* Switch animation running state form running to pause and vice versa
	* Accessability: public
	*/
	switchRunningState() {
		const isAnimationPaused = this.element.style.webkitAnimationPlayState === 'paused';
		isAnimationPaused ? this.run() : this.pause();
	}

    /*
    * Determines the current point of animation depending on startTime and delay
    * Computes the percentage coming from event of animation-duration
    * Sets the negative delay
    * Accessability: public
    */
    seek(durationInMilliSeconds) {
    	return function(event){
    		const isAnimationPaused = this.element.style.webkitAnimationPlayState === 'paused';
    		const selectedPercent = event.target.value;
    		const maxPercent = event.target.max;
   	 		const currentPoint = isAnimationPaused ? this.delay : this.delay + ((new Date()).getTime() - this.startTime);
   	 		const negativeDelay = currentPoint - selectedPercent/maxPercent * durationInMilliSeconds;
			this.element.style.animationDelay = `${negativeDelay}ms`;
		}
	}

	/*
	* Pause the running animation and update delay
	* Accessability: public
	*/
	pause() {
		if(this.element.style.webkitAnimationPlayState !== 'paused'){
			this.element.style.webkitAnimationPlayState = 'paused';
			this.delay += ((new Date()).getTime() - this.startTime);
		}
	}

	/*
	* Run the paused animation and update startTime
	* Accessability: public
	*/
	run() {
		if(this.element.style.webkitAnimationPlayState !== 'running'){
			this.element.style.webkitAnimationPlayState = 'running';
			this.startTime = (new Date()).getTime();
		}
	}

	/*
	* Add or update animation property rule for specific state
	* Accessability: public
	*/
	setAnimationPropertyRule(rule, state = HelperFunctions.requiredParameter`state`){
		const index = this.animationProperties.findIndex(prop => prop.state === state);
		if(index !== -1){
			Object.assign(this.animationProperties[index], rule);
		}
		else {
			this.animationProperties.push(Object.assign(rule, {state}));
		}
		this.reAnimate();
	}

	/*
	* Add or update animation config rule
	* Accessability: public
	*/
	setAnimationConfigRule(rule = HelperFunctions.requiredParameter`rule`){
		Object.assign(this.animationConfig, rule);
		this.reAnimate();
	}

	/*
	* Restart the animation with updating keyFrameStyle
	* Accessability: public
	*/
	reAnimate(){
		this.keyFrameStyle.parentNode.removeChild(this.keyFrameStyle);
		this.keyFrameStyle = null;
		this.keyFrameAnimate();
	}
}

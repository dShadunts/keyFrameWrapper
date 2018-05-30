const boxAnimationProperties = [
	{
		state: '0%',
		transform: 'rotate(0deg)',
		left: '0px',
		top: '0px',
		background: 'red',
		height: '180px',
		width: '200px'
	},
	{
		state: '50%',
		transform: 'rotate(45deg)',
		left: '200px',
		top: '200px',
		background: 'green',
		height: '100px',
		width: '200px'
	},
	{
		state: '100%',
		transform: 'rotate(110deg)',
		left: '200px',
		top: '100px',
		background: 'blue',
		height: '50px',
		width: '100px'
	},
];

const boxAnimationConfig = {
	'animation-duration': '4s',
	'animation-direction': 'forwards',
	'animation-iteration-count': 'infinite'
};

const triangleAnimationProperties = [
	{
		state: '0%',
		transform: 'translateX(0px)',
		'border-left': '100px solid red'
	},
	{
		state: '100%',
		transform: 'translateX(500px) rotate(180deg)',
		'border-left': '100px solid orange'
	}
];

const triangleAnimationConfig = {
	'animation-duration': '2s',
	'animation-direction': 'alternate',
	'animation-timing-function': 'ease-in-out',
	'animation-iteration-count': 'infinite'
};

const heartAnimationProperties = [
	{
		state: 'from',
		transform: 'scale(1)'
	},
	{
		state: 'to',
		transform: 'scale(1.2)'
	}
];

const heartAnimationConfig = {
	'animation-duration': '1s',
	'animation-direction': 'alternate',
	'animation-iteration-count': 'infinite'
};
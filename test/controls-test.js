
var GameStream = require('../');
var now = require('../now');

var PUSH_INTERVAL_MS = 0;
var LAG_MS = 10;
var UPDATE_INTERVAL_MS = 500;
var CONTROLS_SWITCH_INTERVAL_MS = 3000;



var timeLogs = [];

var state = {
	count: 0
};

function updateState() {
	state.count++;
	timeLogs[state.count] = now();
	stream1.updateNow({count: state.count});
	//console.info('time is now',stream1.time);
}

function outputState(update) {
	//return;
	var delay = now() - timeLogs[update.count];
	console.info(
		now() + ':',
		'received update with a delay of ' + delay + ' ms:',
		JSON.stringify(update)
	);
}

var stream1 = new GameStream({
	pushInterval: PUSH_INTERVAL_MS,
	lag: LAG_MS
});

var stream2 = new GameStream();
stream2.on('update', outputState);
stream1.pipe(stream2);

setInterval(updateState, UPDATE_INTERVAL_MS);



function play() {
	console.info('-- playing normal speed');
	stream1.play();
	setTimeout(pause, CONTROLS_SWITCH_INTERVAL_MS);
}

function pause() {
	console.info('-- pausing');
	stream1.pause();
	setTimeout(rewind, CONTROLS_SWITCH_INTERVAL_MS);
}

function rewind() {
	console.info('-- rewinding');
	stream1.rewind(1);
	setTimeout(fastForward, CONTROLS_SWITCH_INTERVAL_MS);
}

function fastForward() {
	console.info('-- fast forwarding');
	stream1.fastForward(1.5);
	setTimeout(play, CONTROLS_SWITCH_INTERVAL_MS);
}

play();

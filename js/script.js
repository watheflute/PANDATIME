var audioContext;
var soundboard = $("#soundboard");
var sounds = {"aboutYouNow": {"filename": "sound1.mp3", "title": "About You Now"},
              "rimshot": {"filename": "rimshot.mp3", "title": "Rimshot"},
              "coq": {"filename": "coq.mp3", "title": "Coq"},
              "panda": {"filename": "panda.mp3", "title": "Panda"}};

main();

function main() {
	try {
		window.AudioContext =  window.AudioContext || window.webkitAudioContext;
		audioContext = new AudioContext();
	}
	catch (e) {
		return;
	}
	
	$("#soundboard").css("display", "block");
	$("#error").css("display", "none");
	
	for (var key in sounds) {
		var request = new XMLHttpRequest();
		request.open("GET", "sound/" + sounds[key].filename, true);
		request.responseType = "arraybuffer";
		request.key = key;
		request.onload = onSoundLoad;
		request.send();
	}
}

function onSoundLoad(xhr) {
	var key = xhr.target.key;
	
	audioContext.decodeAudioData(xhr.target.response, function(buffer) {
		sounds[key].buffer = buffer;
		soundboard.append('<button id="' + key + '" onclick="play(\'' + key + '\');">' + sounds[key].title + '</button>');
	}, function() {});
}

function play(key) {
	if (sounds[key].source) {
		sounds[key].source.stop(0);
		sounds[key].source = null;
	}
	
	if (!sounds[key].source) {
		sounds[key].source = audioContext.createBufferSource();
		sounds[key].source.buffer = sounds[key].buffer;
		sounds[key].source.connect(audioContext.destination);
		sounds[key].source.start(0);
		sounds[key].source.onended = function() {};
	}
}

$(document).keypress(function() {
	
});

function stopAllSounds() {
	for (var key in sounds) {
		if (sounds[key].source) {
			sounds[key].source.stop(0);
		}
	}
}

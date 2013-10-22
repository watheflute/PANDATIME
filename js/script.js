var audioContext;
var soundboard = $("#soundboard");
var sounds = {"aboutYouNow": {"filename": "sound1.mp3", "title": "About You Now"},
              "rimshot": {"filename": "rimshot.mp3", "title": "Rimshot"}};

try {
	window.AudioContext =  window.AudioContext || window.webkitAudioContext;
	audioContext = new AudioContext();
}
catch (e) {
	$("#error").css("display", "block");
}

for (var key in sounds) {
	var request = new XMLHttpRequest();
	request.open("GET", "sound/" + sounds[key].filename, true);
	request.responseType = "arraybuffer";
	request.key = key;
	request.onload = onSoundLoad;
	request.send();
}

function onSoundLoad(xhr) {
	var key = xhr.target.key;
	
	audioContext.decodeAudioData(xhr.target.response, function(buffer) {
		sounds[key].buffer = buffer;
		soundboard.append('<button id="' + key + '" onclick="play(\'' + key + '\');">' + sounds[key].title + '</button>');
	}, function() {});
}

function play(key) {
	if (!sounds[key].source) {
		sounds[key].source = audioContext.createBufferSource();
		sounds[key].source.buffer = sounds[key].buffer;
		sounds[key].source.connect(audioContext.destination);
		sounds[key].source.start(0);
		$("#" + key).attr("disabled", "disabled");
		
		sounds[key].source.onended = function() {
			sounds[key].source = null;
			$("#" + key).removeAttr("disabled");
		};
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

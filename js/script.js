var audioContext;
var soundboard = $("#soundboard");
var soundDiv = $("#soundDiv");
var loopDiv = $("#loopDiv");

var sounds = {"panda": {"filename": "panda.mp3", "title": "Panda", "type": "sound"},
              "aaahhh": {"filename": "aaahhh.mp3", "title": "AAAAH", "type": "sound"},
              "hmm": {"filename": "hmm.mp3", "title": "HMMMM", "type": "sound"},
              "i_show_you_my_manliness": {"filename": "i_show_you_my_manliness.mp3", "title": "I show you my manliness!", "type": "sound"},
              "ooh_yeah": {"filename": "ooh_yeah.mp3", "title": "OOOH Yeah", "type": "sound"},
              "ooooh_yes": {"filename": "ooooh_yes.mp3", "title": "OOOOH YES", "type": "sound"},
              "they_want_us": {"filename": "they_want_us.mp3", "title": "They want us", "type": "loop"},
              "xeph_waaaa": {"filename": "xeph_waaaa.mp3", "title": "Xeph waaaa", "type": "sound"}};

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
		
		if (sounds[key].type == "sound") {
			soundDiv.append('<button id="' + key + '" onclick="playSound(\'' + key + '\');">' + sounds[key].title + '</button>');
		}
		else if (sounds[key].type == "loop") {
			loopDiv.append('<button id="' + key + '" onclick="playLoop(\'' + key + '\');">' + sounds[key].title + '</button>');
		}
	}, function() {});
}

function playSound(key) {
	if (sounds[key].source) {
		sounds[key].source.stop(0);
		sounds[key].source.onended = null;
		sounds[key].source = null;
		$("#" + key).css("background-color", "rgba(0, 0, 0, 0)");
	}
	
	if (!sounds[key].source) {
		sounds[key].source = audioContext.createBufferSource();
		sounds[key].source.buffer = sounds[key].buffer;
		sounds[key].source.connect(audioContext.destination);
		$("#" + key).css("background-color", "lime");
		sounds[key].source.start(0);
		
		sounds[key].source.onended = function() {
			$("#" + key).css("background-color", "rgba(0, 0, 0, 0)");
		};
	}
}

function playLoop(key) {
	if (sounds[key].source) {
		sounds[key].source.stop(0);
		sounds[key].source.onended = null;
		sounds[key].source = null;
		$("#" + key).css("background-color", "rgba(0, 0, 0, 0)");
	}
	else {
		sounds[key].source = audioContext.createBufferSource();
		sounds[key].source.buffer = sounds[key].buffer;
		sounds[key].source.connect(audioContext.destination);
		sounds[key].source.loop = true;
		$("#" + key).css("background-color", "orange");
		sounds[key].source.start(0);
		
		sounds[key].source.onended = function() {
			$("#" + key).css("background-color", "rgba(0, 0, 0, 0)");
		};
	}
}

$(document).keypress(function() {
	
});

function stopAllSounds() {
	for (var key in sounds) {
		if (sounds[key].source) {
			sounds[key].source.stop(0);
			$("#" + key).css("background-color", "rgba(0, 0, 0, 0)");
		}
	}
}

function ultraPandatime() {
	
}



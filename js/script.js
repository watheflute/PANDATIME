var audioContext;
var soundboard = $("#soundboard");

var sounds = {
		"panda": {
			"filename": "panda.mp3", 
			"title": "Panda", 
			"type": "sound", 
			"key": "p"},
		"aaahhh": {
			"filename": "aaahhh.mp3", 
			"title": "AAAAH", 
			"type": "sound", 
			"key": "a"},
		"hmm": {
			"filename": "hmm.mp3", 
			"title": "HMMMM", 
			"type": "sound",
			"key": "h"},
		"i_show_you_my_manliness": {
			"filename": "i_show_you_my_manliness.mp3", 
			"title": "I show you my manliness!", 
			"type": "sound",
			"key": "i"},
		"ooh_yeah": {
			"filename": "ooh_yeah.mp3", 
			"title": "OOOH Yeah", 
			"type": "sound",
			"key": "o"},
		"ooooh_yes": {
			"filename": "ooooh_yes.mp3", 
			"title": "OOOOH YES", 
			"type": "sound"},
		"they_want_us": {
			"filename": "they_want_us.mp3", 
			"title": "They want us", 
			"type": "loop",
			"key": "t"},
		"xeph_waaaa": {
			"filename": "xeph_waaaa.mp3", 
			"title": "Xeph waaaa", 
			"type": "sound",
			"key": "x"}};

var soundKeys = Object.keys(sounds);
var currentSoundLoading = 0;
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
	
	loadSound();
}

function loadSound() {
	var request = new XMLHttpRequest();
	request.open("GET", "sound/" + sounds[soundKeys[currentSoundLoading]].filename, true);
	request.responseType = "arraybuffer";
	request.key = soundKeys[currentSoundLoading];
	request.onload = onSoundLoad;
	request.send();
}

function onSoundLoad(xhr) {
	var key = xhr.target.key;
	
	audioContext.decodeAudioData(xhr.target.response, function(buffer) {
		sounds[key].buffer = buffer;
		var button = '<button id="' + key + '" ';
		
		if (sounds[key].type == "sound") {
			button += 'onclick="playSound(\'' + key + '\');" ';
		}
		else if (sounds[key].type == "loop") {
			button += 'onclick="playLoop(\'' + key + '\');" ';
		}
		
		if (sounds[key].key) {
			button += 'class="key" ';
		}
		
		button += '>' + sounds[key].title + '</button>';
		$("#" + sounds[key].type + "Div").append(button);
		
		if (++currentSoundLoading < soundKeys.length) {
			loadSound();
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
			//$("#" + key).css("background-color", "rgba(0, 0, 0, 0)");
		};
	}
}

$(document).keypress(function(k) {
	var charCode = String.fromCharCode(k.which);
	
	if (charCode == "s") {
		stopAllSounds();
	}
	else if (charCode == "u") {
		ultraPandatime();
	}
	else {
		for (var key in sounds) {
			if (sounds[key].key == charCode) {
				if (sounds[key].type == "sound") {
					playSound(key);
				}
				else if (sounds[key].type == "loop") {
					playLoop(key);
				}
			}
		}
	}
});

function stopAllSounds() {
	for (var key in sounds) {
		if (sounds[key].source) {
			sounds[key].source.stop(0);
			sounds[key].source.onended = null;
			sounds[key].source = null;			
			$("#" + key).css("background-color", "rgba(0, 0, 0, 0)");
		}
	}
}

function ultraPandatime() {
	alert("ULTRA PANDA TIME");
}



var audioContext;
var soundboard = $("#soundboard");
var buttonBackgroundColor = "rgba(0, 0, 0, 0.2)";
var isUltraPandaTime = false;

var sounds = {
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
		"ooooh_yes": {
			"filename": "ooooh_yes.mp3", 
			"title": "OuuH YES", 
			"type": "sound",
			"key": "o"},
		"xeph_aaahaha": {
			"filename": "xeph_aaahaha.mp3", 
			"title": "Xeph AaaaAhAH", 
			"type": "sound",
			"key": "x"},
		"xeph_schmetterling": {
			"filename": "xeph_schmetterling.mp3",
			"title": "SCHMETTERLING!",
			"type": "sound"},
		"gg": {
			"filename": "gg.mp3",
			"title": "GG Button",
			"type": "sound",
			"key": "g"},
		"they_want_us": {
			"filename": "they_want_us.mp3", 
			"title": "They want us", 
			"type": "loop",
			"key": "t"},
		"panda_time": {
			"filename": "panda_time.mp3",
			"title": "Panda Time",
			"type": "loop",
			"key": "p"},
		"sexy_music": {
			"filename": "sexy_music.mp3",
			"title": "Sexy Music",
			"type": "loop"},
		"just_you_know_why": {
			"filename": "just_you_know_why.mp3",
			"title": "Just you know why",
			"type": "loop",
			"key": "j"}
		};

var soundKeys = Object.keys(sounds);
var currentSoundLoading = 0;

$(document).ready(main);

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
		$("#" + key).css("background-color", buttonBackgroundColor);
	}
	
	if (!sounds[key].source) {
		sounds[key].source = audioContext.createBufferSource();
		sounds[key].source.buffer = sounds[key].buffer;
		sounds[key].source.connect(audioContext.destination);
		$("#" + key).css("background-color", "lime");
		sounds[key].source.start(0);
		
		sounds[key].source.onended = function() {
			$("#" + key).css("background-color", buttonBackgroundColor);
		};
	}
}

function playLoop(key) {
	if (sounds[key].source) {
		sounds[key].source.stop(0);
		sounds[key].source.onended = null;
		sounds[key].source = null;
		$("#" + key).css("background-color", buttonBackgroundColor);
	}
	else {
		sounds[key].source = audioContext.createBufferSource();
		sounds[key].source.buffer = sounds[key].buffer;
		sounds[key].source.connect(audioContext.destination);
		sounds[key].source.loop = true;
		$("#" + key).css("background-color", "orange");
		sounds[key].source.start(0);
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
			$("#" + key).css("background-color", buttonBackgroundColor);
		}
	}
}

function ultraPandatime() {
	if (!isUltraPandaTime) {
		isUltraPandaTime = true;
		$("#ultraPandatime").html("GTFO!!!");
		$("body").css("background", 'url("img/stars.gif") repeat center center fixed');
		$("body").css("-webkit-background-size", "auto");
		$("body").css("-moz-background-size", "auto");
		$("body").css("-o-background-size", "auto");
		$("body").css("background-size", "auto");
		$("#dancingPanda").css("display", "inline");
		$("#dancingPandaSmall").css("display", "inline");
		$("#pandaKiss").css("display", "inline");
		$("#giphy").css("display", "inline");
		$("#pandaRoll").css("display", "inline");
		
		if (sounds["panda_time"].source) {
			sounds["panda_time"].source.stop(0);
			sounds["panda_time"].source.onended = null;
			sounds["panda_time"].source = null;
			$("#" + "panda_time").css("background-color", buttonBackgroundColor);
		}
		
		sounds["panda_time"].source = audioContext.createBufferSource();
		sounds["panda_time"].source.buffer = sounds["panda_time"].buffer;
		sounds["panda_time"].source.connect(audioContext.destination);
		sounds["panda_time"].source.loop = true;
		$("#" + "panda_time").css("background-color", "orange");
		sounds["panda_time"].source.start(0);
		
	}
	else {
		isUltraPandaTime = false;
		$("#ultraPandatime").html("ULTRA PANDA TIME!!!");
		$("body").css("background", 'url("img/panda.jpg") no-repeat center center fixed');
		$("body").css("-webkit-background-size", "cover");
		$("body").css("-moz-background-size", "cover");
		$("body").css("-o-background-size", "cover");
		$("body").css("background-size", "cover");
		$("#dancingPanda").css("display", "none");
		$("#dancingPandaSmall").css("display", "none");
		$("#pandaKiss").css("display", "none");
		$("#giphy").css("display", "none");
		$("#pandaRoll").css("display", "none");
		
		if (sounds["panda_time"].source) {
			sounds["panda_time"].source.stop(0);
			sounds["panda_time"].source.onended = null;
			sounds["panda_time"].source = null;
			$("#" + "panda_time").css("background-color", buttonBackgroundColor);
		}
	}
}



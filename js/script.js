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
		"teldo_panda_time": {
			"filename": "teldo_panda_time.mp3",
			"title": "Pandatime!",
			"type": "sound"},
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
			"title": '<img src="img/gg.png" alt="" /> Button',
			"type": "sound",
			"key": "g"},
		"panda_time": {
			"filename": "panda_time.mp3",
			"title": "Panda Time",
			"type": "loop",
			"key": "p"},
		"damn": {
			"filename": "damn.mp3",
			"title": "Damn!",
			"type": "sound",
			"key": "d"},
		"aww_yeah": {
			"filename": "aww_yeah.mp3",
			"title": "Aww Yeah",
			"type": "sound"},
		"bloo_bloop": {
			"filename": "bloo_bloop.mp3",
			"title": "Bloo Bloop",
			"type": "sound"},
		"he_could_kill_me": {
			"filename": "he_could_kill_me.mp3",
			"title": "He could kill me!",
			"type": "sound"},
		"oh_my_got": {
			"filename": "oh_my_got.mp3",
			"title": "oh my got",
			"type": "sound"},
		"wow": {
			"filename": "wow.mp3",
			"title": "Wow",
			"type": "sound",
			"key": "w"},
		"okaaay": {
			"filename": "okaaay.mp3",
			"title": "Okaaay",
			"type": "sound"},
		"hihihihi": {
			"filename": "hihihihi.mp3",
			"title": "HiHiHiHi",
			"type": "sound"},
		"bloolooloop": {
			"filename": "bloolooloop.mp3",
			"title": "BlooLooLoop!",
			"type": "sound",
			"key": "b"},
		"aaaAAAH": {
			"filename": "aaaAAAH.mp3",
			"title": "aaaAAAH!",
			"type": "sound"},
		"huoaww": {
			"filename": "huoaww.mp3",
			"title": "HUOAWWW!!!",
			"type": "sound"},
		"the_dream_guys": {
			"filename": "the_dream_guys.mp3",
			"title": "The DREAM Guys!",
			"type": "sound"},
		"nooo": {
			"filename": "nooo.mp3",
			"title": "NOOOOO! NNOOOOOAAAAHaaha!",
			"type": "sound"},
		"bam": {
			"filename": "bam.mp3",
			"title": "BAM!",
			"type": "sound"},
		"doomhammer_ooh": {
			"filename": "doomhammer_ooh.mp3",
			"title": '<img src="img/doomhammer_ooh.png" alt="" /> ooh!',
			"type": "sound"},
		"i_will_be_streaming_for_the_rest_of_my_life": {
			"filename": "i_will_be_streaming_for_the_rest_of_my_life.mp3",
			"title": "I will be streaming...",
			"type": "sound"},
		"niah": {
			"filename": "niah.mp3",
			"title": 'Special button for Zeparrot <img src="img/zeparrot.png" alt="" />',
			"type": "sound"},
		"that_ooze_is_going_to_like_that": {
			"filename": "that_ooze_is_going_to_like_that.mp3",
			"title": "That Ooze is going to like that",
			"type": "sound"},
		"mouth_fart": {
			"filename": "mouth_fart.mp3",
			"title": '<img src="img/mouth_fart.png" alt="" /> Mouth fart',
			"type": "sound",
			"key": "m"},
		"om_nom_nom_nom": {
			"filename": "om_nom_nom_nom.mp3",
			"title": '<img src="img/chogath.png" alt="" /> Om Nom Nom Nom Nom',
			"type": "sound"},
		"give_up": {
			"filename": "give_up.mp3",
			"title": "Give up!!",
			"type": "sound"},
		"im_stronger_than_you": {
			"filename": "im_stronger_than_you.mp3",
			"title": "I'm stronger than you!",
			"type": "sound"},
		"woops": {
			"filename": "woops.mp3",
			"title": "Woops!",
			"type": "sound"},
		"sticky_pup": {
			"filename": "sticky_pup.mp3",
			"title": "Sticky pup",
			"type": "sound"},
		"eeeeh_ne_neeh_ne_neh": {
			"filename": "eeeeh_ne_neeh_ne_neh.mp3",
			"title": "Eeeh ne neeeh ne ne",
			"type": "sound"},
		"tuturu": {
			"filename": "tuturu.mp3",
			"title": '<img src="img/tuturuu.png" alt="" /> Tuturuuu!',
			"type": "sound"},
		"more_evidence": {
			"filename": "more_evidence.mp3",
			"title": "More fart evidence",
			"type": "sound"},
		"evil_laugh": {
			"filename": "evil_laugh.mp3",
			"title": "Evil laugh",
			"type": "sound",
			"key": "e"},
		"makes_me_happy": {
			"filename": "makes_me_happy.mp3",
			"title": "Makes me HAPPY!",
			"type": "sound"},
		"what_time_is_it": {
			"filename": "what_time_is_it.mp3",
			"title": "What time is it?",
			"type": "sound"},
		"teldo_singing_pandatime": {
			"filename": "teldo_singing_pandatime.mp3",
			"title": "Teldo singing Pandatime",
			"type": "loop"},
		"pizza_pizza": {
			"filename": "pizza_pizza.mp3",
			"title": "Pizza Pizza",
			"type": "loop"},
		"they_want_us": {
			"filename": "they_want_us.mp3", 
			"title": "They want us", 
			"type": "loop",
			"key": "t"},
		"sexy_music": {
			"filename": "sexy_music.mp3",
			"title": "Sexy Music",
			"type": "loop"},
		"more_sexy_music": {
			"filename": "more_sexy_music.mp3",
			"title": "More sexy music",
			"type": "loop"},
		"digimon": {
			"filename": "digimon.mp3",
			"title": 'Pokemon music <img src="img/kappa.png" alt="" />',
			"type": "loop"}
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



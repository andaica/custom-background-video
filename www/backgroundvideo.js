var cordova = require('cordova');

var backgroundvideo = {
    start : function(filename, camera, successFunction, errorFunction) {
        camera = camera || 'back';
        cordova.exec(successFunction, errorFunction, "backgroundvideo","start", [filename, camera]);
    },
    stop : function(successFunction, errorFunction) {
        cordova.exec(successFunction, errorFunction, "backgroundvideo","stop", []);
    }
};

module.exports = backgroundvideo;

(function () {
	var template = `
	<style type="text/css">
		#background-record {
			position: absolute;
			width: 100%;
		    height: 100%;
		    z-index: 9999;
		    background: white;
		}
		#background-record .control-bar {
			position: absolute;
			bottom: 0px;
			width: 100%;
			padding-bottom: 10px;
			text-align: center;
		}
		#background-record .control-bar button#recordButton {
		    width: 50px;
		    height: 50px;
		    border-radius: 50%;
		    padding: 0;
		}
	</style>
	<div class="control-bar">
		<button id="recordButton" class="btnWhite" onClick="owsVideoRecorder.stop()">Record</button>
	</div>`;

	var recorder = {};
	var recordTemplate;
	var onRecordSuccess;
	var onRecordError;
	var isRecording = false;

	recorder.open = function(filename, camera, successFunction, errorFunction) {
	    init(successFunction, errorFunction);
	    
	    setTimeout(function() {
	    	changeStateRecording();
	    	backgroundvideo.start(filename, camera, null, null);
	    }, 1000);
	}

	function init(successFunction, errorFunction) {
		onRecordSuccess = successFunction;
		onRecordError = errorFunction;

		recordTemplate = document.createElement('div');
		recordTemplate.id = "background-record";
	    recordTemplate.innerHTML = template;
	    document.body.appendChild(recordTemplate);
	}

	function changeStateRecording() {
		isRecording = true;
		var recordBtn = document.getElementById("recordButton");
		recordBtn.classList.remove("btnWhite");
		recordBtn.classList.add("btnRed");
	}

	recorder.stop = function() {
		if(isRecording) {
			backgroundvideo.stop(onRecordSuccess, onRecordError);
			document.body.removeChild(recordTemplate);
		}
	}

	window.owsVideoRecorder = recorder;

}());

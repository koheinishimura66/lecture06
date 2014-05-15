var INTERVAL = 1000;//INTERVALは１０００という数字です
var DEFAULT_MESSAGE = "終了";//DEFAULT＿MESSAGEは”終了”という文字

var alarm = {
		duration: -1,//
		message: ""
};

var formatCounterAsString = function(){
		return "あと" + alarm.duration + "秒";//「あと　”alam.durationで指定された文字列”　秒」　と表示させる（例：あと５秒）
};

var updateCounter = function(){//formatCounterAsString()という関数の結果をalarm.output.textCountentと名付ける
		alarm.output.textContent = formatCounterAsString();
};

var showAlarmMessage = function(){
		var message = DEFAULT_MESSAGE;
		if(alarm.message.length > 0){
				message = alarm.message;
		}
		if(Notification.permission == "granted"){
				var notification = new Notification(message);
		}
		alarm.output.textContent = message;
};

var update = function(){//alarm.durationを‐１する
		alarm.duration = alarm.duration - 1;
		if(isReadyToCountdown()){//isReadyToCountdownがtrueのとき以下の二つの動作を行う、updateCounter（）という関数を走らせる　２、１０００ミリ秒後（つまり１秒後）にupdateをもう一度実行する
				updateCounter();//→つまりこの行はカウントダウンを行うプログラムである
				window.setTimeout(update, INTERVAL);
		}else{
				showAlarmMessage();//isReadyToCountdownがforseの時ShowAlarmMessage
		}
};

var isReadyToCountdown = function(){
		return Number.isInteger(alarm.duration) && alarm.duration > 0;
};

var setupAlarm = function(durationString, message){
		alarm.duration = Number(durationString),
		alarm.message = message;
};

var startAlarm = function(){
		setupAlarm(alarm.durationSelect.value, alarm.messageInput.value);//alarm.durationSelect.valueがtrueのときsetupAlarmのclassをalarm.messageInput.valueにする
		if(isReadyToCountdown()){//isReadyToCountdownがtrueのときに以下の二つの動作をする　１．pdateCounter()という関数を走らせる　２．INTERVAL（つまり１０００）ミリ秒後要するに１秒後にupdateという関数を走らせる
				updateCounter();
				window.setTimeout(update, INTERVAL);
		}
};

var initApp = function(){
		alarm.durationSelect = document.querySelector("#duration");//htmlの＃durationというidの文字をalarm.durationSelectと名付ける
		alarm.messageInput = document.querySelector("#message");//htmlの＃messateというidの文字をalarm.messageInputと名付ける
		alarm.output = document.querySelector("#countdown");//htmlの＃countdownというidの文字をalarm.outputと名付ける

		Notification.requestPermission(function(status){//はじめてこのページを開いたときに　許可する・ブロックする・今回は無視する　というポップアップが自動で表示されるが、ユーザーがこの内容をのちに手動で変更したときに、その変更を適用する
				if(Notification.permission != status){
						Notification.permission = status;
				}
		});

		var startButton = document.querySelector("#start");//#startというidのボタンをクリックしたときにstartAlarmという関数を走らせる
		startButton.addEventListener("click", startAlarm);
};

initApp();

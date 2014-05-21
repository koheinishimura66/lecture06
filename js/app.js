var INTERVAL = 1000;//INTERVALはのちの行でカウントダウンのスピードの指定に使われている数値です。今は１０００ミリ秒＝１秒にセットされています。
var DEFAULT_MESSAGE = "終了";//DEFAULT＿MESSAGEは入力が何もないときに表示する文章を表しています。今は”終了”とセットされています

var alarm = {//何も入力されていないとき、alarm.durationは-1 alarm.messageは””（空白）に取り敢えず設定しておくプログラム
		duration: -1,
		message: ""
};

var formatCounterAsString = function(){
		return "あと" + alarm.duration + "秒";//「あと　”alam.durationで指定された数値”　秒」　と表示させる（例：あと５秒）　文字列として定義される
};

var updateCounter = function(){//formatCounterAsString()という関数の結果（あと～秒）をalarm.output.textCountentに代入する
		alarm.output.textContent = formatCounterAsString();
};

var showAlarmMessage = function(){
		var message = DEFAULT_MESSAGE;//messageにDEFALT＿MESSAGEを設定する
		if(alarm.message.length > 0){//もし、alarm.message(メッセージの入力)
				message = alarm.message;
		}
		if(Notification.permission == "granted"){//ポップアップを許可していた時、カウントダウンが終わった後にメッセージを表示させる関数
				var notification = new Notification(message);
		}
		alarm.output.textContent = message;
};

var update = function(){//カウントダウンを行い、カウントダウンが終わったのちにメッセージを表示させる関数
		alarm.duration = alarm.duration - 1;//alarm.durationを‐１する
		if(isReadyToCountdown()){//isReadyToCountdownがtrueのとき（まだカウントダウンが終わっていない時）以下の二つの動作を行う
				updateCounter();//１、updateCounter（）という関数を走らせる
				window.setTimeout(update, INTERVAL);//２、INREVALに設定されている時間（今は１０００ミリ秒になっている）ののちにupdateをもう一度実行する
		}else{
				showAlarmMessage();//isReadyToCountdownがforseの時（カウントダウンが終わった時）ShowAlarmMessageという関数を走らせる
		}
};

var isReadyToCountdown = function(){//４９行目と３０行目のifに関連する関数。カウントダウンが終わったかどうかを調べるプログラム
		return Number.isInteger(alarm.duration) && alarm.duration > 0;//alarm.durationが 0　より大きいときTrue
};

var setupAlarm = function(durationString, message){
		alarm.duration = Number(durationString),//alarm.durationにdurationStringに指定されている数字を設定
		alarm.message = message;//alarm.messageにmessageに指定されている数字を設定
};

var startAlarm = function(){
		setupAlarm(alarm.durationSelect.value, alarm.messageInput.value);//alarm.durationSelect　と　alarm.messageInput　を表示する
		if(isReadyToCountdown()){//isReadyToCountdownがtrueのときに以下の二つの動作をする　　
				updateCounter();//１．pdateCounter()という関数を走らせる
				window.setTimeout(update, INTERVAL);//２．INTERVALに設定されている時間（今は１０００ミリ秒にセットされている）ののちにupdateという関数を走らせる
		}
};

var initApp = function(){
		alarm.durationSelect = document.querySelector("#duration");//htmlの＃durationというidの文字（セットした時間）をalarm.durationSelectに代入する
		alarm.messageInput = document.querySelector("#message");//htmlでmessateというidを持つ文字（入力した文字）をalarm.messageInputに代入する
		alarm.output = document.querySelector("#countdown");//htmlの＃countdownというidの文字（表示される文字）をalarm.outputに代入する

		Notification.requestPermission(function(status){//はじめてこのページを開いたときに　許可する・ブロックする・今回は無視する　というポップアップが自動で表示されるが、ユーザーがこの内容をのちに変更したときに、その変更を適用する
				if(Notification.permission != status){//notificationがstatusでない時status にする
						Notification.permission = status;
				}
		});

		var startButton = document.querySelector("#start");//#startというidのボタンをクリックしたときにstartAlarmという関数を走らせる
		startButton.addEventListener("click", startAlarm);
};

initApp();//initAppを走らせます

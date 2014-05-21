var INTERVAL = 1000;//INTERVALはのちの行でカウントダウンのスピードの指定に使われている数値です。今は１０００ミリ秒＝１秒にセットされています。
var DEFAULT_MESSAGE = "発表終了";//DEFAULT＿MESSAGEは入力が何もないときに表示する文章を表しています。今は”終了”とセットされています
var YOREI_MESSAGE = "予鈴"
var SITUGI_MESSAGE = "質疑応答終了"

var alarm = {//何も入力されていないとき、alarm.durationは-1 alarm.messageは””（空白）に取り敢えず設定しておくプログラム
		duration: -1,
		yorei: -1
		situgi: -1
		message: ""
};

var formatCounterAsString = function(){
		return　"発表時間" + "あと" + alarm.duration + "秒";//発表時間中のメッセージ
};

var Situgi_formatCounterAsString = function(){
		return　"質疑応答" + "あと" + alarm.duration + "秒";//質疑応答中のメッセージ
};

var updateCounter = function(){//formatCounterAsString()という関数の結果（あと～秒）をalarm.output.textCountentに代入する
		alarm.output.textContent = formatCounterAsString();
};

var Situgi_updateCounter = function(){//Situgi_formatCounterAsString()という関数の結果（あと～秒）をalarm.output.Situgi_textCountentに代入する
		alarm.output.Situgi_textContent = Situgi_formatCounterAsString();
};

var showAlarmMessage = function(){
		var message = DEFAULT_MESSAGE;//messageにDEFALT＿MESSAGEを設定する
		if(Notification.permission == "granted"){//ポップアップを許可していた時、カウントダウンが終わった後にメッセージを表示させる関数
				var notification = new Notification(message);
		}
		alarm.output.textContent = message;
		next.setTimeout(situgi_update, 2000) 
};

var show_situgi_AlarmMessage = function(){
		var message = SITUGI_MESSAGE;//messageにDEFALT＿MESSAGEを設定する
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

var situgi_update = function(){//カウントダウンを行い、カウントダウンが終わったのちにメッセージを表示させる関数
		alarm.situgi = alarm.situgi - 1;//alarm.durationを‐１する
		if(is_situgi_ReadyToCountdown()){//isReadyToCountdownがtrueのとき（まだカウントダウンが終わっていない時）以下の二つの動作を行う
				situgi_updateCounter();//１、updateCounter（）という関数を走らせる
				window.setTimeout(situgi_update, INTERVAL);//２、INREVALに設定されている時間（今は１０００ミリ秒になっている）ののちにsitugi_updateをもう一度実行する
		}else{
				show_situgi_AlarmMessage();//isReadyToCountdownがforseの時（カウントダウンが終わった時）ShowAlarmMessageという関数を走らせる
		}
};

var isReadyToCountdown = function(){//発表時間のカウントダウンが終わったかどうかを調べるプログラム
		return Number.isInteger(alarm.duration) && alarm.duration > 0;//alarm.durationが 0　より大きいときTrue
};

var is_situgi_ReadyToCountdown = function(){//質疑応答時間のカウントダウンが終わったかどうかを調べるプログラム
		return Number.isSitugi(alarm.situgi) && alarm.situgi > 0;//is Integer(alarm.Situgi)を表示し、alarm.durationが 0　より大きいときTrue
};


var setupAlarm = function(durationString, message){
		alarm.duration = Number(durationString),//alarm.durationにdurationStringに指定されている数字を設定
		alarm.yorei = Number(yoreiString)
		alarm.situgi= Number(situgiString)
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
		alarm.yoreiSelect = document.querySelector("#yorei")
		alarm.situgiSelect = document.querySelector("#situgi")
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

//１つのイベントに参加者を追加するための処理を書いた場所
app.controller('JoinCtrl', function ($scope) {
    //リレーション新規作成
    relation = new ncmb.Relation();
    //選択されたイベントのIDを取得
    eventID = EditNavigator.getCurrentPage().options.objectId;
});

//参加ボタンが押されたら呼ばれる関数
function Join(){
    if (formCheck() === false) {
      goToJoinform($index);
    }
    Data = ncmb.DataStore("Event");//Eventクラスのfetch準備
    Data.equalTo("objectId",eventID)
    .fetchAll()
    .then(function(results)
    {
        for (var i = 0; i < results.length; i++)
        {
            eventObject = results[i];
        }

//取得したイベントのプロパティとしてある"participants"を呼び出して、そこに新規参加者を詰める方法を取ろうとしたがうまくいかなかった
//どうも、SDKの仕様上でプロパティとして存在するリレーションインスタンスをfetchすることができないみたいです。
//しかし、あるオブジェクトに関連付けられているオブジェクト郡としては取り出せるようです
//なので、新しくリレーションを作成し、もともと関連付けられている参加者を新リレーションに詰めてから、新規の参加者を新リレーションに詰めるという方法をとった
        Participant = ncmb.DataStore("Participants");//Participantsクラスのfetch準備
        Participant.relatedTo(eventObject, "participants")
        .fetchAll()
        .then(function(results){
            for (var i = 0; i < results.length; i++) {
                var object = results[i];//取得した参加者オブジェクトを１つ１つ代入し
                relation.add(object);//配列に詰める
            }
            addingParticipantWithConfirm();//これは新規の参加者をダイアログと共にリレーションに詰める関数
        })
        .catch(function(err){
            console.log(err);
        });
    })
    .catch(function(err)
    {
        console.log(err);
    });
}

//新規参加者の情報をページから取得する関数
function getParticipant_info(){
    name = $("#name").val();

    age = $("#age").val();

    tell = $("#tell").val();

    address = $("#address").val();

    if($("#male").prop("checked")){
        sex="男性";
    }else{
        sex="女性";
    }
}

//これは新規の参加者をダイアログと共にリレーションに詰める関数
function addingParticipantWithConfirm(){
    getParticipant_info();//新規参加者の情報をページから取得する関数
    ons.notification.confirm({
        title: 'この内容でよろしいですか？',
        messageHTML: '氏名 '+name+
        '<br>性別 '+sex+
        '<br>年齢 '+age+
        '<br>電話番号 '+tell+
        '<br>住所 '+address,
        buttonLabels: ['はい','いいえ'],
        primaryButtonIndex: 1,
        cancelable: true,
        callback: function(index){
            switch (index) {
                case 0:
                //コンストラクタを呼び出して、Participantクラスの情報を保持したインスタンスを作成する。
                participant = new Participant({name:name, sex:sex, age:age, tell:tell, address:address, event_name:eventObject.event_name});
                relation.add(participant);//新規参加者をリレーションに詰める
                eventObject.set("participants", relation)//選択されたイベントの"participants"プロパティに新リレーションを詰める
                .update()//更新をかける
                .then(function(object){
                    ons.notification.alert({
                        title: '確認画面',
                        messageHTML: name+'さんの<br>参加を受け付けました。',
                        buttonLabel: 'OK',
                        callback: function(){
                            EditNavigator.popPage();
                        }
                    });
                })
                .catch(function(error)
                {
                    //エラーが発生する時の処理
                    $("#message")
                    .html("error:" + error.message);
                });
                break;
                default:
            }
        }
    });
}
/* * 入力ミスをチェックする関数
*/
function formCheck() {
    // ページから新規参加者情報の取得
    getParticipant_info();
    var formAlert = [];
    var count = 0;

    // 氏名の未入力チェック
    var val_name = name;
    if (jsTrim(val_name).length === 0) {
//alert("氏名の確認");
        formAlert [count] = "氏名を入力してください";
        count++;
      }

      //性別の入力チェック、入力されたことになってる！？
//alert(count);
      var val_sex = sex;
//alert(val_sex);
      if (val_sex.checked){
//alert("性別の確認");
        formAlert[count] = "性別を入力してください";
//alert(formAlert[0]);
        count++;
      }

    // 年齢の未入力チェック
//alert(count);
    var val_age = age;
    if (val_age ===  '') {
//alert("年齢の確認");
        formAlert [count] = "年齢を入力してください";
        count++;
      }

    //電話番号の未入力チェック
    var val_tell = tell;
    if(val_tell.length === 0 ) {
//alert("電話番号の確認");
        formAlert[count] = "電話番号を入力してください";
        count++;
      }

    // 住所の未入力チェック
    var val_address = address;
    if (jsTrim(val_address).length === 0) {
//alert("住所の確認");
        formAlert[count] = "住所を入力してください";
        count++;
      }

    //入力間違いのアラート表示
    /*本当はforで配列の中身を回しながらアラートの文章を表示したかったが
    ex)
    if(formAlert.length !== 0) {
      title:'入力のお願い'
      messageHTML:formAlert[0]+
      for(var i = 1; i < count.length-1; i++) {
      +formAlert[i]+
      }
      messageHTML:formAlert[formAlert.length]
    }
    みたいな感じでonsの中のオプションとしてforが定義されてないみたいで厳しかった。

    //電話番号の入力値
    var val_tell = tell;
    if(val_tell.match(/^0[0-9]{1,2}-[0-9]{4,5}-[0-9]{4}$/)
  ) {
//alert("電話番号の確認");
        formAlert[count] = "電話番号を正しく入力してください";
        count++;
      }

    あとは入力状態を残したまま参加フォームに戻れるようにしたいっす*/
    if(formAlert.length === 0) {
      return true;
    }
    else if(formAlert.length === 1) {
      ons.notification.alert({
        title: '入力のお願い',
        messageHTML:formAlert[0]
      });
      return false;
    }
    else if(formAlert.length === 2) {
      ons.notification.alert({
        title: '入力のお願い',
        messageHTML:
               formAlert[0]+
        '<br>'+formAlert[1]
      });
      return false;
    }
    else if(formAlert.length === 3) {
      ons.notification.alert({
        title: '入力のお願い',
        messageHTML:
               formAlert[0]+
        '<br>'+formAlert[1]+
        '<br>'+formAlert[2],
      });
      return false;
    }
    else if(formAlert.length === 4) {
      ons.notification.alert({
        title: '入力のお願い',
        messageHTML:
               formAlert[0]+
        '<br>'+formAlert[1]+
        '<br>'+formAlert[2]+
        '<br>'+formAlert[3],
      });
      return false;
    }
    if(formAlert.length === 5) {
      ons.notification.alert({
        title: '入力のお願い',
        messageHTML:
               formAlert[0]+
        '<br>'+formAlert[1]+
        '<br>'+formAlert[2]+
        '<br>'+formAlert[3]+
        '<br>'+formAlert[4]
      });
      return false;
    }
/*
*住所を入力する際に必要となるかなと思い勝手に...
*
    // 郵便番号の未入力チェック
    var val = document.getElementsByName("PostNo")[0];
    if (jsTrim(val.value).length == 0) {
        alert("郵便番号は必須項目です");
        val.focus();
        return;
    }
    // 郵便番後の入力値チェック
    if (!val.value.match(/[0-9]{3}-[0-9]{4}/)) {
        alert("入力値が誤っています");
        val.focus();
        return;
    }
    // メールの入力値チェック
    var val = document.getElementsByName("Mail")[0];
    if (!val.value.match(/^([a-z0-9_\.\-])+@([a-z0-9_\.\-])+/)) {
        alert("メールの入力値が誤っています");
        val.focus();
        return;
    }
*/
}
/*
*前後スペースを削除(全角半角対応)Tabは未対応
*/
function jsTrim(val) {
var ret = val;
ret = ret.replace(/^[\s]*/, "");
ret = ret.replace(/[\s]*$/, "");
return ret;
}
/*
*前スペースを削除(全角半角対応)
*/
function jsLTrim(val) {
var ret = val;
ret = ret.replace(/^[\s]*/, "");
return ret;
}
/*
*後スペースを削除(全角半角対応)
*/
function jsRTrim(val) {
var ret = val;
ret = ret.replace(/^[\s]*/, "");
return ret;
}

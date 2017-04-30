var eventID;

app.controller('JoinCtrl', function ($scope) {
    eventID = EditNavigator.topPage.pushedOptions.objectId;
    var department = EditNavigator.topPage.pushedOptions.department;

    //青年部のイベントへの参加であれば保護者の確認を得る
    $scope.IsSeinen = function(){
            if(department === "青年部"){
                ShowDialog('保護者の方から許可を得ましたか？');
            }else{
                Join();
            }
    };
});

function GetJoinTime(){
  //イベントの作成日
  var dd = new Date();
  var year = dd.getFullYear();
  var month = dd.getMonth() + 1;
  var Day = dd.getDate();
  if(Day < 10){
      Day = '0' + dd.getDate();
  }else {}
  var hours = dd.getHours();
  if(hours < 10){
      hours = '0' + dd.getHours();
  }else {}
  var minutues = dd.getMinutes();
  if (minutues < 10){
      minutues = '0' + dd.getMinutes();
  }else {}
  var date = year + '-' + month + '-' + Day + ' ' + hours + ':' + minutues;
  return date;
}

function Join(){
    //入力情報をローカルストレージに保存する
    setStorage();

    //入力データの取得
    var name = $("#name").val();
    var age = $("#age").val();
    var tell = $("#tell").val();
    var address = $("#address").val();
    var sex;
    if($("#male").prop("checked")){
        sex="男性";
    }else if ($("#female").prop("checked")){
        sex="女性";
    }
    var joinTime = GetJoinTime();

    //入力をチェックして問題なければ
    if (FormCheck(name, age, tell, address, sex)){
        ons.notification.confirm({
            title: 'この内容でよろしいですか？',
            messageHTML: '氏名 '+name+
            '<br>性別 '+sex+
            '<br>年齢 '+age+
            '<br>電話番号 '+tell+
            '<br>住所 '+address+
            '<br><br><h4>参加取り消しは町会に直接ご連絡ください<h4>',
            buttonLabels: ['はい','いいえ'],
            primaryButtonIndex: 1,
            cancelable: true,
            callback: function(index){
                switch (index) {
                    case 0:
                        var Participant = ncmb.DataStore("Participants");
                        var participant = new Participant({name:name, sex:sex, age:age, tell:tell, address:address, eventID:eventID, join_time:joinTime});
                        participant.save()
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
                        .catch(function(error){
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
}

//ダイアログを表示する関数
function ShowDialog(message){
  ons.notification.confirm({
    title : '確認',
    message : message,
    buttonLabels: ["いいえ", "はい"],
    primaryButtonIndex: 1,
    cancelable: true,
    callback: function(idx) {
      switch(idx) {
        case 1:
        Join();
        break;
      }
    }
  });
}


//入力に不備が無いか確認する関数
function FormCheck(name, age, tell, address, sex) {
    var alertMessege = "";

    // 氏名の未入力チェック
    var val_name = name;
    if (jsTrim(val_name).length === 0) {
        alertMessege += "氏名を入力してください\n";
    }

    //性別の入力チェック
    var val_sex = sex;
    if (val_sex != "男性" && val_sex != "女性"){
        alertMessege += "性別を入力してください\n";
    }

    // 年齢の未入力チェック
    var val_age = age;
    if (val_age ===  '') {
        alertMessege += "年齢を入力してください\n";
    }

    //電話番号の未入力チェック
    var val_tell = tell;
    if(val_tell.length === 0 ) {
        alertMessege += "電話番号を入力してください\n";
    }

    //住所の未入力チェック
    var val_address = address;
    if (jsTrim(val_address).length === 0) {
      alertMessege += "住所を入力してください\n";
    }

    if (alertMessege !== ""){
        alert(alertMessege);
        return false;
    } else {
        return true;
    }
}

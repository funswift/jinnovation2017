function Event_add()//イベント新規作成する関数
{
    //テキストボックスから各値を取得
    var event_name = $("#event_name")
    .val();
    var day = $("#day")
    .val();
    var location = $("#location")
    .val();
    var start_time = $("#start_time")
    .val();
    var end_time = $("#end_time")
    .val();
    var capacity = $("#capacity")
    .val();
    var description = $("#description")
    .val();
    var officer_only = officer_only_switch.isChecked();
    var officer_only_msg;
    if(officer_only){
        officer_only_msg = "役員にのみ公開する";
    }else{
        officer_only_msg = "役員にのみ公開しない";
    }

    //参加者とイベント関連付けるリレーションの作成
    var relation = new ncmb.Relation();

    //クラス名を指定して新規クラスを作成
    var Event = ncmb.DataStore("Event");
    //Eventクラスのインスタンスを作成
    var event = new Event();
    //参加者クラスを作成
    var Participants = ncmb.DataStore("Participants");
    //ダミーの参加者を作成
    var participant = new Participants({name:"dammy", age:-1, sex:"dammy", tell:-1, address:"dammy", event_name:event_name});
    //ダミーの参加者をリレーションに追加
    relation.add(participant);
    //作成したインスタンスの各フィールドにデータを設定
    event.set("event_name", event_name)
    .set("day", day)
    .set("location", location)
    .set("start_time", start_time)
    .set("end_time", end_time)
    .set("capacity", capacity)
    .set("description", description)
    .set("officer_only",officer_only)
    .set("participants", relation);
    //設定したデータをmobile backendに保存
    ons.notification.confirm({
        title: 'この内容でよろしいですか？',
        messageHTML: 'イベント名 '+event_name+
        '<br>日程 '+day+
        '<br>場所 '+location+
        '<br>開始時間 '+start_time+
        '<br>終了時間 '+end_time+
        '<br>定員 '+capacity+
        '<br>詳細 '+description+'<br>' +officer_only_msg+'<br>',
        buttonLabels: ['はい','いいえ'],
        primaryButtonIndex: 1,
        cancelable: true,
        callback: function(index){
            switch (index) {
                case 0:
                event.save()
                .then(function(object)
                {
                    //成功する時の処理
                    ons.notification.alert({
                        title: '確認画面',
                        messageHTML: event_name+'を<br>作成しました。',
                        buttonLabel: 'OK',
                        callback: function(){
                            EditNavigator.popPage();
                            getlist();
                        }
                    });
                    //alert("保存しました");
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

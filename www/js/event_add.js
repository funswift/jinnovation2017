function EventAdd()//イベント新規作成する関数
{
    //入力されたデータを取得
    var eventObj = GetEventInfo();
    //役員のみのイベントであるのに，役員のみになっていなければ
    var alertMsg = CheckEventData(eventObj);
    if (alertMsg !== ""){
        ons.notification.alert({
            title:"入力エラー",
            messageHTML:alertMsg,
            buttonLabel:"確認",
            callback:function(){}
        });
    } else {
        //作成日を取得
        var date = GetDateString();

        var Event = ncmb.DataStore("Event");
        var event = new Event();
        event.set("event_name", eventObj.event_name)
        .set("day", eventObj.day)
        .set("location", eventObj.location)
        .set("start_time", eventObj.start_time)
        .set("end_time", eventObj.end_time)
        .set("capacity", eventObj.capacity + '名')
        .set("description", eventObj.description)
        .set("officer_only", eventObj.officer_only)
        .set("Update_No", 0)
        .set("create_date", date)
        .set("update_date", date)
        .set("deadline_day", eventObj.deadline_day)
        .set("deadline_time", eventObj.deadline_time)
        .set("event_department_name", eventObj.event_department_name);
        //設定したデータをmobile backendに保存
        ons.notification.confirm({
            title: 'この内容でよろしいですか？',
            messageHTML:
            '部署 '+eventObj.event_department_name+
            '<br>イベント名 '+eventObj.event_name+
            '<br>日程 '+eventObj.day+
            '<br>場所 '+eventObj.location+
            '<br>開始時間 '+eventObj.start_time+
            '<br>終了時間 '+eventObj.end_time+
            '<br>定員 '+eventObj.capacity + '名'+
            '<br>詳細 '+eventObj.description+
            '<br>申込締切日 '+eventObj.deadline_day+" "+eventObj.deadline_time+'<br>'  +eventObj.officer_only_msg+'<br>',
            buttonLabels: ['はい','いいえ'],
            primaryButtonIndex: 0,
            cancelable: true,
            callback: function(index){
                switch (index) {
                    case 0:
                    event.save()
                    .then(function(object)
                    {
                        // //作成したイベントとアップロードする画像に関係を持たせる
                        // //イベントの更新を判定するために、Update_Noを定める
                        // Data.notEqualTo("event_name", "")//イベント名が空白ではないものを選択
                        // .order("updateDate",true)//dayの値で降順に取得
                        // .fetchAll()//条件値するものを全てfetch
                        // .then(function(results)//fetchし終わったら動く関数resultsにサーバから取得したオブジェクトたちが格納されている
                        // {
                        //     localStorage.setItem(results[0].objectId, JSON.stringify({
                        //         Update_No: 0,
                        //     }));
                        // })
                        // .catch(function(err)//もし取得できなかった時の処理
                        // {
                        //     alert("最新のイベントの取得に失敗しました");
                        // });
                        //成功する時の処理
                        ons.notification.alert({
                            title: '確認画面',
                            messageHTML: eventObj.event_name+'を<br>作成しました。',
                            buttonLabel: 'OK',
                            callback: function(){
                                EditNavigator.popPage();
                                GetEventListByAuth("admin");
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
}

function GetEventInfo(){
    //テキストボックスから各値を取得
    var event_department_name = $('#event_department_name').val();
    var event_name = $("#event_name").val();
    var day = $("#day").val();
    var location = $("#location").val();
    var start_time = $("#start_time").val();
    var end_time = $("#end_time").val();
    var capacity = $("#capacity").val();
    var description = $("#description").val();
    var officer_only = officer_only_switch.checked;
    var officer_only_msg;
    if(officer_only){
        officer_only_msg = "役員にのみ公開する";
    }else{
        officer_only_msg = "全員に公開する";
    }
    var deadline_day = $("#deadline_day").val();
    var deadline_time = $("#deadline_time").val();

    var eventObj = {
        "event_department_name": event_department_name,
        "event_name": event_name,
        "day": day,
        "location": location,
        "start_time": start_time,
        "end_time": end_time,
        "capacity": capacity,
        "description": description,
        "officer_only": officer_only,
        "officer_only_msg": officer_only_msg,
        "deadline_day": deadline_day,
        "deadline_time": deadline_time
    };

    return eventObj;
}

function CheckEventData(eventObj){
    var alertMsg = "";
    if (eventObj.event_department_name === "")
        alertMsg += "担当部名を選択してください<br>";

    if (eventObj.event_name === "")
        alertMsg += "イベント名を入力してください<br>";

    if ((eventObj.event_department_name == "役員") && (!eventObj.officer_only))
        alertMsg += "「役員のみに公開する」がオンになっていません<br>";
    return alertMsg;
}

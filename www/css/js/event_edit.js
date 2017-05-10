//var ncmb = new NCMB("ac69f8ae05be198a2425d61666016a4e79bef4c05955253a197e7307d1deb414", "4bf572b3f7da4bb9c88091702f81e8cc5191641a912006f1e0ab7347376803af");
//var Event;

// /*取得したデータの格納場所*/
// var eventID;
// var event;
// var event_name;
// var day;
// var start_time;
// var end_time;
// var place;
// var capacity;
// var description;
// var officer_only;
//全てvars.jsに移しました。

app.controller('EditCtrl', function ($scope) {
    //alert("start editctrl");
    //alert(EditNavigator.getCurrentPage().options.objectId);
    eventID = EditNavigator.getCurrentPage().options.objectId;

    getEventData();
});

/*１つのイベントオブジェクトを取得して、そのメンバ変数の値を取得する。*/
function getEventData(){
    Data = ncmb.DataStore("Event");
    Data.equalTo("objectId",eventID)
    .fetchAll()
    .then(function(results)
    {
        for (var i = 0; i < results.length; i++)
        {
            event = results[i];
            eventID = (event.objectId);
            event_name = (event.event_name);
            day = (event.day);
            start_time = (event.start_time);
            end_time = (event.end_time);
            place = (event.location);
            capacity = (event.capacity);
            description = (event.description);
            officer_only = (event.officer_only);
            //alert(event_name + day + place + capacity + description);
        }
        setEventData();
    })
    .catch(function(err)
    {
        console.log(err);
    });
    //alert("ゲット完了！");
}
/*取得した値を画面に反映させる*/
function setEventData(){
    document.getElementById("event_name").value=event_name;
    document.getElementById("day").value=day;
    document.getElementById("start_time").value=start_time;
    document.getElementById("end_time").value=end_time;
    document.getElementById("location").value=place;
    document.getElementById("capacity").value=capacity;
    document.getElementById("description").value=description;
    //alert(officer_only=="on");
    if(officer_only){
        officer_only_switch.setChecked(true);
    } else{
        officer_only_switch.setChecked(false);
    }
    //alert("セット完了！");
}

function EventUpdate(){
    //alert("更新したい！！");
    event_name = document.getElementById("event_name").value;
    day = document.getElementById("day").value;
    start_time = document.getElementById("start_time").value;
    end_time = document.getElementById("end_time").value;
    place = document.getElementById("location").value;
    capacity = document.getElementById("capacity").value;
    description = document.getElementById("description").value;
    officer_only = officer_only_switch.isChecked();
    var officer_only = officer_only_switch.isChecked();
    var officer_only_msg;
    if(officer_only){
        officer_only_msg = "役員にのみ公開する";
    }else{
        officer_only_msg = "役員にのみ公開しない";
    }
    //alert(event_name+" get complete!!");

    Data.equalTo("objectId", eventID)
    .fetch()
    .then(function(results){
        ons.notification.confirm({
            title: 'この内容でよろしいですか？',
            messageHTML: 'イベント名 '+event_name+
            '<br>日程 '+day+
            '<br>場所 '+place+
            '<br>開始時間 '+start_time+
            '<br>終了時間 '+end_time+
            '<br>定員 '+capacity+
            '<br>詳細 '+description+'<br>'+officer_only_msg+'<br>',
            buttonLabels: ['はい','いいえ'],
            primaryButtonIndex: 1,
            cancelable: true,
            callback: function(index){
                switch (index) {
                    case 0:
                    results.set("event_name", event_name)
                    .set("day", day)
                    .set("start_time", start_time)
                    .set("end_time", end_time)
                    .set("location", place)
                    .set("capacity", capacity)
                    .set("description", description)
                    .set("officer_only", officer_only)
                    .set("participants", event.participants)
                    .update()
                    .then(function(object)
                    {
                        //成功する時の処理
                        ons.notification.alert({
                            title: '確認画面',
                            messageHTML: event_name+'を<br>更新しました。',
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
    })
    .catch(function(err){
        // エラー処理
        alert("エラーが発生しました");
    });
}

function EventDelete(){
    //alert("削除処理開始");
    Data.equalTo("objectId", eventID)
    .fetch()
    .then(function(results){
        ons.notification.confirm({
            title: '本当に削除してよろしいですか？',
            messageHTML: 'イベント名 '+event_name+
            '<br>日程 '+day+
            '<br>場所 '+place+
            '<br>開始時間 '+start_time+
            '<br>終了時間 '+end_time+
            '<br>定員 '+capacity+
            '<br>詳細 '+description+'<br>',
            buttonLabels: ['はい','いいえ'],
            primaryButtonIndex: 1,
            cancelable: true,
            callback: function(index){
                switch (index) {
                    case 0:
                    results.delete()
                    .then(function(object)
                    {
                        //成功する時の処理
                        ons.notification.alert({
                            title: '確認画面',
                            messageHTML: event_name+'を<br>削除しました。',
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
    })
    .catch(function(err){
        // エラー処理
        alert("エラーが発生しました");
    });
}

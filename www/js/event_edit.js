app.controller('EditCtrl', function ($scope) {
    var object = EditNavigator.topPage.pushedOptions.object;
    $scope.officer_only = object.officer_only;
    SetEventDate(object);

    $scope.EventUpdate = function(){
        //alert("更新したい！！");
        var event_name = $("#event_name").val();
        var day = $("#day").val();
        var start_time = $("#start_time").val();
        var end_time = $("#end_time").val();
        var place = $("#location").val();
        var capacity = $("#capacity").val();
        var description = $("#description").val();
        var event_department_name = $("#event_department_name").val();
        var deadline_day = $("#deadline_day").val();
        var deadline_time = $("#deadline_time").val();
        var officer_only = officer_only_switch.checked;
        var officer_only_msg;
        if(officer_only){
            officer_only_msg = "役員にのみ公開する";
        }else{
            officer_only_msg = "役員にのみ公開しない";
        }

        ons.notification.confirm({
            title: 'この内容でよろしいですか？',
            messageHTML:
            '部署 '+event_department_name+
            '<br>イベント名 '+event_name+
            '<br>日程 '+day+
            '<br>場所 '+place+
            '<br>開始時間 '+start_time+
            '<br>終了時間 '+end_time+
            '<br>定員 '+capacity+
            '<br>詳細 '+description+
            '<br>申込締切日 '+deadline_day+" "+deadline_time+'<br>'+officer_only_msg+'<br>',
            buttonLabels: ['はい','いいえ'],
            primaryButtonIndex: 0,
            cancelable: true,
            callback: function(index){
                switch (index) {
                    case 0:
                    var date = GetDateString();
                    var Event = ncmb.DataStore("Event");
                    Event.equalTo("objectId", object.objectId)
                    .fetch()
                    .then(function(result){
                        result.set("event_name", event_name)
                        .set("day", day)
                        .set("start_time", start_time)
                        .set("end_time", end_time)
                        .set("location", place)
                        .set("capacity", capacity)
                        .set("description", description)
                        .set("officer_only", officer_only)
                        .set("update_date", date)
                        .set("deadline_day", deadline_day)
                        .set("deadline_time", deadline_time)
                        .set("event_department_name", event_department_name)
                        .set("Update_No",result.Update_No+1)
                        .update();
                        // .then(function()
                        // {
                        //     // localStorage.setItem(eventID, JSON.stringify({
                        //     //     Update_No: Update_No + 1
                        //     // }));
                        //     // // var test;
                        //     // // test = JSON.parse(localStorage.getItem(eventID));
                        //     // // console.log(test.Update_No);
                        //     // //成功する時の処理
                        //     ons.notification.alert({
                        //         title: '確認画面',
                        //         messageHTML: event_name+'を<br>更新しました。',
                        //         buttonLabel: 'OK',
                        //         callback: function(){
                        //             EditNavigator.popPage({"animation":"none"});
                        //             EditNavigator.popPage({"animation":"none"});
                        //             GetEventListByAuth("admin");
                        //         }
                        //     });
                        // })
                        // .catch(function(error)
                        // {
                        //     alert("更新時エラー");
                        //     //console.log(error.message);
                        //     //エラーが発生する時の処理
                        //     $("#message")
                        //     .html("error:" + error.message);
                        // });
                        ons.notification.alert({
                            title: '確認画面',
                            messageHTML: event_name+'を<br>更新しました。',
                            buttonLabel: 'OK',
                            callback: function(){
                                EditNavigator.on('postpop', function(event){//Navigatorの挙動を設定
                                    if (EditNavigator.topPage.name == "views/admin/admin_event_detail.html"){                                 
                                        EditNavigator.popPage({"animation":"none"});
                                        GetEventListByAuth("admin");
                                    }
                                });
                                EditNavigator.popPage({"animation":"none"});
                            }
                        });
                    })
                    .catch(function(err){
                        // エラー処理
                        alert("更新時エラーが発生しました");
                    });
                    break;
                    default:
                }
            }
        });
    };
});

/*取得した値を画面に反映させる*/
function SetEventDate(eventObj){
    document.getElementById("event_department_name").value = eventObj.event_department_name;
    document.getElementById("event_name").value = eventObj.event_name;
    document.getElementById("day").value = eventObj.day;
    document.getElementById("start_time").value = eventObj.start_time;
    document.getElementById("end_time").value = eventObj.end_time;
    document.getElementById("location").value = eventObj.location;
    document.getElementById("capacity").value = eventObj.capacity;
    document.getElementById("description").value = eventObj.description;
    document.getElementById("event_department_name").value = eventObj.event_department_name;
    document.getElementById("deadline_day").value = eventObj.deadline_day;
    document.getElementById("deadline_time").value = eventObj.deadline_time;
}

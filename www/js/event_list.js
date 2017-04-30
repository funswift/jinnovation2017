var eventList = [];
app.controller('EventCtrl', function ($scope) {//EventCtrlという名前のコントローラの作成
    $scope.objects = eventList;//$scopeというコントローラが設定されているページならどこでも参照できる変数？クラス？にobjectsというメンバ変数を作成し、そこにEvents配列を格納する。

    $scope.set_department = function(index){
        switch (eventList[index].event_department_name) {
            case "総務部":
                return 'somu';
            case "青年部":
                return 'seinen';
            case "役員":
                return 'yakuin';
            case "女性部":
                return 'josei';
            case "環境部":
                return 'kankyo';
            case "防火防犯部":
                return 'bouka';
            case "交通部":
                return 'traffic';
            case "福祉部":
                return 'fukushi';
            case "Jバス部":
                return 'basu';
                default:
                break;
        }
    };

    /*
    各list-itemで写真を表示する
    */
    $scope.view_pic = function(index){
        return rootDir+eventList[index].objectId+'.png';
    };
//イベントリストから選ばれたイベントのobjectIdを取得して、選択されたイベントの詳細情報を表示する関数
    $scope.showDetail_n = function(index){//
        var object = eventList[index];
        EditNavigator.pushPage("event_detail_n.html", {object:object});
//         ons.notification.confirm({
//             title: object.event_name,
//             animation:"fade",
//             messageHTML:
//             '<img src="jinkawa_logo.jpg" width="80%">'+
//             '<div class="ale">'+
//             '<br><p><span class="bold">日程: </span>'+object.day+'</p>'+
//             '<p><span class="bold">場所: </span> '+object.location+'</p>'+
//             '<p><span class="bold">時間: </span> '+object.start_time+'~'+object.end_time+'</p>'+
// //            '<p>終了時間: '+object.end_time+'</p>'+
//             '<p><span class="bold">定員: </span> '+object.capacity+'</p>'+
//             '<p><span class="bold">詳細: </span> '+object.description+'</p></div>',
//             buttonLabels:["もどる", "参加する"],
//             callback: function(idx){
//                 switch (idx) {
//                     case 1:
//                         goToJoinform(index);
//                         break;
//                 }
//             }
//
//
//         });
    };

    $scope.showDetail = function(index){//
        var object = eventList[index];
        EditNavigator.pushPage("event_detail.html", {object:object});
//         var mhtml =
//         '<img src="jinkawa_logo.jpg" width="80%">'+
//         '<div class="ale">'+
//         '<br><p><span class="bold">日程: </span>'+object.day+'</p>'+
//         '<p><span class="bold">場所: </span> '+object.location+'</p>'+
//         '<p><span class="bold">時間: </span> '+object.start_time+'~'+object.end_time+'</p>'+
// //            '<p>終了時間: '+object.end_time+'</p>'+
//         '<p><span class="bold">定員: </span> '+object.capacity+'</p>'+
//         '<p><span class="bold">詳細: </span> '+object.description+'</p></div>';
//         ons.notification.confirm({
//             title: object.event_name,
//             animation:"fade",
//             messageHTML: mhtml,
//             buttonLabels:["削除", "編集", "参加者リスト","参加する","もどる"],
//             callback: function(idx){
//                 switch (idx) {
//                     case 0:
//                         EventDelete(index);
//                         break;
//                     case 1:
//                         eventDetail(index);
//                         break;
//                     case 2:
//                         ParticipantsList(index);
//                         break;
//                     case 3:
//                         goToJoinform(index);
//                         break;
//                 }
//             }
//
//
//         });
    };

    $scope.showDetail_o = function (index) {
        var object = eventList[index];
        EditNavigator.pushPage("event_detail_o.html", {object:object});
    };
});

function GetEventListByAuth(auth){
    var Event = ncmb.DataStore("Event");
    var tmpEventList = [];
    if (auth == "normal"){
        Event.notEqualTo("officer_only", true)
        .fetchAll()
        .then(function(results){
            for (var i = 0; i < results.length; i++ ){
                var object = results[i];
                tmpEventList.push(object);
            }
            eventList = tmpEventList;
            normaltabbar.loadPage("views/normal/normal_event_list.html");
        })
        .catch(function(err){
            alert("一般イベントリスト取得エラー");
        });
    } else if (auth == "offier") {
        Event.fetchAll()
        .then(function(results){
            for (var i = 0; i < results.length; i++ ){
                var object = results[i];
                tmpEventList.push(object);
            }
            eventList = tmpEventList;
            officertabbar.loadPage("views/officer/officer_event_list.html");
        })
        .catch(function(err){
            alert("役員イベントリスト取得エラー");
        });
    } else if (auth == "admin"){
        Event.fetchAll()
        .then(function(results){
            for (var i = 0; i < results.length; i++ ){
                var object = results[i];
                tmpEventList.push(object);
            }
            eventList = tmpEventList;
            admintabbar.loadPage("views/admin/admin_event_list.html");
        })
        .catch(function(err){
            alert("管理者イベントリスト取得エラー");
        });
    }
}

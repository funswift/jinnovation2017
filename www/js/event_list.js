var eventList = [];
app.controller('EventCtrl', function ($scope) {//EventCtrlという名前のコントローラの作成
    $scope.objects = eventList;//$scopeというコントローラが設定されているページならどこでも参照できる変数？クラス？にobjectsというメンバ変数を作成し、そこにEvents配列を格納する。

    $scope.set_department = function(index){
        switch ($scope.objects[index].event_department_name) {
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

    //イベントの詳細を確認する関数
    $scope.ShowEventDetailByAuty = function (index, auth){
        var object = eventList[index];
        if (auth == "normal"){
            EditNavigator.pushPage("views/normal/normal_event_detail.html", { object: object });
        } else if (auth == "officer") {
            EditNavigator.pushPage("views/officer/officer_event_detail.html", { object: object });
        } else if (auth == "admin") {
            EditNavigator.pushPage("views/admin/admin_event_detail.html", { object: object });
        }
    };
});


//イベントのリストを取得する関数
//authによって処理が変化する
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
    } else if (auth == "officer") {
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

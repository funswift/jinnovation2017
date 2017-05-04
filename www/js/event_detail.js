app.controller('DetailCtrl', function ($scope) {
    //前のページから送られたイベントオブジェクトを取得する
    var object = EditNavigator.topPage.pushedOptions.object;
    $scope.object = object;

    $scope.set_department = function(){
        switch (object.event_department_name) {
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
        //return rootDir+object.objectId+'.png';
        return 'jinkawa_logo.jpg';
    };

    /*
    写真の拡大表示
    */
    $scope.Expansion_pic = function(index){
        //window.open('' + rootDir+object.objectId + '.png','_blank','toolbarposition=top,suppressesIncrementalRendering=yes,location=no,closebuttoncaption=戻る,enableViewportScale=yes');
        window.open('jinkawa_logo.jpg');
    };

    //参加申し込みフォームへ遷移させる
    $scope.GoToJoinform = function(){
        EditNavigator.pushPage("views/join.html", {objectId: object.objectId, department: object.event_department_name});
    };

    $scope.EventDelete = function(){
        alert("削除するよ");
        var eventID = object.objectId;
        var Event = ncmb.DataStore("Event");
        Event.equalTo("objectId", eventID)
        .fetch()
        .then(function(result){
            ons.notification.confirm({
                title: '本当に削除してよろしいですか？',
                messageHTML: 'イベント名 '+result.event_name+
                '<br>日程 '+result.day+
                '<br>場所 '+result.location+
                '<br>開始時間 '+result.start_time+
                '<br>終了時間 '+result.end_time+
                '<br>定員 '+result.capacity+
                '<br>詳細 '+result.description+'<br>',
                buttonLabels: ['はい','いいえ'],
                primaryButtonIndex: 1,
                cancelable: true,
                callback: function(index){
                    switch (index) {
                        case 0:
                        result.delete()
                        .then(function(object)
                        {
                            // //参加者リストの削除
                            // ncmb.File.delete(eventID + '.csv')
                            // .then(function(data){
                            // // 削除後処理
                            // })
                            // .catch(function(err){
                            // // エラー処理
                            // });
                            //成功する時の処理
                            ons.notification.alert({
                                title: '確認画面',
                                messageHTML: result.event_name+'を<br>削除しました。',
                                buttonLabel: 'OK',
                                callback: function(){
                                    GetEventListByAuth("admin");
                                    EditNavigator.popPage();
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
        .catch(function(error){
        });
    };
});

function ShowEventMenu() {
    var element = document.getElementById("DetailCtrl");
    var $scope = angular.element(element).scope();
    ons.notification.confirm({
        title:"イベント詳細",
        messageHTML: "メニュー",
        buttonLabels:["編集", "削除", "参加者リスト", "閉じる"],
        primaryButtonIndex:3,
        cancelable: true,
        callback: function(index){
            switch(index){
                case 0:
                //編集
                    //$scope.eventDetail();
                    alert("編集するよ");
                    break;
                case 1:
                //削除
                    $scope.EventDelete();
                    break;
                case 2:
                //参加者リスト
                    // $scope.ParticipantsList();
                    alert("参加者確認するよ");
                    break;
                default:
                    break;
            }
        }
    });
}

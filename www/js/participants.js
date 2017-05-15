var participants = [];
var eventObj;

function FetchAllParticipantsWhenPush(eventObj){
    var Participants = ncmb.DataStore("Participants");
    var eventID = eventObj.objectId;
    Participants.equalTo("eventID", eventID)
    .fetchAll()
    .then(function(results){
        var tmpParticipants = [];
        for (var i = 0; i < results.length; i++){
            tmpParticipants.push(results[i]);
        }
        participants = tmpParticipants;
        EditNavigator.pushPage("views/admin/participants_list.html", {eventObj: eventObj});
    })
    .catch(function(error){
        alert("参加者リストへの遷移時の参加者取得エラー");
    });
}

function FetchAllParticipantsWhenPop(eventID){
    var Participants = ncmb.DataStore("Participants");
    Participants.equalTo("eventID", eventID)
    .fetchAll()
    .then(function(results){
        var tmpParticipants = [];
        for (var i = 0; i < results.length; i++){
            tmpParticipants.push(results[i]);
        }
        participants = tmpParticipants;
        EditNavigator.popPage({refresh: true});
    })
    .catch(function(error){
        alert("参加者参加者取得エラー");
    });
}

function FetchAllParticipantsWhenReload(eventID){
    var Participants = ncmb.DataStore("Participants");
    Participants.equalTo("eventID", eventID)
    .fetchAll()
    .then(function(results){
        var tmpParticipants = [];
        for (var i = 0; i < results.length; i++){
            tmpParticipants.push(results[i]);
        }
        participants = tmpParticipants;
        alert("リロード");
        EditNavigator.replacePage("views/admin/participants_list.html", {eventObj: eventObj, animation: 'none'});
    })
    .catch(function(error){
        alert("参加者参加者取得エラー");
    });
}

function ShowParticipantsMenu(){
    ons.notification.confirm({
        title:"参加リスト",
        messageHTML:"メニュー",
        buttonLabels:["参加者の追加", "リスト出力", "閉じる"],
        primaryButtonIndex:2,
        cancelable: true,
        callback: function(index){
            switch(index){
                case 0:
                    //goto_add_participant_form();
                    GoToParticipantAddForm(eventID);
                    break;
                case 1:
                    //exportList(export_par_List);
                    ExportList(eventObj, participants);
                    break;
                case 2:
                    break;
                default:
                    break;
            }
        }
    });
}

function GoToParticipantAddForm(eventID){
    EditNavigator.pushPage("views/admin/participants_add.html", {eventID: eventID});
}

app.controller('ParticipantsCtrl', function($scope){
    $scope.items = participants;
    eventObj = EditNavigator.topPage.pushedOptions.eventObj;
    eventID = eventObj.objectId;

    $scope.DeleteParticipants = function(index){
        var currentObj = $scope.items[index];
        var Participant = ncmb.DataStore("Participants");
        Participant.equalTo("objectId", currentObj.objectId)//選択されたInformationオブジェクトの取得
        .fetch()
        .then(function(result){
            ons.notification.confirm({//ダイアログを表示する関数(２つ選択しがあるconfirm)
                title: '本当に削除してよろしいですか？',
                messageHTML: result.name+"<br>"+
                             result.sex+"<br>"+
                             result.age+"<br>"+
                             result.tell+"<br>"+
                             result.address+"<br>",
                buttonLabels: ['はい','いいえ'],
                primaryButtonIndex: 1,
                cancelable: true,
                callback: function(index){
                    switch (index) {
                        case 0:
                        result.delete()
                              .then(function(object)
                        {
                            //成功した時の処理
                            ons.notification.alert({//ダイアログを表示する関数（１つしか選択肢がないalert）
                                title: '確認画面',
                                messageHTML: '参加者を<br>削除しました。',
                                buttonLabel: 'OK',
                                callback: function(){
                                    FetchAllParticipantsWhenReload(eventID);
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
        })
        .catch(function(err){
                // エラー処理
                alert("参加者削除エラーが発生しました");
        });
    }
});

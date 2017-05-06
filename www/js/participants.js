var participants = [];

function FetchAllParticipantsWhenPush(eventID){
    var Participants = ncmb.DataStore("Participants");
    Participants.equalTo("eventID", eventID)
    .fetchAll()
    .then(function(results){
        var tmpParticipants = [];
        for (var i = 0; i < results.length; i++){
            tmpParticipants.push(results[i]);
        }
        participants = tmpParticipants;
        EditNavigator.pushPage("views/admin/participants_list.html", {eventID: eventID});
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
                    alert("参加者の追加");
                    GoToParticipantAddForm(eventID);
                    break;
                case 1:
                    //exportList(export_par_List);
                    alert("参加者リストのエクスポート");
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
    eventID = EditNavigator.topPage.pushedOptions.eventID;
});

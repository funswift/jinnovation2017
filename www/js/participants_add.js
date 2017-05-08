app.controller('ParticipantAddCtrl', function ($scope) {
    //イベントIDと部署の取得
    eventID = EditNavigator.topPage.pushedOptions.eventID;
    $scope.AddParticipant = function(){
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
                                    messageHTML: name+'さんを参加者として受け付けました。',
                                    buttonLabel: 'OK',
                                    callback: function(){
                                        FetchAllParticipantsWhenPop(eventID);
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
    };
});

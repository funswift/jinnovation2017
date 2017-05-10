// //mobile backendのAPIキーを設定
// var ncmb = new NCMB("ac69f8ae05be198a2425d61666016a4e79bef4c05955253a197e7307d1deb414", "4bf572b3f7da4bb9c88091702f81e8cc5191641a912006f1e0ab7347376803af");
// //イベントオブジェクトを格納する配列
// var Events = [];
// //オブジェクトをfetch(とりあえずサーバから取得したオブジェクトを保存)するための変数
// var Data;
// //１つのイベントオブジェクトを格納する変数
// var eventObject;
// //参加者オブジェクトを格納する配列
// var ParticipantsArray = [];

function getlist(){//管理者用のイベントリストを取得する関数
    Data = ncmb.DataStore("Event");

    Data.notEqualTo("event_name", "")//イベント名が空白ではないものを選択
    .order("day",true)//dayの値で降順に取得
    .fetchAll()//条件値するものを全てfetch
    .then(function(results)//fetchし終わったら動く関数resultsにサーバから取得したオブジェクトたちが格納されている
    {
        Events.length=0;//配列を空にしておく。これがないと、実行されるたびに中身が重複して増えていく
        for (var i = 0; i < results.length; i++)
        {
            var object = results[i];//resultsからオブジェクトを１つ取り出す
            if(object.event_name === null){
                object.event_name = "未定";
            }
            Events.push(object);//配列に取り出したオブジェクトを格納する
        }
        tabbar.loadPage("admin_event_list.html");//ページ遷移をしたタイミングではデータが用意されていないので、データが用意出来たタイミングでページを再読込する。
        //管理者用のページにあるtabbarに読込する。
    })
    .catch(function(err)//もし取得できなかった時の処理
    {
        alert("エラー");
    });
}

function getlist_n(){//一般用のイベントリストを取得する関数
    Data = ncmb.DataStore("Event");
    Data.notEqualTo("event_name", "")
    .notEqualTo("officer_only", true)//officer_onlyがtrueでないもの、つまりofficer_onlyがfalseであるという条件
    .order("day",true)
    .fetchAll()
    .then(function(results)
    {
        Events.length=0;
        for (var i = 0; i < results.length; i++)
        {
            var object = results[i];
            if(object.event_name === null){
                object.event_name = "未定";
            }
            Events.push(object);
        }
        normaltabbar.loadPage("normal_and_officer_event_list.html");//一般用のページに有るnormaltabbarに再読み込みする
    })
    .catch(function(err)
    {
        alert("エラー");
    });
}

function getlist_o(){//役員用のイベントリストを取得する関数
    Data = ncmb.DataStore("Event");
    Data.notEqualTo("event_name", "")
    .order("day",true)
    .fetchAll()
    .then(function(results)
    {
        Events.length=0;
        for (var i = 0; i < results.length; i++)
        {
            var object = results[i];
            if(object.event_name === null){
                object.event_name = "未定";
            }
            Events.push(object);
        }
        officertabbar.loadPage("normal_and_officer_event_list.html");
    })
    .catch(function(err)
    {
        alert("エラー");
    });
}

app.controller('EventCtrl', function ($scope) {//EventCtrlという名前のコントローラの作成
    $scope.objects = Events;//$scopeというコントローラが設定されているページならどこでも参照できる変数？クラス？にobjectsというメンバ変数を作成し、そこにEvents配列を格納する。

//イベントリストから選ばれたイベントのobjectIdを取得して編集画面(event_edit.html)に渡す関数を$scopeにくっつけている。
    $scope.eventDetail = function(index){//functionの引数indexはイベントリストページで選ばれたイベントが配列の中の何番目であるかを表している
        var object = Events[index];
        EditNavigator.pushPage("event_edit.html", {objectId: object.objectId});
    };

//イベントリストから選ばれたイベントのobjectIdを取得して参加申し込み方法入力画面(join.html)に渡す関数を$scopeにくっつけている。
    $scope.goToJoinform = function(index){
        var object = Events[index];
        EditNavigator.pushPage("join.html", {objectId: object.objectId});
    };

//イベントリストから選ばれたイベントのobjectIdを取得して、選択されたイベントに紐付けられている参加者を配列に格納し、その配列を参加者リスト画面(participants_list.html)に渡す関数
    $scope.ParticipantsList = function(index){
        var object = Events[index];//選択されたイベントオブジェクトを取得
        Data = ncmb.DataStore("Event");
        Data.equalTo("objectId", object.objectId)//選択されたオブジェクトのIdとマッチするオブジェクトををfetchする
        .fetchAll()
        .then(function(results){
            for (var i = 0; i < results.length; i++)
            {
                event = results[i];//ここはイベントのfetch結果なので1回で終わる
            }
            Participant = ncmb.DataStore("Participants");//"Participants"クラスfetchするための準備
            Participant.relatedTo(event, "participants")//選択されたイベントに"paticipants"プロパティとして関連付けられている参加者オブジェクトを取得する
            .fetchAll()
            .then(function(results){
                ParticipantsArray.length = 0;
                for (var i = 0; i < results.length; i++)
                {
                    var object = results[i];
                    if(object.name !== "dammy"){//現状の仕様では必ずdammyが作成されるので、dammyは配列に格納したくない
                        ParticipantsArray.push(object);
                    }
                }
                EditNavigator.pushPage("participants_list.html", {participants: ParticipantsArray});//参加者が詰まった配列をページ遷移先に渡している
            })
            .catch(function(err){
                alert("エラー");
            });
        })
        .catch(function(err)
        {
            alert("エラー\n取得できませんでした");
        });
    };
//イベントリストから選ばれたイベントのobjectIdを取得して、選択されたイベントの詳細情報を表示する関数
    $scope.showDetail = function(index){//
        var object = Events[index];
        ons.notification.alert({
            title: 'イベント詳細',
            messageHTML: 
            'イベント名 '+object.event_name+
            '<br>日程 '+object.day+
            '<br>場所 '+object.place+
            '<br>開始時間 '+object.start_time+
            '<br>終了時間 '+object.end_time+
            '<br>定員 '+object.capacity+
            '<br>詳細 '+object.description+'<br>',
            buttonLabel: 'OK',
            callback: function(index){}
        });
    };
});

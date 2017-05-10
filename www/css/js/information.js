//基本的にevent_list.jsと作りは同じ、event_list.jsを参照されたい

//mobile backendのAPIキーを設定(すでにevent_listで宣言しているので不要)
//var ncmb = new NCMB("ac69f8ae05be198a2425d61666016a4e79bef4c05955253a197e7307d1deb414", "4bf572b3f7da4bb9c88091702f81e8cc5191641a912006f1e0ab7347376803af");
// //インフォメーションオブジェクトを格納する配列
// var Informations = [];
// var Data;//event_list.jsですでに宣言されているので不要


function getinfo(){//編集者用のinformationを取得する関数
    Data = ncmb.DataStore("Information");//このData変数がサーバの"Information"クラスをfetchするようにしている
    Data.notEqualTo("info", "")//infoが空出ないものという条件
    //降順
    .order("updateDate",true)
    .fetchAll()
    .then(function(results)
    {
        Informations.length=0;
        for (var i = 0; i < results.length; i++)
        {
            var object = results[i];
            Informations.push(object);
        }
        tabbar.loadPage("admin_information.html");
    })
    .catch(function(err)
    {
        alert("エラー");
    });
}

function getinfo_n(){//一般用のinformationを取得する関数
    Data = ncmb.DataStore("Information");
    Data.notEqualTo("info", "")
        .notEqualTo("officer_only", true)
    //降順
    .order("updateDate",true)
    .fetchAll()
    .then(function(results)
    {
        Informations.length=0;
        for (var i = 0; i < results.length; i++)
        {
            var object = results[i];
            Informations.push(object);
        }
        normaltabbar.loadPage("normal_and_officer_information.html");
    })
    .catch(function(err)
    {
        alert("エラー");
    });
}

function getinfo_o(){
    Data = ncmb.DataStore("Information");
    //alert("getdata内部1");
    Data.notEqualTo("info", "")
    //降順
    .order("updateDate",true)
    .fetchAll()
    .then(function(results)
    {
        Informations.length=0;
        for (var i = 0; i < results.length; i++)
        {
            var object = results[i];
            Informations.push(object);
        }
        officertabbar.loadPage("normal_and_officer_information.html");
    })
    .catch(function(err)
    {
        alert("エラー");
    });
}

app.controller('InfoCtrl', function ($scope) {
    $scope.objects = Informations;

    $scope.infoDelete = function(index){//選択されたお知らせを削除する関数
        Data.equalTo("objectId", Informations[index].objectId)//選択されたInformationオブジェクトの取得
        .fetch()
        .then(function(result){
            ons.notification.confirm({//ダイアログを表示する関数(２つ選択しがあるconfirm)
                title: '本当に削除してよろしいですか？',
                messageHTML: result.info,
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
                                messageHTML: 'お知らせを<br>削除しました。',
                                buttonLabel: 'OK',
                                callback: function(){
                                    getinfo();//削除が完了したらページを再読み込み。削除は編集モード専用であるので、編集モードようの関数である
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
                alert("エラーが発生しました");
        });
    };
});

var informations = [];//お知らせを格納する配列

app.controller('InfoCtrl', function ($scope) {
    $scope.objects = informations;

    //どの部署の情報なのかを判別してcssをあてる
    $scope.set_department = function (index){
        switch($scope.objects[index].department_name){
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

    //お知らせの詳細情報を表示する
    $scope.ShowInfoDetail = function(index, auth){
        var object = informations[index];

        if (auth == "admin"){//管理者なら
            ons.notification.confirm({
                title: object.title,
                animation:"fade",
                messageHTML:
//              '<span class="' + department_name +'">'+ object.department_name + '</span>' +
//              '<span> ' + object.date + '</span>'+
//              '<HR>' +
                '<span> ' + object.info + '</span>',
                buttonLabels:["閉じる","削除"],
                callback: function(idx){
                    switch (idx) {
                        case 1:
                            InfoDelete(index);
                            break;
                        default:
                            break;
                    }
                }
            });
        } else {//役員か一般なら
            ons.notification.confirm({
                title:object.title,
                animation:"fade",
                messageHTML:
                // '<br><br><span class="' + department_name +'_info"'+'>'+ object.department_name + '</span><br><br>' +
                // '<span style="font-size:13pt;"> ' + object.date + '</span>'+
                '<span> ' + object.info + '</span>',
                buttonLabels:["閉じる"],
                callback: function(idx){}
            });
        }
    };
});

//authには"admin" "normal" "officer"のどれかが入る
function GetInformationByAuth(auth){//お知らせのリストを取得する
    var Information = ncmb.DataStore("Information");
    if (auth == "normal"){
        Information.notEqualTo("officer_only", true)
            .fetchAll()
            .then(function(results){
                var tmpInformations = [];
                for(var i =0; i<results.length; i++){
                    var object = results[i];
                    tmpInformations.push(object);
                }
                informations = tmpInformations;
                normaltabbar.loadPage("views/normal/normal_information.html");
            })
            .catch(function(err){
                alert("一般インフォメーション取得エラー");
            });
    } else if (auth == "officer"){
        Information.fetchAll()
            .then(function(results){
                var tmpInformations = [];
                for(var i =0; i<results.length; i++){
                    var object = results[i];
                    tmpInformations.push(object);
                }
                informations = tmpInformations;
                officertabbar.loadPage("views/officer/officer_information.html");
            })
            .catch(function(err){
                alert("役員インフォメーション取得エラー");
            });
    } else {
        Information.fetchAll()
            .then(function(results){
                var tmpInformations = [];
                for(var i =0; i<results.length; i++){
                    var object = results[i];
                    tmpInformations.push(object);
                }
                informations = tmpInformations;
                admintabbar.loadPage("views/admin/admin_information.html");
            })
            .catch(function(err){
                alert("管理者インフォメーション取得エラー");
            });
    }
}

//選択されたお知らせを削除する関数
function InfoDelete(index){
    var Information = ncmb.DataStore("Information");
    Information.equalTo("objectId", informations[index].objectId)//選択されたInformationオブジェクトの取得
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
                                GetInformationByAuth("admin");//削除が完了したらページを再読み込み。削除は編集モード専用であるので、編集モードようの関数である
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
             alert("お知らせ削除エラーが発生しました");
     });
}

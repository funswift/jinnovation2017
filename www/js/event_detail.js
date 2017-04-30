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
});

var informations = [];
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
});

//autyには"admin" "normal" "officer"のどれかが入る
function GetInformationByAuth(auth){
    var Information = ncmb.DataStore("Information");
    if (auth == "normal"){
        Information.notEqualTo("officer_only", true)
            .fetchAll()
            .then(function(results){
                for(var i =0; i<results.length; i++){
                    var object = results[i];
                    informations.push(object);
                }
                normaltabbar.loadPage("normal_and_officer_information.html");
            })
            .catch(function(err){
                alert("インフォメーション取得エラー");
            });
    } else if (auth == "officer"){
        Information.fetchAll()
            .then(function(results){
                for(var i =0; i<results.length; i++){
                    var object = results[i];
                    informations.push(object);
                }
                normaltabbar.loadPage("normal_and_officer_information.html");
            })
            .catch(function(err){
                alert("インフォメーション取得エラー");
            });
    } else {
        alert("admin");
    }
}

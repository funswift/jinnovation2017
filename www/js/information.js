app.controller('InfoCtrl', function ($scope) {
    $scope.GetInfoNormal = function (){
        var ncmb = new NCMB("c43b5d5fe03f0563c9f2d53335f682b9c139f8267acd2aaf83a09465defefb0a", "55138871300b1f583d20bbf82f82b91b71d94987fb0f093fd868c401660dc4f5");
        var informations = [];
        var TestClass = ncmb.DataStore("TestClass");
        TestClass.fetchAll()
                 .then(function(results){
                     for(var i =0; i<results.length; i++){
                            var object = results[i];
                            informations.push(object);
                            alert(object.message);
                     }
                     $scope.objects = informations;
                 })
                 .catch(function(err){
                     alert("インフォメーション取得エラー");
                 });
    };
});

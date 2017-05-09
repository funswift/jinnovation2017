// 参加者リストを表示するためのjs
// participants_list.htmlが初期化された時に呼び出される
app.controller('ParticipantsCtrl', function($scope){
    //渡されるはずの参加者が詰まった配列を受け取り、$scopeに,itemsとして持たせる
    $scope.items = EditNavigator.getCurrentPage().options.participants;
});

//var ncmb = new NCMB("c4cae25c782bac3179df3ff07b7b9527ba5061dadd86f126b0c2e2ff94c4f315", "510b2789e80e76445b7b4194c98dc7627283c370d72004fa41b8938790a5be44");

function Information_add()
{
    //テキストボックスからおしらせのデータを取得
    var info = $("#announcement")
        .val();
    var officer_only = $("#officer_only4info")
        .prop("checked");

    //クラス名を指定して新規クラスを作成
    var Information = ncmb.DataStore("Information");
    //Announcementクラスのインスタンスを作成
    var information = new Information();
    //作成したインスタンスのannouncementというフィールドに文字データを設定
    information.set("info", info)
               .set("officer_only",officer_only);
    //設定したデータをmobile backendに保存
    ons.notification.confirm({
        title: 'この内容でよろしいですか？',
        messageHTML: info+'<br>',
        buttonLabels: ['はい','いいえ'],
        primaryButtonIndex: 1,
        cancelable: true,
        callback: function(index){
            switch (index) {
                case 0:
                information.save()
                .then(function(object)
                {
                    //成功する時の処理
                    ons.notification.alert({
                        title: '確認画面',
                        messageHTML: 'お知らせを<br>作成しました。',
                        buttonLabel: 'OK',
                        callback: function(){
                            EditNavigator.popPage();
                            getinfo();
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

}

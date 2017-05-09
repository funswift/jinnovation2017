function show_par_menu(){
    ons.notification.confirm({
        title:"参加リスト",
        messageHTML:"メニュー",
        buttonLabels:["新規作成", "リスト出力", "閉じる"],
        primaryButtonIndex:2,
        cancelable: true,
        callback: function(index){
            switch(index){
                case 0:
                    goto_add_participant_form();
                    break;
                case 1:
                    exportList();
                    break;
                case 2:
                    break;
                default:
                    break;
            }
        }
    });
};


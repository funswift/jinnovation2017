//認証する時の関数を作成しています。
// //入力されたパスワードを格納する変数
// var pass;

function login(){//役員としてログインするときに呼ばれる関数
    pass = document.getElementById("password").value;
    if(pass == "1995"){
        ons.notification.alert({
            title: '認証されました',
            messageHTML: 'あなたは役員としてログインしました',
            buttonlabel: 'OK',
            callback: function(){
                document.getElementById("password").value=null;
                EditNavigator.pushPage('officer_tab.html');
            }
        });
    }else{
        ons.notification.alert({
            title: 'パスワードが違います',
            messageHTML: 'パスワードを再入力してください',
            buttonlabel: 'OK',
            callback: function(){
                document.getElementById("password").value=null;
            }
        });
    }
}

function toBeAdmin(){//編集モードへ遷移する時に呼ばれる関数
    pass = document.getElementById("admin_password").value;
    if(pass == "7620"){
        ons.notification.alert({
            title: '認証されました',
            messageHTML: '編集モードへ移行します',
            buttonlabel: 'OK',
            callback: function(){
                document.getElementById("admin_password").value=null;
                EditNavigator.pushPage('admin_tab.html');
            }
        });
    }else{
        ons.notification.alert({
            title: 'パスワードが違います',
            messageHTML: 'パスワードを再入力してください',
            buttonlabel: 'OK',
            callback: function(){
                document.getElementById("admin_password").value=null;
            }
        });
    }
}

function backToOfficer(){//編集モードから役員に戻るときに呼ばれる関数
        ons.notification.alert({
            title: '編集モード終了',
            messageHTML: '編集モードを終了しました',
            buttonlabel: 'OK',
            callback: function(){
                EditNavigator.popPage();
            }
        });
}

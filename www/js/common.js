/*
*前後スペースを削除(全角半角対応)Tabは未対応
*/
function jsTrim(val) {
    var ret = val;
    ret = ret.replace(/^[\s]*/, "");
    ret = ret.replace(/[\s]*$/, "");
    return ret;
}

/*
*前スペースを削除(全角半角対応)
*/
function jsLTrim(val) {
    var ret = val;
    ret = ret.replace(/^[\s]*/, "");
    return ret;
}

/*
*後スペースを削除(全角半角対応)
*/
function jsRTrim(val) {
    var ret = val;
    ret = ret.replace(/^[\s]*/, "");
    return ret;
}

/*
参加者の情報をlocalStorageへ保存する
 */
function setStorage() {
          var sex_for_storage;
          if($("#male").prop("checked")){
              sex_for_storage="男性";
          }else if($("#female").prop("checked")){
              sex_for_storage="女性";
          }else {
              sex_for_storage=" ";
          }
          //JSON.stringifyは、JavaScriptの各値を JSON 文字列に変換するらしい
          //ex document.getElementById("name").valueをpersonalList.Nameとして保存
        localStorage.setItem('personalList', JSON.stringify({
                        Name: document.getElementById("name").value,
                        Age: document.getElementById("age").value,
                        Sex: sex_for_storage,
                        Tell: document.getElementById("tell").value,
                        Address: document.getElementById("address").value,
                      }));
}

/*
参加者の情報をlocalStorageから呼び出す
*/
function showStorage() {
        var personalList,value;

        //JSON.parse()メソッドは JSON 文字列を解析して JavaScript のオブジェクトに変換する。
        personalList = JSON.parse(localStorage.getItem('personalList'));

        if(personalList){
            //各idに対応する値を格納
            document.getElementById("name").value = personalList.Name;
            document.getElementById("age").value = personalList.Age;
            document.getElementById("tell").value = personalList.Tell;
            document.getElementById("address").value = personalList.Address;
            if(personalList.Sex === '男性'){
                $('input[name=sex]').val(['男性']);
            }else if (personalList.Sex === '女性'){
                $('input[name=sex]').val(['女性']);
            }
        }else {}
}

/*
参加者の情報を消去するメソッド
*/
function clearStorage() {

        //clear()でも削除できるが、これだとlocalStorageの中身を全て消去してしまう
        //localStorage.clear();

        //ログの削除の確認を促す
        ons.notification.confirm({
        title: '確認',
        messageHTML:
        '参加申し込みで入力した情報の履歴が削除されますがよろしいですか？',
        buttonLabels: ['はい','いいえ'],
        primaryButtonIndex: 1,
        cancelable: true,
        callback: function(index){
            switch (index) {
                case 0:
                    //personalList(参加者の情報)だけ削除
                    localStorage.removeItem('personalList');
                    ons.notification.alert({
                        title: '確認画面',
                        messageHTML: '入力情報の履歴が削除されました。',
                        buttonLabel: 'OK',
                        callback: function(){
                        }
                    });
                break;
                default:
            }
        }
    });
}

//現在時刻の文字列を取得する関数
function GetDateString(){
    //イベントの作成日
    var dd = new Date();
    var year = dd.getFullYear();
    var month = dd.getMonth() + 1;
    var Day = dd.getDate();
    if(Day < 10){
        Day = '0' + dd.getDate();
    }else {}
    var hours = dd.getHours();
    if(hours < 10){
        hours = '0' + dd.getHours();
    }else {}
    var minutues = dd.getMinutes();
    var date = year + '-' + month + '-' + Day + ' ' + hours + ':' + minutues;
    return date;
}

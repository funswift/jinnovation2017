//mobile backendのAPIキーを設定
var ncmb = new NCMB("ac69f8ae05be198a2425d61666016a4e79bef4c05955253a197e7307d1deb414", "4bf572b3f7da4bb9c88091702f81e8cc5191641a912006f1e0ab7347376803af");
//イベント名を格納する配列
var data_event_name = new Array();
//イベントの開始日を格納する配列
var data_day = new Array();
//イベントのObjectIDを格納する配列
var data_objectId = new Array();
//Eventクラスを指定
var Data = ncmb.DataStore("Event");
//リスト表示するHTMLコードを格納する
var eventlist = "<br>";


function getlist(){
//イベント名が空白ではないものを選択
//alert("getdata内部1");
Data.notEqualTo("event_name", "")
//降順
    .order("day",true)
    .fetchAll()
    .then(function(results)
    {
        for (var i = 0; i < results.length; i++)
        {
            var object = results[i];
            data_event_name[i] = (object.event_name);
            data_day[i] = (object.day);
            data_objectId[i]=(object.objectId);
            if(data_day[i] == null){
                data_day[i] = "未定";
            }
        }
    })
    .catch(function(err)
    {
        alert("エラー");
    });
    //alert("getdata 内部2");
for (var i = 0; i < data_event_name.length; i++) {
  eventlist +=
    "<div>" +
    "<p class=\"container_form\" style=\"margin-left:30px\">" + data_day[i] + "</p>" +
    "<p class=\"container_form\" style=\"margin-left:30px\">" + data_event_name[i] +" </p>"  +
    "<div style=\"text-align:center;\">" +
    "<ons-row>" +
                "<ons-col style=\"margin:20px\"><a href=\"#\" class=\"btn btn-primary\" role=\"button\">参加者リスト</a></ons-col>" +
                "<ons-col style=\"margin:20px\"><input type = \"button\" value = \"編集\" onclick=\"EditNavigator.pushPage('eventEdit.html', {objectId:'" + data_objectId[i]+ "'})\"></ons-col>" +
            "</ons-row>" +
            "<HR>" +
    "</div>";
 };

 //alert("内部3");

    eventlist += '</ul>';
};

function setlist(){
    document.getElementById("ActiveDoc").innerHTML = eventlist;
    ons.compile(ActiveDoc);
    //alert("setdata おわる");
}
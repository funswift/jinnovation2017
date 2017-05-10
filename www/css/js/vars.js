// jsで利用する変数を宣言している場所

//mobile backendのAPIキーを設定
var ncmb = new NCMB("ac69f8ae05be198a2425d61666016a4e79bef4c05955253a197e7307d1deb414", "4bf572b3f7da4bb9c88091702f81e8cc5191641a912006f1e0ab7347376803af");

//イベントオブジェクトを格納する配列
var Events = [];

//オブジェクトをfetch(とりあえずサーバから取得したオブジェクトを保存)するための変数
var Data;

//１つのイベントオブジェクトを格納する変数
var eventObject;

//参加者オブジェクトを格納する配列
var ParticipantsArray = [];

//インフォメーションオブジェクトを格納する配列
var Informations = [];

/*取得したイベントデータのメンバ変数の格納場所*/
//前のページから渡される、選択されたイベントのobjectId格納場所
var eventID;
//IDとマッチするイベントオブジェクトをfetchし、得られたイベントオブジェクトの格納場所
var event;

//得られたイベントオブジェクトのメンバ変数の格納場所
var event_name;
var day;
var start_time;
var end_time;
var place;
var capacity;
var description;
var officer_only;

//入力されたパスワードを格納する変数
var pass;

// 参加者オブジェクトのメンバ変数s
var name;
var age;
var tell;
var address;
var sex;

//リレーション新規作成
var relation;

//参加者オブジェクトをfetchするための変数
var Participant;
//１つの参加者オブジェクトを格納する変数
var participant;

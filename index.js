$(function() {
  var userID = $('#userID').val();
  $('#questionnaire').hide();
  $('.datepicker').datepicker({dateFormat: 'yy-mm-dd'});//カレンダーから日付を選ぶ

  //回覧メンバー
  AllUserArray = $('#userlist>option');
  //はじめにqarray
  qarray[0]=[];
  qarray[0].push({question:'',check:'',nothaveto:'',stype:''});
  reloadTable();

  //ボタン======================================================
  //回覧内容確認→スタートボタン
  $('#confirm').on('click','#gocircular',function(){
    send();
  });

  function send(){
    JSON2 = $.toJSON(sheetarray);
    JSON3 = $.toJSON(memarray);
    //DB入力
    $.post(
      "DBinput.php",
      {
        "id" :JSON2,
        "mem":JSON3
      },
      function(data){
        cid=data;//DBinputで回覧IDを取得
        console.log(cid);
        console.log("before upload");
        $('#file_upload').uploadifive('upload');
        console.log("after upload");
      }
    );
    
  } //回覧開始ボタンの終わり

  $('*').click(function(){
    copytoqarray();
    if(checkflg()==1){
      $('#sendbtn').removeAttr('disabled');
    }else{
      $('#sendbtn').attr('disabled', 'disabled');//disabled属性を付与する
    }
  });

  //アンケートフォーム有効
  $('#enablequestionnaire').change(function(){
    if($("#enablequestionnaire").prop('checked')){
      $('#questionnaire').show();
    }else{
      $('#questionnaire').hide();
    }
  });

  //削除ボタン
  $('#qlist').on('click','.delq', function(e){
    copytoqarray();//現状をデータに反映させる。
    qarray.splice($(e.target).attr('delqnum'),1);
    reloadTable();
  });

  //削除ボタン
  $('#qlist').on('click','.delcan', function(e){
    copytoqarray();//現状をデータに反映させる。
    qarray[$(e.target).attr('delqnum')].splice($(e.target).attr('delnum'),1);
    reloadTable();
  });

  //質問追加(アンケート)
  $("#qlist").on('click','#addq',function(e) {
    copytoqarray();//現状をデータに反映させる。
    var n=qarray.length;
    //最後尾に空の質問を追加
    qarray[n]=[];
    qarray[n].push({question:'',check:'',nothaveto:'',stype:0});
    reloadTable();
  });

  //回答追加(アンケート)
  $("#qlist").on('click','.addask',function(e){
    copytoqarray();
    //最後尾に空の回答を追加
    qarray[$(e.target).attr('question')].push({answer:''});
    reloadTable();
  });

  //回覧キャンセル
  $("#confirm").on('click','#cancel',function(e){
    $("#hiddenwall").hide();
  });

  //回覧キャンセル
  $("#hiddenwall").click(function(){
    $("#hiddenwall").hide();
  });

  //質問、回答の数を勝手に数えて配列に入れる。質問数だけはわかっておく必要ある。
  function copytoqarray(){
    var n = qarray.length;//質問数
    var m;
    var tmpsum=0;
    var selecttype;

    for(var i=0;i<n;i++){
      m=qarray[i].length-1;
      qarray[i]=[];
      if($('#qlist input[name="selecttype'+i+'"]:radio:checked').val()=="check"){
        selecttype=1;//チェックボックスであれば1
      }else{
        selecttype=0;//ラジオボタンであれば0もしくは初期値は0
      }
      qarray[i][0]={stype:selecttype,check:$(".checkask:eq("+i+")").prop('checked'),nothaveto:$(".nothaveto:eq("+i+")").prop('checked'),question:$(".question:eq("+i+")").val()};
      for(var j=0;j<m;j++){
        qarray[i][j+1]=[];
        qarray[i][j+1]={answer:$(".answer:eq("+tmpsum+")").val()};
        tmpsum=tmpsum+1;
      }
    }
  }
  //qarray[質問番号][0][質問、チェックフラグ]
  //qarray[質問番号][1][回答1]
  //qarray[質問番号][2][回答2]

//関数////////////////////////////////////////////////////////
//アンケートを表示する。
function reloadTable(){
  JSON = $.toJSON(qarray);
  $.post(
    "helper/qlister.php",
    {
      "qarray":JSON
    },
    function(data){
      $('#qlist').html(data);
    }
  );
}




//確認画面
function confirmation(){
  $.post(
    "helper/confirm.php",
    {
      "qarray":JSON2,
      "mem":JSON3,
      "farray":JSON4
    },
    function(data){
      $('#confirm').html(data);
    }
  );
}

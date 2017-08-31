<?php
session_start();
require_once('../master/prefix.php');

//回覧メンバーに選ばれている回覧IDを検索する
$sql='select * from counter where time>="'.date('Y-m-d').'" and time<"'.date('Y-m-d',strtotime('+1 day')).'"';
$rst=selectData(DB_NAME,$sql);

//ページ数を取得
$body = '';
//本文========================================================
//検索
$body .= '<div class="pull-right form-inline" style="float:right;margin:0 0 10px 0;">';
$countofpage = ceil($cr/intval($_POST['itemsPerPage']));

$body .= '表示：<select class="form-control ppi">';
$body .= '<option value="10">10</option>';
for ($i=1; $i < 11; $i++) {
  $body .= '<option value="'.($i * 20).'"';
  if($_POST['itemsPerPage']==$i*20){
    $body .=' selected';
  }
  $body.='>'.($i * 20).'</option>';
}
$body .='</select>件　　';
$body .='<input class="finderfld form-control" type="text" value="'.$_POST['searchKey'].'">';
$body .='<button  class="finderbtn btn btn-default btn-sm">検索</button>';
$body .='<div class="clearfix"></div>';

//ページ番号
$body .='<nav class="form-inline pull-right" style="margin:10px 0 0 0;">';
$body .='<ul class="pagination" style="margin:0 0 0 0;">';
for ($i=1; $i <= $countofpage; $i++){
  $body .= '<li';
  if ($i == $_POST['page']){
    $body .= ' class="active"';
  }
  $body .= '><a class="pagebtn" name="'.$i.'">'.$i.'</a></li>';
}
$body .= '</ul>';
$body .= '</nav>';
$body .= '</div>';

//表
$body .= '<table class="table table-condensed table-bordered">';
$body .= '<th>電力</th><th>電圧</th><th>電流</th><th>周波数</th><tr>';
for($i=0;$i<count($rst);$i++){
 // for($j=0;$j<4;$j++){
    $body .= '<td>'.$rst[$i]['count'].'</td>';
//  }
  $body .= '<tr>';
}

$body .= '</table>';

echo $body;


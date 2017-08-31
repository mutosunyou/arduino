<?php

require_once('master/prefix.php');
$sql='insert into status values("",'.$_GET["current"].','.$_GET["voltage"].','.$_GET["power"].','.$_GET["freq"].',"'.date('Y-m-d H:i:s').'")';
deleteFrom('arduino',$sql);


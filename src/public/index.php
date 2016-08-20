<?php 
	$gpath = substr(getenv('SCRIPT_FILENAME'), 0, -17);
	include_once('../lib/smarty/libs/Smarty.class.php');
	include_once('../inc/base.php');
	include_once('../inc/prog.php');
	include_once('../config/localconf.php');
	include_once('../inc/mySmarty.php');
	
	$prog = new prog();

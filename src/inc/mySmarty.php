<?php
class mySmarty extends Smarty 
{
	public function __construct()
	{
		global $gpath;
		//$this->Smarty();
		parent::__construct();
		//$this->plugins_dir[] = '../lib/smarty/smarty_plugins';
		$this->template_dir = '../tpl';
		$this->compile_dir = $gpath.'/tmp/templates_c';
		$this->cache_dir = $gpath.'/tmp/cache';
		$this->config_dir = $gpath.'/tmp/configs';
	}
}
?>
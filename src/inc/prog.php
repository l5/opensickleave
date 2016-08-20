<?php
class prog extends base {

	public function initClass() {
		$this->getGetParams();


		if (isset($_GET['form']) || isset($_POST['form'])) {
			if (isset($_GET['form'])) {
				$form = $_GET;
			} else {
				$form = $_POST;
			}
			if ($form['form'] == 'sickform') {
				$this->checkSickLeaveForm($form, $err);
				if (count($err) == 0) {
					$this->sendSickLeaveMail($form, $err);
				}
			}
			if (count($err) > 0) {
				$answer = array(0 => 'ERROR', 1 => $err);
			} else {
				$answer = array(0 => 'SUCCESS');
			}
			echo json_encode($answer);
		} else {
			$this->printPage();
		}
	}

	private function getGetParams() {
	}

	private function printPage() {
		global $glob;


		foreach ($glob['allBosses'] as $xbossid => $xboss) {
			$myBoss[$xbossid] = $xboss[0];
		}

		$sm = new mySmarty();
		$sm->assign('ps', Array());
		$sm->assign('bosses', $myBoss);
		$xout = $sm->fetch('index.tpl');
		echo $xout;
	}

	private function checkSickLeaveForm(&$ps, &$err) {
		global $glob;
		if (strlen($ps['email']) < 5) {
			$err['email'][] = 'Please type a valid email address.';
		}
		if (strlen($ps['firstname']) < 3) {
			$err['firstname'][] = 'Please type a valid first name.';
		}
		if (strlen($ps['lastname']) < 3) {
			$err['lastname'][] = 'Please type a valid last name.';
		}
		if ($ps['boss'] < 1) {
			$err['boss'][] = 'Please choose your boss.';
		}
		if (strlen($ps['newstatus']) < 1) {
			$err['newstatus'][] = 'Please choose your new status.';
		}

		$alloweddomains = explode(',', $glob['alloweddomains']);
		$mailparts = explode('@', $ps['email']);
		$mailAddressAllowed = false;
		foreach ($alloweddomains as $dom) {
			if (strlen(trim($mailparts[1])) > 1 && trim($mailparts[1]) == trim($dom)) {
				$mailAddressAllowed = true;
			}
		}
		if ($mailAddressAllowed == false) {
			$err['email'][] = 'Your email address is not accepted ('.$mailparts[1].')';
		}
	}

	private function sendSickLeaveMail(&$form, &$err) {
		global $glob;
		require_once('../lib/phpmailer/class.phpmailer.php');

		$mail = new PHPMailer();

		$sm = new mySmarty();
		$sm->assign('ps', $form);
		$sm->assign('bosses', $glob['allBosses']);
		$body = $sm->fetch('confirmationmail.tpl');

		$body = preg_replace('/[\\\]/i','',$body);

		$mail->AddReplyTo($glob['sendermail'], $glob['sendername']);
		$mail->SetFrom($glob['sendermail'], $glob['sendername']);
		$mail->CharSet = 'UTF-8';
		$ccrecipients = explode(',', $glob['mailcc']);
		if (is_array($ccrecipients)) {
			foreach ($ccrecipients as $recip) {
				$mail->AddCC(trim($recip));
			}
		}
		$mail->AddCC($glob['allBosses'][$form['boss']][1]);

		$address = $form['email'];
		$mail->AddAddress($address, $form['firstname'].' '.$form['lastname']);

		$mail->Subject    = "Sick Leave Notice";

		$mail->AltBody    = "To view the message, please use an HTML compatible email viewer!"; // optional, comment out and test

		$mail->MsgHTML($body);

		if(!$mail->Send()) {
			$err['mailer'][] = "Mailer Error: " . $mail->ErrorInfo;
		}
	}
}
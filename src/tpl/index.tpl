<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=2.0, user-scalable=yes" />

<link media="Screen" href="css/style.css" type="text/css"
	rel="stylesheet" />
<link
	media="handheld, only screen and (max-width: 480px), only screen and (max-device-width: 480px)"
	href="css/mobile.css" type="text/css" rel="stylesheet" />
<!--[if IEMobile]>
<link rel="stylesheet" type="text/css" href="mobile.css" media="screen" />
<![endif]-->
<link type="text/css"
	href="css/le-frog/jquery-ui-1.8.21.custom.css" rel="Stylesheet" />
<script src="js/jquery-1.7.2.min.js" type="text/javascript"></script>
<script src="js/jquery-ui-1.8.21.custom.min.js" type="text/javascript"></script>
<script src="js/sickleave.js" type="text/javascript"></script>
<title>SICKLEAVE</title>
</head>
<body>
	<div id="page">
		<div id="pageForm">
			<h1>SICK LEAVE Notification</h1>

			<form id="sickform">
				<div id="bubbleStatus" class="bubble" style="display: block;">
					<em>1.</em> Please choose your new status - do you want to inform
					about your sick or well again date?<br /> <br />
				</div>
				<div class="clearer">&nbsp;</div>

				<div id="areaStatus" style="background-color: #cfc;" class="area">
					<fieldset id="fsstatus">
						<legend>New status</legend>
						<input type="hidden" name="form" value="sickform" />
						
							<div id="statusul">
								<div id="statussick" class="statusbutton">
									I'm sick!<br />:-(
								</div>
								<div id="statuswell" class="statusbutton">
									I'm well again!<br /> :-)
								</div>
								
							</div>
							<div class="clearer">&nbsp;</div>
				<div id="statusreaction"></div>			
				<div class="clearer">&nbsp;</div>

					</fieldset>

				</div>

				<input type="hidden" name="newstatus" id="newstatus" value="" />

				<div id="bubbleDates" class="bubble">
					<em>2.</em> Please type the first and last day of your sickness!<br />
					<br /> <br />
				</div>
				<div class="clearer">&nbsp;</div>
				<div id="areaDates" class="area">
					<fieldset id="fsdates">
						<legend>Dates</legend>
						<label for="fdatefrom">First day of sickness</label><input
							name="datefrom" id="fdatefrom" value="{$ps.datefrom}" maxlength="9"/> <label
							for="fdateuntil">Last day of sickness</label><input
							name="dateuntil" id="fdateuntil" value="{$ps.dateuntil}" maxlength="9"/>
					</fieldset>
				</div>

				<div id="bubblePersonal" class="bubble">
					<em>3.</em> Please fill in your personal data! <br /> <br /> <br />
				</div>
				<div class="clearer">&nbsp;</div>
				<div id="areaPersonal" class="area">

					<fieldset id="fspersonal">
						<legend>Personal data</legend>
						<label for="femail">E-Mail</label> <input name="email" id="femail"
							value="{$ps.email}" /> <label for="ffirstname">First
							Name</label> <input name="firstname" id="ffirstname"
							value="{$ps.firstname}" /> <label for="flastname">Last
							Name</label> 
							
							<input name="lastname" id="flastname" value="{$ps.lastname}" />
						<label for="fboss">Boss</label> 
						<select name="boss" id="fboss">{html_options
							id=fboss options=$bosses}
						</select> <label for="fcomment">Comments</label>
						<textarea id="fcomment" name="comment">{$ps.comment}</textarea>
					</fieldset>
				</div>

				<p>
					Personal data will <strong>not</strong> be stored on the server.
				</p>
				<br /> <br /> <input type="submit" value="Submit message" />
			</form>
		</div>

		<div id="pageWait">
			<h1>Please wait ...</h1>
			<p>Your data is being transferred in the datacenter.</p>
		</div>

		<div id="pageThankyou">
			<h1>Thank you for your message!</h1>
			<p>Please doublecheck the data in the confirmation e-mail that
				you recently received. If you do not receive a confirmation e-mail
				within 10 minutes, your sickleave-message probably failed to be
				sent.</p>
		</div>
	</div>
	<div id="foot">
		Powered by <a href="http://www.opensickleave.com">OpenSickLeave</a>
	</div>
</body>
</html>
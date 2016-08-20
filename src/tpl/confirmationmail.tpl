<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<style type="text/css">
	* {
		font-family: 'Arial', sans-serif;
	}
</style>

<title>SICKLEAVE</title>
</head>
<body>
	{if $ps.newstatus == 'SICK'}
	<h1>SICK LEAVE NOTE</h1>
	{else}
	<h1>WELL-AGAIN NOTE</h1>
	{/if}
	<table>
	<tr><td>Name</td><td>{$ps.firstname} {$ps.lastname}</td></tr>
	<tr><td>E-Mail</td><td><a href="mailto:{$ps.email}">{$ps.email}</a></td></tr>
	<tr><td>New Status</td><td>{$ps.newstatus}</td></tr>
	<tr><td>First day of sickness</td><td>{$ps.datefrom}</td></tr>
	<tr><td>Last day of sickness</td><td>{$ps.dateuntil}</td></tr>
	<tr><td>Boss</td><td>{$bosses[$ps.boss][0]}</td></tr>
	<tr><td>Comment</td><td>{$ps.comment}</td></tr>
	</table>

</body>
</html>
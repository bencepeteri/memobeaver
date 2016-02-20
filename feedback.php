<?php
	if (isset($_POST["submit"])) {
		$name = $_POST['name'];
		$email = $_POST['email'];
		$message = $_POST['message'];
		$human = intval($_POST['human']);
		$from = 'Memobeaver Feedback Form'; 
		$to = 'info@memobeaver.com'; 
		$subject = 'Message from Feedback Form ';
		
		$body ="From: $name\n E-Mail: $email\n Message:\n $message";
		// Check if name has been entered
		if (!$_POST['name']) {
			$errName = 'Please enter your name';
		}
		
		// Check if email has been entered and is valid
		if (!$_POST['email'] || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
			$errEmail = 'Please enter a valid email address';
		}
		
		//Check if message has been entered
		if (!$_POST['message']) {
			$errMessage = 'Please enter your message';
		}
		//Check if simple anti-bot test is correct
		if ($human !== 6	) {
			$errHuman = 'Your anti-spam is incorrect';
		}
// If there are no errors, send the email
if (!$errName && !$errEmail && !$errMessage && !$errHuman) {
	if (mail ($to, $subject, $body, $from)) {
		$result='<div class="alert alert-success">Thank You! I will be in touch</div>';
	} else {
		$result='<div class="alert alert-danger">Sorry there was an error sending your message. Please try again later.</div>';
	}
}
	}
?>
<!DOCTYPE html>
<html>
<head>
<title>Send Feedback - Memobeaver</title>
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width = device-width, initial-scale = 1">
<!-- Import Statements -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css">
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" />
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
<link rel="icon" 
      href="favicon.ico">

<!-- End Of Import Statements -->
<script>
$(function(){
$('.headerlink').css("color", "white");	
});
</script>
<style>
.container-fluid {
	background-color: rgba(0, 204, 204, 0.7);
	
}
.navbar-brand a {
	color: white;
}
body {
	background-color: rgba(102,255,102,0.25)
}
h1 {
	font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
	font-weight: bolder;
	margin-left: 2%;
}
.jumbotron{
	background-color: #3CA331;
	padding: 1%;
	margin-left: 1%;
	margin-right: 1%;
	
}
#footer {
	margin-top: 10%;
	text-align: center;
}
</style>
</head>
<body>
<div class="container">
<!-- NAVBAR -->
<div class="navbar navbar-default">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-responsive-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
				  
            <a class="navbar-brand headerlink" href="index.html">Memobeaver<sup>BETA</sup></a>
        </div>
        <div class="navbar-collapse collapse navbar-responsive-collapse">
            <ul class="nav navbar-nav">
                <li class="dropdown" id="theDropDwn">
                    <a href="javascript:void(0)" data-target="#" class="dropdown-toggle headerlink" data-toggle="dropdown">
					About<b class="caret"></b></a>
                        <ul class="dropdown-menu">
							<li><a class="" href="aboutme.html">Me, the developer</a></li>
							<li><a class="" href="howitworks.html">How it works</a></li>
							<li><a class="" href="licensing.html">Licensing</a></li>
                        <!--<li class="divider"></li>
                         <li class="dropdown-header">Other Products</li>
                        <li><a href="javascript:void(0)">They'll come here in</a></li>
                        <li><a href="javascript:void(0)">the future</a></li> -->
						</ul>
                </li>
            </ul>
                  
            <ul class="nav navbar-nav navbar-right">
                <li><a class="headerlink" href="donate.html">Donate<div class="ripple-container "></div></a></li>
                <li class="dropdown">
                    <a href="javascript:void(0)" data-target="#" class="dropdown-toggle headerlink" data-toggle="dropdown">
					Contact<b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li><a class="" href="feedback.php">Send Feedback</a></li>
                        <li><a class="" href="mailto:info@memobeaver.com">Email</a></li>
                        <li><a class="" href="https://twitter.com/memobeaver_">Twitter</a></li>
						<li><a class="" href="http://on.fb.me/20WqEMd">Facebook</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</div>
<!-- END Of NAVBAR -->

<h1 class="page-header text-center">Send Feedback</h1>
<form class="form-horizontal" role="form" method="post" action="feedback.php">
	<div class="form-group">
		<label for="name" class="col-sm-2 control-label">Name</label>
			<div class="col-sm-10">
				<input type="text" class="form-control" id="name" name="name" placeholder="First & Last Name" value="<?php echo htmlspecialchars($_POST['name']); ?>">
				<?php echo "<p class='text-danger'>$errName</p>";?>
			</div>
	</div>
	<div class="form-group">
		<label for="email" class="col-sm-2 control-label">Email</label>
			<div class="col-sm-10">
				<input type="email" class="form-control" id="email" name="email" placeholder="example@domain.com" value="<?php echo htmlspecialchars($_POST['email']); ?>">
				<?php echo "<p class='text-danger'>$errEmail</p>";?>
			</div>
	</div>
	<div class="form-group">
		<label for="message" class="col-sm-2 control-label">Message</label>
		<div class="col-sm-10">
			<textarea class="form-control" rows="4" name="message"><?php echo htmlspecialchars($_POST['message']);?></textarea>
			<?php echo "<p class='text-danger'>$errMessage</p>";?>
		</div>
	</div>
	<div class="form-group">
		<label for="human" class="col-sm-2 control-label">9 - 7 + 4 = ?</label>
		<div class="col-sm-10">
			<input type="text" class="form-control" id="human" name="human" placeholder="Your Answer">
			<?php echo "<p class='text-danger'>$errHuman</p>";?>
		</div>
	</div>
	<div class="form-group">
		<div class="col-sm-10 col-sm-offset-2">
			<input id="submit" name="submit" type="submit" value="Send" class="btn btn-primary">
		</div>
	</div>
	<div class="form-group">
		<div class="col-sm-10 col-sm-offset-2">
		<?php echo $result; ?>	
		</div>
	</div>
</form> 
</div>	
</body>
</html>
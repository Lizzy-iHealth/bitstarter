$(document).ready(function(){
    //   alert("Document Ready!");


    $("#subform").submit(function(){
	var email=$("#user_email").val();
	var qstring="user_email="+email;
	$.ajax({
	    url:"subscribe",
	    data:qstring,
	    success:function(){
		$("#submit_btn").replaceWith("<a href=\"http://vguqin.herokuapp.com\" id=\"success_btn\" class=\"btn btn-success btn-large\">Try Now</a>");
	    }
	});
	return false;
    });
});

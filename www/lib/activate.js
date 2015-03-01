$(function(){
/* MOBILE APP ADD OFFICER */
    $("#app_add_officer").on("click", function(){
        
        var id = $("#id").val();
        var officer_email = $("#officer_email").val();
        var officer_password = $("#officer_password").val();
        var officer_telephone = $("#officer_telephone").val();
        
        
        $("#app_add_officer").hide();
        $.ajax({
            url: __URL__+"proc/app_add_officer.php",
            data: {
                officer_email: officer_email,
                officer_password: officer_password,
                officer_telephone: officer_telephone,
                id:id
            },
            dataType: "jsonp",
            success: function( resp ){
                
                if( (resp.response) === "SUCCESS" ){
                    
                    localStorage.setItem("userID", id );
		           window.location = "panel.html";                    
			

                }else{
                    
                    $("#app_add_officer").show();
                    
                    alert( resp.response );
                    intel.xdk.notification.beep(2);
                    intel.xdk.notification.vibrate(300, 2);
                    intel.xdk.notification.alert( resp.data.message, "ERROR", "Try Again" );
                    
                }
                
            }
        });
        
    });
    /* EO MOBILE APP ADD OFFICER */
});
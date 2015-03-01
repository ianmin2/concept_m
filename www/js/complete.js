 
    
   
       
function doUpdate(){

        /* KEEP THE USER BUSY WITH AN ANIMATION */
            $("body").css("background","white");
            $("body").html("<br><br><img src='images/loading.gif' height='80%' width='100%'></div>");
       
        
        /* POST AN AJAX REQUEST FOR THE LATEST UPDATE OF FILES */
        $.ajax({
        data:{},
        dataType: "jsonp", url: __URL ,
            success: function(resp){
        
                if(resp["response"] === "SUCCESS"){

		        /* If the server returned a useable response */
		        myData = resp["data"]["message"];
		        $newData = '';

		        /* STORE THE FILES IN LOCALSTORAGE */
		        for (person in myData) {

		            persData = { id: myData[person].identification, name: myData[person].name, bal: myData[person].balance };
		            localStorage.setItem(myData[person].code, JSON.stringify(persData));

		        }

		        x = new Date();
		        now = x.getMonth() + "/" + x.getDate() + "/" + x.getFullYear() + " " + x.getHours() + ":" + x.getMinutes()
		        localStorage.setItem('sync', now);

		        //console.log(resp["data"]["message"])

		        /* GIVE THE USER A "Good to go!" MESSAGE */
		        setTimeout(function () { navigator.notification.vibrate(500); }, 500);
		        setTimeout(function () { location.reload() }, 100);

                    
                }else{
            /* If the server returned an error */  
                   
                   intel.xdk.notification.alert("Failed to receive an authentic response from server\nThe records could not be updated\n\nPlease try again!","Server Response Error","OK");
                
                    /* Display the error */
                   intel.xdk.notification.alert( resp["data"]["message"], "Server Response Message","CANCEL");
                   setTimeout(function () { location.reload() }, 100);
                    
                
                }
        
            }
        });
}


function updateIt(){

    if(intel.xdk.device.connection != "none"){

    /* AN INTERNET CONNECTION IS AVAILABLE */
	doUpdate();

    }else{

        intel.xdk.notification.alert("This app could not establish an internet connection.<br>Please connect to the internet and try again!","Web connection Error","OK");   
	setTimeout(function () { location.reload() }, 100);
    }

}  

   

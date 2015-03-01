/* File sync source! */
__URL = "http://41.89.162.150/node/scanner/code/students.php";


document.addEventListener("intel.xdk.device.ready",onDeviceReadyHideStatus,false);

function onDeviceReadyHideStatus(evt){
	
	/* Run application in fullscreen mode */
    intel.xdk.device.hideStatusBar();
    
    /* Prevent Application From sleeping */
    intel.xdk.device.managePower(true,false);
    
} 



/* Data synchronize function */
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
            
            //CLEAR THE CURRENTLY STORED DATA FROM THE DEVICE
            localStorage.clear();
                
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
	
	    intel.xdk.notification.alert("This app could not establish an internet connection. Please connect to the internet and try again!","Web connection Error","OK");   
	setTimeout(function () { location.reload() }, 100);
	}

}  


/* Barcode Scan Handler  */
document.addEventListener("intel.xdk.device.barcode.scan", scanned, false);

function scanned(evt) {

   // intel.xdk.notification.beep(1);
    if (evt.type == "intel.xdk.device.barcode.scan") {

        if (evt.success == true) {
            /* CHECK THE LOCALSTORAGE FOR A MATCHING KEY */
            var data = evt.codedata;
            
           //alert(data);
            if (JSON.parse(localStorage.getItem(data)) == null) {
                /* IF KEY DOES NOT EXIST, NOTIFY THE APPLICATION USER */
                navigator.notification.alert(
                         "That Code does not exist in the app data",
                          "",
                         'Error!',
                         'Ok'
                     );
                navigator.notification.vibrate(300);
                setTimeout(function () { navigator.notification.vibrate(300); }, 500);

            } else {
                /* IF KEY EXISTS, CONTINUE TO ANALYSE IT */
                localStorage.setItem("current", data );

               window.location = "display.html";
                

            }

        } else {

            //scan cancelled

        }

    }

}



    

        

            /* DISPLAY THE RELEVANT INFORMATION TO THE USER */


        


/* DATA CLEAR HANDLER */
function clearData(){
    
    /* ASK THE USER IF HE?SHE WANTS TO TAKE THE ACTION */
  
        navigator.notification.confirm(
            'Do you really want to clear all data?', 
             doClear,            
            'Confirm Request', 
            'Yes , No'         
        );
    
    
    
}
 

/* DATA CLEAR ENUMERATOR */
 function doClear(buttonIndex) {
       
     if( buttonIndex == 1 ){
         
         /* CLEAR ALL THE DATA */
        localStorage.clear();
         
        /* SET UP A SYNC KEY IN LOCALSTORAGE [for the last sync] */
        localStorage.setItem("sync", "<code>N/A</code>")
        /* GIVE A GOOD TO GO MESSAGE */
        intel.xdk.notification.alert( "Data successfully cleared", "Success","OK");
         setTimeout(function () { navigator.notification.vibrate(500); }, 500);
         $(function () { location.reload() });

     }
     
 }


/* Exit app handler */
 function exitApp() {
    
     if (navigator.app) {
         navigator.app.exitApp();
     }
     else if (navigator.device) {
         navigator.device.exitApp();
     }

 }

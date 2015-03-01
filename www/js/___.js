/* Run application in fullscreen mode */
    document.addEventListener("intel.xdk.device.ready",onDeviceReadyHideStatus,false);
    function onDeviceReadyHideStatus(evt)
    {
    intel.xdk.device.hideStatusBar();
    } 



/* Prevent Application From sleeping */
    intel.xdk.device.managePower(true,false);


/* Handle device display and diable auto-rotate*/
    intel.xdk.device.setRotateOrientation("portrait");
    intel.xdk.device.setAutoRotate(false);



/* Data Synchronize Handler */ 
document.addEventListener("intel.xdk.device.connection.update",function(){  
    
    /* CHECK FOR AN INTERNET CONNECTION AND PROCEED ONLY IF ONE IS ESTABLISHED*/
    if(intel.xdk.device.connection != "none"){
       
        /* KEEP THE USER BUSY WITH AN ANIMATION */
        
        $(function(){
        
            $("body").css("background","white");
            $("body").html("<br><br><img src='images/loading.gif' height='80%' width='100%'></div>");
        
        });
        
        
        /* POST AN AJAX REQUEST FOR THE LATEST UPDATE OF FILES */
        $.ajax({
            
            data:{ method: "getData"},
            url:"http://www.ianmin2.tk/htmldroid/index.php",
            dataType: "jsonp",
            success: function(resp){
                
        /* UPON A SUCCESSFULL REQUEST, CLEAR THE CURRENT DATA */
               console.log(resp);;
                if(resp.response === "SUCCESS"){
             /* If the server returned a useable response */ 
                     
                console.log(resp.response);
                    intel.xdk.notification.alert( resp, "Server Response Message","CANCEL");
                    /* STORE THE FILES IN LOCALSTORAGE */
        
                
                    /* RID THE SCREEN OF THE ANIMATION */


                    /* GIVE THE USER A "Good to go!" MESSAGE */
                    
                    
                }else{   
                    
                    /*VIBRATE TWICE*/
                    intel.xdk.notification.vibrate();
                    intel.xdk.notification.vibrate();
                    
                    intel.xdk.notification.alert( resp, "Server Response Message","CANCEL");
            /* If the server returned an error */  
                    intel.xdk.notification.alert("Failed to receive an authentic response from server\nThe records could not be updated\n\nPlease try again!","Server Response Error","OK");
                
                    /* Display the error */
                   intel.xdk.notification.alert( response["response"], "Server Response Message","CANCEL");                    
                    
                
                }
            }
        });
        
    /* NOTIFY THE USER THAT AN INTERNET CONNECTION IS REQUIRED FOR THIS FEATURE */
    }else{

        intel.xdk.notification.alert("This app could not establish an internet connection.<br>Please connect to the internet and try again!","Web connection Error","OK");   

    }
                
},false);



/* Barcode Scan Handler  */
    document.addEventListener("intel.xdk.device.barcode.scan", barcodeScanned, false);
			            
    function barcodeScanned(evt) {
        
        /* NOTIFY THE USER OF DETECTED CODE */
        //intel.xdk.notification.beep(1);
         intel.xdk.notification.vibrate();
        
        if (evt.type == "intel.xdk.device.barcode.scan") {
            
            if (evt.success === true) {
                
                var url = evt.codedata;
                
                intel.xdk.device.showRemoteSite(url, 264, 0,56, 48)
                
                /* CHECK THE LOCALSTORAGE FOR A MATCHING KEY */
                $data = JSON.parse(localStorage.getItem());

                /* IF KEY EXISTS, CONTINUE TO ANALYSE IT */

                    /* DISPLAY THE RELEVANT INFORMATION TO THE USER */


                /* IF KEY DOES NOT EXIST, NOTIFY THE APPLICATION USER */

            } else {
              //scan cancelled
                intel.xdk.notification.alert("Could not identify the scanned code!<br><br>Please try again!","Web connection Error","OK"); 
                
            }
        }

    }
    



/* Back Button Handler */  
    document.addEventListener("intel.xdk.device.ready",function() {

        //start grabbing the Android hardware back button
        intel.xdk.device.addVirtualPage(); 

    },false);


    document.addEventListener("intel.xdk.device.hardware.back", function() {

        window.location = "index.html";
        //continue to grab the back button
        intel.xdk.device.addVirtualPage(); 

       

    }, false);   

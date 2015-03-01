/* Handle QR Capture  */
function panelQRCapture( evt) {
    
   
    if (evt.type == "intel.xdk.device.barcode.scan") {

        if (evt.success == true) {
           
            var data = evt.codedata;
            intel.xdk.notification.beep(1)
           /* Do the data analysis here!! */
            $path = localStorage.getItem("requestDomain");
            
            switch ( $path ){
            
                    case "vehicles":
                    /* Fetch the data concerning the relevant vehicle   */
                    break;
                    
                    case "drivers":
                    /* Fetch the data concerning the relevant driver */
                    break;
                    
                    case "notifications":
                    /* Fetch the relevant officer notifications */
                    break;
                    
            }
            
        } else {

            /* Handle a failed scan attempt */
               navigator.notification.alert(
                         "Access Request Cancelled",
                          "",
                         'Error!',
                         'Ok'
                     );
                navigator.notification.vibrate(300);
                setTimeout(function () { navigator.notification.vibrate(300); }, 500);
            
        }

    }

}



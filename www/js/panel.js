/* Handle QR Capture  */
function panelQRCapture( evt) {
    
   
    if (evt.type == "intel.xdk.device.barcode.scan") {

        if (evt.success == true) {
           
            var data = evt.codedata;
            intel.xdk.notification.beep(1)
           /* Do the data analysis here!! */
            $path = localStorage.getItem("requestDomain");
            
            //console.log( "path says: " + $path );
            
            switch ( $path ){
            
                    case "vehicles":
                        /* Fetch the data concerning the relevant vehicle   */
                        $({
                            url: __URL__+"proc/police_panel.php",
                            data: {},
                            dataType: "jsonp",
                            success: function ( resp ){
                                
                                r = JSON.stringify( resp );
                                $("#body").html( r );
                                
                            }
                        });
                    break;
                    
                    case "drivers":
                        /* Fetch the data concerning the relevant driver */
                    
                    break;
                    
                    case "notifications":
                        /* Fetch the relevant officer notifications */
                    
                    break;
                    
                    default:
                    
                        /* request boo boo */
                    
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



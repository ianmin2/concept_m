/* Prevent the application from sleeping and run it in fullscreen */
document.addEventListener("intel.xdk.device.ready",onDeviceReadyHideStatus,false);

function onDeviceReadyHideStatus(evt){
	
	/* Run application in fullscreen mode */
    intel.xdk.device.hideStatusBar();
    
    /* Prevent Application From sleeping */
    intel.xdk.device.managePower(true,false);
    
}




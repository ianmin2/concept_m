var id = localStorage.getItem('userID');
if( id === undefined || !id ){
    window.location = "index.html";
}

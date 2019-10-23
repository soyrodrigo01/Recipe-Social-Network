    function PreviewImage() {
        var oFReader = new FileReader();
        oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);

        oFReader.onload = function (oFREvent) {
            document.getElementById("uploadPreview").src = oFREvent.target.result;
        };
    };
    
function showmessage(){
    var x = document.getElementById("successMessage");
    
    if(x.style.display === "none"){
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function on(overlayID) {
    document.getElementById(overlayID).style.display = "block";
}

function off(overlayID) {
    document.getElementById(overlayID).style.display = "none";
}
jQuery(function($) {
    $('form[data-async]').on('submit', function(event) {
        
    const form = document.getElementById( "upload_subject" );

        var $form = $(this);
        var $target = $($form.attr('data-target'));
       
        var ajax = new XMLHttpRequest();
        var file = _("id_file").files[0];

        alert(file.name+" | "+file.size+" | "+file.type);

        var formdata = new FormData(form);


        var ajax = new XMLHttpRequest();
        ajax.upload.addEventListener("progress", progressHandler, false);
        ajax.addEventListener("load", completeHandler, false);
        ajax.addEventListener("error", errorHandler, false);
        ajax.addEventListener("abort", abortHandler, false);
        ajax.open("POST", $form.attr('action')); 

        ajax.send(formdata);

    });;

});



function progressHandler(event) {
  _("loaded_n_total").innerHTML = "Uploaded " + event.loaded + " bytes of " + event.total;
  var percent = (event.loaded / event.total) * 100;
  _("progressBar").value = Math.round(percent);
  _("status").innerHTML = Math.round(percent) + "% uploaded... please wait";
}

function completeHandler(event) {
  _("status").innerHTML = event.target.responseText;
  _("progressBar").value = 0; //wil clear progress bar after successful upload
  window.location.reload();
}

function errorHandler(event) {
  _("status").innerHTML = "Upload Failed";
}

function abortHandler(event) {
  _("status").innerHTML = "Upload Aborted";
}

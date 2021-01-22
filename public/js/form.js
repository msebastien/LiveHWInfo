$(document).ready(function () {

    // Load Data
    retrieveData()

    //------------------------------------------------------
    //  FORM BUTTON CLICK EVENT
    //------------------------------------------------------ 
    $('#applyButton').click(function() {
        sendData()
    })

    //-----------------------------------------------------
    //  AJAX GET REQUEST
    //-----------------------------------------------------
    function retrieveData() {
        $.ajax({
            type: 'GET',
            url: '/settings',
            dataType: 'json',
            success: onGetDataSuccess,
            error: onGetDataError
        })
    }

    function onGetDataSuccess(response) {
        $('#checkboxEnable').prop("checked", response.enabled)
        $('#textInterval').val(response.interval)
        $('#textHostname').val(response.hostname)
        $('#textDatabase').val(response.db)
        $('#textDbHost').val(response.db_host)
        $('#textDbPort').val(response.db_port)
        $('#textDbUsername').val(response.db_username)
        $('#textDbPassword').val(response.db_password)
    }

    function onGetDataError(jqXHR, textStatus, errorThrown) {
        alert(textStatus + ": " + errorThrown)
    }
    //---------------------------------------------------

    //-----------------------------------------------------
    //  AJAX POST REQUEST
    //-----------------------------------------------------
    function sendData() {
        $.ajax({
            type: 'POST',
            url: '/settings',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                enabled: $('#checkboxEnable').prop('checked'),
                interval: parseInt($('#textInterval').val()),
                hostname: $('#textHostname').val(),
                db: $('#textDatabase').val(),
                db_host: $('#textDbHost').val(),
                db_port: parseInt($('#textDbPort').val()),
                db_username: $('#textDbUsername').val(),
                db_password: $('#textDbPassword').val()
            }),
            success: onPostDataSuccess,
            error: onPostDataError
        })
    }

    function onPostDataSuccess() {
        alert("Settings saved!")
    }

    function onPostDataError(jqXHR, textStatus, errorThrown) {
        alert(textStatus + ": " + errorThrown)
    }

})
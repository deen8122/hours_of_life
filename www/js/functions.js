var url = "http://lt.bombur.ru";
function motivation_get() {
    var data = {};
    data.day = window.localStorage.getItem("day", 0);
    data.month = window.localStorage.getItem("month", 0);
    data.year_death = window.localStorage.getItem("year_death", 0);
    data.year = window.localStorage.getItem("year", 0);
    data.gender = window.localStorage.getItem("gender", "");
    $.ajax({type: 'POST', data: data,
        url: url,
        success: function (data) {
            //alert('1')
            console.log(data);
            if (data != "") {
                $('#main-clock').css('top', 0).css('margin-top', 0);
                $('#main-news').html(data);
            }
        },
        error: function () {

        }
    });

}

function showMenu() {
    ShowLayer('menu');
    SucessShow();
}
function ShowLayer(cmd) {
    var l = $('#' + cmd);

    if (l.data('pos') === 'right') {
        console.log(l.data('pos'));
        l.css('right', 0);
    } else {
        l.css('left', 0);
    }
}


function alert2(title, conf) {
    console.log('alert2');
    $('#alert').attr('class', '');
    $('#alert').addClass('layer');
//layer-theme-4
    if (conf != undefined) {
        $('#alert').addClass('layer-theme-' + conf.theme);
    } else {

        $('#alert').addClass('layer-theme-4');
    }
    ShowLayer('alert');
    $('#alert_text').html(title);
    SucessShow();
}


function SucessShow() {
    $('.layer-succes1').css('right', 0);
    // $('.layer-succes2').css('bottom', 0);
    //   $('.layer-succes3').css('left', 0);
    //  $('.layer-succes4').css('top', 0);


}
function SucessHide() {

    $('.layer-succes1').css('right', '100%');
    $('.layer-succes2').css('bottom', '100%');
    $('.layer-succes3').css('left', '100%');
    $('.layer-succes4').css('top', '100%');



}


function ShowNotification() {
    cordova.plugins.notification.local.schedule({
        title: 'Ваша жизнь короче на 1 день!',
        text: 'Время действовать, улучшать, творить добро!',
        led: {color: '#FF00FF', on: 500, off: 500},
        vibrate: true,
        foreground: true
    });
}

function NotificationSet() {
    //  ShowNotification();
 //if (typeof cordova === 'undefined')return;
    cordova.plugins.notification.local.schedule({
        title: 'Ваша жизнь короче на 1 день!',
        text: 'Время действовать, улучшать, творить добро!',
        led: {color: '#FF00FF', on: 500, off: 500},
        vibrate: true,
        foreground: true,
        trigger: {every: {hour: 10, minute: 44},count:1000}
    });
}



function testInternet(win, fail) {
    $.get("https://www.google.com/blank.html").done(win).fail(fail);
}
function ExitApp() {
    if (typeof cordova !== 'undefined') {
        if (navigator.app) {
            navigator.app.exitApp();
        } else if (navigator.device) {
            navigator.device.exitApp();
        }
    } else {
        window.close();
        $timeout(function () {
            self.showCloseMessage = true;  //since the browser can't be closed (otherwise this line would never run), ask the user to close the window
        });
    }
    //navigator.app.exitApp();
}


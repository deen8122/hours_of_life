var manLifeYear = 63;
var womanLifeYear = 74;



document.addEventListener('deviceready', onDeviceReady, false);
// Cordova is loaded and it is now safe to make calls Cordova methods
function onDeviceReady() {
    app.initialize();

}
$(document).on("pageshow", "#main", function (event) {
    app.initialize();

});
$(document).on("pagebeforeshow", "#form", function (event) {
    var day = window.localStorage.getItem("day", 0);
    var month = window.localStorage.getItem("month", 0);
    var year = window.localStorage.getItem("year", 0);
    var gender = window.localStorage.getItem("gender", "");
    
    
    $('#day').val(day);
    $('#month').val(month);
    $('#year').val(year);
    $("input[name='gender']").filter('[value=' + gender + ']').prop('checked', true);
    //$('#gender').val(gender);



});
var app = {
    // Application Constructor
    initialize: function () {
        
                 motivation_get();
        FastClick.attach(document.body);
        
        var day = window.localStorage.getItem("day", 0);
        var month = window.localStorage.getItem("month", 0);
        var year_death = window.localStorage.getItem("year_death", 0);
        var gender = window.localStorage.getItem("gender", "");
       // alert(year_death + '-' + month + '-' + day + ' 00:00:00');
       if(year_death < 1900 || year_death == undefined){
        $.mobile.navigate("#form");
        return false;
    }
        $('#DateCountdown').attr('data-date', year_death + '-' + month + '-' + day + ' 00:00:00');

//http://www.bestjquery.com/?hPHGjuOx
        $("#DateCountdown").TimeCircles({
            "animation": "smooth",
            "bg_width": 1.0,
            "fg_width": 0.4,
            "circle_bg_color": "#fafafa",
            "time": {
                "Days": {
                    "text": "Дни",
                    "color": "#FFCC66",
                    "show": true
                },
                "Hours": {
                    "text": "Часы",
                    "color": "#99CCFF",
                    "show": true
                },
                "Minutes": {
                    "text": "Мин",
                    "color": "#BBFFBB",
                    "show": true
                },
                "Seconds": {
                    "text": "Сек",
                    "color": "#FF9999",
                    "show": true
                }
            }
        });
    }
};

function ClearTimer(){
    //$("#DateCountdown").TimeCircles().destroy(); 
    
}
function SetDate() {
    var day = $('#day').val();
    if (day < 1 || day > 31 || day == "") {
        alert("Ошибка! диапазон дней от 1 до 31");
        return;
    }

    var month = $('#month').val();
    if (month < 1 || month > 12 || month == "") {
        alert("Ошибка! диапазон месяцев от 1 до 12");
        return;
    }

    var year = $('#year').val();
    if (year.length != 4) {
        alert("Ошибка! формат для установки года рождения YYYY то есть 1987 например");
        return;
    }

    var gender = $("input[name='gender']:checked").val();
    if (gender == "") {
        alert("Укажите ваш пол!");
        return;
    }
    console.log("gender=" + gender);
    //=================================
    year = parseInt(year);
    var yearGeneder = 0;
    if (gender == "man") {
        yearGeneder = manLifeYear;
    } else {
        yearGeneder = womanLifeYear;
    }
    var yearToDeath = year + yearGeneder;
   // alert(yearToDeath);
    window.localStorage.setItem("day", day);
    window.localStorage.setItem("month", month);
    window.localStorage.setItem("year", year);
    window.localStorage.setItem("year_death", yearToDeath);
    window.localStorage.setItem("gender", gender);
    $.mobile.navigate("#info");
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


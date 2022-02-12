var manLifeYear = 63;
var womanLifeYear = 74;

$(document).on("pageshow", "#main", function (event) {
   InitApp();

});
$(document).on("pagebeforeshow", "#info", function (event) {
    // alert('info');
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




document.addEventListener('deviceready', onDeviceReady, false);
// Cordova is loaded and it is now safe to make calls Cordova methods
function onDeviceReady() {
    // app.initialize();
         NotificationSet();

}

function InitApp() {


        FastClick.attach(document.body);
        $.mobile.autoInitializePage = false;
        $.mobile.defaultPageTransition = 'none';
        $.mobile.touchOverflowEnabled = false;
        
        var day = window.localStorage.getItem("day", 0);
        var month = window.localStorage.getItem("month", 0);
        var year_death = window.localStorage.getItem("year_death", 0);
        var gender = window.localStorage.getItem("gender", "");
        // alert(year_death + '-' + month + '-' + day + ' 00:00:00');
        if (year_death < 1900 || year_death === undefined) {
            $.mobile.navigate("#form");
            return false;
        }
        // console.log(year_death + "-" + month + "-" + day);
        //year_death = 2019;
        if (false) {
            var now = new Date();
            // now.getFullYear()
            //  day = now.getDate();
            console.log(day);
            var difYears = year_death - now.getFullYear();
            console.log("difYears=" + difYears);
            var difMonth = 12 * difYears / manLifeYear;
            console.log("difMonth=" + difMonth);
            var curMonth = now.getMonth() + 1;
            console.log(curMonth);
            year_death = now.getFullYear();
            if ((curMonth + difMonth) > 12) {
                year_death++;
                var month = Math.abs(curMonth + difMonth - 12);
                console.log(month);
                month = Math.floor(month);
                // console.log(month2); 
                //month="0"+month;
            } else {
                month = Math.ceil(difMonth);
            }
            var days = 365 * difYears;
            console.log(days);
            console.log(year_death + "-" + month + "-" + day);
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
        motivation_get();
   


    }

function ClearTimer() {
    //$("#DateCountdown").TimeCircles().destroy(); 

}
function SetDate() {
    var day = $('#day').val();
    if (day < 1 || day > 31 || day == "") {
        alert("Ошибка! диапазон дней от 1 до 31");
        return false;
    }

    var month = $('#month').val();
    if (month < 1 || month > 12 || month == "") {
        alert("Ошибка! диапазон месяцев от 1 до 12");
        return false;
    }

    var year = $('#year').val();
    if (year.length != 4) {
        alert("Ошибка! формат для установки года рождения YYYY то есть 1987 например");
        return false;
    }

    var gender = $("input[name='gender']:checked").val();
    if (gender == undefined) {
        alert("Укажите ваш пол!");
        return false;
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
    //  window.location = '#info';
}


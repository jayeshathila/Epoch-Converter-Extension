document.addEventListener('DOMContentLoaded', function () {
        var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var el = document.getElementsByClassName('tz');
        var currDate = new Date();

        document.getElementById("epoch").value = currDate.getTime();
        document.getElementsByClassName("day")[0].value = currDate.getDate();
        document.getElementsByClassName("month")[0].value = currDate.getUTCMonth();
        document.getElementsByClassName("year")[0].value = currDate.getUTCFullYear();
        document.getElementsByClassName("hour")[0].value = currDate.getUTCHours();
        document.getElementsByClassName("min")[0].value = currDate.getUTCMinutes();
        document.getElementsByClassName("sec")[0].value = currDate.getUTCSeconds();

        for (var i = 0; i < el.length; i++) {
            var currEl = el[i];
            currEl.addEventListener('click', function () {
                for (var j = 0; j < el.length; j++) {
                    var classList = el[j].classList;
                    classList.remove("active");
                }

                this.classList.add("active")
            }, false);
        }

        epochTicker();

        function setFormat(num) {
            num = num.toString();
            return num.length < 10 ? setFormat("0" + num, 10) : num;
        }

        function setHumanTime(epoch) {
            if (!isInt(epoch) || epoch.length < 1) {
                setError();
                return;
            }

            switch (true) {
                case epoch.length == 10:
                    epoch = epoch + "000";
                    break;
                case epoch.length < 10:
                    epoch = setFormat(epoch) + "000";
                    break;
                case epoch.length > 10:
                    epoch = epoch.slice(0, 10) + "000";
                    break;
            }


            setValidDisplayProperty();
            var date = new Date(parseInt(epoch));
            document.getElementById("local").textContent = "Local: " + date.toString().replace(/GMT\+0530/g, '');
            //var gmt = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
            //var gmt = date.toUTCString();
            document.getElementById("gmt").textContent = "GMT: " + days[date.getUTCDay()] + " " + months[date.getUTCMonth()] + " " + date.getUTCDate() + " " + date.getUTCFullYear() + " " + date.getUTCHours() + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds();
        }

        function setError() {
            setErrorDisplayProperty();
        }

        function setErrorDisplayProperty() {
            document.getElementById("epc-prs-error").style.display = "block";
            document.getElementById("gmt").style.display = "none";
            document.getElementById("local").style.display = "none";
        }

        function setValidDisplayProperty() {
            document.getElementById("epc-prs-error").style.display = "none";
            document.getElementById("gmt").style.display = "block";
            document.getElementById("local").style.display = "block";
        }

        function updateFunc() {
            document.getElementById("current_epoch").textContent = parseInt(new Date().getTime() / 1000);

            setHumanTime(document.getElementById("epoch").value)

            var day = document.getElementsByClassName("day")[0].value;
            var month = document.getElementsByClassName("month")[0].value;
            var year = document.getElementsByClassName("year")[0].value;
            var hour = document.getElementsByClassName("hour")[0].value;
            var mins = document.getElementsByClassName("min")[0].value;
            var toEpochResponse = document.getElementById("to-epc-resp");
            var isAllEmptyDate = (day === "" && month === "" && year === "" && hour === "" && mins === "" && secs === "");

            if (isAllEmptyDate) {
                toEpochResponse.style.display = "none";
                document.getElementById("to-epc-resp-err").style.display = "none";
                return;
            }


            var secs = document.getElementsByClassName("sec")[0].value;
            var isAnyEmptyDate = (day === "" || month === "" || year === "" || hour === "" || mins === "" || secs === "");

            var date = new Date(month + "/"+ day + "/" + year + " " + hour + ":" + mins + ":" + secs);
            if (isNaN(date) || isAnyEmptyDate) {
                toEpochResponse.style.display = "none";
                document.getElementById("to-epc-resp-err").style.display = "block";
            } else {
                if (document.getElementsByClassName("local")[0].classList.contains("active")) {
                    toEpochResponse.textContent = "Epoch Millis:" + date.getTime();
                } else {
                    toEpochResponse.textContent = "Epoch Millis:" + new Date(date.getTime() - date.getTimezoneOffset() * 60000).getTime()
                }

                toEpochResponse.style.display = "block";
                document.getElementById("to-epc-resp-err").style.display = "none";
            }
        };

        function epochTicker() {
            setInterval(updateFunc, 100);
        }

        function isInt(value) {
            return !isNaN(value) &&
                parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
        }
    },
    false
)
;

function moveToNext(selector, nextSelector) {
    $(selector).on('input', function () {
        if (this.className === 'year' && this.value.length < 4) {
            return;
        }
        if (this.value.length >= 2) {
            // Date has been entered, move
            $(nextSelector).focus();
        }
    });
}


$(function () {
    moveToNext('.day', '.month');
    moveToNext('.month', '.year');
    moveToNext('.year', '.hour');
    moveToNext('.hour', '.min');
    moveToNext('.min', '.sec');
});
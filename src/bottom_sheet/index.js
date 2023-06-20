var container = document.getElementsByClassName('container')[0];
var handle_wrap = document.getElementsByClassName('bottom_sheet_handle_wrap')[0];
var bottom_sheet = document.getElementsByClassName('bottom_sheet')[0];
var up_sensor = document.getElementsByClassName('up_sensor')[0];
let bottom_touch_start = 0;
let bottom_scroll_start;

container.addEventListener("touchend", (e) => {
    bottom_sheet.style.height = 5 + "%"
    up_sensor.style.display = "block"; //up_sensor 다시 나타나기
    up_sensor.style.height = "5%"; //up_sensor height 다시 지정
})

//up_sensor에서 터치가 움직였을 경우 (바텀시트를 건드렸을 경우) -> 바텀시트를 올림
up_sensor.addEventListener("touchmove", (e) => {
    bottom_sheet.style.height = 70 + "%" //바텀시트 height를 올리기 10% -> 70%
    up_sensor.style.height = 70 + "%"; //up_sensor도 따라가기
    setTimeout(function () {
        up_sensor.style.display = "none";
    }, 1000); // 바텀시트가 올라간 후, up_sensor 사라지기
});


//맨 위에서 아래로 스크롤했을 경우
bottom_sheet.addEventListener("touchstart", (e) => {
    bottom_touch_start = e.touches[0].pageY; // 터치가 시작되는 위치 저장
    bottom_scroll_start = bottom_sheet.scrollTop //터치 시작 시 스크롤 위치 저장
});

bottom_sheet.addEventListener("touchmove", (e) => {
    //유저가 아래로 내렸을 경우 + 스크롤 위치가 맨 위일 경우
    if (((bottom_touch_start - e.touches[0].pageY) < 0) && (bottom_scroll_start <= 0)) {
        //바텀시트 내리기
        bottom_sheet.style.height = 5 + "%"
        up_sensor.style.display = "block"; //up_sensor 다시 나타나기
        up_sensor.style.height = "5%"; //up_sensor height 다시 지정
    };
});


//맨 위 핸들을 아래로 당겼을 경우
handle_wrap.addEventListener("touchstart", (e) => {
    bottom_touch_start = e.touches[0].pageY; // 터치가 시작되는 위치 저장
});

handle_wrap.addEventListener("touchmove", (e) => {
    //사용자가 아래로 내렸을 경우
    if ((bottom_touch_start - e.touches[0].pageY) < 0) {
        //바텀시트 내리기
        bottom_sheet.style.height = 5 + "%"
        up_sensor.style.display = "block"; //up_sensor 다시 나타나기
        up_sensor.style.height = "5%"; //up_sensor height 다시 지정
    };
});


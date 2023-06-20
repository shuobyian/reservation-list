let reservationList = []

const reservationElement = (reservation) => `<div class="item">
<div class="content" onclick="onClickItem(this)" data-reservation='${JSON.stringify(reservation)}'>
    <div class="title">
        <div class="time">${reservation.timeReserved.slice(0, -3)}</div>
        ${reservation.status === 'reserved'
        ? `<div class="status_reserved">예약</div>`
        : `<div class="status_seated">착석 중</div>`}
    </div>
    <div class="description">
        <div class="name">${reservation.customer.name} - ${reservation.tables.map((table) => table.name).join(', ')}</div>
        <div class="people">성인 ${reservation.customer.adult} 아이 ${reservation.customer.child}</div>
        <div class="menus">
            ${reservation.menus.map((menu) => `${menu.name}(${menu.qty})`).join(', ')}
        </div>
    </div>
</div>
<div class="button">
    ${reservation.status === 'reserved'
        ? `<button class="button_reserved" onclick="onClickReserved(this)"
        data-reservation='${JSON.stringify(reservation)}'>착석</button>`
        : `<button class="button_seated" onclick="onClickSeated(this)"
        data-reservation='${JSON.stringify(reservation)}'>퇴석</button>`}
</div>
</div>`

const panelElement = (reservation) => `<div class="panel">
<div class="title">예약 정보</div>
<div class="row">
    <div class="label">예약 상태</div>
    <div class="value">${reservation.status === 'reserved' ? "예약" : "착석 중"}</div>
</div>
<div class="row">
    <div class="label">예약 시간</div>
    <div class="value">${reservation.timeReserved.slice(0, -3)}</div>
</div>
<div class="row">
    <div class="label">접수 시간</div>
    <div class="value">${reservation.timeRegistered.slice(0, -3)}</div>
</div>

<div class="title">고객 정보</div>
<div class="row">
    <div class="label">고객 성명</div>
    <div class="value">${reservation.customer.name}</div>
</div>
<div class="row">
    <div class="label">고객 등급</div>
    <div class="value">${reservation.customer.level}</div>
</div>
<div class="row">
    <div class="label">고객 메모</div>
    <div class="value">${reservation.customer.memo}</div>
</div>
<div class="request">
    <div class="row">
        <div class="label">요청 사항</div>
        <div class="value">${reservation.customer.request}</div>
    </div>
</div>
</div>`

function render(reservations) {
    const html = reservations.filter((r) => r.status !== 'done').map((reservation) => {
        return reservationElement(reservation)
    }).join('')

    let detailElement = document.querySelector('.detail');
    let bottomElement = document.querySelector('.bottom_box');

    if (reservations.length > 0) {
        const panelHtml = panelElement(reservations[0])
        detailElement.innerHTML = panelHtml;
        bottomElement.innerHTML = panelHtml;
    }
    else {
        detailElement.innerHTML = ''
        bottomElement.innerHTML = ''
        document.getElementById('bottomSheet').style.height = 5 + "%"
    }

    let reservationsElement = document.querySelector('.reservations');
    reservationsElement.innerHTML = html;
}

async function getReservationList() {
    const uri = 'https://frontend.tabling.co.kr/v1/store/9533/reservations';
    try {
        const response = await fetch(uri, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return (await response.json()).reservations;
    } catch {
        return;
    }
}

async function init() {
    reservationList = await getReservationList();
    render(reservationList)
}

function onClickItem(element) {
    const bottom_sheet = document.querySelector('.bottom_sheet');

    if (bottom_sheet.style.height === '70%') return;

    const reservation = JSON.parse(element.dataset.reservation);

    const html = panelElement(reservation)

    let detailElement = document.querySelector('.detail');
    detailElement.innerHTML = html;

    let bottomElement = document.querySelector('.bottom_box');
    bottomElement.innerHTML = html;
    document.getElementById('bottomSheet').style.height = 70 + "%"
}

function onClickReserved(element) {
    const reservation = JSON.parse(element.dataset.reservation);
    const newList = reservationList.map((r) => r.id === reservation.id ? ({ ...r, status: 'seated' }) : r)
    reservationList = newList
    render(newList)
}

function onClickSeated(element) {
    const reservation = JSON.parse(element.dataset.reservation);
    const newList = reservationList.map((r) => r.id === reservation.id ? ({ ...r, status: 'done' }) : r).filter((r) => r.status !== 'done')
    reservationList = newList
    render(newList)
}

init();

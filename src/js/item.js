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

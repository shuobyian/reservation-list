let reservationList = []

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
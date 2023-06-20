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

init();
function checkOrder() { // sjekker om valgte timer er valgt i input. hvis ikke, kommer en alert, dersom timer er valgt åpnes modal for bestilling
    /* fleet dato og timer */
    if (model.inputs.bookingPage.selectedHours.length < 1) { alert('Hei du må velge dato og tid for å fullføre en bestilling') }
    else { confirmationModalContent() }
}

function confirmationModalContent() { //setter bestillings-modal til å fremvise oppsummering av bestilling før man fullfører bestilling
    let html = '';
    html += /*HTML*/`
        <table class="comforts-modal-table">
            <tr><th>Valgt flåte: </th><th colspan="2">${fleetNameChosen()}</th></tr>
            <tr style="border-bottom: 2px solid black;"></tr>
            <tr><td>Tid valgt:</td><td>${getBookingTimeAdmin(model.inputs.bookingPage.selectedHours)}</td></tr>
            <tr><td>Vare:</td><td>Antall</td><td>Sum</td></tr>
            <tr style="border-bottom: 1px solid black;"></tr>
            ${packageIsChosen()}
            ${hoursComfortsSelected()}
            <tr style="border-bottom: 2px solid black;"></tr>
            <tr><td>Total Sum:</td><td></td><td>${totalSum()}</td></tr>
		</table><br>
        <button onclick="addBooking()">Bekreft bestilling</button>
    `;
    model.app.modalContent = html;
    openModal();
}

function checkOrderForComforts() { //retunrerer tabellinnhold for tilbehør i pakke til bekreftelses-modal
    let html = '';
    let comfort = model.inputs.bookingPage.packageChoice
    if (model.inputs.bookingPage.packageChoice == null) { return "" }
    else {
        for (let i = 0; i < model.inputs.bookingPage.packageChoice.comforts.length; i++) {
            html += /* HTML */ `
            <tr><td>${comfort.comforts[i].name}</td><td>${comfort.comforts[i].quantity}</td><td></td></tr>
            `;
        }
    }
    return html
}

function checkOrderForPackage() { //returnerer tabellinnhold for pakke til bekreftelses-modal
    let html = '';
    if (model.inputs.bookingPage.packageChoice == null) { return "" }
    else {
        html = `<tr><td>${model.inputs.bookingPage.packageChoice.name}:</td><td>1</td>
    <td>${isWeekend() ? model.inputs.bookingPage.packageChoice.price.weekendPrice :
            model.inputs.bookingPage.packageChoice.price.weekdayPrice}</td></tr>
        <tr><td>Timer:</td><td>${model.inputs.bookingPage.packageChoice.hours}</td><td></td></tr> `;
    }
    return html
}

function isWeekend() { //sjekker om valgt dato er helg eller ukedag. returnerer true hvis det er helg
    let day = model.inputs.bookingPage.selectedDate.getDay();
    if (day < 6 && day > 0) { return false; }
    else return true;

}

function getListOfComforts() { //returnerer tabellinnhold for liste med tilbehør
    let comfortList = [];
    let html = "";
    for (let dataComfort of model.data.comforts) {
        let comfortCount = 0;
        for (let comfortId of model.inputs.bookingPage.comfortChoices) {
            if (dataComfort.id == comfortId) {
                comfortCount++;
            }
        }
        if (comfortCount > 0) {
            comfortList.push({ id: dataComfort.id, count: comfortCount });
        }
    }
    for (let comfort of comfortList) {
        html += /* HTML */`
        <tr>
            <td>${getComfortById(comfort.id).name}</td>
            <td> ${comfort.count} </td>
            <td>${getComfortById(comfort.id).price * comfort.count}</td>
        </tr>
        `;
    }
    return html;
}

function getHoursNoPackage() { //returnerer tabellinnhold for valgte timer dersom ingen pakke er valgt
    let html = '';
    if (model.inputs.bookingPage.packageChoice == null) {
        html += /* HTML */`<tr><td>Timer valgt:</td><td>${model.inputs.bookingPage.selectedHours.length}</td><td>${sumHoursSelected()}</td></tr>`;
    }
    return html;
}

function hoursComfortsSelected() { //returnerer tabellinnhold for valgte varer enten det er valgt pakke eller ikke og enten det er valgt ekstra tilbehør eller ikke
    let html = '';
    html += /* HTML */`
    ${getHoursNoPackage()}
    `;
    if (model.inputs.bookingPage.packageChoice == null) {
        html += /* HTML */`
        <tr><td>Ekstra produkter:</td><td></td><td></td></tr>
        <tr style="border-bottom: 1px solid black;"></tr>
        `;
    }
    html += ` ${getListOfComforts()} `;
    return html;
}

function packageIsChosen() { //returnerer tabellonnhold for pakke og ekstra produkter dersom både pakke og tilbehør i tillegg til pakke er valgt
    let html = '';
    html += /* HTML */`
    ${checkOrderForPackage()}
    ${checkOrderForComforts()}
    <tr style="border-bottom: 2px solid black;"></tr>
    `;
    if (model.inputs.bookingPage.packageChoice !== null && model.inputs.bookingPage.comfortChoices.length > 0) {
        html += /* HTML */`
        <tr><td>Ekstra produkter:</td><td></td><td></td></tr>
        <tr style="border-bottom: 1px solid black;"></tr>
        `;
    }
    return html;
}


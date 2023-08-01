function getComfortDropdown() { //returnerer dropdown-meny for å velge tilbehør, men er ikke i bruk
	let HTML = ""
	HTML += /* html */ `<div><select onchange="selectComfort(this.value)"> 
    <option value=""><i>- comforts -</i></option>`;

	for (let i = 0; i < model.data.comforts.length; i++) {
		const comfort = model.data.comforts[i];
		HTML += `<option value="${comfort.id}">${comfort.id} : ${comfort.name}</option>`;
	}
	HTML += `</select></div>`;
	return HTML;
}


function inputListBooking(){ //returnerer tabell med oversikt over flåte, tid, pakker, evt tilbehø samt total pris for bookingen.
	let selectedHours = model.inputs.bookingPage.selectedHours;
	let html = '';
    html += /*HTML*/`
        <table>
            <tr><th>Valgt flåte: </th><th colspan="2">${fleetNameChosen()}</th></tr>
            <tr style="border-bottom: 2px solid black;"></tr>
			<tr><td>Tid valgt:</td><td colspan="2">${selectedHours.length > 0 ? getBookingTimeAdmin(selectedHours): ' - '}</td></tr>
            <tr><td>Vare:</td><td>Antall</td><td>Sum</td></tr>
            <tr style="border-bottom: 1px solid black;"></tr>
            ${packageIsChosen()}
            ${hoursComfortsSelected()}
            <tr style="border-bottom: 2px solid black;"></tr>
            <tr><td>Total Sum:</td><td></td><td>${totalSum()}</td></tr>
		</table><br>
        `;
	return html;
}
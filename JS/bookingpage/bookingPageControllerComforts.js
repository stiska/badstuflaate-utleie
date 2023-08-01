function comfortsModalContent() { //hoved-view for tilbehør-modalen
    let html = '';
    html += /*HTML*/`
        ${getInputComfortChoicesM()}
    `;
    model.app.modalContent = html;
    openModal();
}

function getInputComfortChoicesM() { //returnerer html for modal for tilbehør
	let comfortList = [];
	for (let dataComfort of model.data.comforts) {
		let comfortCount = 0;
		for (let comfortId of model.inputs.bookingPage.comfortChoices) {
			if (dataComfort.id == comfortId) {
				comfortCount++;
			}
		}
        comfortList.push({ id: dataComfort.id, count: comfortCount });
	}
	let html = '';
	html += /*html*/ `
	<div>
	<table class="comforts-table"> 
		<tr><th>Vare</th><th>Pr stk</th><th>Antall	</th><th>Pris totalt</th><th>Endre produkter</th></tr>
            <tr style="border-bottom: 2px solid black;"></tr>`;
		for (let comfort of comfortList) {
			html += /*html*/`<tr><td>${getComfortById(comfort.id).name}</td><td>${getComfortById(comfort.id).price}</td><td> ${comfort.count} </td>
			<td>${getComfortById(comfort.id).price * comfort.count}</td>
			<td>
				<button onclick="addComfort(${comfort.id})">▲</button>
				<button onclick="subtractComfort(${comfort.id})">▼</button>
			<button onclick="deleteComfortChoicesByComfortId(${comfort.id})">Fjern</button></td>
			</tr>`;
		}
		html += /*html*/`
	</table>
    	<button onclick="comfortModalClose()">Bekreft</button>
    </div>
    `;
	return html;
}



function updateEditorModalContenComforts() { //oppdaterer modal-innholdet
    model.app.modalContent = /*HTML*/
    `${getInputComfortChoicesM()}
    `;
    updateView()
}

function comfortModalClose(){ //lukker modal for tilbehør

    closeModal()
}



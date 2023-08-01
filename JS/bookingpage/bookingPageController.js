function selectFleet(fleetId) { //Setter valgt flåte i modellen basert på hvilken flåte man klikker på
    model.inputs.bookingPage.fleetChoice = fleetId;
    model.inputs.bookingPage.selectedHours = [];
    updateView();
}

function settBorder(index){ //Setter svart border rundt flåte-bilde
    for (let i = 0; i < model.data.fleets.length; i++) {
        model.data.fleets[i].border = "#efe2cd"
    }
    model.data.fleets[index].border = "black"
    updateView();
}

function goToNextMonth() { //Setter valgt måned til neste måned når man klikker på knapp 'neste måned'
    model.inputs.bookingPage.selectedHours = [];
    model.inputs.bookingPage.selectedDate.setMonth(model.inputs.bookingPage.selectedDate.getMonth() + 1);
    model.inputs.bookingPage.selectedDate.setDate(1);
    updateView();
}

function goToPrevMonth() { //Setter valgt måned til forrige måned når man klikker på knapp 'forrige måned'
    model.inputs.bookingPage.selectedHours = [];
    model.inputs.bookingPage.selectedDate.setMonth(model.inputs.bookingPage.selectedDate.getMonth() - 1);
    model.inputs.bookingPage.selectedDate.setDate(1);
    updateView();
}

function sumComfortsSelected() { // Returnerer sum av priser på valgte ekstraprodukter
    let priceSum = 0;
    for (let comfortId of model.inputs.bookingPage.comfortChoices) {
        priceSum += Number(getComfortById(comfortId).price);
    }
    return priceSum;
}

function getComfortById(id) { // Returnerer referanse til tilbehør-objekt basert på id
    for (let comfort of model.data.comforts) {
        if (id == comfort.id)
            return comfort;
    }
    return null;
}

function totalSum() { // Regner ut total sum for booking som er valgt basert på data i inputs på bopoking-siden
	let totalPrice = 0;
	if(model.inputs.bookingPage.packageChoice){
		if(!isWeekend())
			totalPrice = sumComfortsSelected() + Number(model.inputs.bookingPage.packageChoice.price.weekdayPrice);
		else totalPrice = sumComfortsSelected() + Number(model.inputs.bookingPage.packageChoice.price.weekendPrice);
        return totalPrice;
	}
    return sumHoursSelected() + sumComfortsSelected();
}


function getPackageById(id) { // Returnerer referanse til pakke-objekt basert på id
    for (let package of model.data.packageOptions) {
        if (id == package.id)
            return package;
    }
    return null;
}


function emptySelection() { // Resetter valg av timer, pakkevalg samt ekstra tilbehør valgt
    model.inputs.bookingPage.selectedHours = [];
    model.inputs.bookingPage.packageChoice = null;
    model.inputs.bookingPage.comfortChoices = [];
    updateView();
}

function emptySelectedHours(){ // Resetter valg av timer i inputs
    model.inputs.bookingPage.selectedHours = [];
    updateView();
}

function selectComfort(comfortId) { //legger til en forekomst av et tilbehør i array for valgte tilbehør
    model.inputs.bookingPage.comfortChoices.push(comfortId);
    updateView();
}

function getIdToCompare(idToCompare){ //returnere boolsk verdi for om en id finnes i boking-arrayet fra før eller ikke
    for (let i = 0; i < model.data.bookings.length; i++) {
        const booking = model.data.bookings[i];
        if (booking.orderId == idToCompare) {
            return true; 
        }
    }
    return false;
}

function getNewBookingId(){ //Finner laveste ikke allerede brukte id-nr på booking og returnerer dette
	let i = 0;
	while(true){
		if(!getIdToCompare(i)){
			return i;
		}
		i++;
	}
}

function addBooking() { // legger til en ny bestilling i data-objektet i modellen
    let newBooking = {};
    newBooking.orderId = getNewBookingId();
    newBooking.fleetId = Number(model.inputs.bookingPage.fleetChoice);
     //kopierer objektet
    if(model.inputs.bookingPage.packageChoice != null){newBooking.chosenPackage = JSON.parse(JSON.stringify(model.inputs.bookingPage.packageChoice));}
    else {newBooking.chosenPackage = null;}

    newBooking.chosenComforts = model.inputs.bookingPage.comfortChoices.map((x) => x);
    newBooking.chosenDate = new Date(model.inputs.bookingPage.selectedDate.valueOf());
    newBooking.chosenHours = model.inputs.bookingPage.selectedHours.map((x) => x);
    newBooking.customer = model.app.currentUser;
    newBooking.totalPrice = totalSum();
    //hindrer at man kan bestille uten timer.
    if (model.inputs.bookingPage.selectedHours.length < 1) { return; }
    model.data.bookings.push(newBooking);
    alert("Booking gjennomført")
    emptySelection();
    closeModal();
    updateView();
    
}

function addComfort(comfortId){ //legger til forekomst av et tilbehør og oppdaterer modalen
    model.inputs.bookingPage.comfortChoices.push(comfortId);
    updateEditorModalContenComforts();
    updateView();

}

function subtractComfort(comfortId){ //trekker fra en forekomst av et tilbehør fra input-delen av modellen samt oppdaterer modalen
    for(let i = model.inputs.bookingPage.comfortChoices.length -1; i >= 0 ; i--){
        if(model.inputs.bookingPage.comfortChoices[i] == comfortId){
            model.inputs.bookingPage.comfortChoices.splice(i, 1);
            break;
        }
    }  
    updateEditorModalContenComforts();
    updateView();
}

function deleteComfortChoicesByComfortId(comfortId){ //sletter alle forekomster av en type tilbehør i input-delen av modellen
	for(let i = model.inputs.bookingPage.comfortChoices.length -1; i >= 0 ; i--){
		let id = model.inputs.bookingPage.comfortChoices[i];
		if(getComfortById(id).id == comfortId){
			model.inputs.bookingPage.comfortChoices.splice(i, 1);
		}
	}
    updateEditorModalContenComforts();
    updateView();
}

function getFleetNameById(id) { //returnerer flåtenavn med id som parameter
    for (let fleet of model.data.fleets) {
        if (id == fleet.id){
            return fleet.name;
        }    
    }
    return null;
}
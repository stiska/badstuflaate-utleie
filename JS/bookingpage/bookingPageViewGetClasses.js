function getClassesForHourButton(hour) { //returnerer css-klasser den enkelte times-knapp skal være medlem av for å gi knappen farge
    const bookings = model.data.bookings;
    let fleet = model.inputs.bookingPage.fleetChoice;
    let fullYear = model.inputs.bookingPage.selectedDate.getFullYear();
    let month = model.inputs.bookingPage.selectedDate.getMonth();
    let date = model.inputs.bookingPage.selectedDate.getDate();
    let selectedDate = model.inputs.bookingPage.selectedDate;
    let todayDate = new Date().getTime();
    let buttonDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), date, hour).getTime();

	if(buttonDate < todayDate){
		
		return "date-button passed-hour-button";
	}
    if (hour < 7) {return "hour-button un-selectable";}
    for (let b = 0; b < bookings.length; b++) {
        let booking = bookings[b];
        if (booking.fleetId == fleet &&
            booking.chosenDate.getFullYear() == fullYear &&
            booking.chosenDate.getMonth() == month &&
            booking.chosenDate.getDate() == date) {
            for (let i = 0; i < booking.chosenHours.length; i++) {
                let bookedHour = booking.chosenHours[i];
                if (bookedHour == hour) {
                    return "hour-button red-button";
                }
            }
        }
    }
    if (checkIfHourIsSelected(hour) == true) {
        return "hour-button blue-button";
    }
    return "hour-button";
}

function getClassesForDateButton(date) { //returnerer css-klasser for dato-knapp i kalender for å gi knappen farge avhengig om dagen er booket på eller ikke
	let todayDate = new Date().getTime();
	let selectedDate = model.inputs.bookingPage.selectedDate;
	
	let buttonDate = new Date(selectedDate.getFullYear(),selectedDate.getMonth(), date+1).getTime();
	if(buttonDate < todayDate){
		//console.log('er mindre enn!');
		return "date-button passed-day-button";
	}
    const bookings = model.data.bookings;
    let fleet = model.inputs.bookingPage.fleetChoice;
    let fullYear = model.inputs.bookingPage.selectedDate.getFullYear();
    let month = model.inputs.bookingPage.selectedDate.getMonth();
    let countHours = 0;
    if (date == model.inputs.bookingPage.selectedDate.getDate()) {
        return "date-button blue-button";
    }
    for (const booking of bookings) {
        if (booking.fleetId == fleet &&
            booking.chosenDate.getFullYear() == fullYear &&
            booking.chosenDate.getMonth() == month &&
            booking.chosenDate.getDate() == date) {
            countHours += booking.chosenHours.length;
        }
    }
    if (countHours >= 17) { return "date-button red-button"; }
    if (countHours > 12) { return "date-button light-red-button"; }
    if (countHours > 0) { return "date-button yellow-button"; }
    return "date-button";
}
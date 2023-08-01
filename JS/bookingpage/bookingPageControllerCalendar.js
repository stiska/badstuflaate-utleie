function selectDate(date) { //setter valgt dato i input-delen av modellen basert på input fra kalender
    if (model.inputs.bookingPage.selectedDate.getDate() != date) {
        emptySelectedHours(); 
    }
    model.inputs.bookingPage.isDateSelected = true;
    model.inputs.bookingPage.selectedDate.setDate(date);
    updateView();
}

function getPriceDay(day) { //returnerer pris på dag med dasg-nummer som parameter
    if (day < 6 && day > 0) return Number(model.data.prices.weekdayPriceDay);
    else return Number(model.data.prices.weekendPriceDay);

}

function getPriceHour() { //retunerer pris per tome basert på dag som er valgt i inputs i modellen
    let day = model.inputs.bookingPage.selectedDate.getDay();
    if (day < 6 && day > 0) return Number(model.data.prices.weekdayPriceHour);
    else return Number(model.data.prices.weekendPriceHour);
}
//returnerer samlet pris på timer valgt
function sumHoursSelected() {
    let day = model.inputs.bookingPage.selectedDate.getDay();
    let priceSum = 0;
    for (let hour of model.inputs.bookingPage.selectedHours) {
        hour;
        priceSum += getPriceHour();
    }
    if (priceSum >= getPriceDay(day)) {
        return getPriceDay(day);
    }
    else return priceSum;
}

function selectHour(hour) { //setter timer valgt i fra kalender til input-delen av modellen
    
    if (model.inputs.bookingPage.packageChoice) {
        selectPackageHours(hour);
        return;
    }

    if (!checkIfHourIsSelected(hour)) {
        if (model.inputs.bookingPage.selectedHours.length > 0) {
            if (hour > getHighestHourSelected()) {
                let hoursToAutoSelect = getHoursToAutoSelect(hour);
                for (let hourToAutoSelect of hoursToAutoSelect) {
                    model.inputs.bookingPage.selectedHours.push(hourToAutoSelect);
                }
            }
        }
        else {
            model.inputs.bookingPage.selectedHours.push(hour);
        }
    }
    else {
        if (model.inputs.bookingPage.selectedHours.length > 0) {
            for (let i = getHighestHourSelected(); i >= hour; i--) {
                if (checkIfHourIsBooked(i)) continue;
                unselectHour(i);
                
            }
        }
        else unselectHour(hour);
    }

    
    updateView();

}

function getHighestHourSelected() { //returnerer høyeste time valgt
    if (model.inputs.bookingPage.selectedHours.length > 0) {
        let max = model.inputs.bookingPage.selectedHours[0];
        for (let hour of model.inputs.bookingPage.selectedHours) {
            if (hour > max) {
                max = hour;
            }
        }
        return max;
    }
}

function getHoursToAutoSelect(hour) { //returnerer array med timer som skal auto-velges i times-velger
    let hours = [];
    if (hour > getHighestHourSelected()) {
        for (let i = getHighestHourSelected() + 1; i <= hour; i++) {
            if (checkIfHourIsBooked(i)) break;
            if (!checkIfHourIsBooked(i)) {
                hours.push(i);
            }
        }
        return hours;
    }
    return;


}

function checkIfHourIsBooked(hour) { //sjekker om time som skal velges allerede er booket. returnerer boolsk verdi
    const bookings = model.data.bookings;
    let fleet = model.inputs.bookingPage.fleetChoice;
    let fullYear = model.inputs.bookingPage.selectedDate.getFullYear();
    let month = model.inputs.bookingPage.selectedDate.getMonth();
    let date = model.inputs.bookingPage.selectedDate.getDate();

    for (let b = 0; b < bookings.length; b++) {
        let booking = bookings[b];
        if (booking.fleetId == fleet &&
            booking.chosenDate.getFullYear() == fullYear &&
            booking.chosenDate.getMonth() == month &&
            booking.chosenDate.getDate() == date) {
            for (let i = 0; i < booking.chosenHours.length; i++) {
                let bookedHour = booking.chosenHours[i];
                if (bookedHour == hour) {
                    return true;
                }
            }
        }
    }

    return false;
}

function unselectHour(hour) { //av-velger valgt time i times-velger 
    let indexToDelete = findHourIndexInSelected(hour);
    model.inputs.bookingPage.selectedHours.splice(indexToDelete, 1);
    updateView();
}

function findHourIndexInSelected(hour) { //finner time-indeks til en valgt time. time er parameter og det returneres en indeks
    for (let i = 0; i < model.inputs.bookingPage.selectedHours.length; i++) {
        if (hour == model.inputs.bookingPage.selectedHours[i]) {
            return i;
        }
    }
    return null;
}

function checkIfHourIsSelected(hour) { //sjekker hvis en time er allerede valgt. retunerer boolsk verdi
    for (let selectedHour of model.inputs.bookingPage.selectedHours) {
        if (hour === selectedHour) {
            return true;
        }
    }
    return false;
}


function selectPackageHours(hour) { //velger timer som skal velges tilhørende en pakke. Auto-utfyller for antallet timer fra pakken fra med første time fra time man klikker på
    if (checkIfHourIsSelected(hour)) {
        model.inputs.bookingPage.selectedHours = [];
        updateView();
        return;
    }
    if (model.inputs.bookingPage.selectedHours.length > 0) {

        model.inputs.bookingPage.selectedHours = [];


    }
    
    let hoursToSelect = model.inputs.bookingPage.packageChoice.hours;
    for (let i = 0; i < hoursToSelect; i++) {
        let packageHour = hour + i;
        if (checkIfHourIsBooked(packageHour) || packageHour > 23) {
            
            model.inputs.bookingPage.selectedHours = [];
            updateView();
            return;
        }
        else {
            model.inputs.bookingPage.selectedHours.push(packageHour);
        }
    }
    updateView();
    return;
}
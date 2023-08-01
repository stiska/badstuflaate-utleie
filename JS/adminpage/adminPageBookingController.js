function selectAdminDate(date){ //setter valgt dato på kalender i admin-booking-page i modellen
    if (model.inputs.adminPageBooking.selectedDate.getDate() != date) {
        model.inputs.adminPageBooking.selectedBooking = null;
    }
    model.inputs.adminPageBooking.isDateSelected = true;
    model.inputs.adminPageBooking.selectedDate.setDate(date);
    updateView();
}

function goToPrevMonthAdmin(){ //setter valgt måned i modellen under abmin-booking-page til forrige måned
    model.inputs.adminPageBooking.selectedDate.setMonth(model.inputs.adminPageBooking.selectedDate.getMonth() - 1);
    model.inputs.adminPageBooking.selectedDate.setDate(1);
    updateView();
}

function goToNextMonthAdmin(){ //setter valgt måned i modellen under abmin-booking-page til neste måned.
    model.inputs.adminPageBooking.selectedDate.setMonth(model.inputs.adminPageBooking.selectedDate.getMonth() + 1);
    model.inputs.adminPageBooking.selectedDate.setDate(1);
    updateView();
}

function selectBookingAdmin(orderId){ // Tar i mot en ID som parameter og skriver den i modellen
    model.inputs.adminPageBooking.selectedBooking = orderId;
    updateView();
}

function getBookingById(id){ //henter ut referanse booking-objekt fra modellen med bookingens id som parameter
    for (let booking of model.data.bookings){
        if(booking.orderId == id){
            return booking;
        }
    }
    return null;
}

function getUserByName(username){ // Tar inn brukernavn som parametere og returnerer en referanse til brukerobjektet i modellen
    for(let user of model.data.users){
        if(username == user.name){
            return user;
        }
    }
    return null;
}


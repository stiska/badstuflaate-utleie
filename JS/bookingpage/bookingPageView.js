function updateBookingPageView() { //oppdaterer view for booking-side
    let HTML = /*HTML*/`
    <div class="booking-wrapper"> 
    <div class="booking-container">
    ${getBookingPage()}
    </div>
    </div>
    ${getModal()} 
    `;
    return HTML;
}

function getBookingPage() { //hoved-funksjon for booking-siden
    let HTML = '';
    HTML += /*HTML*/`
    <div class="col-1">
        `;
        for (let fleet of model.data.fleets) {
            HTML += /* html */ `
            <div 
                class="booking-image"
                style="border-color:${model.data.fleets[fleet.id].border}"  
                onclick="selectFleet(${fleet.id}),settBorder(${fleet.id})">
                ${fleet.img}
            </div>`;
        }
        HTML += /*HTML*/`
        <div class="booking-buttons">
            <button class="booking-btn" onclick="comfortsModalContent()">Ekstra produkter</button>
            <button class="booking-btn" onclick="packageModalContent()">Pakker</button>
            <button class="booking-btn" onclick="checkOrder()">Bestill</button>
        </div>
        <br>
        <div class="booking-order-overview">${inputListBooking()}</div>
    </div>
    <div class="col-2">
        <div class="booking-calender">
        <div class="booking-subtitle">${getSelectedMonthName()} ${model.inputs.bookingPage.selectedDate.getFullYear()} </div>
             <div class="next-prew-month-buttons">   
                <button  onclick="goToPrevMonth()">Forrige måned</button> 
                <button  onclick="goToNextMonth()">Neste måned</button>
            </div>
            <div class="claender-component">${getMonthAsTable()}${getTimePicker()}</div>    
            
        </div>
    </div>
    `;
    return HTML;
}

function isSelected(fleetId) {
    if (fleetId == model.inputs.bookingPage.fleetChoice) return 'selected="selected"';
    else return '';
}

function fleetNameChosen(){ //returnerer flåte-navn basert på hvilken flåte som er valgt i inputs
   if (model.inputs.bookingPage.fleetChoice === 1){
    return getFleetNameById(1);
   } 
   if(model.inputs.bookingPage.fleetChoice === 0) {
    return getFleetNameById(0);
   }else{ 
    return ''}

}


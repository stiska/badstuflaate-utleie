function showDate() { //viser valgt dato
    let selectedDate = model.inputs.bookingPage.selectedDate.getDate();
    let HTML = "";
    HTML += /*HTML*/`<br /> dato valgt: ${(model.inputs.bookingPage.fleetChoice || model.inputs.bookingPage.fleetChoice === 0) ? selectedDate : ''} <br />`;
    return HTML;
}

function getMonthAsTable() {  //tegner opp en kalender basert på hvilken måned som er valgt i kalenderen
    if (model.inputs.bookingPage.fleetChoice === null) return '';
    model.inputs.bookingPage.isDateSelected = true;                 
    let day = new Date();
    let currentMonth = model.inputs.bookingPage.selectedDate.getMonth();
    let currentYear = model.inputs.bookingPage.selectedDate.getFullYear();
    let HTML = `<table>`;
    let rows = 7;
    let columns = 7;
    let date = 1;
    let daysInSelectedMonth = model.data.daysInMonth[currentMonth];
    let started = false;
    day.setFullYear(currentYear, currentMonth, 0);

    for (let a = 0; a < rows; a++) {//  ukene eks uke numer
        let startPostition = day.getDay();
        HTML += "<tr>";
        for (let b = 0; b < columns; b++) { // uke dager eks mandag tirsdag
            if (a == 0) { // øverste linje
                HTML += /*HTML*/`<th>                           
                    ${getDayName(b)} 
                </th>`;
            }
            else {
                if (b == startPostition && a == 1) {
                    started = true;
                }
                if (started && date <= daysInSelectedMonth) {   
                    day.setDate(day.getDate() + 1);
                    HTML += /*HTML*/`<td>                           
                    <button class="${getClassesForDateButton(date)}" onclick="selectDate(${day.getDate()})">
                        ${day.getDate()} <br />
                    </button>
                    </td>`;
                    date++;
                }
                else {
                    HTML += '<td id="blancTdCalendar"><button id="blancTdBtn"></button></td>';
                }
            }
        }
        HTML += "</tr>";
    }
  
    return HTML;
}

function getTimePicker() { //returnerer html for times-velger
    let rows = 4;
    let columns = 6;
    let HTML = `<table>`;
    let hour = 0;

    for (let h = 0; h < rows; h++) {
        HTML += `
        <tr>`;
            for (let n = 0; n < columns; n++) {
                HTML += /*HTML*/`
                <td>
                    <button class="${getClassesForHourButton(hour)}" onclick="selectHour(${hour})">
                        ${(hour < 10? "0" + hour: hour) + ':00'} <br> ${hour < 7 ? "" : getPriceHour() + ',-'}
                    </button>                               
                </td>`;
                hour++;
            }
            HTML += `
        </tr>`;
    }
    HTML += `</table>`;
    if (model.inputs.bookingPage.isDateSelected) {
        return HTML;
    } else {
        return "";
    }
}

function getSelectedMonthName(){ //returnerer måneds-navn basert på hvilken måned som er valgt i inputs
    let selectedMonth = model.inputs.bookingPage.selectedDate.getMonth();
    if(selectedMonth == 0) return 'Januar';
    if(selectedMonth == 1) return 'Februar';
    if(selectedMonth == 2) return 'Mars';
    if(selectedMonth == 3) return 'April';
    if(selectedMonth == 4) return 'Mai';
    if(selectedMonth == 5) return 'Juni';
    if(selectedMonth == 6) return 'Juli';
    if(selectedMonth == 7) return 'August';
    if(selectedMonth == 8) return 'September';
    if(selectedMonth == 9) return 'Oktober';
    if(selectedMonth == 10) return 'November';
    if(selectedMonth == 11) return 'Desember';

}

function getDayName(dayIndex){ //returnerer navn på dag basert på dag-indeks som parameter
    if(dayIndex == 0) return 'Man';
    if(dayIndex == 1) return 'Tirs';
    if(dayIndex == 2) return 'Ons';
    if(dayIndex == 3) return 'Tors';
    if(dayIndex == 4) return 'Fre';
    if(dayIndex == 5) return 'Lør';
    if(dayIndex == 6) return 'Søn';
    else return 'error day' + dayIndex;
}

function removeComforts(index) { // Slettefunksjonen for og fjerne fra comforts arrayet
    model.data.comforts.splice(index, 1)
    updateView()
}

function addComfortsInComfortsArray() { // Legge til comforts objekter
    let id = loopComfortsArray()
    let name = model.inputs.adminPageComfort.product
    let price = model.inputs.adminPageComfort.price
    if (price == 0 || name == '') { alert('Fyll inn feltene') }
    else model.data.comforts.push({ id: id, name: name, price: price })
    {
        model.inputs.adminPageComfort.product = "";
        model.inputs.adminPageComfort.price = 0;
    }
    updateView()
}

function loopComfortsArray() { // Returnerer ID til  addComfortsInComfortsArray() funksjonen
    let counter = 0;
    for (let i = 0; i < model.data.comforts.length; i++) {
        while (counter == model.data.comforts[i].id) { counter++ }
    }
    return counter;
}

function comittPriceChanges() { // Sjekker hvilke priser som er endra også kaller funksjonen for å endre prisene i modellen
    if (model.inputs.adminPageComfort.weekdayPriceHour === 0 &&
        model.inputs.adminPageComfort.weekdayPriceDay === 0 &&
        model.inputs.adminPageComfort.weekendPriceHour === 0 &&
        model.inputs.adminPageComfort.weekendPriceDay === 0) { alert('Fyll inn minst ett felt') }

    if (model.inputs.adminPageComfort.weekdayPriceHour != 0) { setPrice('weekdayHour') }
    if (model.inputs.adminPageComfort.weekdayPriceDay != 0) { setPrice('weekdayDay') }
    if (model.inputs.adminPageComfort.weekendPriceHour != 0) { setPrice('weekendHour') }
    if (model.inputs.adminPageComfort.weekendPriceDay != 0) { setPrice('weekendDay') };
    updateView()
}

function setPrice(toChek) { // Endrer pris i modellen basert på parameter
    let input = model.inputs.adminPageComfort
    let price = model.data.prices
    if (toChek == 'weekdayHour') {
        price.weekdayPriceHour = input.weekdayPriceHour;
        input.weekdayPriceHour = 0;
    } else if (toChek == 'weekdayDay') {
        price.weekdayPriceDay = input.weekdayPriceDay;
        input.weekdayPriceDay = 0;
    } else if (toChek == 'weekendHour') {
        price.weekendPriceHour = input.weekendPriceHour;
        input.weekendPriceHour = 0;
    } else if (toChek == 'weekendDay') {
        price.weekendPriceDay = input.weekendPriceDay;
        input.weekendPriceDay = 0;
    }
}

function changePackageEditorContent(index) { // Tar i mot select sin value og endrer valgt pakke i modellen
    model.inputs.adminPageComfort.selectPackage = index
    model.inputs.adminPageComfort.selectPackageDropdown = model.data.packageOptions[model.inputs.adminPageComfort.selectPackage].name
    updateView()
}

function changePackageOptions(toDo) { // Endrer pakkenavn, ukedag pris eller helg pris basert på parameter /* H */
    let packagePrice = model.data.packageOptions[model.inputs.adminPageComfort.selectPackage].price
    let inputPackageOptions = model.inputs.adminPageComfort

    if (toDo == 'weekendPrice' && inputPackageOptions.weekendPrice != 0) {
        packagePrice.weekendPrice = inputPackageOptions.weekendPrice;
        inputPackageOptions.weekendPrice = 0;
    }

    if (toDo == 'weekdayPrice' && inputPackageOptions.weekdayPrice != 0) {
        packagePrice.weekdayPrice = inputPackageOptions.weekdayPrice;
        inputPackageOptions.weekdayPrice = 0;
    }

    if (toDo == 'name' && inputPackageOptions.packageName != '') {
        model.data.packageOptions[model.inputs.adminPageComfort.selectPackage].name = inputPackageOptions.packageName;
        inputPackageOptions.packageName = '';
    }
   
    updateView()
}

function adminPageRemoveComfortFromPackage(index) { // Sletter objekter fra packageOptions arrayet
    model.data.packageOptions[model.inputs.adminPageComfort.selectPackage].comforts.splice(index, 1)
    updateView()
}

function addSubtractHour(toDo) { // Endrer antal timer i en pakke basert på parameter
    let hour = model.data.packageOptions[model.inputs.adminPageComfort.selectPackage]
    if (toDo == '▼' && hour.hours > 0) { hour.hours-- }
    else { hour.hours++ }
    if (hour.hours == 0) { hour.hours = 1 }
    updateView()
}

function addSubtractQuantity(toDo, product) { // Øker eller senker antall produkter
    let quantityInPackage = model.data.packageOptions[model.inputs.adminPageComfort.selectPackage].comforts
    if (toDo == '▼' && quantityInPackage[product].quantity != 0) { quantityInPackage[product].quantity--; }
    else { quantityInPackage[product].quantity++; }
    if (quantityInPackage[product].quantity == 0) { quantityInPackage[product].quantity++; }
    updateView()
}

function removePackage() { // Fjerner valgt pakke fra arrayet
    model.data.packageOptions.splice(model.inputs.adminPageComfort.selectPackage, 1)
    updateView()
}

function addItemToPackage() {   // Legger til nytt produkt til pakken
    let package = model.data.packageOptions[model.inputs.adminPageComfort.selectPackage];
    let packageName = model.inputs.adminPageComfort
    if (model.inputs.adminPageComfort.packageProduct == "") {
        alert("Legg til navn på vare")
    }
    else { package.comforts.push({ name: packageName.packageProduct, quantity: 1 }) }
    model.inputs.adminPageComfort.packageProduct = "";
    updateView()
}

function addNewPackage() { // Legger til ny pakke 
    let input = model.inputs.adminPageComfort
    let name = input.newPackageName
    let newHours = input.newPackageHour
    let newWeekdayPrice = input.newPackageWeekdayPrice
    let newWeekendPrice = input.newPackageWeekendPrice
    let newId = loopPackageArray()
    if (input.newPackageName != '' &&
        input.newPackageHour != 0 &&
        input.newPackageWeekdayPrice != 0 &&
        input.newPackageWeekendPrice != 0) {
        model.data.packageOptions.push(
            {
                id: newId,
                name: name,
                price: { weekdayPrice: newWeekdayPrice, weekendPrice: newWeekendPrice, },
                hours: newHours,
                comforts: []
            })
    } else return alert('Fyll inn feltene');
    updateView()
}

function loopPackageArray() { // Returnerer ID til  addNewPackage() funksjonen
    let counter = 0;
    for (let i = 0; i < model.data.packageOptions.length; i++) {
        while (counter == model.data.packageOptions[i].id) { counter++ }
    }
    return counter;
}
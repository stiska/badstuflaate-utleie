function updateAdminPageComfortView() { // Viser viewet på administratorsiden for bildebehandling
    let HTML = /*HTML*/ `
    
    <div class="adminpage-comforts-wrapper">
        <div class="adminpage-comforts-box-row1"> 
            <h4 class="admin-box-subtitle-title">Tilgjenglige ekstraprodukter:</h4>
            ${comfortsExtraProductLoop()}
            <div class="admin-extra-produckt-inputbox">
                <input type="number" onchange="model.inputs.adminPageComfort.price = this.value" placeholder="Pris"/>
                <input type="text" onchange="model.inputs.adminPageComfort.product = this.value" placeholder="Vare"/>
                <button class="admin-spann-button" onclick="addComfortsInComfortsArray()"> Legg til produkt</button>
            </div>    
        </div>    
    
        <div class="adminpage-comforts-box-row1">
            <h4 class="admin-box-subtitle-title">Endre priser hverdag:</h4>
           
            <input type="number" onchange="model.inputs.adminPageComfort.weekdayPriceHour = this.value" placeholder="${model.data.prices.weekdayPriceHour} Timespris Hverdag"/>
            <input type="number" onchange="model.inputs.adminPageComfort.weekdayPriceDay = this.value" placeholder="${model.data.prices.weekdayPriceDay} Dagspris Hverdag"/>
          
            <h4 class="admin-box-subtitle-title">Endre priser helg:</h4>
            
            <input type="number" onchange="model.inputs.adminPageComfort.weekendPriceHour = this.value" placeholder="${model.data.prices.weekendPriceHour} Timespris Helg"/>
            <input type="number" onchange="model.inputs.adminPageComfort.weekendPriceDay = this.value" placeholder="${model.data.prices.weekendPriceDay} Dagspris Helg">
            <button class="admin-spann-button" onclick="comittPriceChanges()"> Sett ny pris</button> 
        </div>
    
        <div class="adminpage-comforts-box-row2"> 
            <h4>Endre pakke:</h4>
            <select onchange="changePackageEditorContent(this.value) ">${packageOptionsSelector()}</select>
            ${showPackageEditor()}
            <input type="text" 
            onchange="model.inputs.adminPageComfort.packageProduct = this.value,model.app.selectPackageDropdown = this.value" 
            placeholder="Vare"/> 
            <button onclick="addItemToPackage()">Legg til vare</button> 
            <button class="admin-spann-button" onclick="removePackage()">Fjern pakke</button>
        </div>
        
        <div class="adminpage-comforts-box-row2"> 
            <h4 class="admin-box-subtitle-title">Legg til pakke:</h4>
            <div>Pakkenavn:</div>
            <input type="text" onchange="model.inputs.adminPageComfort.newPackageName = this.value" placeholder="Pakkenavn"/>
            <div>Ukedag pris:</div>
            <input type="number" onchange="model.inputs.adminPageComfort.newPackageWeekdayPrice = this.value" placeholder="Ukedag pris"/>
            <div>Helg pris:</div>
            <input type="number" onchange="model.inputs.adminPageComfort.newPackageWeekendPrice = this.value" placeholder="Helg pris"/>
            <div>Timer:</div>
            <input type="number" onchange="model.inputs.adminPageComfort.newPackageHour = this.value" placeholder="Timer"/>
            <button class="admin-spann-button" onclick="addNewPackage()">Legg til pakke</button>
        </div>
    </div>
    `;
    return HTML;
}

function comfortsExtraProductLoop() { // Lager HTML og lister igjennom comforts arrayet 
    let HTML = '';                    // og legger til knapper sletting 
    for (let i = 0; i < model.data.comforts.length; i++) {
        HTML += `
        ${model.data.comforts[i].name}: ${model.data.comforts[i].price},- 
        <button onclick="removeComforts(${i})">Fjern produkt</button>
        `
    }
    return HTML;
}

function showPackageEditor() { // Returnerer HTML med innholdet i valgt pakke
    let HTML = /*HTML*/
        `
        <div>Pakkenavn :  ${model.data.packageOptions[model.inputs.adminPageComfort.selectPackage].name}</div>
        <div class="admin-package-inputbox">
            <input class="admin-spann-button" 
            onchange="model.inputs.adminPageComfort.packageName = this.value"
            type="text"/>
            <button onclick="changePackageOptions('name')">Endre</button>
        </div>
        <div>Ukedags pris : ${model.data.packageOptions[model.inputs.adminPageComfort.selectPackage].price.weekdayPrice}</div> 
        <div class="admin-package-inputbox">
            <input class="admin-spann-button"  
            onchange="model.inputs.adminPageComfort.weekdayPrice = this.value"
            type="number"/>
            <button onclick="changePackageOptions('weekdayPrice')">Endre</button>
        </div>
        <div>Helge pris : ${model.data.packageOptions[model.inputs.adminPageComfort.selectPackage].price.weekendPrice}</div> 
        <div class="admin-package-inputbox">
            <input class="admin-spann-button" 
            onchange="model.inputs.adminPageComfort.weekendPrice = this.value" 
            type="number"/>
            <button onclick="changePackageOptions('weekendPrice')">Endre</button>
        </div>
        <div>Timer : ${model.data.packageOptions[model.inputs.adminPageComfort.selectPackage].hours}</div>
        <div class="admin-package-hour-buttons">
            <button onclick="addSubtractHour('▲')">▲</button> 
            <button onclick="addSubtractHour('▼')">▼</button>
        </div>
        ${loopPackageComforts()}
        `;
    return HTML
}

function loopPackageComforts() { // Returnerer HTML for ekstra produkter i vist pakke
    let HTML = ``
    for (let i = 0; i < model.data.packageOptions[model.inputs.adminPageComfort.selectPackage].comforts.length; i++) {
        HTML += /*HTML*/
            ` 
        <div>${model.data.packageOptions[model.inputs.adminPageComfort.selectPackage].comforts[i].name} : 
         ${model.data.packageOptions[model.inputs.adminPageComfort.selectPackage].comforts[i].quantity} Stk</div>
        <div class="admin-package-inputbox">   
            <button onclick="addSubtractQuantity('▲',${i})">▲</button> 
            <button onclick="addSubtractQuantity('▼',${i})">▼</button>
            <button onclick="adminPageRemoveComfortFromPackage(${i})">Slett</button>
        </div>
        `;
    }
    return HTML
}


function packageOptionsSelector() { // Returnerer valgene i dropdown menyen
    let HTML = `<option>${model.data.packageOptions[model.inputs.adminPageComfort.selectPackage].name}</option>`;
    for (let i = 0; i < model.data.packageOptions.length; i++) {
        if (model.data.packageOptions[i].name != model.data.packageOptions[model.inputs.adminPageComfort.selectPackage].name) {
            HTML += `
        <option value="${i}">${model.data.packageOptions[i].name}</option>  
        `
        }
    }
    return HTML

}
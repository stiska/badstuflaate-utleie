function updateUserPageView() { // Alle inputfeltene som tar imot bruker data 
    let HTML = /*HTML*/
        ` 
        <div class="login-container">
            <div class="new-user-container">  
                <h1 class="admin-box-subtitle-title"> Lag ny bruker: </h1>
                Brukernavn:
                <input 
                    type="text" placeholder="Navn"
                    onchange="model.inputs.newUserPage.name = this.value" 
                    value="${model.inputs.newUserPage.name}"
                /> 
                Adresse:
                <input 
                    type="text" placeholder="Adresse"
                    onchange="model.inputs.newUserPage.adress = this.value" 
                    value="${model.inputs.newUserPage.adress}"
                /> 
                Telefon:
                <input 
                    type="text" placeholder="Telefon"
                    onchange="model.inputs.newUserPage.phone = this.value" 
                    value="${model.inputs.newUserPage.phone}"
                /> 
                E-post:
                <input 
                    type="text" placeholder="E-post"
                    onchange="model.inputs.newUserPage.email = this.value" 
                    value="${model.inputs.newUserPage.email}"
                /> 
                Passord:
                <input 
                    type="password" placeholder="Passord"
                    onchange="model.inputs.newUserPage.password = this.value" 
                    value="${model.inputs.newUserPage.password}"
                />  
                Bekreft Passord:
                <input 
                    type="password" placeholder="Bekreft Passord"
                    onchange="model.inputs.newUserPage.confirmedPassword = this.value" 
                    value="${model.inputs.newUserPage.confirmedPassword}"
                /><br>
                <button class="admin-spann-button" onclick="generateNewUsers()">Lag ny bruker</button>
            </div>
        </div>
    `;
    return HTML;
}
function updateLoginPageView() {  
    let HTML = /*HTML*/
    `   
        <div class="login-container">
        <form class="login-input-container"> 
        <h1 class="login-title"> Logg inn: </h1>
            <input 
                type="text" 
                onchange="model.inputs.loginPage.userName = this.value" 
                value="${model.inputs.loginPage.userName}" 
                placeholder="Brukernavn"
            />
            <input  
                type="password" 
                onchange="model.inputs.loginPage.password = this.value" 
                value="${model.inputs.loginPage.password}"  
                placeholder="Passord"
            />
            <button onclick="login()">Logg inn</button>
            <br>
            <button onclick="switchPage('newUserPage')">Lag ny bruker</button>
            </form> 
        </div>
    `;
    return HTML;
}


function login(){ // Sjekker om username og passord stemmer overens med det som står i inputfeltene i loginView. 
    let attempt = '';
for (let i = 0; i < model.data.users.length; i++) {
    if(model.inputs.loginPage.userName == model.data.users[i].name)
    {
        if(model.inputs.loginPage.password == model.data.users[i].password){
            model.app.currentUser = model.data.users[i].name
            alert("Innlogging vellykket")
            model.inputs.loginPage.userName = ''
            model.inputs.loginPage.password = ''
            attempt = 'Sucess'
            switchPage('frontPage')
            updateView()
        } 
    } 
}
if(attempt != 'Sucess')  {alert('Innlogging feilet')}
}

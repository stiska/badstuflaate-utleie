function generateNewUsers() {  //Generer ny bruker basert på verdiene i input feltene 
    let name = model.inputs.newUserPage.name;
    let adress = model.inputs.newUserPage.adress;
    let phone = model.inputs.newUserPage.phone;
    let email = model.inputs.newUserPage.email;
    let password = model.inputs.newUserPage.password;
    let confirmedPassword = model.inputs.newUserPage.confirmedPassword;
    let missingInfo = false
    for (const key in model.inputs.newUserPage) {
        if (!model.inputs.newUserPage[key]) {
            missingInfo = true
        } else {
        }
    } if (missingInfo === true) {
        alert('Feltene er ikke fylt inn')
    } 

    if (missingInfo == false) {
        if (password === confirmedPassword && password != '') {
            model.data.users.push({ name: name, adress: adress, phoneNumber: phone, email: email, password: password })
            alert('Brukeren er opprettet')
            model.inputs.newUserPage.name = '';
            model.inputs.newUserPage.adress = '';
            model.inputs.newUserPage.phone = '';
            model.inputs.newUserPage.email = '';
            model.inputs.newUserPage.password = '';
            model.inputs.newUserPage.confirmedPassword = '';
            switchPage('loginPage')
            updateView()
        } else alert("Passordene er ikke like")
    }
}









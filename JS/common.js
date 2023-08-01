function switchPage(location) { // Side selector
    model.app.currentPage = location;
    updateView()
}

function openModal() { // Endrer modal modellen så den blir vist
    model.modal = 'block'
    updateView()
}

function closeModal() { // Endrer modal modellen så den blir lukket
    model.modal = 'none';
    updateView()
}

function outsideModalClickClose(event) { // lukker modalen når du klikker på utsiden
    if (!event.target.closest(".modal-content")) {
        closeModal();
    }
}

function getModal() { // Legger modal i HTML så den blir åpnet når vi endrer modal modellen til 'block'
    let HTML = /*HTML*/
    `
        <div onclick="outsideModalClickClose(event)" class="modal" style="display:${model.modal}">
            <div class="modal-content">
                <span onclick="closeModal()" class="close">&times;</span>
                <p>
                 ${model.app.modalContent} 
                </p> 
            </div>
        </div>
    `;
    return HTML
}

function sendToWebPage(webPage) { // Linker ikonene på navBarBottom til SoMe sidene
    if (webPage == 'instagram') {
        window.open('https://www.instagram.com')
    }
    if (webPage == 'facebook') {
        window.open('https://nb-no.facebook.com/')
    }
    if (webPage == 'twitter') {
        window.open('https://www.twitter.com')
    }
    if (webPage == 'youtube') {
        window.open('https://www.youtube.no')
    }
}

function checkIfPostHasImg(index) { // Sjekker om blogposten inneholder et bilde, hvis den ikke har det så sender den ikke med IMG HTML
    let HTML;
    if (model.data.blogPosts[index].postPicture == undefined) { return '' }
    else {
        HTML = /*HTML*/`  
            
                <img class="standard-img" src="${model.data.blogPosts[index].postPicture}">
            
        `;
        return HTML
    }
}

function bottomNavBar() { // Tegner opp navBar nederst på siden
    let HTML = /*HTML*/`
        <div class="navbar-bottom">
            <a onclick="sendToWebPage('youtube')"><img class="img" src="img/youtube.png"></a>
            <a onclick="sendToWebPage('twitter')"><img class="img" src="img/twitter.png"></a>
            <a onclick="sendToWebPage('facebook')"><img class="img" src="img/facebook.png"></a>
            <a onclick="sendToWebPage('instagram')"><img class="img" src="img/instagram.png"></a>
        </div>
    `;
    return HTML
}

function upperNavBar() { // Tegner opp navBar øverst på siden // Skal vi skrive den om og trekke ut? Spør Joachim
    let HTML = ``;
    if (model.app.currentUser == 'admin') {
        HTML = /*HTML*/ `
        <div class="navbar-top">
            <a onclick="switchPage('frontPage')">Forside</a>
            <a onclick="switchPage('bookingPage')">Booking</a>
            <a onclick="switchPage('blogPage')">Blogg</a>
            <a onclick="switchPage('blogPage'),openEditorModal()">Ny blogpost</a>
            <b onclick="logOutUser()">Logg ut</b>
        <div class="dropdown">
                <button class="dropbtn">Administrator
                <i class="fa fa-caret-down"></i>
                </button>
                <div class="dropdown-content">
                    <a onclick="switchPage('adminPagePicture')">Kontrollpanel bilder</a>
                    <a onclick="switchPage('adminPageComfort')">Kontrollpanel produkter</a>
                    <a onclick="switchPage('adminPageBooking')">Kontrollpanel booking</a>
                </div>
        </div> 
            <a onclick="switchPage('loginPage')">${showCurrentLoggedInUser()}</a>
        </div>
     
    `;
    } else if (model.app.currentUser != '' && model.app.currentUser != 'admin') {
        HTML = /*HTML*/ `
    
        <div class="navbar-top">
            <a onclick="switchPage('frontPage')">Forside</a>
            <a onclick="switchPage('bookingPage')">Booking</a>
            <a onclick="switchPage('blogPage')">Blogg</a>
            <b onclick="logOutUser()">Logg ut</b>
            <a onclick="switchPage('loginPage')">${showCurrentLoggedInUser()}</a>
        </div>
     
    `;
    }
    if (model.app.currentUser == '') {
        HTML = /*HTML*/` 
        <div class="navbar-top">
            <a onclick="switchPage('frontPage')">Forside</a>
            <a onclick="switchPage('bookingPage')">Booking</a>
            <a onclick="switchPage('blogPage')">Blogg</a>
            <a onclick="switchPage('loginPage')">${showCurrentLoggedInUser()}</a>
        </div>`;
    }
    return HTML;
}

function showCurrentLoggedInUser() { // Viser frem hvilken bruker som er logget inn i Navbaren
    let HTML = ``
    if (model.app.currentUser == '') {
        HTML = 'Logg inn'
    } else {HTML = 'Logget inn som ' + model.app.currentUser }
    return HTML
}

function logOutUser() { // Logo out knappen
    model.app.currentUser = '';
    alert('Du har nå logget ut')
    updateView()

}

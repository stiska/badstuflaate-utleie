function adminPagePictureLoop() { // Lister opp bildene i frontPagePictures inn i adminPageArray div'en legger til slettefunksjon
    let HTML = '';
    model.app.currentPicture = 0
    for (let i = 0; i < model.data.frontPagePictures.length; i++) {
        HTML += /*HTML*/`
            <a onclick="adminPagePreviewPictureSelector(${i})" href="#">${model.data.frontPagePictures[i].pictureTitle}</a> 
            <button onclick="removeAdminPagePicture(${i})">Fjern bilde</button>
       `;
    }
    return HTML;
}
function adminPagePreviewPictureSelector(index) { // Endrer modellen til indexen i loopen for og få vist riktig bilde når man klikker på de
    model.app.currentPicture = index
    updateView()
}
function removeAdminPagePicture(index) { // Sletter bilder fra frontPagePictures arrayet
    model.data.frontPagePictures.splice(index, 1)
    updateView()
}

function adminPageUploadPicture() { // Funksjon som later som vi har en backend og pusher et bildet i arrayet
    let imglink = "/img/picture4.png";
    let title =  'Forside bilde 4';
    model.data.frontPagePictures.push({pictureTitle: title, imageLink: imglink,})
    updateView()
}  

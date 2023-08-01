function openSelectedBlogPostModal(index) { // Åpner blogposten når man klikker på header i posten
    model.app.modalContent = /*HTML*/
    `
        <div class="blog-postcontent-sak">
            <h1>${model.data.blogPosts[index].postTitle}</h1>
            <div class="blog-postcontent-img-div">${checkIfPostHasImg(index)}</div>
            <div>${model.data.blogPosts[index].postText}<div>
        </div>
    `;
    openModal()
}

function openEditorModal() { // Åpner en ny editor modal & oppdaterer content 
    updateEditorModalContent()
    openModal()
}

function updateEditorModalContent() { // Oppdaterer modal view på editor modal
    model.app.modalContent = /*HTML*/
    `
    <div class="editor-modal-content">
        <h3 >Skriv nytt blogginnlegg: </h3>
        <h4 style="margin: 2px, font-size: 30px;">Velg tittel: </h4>
            <input class="input-modal-content-text"
                onchange="model.inputs.blogPage.titlePost = this.value" 
                value="${model.inputs.blogPage.titlePost}" 
                placeholder="Tittel blogpost">
         
        
        <div class="editor-picture-container">
            <h4>Velg et av bildene for og få det med i blogginnlegget:</h4>
            ${listEditorPictures()}
        </div>
        
        <textarea class="input-modal-content-textarea"
            onchange="model.inputs.blogPage.currentPost = this.value" 
            placeholder="Skriv blogginnlegget" 
        >${model.inputs.blogPage.currentPost}</textarea> 
        <button type="submit" onclick="generateNewBlogPost()">Lag post</button>
    </div>
    `;
    updateView()
}
                                    // Tar i mot input fra editor modal og pusher til blogpost Objektet inn i arrayet med blogposter
function generateNewBlogPost() {    // Og resetter inputene
    if (model.inputs.blogPage.titlePost == '' || model.inputs.blogPage.currentPost == '') {
        alert('Du kan ikke gå videre før du har lagt til tittel og tekst i innlegget ditt')
        return
    }
    let id = model.data.blogPosts.length
    let title = model.inputs.blogPage.titlePost
    let text = model.inputs.blogPage.currentPost
    let postPicture = ''
    for (let i = 0; i < model.data.blogPictures.length; i++) {

        if (model.data.blogPictures[i].editorBorder == 'black') {
            postPicture = model.data.blogPictures[i].imageLink
        }
    }
    if (postPicture == '') {
        model.data.blogPosts.push({ postId: id, postTitle: title, postText: text, })
    } else {
        model.data.blogPosts.push({ postId: id, postTitle: title, postText: text, postPicture: postPicture })
    }
    model.inputs.blogPage.titlePost = '';
    model.inputs.blogPage.currentPost = '';
    for (let i = 0; i < model.data.blogPictures.length; i++) {
        model.data.blogPictures[i].editorBorder = '#c7d4bc'
    }
    closeModal()
}

function chooseEditorPicture(index) { // Setter svart ramme rundt valgt bilde i editorModalen
    model.app.editorPicture = index
        if (model.data.blogPictures[index].editorBorder == 'black') {
            for (let i = 0; i < model.data.blogPictures.length; i++) {
                model.data.blogPictures[i].editorBorder = '#c7d4bc'
            }
        updateEditorModalContent()
        } else {
            for (let i = 0; i < model.data.blogPictures.length; i++) {
                model.data.blogPictures[i].editorBorder = '#c7d4bc'
            }
            model.data.blogPictures[index].editorBorder = 'black'
        }
    updateEditorModalContent()
}

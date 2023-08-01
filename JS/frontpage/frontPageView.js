function updateFrontPageView() {
    let HTML = /*HTML*/
        `    
               
        <div class="frontpage-container">
            <button class="frontpage-left-button" onclick="changeFrontPagePicture('<')"><</button>
            <div class="frontpage-picture-box">
                <img class="front-page-images fill" 
                src="${model.data.frontPagePictures[model.app.currentPicture].imageLink}">
            </div>
            <button class="frontpage-right-button" onclick="changeFrontPagePicture('>')">></button>
            <br>
            <div class="frontpage-blog-and-stuff-box">
                <div class="frontpage-blog-preview-box">  
                    ${listLatestBlogPosts()}
                </div>
                <div class="frontpage-blog-preview-box"> 
                    ${getFrontPageTable()}
                </div>
            </div> 
            <div class="blog-wrapper">
                ${getBlogPostModal()}
            </div>
        </div>
       
        `;
    return HTML;
}
// div med pakke priser som ikke ble med i ferdig produktet
/*
 <div class="frontpage-packages-wrapper">
            <div class="frontpage-Packages">
                ${getFrontPagePrices()}
            </div>
        </div>
*/

function listLatestBlogPosts() { // Oppdaterer forsiden med den siste blogposten i arrayet
    let index = model.data.blogPosts.length - 1
    let HTML = /*HTML*/
        `
        <div>
            <a href="#" onclick="openModal()">
                <h1 >${model.data.blogPosts[index].postTitle}</h1>
            </a>  
            ${model.data.blogPosts[index].postText}
        </div>
    `;
    return HTML;
}

function getBlogPostModal() { // Legger modal i HTML så den blir åpnet når vi endrer modal modellen til 'block'
    let index = model.data.blogPosts.length - 1
    let HTML = /*HTML*/
        `
        <div onclick="outsideModalClickClose(event)" class="modal" style="display:${model.modal}">
            <div class="modal-content">
                <span onclick="closeModal()" class="close">&times;</span>
                 <p>
                    <div class="blog-postcontent-sak">
                        <h1>${model.data.blogPosts[index].postTitle}</h1>
                            ${checkIfPostHasImg(index)}
                        <div>${model.data.blogPosts[index].postText}<div>
                    </div>    
                </p> 
            </div>
        </div>
       
    `;
    return HTML;
}

function getFrontPagePrices() { //lager html for pakke priser som ikke ble med i ferdig produktet
    let html = //html
        `<div class="package-prices-div"><table>
        <tr><th colspan="2">Pakkepriser</th></tr>`;
    for (let packageOption of model.data.packageOptions) {
        html += `<tr><td colspan="2">${packageOption.name}</td></tr>
        <tr><td>Ukedagspris:</td><td>${packageOption.price.weekdayPrice}</td></tr>
        <tr><td>Helgepris:</td><td>${packageOption.price.weekendPrice}</td></tr>
        `;
    }
    html += `</table></div></div>`;
    return html;
}

function getFrontPageTable() { //lager html for uke og helg priser på forsiden under bilde til høyre
    let html = //html
        `<div class="front-page-tables-div">
        </div class="ordinary-prices-div">
            <table class="front-page-table">
            <tr><th colspan="2">Booking priser:</th></tr>
            <tr><td>Timespris ukedag:</td><td>${model.data.prices.weekdayPriceHour}</td></tr>
            <tr><td>Timespris helg:</td><td>${model.data.prices.weekendPriceHour}</td></tr>
            <tr><td>Heldagspris uke:</td><td>${model.data.prices.weekdayPriceDay}</td></tr>
            <tr><td>Heldagspris helg:</td><td>${model.data.prices.weekendPriceDay}</td></tr>
            </table>
        </div>`;
    return html;
}

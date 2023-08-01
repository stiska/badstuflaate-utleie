function changeFrontPagePicture(selector){ //Bytter bilder på frontsiden ettersom man trykker på knappene
	let frontPagePictures = model.data.frontPagePictures;

	if(selector === '>'){
		model.app.currentPicture ++;
		if(model.app.currentPicture >= frontPagePictures.length)
			model.app.currentPicture = 0;
	}
	else if(selector === '<'){
		model.app.currentPicture --;
		if(model.app.currentPicture < 0){
			model.app.currentPicture = frontPagePictures.length - 1;
		}	
	}
	updateView()
} 
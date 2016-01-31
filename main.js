var pages = document.querySelector('#pages'),
	progress = document.querySelector('#progress'),
	toolbarButton = document.querySelector('#toolbar-button'),
	toolbarTitle = document.querySelector('#toolbar-title'),
	selectService = document.querySelector('#select-service'),
	serviceSubcategories = document.querySelector('#service-subcategories'),
	problemDescription = document.querySelector('#problem-description');
	phoneNumber = document.querySelector('#phone-number');

//-----------------------------------
// Hedaer Navigation
//-----------------------------------
pages.addEventListener('iron-select', function(){
	toolbarTitle.innerHTML = this.selectedItem.title;
	switch(this.selected){
		case 0:
		progress.value = 25;
		break
		case 1:
		progress.value = 50;
		break
		case 2:
		progress.value = 75;
		break
		case 3:
		progress.value = 100;
	}
	if (this.selected == 0){
		toolbarButton.icon = "menu";
		toolbarButton.paperDrawerToggle = true;
	} else if (this.selected != 0) {
		toolbarButton.icon = "arrow-back";
		toolbarButton.paperDrawerToggle = false;
	}
})

toolbarButton.addEventListener('click', function(){
	if (pages.selected != 0){
		if (pages.selected == 1){
			pages.selectedItem.innerHTML = '';
		}
		pages.selectPrevious();	
	}
});

//------------------------------------------
// Select Service
//------------------------------------------
selectService.title = "Выберите категорию";
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://cp.staff05.ru/?r=api/get-category', true);
xhr.onload = function(){
	var services = JSON.parse(this.responseText);
	for (var i in services){
	var categoryCube = new CategoryCube(services[i]);
	categoryCube.addEventListener('click', function(){
		getSubcategories(this.id);
		serviceSubcategories.title = this.name;
		pages.selectNext();
	})
	selectService.appendChild(categoryCube);
}
};
xhr.send();

function getSubcategories(id){
	xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://cp.staff05.ru/?r=api/get-sub-category&id=' + id, true);
	xhr.onload = function(){
		setSubcategories(JSON.parse(this.responseText))
	}
	xhr.send();
}
//-----------------------------------------
// Service Subcategories
//-----------------------------------------
function setSubcategories(subcategories){
	for (var i in subcategories){
		var subcategoryCard = document.createElement('div');
		subcategoryCard.appendChild(document.createTextNode(subcategories[i].name));
		subcategoryCard.addEventListener('click', function(){
			pages.selectNext();
			subcategoryId.value = subcategories[i].id;
		})
		serviceSubcategories.appendChild(subcategoryCard);
	}
}
var ert;
//-----------------------------------
// Problem Description
//-----------------------------------
var subcategoryId = document.querySelector('#subcategory-id');
problemDescription.title = 'Описание проблемы';
document.querySelector('#show-map-dialog').onclick = function(){document.querySelector('#map-dialog').open()};
document.querySelector('#to-last-page').onclick = function(){pages.selectNext()};
navigator.geolocation.getCurrentPosition(function(position){
	document.querySelector('#google-map').latitude = position.coords.latitude;
	document.querySelector('#google-map').longitude = position.coords.longitude;
})

//--------------------------------------
// Phone Number
//--------------------------------------
phoneNumber.title = 'Введите номер телефона';
document.querySelector('#send').onclick = function(){
	var xhr = new XMLHttpRequest();
	var formData = new FormData(document.forms.form);
	formData.append('phone', document.querySelector('#phone').value);
	xhr.open('POST', 'http://cp.staff05.ru/?r=api/send-order', true);
	xhr.send(formData);
	console.log(formData);
}
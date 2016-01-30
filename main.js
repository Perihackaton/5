var pages = document.querySelector('#pages');
var toolbarButton = document.querySelector('#toolbar-button');
var toolbarTitle = document.querySelector('#toolbar-title');


pages.addEventListener('iron-select', function(){
	toolbarTitle.innerHTML = '<h1>' + this.selectedItem.title + '</h1>';
	if (this.selected == 0){
		toolbarButton.icon = "menu"
	} else if (this.selected != 0) {
		toolbarButton.icon = "arrow-back"
	}
})

toolbarButton.addEventListener('click', function(){
	if (pages.selected != 0){
		pages.selectPrevious();
	}
});


//------------------------------------------
// Select Service
//------------------------------------------
var icons = ['icons/icon_2.svg', 'icons/icon_2.svg', 'icons/icon_1.svg','icons/icon_1.svg', 'icons/icon_2.svg', 'icons/icon_1.svg'];
var selectService = document.querySelector('#select-service');

selectService.title = 'Выберите услугу';
for (var i in icons){
	var categoryCube = new CategoryCube(icons[i]);
	categoryCube.addEventListener('click', function(){
		pages.selectNext();
	})
	selectService.appendChild(categoryCube);
}

//-----------------------------------------
// Service Subcategories
//-----------------------------------------
var subcategories = ['Установка', 'Уборка', 'Постройка'];
var serviceSubcategories = document.querySelector('#service-subcategories');

serviceSubcategories.title = 'Компьютерная помощь'
for (var i in subcategories){
	var subcategoryCard = document.createElement('div');
	subcategoryCard.appendChild(document.createTextNode(subcategories[i]));
	subcategoryCard.addEventListener('click', function(){
		pages.selectNext();
	})
	serviceSubcategories.appendChild(subcategoryCard);
}
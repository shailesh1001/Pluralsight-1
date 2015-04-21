var 
    items = document.getElementsByClassName('className'),
    log = document.getElementById('id');
log.innerText = 'some text';

// Get single element (returns first element found)
var singleItem = document.querySelector('#id');

//Get multiple elements
var manyItems = document.querySelectorAll('div');

//Get all elements in a class
var classItems = document.querySelectorAll('.className');

//Can select children elements 
singleItem.querySelectorAll('childElements');

//Dynamically add elements to page
var newItem = document.createElement('DIV');
newItem.className = 'className';
newItem.innerText = 'new div';
manyItems.appendChild(newItem);
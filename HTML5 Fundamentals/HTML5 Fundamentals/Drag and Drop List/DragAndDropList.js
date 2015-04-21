var sourceContainerId = '';
var isDnDTypesSupported = true;

var cancel = function (e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    return false;
};

var dragStart = function (e) {
    var index = $(e.target).index();
    $(this).addClass('drag');

    index += '';    // convert to string for IE

    // Set 'index' of element as data to be transferred
    // [IE does not support plain text]
    try {
        e.dataTransfer
            .setData('text/plain', index);
    }
    catch (ex) {
        e.dataTransfer
            .setData('Text', index);
        isDnDTypesSupported = false;
    }
};

var dropped = function (e) {
    cancel(e);
    
    $(this).removeClass('drag');

    var oldIndex;

    if (isDnDTypesSupported) {
        oldIndex = e.dataTransfer.getData('text/plain');
    }
    else {
        oldIndex = e.dataTransfer.getData('Text');
    }
   
    var target = $(e.target);
    var newIndex = $(target.index());
    var dropped = $(this)
                    .parent()
                    .children()
                    .eq(oldIndex);
    dropped.remove();

    if (newIndex > oldIndex) {
        target.before(dropped);
    }
    else {
        target.after(dropped);
    }
};

var dragOver = function (e) {
    cancel(e);
};

var dragLeave = function (e) {

};

var dragEnd = function (e) {
    $('.drag').removeClass('drag');
};

window.onload = function ()
{
    var forEach = Array.prototype.forEach;
    var selector = '.list-container li',
        listItems = document.querySelectorAll(selector);

    forEach.call(listItems, function (item) {
        $(item).prop('draggable', true);
        item.addEventListener('drop', dropped, false);
        item.addEventListener('dragenter', cancel, false);     // necessary event
        item.addEventListener('dragover', dragOver, false);    // necessary event
        item.addEventListener('dragstart', dragStart, false);
        item.addEventListener('dragend', dragEnd, false);
    });
}



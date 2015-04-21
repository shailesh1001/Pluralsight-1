var sourceContainerId = '';

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

    $(this).addClass('drag');

    var dto = e.dataTransfer;

    // IE does not support plain text
    try {
        e.dataTransfer
            .setData('text/plain',
                e.target.id);
    }
    catch (ex) {
        e.dataTransfer
            .setData('Text', e.target.id);
    }
    
    sourceContainerId = this.parentElement.id;
};

var dropped = function (e) {
    
    cancel(e);
    var id = null;
    var dto = e.dataTransfer;
    var dropped = null;
        
    if (dto.types.length > 0) {
        if (dto.types[0] === 'Text') {
            id = dto.getData('Text');
        }
        else {
            id = dto.getData('text/plain');
        }
    }

    if (id !== null) {
        dropped = document.querySelector('#' + id);
    }

    if (this.id !== sourceContainerId) {
        e.target.appendChild(dropped);
        $(dropped).removeClass('drag');
    }
        $(this).removeClass('over');
};

var dragOver = function (e) {
    cancel(e);
    $(this).addClass('over');
};

var dragLeave = function (e) {
    $(this).removeClass('over');
};

var dragEnd = function (e) {
    $('.drag').removeClass('drag');
    $('.over').removeClass('over');
};

window.onload = function ()
{
    var forEach = Array.prototype.forEach;

    var selector = '[data-role="drag-drop-container"]',
        dropContainers = document.querySelectorAll(selector);
    forEach.call(dropContainers, function (container) {
        container.addEventListener('drop', dropped, false);
        container.addEventListener('dragenter', cancel, false);     // necessary event
        container.addEventListener('dragover', dragOver, false);    // necessary event
        container.addEventListener('dragend', dragEnd, false);
    });

    var selector = '[draggable="true"]',
        dragSources = document.querySelectorAll(selector);
    forEach.call(dragSources, function (source) {
        source.addEventListener('dragstart', dragStart, false);
        source.addEventListener('dragend', dragEnd, false);
    });

    
}



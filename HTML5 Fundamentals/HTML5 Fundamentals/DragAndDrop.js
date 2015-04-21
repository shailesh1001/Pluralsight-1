/*
Drag Source
    dragstart
    drag
    dragend

Drag Target
    dragenter
    dragover
    dragleave
    drop
*/

var
    dragStart = function (e) {
        // IE doesn't support text/plain
        try {
            e.dataTransfer
                .setData('text/plain',
                    e.target.id);
        }
        catch (ex) {
            e.dataTransfer
                .setData('text', e.target.id);
        }
    },

    dropped = function (e) {
        if(this.id !== sourceContainterId){
            cancel(e);
            var id;

            try {
                id = e.dataTransfer.getData('text/plain');
            }
            catch (ex) {
                id = e.dataTransfer.getData('text');
            }

            e.target.appendChild(
                document.querySelector('#' + id));
        }
    },

    cancel = function (e) {
        if (e.preventDefault) {
            e.preventDefault();
        }

        if (e.stopPropagation) {
            e.stopPropagation();
        }

        return false;
    },

    forEach = Array.prototype.forEach;

var
    selector = '[data-role="drag-drop-container"]',         // must add this attribute to elements in HTML
    dc = document.querySelectorAll(selector);

forEach.call(dc, function (c) {
    target.addEventListener('drop', dropped, false);
    target.addEventListener('dragenter', cancel, false);    // cancelling default behavior
    target.addEventListener('dragover', cancel, false);     // cancelling default behavior
});

var
    selector = '[draggable="true"]',                        // add to all drag source elements
    ds = document.querySelectorAll(selector);

forEach.call(ds, function (source) {
    source.addEventListener('dragstart',
                            dragStart,
                            false);
});




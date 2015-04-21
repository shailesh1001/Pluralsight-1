
var
    canvas = document.getElementById(),
    context = null;

// triangular shape
if (canvas && canvas.getContext) {
    context = canvas.getContext('2d');
    context.beginPath();
    context.moveTo(75, 50);
    context.lineTo(75, 100);
    context.lineTo(25, 100);
    context.fill(); // fills in triangle with default color (black)
}

if (Modernizr.canvas) {
    context = canvas.getContext('2d');

    context.beignPath();
    context.moveTo(100, 100);
    context.lineTo(100, 300);
    context.lineTo(150, 300);
    context.lineTo(150, 155);
    context.lineTo(205, 155);
    context.lineTo(205, 100);
    
    context.fillStyle = '#0099ff';  // adjust fill color
    context.fill();

    context.lineWidth = 6;          // 6px border
    context.lineJoin = 'round';     // rounded corners
    context.strokeStyle = '#cccccc';// border color
    context.stroke();

    // * NOTE *
    // stroke and fill order has effect on image
}


// Create transparent shapes and shape cutouts
if (Modernizr.canvas) {
    context = canvas.getContext('2d');

    // red rectangle
    context.fillStyle('rgb(500,0,0)');
    context.fillRect(
        50,     // x coord
        50,     // y coord
        100,    // width
        100);   // height

    // blue rectangle with transparency
    context.fillStyle('rgb(0,0,500, 0.5)');
    context.fillRect(
        50,     // x coord
        50,     // y coord
        100,    // width
        100);   // height

    // clear rectangle
    context.clearRect(
        115,    // x coord
        115,    // y coord
        20,     // width
        20);    // height

    // green outline around clear rect
    context.strokeStyle = 'rgb(51,153,0)';
    context.lineWidth = 6;
    context.strokeRect(115, 115, 20, 20);
}

// 2 radial gradients + text on top
if (Modernizr.canvas) {
    var g1 = context.createRadialGradient(
        160,    // X coord of grad start
        120,    // Y coord of grad start
        0,      // radius of start circle
        320,    // X coord of grad end
        220,    // Y coord of grad end
        300     // radius of end circle
        );

    g1.addColorStop(0, '#ffffff');
    g1.addColorStop(1, '#999999');

    // base circle
    context.lineWidth = 0;
    context.strokeStyle = '#000000';
    context.fillStyle = g1;
    context.beginPath();
    context.arc(
        180,            // x coord of arc start
        180,            // y coord of arc start
        160,            // radius
        0,              // start angle
        Math.PI * 2,    // end angle
        true);          // anticlockwise

    context.fill();


    var g2 = context.createRadialGradient(360,
                                          320,
                                          0,
                                          260,
                                          220,
                                          200);
    // inner circle
    context.fillStyle = g2;
    context.beginPath();
    context.arc(180,
                180,
                130,
                0,
                Math.PI * 2,
                true);
    context.fill();

    context.fillStyle = '#ffffff';
    context.font = '280px Arial';
    context.fillText('C', 80, 280);
}

var degreesToRadians = function (degrees) {
    return degrees * Math.PI / 180;
}


// Scaling and rotating an image
if (Modernizer.canvas) {
    context = canvas.getContext('2d');
    var img = new Image();
    img.onload = function () {
        context.drawImage(img, 0, 0);
    }

    img.src = "../img/imageToDisplau.png";

    // Uncomment to see various image scaling
    //context.scale(.5, .5);  // decrease X and Y axes by half
    //context.scale(2, 2);    // increase X and Y axes by 2
    //context.scale(.25, .5); // X axis is smushed more than Y axis

    // Uncomment to see various image rotations
    //context.rotate(.1);                     // rotate using radians
    //context.rotate(degreesToRadians(15));   // rotate by 15 degrees
}

var
    canvas = document.querySelector('#canvas'),
    context = null;

// translation and state preservation
if (Modernizr.canvas) {
    context = canvas.getContext('2d');

    // Uncomment to translate canvas from (0,0) to (100,100)
    //context.translate(100, 100);

    context.save();     // saves state of canvas
    // insert
    // canvas
    // changes
    context.restore();  // undoes all context changes since last save() call
}



// Animation
var
    x = 0,
    y = 0,
    frame,
    canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');

var draw = function () {
    // clears canvas and redraws a longer line each time
    if (x <= canvas.width) {
        context.clearRect(0, 0, 354, 354);
        context.strokeStyle = 'rgb(139, 0, 0)';
        context.lineWidth = 8;
        context.beginPath();
        context.moveTo(0, 0);
        context.moveTo(x += 10, y += 10);
        context.stroke();
    }
    else {
        clearInterval(frame);
        logBold('Animation Complete');
    }
}

if (Modernizr.canvas) {
    // call draw function ever 25ms
    frame = setInterval(function () {
        draw();
    }, 25);
}


// Clipping the canvas (circular)
if (Modernizr.canvas) {
    context = canvas.getContext();

    // define clipping boundary (must be called before the image load)
    context.beginPath();
    context.arc(135, 120, 120, 0, Math.PI * 2, true);
    context.clip();

    var img = new Image();
    img.onload = function () {
        context.drawImage(img, 0, 0);

        // add border
        context.lineWidth = 15;
        context.strokeStyle = '#cccccc';
        context.stroke();
    }
    img.src = '../img/ImageToClip.png';
}

var
    canvas = document.getElementById(),
    context = null,
    x = 40,
    y = 25,
    width = height = 200;

// Clipping the canvas (rectangle)
if (Modernizr.canvas) {
    context = canvas.getContext();

    // define clipping boundary (must be called before the image load)
    context.beginPath();
    context.rect(x, y, width, height);
    context.clip();

    var img = new Image();
    img.onload = function () {
        context.drawImage(img, 0, 0);

        // add border
        context.lineWidth = 15;
        context.strokeStyle = '#cccccc';
        context.stroke();
    }
    img.src = '../img/ImageToClip.png';
}


// Magnify an image
var
    canvas = document.getElementById('canvas'),
    img = new Image(),
    context = null,
    dataUrl = null,
    isMagnified = false,

    init = function () {
        img.onload = function () {
            context.drawImage(img, 0, 0);
            debugger;
            dataUrl = canvas.toDataUrl;
        }
        img.src = '../img/ImageToMagnify.png';
        isMagnified = false;
    },

    magnify = function () {
        context.save();
        context.lineWidth = 10;
        context.shadowColor = '#000';
        context.shadowBlur = 15;
        context.shadowOffsetX = 5;
        context.shadowOffsetY = 5;

        context.save();

        context.beginPath();
        context.moveTo(230, 230);

        context.lineCap = 'round';
        context.lineTo(285, 285);
        context.stroke();

        context.beginPath();
        context.arc(150, 150, 115, 0, Math.PI * 2, true);
        context.clip();

        var magnified = new Image();
        magnified.src = dataUrl;

        context.scale(1.5, 1.5);
        context.drawImage(img, -40, -40);
        context.restore();
        context.arc(150, 150, 115, 0, Math.PI * 2, true);
        context.stroke();
        context.restore();
        isMagnified = true;
    };

if (Modernizr.canvas) {
    context = canvas.getContext('2d');
    $('canvas').click(function () {
        if (isMagnified) {
            init();
        }
        else {
            magnify();
        }
    });
}


// static chart
var
    canvas = document.getElementById('canvas'),
    context = null;

if (Modernizer.canvas) {
    context = canvas.getContext('2d');

    var img = new Image();
    img.onload = function () {
        context.drawImage(img, 0, 0);
        context.moveTo(70, 105);
        context.lineTo(105, 132);
        context.lineTo(142, 250);
        context.lineTo(176, 175);
        context.lineTo(212, 145);
        context.lineTo(245, 197);
        context.lineTo(280, 90);

        context.stroke();
    }
    img.src = '../img/chart-backgrounnd.png';
}

// dynamic chart
var chartData = [
    {month:  70, perf: 125},
    {month: 105, perf: 280},
    {month: 140, perf: 115},
    {month: 175, perf:  45},
    {month: 210, perf: 200},
    {month: 245, perf: 245},
    {month: 280, perf: 177}],

    canvas,
    context,
    index = 0,

    drawSegment = function () {
        var x1, y1, x2, y2;

        x1 = chartData[index].month;
        y1 = chartData[index].perf;

        x2 = chartData[index + 1].month;
        y2 = chartData[index + 1].perf;

        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        index++;
    }

if (Modernizer.canvas) {
    canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');

    var bkgImg = new Image();
    bkgImg.onload = function () {
        context.drawImg(bkgImg, 0, 0);
        drawSegment();
    }
    bkgImg.src = '../img/chart-background';
    
    context.strokeStyle() = 'rgb(31, 172, 242)';
    context.lineWidth() = 4;
    context.lineCap = 'round';

    var frame = setInterval(function () {
        drawSegment();
        if (!(index < chartData.length - 1)) {
            clearInterval(frame);
        }
    }, 750);
}


// extracting thumbnails from videos
var
    video = document.querySelector('#vid'),
    canvas = document.querySelector('#canvas'),
    context = null,
    btn = $('#btn'),
    thumbs = $('thumbs'),
    thumbInterval = null;

if (Modernizer.canvas) {
    context = canvas.getContext('2d');

    var width =
        video.width =
        canvas.width =
        video.offSetWidth = 320;

    var height =
        video.height =
        canvas.height =
        video.offSetHeight = 320;

    var getThumb = function () {
        context.drawImage(video,
            0,
            0,
            width,
            height
            );
        var thumb = new Image();
        thumb.src = canvas.toDataURL('image/png');

        thumb.width = 60;
        thumbs.append(thumb);
    };

    btn.click(function() {
        getThumb();
    });

    video.addEventListener('play', function () {
        thumbInterval = setInterval(function () {
            getThumb();
        }, 4000);
    }, false);
}
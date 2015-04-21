var
    video = document.querySelector('#vid'),
    remainingTime = $('#remaingingTime'),
    totalTime = $('#totalTime'),
    playPause = $('#playPause'),
    stop = $('#stop'),
    rewind = $('#rewind'),
    begin = $('#begin'),
    end = $('#end'),
    fastForward = $('#fastForward'),
    volume = $('#volume'),
    mute = $('#mute'),
    scrubber = $('#scrubber'),
    playbackRate = $('#playbackRate'),

    TIME_STEP = 5,

    formatTime = function (seconds) {
        seconds = Math.round(seconds);
        var minutes = 0;
        if (seconds >= 60) {
            minutes = Math.floor(seconds / 60);
            seconds = seconds - (minutes * 60);
        }
        
        seconds = seconds + '';
        if (seconds.length == 1) {
            seconds = '0' + seconds;
        }

        return minutes + ':' + seconds;
    };

playPause.click(function() {
    if (video.paused || video.ended) {
        video.play();
        playPause.text('Play');
    }
    else {
        video.pause();
        playPause.text('Pause');
    }
});

stop.click(function () {
    video.pause();
    video.currentTime = 0;
    playPause.text('Play');
    video.playbackRate = 1;
    playbackRate.val(1);
});

begin.click(function () {
    video.currentTime = 0;
});

rewind.click(function () {
    video.currentTime -= TIME_STEP;
});

fastForward.click(function () {
    video.currentTime += TIME_STEP;
});

end.click(function () {
    video.currentTime = video.duration;
    playPause.text('Play');
});

volume.change(function () {
    video.volume = this.value;
});

var vol = 0;
mute.click(function () {
    if (!video.muted) {
        vol = volume.val();
    }

    video.muted = !video.muted;

    if (!video.muted) {
        volume.val(vol);
        mute.text('Mute');
    }
    else {
        volume.val(0);
        mute.text('Unmute');
    }
});

scrubber.change(function () {
    video.currentTime = this.value;
});

playbackRate.change(function () {
    video.playbackRate = this.value;
});

video.addEventListener('play', function () {
    totalTime.text(formatTime(video.duration));
});

video.addEventListener('timeupdate', function () {
    remainingTime.text(formatTime(video.duration));
    scrubber.val(video.currentTime);
});



//Dynamic load
var $video = $('vid');
$video.on('play', function () {
    if (!$video.is('visible')) {
        $video.fadeIn();
    }
});

$video.on('ended', function () {
    var
        video = this,
        sources = video.getElementsByTagName('source'),

        oldFileName = $video.attr('data-firstfile'),
        newFileName = $video.attr('data-secondfile'),

        forEach = Array.prototype.forEach;

    if (sources[0].src.indexOf(newFileName) === -1) {
        forEach.call(sources, function (source) {
            source.src = source.src.replace(oldFileName, newFileName);
        });

        $video.fadeOut(function () {
            video.load();
            video.play();
        });
    }
});
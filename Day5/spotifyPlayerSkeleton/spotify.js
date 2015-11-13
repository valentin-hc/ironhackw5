"use strict"

$(document).on("ready", function() {
    var spotiSearch = new SpotifyPlayer();
    spotiSearch.search();
    spotiSearch.playTrack();
    spotiSearch.updateProgressBar();
})

var SpotifyPlayer = function() {}

SpotifyPlayer.prototype.search = function() {
    var self = this;
    $('#search').on('submit', function(event) {
        event.preventDefault();
        var searchTerms = encodeURIComponent($('#searchterm').val().trim());
        var url = "https://api.spotify.com/v1/search?type=track&query="
        self.request(searchTerms, url);
    });
}


SpotifyPlayer.prototype.request = function(searchterm, url) {
    var self = this;
    var URL = url + searchterm;
    $.ajax({
        dataType: "json",
        url: URL,
        success: function(data) {
            var data = data;
            self.firstTrackInfo(data);
        },
        error: self.handleError
    });
}

SpotifyPlayer.prototype.handleError = function(jqXHR, status, errorThrown) {
    alert("Something wrong happened: " + status + ", " + errorThrown);
}

SpotifyPlayer.prototype.firstTrackInfo = function(data) {
    var track = data.tracks.items[0];
    console.log(track);
    var name = track.name;
    var imgUrl = track.album.images[0].url;
    var artistName = track.artists[0].name;
    var previewUrl = track.preview_url;
    $('.title').text(name);
    $('.author').text(artistName);
    $('.cover').html($('<img>', {
        src: imgUrl
    }));
    $('audio').attr("src", previewUrl);
}

SpotifyPlayer.prototype.playTrack = function() {
    $('#player').click(function() {
        if ($('#player').hasClass('enabled')) {
            $('#track-player').trigger('play');
            $('#player').attr("class", "btn-play playing");
        } else {
            $('#track-player').trigger('pause');
            $('#player').attr("class", "btn-play enabled");
        }
    })
}

SpotifyPlayer.prototype.progressBar = function() {
    var current = $('#track-player').prop('currentTime');
    $('progress').attr('value', current)
}

SpotifyPlayer.prototype.updateProgressBar = function() {
    var self = this;
    $('#track-player').on('timeupdate', self.progressBar);
}
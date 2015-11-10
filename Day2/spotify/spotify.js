
$('#search-artist').submit(function (event) {
  event.preventDefault();
  var artistName = encodeURIComponent($('#name').val().trim())
  var URL = "https://api.spotify.com/v1/search?type=artist&query=" + artistName
  $.ajax({
    url: URL,
    dataType: "json",
    success: handleSuccess,
    error : handleError
  });
});

function handleSuccess(data) {
  displayArtists(data.artists.items);
}

function handleError(jqXHR, status, errorThrown) {
  alert("Something wrong happened: " + status + ", " + errorThrown);
}


function displayArtists(artists) {
  var data = $('#data');
  data.empty();
  // console.log(artists)
  artists.forEach(function (c) {
    var name =  '<a class="link" href="#">' + c.name + '</a>';
    var picture = "";
    var id = c.id;
    if (c.images.length !== 0) {
      picture = '<img src = "' + c.images[0].url + '">'
    }
    data.append( '<div class="artist-detail" id="' + id + '">' +  name + picture + '</div>');
  });
}

$('.container').on('click', '.link', function(event) {
  var artistId = $(this).parent().attr("id");
  var URL = 'https://api.spotify.com/v1/artists/' + artistId + '/albums'
  $.ajax({
    url: URL,
    dataType: "json",
    success: handleAlbumSuccess,
    error : handleError
  });
});

function handleAlbumSuccess(data) {
  displayAlbums(data.items);
}

function displayAlbums(albums) {
  var album = $('#album');
  album.empty();
  albums.forEach(function (c) {
    var name =  '<a class="albumlink" href="#" data-toggle="modal" data-target="#myModal">' + c.name + '</a>';
    var picture = "";
    var id = c.id;
    if (c.images.length !== 0) {
      picture = '<img src = "' + c.images[0].url + '">'
    }
    album.append( '<div class="row album-detail" id="' + id + '">' +  name + picture + '</div>');
  });
}

$('.container').on('click', '.albumlink', function(event) {
  var albumId = $(this).parent().attr("id");
  var URL = 'https://api.spotify.com/v1/albums/' + albumId + '/tracks'
  $.ajax({
    url: URL,
    dataType: "json",
    success: handleTracksSuccess,
    error : handleError
  });
});

function handleTracksSuccess(data) {
  displayTracks(data.items);
}

function displayTracks(tracks) {
  var title = $('#myModal').find('.modal-header')
  var content = $('#myModal').find('.modal-body');
  title.text(tracks[0].artists[0].name);
  content.empty();
  tracks.forEach(function (c) {
    var preview = c.preview_url
    var name =  '<a class="tracklink" href="' + preview + '" target="_blank">' + c.name + '</a>';
    var id = c.id;
    content.append( '<div class="track-detail" id="' + id + '">' +  name + '</div>');
  });
}




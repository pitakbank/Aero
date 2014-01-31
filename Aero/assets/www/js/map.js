  

  // $( "#dep_map" ).on( "click", function() {
  //   $.mobile.loadPage( "map.html");
  // });

  //   $( "#dest_map" ).on( "click", function() {
  //   $.mobile.loadPage( "map.html");
  // });

function openMap(){
// $(document).on('pageshow', '#map_page', function (event) {
//     max_height();
    // document.location.href = "map.html"; 
//     navigator.geolocation.getCurrentPosition(onSuccess, onError,{'enableHighAccuracy':true,'timeout':20000});
// });

  $.mobile.changePage( "map.html" );

}

// function max_height() {
//     var header = $.mobile.activePage.find("div[data-role='header']:visible");
//     var footer = $.mobile.activePage.find("div[data-role='footer']:visible");
//     var content = $.mobile.activePage.find("div[data-role='content']:visible:visible");
//     var viewport_height = $(window).height();
    
//     var content_height = viewport_height - header.outerHeight() - footer.outerHeight();
//     if((content.outerHeight() - header.outerHeight() - footer.outerHeight()) <= viewport_height) {
//         content_height -= (content.outerHeight() - content.height());
//     } 
//     $.mobile.activePage.find('[data-role="content"]').height(content_height);
// }


// function onSuccess(position) {       
//     var minZoomLevel = 15;
    
//     var map = new google.maps.Map(document.getElementById('map_canvas'), {
//         zoom: minZoomLevel,
//         center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
//         mapTypeId: google.maps.MapTypeId.ROADMAP
//     });    
// }

// function onError() {
//     alert('Error');
// }


//////////////////////////////////////

// function GoogleMap(){
 
//     this.initialize = function(){
//     var map = showMap();
//     addMarkersToMap(map);
//     // google.maps.event.trigger(map, 'resize'); 
//     }
     
//     var showMap = function(){
//         var mapOptions = {
//         zoom: 4,
//         center: new google.maps.LatLng(-33, 151),
//         mapTypeId: google.maps.MapTypeId.ROADMAP
//         }
         
//         var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
         
//         return map;
//     }
// }

// var addMarkersToMap = function(map){
//     var mapBounds = new google.maps.LatLngBounds();

//     var latitudeAndLongitudeOne = new google.maps.LatLng('-33.890542','151.274856');
     
//     var markerOne = new google.maps.Marker({
//         position: latitudeAndLongitudeOne,
//         map: map
//     });
     
//     var latitudeAndLongitudeTwo = new google.maps.LatLng('57.77828', '14.17200');
     
//     var markerOne = new google.maps.Marker({
//         position: latitudeAndLongitudeTwo,
//         map: map
//         });

//     mapBounds.extend(latitudeAndLongitudeOne);
//     mapBounds.extend(latitudeAndLongitudeTwo);
//     map.fitBounds(mapBounds);
// }

var UI = require('ui');
var ajax = require('ajax');

var loading = new UI.Card({
  title: 'Loading...',
  subtitle: 'Locate Me',
  body: 'We help you find you'
});

loading.show();

var locationOptions = {
  enableHighAccuracy: true, 
  maximumAge: 10000, 
  timeout: 10000
};

function locationSuccess(pos) {
  var lat;
  var lang;
  var location;
  
  console.log('Got location: lat= ' + pos.coords.latitude + ' lon= ' + pos.coords.longitude);
  lat = pos.coords.latitude;
  lang = pos.coords.longitude;
  
  ajax({
      url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lang + '&key=AIzaSyC-8qQw6BCorqyWEkV5psNf9q2SvrpIf4Y',
      type: 'json'
    },
    function(data, status, request) {
      console.log(JSON.stringify(data));
      console.log('Your Location Is: ' + data.results[0].formatted_address);
      location = data.results[0].formatted_address;
      
      var main = new UI.Card({
        title: 'Locate Me',
        body: 'You are at: ' + location
      });
      
      main.show();
    },
    function(error, status, request) {
      console.log('The ajax request failed: ' + error);
    }
  );
}

function locationError(err) {
  console.log('location error (' + err.code + '): ' + err.message);
  
  var errorpage = new UI.Card({
    title: 'Whoops!',
    body: 'Looks like something went wrong! Chances are you have your GPS turned off. Try leaving this app, turning it back on, and come back'
  });
  
  errorpage.show();
}

// Make an asynchronous request
navigator.geolocation.getCurrentPosition(locationSuccess, locationError, locationOptions);

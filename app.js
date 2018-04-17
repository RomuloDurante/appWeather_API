(function(global) {
//DATA MODULE 
  var _dt = (function() {        
      //=>closure___________________________
      
      //____________________________________

      var dataPrototype = {
        //clear database
        clearData: function() {
          this.Location = {},
          this.information = {}
        }
      }

      var _dt = Object.create(dataPrototype);
          _dt.Location = {};
          _dt.apiKey = '99dfe35fcb7de1ee';
          _dt.information = {}
      return _dt;
  }());

/*********************************************** */
//UI MODULE
  var _ui = (function() {        
      //=>closure___________________________
      var id$ = function(id){return document.getElementById(id)}
      var id$txt = function(id, text){return document.getElementById(id).textContent = text}
      //____________________________________
      
    var uiPrototype = {
        // return an object with de values from inputs
          getInputs: function() {
            return {
              city: document.getElementById(this.Dom.city).value,
              state: document.getElementById(this.Dom.state).value
            }
          },
        //clear the inputs values 
          clearInputs: function() {
            document.getElementById(this.Dom.city).value = '';
            document.getElementById(this.Dom.state).value = '';
          },

        // shows information on the Dom
        paintDom: function(weather) {
          id$(this.Dom.icon).setAttribute('src', weather.icon_url);
          id$txt(this.Dom.location, weather.display_location.full);
          id$txt(this.Dom.desc,  weather.weather);
          id$txt(this.Dom.string,  weather.temperature_string);
          id$txt(this.Dom.humidity,`Relative Humidity: ${weather.relative_humidity}`);
          id$txt(this.Dom.fewsLike,`Feels Like: ${weather.feelslike_string}`);
          id$txt(this.Dom.dewpoint, `DewPoint: ${weather.dewpoint_string}`);
          id$txt(this.Dom.wind, `Wind: ${weather.wind_string}`);
     
        }
    }

    var _ui = Object.create(uiPrototype);
        _ui.Dom = {//-> Dom strings
          location: 'w-location',
          humidity: 'w-humidity',
          dewpoint: 'w-dewpoint',
          fewsLike: 'w-feels-like',
          wind: 'w-wind',
          icon: 'w-icon',
          details: 'w-details',
          string: 'w-string',
          desc: 'w-desc',
          city: 'city',
          state: 'state',
          btn: 'w-change-btn',
          locModal: 'locModal'
        }

    return _ui;

  }());

/************************************************** */
//APP MODULE -> this is the only object expose to the global environment
  global.app = (function(_dt, _ui) {
     //=>closure___________________________
       var url = '';

      //get inputs value and sendo to Data module
      function getInputs() {
         _dt.clearData();
         _dt.Location = _ui.getInputs();

         //set the valuos to the localStorage
         localStorage.clear();
         localStorage.setItem('Location', JSON.stringify(_dt.Location));

         //clear inputs after get the elements
         _ui.clearInputs();

         //call the function http
          http(_dt.Location);
        
      }
      
      //create url 
      function http(location) {
        url = `//api.wunderground.com/api/${_dt.apiKey}/conditions/q/${location.state}/${location.city}.json`
        getApi(url);

      }

      function getApi(url) {
          //method from fetch framework
          _http.get(url)
          .then(data => pushData(data.current_observation))//-> send data from DATA module
          .catch(err => console.log(err));
      }

    // send data to DATA module
      function  pushData(data) {
            _dt.information = data;
            _ui.paintDom(_dt.information);
      }

      //load page
      function loadLocalStorage(){
        //get the location from localStorage
        var Location = JSON.parse(localStorage.getItem('Location'));
        //call the http function
        http(Location);
      }

 
     //____________________________________

      var appSetup = {
          setupEvents: function() {
            //event with btn
            document.getElementById(_ui.Dom.btn).addEventListener('click', getInputs);

            //event with window
            document.addEventListener('DOMContentLoaded', loadLocalStorage);
            

          }
    }

    var app = Object.create(appSetup);
    app.setupEvents();
    return app;

  }(_dt, _ui));



}(this));


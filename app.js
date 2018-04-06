(function(global) {
//DATA MODULE 
  var _dt = (function() {        
      //=>closure___________________________
      
      //____________________________________

      var dataPrototype = {
            // send data to DATA module
            pushData: function(data) {
                _dt.information = data;
                console.log(_dt.information.current_observation);
            }

      }

      var _dt = Object.create(dataPrototype);
          _dt.Location = '';
          _dt.apiKey = '99dfe35fcb7de1ee';
          _dt.information = ''
      return _dt;
  }());

/*********************************************** */
//UI MODULE
  var _ui = (function() {        
      //=>closure___________________________
      
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
        }
    }

    var _ui = Object.create(uiPrototype);
        _ui.Dom = {//-> Dom strings
          humidity: 'w-humidity',
          dewpoint: 'w-dewpoint',
          fewsLike: 'w-feels-like',
          wind: 'w-wind',
          city: 'city',
          state: 'state',
          btn: 'w-change-btn'
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
         _dt.Location = _ui.getInputs();
         _ui.clearInputs();
          http(_dt.Location);
      }
      
      //create url 
      function http(location) {
        url = `//api.wunderground.com/api/${_dt.apiKey}/conditions/q/${_dt.Location.state}/${_dt.Location.city}.json`
        console.log(url);
        getApi(url);

      }

      function getApi(url) {
          //method from fetch framework
          _http.get(url)
          .then(data => _dt.pushData(data))//-> send data from DATA module
          .catch(err => console.log(err));
      }

 
     //____________________________________

      var appSetup = {
          setupEvents: function() {
            document.getElementById(_ui.Dom.btn).addEventListener('click', getInputs);
          }
    }

    var app = Object.create(appSetup);
    app.setupEvents();
    return app;

  }(_dt, _ui));


  console.log(app);
  console.log(_dt);
  console.log(_ui);
}(window));


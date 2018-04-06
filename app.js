(function(global) {

  var _dt = (function() {        
      //=>closure___________________________
      
      //____________________________________

      var dataPrototype = {
          
      }

      var _dt = Object.create(dataPrototype);
          _dt.Location = {};
      return _dt;
  }());

/*********************************************** */
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
  global.app = (function(_dt, _ui) {
     //=>closure___________________________
      //get inputs value and sendo to Data module
      function getInputs() {
         _dt.Location = _ui.getInputs();
         console.log(_dt);
        _ui.clearInputs();
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


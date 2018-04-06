(function(global) {

  var httpPrototype = {
      get: (url) => {
        return new Promise((resolve, reject) => {
          fetch(url).then(res => res.json())
          .then(data => resolve(data))
          .catch(err => reject(err));
        });
      },
      
      post: (obj) => {
        return new Promise((resolve, reject) => {
          fetch(obj.url, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
              },
            body: JSON.stringify(obj.data)
          })
          .then(res => res.json())
          .then(data => resolve(data))
          .catch(err => reject(err));;
        });
      },

      put: (obj) => {
        return new Promise((resolve, reject) => {
          fetch(obj.url, {
            method: 'PUT',
            headers: {
              'Content-type': 'application/json'
              },
            body: JSON.stringify(obj.data)
          })
          .then(res => res.json())
          .then(data => resolve(data))
          .catch(err => reject(err));;
        });
      },

      delete: (obj) => {
        return new Promise((resolve, reject) => {
          fetch(obj.url, {
            method: 'DELETE',
            headers: {
              'Content-type': 'application/json'
              }
          })
          .then(res => res.json())
          .then(data => resolve('Resourse Deleted...'))
          .catch(err => reject(err));;
        });
      }
   }

global._http = Object.create(httpPrototype);
}(window));
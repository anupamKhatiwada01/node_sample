const handlers = {

    notFound: function(data, callback) {
      callback(404);
    },
   
    ping: function(data,callback){
      callback(200);
    }
  
  };

  module.export = handlers;
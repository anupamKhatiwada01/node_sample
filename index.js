
//Dependencies


const http = require('http');


const url = require('url');

const StringDecoder = require('string_decoder').StringDecoder;

const handlers = {

  sample: function(data, callback) {
    // Callback a http request and a payload
    callback(200, { 'name': 'sample handler' });
  },
  notFound: function(data, callback) {
    callback(404);
  }

};




const router = {

  'sample': handlers.sample,
  'notFound': handlers.notFound
}

// The server should respond to all requests with a string

const server = http.createServer((req, res) => {

  // Get the url and parse it
  const parsedUrl = url.parse(req.url, true);

  // Retreive pathname from the url
  const path = parsedUrl.pathname;

  // Trin the path ie. take only the necessary path
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');


  // Check the http method
  const method = req.method.toLowerCase();


  // Get the query string as an object
  const queryStringObject = parsedUrl.query;

  // Get the headers as an object
  const headers = req.headers;

  console.log("These are the headers:", headers);

  // Get the payload if any
  const decoder = new StringDecoder('utf-8');
  let buffer = '';
  req.on('data', (data) => {

    buffer += data;
    //buffer+=decoder.write(data);
  })


  // By now we have taken all the information we can from the request 

  // We need to set up a router to set up the routes

  req.on('end', () => {

    // res.end('Hello World!');
    // console.log("This is the tye ",typeof(router[trimmedPath]));

    // Choose the handler this request should got to. If one is not available use the not found handler
    const chosenHandler = typeof (router[trimmedPath]) !== undefined ? router[trimmedPath] : router.notFound;
    // With the above step we  ahve chosen a handler
    // Next we need to construct the data object to send to the handler
    console.log(handlers);
    const data = {
      'trimmedPath': trimmedPath,
      'queryStringObject': queryStringObject,
      'method': method,
      'headers': headers,
      'buffer': buffer
    }


    chosenHandler(data, (statusCode, payload)=> {
      // Use the status code called back by the handler or default to 200
      statusCode = typeof (statusCode) == 'number' ? statusCode : 200;
      // Use the payload called back by the handler or use an empty object

      payload = typeof (payload) == 'object' ? payload : {};

      // Convert the payload to string
      const payloadString = JSON.stringify(payload);

      res.writeHead(statusCode);
      res.end(payloadString);

      console.log("Returning the response", statusCode, payloadString);

    })


  });




})

// Start the server and have it listen on port 3000



server.listen(3000, () => console.log("The server is listening on port 3000 now"));

	// Lets define a request router
	// const handlers = {};

	// handlers.sample =function(data, callback){
	// 	// Callback a http request and a payload
	// 	callback(406,{'name' : 'sample handler'});
	// }


	// handlers.notFound = function(data,callback){
	// 	callback(404);
	// }


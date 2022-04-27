
	//Dependencies


	const http=require('http');


	const url = require('url');


	// The server should respond to all requests with a string
	
	const server = http.createServer((req,res)=>{
	
		// Get the url and parse it
		const parsedUrl = url.parse(req.url,true);
		
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

		console.log("These are the headers:",headers);


		res.end('Hello World!');

		// Log the received path
									
		console.log("request received on path: "+trimmedPath+" with method "+method);


		})

	// Start the server and have it listen on port 3000

	server.listen(3000, ()=>console.log("The server is listening on port 3000 now"));



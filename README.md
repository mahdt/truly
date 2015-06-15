# truly

#Usage:
Assuming you have node installed run the service with the command node server.js <PORTNUMBER> from the root folder of the project.
e.g. node server.js 8080

#GET
You can send a get request from the browser by entering the URL in the following format:
http://localhost:PORTNUMBER/query?number=%2Bxxxxxxxxxxx

The PORTNUMBER is the port number you specified when you started the service.
Each x denotes a number digit.

e.g. http://localhost:8080/query?number=%2B13479253754


Error codes:
400 - Bad Request : You did not format the request correctly
404 - Not FOund : The number you entered was not present in the directory

#POST
You can send a post request using curl (or some other service).
The service expects the body to be in JSON format.

An example curl command is shown below:

curl -i -X POST -H 'Content-Type: application/json' -d '{"name": "Mahd": "+13479253754", "context": "TrulyWireless"}' http://localhost:8080/number


Error Codes
400 - Bad Request : You did not format the request correctly
409 - Duplicate: A number with this context already exists in the service.

#Structure
The service has been designed in a modular way so that adding endpoints is extremely easy.
The server upon startup loads the seed data into a JS hashmap. (works well for a couple of million keys, may suffer lag beyond that)
This can take 3-5 seconds (for 500,000 rows of data) depending on your machine. It is then ready to serve requests.
The keys for the hashmap are the numbers. The values are JS arrays, each element corresponding to one <context, number> pair and contain number, context and the name.
The router folder contains all the routes/endpoints. They are listed in the index.js file and the code for each exists in an individual file in the /router/routes folder.
There is error checking to ensure that the input is as expected and to make sure duplicates aren't stored in the directory.

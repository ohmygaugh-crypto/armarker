# ARvalidide
savvy business card
If you are reading this then you found what is powering the AR experience you are having. Enjoy. And I hope you will join us and help the citizens of our town become future proof!
If you run into any bugs then hit our team with an open issue ticket in the category tab above. Best.


for server.js app.get... 
(method) Application.listen(port: number, callback?: () => void): Server (+5 overloads)
Listen for connections.

A node http.Server is returned, with this application (which is a Function) as its callback. If you wish to create both an HTTP and HTTPS server you may do so with the "http" and "https" modules as shown here:

var http = require('http') , https = require('https') , express = require('express') , app = express();

http.createServer(app).listen(80); https.createServer({ ... }, app).listen(443);


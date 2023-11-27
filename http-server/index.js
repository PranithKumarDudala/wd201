const minimist = require('minimist');
const args=minimist(process.argv.slice(2));

const port=args.port || 3000;
const http = require("http");
const fs = require("fs");

let dataHome = "";
let dataProject = "";
let dataRegistration="";

fs.readFile("home.html", (err, data) => {
  if (err) {
    throw err;
  }
  dataHome = data;
});

fs.readFile("project.html", (err, data) => {
  if (err) {
    throw err;
  }
  dataProject = data;
});

fs.readFile("registration.html", (err, data) => {
  if (err) {
    throw err;
  }
  dataRegistration = data;
});

http.createServer((request, response) => {
    let url = request.url;
    response.writeHeader(200, { "Content-Type": "text/html" });
    switch (url) {
      case "/project":
        response.write(dataProject);
        response.end();
        break;
      case "/registration":
        response.write(dataRegistration);
        response.end();
        break;
      default:
        response.write(dataHome);
        response.end();
        break;
    }
  })
  .listen(port);

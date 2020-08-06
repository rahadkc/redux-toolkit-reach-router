/** 
 * This is a simple express server, to show basic authentication services (login and logout requests)
 * based JWT, and basic socket.io.
 * 
 * Once a user is authenticated, a jwt token will be returned as response to the client. 
 * It's expected the jwt token will be included in the subsequent client requests. The server
 * can then protect the services by verifying the jwt token in the subsequent API requests.
 * 
 * The server will also broadcast the login/logout events to connected clients via socket.io.
 * 
 */
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors")
const port = 9001;

// Configure app to use bodyParser to parse json data
const app = express();
// const server = require("http").createServer(app);
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(bodyParser.json());

// and support socket io
// const io = require("socket.io")(server);

// Test server is working (GET http://localhost:9001/api)
app.get("/api/", function(req, res) {
  res.json({ message: "Hi, welcome to the server api!" });
});

// This should be well-guarded secret on the server (in a file or database).
const JWT_SECRET = "JWT Rocks!";

// JWT based login service.
app.post("/api/login", function(req, res) {
  console.log("Requesting /api/login ...");

  const credentials = req.body;

  // In real world credentials should be authenticated against database.
  // For our purpose it's hard-coded:
  if (credentials.user === "admin" && credentials.password === "password") {
    // Once authenticated, the user profiles is signed and the jwt token is returned as response to the client.
    // It's expected the jwt token will be included in the subsequent client requests.
    const profile = { user: credentials.user, role: "ADMIN" };
    const jwtToken = jwt.sign(profile, JWT_SECRET, { expiresIn: 5 * 60 }); // expires in 300 seconds (5 min)
    res.status(200).json({
      id_token: jwtToken
    });

    // alertClients("info", `User '${credentials.user}' just logged in`);
  } else {
    res.status(401).json({ message: "Invalid user/password" });

    // alertClients("error", `User '${credentials.user}' just failed to login`);
  }
});

// Alerts all clents via socket io.
// function alertClients(type, msg) {
//   console.log("SocketIO alerting clients: ", msg);
//   io.sockets.emit("alert", { message: msg, time: new Date(), type });
// }

/**
 * Util function to extract jwt token from the authorization header
 */
function extractToken(req) {
  if (
    req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
}

//  Logout api.  For illustration purpose we show how to check if the request is from an authorized user by
//  verifying the jwt token included in the request header.  The same approach can be used to restrict access
//  to other (more intersting) API calls.
app.post("/api/logout", function(req, res) {
  console.log("Requesting /api/logout ...");

  const jwtToken = extractToken(req);
  try {
    const profile = jwt.verify(jwtToken, JWT_SECRET);
    res.status(200).json({ message: `User ${profile.user} logged out` });

    alertClients("info", `User '${profile.user}' just logged out`);
  } catch (err) {
    console.log("jwt verify error", err);
    res.status(500).json({ message: "Invalid jwt token" });

    alertClients("error", `JWT verify error`);
  }
});


let bugs = [
  { id: 1, description: "Bug 1", userId: 1, resolved: true },
  { id: 2, description: "Bug 2", userId: 1 },
  { id: 3, description: "Bug 3", userId: 2 },
  { id: 4, description: "Bug 4" }
];

app.get("/api/bugs", (req, res) => {
  res.json(bugs);
});

app.get("/api/bugs/:id", (req, res) => {
  const bug = bugs.filter(b => b.id === parseInt(req.params.id))
  res.json(bug);
});

app.post("/api/bugs", (req, res) => {
  const bug = { id: Date.now(), ...req.body, resolved: false };
  bugs.push(bug);

  res.json(bug);
});

app.patch("/api/bugs/:id", (req, res) => {
  const index = bugs.findIndex(bug => bug.id === parseInt(req.params.id));
  const bug = bugs[index];
  if ("resolved" in req.body) bug.resolved = req.body.resolved;
  if ("userId" in req.body) bug.userId = req.body.userId;

  res.json(bug);
});

app.delete("/api/bugs/:id", (req, res) => {
  bugs = bugs.filter(b => b.id !== parseInt(req.params.id))
  res.json(bugs);
});

// Start the server
app.listen(port);
console.log("Server is listening on port " + port);

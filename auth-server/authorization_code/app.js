/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

/* How to use:
    node app.js 
*/

let express = require("express"); // Express web server framework
let request = require("request"); // "Request" library
let querystring = require("querystring");
let cookieParser = require("cookie-parser");
let fs = require("fs");
let bodyParser = require("body-parser");

let client_id = "19427a009053421cad910c10b315a050"; // Your client id
let client_secret = "9dabb10eca184b89bce885069db5f4e2"; // Your secret
let redirect_uri = "http://localhost:8888/callback"; // Or Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
let generateRandomString = function(length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
let stateKey = "spotify_auth_state";

let app = express();

//need to use it
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public")).use(cookieParser());

app.get("/login", function(req, res) {
  let state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  //user-modify-playback-state => play/pause/next/prev
  //playlist-modify-public => create playlist
  //playlist-modify-private => create playlist
  let scope = "user-read-private user-read-email user-modify-playback-state ";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      })
  );
});

app.get("/callback", function(req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  let code = req.query.code || null;
  let state = req.query.state || null;
  let storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch"
        })
    );
  } else {
    res.clearCookie(stateKey);
    let authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code"
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer(client_id + ":" + client_secret).toString("base64")
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        //modify data.json
        let access_token = body.access_token,
          refresh_token = body.refresh_token;
        let room_code = generate_room_code(access_token);

        // we can also pass the token to the browser to make requests from there
        res.redirect(
          "http://localhost:3000/#" +
            querystring.stringify({
              room_code: room_code,
              access_token: access_token,
              refresh_token: refresh_token
            })
        );
      } else {
        res.redirect(
          "/#" +
            querystring.stringify({
              error: "invalid_token"
            })
        );
      }
    });
  }
});

app.get("/refresh_token", function(req, res) {
  // requesting access token from refresh token
  let refresh_token = req.query.refresh_token;
  let authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer(client_id + ":" + client_secret).toString("base64")
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      let access_token = body.access_token;
      res.send({
        access_token: access_token
      });
    }
  });
});

app.get("/api", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  let data = fs.readFileSync("data/data.json", "utf-8");
  res.json(data);
});

app.options("/add_queue", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  console.log(typeof req.body);
  console.log(JSON.stringify(req.body));
  res.status(200).end();
  // let jsondata = JSON.parse(req.body);
  // console.log(jsondata[]);
  // res.end(JSON.stringify(req.body));
});

app.post("/add_queue", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  console.log(typeof req.body);
  console.log(JSON.stringify(req.body));
  res.status(200).end();
  // let jsondata = JSON.parse(req.body);
  // console.log(jsondata[]);
  // res.end(JSON.stringify(req.body));
});

//modify json file
generate_room_code = token => {
  console.log("generate_room_code");
  let result = "";
  let obj = {};
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < 4; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  obj[result] = token;

  write_to_json_file(obj);

  return result;
};

//write {room_code: token} into file
write_to_json_file = obj => {
  console.log("write_to_json_file");
  fs.writeFile("data/data.json", JSON.stringify(obj), err => {
    if (err) {
      console.log(err);
    }
  });
};

console.log("Listening on 8888");
app.listen(8888);

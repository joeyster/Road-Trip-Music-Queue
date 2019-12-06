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

let SpotifyWebApi = require("spotify-web-api-node"); // Spotify API
const spotifyApi = new SpotifyWebApi();

let client_id = "19427a009053421cad910c10b315a050"; // Your client id
let client_secret = "9dabb10eca184b89bce885069db5f4e2"; // Your secret
let redirect_uri = "http://wavester.io:8888/callback"; // Or Your redirect uri

let stateKey = "spotify_auth_state";
let app = express();
//need to use it for json to be used
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public")).use(cookieParser());

app.get("/login", function(req, res) {
  let state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  //user-modify-playback-state => play/pause/next/prev
  //playlist-modify-public => create playlist
  //playlist-modify-private => create playlist
  let scope =
    "user-read-private user-read-email user-modify-playback-state playlist-modify-public playlist-modify-private";

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

// your application requests refresh and access tokens
// after checking the state parameter
app.get("/callback", function(req, res) {
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
          Buffer.from(client_id + ":" + client_secret).toString("base64")
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        // modify data.json
        // when you modify data.json, we need to make sure the path is correct, relative to where you "node PATH"
        let access_token = body.access_token,
          refresh_token = body.refresh_token;
        let room_code = generate_room_code(access_token);

        // we can also pass the token to the browser to make requests from there
        res.redirect(
          "http://wavester.io/#" +
            querystring.stringify({
              room_code: room_code
              // logged_in: "true"
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

// requesting access token from refresh token
app.get("/refresh_token", function(req, res) {
  let refresh_token = req.query.refresh_token;
  let authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64")
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
  //deprecated. keep for reference
  res.setHeader("Access-Control-Allow-Origin", "http://wavester.io::80");
  let data = fs.readFileSync("data/data.json", "utf-8");
  res.json(data);
});

app.options("/check_code", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://wavester.io");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.status(200).end();
});

app.post("/check_code", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://wavester.io");
  let file_data = fs.readFileSync("data/data.json", "utf-8");
  file_data = JSON.parse(file_data);
  let room_code = req.body["message"];

  // let diff = file_data[room_code]["expire_time"] - Date.now();
  // console.log(diff / 1000 / 60 + " minutes left");

  // if room code exists inside json file
  if (
    file_data[room_code] === undefined ||
    Date.now() > file_data[room_code]["expire_time"]
  ) {
    res.json({ message: "dne" });
  } else {
    res.json({ message: "exists" });
  }
});

app.options("/time_left", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://wavester.io");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.status(200).end();
});

app.post("/time_left", function(req, res) {
  //respond with expire_time
  res.setHeader("Access-Control-Allow-Origin", "http://wavester.io");
  let file_data = fs.readFileSync("data/data.json", "utf-8");
  file_data = JSON.parse(file_data);
  let room_code = req.body["message"];
  let expire_time = file_data[room_code]["expire_time"];
  res.json({ message: expire_time });
});

app.options("/add_queue", function(req, res) {
  //deprecated. keep for reference
  res.setHeader("Access-Control-Allow-Origin", "http://wavester.io");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.status(200).end();
});

app.post("/add_queue", function(req, res) {
  //deprecated. keep for reference
  // need to setHeader again because sending back to 3000
  res.setHeader("Access-Control-Allow-Origin", "http://wavester.io");
  res.status(200).end();
});

app.options("/create_playlist", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://wavester.io");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.status(200).end();
});

app.post("/create_playlist", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://wavester.io");
  let room_code = req.body["room_code"];
  create_playlist(room_code);
  res.status(200).end();
});

app.options("/search", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://wavester.io");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.status(200).end();
});

app.post("/search", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://wavester.io");
  let passed_room_code = req.body["room_code"];
  let access_token = await get_acccess_token(passed_room_code);
  spotifyApi.setAccessToken(access_token);
  let query = req.body["search_query"];
  spotifyApi
    .searchTracks(query, { type: "track", limit: 5 })
    .then(response => {
      return response;
    })
    .then(json => {
      // found
      if (json.body.tracks.items[0] !== undefined) {
        res.json({ song_array: json.body.tracks.items });
      } else {
        console.log("Track undefined");
      }
    })
    .catch(err => {
      console.log("Something went wrong!", err);
    });
});

app.options("/add_song", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://wavester.io");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.status(200).end();
});

app.post("/add_song", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://wavester.io");
  let room_code = req.body["room_code"];
  let uri = req.body["uri"];
  add_to_playlist(room_code, uri);
  res.status(200).end();
});

app.options("/clear_playlist", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://wavester.io");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.status(200).end();
});

app.post("/clear_playlist", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://wavester.io");
  let room_code = req.body["room_code"];
  clear_playlist(room_code);
  res.status(200).end();
});

clear_playlist = async passed_room_code => {
  let access_token = await get_acccess_token(passed_room_code);
  spotifyApi.setAccessToken(access_token);
  spotifyApi
    .getMe()
    .then(response => {
      let user_id = response["body"]["id"];
      let playlist_id = "";
      spotifyApi
        .getUserPlaylists(user_id)
        .then(response => {
          let playlist_index = index_getter(response["body"]["items"]);
          playlist_id = response.body.items[playlist_index].id;
          spotifyApi
            .getPlaylistTracks(playlist_id)
            .then(response => {
              let playlist_tracks = response.body.items.map(item => {
                let obj = { uri: item.track.uri };
                return obj;
              });
              spotifyApi.removeTracksFromPlaylist(playlist_id, playlist_tracks);
            })
            .catch(err => {
              console.log("Something went wrong!", err);
            });
        })
        .catch(err => {
          console.log("Something went wrong!", err);
        });
    })
    .catch(err => {
      console.log("Something went wrong!", err);
    });
};

add_to_playlist = async (passed_room_code, uri) => {
  let access_token = await get_acccess_token(passed_room_code);
  spotifyApi.setAccessToken(access_token);
  spotifyApi
    .getMe()
    .then(response => {
      let user_id = response["body"]["id"];
      let playlist_id = "";
      spotifyApi
        .getUserPlaylists(user_id)
        .then(response => {
          let playlist_index = index_getter(response["body"]["items"]);
          playlist_id = response.body.items[playlist_index].id;
          spotifyApi.addTracksToPlaylist(playlist_id, [uri]);
        })
        .catch(err => {
          console.log("Something went wrong!", err);
        });
    })
    .catch(err => {
      console.log("Something went wrong!", err);
    });
};

create_playlist = async passed_room_code => {
  let access_token = await get_acccess_token(passed_room_code);
  spotifyApi.setAccessToken(access_token);
  // creates wavester.io playlist
  spotifyApi
    .getMe()
    .then(response => {
      let user_id = response["body"]["id"];
      spotifyApi
        .getUserPlaylists(user_id)
        .then(response => {
          let playlist_index = index_getter(response["body"]["items"]);
          //if playlist doesn't exists
          if (playlist_index === -1) {
            spotifyApi
              .getMe()
              .then(response => {
                user_id = response["body"]["id"];
                spotifyApi
                  .createPlaylist(user_id, "wavester.io", { public: true })
                  .then(
                    function(data) {
                      console.log("Created playlist");
                    },
                    function(err) {
                      console.log("Something went wrong!", err);
                    }
                  );
              })
              .catch(err => {
                console.log("Something went wrong!", err);
              });
          } else {
            console.log("Album already exists");
          }
        })
        .catch(err => {
          console.log("Something went wrong!", err);
        });
    })
    .catch(err => {
      console.log("Something went wrong!", err);
    });
};

get_acccess_token = passed_room_code => {
  // reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
  return new Promise(resolve => {
    fs.readFile(
      // get json
      "data/data.json",
      (callback = (err, data) => {
        obj = JSON.parse(data);
        resolve(obj[passed_room_code]["token"]);
      })
    );
  });
};

index_getter = items => {
  // gets the index of playlist with name as "wavester.io"
  // POSSIBLE PROBLEM: if playlist list too long, js might move on without a proper index
  // FIX: understand promises
  let index = 0;
  let num;
  for (num in items) {
    if (items[num]["name"] === "wavester.io") {
      return index;
    }
    index += 1;
  }
  return -1; // DNE
};

//modify json file with
generate_room_code = token => {
  let room_code = "";
  let obj = {};
  // let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let characters = "abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < 4; i++) {
    room_code += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  // current timestamp in milliseconds
  let timestamp = Date.now();
  // 3600000 ms = 1 hour
  timestamp = timestamp + 3600000;

  obj[room_code] = { token: token, expire_time: timestamp };

  append_to_json_file(obj);

  return room_code;
};

//append {room_code: token} into file
append_to_json_file = entry => {
  fs.readFile(
    // get json
    "data/data.json",
    (callback = (err, data) => {
      obj = JSON.parse(data);
      new_obj = { ...obj, ...entry };
      fs.writeFile("data/data.json", JSON.stringify(new_obj), err => {
        if (err) {
          console.log(err);
        }
      });
    })
  );
};

// Generates a random string containing numbers and letters
let generateRandomString = function(length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

console.log("Listening on 8888");
app.listen(8888);

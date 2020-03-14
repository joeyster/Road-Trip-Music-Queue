class Credential {
  constructor() {
    this.client_id = "19427a009053421cad910c10b315a050"; // Your client id
    this.client_secret = "9dabb10eca184b89bce885069db5f4e2"; // Your secret
    this.redirect_uri = "http://192.168.1.30:8888/callback"; // Or Your redirect uri
  }

  message = () => {
    console.log(this.client_id);
  };
}

module.exports = Credential;

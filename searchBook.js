const axios = require("axios").default;

axios
  .get("https://openlibrary.org/api/books?bibkeys=ISBN:8496284328&jscmd=data")
  .then(r => {
    console.log(r.data);
  });

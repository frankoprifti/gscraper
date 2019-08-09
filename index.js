let axios = require("axios");
let cheerio = require("cheerio");
const express = require("express");
const app = express();

app.get("/:id", (req, res) => {
  var param = req.params.id;
  console.log(param);
  var title;
  let url =
    "https://www.google.com/search?hl=en&as_q=" +
    param +
    "&as_epq=&as_oq=&as_eq=&as_nlo=&as_nhi=&lr=lang_en&cr=&as_qdr=all&as_sitesearch=&as_occt=any&safe=images&as_filetype=&as_rights=";

  axios
    .get(url)
    .then(response => {
      if (response.status === 200) {
        const html = response.data;
        const $ = cheerio.load(html);
        title = $("div.AP7Wnd");
        result = title.text();
        test = result.split(".");
        array = [];
        for (var i = 0; i < 10; i++) {
          array.push(test[i]);
        }
        res.send("Data From Google" + "</br>" + array);
      }
    })
    .catch(error => console.log(error));
});

app.get("/", (req, res) => {
  res.send("Data From Google");
});

app.listen(process.env.PORT);

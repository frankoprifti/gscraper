let axios = require("axios");
let cheerio = require("cheerio");
const express = require("express");
const app = express();

app.get("/:id", (req, res) => {
  var param = req.params.id;
  console.log(param);
  var title;
  var image;
  var resultArray = [];
  var result;
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
        title = $("div.BNeawe");

        for (var j = 0; j < title.length; j++) {
          if (title[j].children[0].data != undefined) {
            resultArray.push(String(title[j].children[0].data));
          }
        }
        var max = -999;
        for (var z = 0; z < resultArray.length; z++) {
          if (
            resultArray[z].length > max &&
            resultArray[z].search(/(^|[^.])\.{3}([^.]|$)/g) == -1 &&
            resultArray[z].search(".com") == -1 &&
            resultArray[z].search("@") == -1
          ) {
            result = resultArray[z];
            max = resultArray[z].length;
          }
        }
        res.setHeader("Content-Type", "application/json");
        res.end(
          JSON.stringify({
            data: result,
            unused: resultArray
          })
        );
      }
    })
    .catch(error => console.log(error));
});

app.get("/", (req, res) => {
  res.send("Data From Google");
});

app.listen(process.env.PORT || 4000);

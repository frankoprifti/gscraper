let axios = require("axios");
let cheerio = require("cheerio");
const fs = require("fs");

var title;
let url =
  "https://www.google.com/search?q=mark+zuckerberg&oq=mark+zuckerberg&aqs=chrome..69i57j0l3j69i60l2.1999j0j7&sourceid=chrome&ie=UTF-8";

axios.get(url).then(response => {
  if (response.status === 200) {
    const html = response.data;
    const $ = cheerio.load(html);
    title = $("div.AP7Wnd");
    console.log(title.text());
  }
});

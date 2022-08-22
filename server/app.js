const path = require("path");
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("/api", async (req, res) => {
  const url = `https://starwarsblog.starwars.com/`;

  try {
    const response = await axios.get(url, {
      method: "GET",
      mode: "cors",
      headers: { crossorigin: true },
    });

    const $ = cheerio.load(response.data);

    const scrapedArticles = $("ul.news-articles>li>article");

    console.log($);

    const newFormattedArticles = scrapedArticles.map((_index, article) => ({
      article: article.data,
      title: article.children?.[1]?.children?.[1]?.attribs?.title,
      link: article.children?.[1]?.children?.[1]?.attribs?.href,
      imageSrc:
        article.children?.[1]?.children?.[1]?.children?.[1]?.attribs?.[
          "data-original"
        ],
      // tagLine:
      //   article.children?.[3]?.children?.[3]?.children?.[1]?.children?.[0]
      //     ?.data,
      tagLine2:
        article.children?.[3]?.children?.[3]?.children?.[1]?.children?.[0]
          ?.data,
      byLineAuthor:
        article.children?.[3]?.children?.[5]?.children?.[1].children?.[1]
          ?.attribs?.title,
      byLineDate:
        article.children?.[3]?.children?.[5]?.children?.[3].children?.[1]?.data,
    }));
    console.log("Butts", response.data);
    res.send(
      scrapedArticles
      // JSON.stringify([...newFormattedArticles])
    );
  } catch (e) {
    console.error(`Error while fetching   - ${e.message}`);
  }
});

app.get("/api2", async (req, res) => {
  const url = `https://starwarsblog.starwars.com/`;

  try {
    const response = await axios.get(url, {
      method: "GET",
      mode: "cors",
      headers: { crossorigin: true },
    });

    const $ = cheerio.load(response.data);

    const scrapedArticles = $("ul.news-articles>li>article");

    console.log(scrapedArticles);

    const newFormattedArticles = scrapedArticles.map((_index, article) => ({
      title: article.children?.[1]?.children?.[1]?.attribs?.title,
      link: article.children?.[1]?.children?.[1]?.attribs?.href,
      imageSrc:
        article.children?.[1]?.children?.[1]?.children?.[1]?.attribs?.[
          "data-original"
        ],
      tagLine:
        article.children?.[3]?.children?.[3]?.children?.[1]?.children?.[0]
          ?.data,
      tagLine2:
        article.children?.[3]?.children?.[3]?.children?.[1]?.children?.[1]
          ?.children?.[0]?.data,
      tagLine3:
        article.children?.[3]?.children?.[3]?.children?.[1]?.children?.[2]
          ?.data,
      tagLine4:
        article.children?.[3]?.children?.[3]?.children?.[1]?.children?.[3]
          ?.children?.[0]?.data,
      tagLine5:
        article.children?.[3]?.children?.[3]?.children?.[1]?.children?.[4]
          ?.data,
      byLineAuthor:
        article.children?.[3]?.children?.[5]?.children?.[1].children?.[1]
          ?.attribs?.title,
      byLineDate:
        article.children?.[3]?.children?.[5]?.children?.[3].children?.[1]?.data,
    }));
    console.log("Butts", response.data);
    res.send(JSON.stringify([...newFormattedArticles]));
  } catch (e) {
    console.error(`Error while fetching   - ${e.message}`);
  }
});

app.get("/health", (_req, res) => {
  console.log("Health Endpoint");
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

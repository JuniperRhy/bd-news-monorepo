import { useEffect, useState } from "react";
const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");

export default function NewsFeed({ isBDClicked, changeFont }) {
  const [formattedArticles, setFormattedArticles] = useState([]);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((newFormattedArticles) =>
        setFormattedArticles([...newFormattedArticles])
      );
  });

  console.log(formattedArticles, "api test");

  useEffect(() => {
    console.log("sanity", formattedArticles);
  }, [formattedArticles]);

  return (
    <div className={isBDClicked ? "NewsFeedVisible" : "NewsFeedInvisible"}>
      <div className={isBDClicked ? "NewsFeedOn" : "NewsFeedOff"}>
        <ul>
          {formattedArticles
            .filter(
              (formattedArticle) =>
                formattedArticle.title &&
                formattedArticle.byLineAuthor !== undefined
            )
            .map((formattedArticle, index) => (
              <li key={index}>
                <a
                  href={formattedArticle.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={formattedArticle.imageSrc}
                    alt={formattedArticle.title}
                  />
                </a>
                <h1
                  style={{
                    webkitTextStrokeColor: changeFont
                      ? "transparent"
                      : "rgb(219, 190, 24)",
                    lineHeight: changeFont ? "3.5vh" : "5vh",
                  }}
                >
                  <a
                    href={formattedArticle.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {formattedArticle.title.replace("#", "")}
                  </a>
                </h1>
                <p>{formattedArticle.tagLine.replace("!", "")}</p>

                <small style={{ lineHeight: changeFont ? ".25vh" : "3vh" }}>
                  {formattedArticle.byLineAuthor.replace(
                    "Posts by",
                    "article by"
                  )}
                  <br />
                  {formattedArticle.byLineDate}
                </small>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");

export default function NewsFeed({ isBDClicked, changeFont, hyperdrive }) {
  const [formattedArticles, setFormattedArticles] = useState([]);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((newFormattedArticles) =>
        setFormattedArticles([...newFormattedArticles])
      );
  });

  // console.log(formattedArticles, "api test");

  // useEffect(() => {
  //   console.log("sanity", formattedArticles);
  // }, [formattedArticles]);

  return (
    <div className={isBDClicked ? "NewsFeedVisible" : "NewsFeedInvisible"}>
      <div className={isBDClicked ? "NewsFeedOn" : "NewsFeedOff"}>
        <ul>
          {formattedArticles
            .filter(
              (formattedArticle) =>
                formattedArticle.title &&
                // formattedArticle.tagLine &&
                formattedArticle.byLineAuthor !== undefined
            )
            .map((formattedArticle, index) => (
              <li key={index}>
                <a
                  href={formattedArticle.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => hyperdrive.play()}
                >
                  <img
                    src={formattedArticle.imageSrc}
                    alt={formattedArticle.title}
                  />
                </a>
                <h1 onClick={() => hyperdrive.play()}>
                  <a
                    href={formattedArticle.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {formattedArticle.title
                      .replace("#", "")
                      .replace("&", "and")
                      .replace("!", "")
                      .replace("?", "")
                      .replace(`”`, ``)
                      .replace(`“`, ``)}
                  </a>
                </h1>
                <p>
                  {formattedArticle.tagLine &&
                  formattedArticle.tagLine.length > 10
                    ? formattedArticle.tagLine
                        .replace("!", "")
                        .replace("#", "number ")
                    : ""}
                </p>

                <small>
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

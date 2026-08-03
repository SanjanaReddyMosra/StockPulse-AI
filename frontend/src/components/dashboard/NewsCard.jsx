import { useEffect, useState } from "react";
import { FaNewspaper, FaExternalLinkAlt } from "react-icons/fa";
import { getNews } from "../../api/stockAPI";

function NewsCard() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNews();

    window.addEventListener(
      "stockChanged",
      loadNews
    );

    return () =>
      window.removeEventListener(
        "stockChanged",
        loadNews
      );
  }, []);

  async function loadNews() {
    try {
      setLoading(true);

      const symbol =
        localStorage.getItem("selectedStock") || "TCS";

      const data = await getNews(symbol);

      setArticles(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="dashboard-card">
        <h2>Latest News</h2>
        <p>Loading latest news...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-card news-card">

      <div className="card-header">

        <h2>

          <FaNewspaper />

          Latest News

        </h2>

      </div>

      <div className="news-list">

        {articles.length > 0 ? (
          articles.slice(0, 5).map((article, index) => (
            <a
              key={index}
              href={article.url}
              target="_blank"
              rel="noreferrer"
              className="news-item"
            >

              <img
                src={
                  article.image ||
                  "https://placehold.co/120x80?text=News"
                }
                alt={article.title}
              />

              <div className="news-content">

                <h4>{article.title}</h4>

                <p>{article.source}</p>

                <span>
                  {new Date(
                    article.published
                  ).toLocaleDateString()}
                </span>

              </div>

              <FaExternalLinkAlt />

            </a>
          ))
        ) : (
          <p>No news available.</p>
        )}

      </div>

    </div>
  );
}

export default NewsCard;
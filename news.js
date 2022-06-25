const apiKey = "5c0abc89ec8745fe8b6ab48ec1bbccf8";

const displayNews = (articles) => {
  const news = document.querySelector(".news");

  for (let i = 0; i < 3; i++) {
    const newsCard = document.createElement("div");
    newsCard.className = "newsCard";
    news.appendChild(newsCard);

    const img = document.createElement("img");
    img.src = articles[i].media;
    img.alt = articles[i].title;
    newsCard.appendChild(img);

    const heading = document.createElement("p");
    heading.innerHTML = articles[i].title;
    heading.className = "text";
    newsCard.appendChild(heading);

    const source = document.createElement("a");
    source.innerHTML = articles[i].rights;
    source.href = articles[i].link;
    heading.appendChild(source);
  }
};

const getNews = async () => {
  const res = await axios.get(
    "https://free-news.p.rapidapi.com/v1/search?q=covid&lang=en",
    {
      headers: {
        "X-RapidAPI-Key": "9ee3845df0msh500703b88f843e2p1bcb10jsn1c0a538234de",
        "X-RapidAPI-Host": "free-news.p.rapidapi.com",
      },
    }
  );
  console.log(res.data.articles);
  displayNews(res.data.articles);
};

getNews();

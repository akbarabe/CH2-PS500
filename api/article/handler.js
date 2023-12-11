const articles = require("../../utils/article.json");

class ArticleHandler {
  async getArticleHandler(request) {
    const { keyword } = request.query;

    let filter = articles;
    if (keyword !== undefined) {
      filter = filter.filter((article) => {
        if (keyword !== undefined) {
          if (!article.content.toLowerCase().includes(keyword.toLowerCase())) {
            return false;
          }
        }
        return true;
      });
      return {
        status: "success",
        data: {
          articles: filter,
        },
      };
    }
    return {
      status: "success",
      data: {
        articles,
      },
    };
  }

  async getArticleByIdHandler(request) {
    const { id } = request.params;
    const article = articles[id];
    return {
      status: "success",
      data: {
        article,
      },
    };
  }

  // like / favoritin article
}

module.exports = ArticleHandler;

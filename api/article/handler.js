const { db } = require("../../config/firebase");
const verifyToken = require("../token");
class ArticleHandler {
  async getArticleHandler(request) {
    const { keyword } = request.query;
    const data = await db.collection("articles").get();
    const articles = data.docs.map((doc) => doc.data());

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
    const data = await db.collection("articles").doc(id).get();
    const article = data.data();
    return {
      status: "success",
      data: {
        article,
      },
    };
  }

  async likeArticleHandler(request, h) {
    const { id: articleId } = request.params;
    const token = request.headers.authorization;
    const userId = await verifyToken(token);

    const snapshot = await db
      .collection("articleLike")
      .where("articleId", "==", articleId)
      .where("userId", "==", userId)
      .get();

    if (snapshot.empty) {
      await db.collection("articleLike").add({
        articleId,
        userId,
      });
      return {
        status: "success",
      };
    } else {
      return {
        status: "error",
        message: "Anda sudah menyukai artikel ini",
      };
    }
  }

  async getLikeArticleHandler(request, h) {
    const { id } = request.params;
    const like = await db
      .collection("articleLike")
      .where("articleId", "==", id)
      .get();
    const count = like.size;
    const response = h.response({
      status: "success",
      data: {
        likes: count,
      },
    });
    return response;
  }

  async unLikeArticleHandler(request) {
    const { id } = request.params;
    const token = request.headers.authorization;
    const userId = await verifyToken(token);

    const snapshot = await db
      .collection("articleLike")
      .where("articleId", "==", id)
      .where("userId", "==", userId)
      .get();

    if (!snapshot.empty) {
      // Ada dokumen yang memenuhi kedua kondisi, lakukan penghapusan
      const deletePromises = snapshot.docs.map((doc) => doc.ref.delete());
      await Promise.all(deletePromises);

      return { status: "success", message: "Batal Menyukai" };
    } else {
      return {
        status: "error",
        message: "Data tidak ditemukan",
      };
    }
  }
}

module.exports = ArticleHandler;

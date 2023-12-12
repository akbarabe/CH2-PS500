const autoBind = require("auto-bind");
const { db } = require("../../config/firebase");
const verifyToken = require("../token");
class ComunityHandler {
  constructor(validator) {
    this._validator = validator;
    autoBind(this);
  }

  // POST
  async addPostHandler(request, h) {
    const { title, content, date } = request.payload;
    const token = request.headers.authorization;
    const userId = await verifyToken(token);

    this._validator.validatePostingPayload(request.payload);
    const post = await db.collection("postings").add({
      title,
      content,
      date,
      userId,
    });

    const response = h.response({
      status: "success",
      data: {
        post,
      },
    });
    response.code(201);
    return response;
  }

  async getPostHandler(request) {
    const { keyword } = request.query;

    const data = await db.collection("postings").get();
    const postings = data.docs.map((doc) => doc.data());

    let filterPosting = postings;
    if (keyword !== undefined) {
      filterPostings = filterPostings.filter((posting) => {
        if (keyword !== undefined) {
          if (!posting.keyword.toLowerCase().includes(keyword.toLowerCase())) {
            return false;
          }
        }
        return true;
      });
      return {
        status: "success",
        data: {
          postings: filterPosting,
        },
      };
    }
    return {
      status: "success",
      data: {
        postings,
      },
    };
  }

  async getPostByIdHandler(request) {
    const { id } = request.params;

    const data = await db.collection("postings").doc(id).get();
    const posting = data.data();
    return {
      status: "success",
      data: {
        posting,
      },
    };
  }

  async deletePostByIdHandler(request) {
    const { id } = request.params;
    const token = request.headers.authorization;
    const userId = await verifyToken(token);

    const post = await db.collection("postings").doc(id).get();
    if (post.exists) {
      const postData = post.data();
      if (postData.userId === userId) {
        await db.collection("postings").doc(id).delete();
        return { status: "success", message: "Postingan berhasil dihapus" };
      } else {
        return {
          status: "error",
          message: "Anda tidak memiliki izin untuk menghapus Postingan ini",
        };
      }
    }
  }

  // COMMENT

  async addCommentHandler(request, h) {
    const { id: postId } = request.params;
    const token = request.headers.authorization;
    const userId = await verifyToken(token);
    const { content, date } = request.payload;
    this._validator.validateCommentPayload(request.payload);

    const comment = await db.collection("comments").add({
      content,
      date,
      postId,
      userId,
    });

    const response = h.response({
      status: "success",
      data: {
        comment,
      },
    });
    response.code(201);
    return response;
  }

  async getCommentByPostIdHandler(request) {
    const { id } = request.params;

    const data = await db
      .collection("comments")
      .where("postId", "==", id)
      .get();
    const comment = data.docs.map((doc) => doc.data());
    return {
      status: "success",
      data: {
        comment,
      },
    };
  }

  async deleteCommentByIdHandler(request) {
    const token = request.headers.authorization;
    const userId = await verifyToken(token);
    const { commentId } = request.params;

    const comment = await db.collection("comments").doc(commentId).get();

    if (comment.exists) {
      const commentData = comment.data();
      if (commentData.userId === userId) {
        await db.collection("comments").doc(commentId).delete();
        return { status: "success", message: "Komentar berhasil dihapus" };
      } else {
        return {
          status: "error",
          message: "Anda tidak memiliki izin untuk menghapus komentar ini",
        };
      }
    } else {
      return { status: "error", message: "Komentar tidak ditemukan" };
    }
  }

  // LIKE

  async likePostHandler(request, h) {
    const { id: postId } = request.params;
    const token = request.headers.authorization;
    const userId = await verifyToken(token);

    const snapshot = await db
      .collection("postLike")
      .where("postId", "==", postId)
      .where("userId", "==", userId)
      .get();

    if (snapshot.empty) {
      await db.collection("postLike").add({
        postId,
        userId,
      });
      return {
        status: "success",
      };
    } else {
      return {
        status: "error",
        message: "Anda sudah menyukai postingan ini",
      };
    }
  }

  async getLikePostHandler(request, h) {
    const { id } = request.params;
    const like = await db
      .collection("postLike")
      .where("postId", "==", id)
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

  async unLikePostHandler(request) {
    const { id } = request.params;
    const token = request.headers.authorization;
    const userId = await verifyToken(token);

    const snapshot = await db
      .collection("postLike")
      .where("postId", "==", id)
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

module.exports = ComunityHandler;

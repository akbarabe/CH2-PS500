const { db } = require("../../config/firebase");
const verifyToken = require("../token");
class EventHandler {
  async getEventHandler(request) {
    const { date, location } = request.query;

    const data = await db.collection("events").get();
    const events = data.docs.map((doc) => doc.data());

    let filter = events;
    if (date !== undefined || location !== undefined) {
      filter = filter.filter((e) => {
        if (date !== undefined) {
          if (!e.date.toLowerCase().includes(date.toLowerCase())) {
            return false;
          }
        }
        if (location !== undefined) {
          if (!e.location.toLowerCase().includes(location.toLowerCase())) {
            return false;
          }
        }
        return true;
      });
      return {
        status: "success",
        data: {
          events: filter,
        },
      };
    }
    return {
      status: "success",
      data: {
        events,
      },
    };
  }

  async getEventByIdHandler(request) {
    const { id } = request.params;
    const data = await db.collection("events").doc(id).get();
    const event = data.data();
    return {
      status: "success",
      data: {
        event,
      },
    };
  }
  async saveEventHandler(request, h) {
    const { id: eventId } = request.params;
    const token = request.headers.authorization;
    const userId = await verifyToken(token);

    const snapshot = await db
      .collection("saveEvent")
      .where("eventId", "==", eventId)
      .where("userId", "==", userId)
      .get();

    if (snapshot.empty) {
      await db.collection("saveEvent").add({
        eventId,
        userId,
      });
      return {
        status: "success",
      };
    } else {
      return {
        status: "error",
      };
    }
  }

  async getSavedEventHandler(request, h) {
    const token = request.headers.authorization;
    const userId = await verifyToken(token);
    const data = await db
      .collection("saveEvent")
      .where("userId", "==", userId)
      .get();
    const event = data.docs.map((doc) => doc.data());
    const response = h.response({
      status: "success",
      data: {
        event,
      },
    });
    return response;
  }

  async unSaveEventHandler(request) {
    const { id } = request.params;
    const token = request.headers.authorization;
    const userId = await verifyToken(token);

    const snapshot = await db
      .collection("saveEvent")
      .where("eventId", "==", id)
      .where("userId", "==", userId)
      .get();

    if (!snapshot.empty) {
      // Ada dokumen yang memenuhi kedua kondisi, lakukan penghapusan
      const deletePromises = snapshot.docs.map((doc) => doc.ref.delete());
      await Promise.all(deletePromises);

      return { status: "success" };
    } else {
      return {
        status: "error",
      };
    }
  }
}

module.exports = EventHandler;

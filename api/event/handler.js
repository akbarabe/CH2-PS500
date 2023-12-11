const events = require("../../utils/event.json");

class EventHandler {
  async getEventHandler(request) {
    const { date, location } = request.query;

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
    const event = events[id];
    return {
      status: "success",
      data: {
        event,
      },
    };
  }
}

module.exports = EventHandler;

import http from "../../http-common";

class TopicDataService {
  getAll() {
    return http.get("/Topics");
  }

  get(id) {
    return http.get(`/Topics/${id}`);
  }

  create(data) {
    return http.post("/Topics", data);
  }
}

export default new TopicDataService();
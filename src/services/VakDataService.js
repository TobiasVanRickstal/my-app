import http from "../../http-common";

class VakDataService {
  getAll() {
    return http.get("/vaks");
  }

  get(id) {
    return http.get(`/vaks/${id}`);
  }

  create(data) {
    return http.post("/vaks", data);
  }
}

export default new VakDataService();
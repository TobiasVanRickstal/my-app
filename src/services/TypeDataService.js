import http from "../../http-common";

class TypeDataService {
  getAll() {
    return http.get("/types");
  }

  get(id) {
    return http.get(`/types/${id}`);
  }

  create(data) {
    return http.post("/types", data);
  }
}

export default new TypeDataService();
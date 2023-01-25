import http from "../../http-common";

class DocentDataService {
  getAll() {
    return http.get("/docents");
  }

  get(id) {
    return http.get(`/docents/${id}`);
  }

  create(data) {
    return http.post("/docents", data);
  }

  update(id, data) {
    return http.put(`/docents/${id}`, data);
  }

  delete(id) {
    return http.delete(`/docents/${id}`);
  }

  deleteAll() {
    return http.delete(`/docents`);
  }

  findByTitle(naam) {
    return http.get(`/docents?naam=${naam}`);
  }
}

export default new DocentDataService();
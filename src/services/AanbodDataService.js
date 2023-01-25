import http from "../../http-common";

class AanbodDataService {
  getAll() {
    return http.get("/aanbods");
  }

  get(id) {
    return http.get(`/aanbods/${id}`);
  }

  create(data) {
    return http.post("/aanbods", data);
  }

  update(id, data) {
    return http.put(`/aanbods/${id}`, data);
  }

  delete(id) {
    return http.delete(`/aanbods/${id}`);
  }

  deleteAll() {
    return http.delete(`/aanbods`);
  }

//   findAllByDocentId(docentId) {
//     return http.get(`/aanbod-docent/${docentId}`);
//   }
}

export default new AanbodDataService();
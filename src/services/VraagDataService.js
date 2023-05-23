import http from "../../http-common";

class VraagDataService {
  getAll() {
    return http.get("/vraags");
  }

  get(id) {
    return http.get(`/vraags/${id}`);
  }

  create(data) {
    return http.post("/vraags", data);
  }

  update(id, data) {
    return http.put(`/vraags/${id}`, data);
  }

  delete(id) {
    return http.delete(`/vraags/${id}`);
  }

  deleteAll() {
    return http.delete(`/vraags`);
  }

//   findAllByDocentId(docentId) {
//     return http.get(`/vraag-docent/${docentId}`);
//   }
}

export default new VraagDataService();
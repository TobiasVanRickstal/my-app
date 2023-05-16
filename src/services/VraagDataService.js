import http from "../../http-common";

class VraagDataService {
  getAll() {
    return http.get("/vragen");
  }

  get(id) {
    return http.get(`/vragen/${id}`);
  }

  create(data) {
    return http.post("/vragen", data);
  }

  update(id, data) {
    return http.put(`/vragen/${id}`, data);
  }

  delete(id) {
    return http.delete(`/vragen/${id}`);
  }

  deleteAll() {
    return http.delete(`/vragen`);
  }

//   findAllByDocentId(docentId) {
//     return http.get(`/vraag-docent/${docentId}`);
//   }
}

export default new VraagDataService();
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

  findAllByDocentId(id) {
    return http.get(`/vragen/docenten/${id}/vragen`);
  }

  findAllByWerknemerId(id) {
    return http.get(`/vragen/werknemers/${id}/vragen`);
  }

  findAllByBedrijfId(id) {
    return http.get(`/vragen/bedrijven/${id}/vragen`);
  }
}

export default new VraagDataService();
import http from "../../http-common";

class WerknemerDataService {
  getAll() {
    return http.get("/werknemers");
  }

  get(id) {
    return http.get(`/werknemers/${id}`);
  }

  create(data) {
    return http.post("/werknemers", data);
  }

  update(id, data) {
    return http.put(`/werknemers/${id}`, data);
  }

  delete(id) {
    return http.delete(`/werknemers/${id}`);
  }

  deleteAll() {
    return http.delete(`/werknemers`);
  }

  findByTitle(naam) {
    return http.get(`/werknemers?naam=${naam}`);
  }
// TODO Find docent by email
  findByEmail(email) {
    return http.get(`/werknemers?email=${email}`);
  }
}

export default new WerknemerDataService();
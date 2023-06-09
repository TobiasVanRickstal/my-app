import http from "../../http-common";

class BedrijfDataService {
  getAll() {
    return http.get("/bedrijven");
  }

  get(id) {
    return http.get(`/bedrijven/${id}`);
  }

  create(data) {
    return http.post("/bedrijven", data);
  }

  update(id, data) {
    return http.put(`/bedrijven/${id}`, data);
  }

  delete(id) {
    return http.delete(`/bedrijven/${id}`);
  }

  deleteAll() {
    return http.delete(`/bedrijven`);
  }

  // findByTitle(naam) {
  //   return http.get(`/bedrijven?naam=${naam}`);
  // }

}

export default new BedrijfDataService();
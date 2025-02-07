export default class Data {
  constructor(uri) {
    this.uri = uri;
    this.data = [];
  }

  async refreshData() {
    await fetch(this.uri)
      .then((response) => {
        if (!response.ok) {
          console.log(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        this.data = data;
        return this.data;
      });
    return this.data;
  }
  getSalonDataById(id) {
    console.log(id);
    return this.data.salons.find((item) => item.id == id);
  }
}

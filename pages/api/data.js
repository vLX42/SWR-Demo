
export default async function getShips(req, res) {
    const {
        query: { page },
      } = req
  async function getData() {
    try {
      let url = `https://rickandmortyapi.com/api/character/?page=${page}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return await response.json();
    } catch (ex) {
      console.error('get-morty', ex.toString());
      return [];
    }
  }

  let data = await getData();


  return setTimeout(() => res.json({...data, lastUpdate: new Date().toLocaleString() } ), page ? 1000 : 2000)
}

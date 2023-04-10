window.onload = function () {
  let ps = placeSearch({
    key: "vNH4YmGf1pMUK1iVQcCCQFaUXQMMVb5u",
    container: document.querySelector("#search-input"),
    collection: ["adminArea", "address"],
    useDeviceLocation: true,
  });

  L.mapquest.key = "vNH4YmGf1pMUK1iVQcCCQFaUXQMMVb5u";

  let baseLayer = L.mapquest.tileLayer("map");
  let map = L.mapquest.map("map", {
    center: [-23.5489, -46.6388],
    layers: baseLayer,
    zoom: 10,
  });

  L.mapquest.control().addTo(map);

  let searchLayer = null;

  ps.on("change", (e) => {
    let zoom = 13;
    if (e.result.type === "state") {
      zoom = 12;
    }

    map.setView(e.result.latlng, zoom);
    let search = L.mapquest.search();

    search.place(
      {
        category: "sic:581228F52",
        sort: "nearby",
        bbox: map.getBounds(),
        pageSize: 20,
      },
      handleSearch
    );
  });

  function handleSearch(err, data) {
    if (searchLayer) {
      map.removeLayer(searchLayer);
    }

    searchLayer = L.mapquest.searchLayer({
      searchResponse: data,
    });
    map.addLayer(searchLayer);
  }

  ps.on("clear", () => {
    if (searchLayer) {
      map.removeLayer(searchLayer);
    }
    searchLayer = null;
    map.setView(new L.LatLng(-23.5489, -46.6388), 10);
  });

  ps.on("error", (e) => {
    alert(e);
  });
};

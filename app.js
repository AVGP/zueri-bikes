function parseBikeStationsFromXml(xml) {
  var stations = [];
  [].forEach.call(xml.childNodes[0].childNodes, function(bikeStation) {
    stations.push({
      name: bikeStation.querySelector("station_name"),
      bikesAvailable: bikeStation.querySelector("nb_bikes")
    })
  });

  return stations;
}

function updateData(callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    callback(false, parseBikeStationsFromXml(this.responseXML));
  };
  xhr.overrideMimeType("text/xml");
  xhr.open("get", "http://www.corsproxy.com/zh.suisseroule.ch/gestion/stats/rep_text.php?xml=1", true);
  xhr.send();
}

function clearChildren(element) {
  while(element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
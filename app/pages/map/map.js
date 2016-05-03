import {Page} from 'ionic-angular';
import {ConferenceData} from '../../providers/conference-data';
import {Geolocation} from 'ionic-native';


@Page({
  templateUrl: 'build/pages/map/map.html'
})
export class MapPage {
  static get parameters() {
    return [[ConferenceData]];
  }

  constructor(confData) {
    this.confData = confData;
    this.map;
  }

  onPageLoaded() {

    this.confData.getMap().then(mapData => {
      let mapEle = document.getElementById('map');
      this.map = new google.maps.Map(mapEle, {
        center: mapData.find(d => d.center),
        zoomControl: false,
        scaleControl: false,
        zoom: 16
      });
      mapData.forEach(markerData => {
        let infoWindow = new google.maps.InfoWindow({
          content: `<h5>${markerData.name}</h5>`
        });

        let marker = new google.maps.Marker({
          position: markerData,
          map: this.map,
          title: markerData.name
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      });

      google.maps.event.addListenerOnce(this.map, 'idle', () => {
        mapEle.classList.add('show-map');
      });
    });
  }
  setCurrentposoitoin(){
    Geolocation.getCurrentPosition().then((resp) => {
        var pos = {
          lat: resp.coords.latitude,
          lng: resp.coords.longitude
        };
        var accuracy = new google.maps.Circle({
          strokeColor: '#2980b9',
          strokeOpacity: 0.5,
          strokeWeight: 1,
          fillColor: '#2980b9',
          fillOpacity: 0.35,
          map: this.map,
          center: pos,
          radius: resp.coords.accuracy
        });
        var accuracy = new google.maps.Circle({
          strokeColor: '#2980b9',
          strokeOpacity: 1,
          strokeWeight: 4,
          fillColor: '#2980b9',
          fillOpacity: 0.8,
          map: this.map,
          center: pos,
          radius: 1
        });
        this.map.setCenter(pos);
      }) 
  }
}

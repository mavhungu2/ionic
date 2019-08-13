import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Map, tileLayer, marker} from 'leaflet';
import { MarkerClusterGroup } from 'leaflet.markercluster'
import { CloudApiService } from '../services/cloud-api/cloud-api.service';
import { AlertService } from '../services/alert/alert.service';
import { ActionSheetController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-base-stations',
  templateUrl: './base-stations.page.html',
  styleUrls: ['./base-stations.page.scss'],
})
export class BaseStationsPage implements OnInit {
  @ViewChild('map') mapContainer: ElementRef;
  map: Map;
  constructor(private geolocation: Geolocation, public cloudApi: CloudApiService, public alertService: AlertService, public actionSheetController: ActionSheetController,  public navCtrl: NavController,) { }

  ngOnInit() {
    
  }

  ionViewDidEnter() {
    if(!this.map){
      this.map = new Map("map").fitWorld();
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attributions: 'www.tphangout.com',
        maxZoom: 18
      }).addTo(this.map);
    }
    this.cloudApi.get("get_base_stations", {})
    .then(response =>{
      if(!response){
        this.map.locate({
          setView: true,
          maxZoom: 10
        })
      }

      var markersCluster = new MarkerClusterGroup()

      
      response.forEach(station => {
        let myMarker: any = marker([station['latitude'], station['longitude']]).on('click', () => {
          this.presentActionSheet(station['mac_address']);
        })
        markersCluster.addLayer(myMarker)
      });

      this.map.addLayer(markersCluster);
      this.map.fitBounds(markersCluster.getBounds().pad(0.1));
    })
  }

  async presentActionSheet(mac_addres: string) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Option',
      buttons: [{
        text: 'Deploy App',
        icon: 'apps',
        handler: () => {
          this.navCtrl.navigateForward(['/deploy/'+mac_addres])
        }
      },{
        text: 'Overview',
          icon: 'stats',
          handler: () => {
            this.navCtrl.navigateForward(['/overview'])
          }
      },{
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          
        }
      }]
    });
    await actionSheet.present();
  }
}

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NavController } from "@ionic/angular";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AuthService } from '../../services/auth.service'
import { Router, ActivatedRoute } from "@angular/router";
import Swal  from 'sweetalert2';

declare var google: any

@Component({
  selector: 'app-accepted-order',
  templateUrl: './accepted-order.page.html',
  styleUrls: ['./accepted-order.page.scss'],
})
export class AcceptedOrderPage implements OnInit {  
  //For the map
  @ViewChild ('maps', {static: true})
  public mapref: ElementRef;
  public latitude: any;
  public longitude: any;

  public static lat;
  public static lon;  

  //For the posted user
  public userId;
  public partialUser;
  public jobOffer = {
    name: "",
    phone: "",
    email: "",
    schedule: "",
    location: "",
    rate: "",
    notes: ""
  };
  constructor(
    public navCtrl: NavController,
    public geo: Geolocation,
    private authService: AuthService,
    private http: Router,
    private router: ActivatedRoute
  ) { 
    this.getGeolocation()
  }

  ngOnInit() {
    let params = this.router.snapshot.paramMap.get('id')
    this.authService.getCustomersData(params).subscribe((data) => {
      this.partialUser = data
      this.jobOffer.name = this.partialUser.author.name
      this.jobOffer.phone = this.partialUser.author.phone
      this.jobOffer.email = this.partialUser.author.email
      this.jobOffer.schedule = this.partialUser.createdAt
      this.jobOffer.location = this.partialUser.service_location
      this.jobOffer.rate = this.partialUser.cost
      this.jobOffer.notes = this.partialUser.notes
    })
    
  }

  addDataToDatabase() {
    this.authService.addDataToJobOrders({ currentUser: this.authService.userIDToken, state: "accept", jobOffer:this.partialUser }).subscribe((data) => {
      if (data) {
        Swal.fire({
          icon: 'success',
          title: 'Nice!',
          text: 'Job Successfully Added to your on going job in tracker',
          showConfirmButton: false,
          timer: 1000
        })
        this.http.navigate(['job-orders'])
      }
    })
  }
  
  //Rejecting the joborders
  rejected(){
    this.authService.rejectedJobOrders({currentUser: this.authService.userIDToken, state:"rejected", jobOffer:this.partialUser}).subscribe((data) => {
      if (data) {
        Swal.fire({
          icon: 'success',
          title: 'Nice!',
          text: 'Job Successfully rejected',
          showConfirmButton: false,
          timer: 1000
        })
        this.http.navigate(['job-orders'])
      }
    })
  }

  navigateToMap() {
    this.http.navigate(['location-select/' + this.jobOffer.location])
  }

  getGeolocation(){
    this.geo.getCurrentPosition().then((res) => {
      this.latitude = res.coords.latitude
      this.longitude = res.coords.longitude
      this.showMap()
    }).catch((err) => {
      console.log("error", err)
    })
  }
  showMap() {
    const location = new google.maps.LatLng(this.latitude, this.longitude);
    var map = new google.maps.Map(document.getElementById('maps'), {
      center: location,
      zoom: 13,
      mapTypeId: 'roadmap'
    });

    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);

    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();
      if (places.length == 0) {
        return;
      }

      markers.forEach(function(marker) {
        marker.setMap(null);
      });

      markers = [];
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place){
        // LocationSelectPage.lat = place.geometry.viewport.Ya;
        // LocationSelectPage.lon = place.geometry.viewport.Ua;
        if (!place.geometry) {
          console.log('No geometry');
          return;
        }

        var icon = {
          url: place.icon,
          size: new google.maps.Size(72,71),
          origin: new google.maps.Point(0,0),
          anchor: new google.maps.Point(17,34),
          scaledSize: new google.maps.Size(25,25)
        };

        markers.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });

      map.fitBounds(bounds);
    });
  }
}
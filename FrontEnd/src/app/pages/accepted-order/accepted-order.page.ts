
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-accepted-order',
  templateUrl: './accepted-order.page.html',
  styleUrls: ['./accepted-order.page.scss'],
})
export class AcceptedOrderPage implements OnInit {
  public shouldDisable:boolean=true;
  public userId;
  public locationToPass;
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
    private authService: AuthService,
    private http: Router,
    private router: ActivatedRoute
  ) { }


  ngOnInit() {
    let params = this.router.snapshot.paramMap.get('id')
    this.authService.idHolder({ id: params }).subscribe()
    this.authService.getCustomersData(params).subscribe((data) => {
      this.partialUser = data
      this.jobOffer.name = this.partialUser.author.name
      this.jobOffer.phone = this.partialUser.author.phone
      this.jobOffer.email = this.partialUser.author.email
      this.jobOffer.schedule = this.partialUser.schedule
      this.jobOffer.location = this.partialUser.service_location
      this.jobOffer.rate = this.partialUser.cost
      this.jobOffer.notes = this.partialUser.notes
    })
  }
  // ionViewDidLoad() {
  //   setTimeout(x => {
  //     this.shouldDisable=false;
  //   }, 30000)//30 seconds
// }

  addDataToDatabase() {
    this.authService.addDataToJobOrders({ currentUser: this.authService.userIDToken, state: "accept", jobOffer: this.jobOffer }).subscribe((data) => {
      if (data) {
        this.http.navigate(['tracker'])
      }
    })
  }
  cancel() {
    this.http.navigate(['job-orders']);
    // if(this.setTime)

  }

  location() {
    this.http.navigate(['location-select'])
  }

}
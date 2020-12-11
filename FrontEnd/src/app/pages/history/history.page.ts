import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  transactions=[
    {type:"Cash-in", amount:"100.00", date: "05/10/1999", name: "Christopher Alonzo"},
    {type:"Cash-in", amount:"250.00", date: "07/19/1999" , name: "Christopher Alonzo"},
    {type:"Cash-in", amount:"200.00", date: "05/15/2000",  name: "Geneva Rivas"},
    {type:"Cash-in", amount:"100.00", date: "05/06/1999",  name: "Geneva Rivas"},
    {type:"Cash-out", amount:"100.00", date: "07/05/2000",  name: "Chilla Jean Cabungcag"},
    {type:"Cash-out", amount:"350.00", date: "06/30/1999",  name: "Chilla Jean Cabungcag"},
  ]

}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-finance',
  templateUrl: './finance.page.html',
  styleUrls: ['./finance.page.scss'],
})
export class FinancePage implements OnInit {
  public imageUrl;
  public dataHandler;
  public month = []
  public monthlyIncome = []
  public currentMoney = 0
  @ViewChild('barGraph', { static: true }) barCanvas: ElementRef;

  public hideStats = false

  public barChart: Chart

  constructor(private authservice: AuthService) { }

  // {state: "Ongoing", user: this.authService.userIDToken}
  ngOnInit() {
    this.authservice.getUser().subscribe((data) => {
      // this.authservice.getTheProfileImage({ name: data.data[0].name }).subscribe((data) => {
      //   this.imageUrl = data[0].image[0]
      // })
    })
    this.authservice.monthlyIncomeStatistics({ user: this.authservice.userIDToken }).subscribe((data) => {
      this.dataHandler = data
      this.dataHandler.forEach(element => {
        var mydate = new Date(element.currentTime);
        if (this.month.includes(mydate.toDateString().split(" ")[1])) {
          this.currentMoney += parseFloat(element.cost)
          this.monthlyIncome[this.month.indexOf(mydate.toDateString().split(" ")[1])] = this.currentMoney
        } else {
          this.month.push(mydate.toDateString().split(" ")[1])
          this.monthlyIncome.push(element.cost)
          this.currentMoney += parseFloat(element.cost)
        }
      });
    })
  }

  showStatistics() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "line",
      data: {
        labels: this.month,
        datasets: [
          {
            label: "Statistics of your income",
            data: this.monthlyIncome,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    })

  }
}
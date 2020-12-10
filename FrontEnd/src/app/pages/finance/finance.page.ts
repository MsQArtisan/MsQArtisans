import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.page.html',
  styleUrls: ['./finance.page.scss'],
})
export class FinancePage implements OnInit {
  @ViewChild('barGraph', { static: true }) barCanvas: ElementRef;

  public data
  public hideStats= true

  public barChart: Chart

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getStatistics().subscribe((data) => {
      this.data = data.data
    })

  }

  showStatistics() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "line",
      data: {
        labels: this.data.month,
        datasets: [
          {
            label: "Statistics of your income",
            data: this.data.amount,
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

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  sensorData: any;
  constructor(private service: ApiService, private toastr: ToastrService) { }
  
  ngOnInit(): void {
    this.getDatafromSensor();
  }

  public lineChartData: ChartDataSets[] = [
    { data: [0, 1, 20, 40, 50, 55, 40], label: 'Sensor 1 Data' },
    { data: [2, 6, 30, 44, 56, 57, 30], label: 'Sensor 2 Data' },
    { data: [0, 0, 0, 4, 56, 3, 0], label: 'Sensor 3 Data' }
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: (ChartOptions) = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.5)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  async getDatafromSensor() {
    await this.service.getSensorData()
      .then((success: any) => {
        this.sensorData = success;    
      },
      (fail) => {
        this.toastr.error('Check API Service', 'Failed');
        console.log(fail);
      });
  }
}

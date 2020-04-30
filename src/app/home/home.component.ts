import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  sensorData: any;

  constructor(private service: ApiService, private toastr: ToastrService) { }
  
  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[];

  // Use Lodash to simplify logic - later To DO - too many loops why? Time
  changeData(inputData:any[]) {
    let lineChartLabels = [];
    let lineChartData=[];
    let lineChartDataArray=[];
    
    inputData.forEach((value:any) => {
      if(lineChartLabels.indexOf(value.recordedTS)==-1) {
        lineChartLabels.push(value.recordedTS)
      }
    });

     inputData.forEach(
      (value) => {
        if(lineChartDataArray.indexOf(value.sensorID)== -1){
          lineChartDataArray.push(value.sensorID)
        }
      }
    );
    
    lineChartDataArray.forEach((value) => {
      let sensorvalues=[];
      inputData.forEach((v)=> {
        if (value == v.sensorID) {
          sensorvalues.push(v.moisture)
        }
      });
  
      let obj= { data:sensorvalues,label:value }
      lineChartData.push(obj);
    });
    return [lineChartData,lineChartLabels]
  }
  
  ngOnInit(): void {
    this.getDatafromSensor();    
  }

  public lineChartOptions: (ChartOptions);
  public lineChartColors: Color[];
  public lineChartLegend = true;
  public lineChartType;
  public lineChartPlugins = [];
  async getDatafromSensor() {
    await this.service.getSensorData()
      .then((success: any) => {
        this.sensorData = success;
        this.lineChartOptions = {
          responsive: true,
        };
        this.lineChartColors = [
          {
            borderColor: 'black',
            backgroundColor: 'rgba(255,0,0,0.1)',
          },
        ];
        this.lineChartType = 'line';
        this.lineChartData = this.changeData(this.sensorData)[0];
        this.lineChartLabels = this.changeData(this.sensorData)[1];
      },
      (fail) => {
        this.toastr.error('Check API Service', 'Failed');
        console.log(fail);
      });
  }
}

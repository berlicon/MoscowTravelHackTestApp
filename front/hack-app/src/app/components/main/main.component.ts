import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { products } from './products';
import { WeatherForecast } from '../../models/weatherforecast';
import { Service } from '../../services/service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public checked: boolean = true;
  public gridData: any[] = products;
  public data: WeatherForecast[] = [];

  public x: number = 0;
  public y: number = 1;

  constructor(
    private notificationService: NotificationService,
    private service: Service
  ) { }

  ngOnInit() {
    this.service.getData().subscribe(response => {
      this.data = response;
    });
  }

  public onAlert() {
    alert('hello');
  }

  public testGet() {
    this.service.testGet(3, 5).subscribe(response => {
      alert(response);
    });
  }

  public testPost() {
    let list = [1, 2];
    this.service.testPost(3, 5, 123, 'test', true, list).subscribe(response => {
      alert(response);
    });
  }

  public testNDarray() {
    this.service.testNDarray([+this.x, +this.y]).subscribe(response => {
      alert(response);
    });
  }

  public predict() {
    this.service.predict([+this.x, +this.y]).subscribe(response => {
      alert(response);
    });
  }

  public init() {
    this.service.init().subscribe(response => {
      alert('Успешно загружена нейросеть');
    });
  }

  public show(): void {
    this.notificationService.show({
      content: 'Your data has been saved. Time for tea!',
      cssClass: 'button-notification',
      animation: { type: 'slide', duration: 400 },
      position: { horizontal: 'center', vertical: 'bottom' },
      type: { style: 'success', icon: true },
      closable: true
    });
  }
}

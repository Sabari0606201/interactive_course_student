import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/service/apiservice.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(private service: ApiserviceService) { }
  readData: any;


  ngOnInit(): void {
    this.service.gettopics().subscribe((res) => {
      console.log(res, "res==>");
      this.readData = res.data;
    });

  }





  clickCount = 0;
  showContent = false;

  handleClick() {
    this.clickCount++;
    if (this.clickCount === 1) {
      this.showContent = true;
    }
  }

}
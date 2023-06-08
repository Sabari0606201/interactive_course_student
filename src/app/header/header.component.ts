
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/service/apiservice.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { StatusService } from 'src/service/status.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  value = 0;




  ischat = false;
  isOpen = false;


  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router, private service: ApiserviceService, private status_service: StatusService) { }



  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  msg: any
  usermsg: any;
  msgseen = false;
  sendmsg() {
    this.msgseen = true;
    console.log(this.msg)
    this.usermsg = this.msg;
  }






  readchat: any;
  messages: any[] = [];
  newMessage?: string;

  sendMessage() {
    if (this.newMessage) {
      this.messages.push({
        text: this.newMessage,
        from: 'me'
      });
      this.newMessage = '';
    }
  }
  status: any;
  ngOnInit(): void {
    this.service.getchat().subscribe((res) => {
      console.log(res, "res==>");
      this.readchat = res.data;
    })

    this.status_service.buttonClick$.subscribe(() => {
      this.status = this.status_service.setstatus();
      this.value += this.status;
      console.log("status", this.value)

    });


  }



  userForm = new FormGroup({
    'studentside': new FormControl('', Validators.required),

  });
  userSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value)
      this.service.createmsg(this.userForm.value).subscribe((res) => {
        console.log(res, 'res==>');
        this.userForm.reset();
      });
    }
    else {
      console.log(`all field is required`);
    }
  }




}
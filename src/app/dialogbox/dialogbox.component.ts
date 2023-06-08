import { Component } from '@angular/core';
import { SuggestionsService } from 'src/service/suggestions.service';

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.css']
})
export class DialogboxComponent {
  constructor(private suggservice: SuggestionsService) { }

  suggestion: any;
  number: any;
  ngOnInit() {


    this.suggestion = (this.suggservice.getsugg());
    console.log("works", this.suggestion);

  }
}

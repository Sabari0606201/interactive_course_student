import { Component } from '@angular/core';
import { DiffResults } from 'ngx-text-diff/lib/ngx-text-diff.model';
import { CompilerService } from 'src/service/compiler.service';
import { HomeComponent } from '../home/home.component';


@Component({
  selector: 'app-answer-box-dialog',
  templateUrl: './answer-box-dialog.component.html',
  styleUrls: ['./answer-box-dialog.component.css']
})
export class AnswerBoxDialogComponent {

  constructor(private program: CompilerService) {
  }

  onCompareResults(diffResults: DiffResults) {
    console.log("diffResults", diffResults);
  }
  left = this.program.getProgram().left;
  right = this.program.getProgram().right;
}

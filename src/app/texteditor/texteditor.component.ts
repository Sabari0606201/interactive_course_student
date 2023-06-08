import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompilerService } from 'src/service/compiler.service';
import 'brace';
import 'brace/mode/java';
import 'brace/theme/monokai';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { SuggestionsService } from 'src/service/suggestions.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ApiserviceService } from 'src/service/apiservice.service';



@Component({
  selector: 'app-texteditor',
  templateUrl: './texteditor.component.html',
  styleUrls: ['./texteditor.component.css'],
  providers: [DatePipe],
  animations: [trigger('shake', [
    state('normal', style({
      transform: 'translateX(0)'
    })),
    state('shake1', style({
      transform: 'translateX(-10px)'
    })),
    state('shake2', style({
      transform: 'translateX(10px)'
    })),
    transition('normal => shake1', [
      animate('100ms ease-out')
    ]),
    transition('shake1 => shake2', [
      animate('100ms ease-out')
    ]),
    transition('shake2 => shake1', [
      animate('100ms ease-out')
    ]),
    transition('shake1 => normal', [
      animate('100ms ease-out')
    ])
  ])]
})



export class TexteditorComponent {

  @ViewChild('editor') editor: any;
  buttonState = 'normal';


  shakeButton() {
    this.buttonState = 'shake1';
    setTimeout(() => {
      this.buttonState = 'shake2';
      setTimeout(() => {
        this.buttonState = 'shake1';
        setTimeout(() => {
          this.buttonState = 'shake2'
          setTimeout(() => {
            this.buttonState = 'normal';
          }, 300);
        }, 300);
      }, 300);
    }, 300);
  }



  constructor(private http: HttpClient, private compilerService: CompilerService, private _snackBar: MatSnackBar, public dialog: MatDialog, private suggservice: SuggestionsService, private service: ApiserviceService) { }

  public content: string = ``;
  result: any = "";
  value: any = "";

  suggestion: string[] = ["Check for typos: Make sure you have spelled the symbol name correctly. Java is case-sensitive, so double-check that the capitalization is consistent between the symbol's definition and where it is being used.",
    'Use correct class name - The spelling and casing of the class name should be checked when executing the program.',
    'check Missing semicolons, Missing parenthesis, square brackets, or curly braces  ',
    'Incorrect package name: Check that you have specified the correct package name in your code. Make sure that the name matches the name of the directory where your code is located.',
    'closing curly bracket of the main() method is missing check it',
    'All identifiers should begin with a letter (A to Z or a to z), a currency character ($), or an underscore (_). A keyword cannot be used as an identifier. Most importantly, identifiers are case -sensitive.',
    'Check the data types: Review the data types used in your code to ensure that they are compatible with each other. For example, if you are trying to assign a String to an int variable, you will get a type error.',
    'Check the class name: Verify that the class name specified in your source code matches the actual class name of the file. The class name should be identical to the file name, including the case.',

  ]


  wordsets = [['cannot ', 'find', 'symbol',],
  ['load', 'main', 'class'],
  ['expected'],
  ['package', 'does not exist'],
  ['reached end', 'file while parsing'],
  ['identifier', 'expected'],
  ['incompatible types'],
  ['no class file']];

  suggestions = "";
  num: any;
  isLoading = false;
  suggestionshow = false;

  compile() {
    this.isLoading = true;
    this.compilerService.compiler(this.content, this.value).subscribe((response: any) => {
      this.result = response;
      console.log(this.result)

      if (this.result.stderr != "") {
        this.suggestionshow = true;
        this.shakeButton();
      }

      else {
        this.suggestionshow = false;
      }

      this.isLoading = false;
      this.compilerService.setValue(this.result.stdout);
      this.compilerService.setError(this.result.stderr);

      this.check_exe_ans();

    });
    this.result.stdout = "";
    this.result.stderr = "";
  }

  number: any

  sugg() {
    var regex = /java:(\d+)/;
    var match = this.result.stderr.match(regex);

    if (match) {
      this.number = match[1];
      console.log("The number is: " + this.number);
    }
    else {
      this.number = 0;
      console.log("No number found after 'java:'.");
    }

    let i = 0;

    for (const words of this.wordsets) {
      let allWordsPresent = true;

      for (const word of words) {
        const regex = new RegExp('\\b' + word + '\\b', 'i');
        if (!regex.test(this.result.stderr)) {
          allWordsPresent = false;
          i++;
          break;
        }
      }
      if (allWordsPresent) {
        console.log(this.suggestion[0]);
        this.suggestions = this.suggestion[i];
        // this.suggestions="In the Line " + this.num + " "+ this.suggestion[i] ;
        //this._snackBar.open(this.suggestions, 'Dismiss', { duration: 6000, verticalPosition: 'top', horizontalPosition: 'center' });
        this.dialog.open(DialogboxComponent);
        this.suggservice.setsugg(this.suggestions, this.number);
        i++;
      } else {
        console.log('');
      }
    }
  }

  subtopicid = 1;
  practice: any
  practice_ans: any;
  dummycontent: string = "";
  AnsProgram: any;

  getPractice() {
    this.service.getPractice(this.subtopicid).subscribe((res) => {
      this.practice = res.data;
      console.log("practice", this.practice);
      this.dummycontent = this.practice[0].program
      this.content = `//your Code
${this.dummycontent}`;
      this.practice_ans = this.practice[0].output;
      console.log("output", this.practice_ans);

      this.AnsProgram = this.practice[0].Prac_ans;

      if (this.result.stdout == this.practice_ans) {
        this.practice_ans = '';
      }
    })
  }

  check_exe_ans() {

    if (this.result.stdout == this.practice_ans) {
      console.log("exe crt");
      this.practice_ans = '';
      this.compilerService.emitCompileButton();

    }
    else {
      console.log("ext wrng");

    }
  }

  code: any;
  ngOnInit() {
    this.compilerService.buttonClick$.subscribe(() => {

      this.code = (this.compilerService.getcode());
      console.log(this.code);
      this.subtopicid++;
      this.getPractice();
      this.result.stdout = '';
      // this.content = this.code;
      // this.compile();
    });

    this.compilerService.buttonClickBack$.subscribe(() => {
      this.subtopicid--;
      this.getPractice();
    })

    this.getPractice();

    this.compilerService.codeclean$.subscribe(() => {
      this.content = '';
    })

  }

  deletecode() {
    this.content = '';
  }

  changeContent(content: string) {
    this.compilerService.setProgram(content, this.AnsProgram);
  }
  ngAfterViewChecked() {
    console.log("Content", this.content);
    this.changeContent(this.content)

  }


}

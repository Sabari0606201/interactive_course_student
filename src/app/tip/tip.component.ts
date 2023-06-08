import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tip',
  templateUrl: './tip.component.html',
  styleUrls: ['./tip.component.css']
})
export class TipComponent implements OnInit{


  ngOnInit(): void {
    this.displayRandomQuestion();
  }

constructor(private _snackBar: MatSnackBar){ }


randomQuestion: any;
questions = [
  "Java was created by James Gosling and his team at Sun Microsystems in the mid-1990s.",
  "Java is a general-purpose, class-based, object-oriented programming language.",
  "Java is one of the most widely used programming languages in the world, with millions of developers and billions of devices running Java software.",
  "Java is used in a wide range of applications, from desktop software to web applications to mobile apps to large-scale enterprise systems.",
  "Java is open source, meaning that the source code for the language and its libraries is freely available and can be modified and distributed by anyone.",
  // Add more questions here
];


displayRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * this.questions.length);
    this.randomQuestion = this.questions[randomIndex];

    setTimeout(() => {
      this.randomQuestion = null;
      
    }, 5000);
   this._snackBar.open('Did you Know' + ' : '+ this.randomQuestion, 'Dismiss', { duration: 6000,  verticalPosition: 'top', horizontalPosition: 'center', panelClass: ['custom-snackbar']});
  }
}

import { OnInit, Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ApiserviceService } from 'src/service/apiservice.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { CompilerService } from 'src/service/compiler.service';
import { YouTubePlayer } from '@angular/youtube-player';
import { StatusService } from 'src/service/status.service';
import { interval } from 'rxjs/internal/observable/interval';
import { AnswerBoxDialogComponent } from '../answer-box-dialog/answer-box-dialog.component';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-100%)' }),
        animate('1000ms', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),

    trigger('shake', [
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
    ])
  ]
})



export class HomeComponent implements OnInit {

  scrollToTop(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  panelOpenState = false;
  isshow = false;
  buttonState = 'normal'

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
          }, 100);
        }, 100);
      }, 100);
    }, 100);
  }

  public singleBranchExpand = false;
  @ViewChild('myDiv') myDiv?: ElementRef;
  @ViewChild('player') player?: HomeComponent;
  @ViewChild('player') ytplayer?: YouTubePlayer;


  preCode: any;
  id: any;

  clickedCode(id: any) {
    console.log(`Clicked Code ${id}`);
    this.preCode = document.getElementById(id)?.innerHTML;
    console.log(this.preCode);
    this.compilerService.setcode(this.preCode);
  }





  constructor(private service: ApiserviceService, public dialog: MatDialog, private compilerService: CompilerService, private status_service: StatusService, private programDialog: MatDialog) {
    // this.myPreElement = new ElementRef(document.createElement('pre'));

  }



  //timer for program
  countdownTime: number = 1800;

  get minutes(): number {
    return Math.floor(this.countdownTime / 60);
  }

  get seconds(): number {
    return this.countdownTime % 60;



  }
  //








  video = false;
  dialogbox = false;
  taskshow = false;

  // checkthis2(e: any) {

  //   if (e.target.scrollHeight < e.target.scrollTop + e.target.offsetHeight) {
  //     this.dialogbox = true;
  //   } else {
  //     this.dialogbox = false;
  //     this.taskshow = false;

  //   }
  // }



  videotrue() {
    this.dialogbox = false;
    this.video = true;

  }


  //for youtube video
  program: string = '';
  formattedProgram: any;
  left = this.program;
  right = "Sabari is a bad boy \n mini";
  title = "CodeSandbox";


  getProgram() {
    // this.program = this.compilerService.getProgram()
    console.log("program", this.program);
    this.formattedProgram = this.program.replace(/\n/g, '\n');
    console.log("diff", this.program);
    this.programDialog.open(AnswerBoxDialogComponent)
  }


  apiLoaded = false;
  videoId: any;
  readData: any;
  readData1: any;
  readData3: any;
  readsubtopic2: any;
  readsubtopic3: any;
  readcodecontents: any;
  readnotes: any;
  demo: any;
  demo11: any
  readvideo: any;
  readtask: any;
  javaQuestions: any;
  codecontents: any[] = [];
  isBackDisabled: any;
  isNextDisabled: any;

  ngOnInit(): void {

    interval(2000).subscribe(() => {
      this.shakeButton();
    });


    this.clickedCode(this.id);
    this.gettopic();
    this.getCodeContent();
    this.getQuiz();
    this.getTask();
    this.getFillup();
    this.getPractice();


    this.isBackDisabled = true;
    this.isNextDisabled = true;


    this.prac_check();

    this.service.getCode().subscribe((res) => {
      console.log(res, "res==>");
      this.readData1 = res.data;
    });

    this.service.getnotes().subscribe((res) => {
      console.log(res, "notes res==>");
      this.readnotes = res.data;
    });


    this.service.getvideo().subscribe((res) => {
      console.log(res, "video==>");
      this.readvideo = res.data;
      console.log(this.readvideo[0].youtube_id);
      this.videoId = this.readvideo[0].youtube_id;
    });




    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;

    }

  }




  seekToTime(time: number) {
    this.ytplayer?.seekTo(time, true);
  }

  times: any;
  onClickButton(event: any) {
    const timeStr = event.target.value;
    console.log(timeStr);
    const [hours, minutes, seconds] = timeStr.split(':').map(Number);
    const totalTime = hours * 3600 + minutes * 60 + seconds;
    this.seekToTime(totalTime);
  }

  correct1 = false;
  wrong = false;
  check = ""
  showans = false;
  value: any = " ";
  //copmare code ans

  checkans() {
    this.value = this.compilerService.getValue();

    this.showans = true;
    if (this.value === this.check) {
      this.correct1 = true;
      this.wrong = false;
      this.result = 'Test case passed';
      console.log("correct");
    }

    else {
      this.wrong = true;
      this.correct1 = false;
      console.log("false");
      this.result = 'Test case Failed';
    }
  }


  homeshow: boolean = true;


  //for quiz
  current = 0;
  selectedans: any;
  reason: any;
  answershow = false;
  donequiz = false;
  opta: any
  no_of_questions = 0;
  correct_ans = 0;
  wrong_ans = 0;
  quizshow = true;
  ans: string[] = [];

  answer(userans: any) {
    this.ans.push(userans);
    const len = this.demo.length;
    console.log(len);
    console.log(this.current);

    if (this.current + 1 === len) {
      this.answershow = true;
      this.quizshow = false;
    }

    // correct
    if (userans === this.demo[this.current].answer) {
      console.log("correct");
      this.current++;
      this.correct_ans++;
    }

    //wrong
    else {
      console.log("wrng")
      this.reason = this.demo[this.current].reason;
      this.current++
      this.wrong_ans++;
    }
  }

  //notes


  deleteID(id: any) {
    this.service.deleteData(id).subscribe((res) => {
      this.service.getnotes().subscribe((res) => {
        console.log(res, "notes res==>");
        this.readnotes = res.data;
      });
    })
  }

  obj: any;
  userForm = new FormGroup({
    'notes': new FormControl('', Validators.required),
  });

  userSubmit() {
    this.getCurrentTime();
    if (this.userForm.valid) {
      console.log(this.userForm.value)
      this.obj = Object.assign(this.userForm.value, { timer: this.Time }, { video_id: 1 });
      this.service.createnotes(this.userForm.value).subscribe((res) => {
        this.note();
        console.log(res, 'res==>');
        this.userForm.reset();
      });
    }

    else {
      console.log(`all field is required`);
    }
  }

  note() {
    this.service.getnotes().subscribe((res) => {
      console.log("notesgeted")
      this.readnotes = res.data;
    })
  }


  Time: any;

  getCurrentTime() {
    const timeInSeconds = this.player?.getCurrentTime();
    if (timeInSeconds !== undefined) {
      const hours = Math.floor(timeInSeconds / 3600);
      const minutes = Math.floor((timeInSeconds - hours * 3600) / 60);
      const seconds = Math.floor(timeInSeconds - hours * 3600 - minutes * 60);
      const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      console.log(formattedTime);

      console.log(formattedTime);
      this.Time = formattedTime;
    }
  }

  pauseVideo() {
    this.player?.pauseVideo();
  }

  playVideo() {
    this.player?.playVideo();
  }


  //hint

  gettopic() {
    this.service.getHome(this.topicid, this.subtopicid).subscribe((res) => {
      console.log(res, "topicid==>");
      this.readData = res.data;
    });
  }

  getCodeContent() {
    this.service.getcodecontents(this.topicid, this.subtopicid).subscribe((res) => {
      console.log(res, " code res==>");
      this.readcodecontents = res.data;
    });
  }

  getTask() {
    this.service.gettask(this.topicid).subscribe((res) => {
      console.log(res, "res==>");
      this.readtask = res.data;
      this.check = this.readtask[0].expected_output;
    });
  }

  getQuiz() {
    this.service.getquiz(this.topicid).subscribe((res) => {
      console.log(res, "res==>");
      this.demo = res.data;
    });
  }

  getFillup() {
    this.service.getcodetest(this.topicid).subscribe((res) => {
      console.log(res, " questonsres==>");
      this.javaQuestions = res.data;
      console.log(this.javaQuestions.length, " questonsres==>");
    });
  }

  practice: any;

  getPractice() {
    this.service.getPractice(this.subtopicid).subscribe((res) => {
      this.practice = res.data;
      console.log("practice", this.practice);
      const program = this.practice[0].program;
      console.log(program);
      this.compilerService.setcode(program);
    })
  }

  // code2: any = [
  //   '1. Declare a public class ',
  //   '2. Within the class, declare a public static void main method with a String array argument named "args"',
  //   '3. Within the main method, use the System.out.println method to print the string ',
  // ]

  // currentLineIndex = 0;
  // displayedLines = '';

  // codehint() {

  //   if (this.currentLineIndex < this.code2.length) {
  //     this.displayedLines += this.code2[this.currentLineIndex] + '<br>';
  //     this.currentLineIndex++;
  //   }
  //   if (this.countdownTime > 0) {
  //     this.countdownTime -= 120;
  //   }
  // }



  button = true;

  // onClick(id: any) {
  //   this.preCode = document.getElementById(id)?.innerHTML;
  //   console.log(this.preCode);
  //   this.compilerService.setcode(this.preCode);
  //   this.compilerService.emitButtonClick();
  // }


  b = 1;
  next_back = true;
  completed = false;

  iterate() {

    let n = 3;
    if (this.a == 3) {
      this.isNextDisabled = true;
      this.completed = false;
    }

    else {
      this.isNextDisabled = false;
      this.completed = true;
    }


    if (this.a < this.b) {
      this.isNextDisabled = false;
      this.completed = true;
    }

    if (this.b < n) {
      this.isNextDisabled = true;
      this.completed = false;
    }

    if (this.a == 4) {
      this.advanceToNextStage(1);
      this.next_back = false;
      this.subtopicid = 1;
      this.getPractice();
      this.getCodeContent();
      this.gettopic();
      this.a = 1;
      this.isBackDisabled = true;
    }
  }

  back() {
    if (1 <= this.b) {
      this.isNextDisabled = false;
      this.completed = true;
    }

    if (this.a == 1) {
      this.isBackDisabled = true;
    }
  }

  //
  a = 1;
  suptopicchange() {
    this.a++;
    console.log(this.a);
    this.subtopicid++;
    this.getCodeContent();
    this.gettopic();
    this.getPractice();
    this.compilerService.emitButtonClick();
    this.isBackDisabled = false;
    this.iterate();
  }

  //
  suptopicchangeback() {
    this.a--;
    console.log(this.subtopicid);
    this.subtopicid--;
    this.getCodeContent();
    this.gettopic();
    this.getPractice();
    this.compilerService.emitButtonClickBack();
    this.back();
  }

  //next topic
  topicid = 101;
  subtopicid = 1;

  nexttopic() {
    this.currentStage = 1;
    this.topicid = this.topicid + 1;
    this.isButton1Disabled = true;
    this.isButton2Disabled = true;
    this.isButton3Disabled = true;
    this.answershow = false;
    this.quizshow = true;
    this.current = 0;
    this.correct_ans = 0;
    this.wrong_ans = 0;
    this.ans = [];
    this.code_ques = 0;
    this.fillup = 0;
    this.fillupend = false;
    this.fillupshow = true;

    this.gettopic();
    this.getCodeContent();
    this.getFillup();
    this.getQuiz();
    this.getTask();

  }




  result = '';
  //stage

  showAllButtons = 0;
  currentStage = 1;
  status = 0;
  completedStages: boolean[] = [true, true, true, true];

  advanceToNextStage(i: any) {
    this.currentStage++;

    if (i === 1) {
      this.compilerService.codeClean();
      this.isButton1Disabled = false;

      if (this.completedStages[i] == true) {
        this.status_service.getstatus(this.status + 2);
        this.status_service.emitButtonClick();
        this.completedStages[i] = false
      }
    }

    if (i === 2) {
      this.compilerService.codeClean();
      this.isButton2Disabled = false;

      if (this.completedStages[i] == true) {
        this.status_service.getstatus(this.status + 3);
        this.status_service.emitButtonClick();
        this.completedStages[i] = false
      }
    }

    if (i === 3) {
      this.compilerService.codeClean();
      this.isButton3Disabled = false;

      if (this.completedStages[i] == true) {
        this.status_service.getstatus(this.status + 2);
        this.status_service.emitButtonClick();
        this.completedStages[i] = false
      }
    }
  }



  stage(i: any) {
    this.currentStage = i;

    if (this.currentStage == 1) {
      this.next_back = true;
    }

    else {
      this.next_back = false;
    }
  }

  isButton1Disabled = false;
  isButton2Disabled = false;
  isButton3Disabled = false;

  //fillups
  inputValue: string = '';
  fillup = 0;
  iswrong = false;
  fillup_answer!: string;
  isCorrect: boolean = false;
  code_ques = 0;
  crt_wrng_disp = true;
  fillupshow = true;
  fillupend = false;

  checkAnswer(): void {
    for (let i = 0; i < this.javaQuestions.length; i++) {
      if (this.fillup_answer.toLowerCase() === this.javaQuestions[this.code_ques].ans) {
        this.isCorrect = true;
        this.iswrong = false;
        this.crt_wrng_disp = false;
      }
      else {
        this.inputValue = this.fillup_answer;
        this.iswrong = true;
        console.log("wronggg")
        this.crt_wrng_disp = false;
      }
    }
  }

  tryagain() {
    this.fillup_answer = this.inputValue;
    this.crt_wrng_disp = true;
    this.iswrong = false;
    this.isCorrect = false;
  }

  nextques() {
    this.fillup_answer = "";
    this.crt_wrng_disp = true;
    this.fillup++;
    const ques_len = this.javaQuestions.length;

    if (ques_len === this.fillup) {
      this.fillupend = true;
      this.fillupshow = false;
    }

    else {
      this.code_ques++;
    }

    this.isCorrect = false;
  }

  button_name = "Show Answer";
  submit_btn = true;

  showfillupans() {
    if (this.button_name === "Show Answer") {
      this.inputValue = this.fillup_answer;
      this.fillup_answer = this.javaQuestions[this.code_ques].ans;
      this.button_name = "Hide Answer";
      this.submit_btn = false;
    }

    else {
      this.fillup_answer = '';
      this.button_name = "Show Answer";
      this.submit_btn = true;
      this.fillup_answer = this.inputValue;
    }
  }

  prac_check() {
    this.compilerService.copmileButtonClick$.subscribe(() => {
      this.b++;
      this.isNextDisabled = false;
      this.completed = true;
    })
  }

}









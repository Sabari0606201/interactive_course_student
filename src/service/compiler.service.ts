import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CompilerService {

  constructor(private _http: HttpClient, private http: HttpClient) { }
  private value: any = "";
  private Error: any = "";
  private code: any = "";

  compilerUrl = 'http://localhost:3000/compile';


  compiler(program: string, input: string) {
    return this.http.post(this.compilerUrl, { Program: program, Input: input });
  }



  setValue(value: any): void {
    this.value = value;
  }
  setError(error: any): void {
    this.Error = error;
  }

  getValue(): any {
    return this.value;
  }
  getError(): any {
    return this.Error;
  }
  getcode(): any {
    return this.code;

  }
  setcode(preCode: any) {
    this.code = preCode;
    console.log("code", this.code);

  }


  private buttonClickSubject = new Subject<void>();
  private buttonClickSubject2 = new Subject<void>();
  private compileButton = new Subject<void>();
  private codeclean = new Subject<void>();

  buttonClick$ = this.buttonClickSubject.asObservable();
  buttonClickBack$ = this.buttonClickSubject2.asObservable();
  copmileButtonClick$ = this.compileButton.asObservable();
  codeclean$ = this.codeclean.asObservable();


  emitButtonClick() {
    this.buttonClickSubject.next();
  }



  emitButtonClickBack() {
    this.buttonClickSubject2.next();
  }


  emitCompileButton() {
    this.compileButton.next();
  }

  codeClean() {
    this.codeclean.next();
  }

  public prog: string = '';
  public prog2: string = '';
  setProgram(Program: string, Program2: string) {
    this.prog = Program;
    this.prog2 = Program2;
  }

  getProgram() {
    return {
      left: this.prog,
      right: this.prog2

    }
  }
}

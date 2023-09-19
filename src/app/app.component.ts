import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { interval, fromEvent, merge, empty, defer } from 'rxjs';
import { switchMap, scan, takeWhile, startWith, mapTo } from 'rxjs/operators';
import { isFibonacci } from 'src/utils/isFibonacci';

type UserInputState = {
  number: number;
  timesInput: number;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private renderer: Renderer2) {}

  @ViewChild('pauseButton') pauseButton!: ElementRef;
  @ViewChild('resumeButton') resumeButton!: ElementRef;
  @ViewChild('userInputDisplay') userInputDisplay!: ElementRef;
  title = 'ftr-tech-test';

  validNumber = true;
  frequencyInput: number = 0;
  frequency: number = 0;

  setFrequency = (frequency: number) => {
    this.frequency = frequency;
  };

  userInput: number = 0;

  userInputState: UserInputState[] = [];

  // streams
  interval$ = interval(1000).pipe(mapTo(-1));
  pause$ = defer(() =>
    fromEvent(this.pauseButton.nativeElement, 'click').pipe(mapTo(false)),
  );
  resume$ = defer(() =>
    fromEvent(this.resumeButton.nativeElement, 'click').pipe(mapTo(true)),
  );

  startTimer = () => {
    return merge(this.pause$, this.resume$)
      .pipe(
        startWith(this.interval$),
        switchMap((val) => {
          if (val === true) {
            this.addElementChunk('timer resumed');
          }
          if (val === false) {
            this.addElementChunk('timer halted');
          }
          return val ? this.interval$ : empty();
        }),
        scan((acc, curr) => (curr ? curr + acc : acc), this.frequency),
        takeWhile((v) => v >= 0),
      )
      .subscribe((value) => {
        if (value === 0) {
          this.addElementChunk('userInput');
          this.startTimer();
        }
      });
  };

  addElementChunk = (text: string) => {
    const container = this.userInputDisplay.nativeElement;
    const newContainer = this.renderer.createElement('div');
    let newText: string = '';
    switch (text) {
      case 'userInput':
        newText = this.renderer.createText(
          `${this.userInputState.map(
            (input) => `${input.number}:${input.timesInput}`,
          )}`,
        );

        break;
      default:
        newText = this.renderer.createText(text);
    }

    this.renderer.appendChild(newContainer, newText);
    this.renderer.appendChild(container, newContainer);
  };

  onSubmitFrequency() {
    if (this.frequencyInput < 0) {
      this.validNumber = false;
      return;
    }
    this.setFrequency(this.frequencyInput);
    this.startTimer();
  }

  onSubmitNumber() {
    if (this.userInput < 0) {
      this.validNumber = false;
      return;
    }
    const inputIndex = this.userInputState
      .map((input) => input.number)
      .indexOf(this.userInput);

    if (inputIndex === -1) {
      this.userInputState.push({
        number: +this.userInput,
        timesInput: 1,
      });
    } else {
      this.userInputState[inputIndex].timesInput++;
      this.userInputState.sort((a, b) => b.timesInput - a.timesInput);
    }
    if (isFibonacci(this.userInput)) {
      this.addElementChunk('FIB');
    }
    this.userInput = 0;
  }
}

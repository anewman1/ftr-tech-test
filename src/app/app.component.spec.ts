import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [BrowserModule, FormsModule],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'ftr-tech-test'`, () => {
    expect(component.title).toEqual('ftr-tech-test');
  });

  it(`should render with the frequency input visible and the user input not visible`, async () => {
    const hostElement = fixture.nativeElement;

    // Frequency input form
    const frequencyForm = hostElement.querySelector('#frequencyForm-testId');
    const frequencyInput = hostElement.querySelector('input[name="setTimer"]');

    // User input form
    const inputForm = hostElement.querySelector('#inputForm-testId');
    const userInput = inputForm.querySelector('input[name="setUserInput"]');

    frequencyInput.value = 5;
    frequencyInput.dispatchEvent(new Event('input'));
    frequencyForm.dispatchEvent(new Event('ngSubmit'));

    userInput.value = 5;
    userInput.dispatchEvent(new Event('input'));
    inputForm.dispatchEvent(new Event('ngSubmit'));

    fixture.detectChanges();

    const userInputDisplay = hostElement.querySelectorAll('#inputDisplay-test');
    console.log('userInputDisplay?', userInputDisplay);

    setTimeout(() => {}, 5000);
    console.log('userInputDisplay?', userInputDisplay);
    expect(userInputDisplay.length).toBe(1);
  });
});

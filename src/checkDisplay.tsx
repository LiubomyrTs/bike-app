import { createElement } from "./tools/jsxFactory";
import { Display } from "./display";
import { DISPLAY_MODE } from "./data/enums/displayMode";
import { MODAL_MODE } from "./data/enums/modalMode";
import { ActiveModal } from "./activeModal";
import { fromEvent, Observable, BehaviorSubject } from "rxjs";
import { map, tap,  } from "rxjs/operators";
import { randomLetter } from './tools/randomLetter';

export class CheckDisplay extends Display {
  toggleModal() {}

  inputLetters$: Observable<string>;
  randomLetterSubj = new BehaviorSubject(randomLetter());

  letter = '';
  countSuccess = 0;
  eventCount = 0;

  constructor() {
    super();

    this.inputLetters$ = fromEvent(document, 'keydown')
      .pipe(
        map((v: KeyboardEvent) => v.key),
        tap(v => {
          this.eventCount++;
          if (v === this.letter) {
            this.countSuccess++;
          }
          this.randomLetterSubj.next(randomLetter());
          this.checkCount();
        }),
      );
    

    this.randomLetterSubj.
      pipe(
        tap((v) => this.updateLetter(v))
      )
      .subscribe();

    this.inputLetters$.subscribe();
  }

  checkCount() {
    if (this.countSuccess === this.eventCount) {
      if (this.countSuccess === 3) {
        this.props.changeDisplayMode(DISPLAY_MODE.BIKES);
      }
    } else {
      this.countSuccess = 0;
      this.eventCount = 0;
    }
    this.updateContent();
  }

  updateLetter(v) {
    this.letter = v;
    this.updateContent();
  }

  updateContent() {
    let content = (
      <ActiveModal
        mode={MODAL_MODE.CHECK}
        show={true}
        toggle={this.toggleModal.bind(this)}
        header='Enter displayed letter three times to compete check'
        letter={this.letter}
        count={this.countSuccess}
      />
    );
    this.containerElement.innerHTML = '';
    this.containerElement.appendChild(content);
  }
}

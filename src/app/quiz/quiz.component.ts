import { Component, OnInit } from '@angular/core';
import { SurvivalQuizService } from './survivalquiz';
import { XQuizService } from './xquiz';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})

export class QuizComponent implements OnInit {
  test: boolean;
  frage: Frage;
  avatarLinkString: string;
  richtigeAntworten: number;
  statusFrage: string;
  test1: HTMLDivElement;

  /**
   * 1 = Survival Quiz
   * 2 = xQuiz 10/30/50 Fragen
   */

  constructor(private survivalQuiz: SurvivalQuizService, private xquiz: XQuizService) {
  }

  async ngOnInit() {
    if (sessionStorage.length > 0) {
      this.test = true;
      this.richtigeAntworten = 0;
      this.avatarLinkString = './assets/' + sessionStorage.getItem('link'); // fuer den Avatar
      switch (sessionStorage.getItem('gamemode')) {
        case '1': await this.survivalQuiz.startQuiz();
                  this.frage = this.survivalQuiz.getQuestion();
                  break;
        case '2': await this.xquiz.startQuiz(Number(sessionStorage.getItem('anzahlFragen')));
                  this.frage = this.xquiz.getQuestion();
                  break;
      }
    }
  }

  nextQuestion(buttonNumber: number): any {
    this.test1 = (<HTMLDivElement>document.getElementById('rahmenderAntwort'));
    if (buttonNumber === Number(this.frage.SolutionNumber)) {
      this.richtigeAntworten++;
      /*============================================
          Frage richtig
       =============================================
       */
      this.test1.style.backgroundColor = '#FFFFFF';
      this.statusFrage = 'richtig';
      console.log(this.statusFrage);
    } else {
      /*
      ==============================================
          Frage falsch
      ==============================================
       */
      this.statusFrage = 'falsch';
      console.log(this.statusFrage);
    }
    switch (sessionStorage.getItem('gamemode')) {
      case '1': if (buttonNumber !== Number(this.frage.SolutionNumber)) {
                  this.survivalQuiz.reduceLives();
                  if (this.survivalQuiz.isFinished()) {
                    sessionStorage.removeItem('gamemode');
                    /*<===============================================>*/
                    /*Hier kann das Statistik Fenster aufgerufen werden*/
                    /*<===============================================>*/
                    window.location.href = 'menu';
                  }
                }
                this.frage = this.survivalQuiz.getQuestion();
                break;
      case '2': if (this.xquiz.isFinished()) {
                  sessionStorage.removeItem('gamemode');
                  sessionStorage.removeItem('anzahlFragen');
                  /*<===============================================>*/
                  /*Hier kann das Statistik Fenster aufgerufen werden*/
                  /*<===============================================>*/
                  window.location.href = 'menu';
                }
                this.frage = this.xquiz.getQuestion();
                break;
    }
  }

  link(linkToGo: string) {
    window.location.href = linkToGo;
  }
}
interface Frage {
  Verbalization: string;
  Option0: string;
  Option1: string;
  Option2: string;
  Option3: string;
  Solution: string;
  SolutionNumber: number;
}


import {Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})

export class OptionsComponent implements OnInit {
  status: number;
  avatarLinkString: string;
  text: string;

  constructor() {
  }

  ngOnInit() {
    this.avatarLinkString = './assets/' + sessionStorage.getItem('link');
    sessionStorage.setItem('actual_link', sessionStorage.getItem('link'));
  }

  logout() {
    sessionStorage.clear();
  }

  link(linkToGo: string) {
    window.location.href = linkToGo;
  }
}

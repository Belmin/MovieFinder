import { Component, Input, OnInit } from '@angular/core';
import { HeaderData } from './header-data';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() data: HeaderData | undefined;

  constructor() {}

  ngOnInit(): void {}
}

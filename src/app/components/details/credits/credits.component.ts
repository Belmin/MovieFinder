import { Component, Input, OnInit } from '@angular/core';
import { CreditsData } from './credits-data';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss'],
})
export class CreditsComponent implements OnInit {
  @Input() orientation: 'vertical' | 'horizontal' = 'vertical';
  @Input() data: CreditsData[] | undefined;

  constructor() {}

  ngOnInit(): void {}
}

import { Component, Input, OnInit } from '@angular/core';
import { Genre } from '@core/models/genre';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
})
export class GenresComponent implements OnInit {
  @Input() genres: Genre[] | undefined;
  constructor() {}

  ngOnInit(): void {}
}

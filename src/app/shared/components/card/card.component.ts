import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import Endpoints from '@core/constants/endpoints';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() posterPath: string | undefined;
  @Input() rating: number | undefined;

  imgUrl: SafeUrl | undefined;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (this.posterPath) {
      this.imgUrl = this.sanitizer.bypassSecurityTrustUrl(
        Endpoints.GET_POSTER_IMAGE.replace('{posterPath}', this.posterPath!)
      );
    }
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import Endpoints from '@core/constants/endpoints';
import { BaseDetails } from '@core/models/base-details';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  imgUrl: SafeUrl | undefined;

  @Input() details: BaseDetails | undefined;
  @Output() onClickEvent = new EventEmitter<BaseDetails>();

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (this.details?.poster_path) {
      this.imgUrl = this.sanitizer.bypassSecurityTrustUrl(
        Endpoints.GET_IMAGE.replace('{path}', this.details.poster_path!)
      );
    }
  }

  onClick() {
    this.onClickEvent.emit(this.details);
  }
}

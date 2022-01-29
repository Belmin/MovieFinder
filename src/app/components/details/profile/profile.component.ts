import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import Endpoints from '@core/constants/endpoints';
import { ProfileData } from './profile-data';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Input() data: ProfileData | undefined;
  imgUrl: SafeUrl | undefined;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (this.data?.profile_path) {
      this.imgUrl = this.sanitizer.bypassSecurityTrustUrl(
        Endpoints.GET_IMAGE.replace('{path}', this.data.profile_path!)
      );
    }
  }
}

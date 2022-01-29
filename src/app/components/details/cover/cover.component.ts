import { Component, Input, OnInit } from '@angular/core';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';
import Endpoints from '@core/constants/endpoints';
import { Video } from '@core/models/video';
import { environment } from '@env/environment';
import { CoverData } from './cover-data';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss'],
})
export class CoverComponent implements OnInit {
  @Input() data: CoverData | undefined;

  trailerUrl: SafeResourceUrl | undefined;
  posterUrl: SafeUrl | undefined;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    const trailer = this.findTrailerVideo();
    if (trailer) {
      this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.createEmbededYouTubeUrl(trailer.key)
      );
    } else if (this.data?.poster_path) {
      this.posterUrl = this.sanitizer.bypassSecurityTrustUrl(
        Endpoints.GET_IMAGE.replace('{path}', this.data?.poster_path!)
      );
    }
  }

  findTrailerVideo(): Video | undefined {
    return this.data?.videos?.results.find(
      (v) => v.type === 'Trailer' && v.site === 'YouTube'
    );
  }

  createEmbededYouTubeUrl(youtubeId: string): string {
    const url = `https://www.youtube.com/embed/${youtubeId}`;
    return environment.autoPlayTrailer ? url + '?autoplay=1' : url;
  }
}

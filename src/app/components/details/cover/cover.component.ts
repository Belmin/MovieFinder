import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Video } from '@core/models/video';
import { environment } from '@env/environment';
import { CoverData } from './cover-data';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss'],
})
export class CoverComponent implements OnInit {
  showTrailer = false;
  @Input() data: CoverData | undefined;

  trailerUrl: SafeResourceUrl | undefined;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    const trailer = this.findTrailerVideo();
    if (trailer) {
      const youTubeLink = this.createEmbededYouTubeUrl(trailer.key);
      console.log('youTubeLink', youTubeLink);
      this.trailerUrl =
        this.sanitizer.bypassSecurityTrustResourceUrl(youTubeLink);
      this.showTrailer = true;
    }
  }

  onVideoLoadingError(): void {
    console.log('Error while loading video');
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

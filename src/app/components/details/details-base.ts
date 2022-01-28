import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchBoxService } from '@components/search-box/search-box.service';
import Endpoints from '@core/constants/endpoints';
import { BaseDetails } from '@core/models/base-details';
import { TmdbApiService } from '@core/services/tmdb-api.service';
import { BaseComponent } from '@shared/components/base/base.component';

export abstract class DetailsBase extends BaseComponent {
  id: string | null;

  protected constructor(
    protected tmdbApiService: TmdbApiService,
    protected searchBoxService: SearchBoxService,
    protected router: Router,
    protected route: ActivatedRoute,
    protected sanitizer: DomSanitizer
  ) {
    super();
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.back();
    }

    this.id = id;
    console.log('DetailsBase -> passed Id: ', id);
    this.searchBoxService.hideSearchBox();
    this.fetchApi();
  }

  abstract back(): void;

  abstract fetchApi(): void;

  getSafeUrl(imagePath: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(
      Endpoints.GET_IMAGE.replace('{path}', imagePath)
    );
  }

  getBaseDetails(): BaseDetails | undefined {
    return this.router.getCurrentNavigation()?.extras.state as BaseDetails;
  }
}

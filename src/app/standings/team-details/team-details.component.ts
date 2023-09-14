import {Component} from '@angular/core';
import {Fixture} from "../../core/model/fixture.model";
import {ActivatedRoute, Router} from "@angular/router";
import {map, Observable} from "rxjs";

const MATCH_COUNT: number = 10;

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss']
})
export class TeamDetailsComponent {
  fixtures$: Observable<Fixture[]> = this.route.data.pipe(
    map(data => (data["fixtures"] as Fixture[])
      .sort((f1, f2) => f2.fixture.timestamp - f1.fixture.timestamp)
      .slice(0, MATCH_COUNT)
    )
  )

  private readonly originCountry: string | null = null

  constructor(private route: ActivatedRoute, private router: Router) {
    let routerState = router.getCurrentNavigation()?.extras.state
    if (routerState && routerState["country"]) {
      this.originCountry = routerState["country"];
    }
  }

  onBackClicked() {
    this.router.navigate(["/"], {
      state: {
        country: this.originCountry
      }
    })
  }
}

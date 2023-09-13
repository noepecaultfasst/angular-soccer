import {Component} from '@angular/core';
import {Fixture} from "../../core/model/fixture.model";
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {catchError, filter, map, Observable, of, tap} from "rxjs";

const MATCH_COUNT: number = 10;

@Component({
    selector: 'app-team-details',
    templateUrl: './team-details.component.html',
    styleUrls: ['./team-details.component.scss']
})
export class TeamDetailsComponent {
    fixtures$: Observable<Fixture[]> = this.route.data.pipe(
        tap(data => console.log(data)),
        map(data => (data["fixtures"] as Fixture[])
            .sort((f1, f2) => f2.fixture.timestamp - f1.fixture.timestamp)
            .slice(0, MATCH_COUNT)
        )
    )

    private readonly originCountry: string | null

    constructor(private route: ActivatedRoute, private router: Router) {
        this.originCountry = (router.getCurrentNavigation()?.extras.state ?? {})["country"] ?? null;
    }

    onBackClicked() {
        this.router.navigate(["/"], {
            state: {
                country: this.originCountry
            }
        })
    }
}

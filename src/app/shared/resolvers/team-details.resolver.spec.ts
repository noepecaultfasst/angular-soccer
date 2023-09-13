import {TestBed} from '@angular/core/testing';
import {ResolveFn} from '@angular/router';

import {teamFixturesResolver} from './team-fixtures.resolver';
import {Fixture} from "../../core/model/fixture.model";

describe('teamDetailsResolver', () => {
  const executeResolver: ResolveFn<Fixture[]> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => teamFixturesResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});

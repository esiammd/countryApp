import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs';

import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-country-page',
  standalone: false,

  templateUrl: './country-page.component.html'
})
export class CountryPageComponent implements OnInit {
  public country?: Country;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.countriesService.searchCoutryByAlphaCode(id))
      )
      .subscribe(country => {
        if (!country) return this.router.navigateByUrl('');
        return this.country = country;
      });
  }
}

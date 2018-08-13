import { Component, OnInit } from '@angular/core';
import { filter, mergeMap, switchMap, toArray, debounceTime, map } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { Waste } from '@app/models/waste';
import { EnvAPIService } from '@app/service/env-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  keyword$: Observable<string>;
  form: FormGroup;
  wastes$: Observable<Waste[]>;

  hasKeyword = (keyword: string) => {
    return (waste: Waste) => waste.OrgName.indexOf(keyword) > -1;
  }

  ngOnInit() {
    this.form = this.fb.group({
      keyword: ['']
    });
    this.keyword$ = this.form.get('keyword').valueChanges;

    // way1: `mergeMap`
    // this.wastes$ = this.keyword$.pipe(
    //   debounceTime(200),
    //   mergeMap(keyword => this.envAPI.wasteAPI$.pipe(
    //     switchMap(p => p),
    //     filter(this.hasKeyword(keyword)),
    //     toArray()
    //   ))
    // );

    // way2: combineLatest
    this.wastes$ = combineLatest(
      this.keyword$.pipe(
        debounceTime(200)
      ), this.envAPI.wasteAPI$
    ).pipe(
      map(([keyword, wastes]) => wastes.filter(this.hasKeyword(keyword)))
    );
  }
  constructor(private envAPI: EnvAPIService, private fb: FormBuilder) {}
}

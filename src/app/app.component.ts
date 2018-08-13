import { Component, OnInit } from '@angular/core';
import { filter, mergeMap, switchMap, toArray, debounceTime } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Waste } from '@app/models/waste';
import { EnvAPIService } from '@app/service/env-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  keyword$: Observable<any>;
  form: FormGroup;
  wastes$: Observable<Waste[]>;

  ngOnInit() {
    this.form = this.fb.group({
      keyword: ['']
    });
    this.keyword$ = this.form.get('keyword').valueChanges;
    this.wastes$ = this.keyword$.pipe(
      debounceTime(200),
      mergeMap(keyword => this.envAPI.wasteAPI$.pipe(
        switchMap(p => p),
        filter(p => p.OrgName.indexOf(keyword) > -1),
        toArray()
      ))
    );
  }
  constructor(private envAPI: EnvAPIService, private fb: FormBuilder) {}
}

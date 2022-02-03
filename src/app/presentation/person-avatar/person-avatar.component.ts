import { Component, HostBinding, Inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Person } from '../../models/person';
import { HIGHLIGHTED_PERSONS, SELECTED_PERSONS } from '../../logic/selected-persons';
import { Observable, Subject, takeUntil, tap } from 'rxjs';

const DEFAULT_BACKGROUND = '#cacaca';

@Component({
  selector: 'om-person-avatar',
  templateUrl: './person-avatar.component.html',
  styles: [
  ]
})
export class PersonAvatarComponent implements OnChanges, OnDestroy {
  @Input() person: Person | undefined;
  @Input() noColor: boolean | undefined;

  @HostBinding('class') hostClass = 'rounded-full w-5 h-5 flex items-center justify-center';
  @HostBinding('style.background-color') backgroundColor: string | undefined;

  abbr: string | undefined;

  private highlightedPersonIds: string[] = [];

  private readonly destroySubject = new Subject<void>();

  constructor(
    @Inject(HIGHLIGHTED_PERSONS) highlightedPersons: Observable<Person['id'][]>,
  ) {
    highlightedPersons.pipe(
      tap(val => {
        this.highlightedPersonIds = val;
        this.refreshHostAppearance();
      }),
      takeUntil(this.destroySubject),
    ).subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['person'] || changes['noColor']) {
      this.refreshHostAppearance();
      this.refreshAbbr();
    }
  }

  private refreshHostAppearance(): void {
    let noColor: boolean;
    if (typeof this.noColor === 'undefined') {
      noColor = !this.highlightedPersonIds.includes(this.person?.id ?? '');
    } else {
      noColor = this.noColor;
    }
    this.backgroundColor = noColor ? DEFAULT_BACKGROUND : this.person?.color;
  }

  private refreshAbbr(): void {
    this.abbr = this.person?.name.split(' ').reduce((res, curr) => res + curr[0].toUpperCase(), '').substring(0, 2);
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}

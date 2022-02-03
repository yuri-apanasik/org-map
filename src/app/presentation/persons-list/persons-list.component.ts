import { Component, HostBinding, Inject, OnDestroy, OnInit } from '@angular/core';
import { PERSONS } from '../../data/persons';
import { Person } from '../../models/person';
import { HIGHLIGHTED_PERSONS, SELECTED_PERSONS, SelectedPersons } from '../../logic/selected-persons';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject, takeUntil, tap } from 'rxjs';

const SELECTED_CONTROL_NAME = 'selected';
const HIGHLIGHTED_CONTROL_NAME = 'highlighted';

@Component({
  selector: 'om-persons-list',
  templateUrl: './persons-list.component.html',
  styles: [
  ]
})
export class PersonsListComponent implements OnDestroy {
  @HostBinding('class') hostClass = 'flex flex-col w-full';

  personsFormGroup: FormGroup | undefined;

  private readonly destroySubject = new Subject<void>();

  constructor(
    @Inject(PERSONS) readonly persons: Person[],
    @Inject(SELECTED_PERSONS) private readonly selectedPersons: SelectedPersons,
    @Inject(HIGHLIGHTED_PERSONS) private readonly highlightedPersons: SelectedPersons,
  ) {
    this.initPersonsFormGroup();
  }

  private initPersonsFormGroup(): void {
    this.personsFormGroup = new FormGroup(this.persons.reduce((res, person) => ({
      ...res,
      [person.id]: this.initPersonFormGroup(person),
    }), {}));
  }

  private initPersonFormGroup(person: Person): FormGroup {
    const selectedFormControl = new FormControl(this.selectedPersons.isPersonSelected(person.id));
    selectedFormControl.valueChanges.pipe(
      tap(val => val ? this.selectedPersons.addPerson(person.id) : this.selectedPersons.removePerson(person.id)),
      takeUntil(this.destroySubject),
    ).subscribe();

    const highlightedFormControl = new FormControl(this.highlightedPersons.isPersonSelected(person.id));
    highlightedFormControl.valueChanges.pipe(
      tap(val => val ? this.highlightedPersons.addPerson(person.id) : this.highlightedPersons.removePerson(person.id)),
      takeUntil(this.destroySubject),
    ).subscribe();

    return new FormGroup({
      [SELECTED_CONTROL_NAME]: selectedFormControl,
      [HIGHLIGHTED_CONTROL_NAME]: highlightedFormControl,
    });
  }

  isPersonHighlighted(personId: Person['id']): boolean {
    return !!this.personsFormGroup?.get(personId)?.get(HIGHLIGHTED_CONTROL_NAME)?.value;
  }

  togglePersonHighlighted(personId: Person['id']): void {
    const highlightedControl = this.personsFormGroup?.get(personId)?.get(HIGHLIGHTED_CONTROL_NAME);
    highlightedControl?.setValue(!highlightedControl?.value);
  }

  selectAll(): void { this.persons.forEach(p => this.personsFormGroup?.get(p.id)?.get(SELECTED_CONTROL_NAME)?.setValue(true)); }
  selectNone(): void { this.persons.forEach(p => this.personsFormGroup?.get(p.id)?.get(SELECTED_CONTROL_NAME)?.setValue(false)); }
  highlightAll(): void { this.persons.forEach(p => this.personsFormGroup?.get(p.id)?.get(HIGHLIGHTED_CONTROL_NAME)?.setValue(true)); }
  highlightNone(): void { this.persons.forEach(p => this.personsFormGroup?.get(p.id)?.get(HIGHLIGHTED_CONTROL_NAME)?.setValue(false)); }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}

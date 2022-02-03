import { InjectionToken } from '@angular/core';
import { Person } from '../models/person';
import { BehaviorSubject } from 'rxjs';

export class SelectedPersons extends BehaviorSubject<Person['id'][]> {
  constructor(val?: Person['id'][]) {
    super(val ?? []);
  }

  setSelection(val: Person['id'][]): void {
    this.next(val);
  }

  clearSelection(): void {
    this.next([]);
  }

  addPerson(personId: Person['id']): void {
    this.next([...new Set([...this.value, personId])]);
  }

  removePerson(personId: Person['id']): void {
    this.next([...new Set(this.value.filter(t => t !== personId))]);
  }

  isPersonSelected(personId: Person['id']): boolean {
    return this.value.includes(personId);
  }
}

export const SELECTED_PERSONS = new InjectionToken<SelectedPersons>('Selected persons');
export const HIGHLIGHTED_PERSONS = new InjectionToken<SelectedPersons>('Highlighted persons');
export const RESPONSIBILITIES_VISIBILITY = new InjectionToken<BehaviorSubject<boolean>>('Responsibilities visibility');
export const ASSIGNMENTS_VISIBILITY = new InjectionToken<BehaviorSubject<boolean>>('Assignments visibility');

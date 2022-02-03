import { InjectionToken } from '@angular/core';
import { Person } from '../models/person';

export const PERSONS = new InjectionToken<Person[]>('Persons');

export const CEO_PERSON: Person = { id: 'YM', name: 'Yuri Myshakov', color: '#4c9988' };

export const STATIC_PERSONS: Person[] = [
  { id: 'AB', name: 'Alexander Butyrev', color: '#c6b89e' },
  { id: 'AV', name: 'Alexander Vasilev', color: '#aaba9e' },
  { id: 'AG', name: 'Alexander Golubev', color: '#fcb97d' },
  { id: 'AK', name: 'Alexandra Khohlova', color: '#cb1a84' },
  { id: 'AT', name: 'Alexander Tihohod', color: '#725e54' },
  { id: 'AM', name: 'Alexei Murgashev', color: '#dc4f4b' },
  { id: 'AR', name: 'Alexei Rumyancev', color: '#8edce6' },
  { id: 'AN', name: 'Andrei Nazarov', color: '#4b52dc' },
  { id: 'AKT', name: 'Anna Khristanova', color: '#90323d' },
  { id: 'AVN', name: 'Anton Vanin', color: '#19381f' },
  { id: 'AE', name: 'Arkadi Ekimov', color: '#a44200' },
  { id: 'VA', name: 'Vladimir Antipov', color: '#446891' },
  { id: 'VF', name: 'Vladimir Filimonov', color: '#91cb3e' },
  { id: 'DB', name: 'Dmitri Bainak', color: '#7b9e87' },
  { id: 'DP', name: 'Dmitri Pyatovskii', color: '#6c4b5e' },
  { id: 'DH', name: 'Dmitri Harvonen', color: '#5e747f' },
  { id: 'EV', name: 'Egor Vdovenko', color: '#2c2b3c' },
  { id: 'EK', name: 'Ekaterina Komleva', color: '#5e0b15' },
  { id: 'IK', name: 'Igor Kalinin', color: '#af90a9' },
  { id: 'IN', name: 'Ilya Nikitaev', color: '#7c9144' },
  { id: 'IF', name: 'Ilya Fedoseev', color: '#d58936' },
  { id: 'KS', name: 'Konstantin Sinchilo', color: '#b9a44c' },
  { id: 'MM', name: 'Maksim Mishin', color: '#9f5b31' },
  { id: 'MS', name: 'Maksim Spirichev', color: '#566e3d' },
  { id: 'MA', name: 'Maria Andreeva', color: '#0c4767' },
  { id: 'ME', name: 'Maria Eremushkina', color: '#d33d5b' },
  { id: 'MO', name: 'Mikhail Oshkalo', color: '#fe9920' },
  { id: 'ND', name: 'Nikita Dolmatov', color: '#fa7921' },
  { id: 'NS', name: 'Nikita Sashnikov', color: '#847577' },
  { id: 'OS', name: 'Oleg Schukin', color: '#934683' },
  { id: 'PN', name: 'Pavel Novikov', color: '#65334d' },
  { id: 'PC', name: 'Pavel Chechnev', color: '#351e29' },
  { id: 'RK', name: 'Ruslan Klimov', color: '#2c6075' },
  { id: 'SS', name: 'Sergei Stepanov', color: '#49a6b2' },
  { id: 'SK', name: 'Stanislav Kilmuhametov', color: '#17be1b' },
  { id: 'TK', name: 'Tatiana Kapustina', color: '#7a49b2' },
  { id: 'TM', name: 'Timofei Mahnev', color: '#565857' },
  { id: 'YS', name: 'Yuri Stepanov', color: '#564d80' },
  { id: 'YA', name: 'Yuri Apanasik', color: '#17a085' },
];

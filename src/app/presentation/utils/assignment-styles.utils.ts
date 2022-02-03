import { Person } from '../../models/person';

const BORDER_STRIPE_WIDTH = 20;

export function getPersonsBorderImage(persons: Person[]): string | undefined {
  return persons.length
    ? `repeating-linear-gradient(-45deg${persons.reduce((res, person, index) => `${res}, ${person.color} ${BORDER_STRIPE_WIDTH * index}px, ${person.color} ${BORDER_STRIPE_WIDTH * (index + 1)}px`, '')}) 1`
    : undefined;
}

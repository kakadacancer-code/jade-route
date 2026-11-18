import { places } from '../places/places.js';

export function destinationValue(plan) {
  return plan?.placeId ? `place:${plan.placeId}` : plan?.tourId || '';
}

export function destinationIds(value) {
  return value.startsWith('place:')
    ? { tourId: '', placeId: value.slice('place:'.length) }
    : { tourId: value, placeId: '' };
}

export function resolveDestination(plan, tours) {
  return plan?.placeId ? { place: places.find(place => place.id === plan.placeId) }
    : { tour: tours.find(tour => tour.id === plan?.tourId) };
}

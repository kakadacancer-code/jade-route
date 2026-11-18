import test from 'node:test';
import assert from 'node:assert/strict';
import { destinationIds, destinationValue, resolveDestination } from './plan-destination.js';
import { tours } from '../journeys/tours.js';
import { places } from '../places/places.js';

test('all places round-trip through planner selections without colliding with journey IDs', () => {
  for (const place of places) {
    const selection = destinationValue({ placeId: place.id });
    const plan = destinationIds(selection);
    assert.equal(plan.tourId, '');
    assert.equal(resolveDestination(plan, tours).place, place);
  }
  assert.deepEqual(destinationIds('huangshan'), { tourId: 'huangshan', placeId: '' });
  assert.equal(resolveDestination(destinationIds('place:huangshan'), tours).place.id, 'huangshan');
});

test('existing journey plans still resolve without a place ID', () => {
  const plan = { tourId: 'river' };
  assert.equal(destinationValue(plan), 'river');
  assert.equal(resolveDestination(plan, tours).tour, tours[0]);
  assert.equal(destinationValue(null), '');
});

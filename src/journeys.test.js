import test from 'node:test';
import assert from 'node:assert/strict';
import { findJourneys, readSaved } from './journeys.js';
import { tours, popularPlaces } from './tours.js';

test('search matches place, landscape, Chinese name and multiple terms', () => {
  assert.deepEqual(findJourneys(tours, { query: '  GUILIN   river ' }).map(tour => tour.id), ['river']);
  assert.deepEqual(findJourneys(tours, { query: '西湖' }).map(tour => tour.id), ['tea']);
  assert.deepEqual(findJourneys(tours, { query: 'sandstone mist' }).map(tour => tour.id), ['peaks']);
  assert.equal(findJourneys(tours, { query: 'unknown destination' }).length, 0);
});

test('search, category and saved filters intersect without changing the source', () => {
  const original = JSON.stringify(tours);
  assert.deepEqual(findJourneys(tours, { category: 'Culture', query: 'tea', savedOnly: true, saved: ['tea'] }), [tours[2]]);
  assert.equal(findJourneys(tours, { category: 'Rivers', savedOnly: true, saved: ['tea'] }).length, 0);
  assert.equal(findJourneys(tours, { savedOnly: true }).length, 0);
  assert.equal(findJourneys(tours, { query: '  ' }).length, tours.length);
  assert.equal(JSON.stringify(tours), original);
});

test('saved journeys restore only known, unique IDs', () => {
  assert.deepEqual(readSaved({ getItem: () => '["tea","river","tea","removed",null,4]' }, ['river', 'peaks', 'tea']), ['tea', 'river']);
});

test('invalid or unavailable browser storage safely returns an empty selection', () => {
  for (const value of ['broken', '{}', 'null', '42', null]) {
    assert.deepEqual(readSaved({ getItem: () => value }, ['river']), []);
  }
  assert.deepEqual(readSaved({ getItem() { throw new Error('Storage blocked'); } }, ['river']), []);
});


test('every popular destination opens a valid, complete itinerary', () => {
  assert.ok(tours.length >= 7);
  assert.equal(new Set(tours.map(tour => tour.id)).size, tours.length);
  for (const place of popularPlaces) {
    const tour = tours.find(tour => tour.id === place.tourId);
    assert.ok(tour, `${place.name} has an itinerary`);
    assert.ok(tour.days.length >= 2);
    assert.ok(place.chinese && place.attractionChinese && place.descriptionChinese);
    assert.ok(findJourneys(tours, { query: place.chinese }).some(result => result.id === tour.id));
  }
  assert.deepEqual(findJourneys(tours, { category: 'Cities' }).map(tour => tour.id), ['shanghai']);
});

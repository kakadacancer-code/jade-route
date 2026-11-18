import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { placeVisits } from './place-visits.js';
import { findPlaces, places, placeRegions, placeTypes } from './places.js';

test('the directory has 68 complete, unique destinations across the requested regions', () => {
  assert.equal(places.length, 68);
  assert.equal(new Set(places.map(place => place.id)).size, 68);
  assert.deepEqual(placeRegions.map(region => findPlaces({ region }).length), [10, 3, 15, 6, 7, 17, 10]);
  for (const place of places) {
    assert.ok(placeTypes.includes(place.type));
    assert.ok(place.name && place.chineseName && place.province && place.chineseProvince);
    assert.ok(place.description && place.chineseDescription);
    assert.ok(place.bestMonths.length && place.bestMonths.every(month => month >= 1 && month <= 12));
  }
});

test('bilingual search combines with region, type, and UNESCO filters', () => {
  assert.deepEqual(findPlaces({ query: '浙江 WEST   LAKE', region: 'east', type: 'Nature', unescoOnly: true }).map(place => place.id), ['west-lake']);
  assert.deepEqual(findPlaces({ query: "Xi'an City Wall" }).map(place => place.id), ['xian-wall']);
  assert.equal(findPlaces({ query: '石林', unescoOnly: true })[0].id, 'stone-forest');
  assert.equal(findPlaces({ query: '张掖丹霞', unescoOnly: true }).length, 0);
  assert.equal(findPlaces({ query: '兵马俑', region: 'east' }).length, 0);
});


test('each place has a bundled WebP photo and a source credit', () => {
  const credits = JSON.parse(readFileSync(new URL('./place-photos.json', import.meta.url), 'utf8'));
  assert.equal(Object.keys(credits).length, places.length);
  for (const { id } of places) {
    const image = readFileSync(new URL(`../../../public/places/${id}.webp`, import.meta.url));
    assert.equal(image.toString('ascii', 8, 12), 'WEBP');
    assert.match(credits[id].source, /^https:\/\/commons\.wikimedia\.org\//);
    assert.ok(credits[id].license);
  }
});


test('all destinations have bilingual visit guidance', () => {
  assert.equal(Object.keys(placeVisits).length, places.length);
  for (const { id } of places) {
    assert.equal(placeVisits[id]?.length, 4, id);
    assert.ok(placeVisits[id].every(text => typeof text === 'string' && text.trim()), id);
  }
});

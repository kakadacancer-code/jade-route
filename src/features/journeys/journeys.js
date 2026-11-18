import { chineseTours } from './tour-translations.js';

export function findJourneys(tours, { category = 'All', query = '', savedOnly = false, saved = [], month = '', travelers = '', short = false, sort = '', localizedTours = [] } = {}) {
  const words = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const matches = tours.filter(tour => {
    const translated = chineseTours[tour.id]?.slice(0, 3) ?? [];
    const localized = localizedTours.find(item => item.id === tour.id);
    const { destination } = tour;
    const text = [
      tour.name, tour.region, tour.regionChinese, tour.type, tour.chinese, tour.description,
      destination?.name, destination?.chinese, destination?.attraction, destination?.attractionChinese,
      ...translated,
      localized?.name, localized?.description,
    ]
      .join(' ').toLocaleLowerCase();
    return (category === 'All' || tour.type === category)
      && (!savedOnly || saved.includes(tour.id))
      && (!month || tour.months?.includes(Number(month)))
      && (!travelers || Number(travelers) <= tour.groupSize)
      && (!short || tour.duration < 3)
      && words.every(word => text.includes(word));
  });

  if (sort === 'popular') return matches.sort((a, b) => b.reviews - a.reviews || b.rating - a.rating);
  if (sort === 'duration') return matches.sort((a, b) => a.duration - b.duration);
  if (sort === 'price') return matches.sort((a, b) => a.price - b.price);
  return matches;
}

export function readSaved(storage, validIds) {
  try {
    const value = JSON.parse(storage.getItem('jade-routes:saved') || '[]');
    return Array.isArray(value) ? [...new Set(value.filter(id => validIds.includes(id)))] : [];
  } catch {
    return [];
  }
}

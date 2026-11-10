export function findJourneys(tours, { category = 'All', query = '', savedOnly = false, saved = [] } = {}) {
  const words = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  return tours.filter(tour => {
    const text = [tour.name, tour.region, tour.regionChinese, tour.type, tour.chinese, tour.description].join(' ').toLocaleLowerCase();
    return (category === 'All' || tour.type === category)
      && (!savedOnly || saved.includes(tour.id))
      && words.every(word => text.includes(word));
  });
}

export function readSaved(storage, validIds) {
  try {
    const value = JSON.parse(storage.getItem('jade-routes:saved') || '[]');
    return Array.isArray(value) ? [...new Set(value.filter(id => validIds.includes(id)))] : [];
  } catch {
    return [];
  }
}

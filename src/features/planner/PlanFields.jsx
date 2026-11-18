import React from 'react';
import { useApp } from '../../app/app-context.jsx';

export const emptyPlan = { tourId: '', placeId: '', date: '', travelers: '2', notes: '' };

export default function PlanFields({ draft, maxTravelers, onChange }) {
  const { t } = useApp();
  return <>
    <label>{t(draft.placeId ? 'visitDate' : 'departureDate')}<input name="date" type="date" required value={draft.date} onChange={onChange} /></label>
    <label>{t('travelers')}<input name="travelers" type="number" min="1" max={maxTravelers} required value={draft.travelers} onChange={onChange} /></label>
    <label className="wide">{t('notesOptional')}<textarea name="notes" rows="4" maxLength="1000" value={draft.notes} onChange={onChange} placeholder={t('notesPlaceholder')} /></label>
  </>;
}

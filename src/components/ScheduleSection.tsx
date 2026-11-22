import { useMemo, useState } from 'react';
import { useClub } from '../context/ClubContext';
import type { DayOfWeek, TimeBlock, TrainingCategory } from '../types/forge';

const DAYS: ('All' | DayOfWeek)[] = [
  'All',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const TIME_BLOCKS: ('All' | TimeBlock)[] = ['All', 'Morning', 'Midday', 'Evening'];

export function ScheduleSection({ compact = false }: { compact?: boolean }) {
  const { schedules, trainers, openBookingModal } = useClub();

  const [selectedDay, setSelectedDay] = useState<'All' | DayOfWeek>('All');
  const [selectedCategory, setSelectedCategory] = useState<'All' | TrainingCategory>('All');
  const [selectedTime, setSelectedTime] = useState<'All' | TimeBlock>('All');
  const [selectedTrainer, setSelectedTrainer] = useState<string>('All');

  const categories = useMemo(() => {
    const set = new Set(schedules.map((s) => s.category));
    return ['All', ...Array.from(set)] as ('All' | TrainingCategory)[];
  }, [schedules]);

  const filtered = useMemo(() => {
    return schedules.filter((slot) => {
      if (selectedDay !== 'All' && slot.day !== selectedDay) return false;
      if (selectedCategory !== 'All' && slot.category !== selectedCategory) return false;
      if (selectedTime !== 'All' && slot.timeBlock !== selectedTime) return false;
      if (selectedTrainer !== 'All' && slot.trainerName !== selectedTrainer) return false;
      return true;
    });
  }, [schedules, selectedDay, selectedCategory, selectedTime, selectedTrainer]);

  const displayed = compact ? filtered.slice(0, 10) : filtered;

  return (
    <div className="space-y-8">
      {/* Filter Controls */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by day">
          {DAYS.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => setSelectedDay(day)}
              className={`px-3.5 py-2 text-xs font-semibold tracking-wide transition-colors whitespace-nowrap ${
                selectedDay === day
                  ? 'bg-[#C5F36A] text-[#171916]'
                  : 'bg-[#1F221D] text-[#92958E] hover:text-[#F5F4EF] border border-[#2C3029]'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label htmlFor="filter-class-type" className="block text-xs text-[#92958E] mb-1.5">
              Class Discipline
            </label>
            <select
              id="filter-class-type"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as 'All' | TrainingCategory)}
              className="w-full bg-[#1F221D] border border-[#2C3029] px-3.5 py-2.5 text-sm text-[#F5F4EF]"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Disciplines' : cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filter-time-block" className="block text-xs text-[#92958E] mb-1.5">
              Time of Day
            </label>
            <select
              id="filter-time-block"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value as 'All' | TimeBlock)}
              className="w-full bg-[#1F221D] border border-[#2C3029] px-3.5 py-2.5 text-sm text-[#F5F4EF]"
            >
              {TIME_BLOCKS.map((tb) => (
                <option key={tb} value={tb}>
                  {tb === 'All' ? 'All Session Times' : tb}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filter-trainer" className="block text-xs text-[#92958E] mb-1.5">
              Coach
            </label>
            <select
              id="filter-trainer"
              value={selectedTrainer}
              onChange={(e) => setSelectedTrainer(e.target.value)}
              className="w-full bg-[#1F221D] border border-[#2C3029] px-3.5 py-2.5 text-sm text-[#F5F4EF]"
            >
              <option value="All">All Coaches</option>
              {trainers.map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {displayed.length === 0 ? (
        <div className="p-10 bg-[#1F221D] border border-[#2C3029] text-center">
          <p className="text-base font-medium text-[#F5F4EF] mb-2">No sessions match your current filters.</p>
          <button
            type="button"
            onClick={() => {
              setSelectedDay('All');
              setSelectedCategory('All');
              setSelectedTime('All');
              setSelectedTrainer('All');
            }}
            className="mt-2 px-5 py-2.5 bg-[#C5F36A] text-[#171916] text-xs font-bold uppercase tracking-wider"
          >
            Reset Schedule Filters
          </button>
        </div>
      ) : (
        <>
          {/* Desktop Table (md+) */}
          <div className="hidden md:block border border-[#2C3029] bg-[#1A1D18] overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#2C3029] text-xs font-semibold uppercase tracking-wider text-[#92958E]">
                  <th className="py-3.5 px-5">Day & Time</th>
                  <th className="py-3.5 px-5">Class</th>
                  <th className="py-3.5 px-5">Category</th>
                  <th className="py-3.5 px-5">Trainer</th>
                  <th className="py-3.5 px-5">Duration</th>
                  <th className="py-3.5 px-5">Slots</th>
                  <th className="py-3.5 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#272B24] text-sm">
                {displayed.map((slot) => (
                  <tr key={slot.id} className="hover:bg-[#21251F] transition-colors">
                    <td className="py-4 px-5 whitespace-nowrap">
                      <span className="font-semibold text-[#F5F4EF]">{slot.day}</span>
                      <span className="text-[#92958E] mx-2">·</span>
                      <span className="font-mono tabular-nums text-[#C5F36A]">{slot.time}</span>
                    </td>
                    <td className="py-4 px-5 font-semibold text-[#F5F4EF]">
                      {slot.className}
                      <span className="block text-xs font-normal text-[#92958E]">{slot.studioZone}</span>
                    </td>
                    <td className="py-4 px-5 text-[#92958E]">{slot.category}</td>
                    <td className="py-4 px-5 text-[#F5F4EF]">{slot.trainerName}</td>
                    <td className="py-4 px-5 font-mono tabular-nums text-[#92958E]">{slot.duration}</td>
                    <td className="py-4 px-5 font-mono tabular-nums">
                      <span className={slot.availableSlots <= 3 ? 'text-[#C5F36A]' : 'text-[#F5F4EF]'}>
                        {slot.availableSlots}/{slot.totalSlots} open
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right whitespace-nowrap">
                      <button
                        type="button"
                        disabled={slot.availableSlots <= 0}
                        onClick={() => openBookingModal(slot)}
                        className="px-4 py-2 bg-[#C5F36A] text-[#171916] text-xs font-bold uppercase tracking-wider hover:bg-[#D4F88A] transition-colors disabled:opacity-40"
                      >
                        {slot.availableSlots > 0 ? 'Book Now' : 'Full'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Daily Cards (< md) */}
          <div className="md:hidden space-y-3">
            {displayed.map((slot) => (
              <div key={slot.id} className="p-5 bg-[#1F221D] border border-[#2C3029] space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#C5F36A]">
                    {slot.day} · <span className="font-mono tabular-nums">{slot.time}</span>
                  </span>
                  <span className="text-xs font-mono tabular-nums text-[#92958E]">
                    {slot.availableSlots}/{slot.totalSlots} open
                  </span>
                </div>
                <div>
                  <h4 className="font-display text-2xl font-bold uppercase text-[#F5F4EF]">{slot.className}</h4>
                  <p className="text-xs text-[#92958E] mt-1">
                    {slot.category} · {slot.duration} · {slot.trainerName}
                  </p>
                </div>
                <button
                  type="button"
                  disabled={slot.availableSlots <= 0}
                  onClick={() => openBookingModal(slot)}
                  className="w-full py-3 bg-[#C5F36A] text-[#171916] text-xs font-bold uppercase tracking-wider disabled:opacity-40"
                >
                  {slot.availableSlots > 0 ? 'Book Now' : 'Session Full'}
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

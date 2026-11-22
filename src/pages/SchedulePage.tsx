import { PageHeader } from '../components/PageHeader';
import { ScheduleSection } from '../components/ScheduleSection';

export function SchedulePage() {
  return (
    <main className="bg-[#171916] text-[#F5F4EF]">
      <PageHeader
        kicker="Weekly Timetable"
        title="Monday Through Sunday Class Schedule"
        description="Filter by day, discipline, time block, or specialist coach. Reserve your spot online—real-time capacity updates immediately upon booking."
        breadcrumb="Weekly Schedule"
      />

      <section className="py-14 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <ScheduleSection />
        </div>
      </section>
    </main>
  );
}

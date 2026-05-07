import React from 'react';
import Button from '@/components/ui/Button';
import { Calendar } from 'lucide-react';

interface TalksHeaderProps {
  title: string;
  viewSchedule: string;
  viewScheduleLink: string;
}

const TalksHeader = ({ title, viewSchedule, viewScheduleLink }: TalksHeaderProps) => {
  return (
    <div className="text-center mb-12 flex flex-col items-center">
      <h2 className="mb-4">{title}</h2>
      <Button variant="secondary" rounded="full" className="flex items-center gap-2 w-fit" href={viewScheduleLink}>
        <span>{viewSchedule}</span>
        <Calendar className="w-5 h-5" />
      </Button>
    </div>
  );
};

interface TalksSectionProps {
  title: string;
  viewSchedule: string;
  viewScheduleLink: string;
  children: React.ReactNode;
}

const TalksSection: React.FC<TalksSectionProps> = ({
  title,
  viewSchedule,
  viewScheduleLink,
  children,
}) => {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <TalksHeader title={title} viewSchedule={viewSchedule} viewScheduleLink={viewScheduleLink} />
        {children}
      </div>
    </div>
  );
};

export default TalksSection;
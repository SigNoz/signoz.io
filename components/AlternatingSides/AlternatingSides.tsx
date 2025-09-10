import React from 'react';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from "@signozhq/badge"

interface AlternatingSidesItemProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
  component?: React.ReactNode;
  isReversed?: boolean;
}

interface AlternatingSidesProps {
  items: AlternatingSidesItemProps[];
}

const AlternatingSidesItem: React.FC<AlternatingSidesItemProps> = ({
  title,
  description,
  buttonText,
  buttonLink,
  component,
  isReversed = false,
}) => {
  const contentSide = (
    <div className="flex flex-col p-8 md:w-1/2">
      <div>
        <h2 className="text-signoz_vanilla-100">{title}</h2>
        <p className="text-signoz_vanilla-400">{description}</p>
      </div>
      {buttonText && buttonLink && (
        <Button variant="secondary" to={buttonLink} rounded="full" className="flex justify-center items-center gap-2 w-fit">
          {buttonText}
          <ArrowRight size={14} />
        </Button>
      )}
    </div>
  );

  const componentSide = (
    <div className="flex items-center justify-center p-8 md:w-1/2">
      {component}
    </div>
  );

  return (
    <div className={`flex flex-col md:flex-row ${isReversed ? 'md:flex-row-reverse' : ''}`}>
      {contentSide}
      {componentSide}
    </div>
  );
};

const AlternatingSides: React.FC<AlternatingSidesProps> = ({ items }) => {
  return (
    <div className="w-full">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-transparent p-0 border-b border-signoz_slate-400 border-dashed"
        >
          <AlternatingSidesItem {...item} isReversed={index % 2 !== 0} />
        </div>
      ))}
    </div>
  );
};

export default AlternatingSides;

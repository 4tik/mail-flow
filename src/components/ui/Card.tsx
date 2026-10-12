import React from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  className,
  hoverable = false,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-gray-200/90 shadow-sm p-6',
        hoverable &&
          'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-gray-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

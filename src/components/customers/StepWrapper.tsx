
import { ReactNode } from 'react';

interface StepWrapperProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function StepWrapper({ children, title, subtitle }: StepWrapperProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
        {subtitle && <p className="text-gray-600">{subtitle}</p>}
      </div>
      
      <div className="max-w-4xl mx-auto">
        {children}
      </div>
    </div>
  );
}

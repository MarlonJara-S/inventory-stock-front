import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components';

interface ReusableDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const ReusableDialog: React.FC<ReusableDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  maxWidth = 'md',
}) => {
  const maxWidthClasses = {
    sm: 'sm:max-w-[425px]',
    md: 'sm:max-w-[525px]',
    lg: 'sm:max-w-[725px]',
    xl: 'sm:max-w-[925px]',
    '2xl': 'sm:max-w-[1125px]',
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={maxWidthClasses[maxWidth]}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <DialogDescription>{description}</DialogDescription>
          )}
        </DialogHeader>
        <div className="mt-4">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};
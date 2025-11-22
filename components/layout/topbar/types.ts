import { RouteValue } from '@/constants/routes';
import { ComponentType } from 'react';

export type NavItem = {
  label: string;
  href: RouteValue;
  Icon: ComponentType<{ className?: string }>;
};

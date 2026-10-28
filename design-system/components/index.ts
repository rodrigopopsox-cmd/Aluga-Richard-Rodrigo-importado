// Public API of the component library. App code imports from '@design-system', never from these files directly.

// core
export { Avatar, AvatarGroup, type AvatarProps, type AvatarGroupProps } from './core/Avatar';
export { Badge, type BadgeProps, type BadgeTone } from './core/Badge';
export { Button, type ButtonProps, type ButtonVariant } from './core/Button';
export { Chip, type ChipProps } from './core/Chip';
export { Icon, type IconProps } from './core/Icon';
export { icons, type IconName } from './core/icons';
export { IconButton, type IconButtonProps } from './core/IconButton';
export { Wordmark, type WordmarkProps } from './core/Wordmark';

// forms
export { Checkbox, type CheckboxProps } from './forms/Checkbox';
export { Input, type InputProps } from './forms/Input';
export { MaskedInput, type MaskedInputProps, type MaskKind } from './forms/MaskedInput';
export { SegmentedControl, type SegmentedControlProps } from './forms/SegmentedControl';
export { Select, type SelectOption, type SelectProps } from './forms/Select';
export { Switch, type SwitchProps } from './forms/Switch';

// data
export { BarChart, Legend, type BarChartProps, type BarDatum, type LegendItem, type LegendProps } from './data/BarChart';
export { Card, CardHeader, type CardHeaderProps, type CardProps } from './data/Card';
export { DataTable, type DataTableColumn, type DataTableProps } from './data/DataTable';
export { HeatScale, type HeatScaleProps } from './data/HeatScale';
export { LineChart, type LineChartProps, type LineSeries } from './data/LineChart';
export { Metric, type MetricProps } from './data/Metric';
export { ProgressPill, type ProgressPillProps } from './data/ProgressPill';
export { StatCard, type StatCardProps } from './data/StatCard';
export { StepChecklist, type Step, type StepChecklistProps } from './data/StepChecklist';

// marketing
export { PlanCard, PricingNote, PricingTable, type PlanCardProps, type PlanSpec, type PricingNoteProps, type PricingTableProps } from './marketing';

// navigation
export { NavPills, type NavItem, type NavPillsProps } from './navigation/NavPills';
export { SideRail, type RailItem, type SideRailProps } from './navigation/SideRail';

// feedback
export { Dialog, type DialogProps } from './feedback/Dialog';
export { Toast, type ToastProps, type ToastTone } from './feedback/Toast';
export { Tooltip, type TooltipProps } from './feedback/Tooltip';

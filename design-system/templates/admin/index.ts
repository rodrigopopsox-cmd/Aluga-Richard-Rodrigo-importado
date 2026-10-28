// Admin dashboard template — composition patterns built only from design-system components.
export { AdminApp, type ToastInput } from './AdminApp';
export { AnalyticsScreen } from './AnalyticsScreen';
export { DashboardScreen, type DashboardScreenProps } from './DashboardScreen';
export { FinanceScreen } from './FinanceScreen';
export { LoginScreen, type LoginScreenProps } from './LoginScreen';
export { MaintenanceScreen, type MaintenanceScreenProps } from './MaintenanceScreen';
export { PropertiesScreen } from './PropertiesScreen';
export { MODULES, Shell, type DashView, type ModuleId, type ShellProps } from './Shell';
export { SettingsMenu, type SettingsMenuProps } from './SettingsMenu';
export { useBreakpoint, type Breakpoint } from './useBreakpoint';
export { useSettings, type AppSettings, type Theme } from './useSettings';
export * as adminData from './data';

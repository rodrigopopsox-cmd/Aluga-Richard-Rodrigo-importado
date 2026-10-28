'use client';

import type { ReactNode } from 'react';
import { Avatar, IconButton, Input, NavPills, SideRail, Wordmark, type RailItem } from '../../components';
import { user } from './data';
import { SettingsMenu } from './SettingsMenu';
import { useBreakpoint, type Breakpoint } from './useBreakpoint';
import type { AppSettings } from './useSettings';
import styles from './Shell.module.css';

export type ModuleId = 'dash' | 'props' | 'maint' | 'fin' | 'plans' | 'charges' | 'tenants';
export type DashView = 'overview' | 'analytics';

export const MODULES: Array<RailItem & { id: ModuleId }> = [
  { id: 'dash', label: 'Painel', icon: 'layout-grid' },
  { id: 'props', label: 'Imóveis', icon: 'building-2' },
  { id: 'maint', label: 'Manutenção', icon: 'wrench' },
  { id: 'fin', label: 'Recebimentos', icon: 'wallet' },
  { id: 'plans', label: 'Planos', icon: 'box' },
  { id: 'charges', label: 'Cobranças', icon: 'file-text' },
  { id: 'tenants', label: 'Inquilinos', icon: 'users' },
];

export interface ShellProps {
  module: ModuleId;
  setModule: (m: ModuleId) => void;
  view: DashView;
  setView: (v: DashView) => void;
  onLogout: () => void;
  settings: AppSettings;
  children: (bp: Breakpoint) => ReactNode;
}

/**
 * App frame. Desktop/tablet: sticky icon rail + top bar (nav pills or page title, search ⌘K, chat/bell, avatar).
 * Mobile: header with icon buttons + floating bottom pill bar.
 */
export function Shell({ module, setModule, view, setView, onLogout, settings, children }: ShellProps) {
  const bp = useBreakpoint();
  const current = MODULES.find((m) => m.id === module) ?? MODULES[0];

  if (bp === 'm') {
    return (
      <div className={styles.mobile}>
        <header className={styles.mobileHeader}>
          <span className={styles.logoTile} aria-hidden="true">
            A
          </span>
          <Wordmark variant="spaced" size={15} />
          <span className={styles.spacer} />
          <IconButton icon="message-circle" label="Mensagens" dot />
          <IconButton icon="bell" label="Notificações" />
          <SettingsMenu settings={settings} align="header" />
          <button type="button" onClick={onLogout} className={styles.avatarButton} title="Sair" aria-label="Sair">
            <Avatar name={user.name} size={40} />
          </button>
        </header>
        <main className={styles.mobileMain}>{children(bp)}</main>
        <div className={styles.bottomBar}>
          <NavPills compact bar label="Módulos" items={MODULES} value={module} onChange={(id) => setModule(id as ModuleId)} className={styles.bottomNav} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.desktop}>
      <div className={styles.railColumn}>
        <div className={styles.brandStack}>
          <span className={`${styles.logoTile} ${styles.logoTileLg}`} aria-hidden="true">
            A
          </span>
          <Wordmark variant="spaced" size={9} />
        </div>
        <SideRail
          items={MODULES}
          value={module}
          onChange={(id) => setModule(id as ModuleId)}
          className={styles.rail}
          footer={
            <>
              <SettingsMenu settings={settings} align="rail" />
              <IconButton icon="log-out" label="Sair" variant="ghost" onClick={onLogout} />
            </>
          }
        />
      </div>
      <div className={styles.content}>
        <header className={styles.topBar}>
          {module === 'dash' ? (
            <NavPills
              label="Painel"
              items={[
                { id: 'overview', label: 'Visão geral', icon: 'layout-grid' },
                { id: 'analytics', label: 'Análises', icon: 'chart-spline' },
              ]}
              value={view}
              onChange={(v) => setView(v as DashView)}
            />
          ) : (
            <div className={styles.pageTitle}>
              {current.label}
              <span className={styles.period}>.</span>
            </div>
          )}
          <Input icon="search" placeholder="Buscar imóvel, inquilino, contrato…" shortcut="⌘+K" className={styles.search} />
          <div className={styles.actions}>
            <IconButton icon="message-circle" label="Mensagens" dot />
            <IconButton icon="bell" label="Notificações" />
            {bp === 'd' && (
              <div className={styles.who}>
                <div className={styles.whoName}>{user.name}</div>
                <div className={styles.whoRole}>{user.role}</div>
              </div>
            )}
            <Avatar name={user.name} size={44} />
          </div>
        </header>
        <main className={styles.main}>{children(bp)}</main>
      </div>
    </div>
  );
}

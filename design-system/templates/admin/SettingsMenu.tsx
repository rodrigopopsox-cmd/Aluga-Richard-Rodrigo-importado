'use client';

import { useEffect, useRef, useState } from 'react';
import { IconButton, SegmentedControl, Switch } from '../../components';
import type { AppSettings } from './useSettings';
import styles from './SettingsMenu.module.css';

export interface SettingsMenuProps {
  settings: AppSettings;
  /** Para onde o painel abre: `rail` (lateral esquerda) ou `header` (mobile). */
  align?: 'rail' | 'header';
}

/**
 * Menu de configurações (engrenagem, no mesmo estilo dos demais ícones do app):
 * camada de acessibilidade opt-in + tema. Fecha ao clicar fora ou apertar Esc.
 */
export function SettingsMenu({ settings, align = 'rail' }: SettingsMenuProps) {
  const { a11y, setA11y, theme, setTheme, view, setView } = settings;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div className={styles.settings} ref={ref}>
      <IconButton icon="settings" label="Configurações" onClick={() => setOpen((v) => !v)} />
      {open && (
        <div
          className={`${styles.panel} ${align === 'rail' ? styles.fromRail : styles.fromHeader}`}
          role="group"
          aria-label="Configurações de exibição"
        >
          <span className={styles.title}>Configurações</span>

          <div className={styles.block}>
            <Switch checked={a11y} onChange={setA11y} label="Acessibilidade" name="a11y" />
            <span className={styles.hint}>Deixa o texto e os botões maiores.</span>
          </div>

          <div className={styles.block}>
            <span className={styles.label}>Como prefere ver?</span>
            <SegmentedControl
              size="sm"
              label="Como prefere ver?"
              options={[
                { value: 'simple', label: 'Simples' },
                { value: 'full', label: 'Completo' },
              ]}
              value={view}
              onChange={(v) => setView(v as 'simple' | 'full')}
            />
            <span className={styles.hint}>
              Simples mostra o essencial: suas unidades, quanto entrou no mês e o que vence
              agora. Completo mostra tudo — ocupação, visitas, manutenção, insights e saúde
              financeira.
            </span>
          </div>

          <div className={styles.block}>
            <span className={styles.label}>Tema</span>
            <SegmentedControl
              size="sm"
              label="Tema"
              options={[
                { value: 'light', label: 'Claro' },
                { value: 'dark', label: 'Escuro' },
              ]}
              value={theme}
              onChange={(v) => setTheme(v as 'light' | 'dark')}
            />
          </div>
        </div>
      )}
    </div>
  );
}

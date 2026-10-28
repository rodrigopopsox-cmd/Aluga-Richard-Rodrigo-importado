'use client';

import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

/**
 * Como o painel é mostrado.
 *
 * `full` é o PADRÃO: terminar o onboarding tem que devolver o painel inteiro,
 * com todas as funções. `simple` é opt-in para quem quer ver menos — encurta
 * o painel para as unidades, quanto entrou no mês e o que vence agora.
 */
export type ViewMode = 'simple' | 'full';

export interface AppSettings {
  /** Camada de acessibilidade opt-in: tipografia ampliada + alvos de toque de 56px. */
  a11y: boolean;
  setA11y: (v: boolean) => void;
  theme: Theme;
  setTheme: (v: Theme) => void;
  view: ViewMode;
  setView: (v: ViewMode) => void;
}

const A11Y_KEY = 'aluga_a11y';
const THEME_KEY = 'aluga_theme';
const VIEW_KEY = 'aluga_view';

const read = (key: string): string | null => {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null; // storage bloqueado / modo privado
  }
};

const write = (key: string, value: string | null): void => {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  } catch {
    /* ignora — a configuração apenas não persiste entre sessões */
  }
};

const themeFrom = (value: string | null): Theme | null =>
  value === 'dark' || value === 'light' ? value : null;

const viewFrom = (value: string | null): ViewMode | null =>
  value === 'simple' || value === 'full' ? value : null;

/**
 * Configurações de exibição do app: tema + camada de acessibilidade.
 *
 * São adaptações de runtime — o estado é refletido em `<html>` via data-attributes
 * (`data-theme`, `data-a11y`), que acionam as camadas de CSS correspondentes.
 * Nada aqui altera o design aprovado por padrão: os dois modos são opt-in.
 *
 * Precedência: parâmetro de URL (`?a11y=on`, `?theme=dark`) na primeira visita,
 * depois o valor salvo em localStorage.
 */
export function useSettings(): AppSettings {
  const [a11y, setA11yState] = useState(false);
  const [theme, setThemeState] = useState<Theme>('light');
  const [view, setViewState] = useState<ViewMode>('full');

  // Hidrata do storage/URL somente no cliente (evita divergência de hidratação).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlA11y = params.get('a11y');
    setA11yState(urlA11y ? urlA11y === 'on' : read(A11Y_KEY) === 'on');
    setThemeState(themeFrom(params.get('theme')) ?? themeFrom(read(THEME_KEY)) ?? 'light');
    setViewState(viewFrom(params.get('view')) ?? viewFrom(read(VIEW_KEY)) ?? 'full');
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (a11y) root.dataset.a11y = 'on';
    else delete root.dataset.a11y;
    write(A11Y_KEY, a11y ? 'on' : null);
  }, [a11y]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.dataset.theme = 'dark';
    else delete root.dataset.theme;
    write(THEME_KEY, theme === 'dark' ? 'dark' : null);
  }, [theme]);

  useEffect(() => {
    write(VIEW_KEY, view === 'full' ? 'full' : null);
  }, [view]);

  const setA11y = useCallback((v: boolean) => setA11yState(v), []);
  const setTheme = useCallback((v: Theme) => setThemeState(v), []);
  const setView = useCallback((v: ViewMode) => setViewState(v), []);

  return { a11y, setA11y, theme, setTheme, view, setView };
}

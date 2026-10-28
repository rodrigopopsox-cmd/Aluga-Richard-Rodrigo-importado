'use client';

import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

export interface AppSettings {
  /** Camada de acessibilidade opt-in: tipografia ampliada + alvos de toque de 56px. */
  a11y: boolean;
  setA11y: (v: boolean) => void;
  theme: Theme;
  setTheme: (v: Theme) => void;
}

const A11Y_KEY = 'aluga_a11y';
const THEME_KEY = 'aluga_theme';

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

  // Hidrata do storage/URL somente no cliente (evita divergência de hidratação).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlA11y = params.get('a11y');
    setA11yState(urlA11y ? urlA11y === 'on' : read(A11Y_KEY) === 'on');
    setThemeState(themeFrom(params.get('theme')) ?? themeFrom(read(THEME_KEY)) ?? 'light');
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

  const setA11y = useCallback((v: boolean) => setA11yState(v), []);
  const setTheme = useCallback((v: Theme) => setThemeState(v), []);

  return { a11y, setA11y, theme, setTheme };
}

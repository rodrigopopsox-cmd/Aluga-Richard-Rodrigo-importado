'use client';

import { useState, type FormEvent } from 'react';
import { Button, Checkbox, Input, Wordmark } from '../../components';
import buildingBrick from '../../assets/images/building-brick.png';
import { useBreakpoint } from './useBreakpoint';
import styles from './LoginScreen.module.css';

export interface LoginScreenProps {
  onLogin: () => void;
}

/** Split login: architecture photo with campaign caps headline (desktop) + form. */
export function LoginScreen({ onLogin }: LoginScreenProps) {
  const bp = useBreakpoint();
  const [remember, setRemember] = useState(true);
  const [email, setEmail] = useState('rodrigo@aluga.com.br');
  const [loading, setLoading] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    window.setTimeout(onLogin, 600);
  };

  return (
    <div className={[styles.page, bp === 'm' && styles.mobile].filter(Boolean).join(' ')}>
      {bp !== 'm' && (
        <div className={styles.hero}>
          {/* Decorative architecture photo */}
          <img src={buildingBrick.src} alt="" className={styles.heroPhoto} />
          <div className={styles.heroFade} />
          <div className={styles.heroHeadline}>
            <span className={styles.light}>Feito para</span> <b className={styles.strong}>administrar</b>
            <br />
            <span className={styles.light}>o que você</span> <b className={styles.strong}>aluga</b>
          </div>
          <div className={styles.heroCopy}>
            Reúne <b>contratos</b>, <b>manutenção</b> e <b>finanças</b> em um só lugar.
          </div>
        </div>
      )}
      <div className={styles.formColumn}>
        <form onSubmit={submit} className={styles.form}>
          <Wordmark size={40} />
          <div className={styles.title}>
            <div className={styles.titleMain}>Bem-vindo de volta</div>
            <div className={styles.titleSub}>Entre na sua conta</div>
          </div>
          <Input label="E-mail" variant="white" type="email" autoComplete="email" value={email} onChange={setEmail} icon="mail" />
          <Input label="Senha" variant="white" type="password" autoComplete="current-password" defaultValue="aluga2026" icon="lock" />
          <div className={styles.between}>
            <Checkbox checked={remember} onChange={setRemember} label="Manter conectado" />
            <button type="button" className={styles.linkButton}>
              Esqueci a senha
            </button>
          </div>
          <Button type="submit" size="lg" fullWidth iconRight="arrow-right" loading={loading}>
            Entrar
          </Button>
          <div className={styles.footer}>
            Ainda não tem conta?{' '}
            <button type="button" className={styles.linkButton}>
              Criar conta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

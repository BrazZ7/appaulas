import { useRef } from 'react';
import { Accessibility, Captions, Contrast, Database, Download, Leaf, Monitor, Move, ShieldCheck, Sparkles, Type, Upload } from 'lucide-react';
import { Notice, PageHead, Switch, toast } from '../components/ui';
import { SyncPainel } from '../components/SyncStatus';
import { authEnabled } from '../lib/auth';
import { download } from '../lib/files';
import { actions, store, useApp } from '../store/store';
import { ROLE_LABEL } from '../store/permissions';
import type { Role } from '../types/models';

export default function SettingsPage() {
  const s = useApp();
  const st = s.settings;
  const file = useRef<HTMLInputElement>(null);
  return (
    <div className="stack">
      <PageHead kicker="Ajustes" title="Acessibilidade, perfil e dados" />
      <div className="grid g2">
        <section className="panel">
          <div className="panel-title"><Accessibility /><h2 style={{ fontSize: '1.2rem' }}>Acessibilidade e exibição</h2></div>
          <div className="setting-row"><Move size={18} /><span>Reduzir movimento</span><Switch hideLabel label="Reduzir movimento" checked={st.reduceMotion} onChange={(v) => actions.setSettings({ reduceMotion: v })} /></div>
          <div className="setting-row"><Sparkles size={18} /><span>Modo visual simples (sem brilhos e transparências)</span><Switch hideLabel label="Modo visual simples" checked={st.simpleMode} onChange={(v) => actions.setSettings({ simpleMode: v })} /></div>
          <div className="setting-row"><Contrast size={18} /><span>Alto contraste</span><Switch hideLabel label="Alto contraste" checked={st.highContrast} onChange={(v) => actions.setSettings({ highContrast: v })} /></div>
          <div className="setting-row"><Type size={18} /><span>Tamanho do texto</span>
            <select className="input" style={{ width: 'auto' }} value={st.fontScale} onChange={(e) => actions.setSettings({ fontScale: Number(e.target.value) as typeof st.fontScale })}><option value={1}>Padrão</option><option value={1.15}>Ampliado</option><option value={1.3}>Muito ampliado</option></select></div>
          <div className="setting-row"><Captions size={18} /><span>Legendas em vídeos</span><Switch hideLabel label="Legendas" checked={st.captions} onChange={(v) => actions.setSettings({ captions: v })} /></div>
          <div className="setting-row"><Monitor size={18} /><span>Modo projetor (texto grande, sem menus)</span><Switch hideLabel label="Modo projetor" checked={st.projector} onChange={(v) => actions.setSettings({ projector: v })} /></div>
          <div className="setting-row"><Leaf size={18} /><span>Impressão com economia de tinta</span><Switch hideLabel label="Economia de tinta" checked={st.inkSaver} onChange={(v) => actions.setSettings({ inkSaver: v })} /></div>
          <p className="xs muted mt">Navegação por teclado: Tab/Shift+Tab percorrem os controles; setas trocam abas; Esc fecha janelas. O primeiro Tab mostra “Pular para o conteúdo”.</p>
        </section>
        <section className="panel stack-sm">
          <div className="panel-title"><ShieldCheck /><h2 style={{ fontSize: '1.2rem' }}>Perfil (simulação de permissões)</h2></div>
          <div className="row">{(['professor', 'aluno', 'coordenacao'] as Role[]).map((r) => <button key={r} className={`chip ${s.user.role === r ? 'on' : ''}`} aria-pressed={s.user.role === r} onClick={() => actions.setRole(r)}>{ROLE_LABEL[r]}</button>)}</div>
          <label className="field"><span>Nome de exibição</span><input className="input" value={s.user.displayName} onChange={(e) => store.update((x) => ({ ...x, user: { ...x.user, displayName: e.target.value } }))} /></label>
          <label className="field"><span>Escola (organização)</span><input className="input" value={s.org.name} onChange={(e) => store.update((x) => ({ ...x, org: { ...x.org, name: e.target.value } }))} /></label>
          <Notice>Modo demonstrativo: <strong>não há login nem servidor</strong>. Qualquer pessoa com acesso a este navegador vê os mesmos dados. Não use com dados reais sensíveis de estudantes.</Notice>
        </section>
        <section className="panel stack-sm">
          <div className="panel-title"><Database /><h2 style={{ fontSize: '1.2rem' }}>Seus dados</h2></div>
          {authEnabled ? <SyncPainel /> : <p className="small">Tudo fica salvo neste navegador (localStorage; vídeos no IndexedDB). Limpar os dados do navegador apaga o conteúdo — faça backups.</p>}
          {store.persistFailed() && <Notice>O navegador recusou salvar (espaço cheio ou modo privado). As mudanças podem se perder ao recarregar.</Notice>}
          <div className="row">
            <button className="btn" onClick={() => download(`aulaviva-backup-${new Date().toISOString().slice(0, 10)}.json`, store.exportJson(), 'application/json')}><Download /> Exportar backup</button>
            <button className="btn" onClick={() => file.current?.click()}><Upload /> Importar backup</button>
            <input ref={file} type="file" accept="application/json" hidden onChange={async (e) => { const f = e.target.files?.[0]; if (!f) return; try { store.importJson(await f.text()); toast('Backup restaurado'); } catch (err) { alert((err as Error).message || 'Arquivo inválido'); } e.target.value = ''; }} />
            <button className="btn danger" onClick={() => { if (confirm('Apagar todos os dados deste navegador e voltar ao estado inicial de demonstração?')) { store.reset(); toast('Dados reiniciados'); } }}>Reiniciar demonstração</button>
          </div>
          <p className="xs faint">Vídeos importados no Estúdio não entram no backup JSON (ficam no IndexedDB).</p>
        </section>
        <section className="panel">
          <h2 style={{ fontSize: '1.2rem' }}>Sobre esta versão</h2>
          <ul className="bullets small">
            <li>Funciona sem servidor e, após carregada, sem internet (exceto fontes web e links externos).</li>
            <li>Entrada por código em vários dispositivos, sincronização e login seguro <strong>não estão implementados</strong>.</li>
            <li>Integração Higgsfield: não conectada; vídeos podem ser importados manualmente.</li>
            <li>Códigos da BNCC não são atribuídos automaticamente.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

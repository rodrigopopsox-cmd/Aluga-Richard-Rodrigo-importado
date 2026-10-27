// Showcase-only: renders interaction states statically.
// Every CSS rule that uses :hover / :active / :focus-visible / :focus-within is cloned with the
// pseudo-class removed and a wrapper class prefixed, so <span class="ds-force-hover">…</span>
// shows the hover look without a mouse (same idea as Storybook's pseudo-states addon).

const PSEUDOS: Array<[RegExp, string]> = [
  [/:hover/g, 'ds-force-hover'],
  [/:active/g, 'ds-force-active'],
  [/:focus-visible/g, 'ds-force-focus'],
  [/:focus-within/g, 'ds-force-focus'],
];

const STYLE_ID = 'ds-forced-states';

function collect(rules: CSSRuleList, out: string[]) {
  for (const rule of Array.from(rules)) {
    if (rule instanceof CSSStyleRule) {
      for (const [re, cls] of PSEUDOS) {
        re.lastIndex = 0;
        if (!re.test(rule.selectorText)) continue;
        const selectors = rule.selectorText
          .split(',')
          .map((s) => s.trim())
          .filter((s) => s.match(re))
          .map((s) => `.${cls} ${s.replace(re, '')}`);
        if (selectors.length) out.push(`${selectors.join(', ')} { ${rule.style.cssText} }`);
      }
    } else if ('cssRules' in rule && (rule as CSSGroupingRule).cssRules) {
      collect((rule as CSSGroupingRule).cssRules, out);
    }
  }
}

export function installForcedStates() {
  const out: string[] = [];
  for (const sheet of Array.from(document.styleSheets)) {
    if (sheet.ownerNode instanceof HTMLElement && sheet.ownerNode.id === STYLE_ID) continue;
    try {
      collect(sheet.cssRules, out);
    } catch {
      // cross-origin stylesheet (e.g. web fonts) — nothing to clone
    }
  }
  let el = document.getElementById(STYLE_ID);
  if (!el) {
    el = document.createElement('style');
    el.id = STYLE_ID;
    document.head.appendChild(el);
  }
  el.textContent = out.join('\n');
}

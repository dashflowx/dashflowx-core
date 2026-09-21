import { CORE_REGISTRY } from '../src/registry';

function normalize(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function tierForStoryTitle(title) {
  const leaf = normalize(String(title).split('/').pop() || '');
  const row = CORE_REGISTRY.find((entry) => {
    const titleKey = normalize(entry.title);
    const idKey = normalize(entry.id.replace(/^core\./, ''));
    return titleKey === leaf || idKey === leaf;
  });
  return row?.tier ?? 'free';
}

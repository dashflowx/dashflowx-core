/**
 * Core component registry (C03).
 * Contract: { id, title, tier: 'free' | 'pro', editor: boolean } — keep identical to
 * docs/projects/registry.ts. Rows from docs/projects/core-inventory.json (one per folder).
 */

export type RegistryTier = 'free' | 'pro';

export type RegistryEntry = {
  id: string;
  title: string;
  tier: RegistryTier;
  editor: boolean;
};

export type ComponentRegistry = readonly RegistryEntry[];

export const CORE_REGISTRY = [
  { id: 'core.accordion', title: 'Accordion', tier: 'free', editor: true },
  { id: 'core.alert', title: 'Alert', tier: 'free', editor: true },
  { id: 'core.alert-dialog', title: 'Alert Dialog', tier: 'free', editor: true },
  { id: 'core.aspect-ratio', title: 'Aspect Ratio', tier: 'free', editor: true },
  { id: 'core.avatar', title: 'Avatar', tier: 'free', editor: true },
  { id: 'core.badge', title: 'Badge', tier: 'free', editor: true },
  { id: 'core.box', title: 'Box', tier: 'free', editor: true },
  { id: 'core.breadcrumb', title: 'Breadcrumb', tier: 'free', editor: true },
  { id: 'core.button', title: 'Button', tier: 'free', editor: true },
  { id: 'core.calendar', title: 'Calendar', tier: 'pro', editor: true },
  { id: 'core.card', title: 'Card', tier: 'free', editor: true },
  { id: 'core.carousel', title: 'Carousel', tier: 'pro', editor: true },
  { id: 'core.checkbox', title: 'Checkbox', tier: 'free', editor: true },
  { id: 'core.code', title: 'Code', tier: 'free', editor: true },
  { id: 'core.collapsible', title: 'Collapsible', tier: 'pro', editor: true },
  { id: 'core.command', title: 'Command', tier: 'pro', editor: true },
  { id: 'core.component-card', title: 'Component Card', tier: 'free', editor: false },
  { id: 'core.context-menu', title: 'Context Menu', tier: 'pro', editor: true },
  { id: 'core.copy-button', title: 'Copy Button', tier: 'free', editor: false },
  { id: 'core.date-picker', title: 'Date Picker', tier: 'pro', editor: true },
  { id: 'core.dialog', title: 'Dialog', tier: 'free', editor: true },
  { id: 'core.drawer', title: 'Drawer', tier: 'free', editor: true },
  { id: 'core.dropdown-menu', title: 'Dropdown Menu', tier: 'pro', editor: true },
  { id: 'core.form', title: 'Form', tier: 'free', editor: false },
  { id: 'core.grid', title: 'Grid', tier: 'free', editor: true },
  { id: 'core.h1', title: 'H1', tier: 'free', editor: true },
  { id: 'core.h2', title: 'H2', tier: 'free', editor: true },
  { id: 'core.h3', title: 'H3', tier: 'free', editor: true },
  { id: 'core.h4', title: 'H4', tier: 'free', editor: true },
  { id: 'core.h5', title: 'H5', tier: 'free', editor: true },
  { id: 'core.h6', title: 'H6', tier: 'free', editor: true },
  { id: 'core.hover-card', title: 'Hover Card', tier: 'pro', editor: true },
  { id: 'core.hr', title: 'Hr', tier: 'free', editor: true },
  { id: 'core.img', title: 'Img', tier: 'free', editor: true },
  { id: 'core.input', title: 'Input', tier: 'free', editor: true },
  { id: 'core.input-otp', title: 'Input OTP', tier: 'pro', editor: true },
  { id: 'core.label', title: 'Label', tier: 'free', editor: true },
  { id: 'core.li', title: 'Li', tier: 'free', editor: true },
  { id: 'core.list', title: 'List', tier: 'free', editor: true },
  { id: 'core.menubar', title: 'Menubar', tier: 'pro', editor: true },
  { id: 'core.menu-list', title: 'Menu List', tier: 'pro', editor: true },
  { id: 'core.navigation-menu', title: 'Navigation Menu', tier: 'pro', editor: true },
  { id: 'core.ol', title: 'Ol', tier: 'free', editor: true },
  { id: 'core.p', title: 'P', tier: 'free', editor: true },
  { id: 'core.pagination', title: 'Pagination', tier: 'free', editor: true },
  { id: 'core.popover', title: 'Popover', tier: 'free', editor: true },
  { id: 'core.pre', title: 'Pre', tier: 'free', editor: true },
  { id: 'core.progress', title: 'Progress', tier: 'free', editor: true },
  { id: 'core.radio-group', title: 'Radio Group', tier: 'free', editor: true },
  { id: 'core.resizable', title: 'Resizable', tier: 'pro', editor: true },
  { id: 'core.scroll-area', title: 'Scroll Area', tier: 'free', editor: true },
  { id: 'core.select', title: 'Select', tier: 'free', editor: true },
  { id: 'core.separator', title: 'Separator', tier: 'free', editor: true },
  { id: 'core.sheet', title: 'Sheet', tier: 'free', editor: true },
  { id: 'core.skeleton', title: 'Skeleton', tier: 'free', editor: true },
  { id: 'core.slider', title: 'Slider', tier: 'free', editor: true },
  { id: 'core.sonner', title: 'Sonner', tier: 'free', editor: true },
  { id: 'core.switch', title: 'Switch', tier: 'free', editor: true },
  { id: 'core.table', title: 'Table', tier: 'free', editor: false },
  { id: 'core.tabs', title: 'Tabs', tier: 'free', editor: true },
  { id: 'core.td', title: 'Td', tier: 'free', editor: false },
  { id: 'core.textarea', title: 'Text Area', tier: 'free', editor: true },
  { id: 'core.th', title: 'Th', tier: 'free', editor: false },
  { id: 'core.toast', title: 'Toast', tier: 'free', editor: true },
  { id: 'core.toaster', title: 'Toaster', tier: 'free', editor: true },
  { id: 'core.toggle', title: 'Toggle', tier: 'free', editor: true },
  { id: 'core.toggle-group', title: 'Toggle Group', tier: 'free', editor: true },
  { id: 'core.tooltip', title: 'Tooltip', tier: 'free', editor: true },
  { id: 'core.tr', title: 'Tr', tier: 'free', editor: false },
  { id: 'core.typography', title: 'Typography', tier: 'free', editor: true },
  { id: 'core.ul', title: 'Ul', tier: 'free', editor: true },
  { id: 'core.a', title: 'Anchor', tier: 'free', editor: true },
] as const satisfies ComponentRegistry;

export function isProEntry(entry: RegistryEntry): boolean {
  return entry.tier === 'pro';
}

export function editorPalette(registry: ComponentRegistry = CORE_REGISTRY): RegistryEntry[] {
  return registry.filter((entry) => entry.editor);
}

export function assertUniqueRegistryIds(registry: ComponentRegistry = CORE_REGISTRY): void {
  const seen = new Set<string>();
  for (const entry of registry) {
    if (seen.has(entry.id)) {
      throw new Error(`Duplicate registry id: ${entry.id}`);
    }
    seen.add(entry.id);
  }
}

export default CORE_REGISTRY;

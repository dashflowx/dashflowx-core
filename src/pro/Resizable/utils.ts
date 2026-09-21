// Utility Functions for Resizable Component
export const generatePanelId = (prefix = 'panel') => `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const getColorClasses = (color?: string) => {
  const DEFAULT_COLORS = {
    blue: 'bg-blue-50 text-blue-700',
    green: 'bg-green-50 text-green-700',
    red: 'bg-red-50 text-red-700',
    yellow: 'bg-yellow-50 text-yellow-700',
    purple: 'bg-purple-50 text-purple-700',
    gray: 'bg-gray-50 text-gray-700',
    indigo: 'bg-indigo-50 text-indigo-700',
    orange: 'bg-orange-50 text-orange-700',
    teal: 'bg-teal-50 text-teal-700',
    pink: 'bg-pink-50 text-pink-700',
    cyan: 'bg-cyan-50 text-cyan-700',
  } as const;

  if (!color || !(color in DEFAULT_COLORS)) return DEFAULT_COLORS.gray;
  return DEFAULT_COLORS[color as keyof typeof DEFAULT_COLORS];
};

// Re-export for backward compatibility
export const generateId = generatePanelId;
export const getPanelColorClasses = getColorClasses;

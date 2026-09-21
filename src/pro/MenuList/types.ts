export interface iDfxMenu {
  id: string;
  menuIcon?: React.ReactNode;
  title: string;
  path: string;
  active: boolean;
  disabled?: boolean;
  badge?: string | number;
  onClick?: () => void;
  children?: iDfxMenu[];
}

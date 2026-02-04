import {Injectable} from '@angular/core';

export enum Role {
  SUPERADMIN = 'SUPERADMIN',
  ADMIN = 'ADMIN',
  INSPECTOR = 'INSPECTOR',
  USER = 'USER',
}

export interface SidebarMenuItem {
  path?: string;
  titleKey: string;
  icon?: string;
  children?: SidebarMenuItem[];
  requiredRole?: Role[] | null;
}

@Injectable({
  providedIn: 'root',
})
export class SidebarMenuConfig {
  public readonly menuItems: SidebarMenuItem[] = [
    {
      path: 'arm',
      titleKey: 'SIDEBAR.MENU.ARM',
      icon: 'nz:user-list',
    }
  ];
}

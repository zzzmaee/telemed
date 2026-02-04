import { Component, inject, signal, WritableSignal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from '../../i18n/components/language-switcher/language-switcher.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { SidebarMenuConfig } from '../sidebar-menu.config';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterLink,
    RouterOutlet,
    TranslateModule,
    LanguageSwitcherComponent,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzIconModule,
    NzToolTipModule,
    NzDividerModule,
    NzDropDownModule,
    NzBadgeModule,
    NzCardModule,
    NzSpaceModule,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.less',
  standalone: true,
})
export class MainLayoutComponent {
  protected currentLang: WritableSignal<string> = signal('ru');
  protected isMenuCollapsed: WritableSignal<boolean> = signal(false);

  protected readonly menuConfig = inject(SidebarMenuConfig);
  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService);
  private readonly _translate: TranslateService = inject(TranslateService);

  private _activePath = '';
  private _activeSubPath = '';

  constructor() {
    this._router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this._updateActivePaths();
    });

    this._updateActivePaths();

    this.currentLang.set(this._translate.currentLang || this._translate.defaultLang);
    this._translate.onLangChange.subscribe((event) => {
      this.currentLang.set(event.lang);
    });
  }

  protected getActiveTitleKey(): string {
    const activePath = this._activePath?.replace(/^\//, '');
    const subPath = this._activeSubPath?.replace(/^\//, '');

    let activeItem = this.menuConfig.menuItems.find(
      (item) => item.path?.replace(/^\//, '') === activePath,
    );

    if (!activeItem) {
      activeItem = this.menuConfig.menuItems.find((item) =>
        item.children?.some((child) => child.path?.replace(/^\//, '') === activePath),
      );
    }

    if (!activeItem) {
      return '';
    }

    if (activeItem.children) {
      const activeChild = activeItem.children.find(
        (child) => child.path?.replace(/^\//, '') === activePath,
      );

      if (activeChild) {
        return activeChild.titleKey;
      }

      if (subPath) {
        const activeSubChild = activeItem.children.find(
          (child) => child.path?.replace(/^\//, '') === subPath,
        );
        if (activeSubChild) {
          return activeSubChild.titleKey;
        }
      }
    }
    return activeItem.titleKey ?? '';
  }

  private _updateActivePaths(): void {
    const segments = this._router.url.split('/');
    if (segments.length >= 2) {
      this._activePath = segments[1];
      this._activeSubPath =
        segments.length >= 3 ? segments[2] : '';
    }
  }

  protected logout(): void {
    this._authService.logout();
    this._router.navigate(['/login']);
  }
}

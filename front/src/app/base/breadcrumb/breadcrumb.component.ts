import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SidenavItem } from 'app/base/sidenav/sidenav.model';
import { SidenavService } from 'app/base/sidenav/sidenav.service';
import { SIDENAV_ITEMS } from 'app/base/sidenav/SIDENAV_ITEMS';
import { MenuItem } from 'primeng/api';
import { filter, map, startWith, tap } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @Input() public lang = 'en';
  public items: MenuItem[] = [];
  private readonly sidenavItems: SidenavItem[] = SIDENAV_ITEMS;
  private homeItem: MenuItem = { label: 'Home', routerLink: '/'};


  constructor(
    private readonly sidenavService: SidenavService,
    private readonly router: Router,
  ) {

  }

  ngOnInit(): void {
    this.router.events.pipe(      
      filter(event => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.url),
      startWith(this.router.url),
      tap(() => this.items = [this.homeItem])
    ).subscribe((url) => {
      this.buildBreadcrumb(url);
    });
  }

  // private buildBreadcrumb(path: string): void {
  //   const firstPath: SidenavItem = this.sidenavItems.find(item => '/' + item.id === path);
  //   if (firstPath) {
  //     this.items.push({
  //       label: firstPath.labels[this.lang],
  //       routerLink: firstPath.link,
  //       command: () => this.sidenavService.setCurrentEntityName('')
  //     });
  //   }
  // }
  private buildBreadcrumb(path: string): void {
    const currentPath: SidenavItem = this.sidenavItems.find(item => '/' + item.id === path);
  
    if (currentPath) {
      this.items = []; // Réinitialise la liste d'items
  
      // Ajoute l'élément "Home"
      this.items.push({
        label: 'Home',
        routerLink: '/',
        command: () => this.sidenavService.setCurrentEntityName('')
      });
  
      // Ajoute l'élément actuel
      this.items.push({
        label: currentPath.labels[this.lang],
        routerLink: currentPath.link,
        command: () => this.sidenavService.setCurrentEntityName('')
      });
  
      // Si le chemin actuel est "/product" ou "/admin/product", ajoute les éléments spécifiques
      if (path === '/products') {
        this.items.push({
          label: 'Products',
          routerLink: '/products',
          command: () => this.sidenavService.setCurrentEntityName('')
        });
      } else if (path === '/admin/product') {
        this.items.push({
          label: 'Admin Products',
          routerLink: '/admin/products',
          command: () => this.sidenavService.setCurrentEntityName('')
        });
      }
    }
  }

}
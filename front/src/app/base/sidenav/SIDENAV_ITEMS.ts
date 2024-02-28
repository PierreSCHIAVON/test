import { SidenavItem } from "app/base/sidenav/sidenav.model";

export const SIDENAV_ITEMS: SidenavItem[] = [
  {
    id: 'Product',
    labels: {
      en: "Product",
      fr: "Product"
    },
    link: '/products'

  },
  {
    id: 'Product-Admin',
    labels: {
      en: "Product-Admin",
      fr: "Product-Admin"
    },
    link: '/admin/products'

  }

];
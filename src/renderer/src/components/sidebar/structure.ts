import {
  ChartLine,
  FileMinus,
  LucideProps,
  NotepadTextDashed,
  PackageSearch,
  ShoppingCart,
} from "lucide-react";
import { ForwardRefExoticComponent } from "react";

type NavGroup = {
  label: string;
  links: NavLink[];
};

type NavLink = {
  tag: string;
  link: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
};

export const navStruct: NavGroup[] = [
  {
    label: "Ventas",
    links: [
      { tag: "Ventas", link: "/sales", icon: ShoppingCart },
      { tag: "Cotizaciones", link: "/quotations", icon: FileMinus },
    ],
  },
  {
    label: "Extra",
    links: [
      {
        tag: "Posiciones",
        link: "/",
        icon: PackageSearch,
      },
      {
        tag: "Órdenes",
        link: "/orders",
        icon: NotepadTextDashed,
      },
      {
        tag: "Estadísticas",
        link: "/stats",
        icon: ChartLine,
      },
    ],
  },
];

import { LucideProps, NotepadTextDashed, PackageSearch } from "lucide-react";
import { ForwardRefExoticComponent } from "react";

type navLink = {
  tag: string;
  link: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
};

export const navStruct: navLink[] = [
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
];

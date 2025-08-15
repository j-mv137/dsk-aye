import { Link } from "react-router";
import styles from "./sidebar.module.css";
import { navStruct } from "./structure";
import { PanelLeft } from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  setToggled: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Sidebar(): React.JSX.Element {
  const [toggled, setToggled] = useState<boolean>(false);

  if (toggled) {
    return <ToggledSidebar setToggled={setToggled} />;
  }

  return <NSideBar setToggled={setToggled} />;
}

function ToggledSidebar({ setToggled }: SidebarProps): React.JSX.Element {
  return (
    <nav className={styles.toggledNav}>
      <button
        className={styles.toggleButton}
        onClick={() => setToggled((tog) => !tog)}
      >
        <PanelLeft strokeWidth={1} size={20} />
      </button>
    </nav>
  );
}

function NSideBar({ setToggled }: SidebarProps): React.JSX.Element {
  return (
    <nav className={styles.nav}>
      <div className={styles.mainContainer}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            AGUA Y ENERGÍA
            <span className={styles.logoSm}>Soluciones</span>
          </div>
          <button
            className={styles.toggleButton}
            onClick={() => setToggled((tog) => !tog)}
          >
            <PanelLeft strokeWidth={1} size={20} />
          </button>
        </div>
        <div className={styles.linksContainer}>
          {navStruct.map((group) => (
            <div key={group.label} className={styles.navGroup}>
              <span className={styles.groupLabel}>{group.label}</span>
              {group.links.map((linkObj) => (
                <Link
                  className={styles.link}
                  key={linkObj.tag}
                  to={linkObj.link}
                >
                  {linkObj.tag}
                  {<linkObj.icon strokeWidth={1} size={20} />}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}

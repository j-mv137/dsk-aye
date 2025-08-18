import {
  Select,
  SelectTrigger,
  SelectValue,
} from "../../../utils/select/select";

import styles from "./salesUtils.module.css";

interface TypeSelectProps {
  children: React.ReactNode;
  placeholder: string;
}

export function TypeSelect({
  children,
  placeholder,
}: TypeSelectProps): React.JSX.Element {
  return (
    <Select>
      <SelectTrigger className={styles.selectType}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      {children}
    </Select>
  );
}

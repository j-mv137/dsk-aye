import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../utils/dialog/dialog";
import { Button } from "../../../utils/button/button";

import styles from "./salesUtils.module.css";
import { Input } from "@renderer/components/utils/input/input";

export function ClientDialog(): React.JSX.Element {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={styles.clientBtn}>Público en General</Button>
      </DialogTrigger>
      <DialogContent>
        <div className={styles.searchClientsCont}>
          <Input className={styles.searchClientsInput} />
          <div className={styles.foundClients}></div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

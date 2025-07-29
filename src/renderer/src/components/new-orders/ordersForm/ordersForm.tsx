import { Input } from "@renderer/components/utils/input/input";
import styles from "./ordersForm.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@renderer/components/utils/button/button";
import { CalendarDays } from "lucide-react";

export type OrderForm = {
  id: number;
  date: string;
  noteId: string; // ID of the receipt associated with the order
  status: "pendiente" | "terminado";
  type: "taller" | "revisión";
  name: string;
  description: string;
  address: string;
  phoneNum: string;
};

export function OrdersForm(): React.JSX.Element {
  const { handleSubmit, register, watch } = useForm<OrderForm>({
    defaultValues: {
      date: "",
      noteId: "",
      status: "pendiente",
      type: "taller",
      name: "",
      description: "",
      address: "",
      phoneNum: "",
    },
  });

  // display or not the address input
  const typeWatch = watch("type");

  const onSubmit: SubmitHandler<OrderForm> = (data): void => {
    console.log(data);
  };

  return (
    <div className={styles.mainContainer}>
      <form className={styles.formCont} onSubmit={handleSubmit(onSubmit)}>
        {/* First row: ID and date */}
        <div className={styles.formRow}>
          <div className={styles.inputLabelCont}>
            <label htmlFor="id">No. de Órden*</label>
            <Input
              className={styles.smInput}
              type="number"
              {...register("id", { required: true })}
            />
          </div>
          <Button className={styles.smButton}>
            <CalendarDays />
          </Button>
        </div>

        {/* Second row: status and type */}
        <div className={styles.formRow}>
          {/* Type radio group */}
          <div className={styles.inputLabelCont}>
            <label htmlFor="status">Tipo*</label>
            <div className={styles.radioInputLabelCont}>
              <span className={styles.radioText}>Revisión</span>
              <input
                {...register("type", { required: true })}
                type="radio"
                value="revisión"
              />
            </div>
            <div className={styles.radioInputLabelCont}>
              <span className={styles.radioText}>Taller</span>
              <input
                {...register("type", { required: true })}
                type="radio"
                value="taller"
              />
            </div>
          </div>

          {/* Status radio group */}
          <div className={styles.inputLabelCont}>
            <label htmlFor="status">Estatus*</label>
            <div className={styles.radioInputLabelCont}>
              <span className={styles.radioText}>Pendiente</span>
              <input
                {...register("status", { required: true })}
                type="radio"
                value="pendiente"
              />
            </div>
            <div className={styles.radioInputLabelCont}>
              <span className={styles.radioText}>Terminado</span>
              <input
                {...register("status", { required: true })}
                type="radio"
                value="terminado"
              />
            </div>
          </div>
        </div>

        {/* Third row: name */}
        <div className={styles.formRow}>
          <div className={styles.inputLabelCont}>
            <label htmlFor="name">Nombre*</label>
            <Input type="text" {...register("name", { required: true })} />
          </div>
        </div>

        {/* Op. row only when type is revisión */}
        {typeWatch === "revisión" && (
          <div className={styles.formRow}>
            <div className={styles.inputLabelCont}>
              <label htmlFor="address">Dirección*</label>
              <Input type="text" {...register("address", { required: true })} />
            </div>
          </div>
        )}

        {/* Fifth or fourth row: phone number */}
        <div className={styles.formRow}>
          <div className={styles.inputLabelCont}>
            <label htmlFor="phoneNum">No. de teléfono*</label>
            <Input
              className={styles.smInput}
              type="text"
              {...register("phoneNum", { required: true })}
            />
          </div>

          <div className={styles.inputLabelCont}>
            <label htmlFor="note">Nota asociada</label>
            <Input
              className={styles.smInput}
              type="text"
              {...register("noteId")}
            />
          </div>
        </div>

        {/* Last row: description */}
        <div className={styles.formRow}>
          <div className={styles.inputLabelCont}>
            <label htmlFor="phoneNum">Descripción</label>
            <textarea
              className={styles.textarea}
              {...register("description")}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

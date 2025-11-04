import { Input } from "@renderer/components/utils/input/input";
import styles from "./ordersForm.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@renderer/components/utils/button/button";
import { CalendarDays } from "lucide-react";
import { useState } from "react";

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { dateFormatter, toOrdersTable } from "../orders";
import { OrderTable } from "../ordersTable/orders";

export type Order = {
  id: number;
  date: string;
  status: "pendiente" | "terminado";
  type: "taller" | "revisión";
  name: string;
  description: string;
  noteId: string;
  address: string;
  phoneNum: string;
};
interface OrdersFormProps {
  setOrdersTable: React.Dispatch<React.SetStateAction<OrderTable[]>>;
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

export function OrdersForm({
  setOrdersTable,
  setOrders,
}: OrdersFormProps): React.JSX.Element {
  const { handleSubmit, register, watch, setValue } = useForm<Order>({
    defaultValues: {
      date: dateFormatter.format(new Date()),
      noteId: "",
      status: "pendiente",
      type: "taller",
      name: "",
      description: "",
      address: "",
      phoneNum: "",
    },
  });

  const [toggleCal, setToggleCal] = useState<boolean>(false);
  const [date, setDate] = useState<Date>();

  // display or not the address input
  const typeWatch = watch("type");
  const dateWatch = watch("date");

  const onSubmit: SubmitHandler<Order> = (data: Order): void => {
    window.electronAPI.addOrder(data);

    setOrders((orders) => orders.concat(data));
    setOrdersTable((ordersTable) => ordersTable.concat(toOrdersTable(data)));
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
          <div className={styles.calendarNBtnCont}>
            <span>{dateWatch}</span>
            <Button
              type="button"
              className={styles.lgBtn}
              onClick={() => setToggleCal((prev) => !prev)}
            >
              <CalendarDays />
            </Button>
            {toggleCal && (
              <div className={styles.calendarCont}>
                <DayPicker
                  mode="single"
                  selected={date}
                  onSelect={(d) => {
                    setDate(d);
                    setValue("date", dateFormatter.format(d));
                  }}
                />
              </div>
            )}
          </div>
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
            <Input
              className={styles.lgInput}
              type="text"
              {...register("name", { required: true })}
            />
          </div>
        </div>

        {/* Op. row only when type is revisión */}
        {typeWatch === "revisión" && (
          <div className={styles.formRow}>
            <div className={styles.inputLabelCont}>
              <label htmlFor="address">Dirección*</label>
              <Input
                className={styles.lgInput}
                type="text"
                {...register("address", { required: true })}
              />
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
            <label htmlFor="noteId">Nota asociada</label>
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

        <div className={styles.formRow}>
          <Button className={styles.smBtn} type="submit">
            Enviar
          </Button>
        </div>
      </form>
    </div>
  );
}

import styles from "./orderForm.module.css";

import { Button } from "../../utils/button/button";
import { Input } from "../../utils/input/input";

import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { Dot } from "lucide-react";

export type Order = {
  id: number;
  note?: string;
  date?: string;
  status: "pendiente" | "terminado";
  type: "taller" | "revisión";
  name: string;
  description?: string;
  address?: string;
  phoneNum?: string;
};

export function OrderForm(): React.JSX.Element {
  const { register, handleSubmit, watch, setValue } = useForm<Order>({
    defaultValues: {
      type: "taller",
      status: "pendiente",
    },
  });

  const statusWatch = watch("status");
  const typeWatch = watch("type");

  const [dropDown, setDropDown] = useState<boolean>(false);

  const onSubmit: SubmitHandler<Order> = (data): void => {
    console.log(data);
  };

  return (
    <div className={styles.secondContainer}>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.multInputsContainer}>
            <div className={styles.inputContainer}>
              <label htmlFor="id">No. de Orden*</label>
              <Input
                type="number"
                {...register("id", { required: true })}
                className={styles.inputFormSm}
              />
            </div>
            <div className={styles.radioGroup}>
              <div className={styles.radioGroup}>
                <label htmlFor="radio">Taller</label>
                <input
                  {...register("type", { required: true })}
                  value="taller"
                  type="radio"
                />
              </div>
            </div>

            <div className={styles.radioGroup}>
              <label htmlFor="radio">Revisión</label>
              <div className={styles.radioContainer}>
                <input
                  {...register("type", { required: true })}
                  value="revisión"
                  type="radio"
                />
              </div>
            </div>
          </div>

          <div className={styles.multInputsContainer}>
            <div className={styles.inputContainer}>
              <label htmlFor="Note">Nota Asociada</label>
              <Input
                type="number"
                {...register("note", { required: false })}
                className={styles.inputFormSm}
              />
            </div>
            <div className={styles.inputContainer}>
              <Button
                className={styles.dropdownButton}
                onClick={() => setDropDown((prev) => !prev)}
              >
                <label htmlFor="status">Estatus*</label>
              </Button>
              {dropDown && (
                <div className={styles.dropdownContainer}>
                  <button
                    {...register("status", { value: "pendiente" })}
                    onClick={() => setValue("status", "pendiente")}
                    className={styles.dropdownTag}
                  >
                    {statusWatch === "pendiente" && (
                      <Dot className={styles.dot} strokeWidth={1} />
                    )}
                    Pendiente
                  </button>
                  <button
                    {...register("status", { value: "terminado" })}
                    onClick={() => setValue("status", "terminado")}
                    className={styles.dropdownTag}
                  >
                    {statusWatch === "terminado" && (
                      <Dot className={styles.dot} strokeWidth={1} />
                    )}
                    Terminado
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="name">Nombre del cliente*</label>
            <Input
              {...register("name", { required: true })}
              className={styles.inputForm}
            />
          </div>
          {typeWatch === "revisión" && (
            <div className={styles.inputContainer}>
              <label htmlFor="address">Domicilio</label>
              <Input
                {...register("address", { required: false })}
                className={styles.inputForm}
              />
            </div>
          )}

          <div className={styles.inputContainer}>
            <label htmlFor="phoneNum">Teléfono</label>
            <Input
              {...register("phoneNum", { required: false, pattern: /[0-9 ]/ })}
              className={styles.inputForm}
              type="text"
            />
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="description">Descripción</label>
            <textarea
              {...register("description", { required: false })}
              className={styles.textarea}
            />
          </div>
          <Button type="submit">Añadir</Button>
        </form>
      </div>
    </div>
  );
}

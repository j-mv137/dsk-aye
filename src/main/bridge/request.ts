import { spawn as spwn } from "child_process";

type Methods =
  | "getProdsBySearch"
  | "addOrder"
  | "getOrdersByDate"
  | "getProdsByRack"
  | "addPosToProd"
  | "getPosForProd"
  | "getPosLevels";
type Directions = "Orders" | "Products" | "Positions";

export type Product = {
  id: number;
  code: string;
  secondCode: string;
  description: string;
  department: string;
  category: string;
  cost: number;
  sellPrice: number;
  currency: string;
  artNum: number;
  minQuantity: number;
};

function spawn(cmd: string, args: ReadonlyArray<string>): Promise<string> {
  return new Promise((resolve, reject) => {
    const cp = spwn(cmd, args);
    const error: string[] = [];
    const stdout: string[] = [];
    cp.stdout.on("data", (data) => {
      stdout.push(data.toString());
    });

    cp.on("error", (e) => {
      error.push(e.toString());
    });

    cp.on("close", () => {
      if (error.length) reject(error.join(""));
      else resolve(stdout.join(""));
    });
  });
}

export async function requestApi(
  direction: Directions,
  method: Methods,
  args: (string | number | boolean)[]
): Promise<string> {
  const argsJson = JSON.stringify({
    direction: direction,
    method: method,
    args: args,
  });
  console.log(argsJson);
  try {
    return await spawn("java", [
      "-cp",
      "/home/jacobo/Desktop/ayer/baye/Main/src/out/production/Main:/home/jacobo/Desktop/ayer/baye/Main/out/lib/postgresql-42.7.7.jar:/home/jacobo/Desktop/ayer/baye/Main/out/lib/gson-2.13.1.jar",
      "Main",
      argsJson,
    ]);
  } catch (err) {
    console.log(err);
    if (typeof err === "string") throw new Error(err);
    return "";
  }
}

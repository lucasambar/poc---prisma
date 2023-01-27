import { Position } from "../protocols.js";
import {
  deletePosition,
  selectPositions,
  upsertPosition,
} from "../repositories/positions.repositories.js";
import {
  selectEmployeeByPosition,
  selectPositionById,
  selectPositionByName,
} from "../repositories/positions.repositories.js";

async function get() {
  return await selectPositions();
}

async function upsert(body) {
  let {id, name, salary } = body;
    
  if (id) {
    id = Number(id);
    const positionDB = await selectPositionById(id);
    if (!positionDB)
      return { status: 404, message: "Position not found in database" };
  }

  const positionDB = await selectPositionByName(name);
  if (positionDB && Number(positionDB.id) !== id)
    throw {
      status: 422,
      message: `Position already inserted in DB with id: ${positionDB.id}`,
    };

  return await upsertPosition({ id, name, salary });
}

async function delet(id: number) {
  const positionDB = await selectPositionById(id);
  if (!positionDB)
    return { status: 404, send: "Position not found in database" };

  const employees = await selectEmployeeByPosition(id);
  if (employees)
    return {
      status: 401,
      send: {
        message:
          "This employees should be moved to other positions or deleted from database before delete this position",
        employees,
      },
    };

  return await deletePosition(id);
}

const positonServices = {
  get,
  upsert,
  delet,
};

export default positonServices;

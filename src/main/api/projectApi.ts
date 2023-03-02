import {ipcMain} from "electron"
import {prisma} from "../utils/prismaUtils";
ipcMain.handle('getProjects', () => {
  return prisma.project.findMany();
});
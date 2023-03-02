import {ipcMain} from "electron";
// import ffi from "ffi-napi"
import path from "path";
// const p=path.resolve(__dirname,"../../assets/fiber.node")
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fiber = require("fiber")

console.log(fiber.open(0))
// eslint-disable-next-line @typescript-eslint/no-var-requires
// import ffi from "ffi-napi"
// const adPath = path.join(__dirname, "../../assets/addDll.dll");
// console.log(adPath)
// const addDll = ffi.Library(adPath, {
//   "add": ["int", ["int", "int"]]
// })
// console.log(addDll.add(1, 2))
// const fiberpath=path.resolve(__dirname,"../../assets/Fiber2125API.dll")
// let fiberDll: any = undefined;
// try {
//   fiberDll = ffi.Library(fiberpath, {
//     "FIB2125_Open": ["int", ["int"]]
//   })
// } catch (e) {
//   console.error(e);
//   fiberDll = undefined;
// }
ipcMain.handle("openFiber", () => {
  if(fiber.open(0)===0) return "打开光纤成功！"
  return '未知错误';
})
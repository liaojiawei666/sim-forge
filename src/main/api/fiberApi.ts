import {ipcMain} from "electron";
// import ffi from "ffi-napi"
import path from "path";
// eslint-disable-next-line @typescript-eslint/no-var-requires
import ffi from "ffi-napi"
const adPath = path.resolve(__dirname, "../../assets/addDll.dll");
console.log(adPath)
const addDll = ffi.Library(adPath, {
  "add": ["int", ["int", "int"]]
})
console.log(addDll.add(1, 2))
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
// ipcMain.handle("openFiber", () => {
//   if (fiberDll === undefined) {
//     return "加载动态库失败！"
//   } else {
//     try {
//       const open = fiberDll.FIB2125_Open(0);
//       if (open === 0) return "测试成功！"
//     } catch (e) {
//       return "打开失败"
//     }
//   }
//   return '未知错误';
// })
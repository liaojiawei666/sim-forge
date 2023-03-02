// eslint-disable-next-line @typescript-eslint/no-var-requires
const ffi = require("ffi-napi");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

// const adPath = path.resolve(__dirname, "./assets/addDll.dll");
// const addDll = ffi.Library(adPath, {
//   "add": ["int", ["int", "int"]]
// })
// console.log(addDll.add(1, 2))


const fiberDll = ffi.Library(path.resolve(__dirname, "./assets/Fiber2125API.dll"),{
  "FIB2125_Open":["int",["int"]]
})
console.log(fiberDll.FIB2125_Open(0))
import {req} from "../utils/request";

export async function openFiberApi(){
  return req("openFiber")
}
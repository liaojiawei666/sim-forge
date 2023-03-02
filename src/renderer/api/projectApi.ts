import {req} from "../utils/request";

export async function getProjectsApi() {
  return req('getProjects');
}
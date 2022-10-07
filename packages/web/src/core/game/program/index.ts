import { programManager } from "../../worker";
import { System } from "./system"

interface Information {

}

export interface ProgramConfig {
  dev: (system: System) => {},
  code: string;
}

export const createProgram = async (config: ProgramConfig) => {
  const { code } = config;

  const pid = await programManager.registerProgram(code);

  const run = () => {

  };

  return {
    run
  }
}
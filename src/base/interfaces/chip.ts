import { ICommand } from "./commands";
import { IBaeInformation } from "./information";

export interface IChip {
  name?: string;
  AI: (information: IBaeInformation, command: ICommand) => any;
}

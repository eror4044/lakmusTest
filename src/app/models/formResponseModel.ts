import { Condition } from "./сondition.model";

export interface FormResponseModel {
  encounter: {
    date: string;
  };
  conditions: Condition[];
}

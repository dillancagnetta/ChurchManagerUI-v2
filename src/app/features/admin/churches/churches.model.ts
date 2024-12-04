import {Entity} from "@core/store/crud-state.feature";
import {BasicPerson} from "@shared/shared.models";

export interface ChurchEntity extends Entity {
  name: string;
  description: string | null;
  shortCode: string | null;
  phoneNumber: string | null;
  address: string | null;
  leaderPerson: BasicPerson | null;
  churchGroupId: number | null;
}

export interface ChurchGroupEntity extends Entity {
  name: string;
  description: string | null;
  leaderPerson: BasicPerson | null;
  churches: ChurchEntity[];
}

export type ChurchesGeneralFilter = {
  searchTerm?: string;
};

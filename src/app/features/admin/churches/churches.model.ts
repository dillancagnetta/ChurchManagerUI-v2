import {Entity} from "@core/store/crud-state.feature";
import {PersonAutocomplete} from "@ui/layout/common/search/search-bar.models";

export interface ChurchEntity extends Entity {
  name: string;
  description: string | null;
  shortCode: string | null;
  phoneNumber: string | null;
  address: string | null;
  leaderPerson: PersonAutocomplete | null;
  churchGroupId: number | null;
}

export interface ChurchGroupEntity extends Entity {
  name: string;
  description: string | null;
  leaderPerson: PersonAutocomplete | null;
  churches: ChurchEntity[];
}

export type ChurchesGeneralFilter = {
  searchTerm?: string;
};

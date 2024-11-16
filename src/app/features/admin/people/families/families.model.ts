export interface FamiliesQuery
{
    name?: string;
    address?: string;
}

export interface Family
{
    id?: number;
    name: string;
    street?: string;
    city?: string;
    country?: string;
    province?: string;
    postalCode?: string;
    language: string | undefined;
    familyMembers: FamilyPerson[] | undefined;
}

interface FamilyPerson {
  personId: number;
  firstName: string;
  lastName: string;
  gender: "Male" | "Female" | "Unknown";
  ageClassification: string;
  photoUrl: string | null;
  age: number | null;
}

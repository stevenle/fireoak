interface Field {
  id: string;
  type: string | string[] | Field[];
  label?: string;
  help?: string;
}

export type Schema = Field[];

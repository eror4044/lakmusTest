export interface Condition {
  id: string;
  context: {
    identifier: {
      type: {
        coding: Array<{
          system: string;
          code: string;
        }>;
      };
      value: string;
    };
  };
  code: {
    coding: Array<{
      system: string;
      code: string;
    }>;
  };
  notes: string;
  onset_date: string;

}

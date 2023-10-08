export interface Diagnosis {
  blockName: string | null;
  blockNumber: string | null;
  chapterName: string | null;
  chapterNumber: number | null;
  code: string | null;
  id: number;
  isPublic: boolean;
  name: string;
  shortName: string | null;
}

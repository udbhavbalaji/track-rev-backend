import {
  RaceType,
  ResultEntryType,
} from "@app-types/trackRevRequest/primitive";

export interface QualifyingResultType extends RaceType {
  Results: QualifyingResultEntryType[];
}

export interface QualifyingResultEntryType extends ResultEntryType {
  Q1?: string;
  Q2?: string;
  Q3?: string;
}

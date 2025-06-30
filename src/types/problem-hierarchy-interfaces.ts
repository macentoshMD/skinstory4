
export interface Symptom {
  id: string;
  medicalName: string;
  commonName?: string;
  description?: string;
}

export interface SubProblem {
  id: string;
  name: string;
  description: string;
  symptoms: Symptom[];
}

export interface BaseProblem {
  id: string;
  name: string;
  description: string;
  category: string;
  subProblems: SubProblem[];
}

export interface ProblemHierarchy {
  baseProblems: BaseProblem[];
}

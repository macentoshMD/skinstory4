
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
}

export interface BaseProblem {
  id: string;
  name: string;
  description: string;
  category: string;
  symptoms: Symptom[];
  subProblems: SubProblem[];
}

export interface ProblemHierarchy {
  baseProblems: BaseProblem[];
}

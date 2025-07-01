import { CustomerPortalLayout } from '@/components/portal/CustomerPortalLayout';
import { Accordion } from '@/components/ui/accordion';
import ProblemCard from '@/components/portal/problems/ProblemCard';
import ProblemSummaryCard from '@/components/portal/problems/ProblemSummaryCard';
import { mockProblemsData } from '@/data/mockProblems';

const CustomerPortalProblems = () => {
  const problemsData = mockProblemsData;
  
  // Determine default expanded state: expand all if only 1 problem, collapse if multiple
  const defaultExpandedValue = problemsData.length === 1 ? problemsData[0].id.toString() : undefined;

  const isMainProblem = (problemId: number) => problemId === 1; // Akne is the main problem

  return (
    <CustomerPortalLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mina Hudproblem</h1>
            <p className="text-muted-foreground mt-2">Detaljerad information om dina hudproblem och symptom</p>
          </div>
        </div>

        {/* Problems List */}
        <Accordion 
          type="multiple" 
          defaultValue={defaultExpandedValue ? [defaultExpandedValue] : []}
          className="space-y-4"
        >
          {problemsData.map((problem) => (
            <ProblemCard
              key={problem.id}
              problem={problem}
              isMainProblem={isMainProblem(problem.id)}
            />
          ))}
        </Accordion>

        {/* Summary */}
        <ProblemSummaryCard problemsData={problemsData} />
      </div>
    </CustomerPortalLayout>
  );
};

export default CustomerPortalProblems;
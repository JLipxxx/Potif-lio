async function getLogs() {
  try {
    const res = await fetch('https://api.github.com/repos/JLipxxx/Potif-lio/actions/runs');
    const data = await res.json();
    const run = data.workflow_runs[0];
    console.log(`Latest run: ${run.name} - ${run.conclusion}`);
    
    const jobsRes = await fetch(run.jobs_url);
    const jobsData = await jobsRes.json();
    for (const job of jobsData.jobs) {
      if (job.conclusion === 'failure') {
        console.log(`Failed Job: ${job.name}`);
        for (const step of job.steps) {
          if (step.conclusion === 'failure') {
            console.log(`Failed Step: ${step.name}`);
          }
        }
      }
    }
  } catch(e) { console.error(e) }
}
getLogs();

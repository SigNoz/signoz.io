module.exports = async ({ github, context, core }) => {
  const status = process.env.JOB_STATUS
  const deploymentStatus = process.env.DEPLOYMENT_STATUS

  const body =
    status === 'success'
      ? `✅ **CMS Sync Successful**\n\nContent has been synced to Strapi CMS with deployment status: \`${deploymentStatus}\`\n\nRelations (authors, tags, related_faqs) have been automatically resolved.`
      : `❌ **CMS Sync Failed**\n\nPlease check the workflow logs for details.`

  github.rest.issues.createComment({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
    body: body,
  })
}

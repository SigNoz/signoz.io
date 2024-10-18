import { Suspense } from 'react'
import WorkspaceSetupHome from './WorkspaceSetupHome'

function WorkspaceSetup() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WorkspaceSetupHome />
    </Suspense>
  )
}

export default WorkspaceSetup

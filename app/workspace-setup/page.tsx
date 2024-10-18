'use client'

import React, { useState } from 'react'
import WorkspaceReady from './workspace-ready'
import WorkspaceSetup from './workspace-setup'

function SetupWorkspace() {
  const [isWorkspaceReady, setIsWorkspaceReady] = useState(false)
  const [isWorkspaceSetupDelayed, setIsWorkspaceSetupDelayed] = useState(true)

  const userName = 'test'

  return (
    <>
      {isWorkspaceReady ? (
        <WorkspaceReady userName={userName} />
      ) : (
        <WorkspaceSetup isWorkspaceSetupDelayed={isWorkspaceSetupDelayed} />
      )}
    </>
  )
}

export default SetupWorkspace

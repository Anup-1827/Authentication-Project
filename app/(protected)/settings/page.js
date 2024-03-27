import React from 'react'

import {auth} from "@/auth"

async function Settings() {
    const session  = await auth();
  return (
    <div>{JSON.stringify(session)}</div>
  )
} 

export default Settings
import * as core from '@actions/core'
import * as inputHelper from './input-helper'
import * as commitMessageChecker from './commit-message-checker'

async function run(): Promise<void> {
  try {
    const checkerArguments = await inputHelper.getInputs()
    if (checkerArguments.messages.length === 0) {
      core.info(`No commits found in the payload, skipping checasdasdadsk.`)
    } else {
      await commitMessageChecker.checkCommitMessages(checkerArguments)
    }
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error)
    } else {
      throw error 
    }
  }
}

run()

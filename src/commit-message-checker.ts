import * as core from '@actions/core'

export interface ICheckerArguments {
  pattern: string
  flags: string
  error: string
  messages: string[]
}

export async function checkCommitMessages(
  args: ICheckerArguments
): Promise<void> {
  if (args.pattern.length === 0) {
    throw new Error(`PATTERN not defined.`)
  }

  const regex = new RegExp('[^gimsuy]', 'g')
  let invalidChars
  let chars = ''
  while ((invalidChars = regex.exec(args.flags)) !== null) {
    chars += invalidChars[0]
  }
  if (chars !== '') {
    throw new Error(`FLAGS contains invalid characters "${chars}".`)
  }

  if (args.error.length === 0) {
    throw new Error(`ERROR not defined.`)
  }

  if (args.messages.length === 0) {
    throw new Error(`MESSAGES not defined.`)
  }

  let result = true

  core.info(`Checking commit messages against "${args.pattern}"...`)

  for (const message of args.messages) {
    if (checkMessage(message, args.pattern, args.flags)) {
      core.info(`- OK: "${message}"`)
    } else {
      core.info(`- failed: "${message}"`)
      result = false
    }
  }

  if (!result) {
    throw new Error(args.error)
  }
}

function checkMessage(
  message: string,
  pattern: string,
  flags: string
): boolean {
  const regex = new RegExp(pattern, flags)
  return regex.test(message)
}

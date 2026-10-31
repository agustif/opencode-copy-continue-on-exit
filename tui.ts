import { Plugin } from "@opencode/plugin/tui"
import { execFileSync } from "node:child_process"

type TuiContext = Parameters<Parameters<typeof Plugin.define>[0]["setup"]>[0]

function readSessionId(context: TuiContext): string | undefined {
  try {
    const current = context.ui.router.current() as any
    if (current?.type === "session" && current.sessionID) return String(current.sessionID)
    if (current?.name === "session" && current.params?.sessionID) return String(current.params.sessionID)
    if (current?.sessionID) return String(current.sessionID)
  } catch {}
  return undefined
}

function copyToClipboard(text: string): void {
  const candidates: string[][] = [
    ["pbcopy"],
    ["wl-copy"],
    ["xclip", "-selection", "clipboard"],
    ["xsel", "--clipboard", "--input"],
  ]
  for (const [bin, ...args] of candidates) {
    try {
      execFileSync(bin, args, { input: text, stdio: ["pipe", "ignore", "ignore"], timeout: 2000 })
      return
    } catch {}
  }
  try {
    process.stdout.write(`\x1b]52;c;${Buffer.from(text).toString("base64")}\x07`)
  } catch {}
}

export default Plugin.define({
  id: "copy-continue-on-exit",
  setup(context: TuiContext) {
    let sessionId = readSessionId(context)

    const timer = setInterval(() => {
      const id = readSessionId(context)
      if (id) sessionId = id
    }, 500)

    const doCopy = () => {
      const cmd = sessionId ? `opencode --session ${sessionId}` : `opencode --continue`
      copyToClipboard(cmd)
    }

    process.on("exit", doCopy)

    return () => {
      clearInterval(timer)
      try {
        process.off("exit", doCopy)
      } catch {}
      doCopy()
    }
  },
})

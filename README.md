# opencode-copy-continue-on-exit

OpenCode v2 TUI plugin. When you exit OpenCode (via `/exit`, `/quit`, `/q`,  `Ctrl+C`, or closing the terminal), it copies a continue-session CLI command to your clipboard.

- In a session: `opencode --session <sessionID> # <session title>`
- Otherwise: `opencode --continue`

## Install

From npm (once published):

```sh
opencode plugin add opencode-copy-continue-on-exit
```

From GitHub:

```sh
opencode plugin add github:agustif/opencode-copy-continue-on-exit
```

Then fully restart OpenCode. Verify with `opencode2 plugin list`.

## Clipboard support

Uses `pbcopy` (macOS), `wl-copy`/`xclip`/`xsel` (Linux), `clip` (Windows), with an OSC 52 fallback.

## License

MIT

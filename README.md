# opencode-copy-continue-on-exit

OpenCode v2 TUI plugin. When you exit OpenCode (via `/exit`, `/quit`, `/q`, or closing the app), it copies a continue-session CLI command to your clipboard.

- In a session: `opencode --session <sessionID>`
- Otherwise: `opencode --continue`

## Install

Add to `~/.config/opencode/opencode.json`:

```json
{
  "plugins": ["/path/to/opencode-copy-continue-on-exit"]
}
```

Or install from GitHub:

```sh
opencode plugin add github:agustif/opencode-copy-continue-on-exit
```

## Clipboard support

Uses `pbcopy` (macOS), `wl-copy`, `xclip`, or `xsel` (Linux), with an OSC 52 fallback.

## License

MIT

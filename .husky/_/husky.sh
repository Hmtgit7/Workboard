#!/bin/sh
# husky install helper - do not modify

_husky_main() {
  local hook=$1
  local args=$2

  if [ -f "$hook" ]; then
    chmod +x "$hook"
    sh "$hook" "$args"
  fi
}

_husky_main "$@"

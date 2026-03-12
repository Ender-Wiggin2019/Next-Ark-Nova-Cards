#!/usr/bin/env sh
# Wraps biome format: exit 0 when "No files were processed" (all files ignored by Biome)
# so lint-staged doesn't fail when only unsupported formats (e.g. .md, .scss) are staged.
output=$(pnpm exec biome format --write "$@" 2>&1)
exitCode=$?
if echo "$output" | grep -q "No files were processed"; then
  exit 0
fi
printf '%s\n' "$output"
exit $exitCode

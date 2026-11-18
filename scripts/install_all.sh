#!/bin/bash
# One command: everything freebird uses, then a report.   install_all.sh [--models]
set -uo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
"$HERE/setup.sh" --voice
"$HERE/install_companions.sh" "$@"
echo; "$HERE/doctor.sh"

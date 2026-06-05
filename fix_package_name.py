#!/usr/bin/env python3
"""
Check and automatically fix the `name` field in package.json to match the repository folder name.

Usage:
  python tools/fix_package_name.py --root .         # updates package.json by default
  python tools/fix_package_name.py --root . --dry-run # shows suggested name without applying

The expected package name is derived from the repository folder name and
sanitized to a safe npm-style name (lowercase, dashes, digits, dots, underscores).
"""
from __future__ import annotations

import argparse
import json
import re
from pathlib import Path
from typing import Optional


def sanitize_name(name: str) -> str:
    n = name.strip().lower()
    n = n.replace(' ', '-')
    n = re.sub(r'[^a-z0-9._-]', '-', n)
    n = re.sub(r'-{2,}', '-', n)
    n = re.sub(r'^[^a-z0-9]+', '', n)
    n = re.sub(r'[^a-z0-9]+$', '', n)
    if not n:
        n = 'project'
    return n


def load_package_json(path: Path) -> Optional[dict]:
    if not path.exists():
        print('package.json not found at', path)
        return None
    try:
        return json.loads(path.read_text(encoding='utf-8'))
    except Exception as e:
        print('Failed to read package.json:', e)
        return None


def write_package_json(path: Path, data: dict) -> bool:
    try:
        path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
        print('Wrote package.json successfully.')
        return True
    except Exception as e:
        print('Failed to write package.json:', e)
        return False


def main() -> int:
    ap = argparse.ArgumentParser(description='Fix package.json name to match project folder')
    ap.add_argument('--root', default=None, help='Project root (default: script directory)')
    ap.add_argument('--dry-run', action='store_true', help='Show suggested name without applying changes')
    args = ap.parse_args()

    script_dir = Path(__file__).resolve().parent
    repo_root = Path(args.root).resolve() if args.root else script_dir
    pkg_path = repo_root / 'package.json'

    data = load_package_json(pkg_path)
    if data is None:
        return 2

    current = data.get('name')
    expected_raw = repo_root.name
    expected = sanitize_name(expected_raw)

    print('Repository folder name:', repo_root.name)
    print('Sanitized expected package name:', expected)
    print('Current package.json name:', current)

    if current == expected:
        print('Name already matches. No changes needed.')
        return 0

    print('\nSuggested change:')
    print(f'  "name": "{current}" -> "{expected}"')

    if args.dry_run:
        print('\nDry run enabled. No file changes were made.')
        return 0

    data['name'] = expected
    success = write_package_json(pkg_path, data)
    return 0 if success else 3


if __name__ == '__main__':
    raise SystemExit(main())

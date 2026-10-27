// Keeps heavy, regenerable folders out of Google Drive sync.
//
// This project lives inside a Google Drive for desktop folder (macOS File Provider).
// Drive skips any folder carrying the `com.apple.fileprovider.ignore#P` extended attribute
// (verified on this machine on 2026-10-23: a marked folder was not uploaded, an unmarked one was).
// Runs before dev/build and after install; a no-op outside ~/Library/CloudStorage or off macOS.
import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { platform } from 'node:os';

const DIRS = ['node_modules', '.next'];

if (platform() === 'darwin' && process.cwd().includes('/Library/CloudStorage/')) {
  for (const dir of DIRS) {
    mkdirSync(dir, { recursive: true });
    try {
      execFileSync('xattr', ['-w', 'com.apple.fileprovider.ignore#P', '1', dir]);
    } catch (err) {
      console.warn(`[drive-ignore] could not mark ${dir}: ${err.message}`);
    }
  }
}

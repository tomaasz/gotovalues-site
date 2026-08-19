import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const repositoryRoot = path.resolve(import.meta.dirname, '..');
const retiredStaticArtifacts = [
  'index.html',
  'assets',
  'nginx',
  'tools',
  'scripts/smoke_headers.sh',
];

test('does not retain retired static-site artifacts beside the Next.js application', () => {
  for (const artifact of retiredStaticArtifacts) {
    assert.equal(existsSync(path.join(repositoryRoot, artifact)), false, `${artifact} must not remain in the Next.js repository`);
  }
});

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const root = path.resolve(import.meta.dirname, '..');
const workflow = (name: string) =>
  readFileSync(path.join(root, '.github', 'workflows', name), 'utf8');

test('stale workflow limits contents write to the branch-pruning job', () => {
  const source = workflow('stale.yml');
  assert.match(source, /^permissions:\n  contents: read$/m);
  assert.match(source, /prune-orphan-branches:[\s\S]*?permissions:\n      contents: write/);
});

test('automerge workflows reject pull requests from forks', () => {
  for (const name of ['dependabot-automerge.yml', 'bot-fixer-automerge.yml']) {
    assert.match(
      workflow(name),
      /github\.event\.pull_request\.head\.repo\.full_name\s*==\s*github\.repository/,
      `${name} must require the PR head repository to be this repository`,
    );
  }
});

test('Dependabot identity comes from the pull request author, not the triggering actor', () => {
  const source = workflow('dependabot-automerge.yml');
  assert.match(source, /github\.event\.pull_request\.user\.login\s*==\s*'dependabot\[bot\]'/);
  assert.doesNotMatch(source, /github\.actor\s*==\s*'dependabot\[bot\]'/);
});

test('dependabot merge uses the trusted numeric pull request identifier', () => {
  const source = workflow('dependabot-automerge.yml');
  assert.match(source, /PR_NUMBER:\s*\$\{\{\s*github\.event\.pull_request\.number\s*\}\}/);
  assert.doesNotMatch(source, /github\.event\.pull_request\.html_url/);
});

test('CI dependency installation prevents lifecycle scripts from running', () => {
  for (const name of ['ci.yml', 'sonarqube.yml']) {
    assert.match(workflow(name), /pnpm install --frozen-lockfile --ignore-scripts/);
  }
});

test('self-hosted SonarQube job never runs code from a fork', () => {
  assert.match(
    workflow('sonarqube.yml'),
    /sonarqube:[\s\S]*?if:\s*github\.event_name\s*!=\s*'pull_request'\s*\|\|\s*github\.event\.pull_request\.head\.repo\.full_name\s*==\s*github\.repository/,
  );
});

test('Dependency-Track upload passes repository metadata through the shell environment', () => {
  const source = workflow('sonarqube.yml');
  assert.match(source, /PROJECT_NAME:\s*\$\{\{ github\.event\.repository\.name \}\}/);
  assert.match(source, /PROJECT_VERSION:\s*\$\{\{ github\.sha \}\}/);
  assert.match(source, /-F "projectName=\$PROJECT_NAME"/);
  assert.match(source, /-F "projectVersion=\$PROJECT_VERSION"/);
  assert.doesNotMatch(source, /-F "projectName=\$\{\{/);
});

test('checkout actions are pinned and do not persist credentials', () => {
  for (const name of ['ci.yml', 'sonarqube.yml', 'stale.yml']) {
    const source = workflow(name);
    assert.match(source, /actions\/checkout@[0-9a-f]{40}/);
    assert.match(source, /persist-credentials: false/);
  }
});

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

test('dependabot automerge rejects pull requests from forks', () => {
  assert.match(
    workflow('dependabot-automerge.yml'),
    /github\.event\.pull_request\.head\.repo\.full_name\s*==\s*github\.repository/,
    'dependabot-automerge.yml must require the PR head repository to be this repository',
  );
});

test('bot-fixer automerge rejects pull requests from forks', () => {
  const source = workflow('bot-fixer-automerge.yml');
  // workflow_run has no pull_request payload to guard on, so the head
  // repository is compared inside the script instead.
  assert.match(source, /REPO_FULL_NAME:\s*\$\{\{\s*github\.repository\s*\}\}/);
  assert.match(source, /pr\.head\.repo\.full_name\s*!==\s*process\.env\.REPO_FULL_NAME/);
});

test('bot-fixer automerge gates the merge on finished checks, not on branch protection', () => {
  const source = workflow('bot-fixer-automerge.yml');
  assert.match(source, /^on:\n  workflow_run:/m);
  assert.match(source, /github\.event\.workflow_run\.conclusion\s*==\s*'success'/);
  assert.match(source, /checks\.listForRef/);
  // `--auto` defers to required status checks, which main does not have;
  // it merged bot PRs the moment they opened. Prose in comments may still
  // name the flag, so only the command line itself is checked.
  assert.doesNotMatch(source, /gh pr merge[^\n]*--auto/);
  assert.doesNotMatch(source, /^\s+pull_request_target:/m);
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

test('dependabot merge resolves the repository from the workflow environment', () => {
  const source = workflow('dependabot-automerge.yml');
  assert.match(source, /GH_REPO:\s*\$\{\{\s*github\.repository\s*\}\}/);
  assert.doesNotMatch(source, /gh pr merge[^\n]*\$\{\{/);
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
  assert.match(source, /-H "X-Api-Key: \$DEPTRACK_API_KEY"/);
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

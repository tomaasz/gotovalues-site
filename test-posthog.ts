import { PostHog } from 'posthog-js';

const ph: PostHog = {} as PostHog;
const p = 'capture';
const a: unknown[] = [];

const targetMethod = (ph as unknown as Record<string, unknown>)[p];
if (typeof targetMethod === 'function') {
  targetMethod.apply(ph, a);
}

#!/usr/bin/env node

import { actionsGenReadme } from '../dist/index.js';

try {
  await actionsGenReadme();
} catch (err) {
  console.error(err);
}

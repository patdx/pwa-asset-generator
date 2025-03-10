#!/usr/bin/env node

import { $ } from 'zx'
$.verbose = true

await $`browsers install chromium`

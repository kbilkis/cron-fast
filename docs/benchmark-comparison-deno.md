# Benchmark & Feature Comparison

> Tested with deno v2.6.8, cron-fast v1.0.0, croner v10.0.1, cron-parser v5.5.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Tested with 1 second per test.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~296k       | baseline     |
| cron-schedule | ~373k       | 1.3x slower  |
| croner        | ~25k        | 12.0x faster |
| cron-parser   | ~24k        | 12.3x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~364k       | baseline     |
| cron-schedule | ~409k       | 1.1x slower  |
| croner        | ~29k        | 12.4x faster |
| cron-parser   | ~26k        | 14.0x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~498k       | baseline     |
| cron-validate | ~588k       | 1.2x slower  |
| cron-schedule | ~447k       | 1.1x faster  |
| cron-parser   | ~89k        | 5.6x faster  |
| croner        | ~29k        | 17.3x faster |

### Parsing

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~522k       | baseline     |
| cron-validate | ~628k       | 1.2x slower  |
| cron-schedule | ~479k       | 1.1x faster  |
| cron-parser   | ~89k        | 5.9x faster  |
| croner        | ~32k        | 16.5x faster |

**Note**: cron-validate is validation-only (no scheduling), which explains its speed advantage in parsing/validation. It only checks syntax without calculating dates or handling timezones, making it significantly faster for validation-only use cases.

Run benchmarks yourself: `pnpm benchmark:deno`

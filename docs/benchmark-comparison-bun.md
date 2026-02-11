# Benchmark & Feature Comparison

> Tested with bun v1.3.9, cron-fast v0.3.0, croner v10.0.1, cron-parser v5.5.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Tested with 1 second per test.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~282k       | baseline     |
| cron-schedule | ~298k       | 1.1x slower  |
| croner        | ~51k        | 5.5x faster  |
| cron-parser   | ~32k        | 8.7x faster  |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~276k       | baseline     |
| cron-schedule | ~311k       | 1.1x slower  |
| croner        | ~50k        | 5.5x faster  |
| cron-parser   | ~29k        | 9.4x faster  |

### Validation

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~347k       | baseline     |
| cron-validate | ~914k       | 2.6x slower  |
| cron-schedule | ~335k       | 1.0x faster  |
| cron-parser   | ~114k       | 3.0x faster  |
| croner        | ~55k        | 6.3x faster  |

### Parsing

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~344k       | baseline     |
| cron-validate | ~915k       | 2.7x slower  |
| cron-schedule | ~336k       | 1.0x faster  |
| cron-parser   | ~114k       | 3.0x faster  |
| croner        | ~54k        | 6.4x faster  |

**Note**: cron-validate is validation-only (no scheduling), which explains its speed advantage in parsing/validation. It only checks syntax without calculating dates or handling timezones, making it significantly faster for validation-only use cases.

Run benchmarks yourself: `pnpm benchmark:bun`

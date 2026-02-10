# Benchmark & Feature Comparison

> Tested with cron-fast v0.1.3, croner v10.0.1, cron-parser v5.5.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Test on MacBook M1 pro

## Performance Benchmarks

Tested with 1 second per test.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~368k       | baseline     |
| cron-schedule | ~385k       | 1.0x slower  |
| croner        | ~29k        | 12.7x faster |
| cron-parser   | ~30k        | 12.4x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~368k       | baseline     |
| cron-schedule | ~384k       | 1.0x slower  |
| croner        | ~29k        | 12.7x faster |
| cron-parser   | ~27k        | 13.5x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~486k       | baseline     |
| cron-validate | ~675k       | 1.4x slower  |
| cron-schedule | ~452k       | 1.1x faster  |
| cron-parser   | ~89k        | 5.5x faster  |
| croner        | ~31k        | 15.9x faster |

### Parsing

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~541k       | baseline     |
| cron-validate | ~686k       | 1.3x slower  |
| cron-schedule | ~475k       | 1.1x faster  |
| cron-parser   | ~96k        | 5.7x faster  |
| croner        | ~32k        | 16.7x faster |

**Note**: cron-validate is validation-only (no scheduling), which explains its speed advantage in parsing/validation. It only checks syntax without calculating dates or handling timezones, making it significantly faster for validation-only use cases.

Run benchmarks yourself: `pnpm benchmark`

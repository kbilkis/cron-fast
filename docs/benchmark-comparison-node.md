# Benchmark & Feature Comparison

> Tested with node v22.18.0, cron-fast v0.3.0, croner v10.0.1, cron-parser v5.5.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Tested with 1 second per test.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~354k       | baseline     |
| cron-schedule | ~387k       | 1.1x slower  |
| croner        | ~29k        | 12.3x faster |
| cron-parser   | ~29k        | 12.3x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~353k       | baseline     |
| cron-schedule | ~343k       | 1.0x faster  |
| croner        | ~29k        | 12.2x faster |
| cron-parser   | ~25k        | 13.9x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~545k       | baseline     |
| cron-validate | ~676k       | 1.2x slower  |
| cron-schedule | ~473k       | 1.2x faster  |
| cron-parser   | ~94k        | 5.8x faster  |
| croner        | ~33k        | 16.6x faster |

### Parsing

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~517k       | baseline     |
| cron-validate | ~619k       | 1.2x slower  |
| cron-schedule | ~465k       | 1.1x faster  |
| cron-parser   | ~93k        | 5.6x faster  |
| croner        | ~32k        | 16.2x faster |

**Note**: cron-validate is validation-only (no scheduling), which explains its speed advantage in parsing/validation. It only checks syntax without calculating dates or handling timezones, making it significantly faster for validation-only use cases.

Run benchmarks yourself: `pnpm benchmark`

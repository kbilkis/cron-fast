# Benchmark & Feature Comparison

> Tested with node v22.18.0, cron-fast v1.0.0, croner v10.0.1, cron-parser v5.5.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Tested with 1 second per test.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~342k       | baseline     |
| cron-schedule | ~353k       | 1.0x slower  |
| croner        | ~26k        | 13.0x faster |
| cron-parser   | ~27k        | 12.5x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~371k       | baseline     |
| cron-schedule | ~380k       | 1.0x slower  |
| croner        | ~30k        | 12.3x faster |
| cron-parser   | ~28k        | 13.1x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~544k       | baseline     |
| cron-validate | ~654k       | 1.2x slower  |
| cron-schedule | ~452k       | 1.2x faster  |
| cron-parser   | ~94k        | 5.8x faster  |
| croner        | ~33k        | 16.7x faster |

### Parsing

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~540k       | baseline     |
| cron-validate | ~659k       | 1.2x slower  |
| cron-schedule | ~452k       | 1.2x faster  |
| cron-parser   | ~96k        | 5.6x faster  |
| croner        | ~33k        | 16.4x faster |

**Note**: cron-validate is validation-only (no scheduling), which explains its speed advantage in parsing/validation. It only checks syntax without calculating dates or handling timezones, making it significantly faster for validation-only use cases.

Run benchmarks yourself: `pnpm benchmark`

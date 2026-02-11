# Benchmark & Feature Comparison

> Tested with deno v2.6.8, cron-fast v0.3.0, croner v10.0.1, cron-parser v5.5.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Tested with 1 second per test.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~363k       | baseline     |
| cron-schedule | ~424k       | 1.2x slower  |
| croner        | ~31k        | 11.7x faster |
| cron-parser   | ~30k        | 12.0x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~377k       | baseline     |
| cron-schedule | ~431k       | 1.1x slower  |
| croner        | ~31k        | 12.2x faster |
| cron-parser   | ~29k        | 12.9x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~539k       | baseline     |
| cron-validate | ~630k       | 1.2x slower  |
| cron-schedule | ~483k       | 1.1x faster  |
| cron-parser   | ~96k        | 5.6x faster  |
| croner        | ~33k        | 16.2x faster |

### Parsing

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~537k       | baseline     |
| cron-validate | ~631k       | 1.2x slower  |
| cron-schedule | ~486k       | 1.1x faster  |
| cron-parser   | ~96k        | 5.6x faster  |
| croner        | ~33k        | 16.2x faster |

**Note**: cron-validate is validation-only (no scheduling), which explains its speed advantage in parsing/validation. It only checks syntax without calculating dates or handling timezones, making it significantly faster for validation-only use cases.

Run benchmarks yourself: `pnpm benchmark:deno`

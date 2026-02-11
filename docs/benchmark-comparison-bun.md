# Benchmark & Feature Comparison

> Tested with bun v1.3.9, cron-fast v1.0.0, croner v10.0.1, cron-parser v5.5.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Tested with 1 second per test.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~286k       | baseline     |
| cron-schedule | ~321k       | 1.1x slower  |
| croner        | ~53k        | 5.4x faster  |
| cron-parser   | ~34k        | 8.5x faster  |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~295k       | baseline     |
| cron-schedule | ~324k       | 1.1x slower  |
| croner        | ~55k        | 5.4x faster  |
| cron-parser   | ~31k        | 9.5x faster  |

### Validation

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~352k       | baseline     |
| cron-validate | ~946k       | 2.7x slower  |
| cron-schedule | ~355k       | 1.0x slower  |
| cron-parser   | ~118k       | 3.0x faster  |
| croner        | ~58k        | 6.1x faster  |

### Parsing

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~352k       | baseline     |
| cron-validate | ~941k       | 2.7x slower  |
| cron-schedule | ~353k       | 1.0x slower  |
| cron-parser   | ~114k       | 3.1x faster  |
| croner        | ~58k        | 6.1x faster  |

**Note**: cron-validate is validation-only (no scheduling), which explains its speed advantage in parsing/validation. It only checks syntax without calculating dates or handling timezones, making it significantly faster for validation-only use cases.

Run benchmarks yourself: `pnpm benchmark:bun`

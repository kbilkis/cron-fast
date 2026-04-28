# Benchmark

> Tested with deno v2.6.8, cron-fast v3.1.1, croner v10.0.1, cron-parser v5.5.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Tested with 1 second per test.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~803k       | baseline     |
| cron-schedule | ~352k       | 2.3x faster  |
| croner        | ~31k        | 26.1x faster |
| cron-parser   | ~33k        | 24.1x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~920k       | baseline     |
| cron-schedule | ~380k       | 2.4x faster  |
| croner        | ~31k        | 29.9x faster |
| cron-parser   | ~38k        | 24.0x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1865k      | baseline     |
| cron-validate | ~624k       | 3.0x faster  |
| cron-schedule | ~475k       | 3.9x faster  |
| cron-parser   | ~97k        | 19.2x faster |
| croner        | ~33k        | 56.3x faster |

### Parsing

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1788k      | baseline     |
| cron-validate | ~607k       | 2.9x faster  |
| cron-schedule | ~471k       | 3.8x faster  |
| cron-parser   | ~96k        | 18.6x faster |
| croner        | ~33k        | 54.7x faster |

Run benchmarks yourself: `pnpm benchmark:deno`

## Detailed Per-Test Results

### Next Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |    ~1367k |       ~143k ✓ | ~32k ✓ |      ~32k ✓ |
| Sparse: First of month      |     ~711k |       ~470k ✓ | ~32k ✓ |      ~18k ✓ |
| Sparse: 31st (skips months) |     ~638k |       ~473k ✓ | ~31k ✓ |       ~7k ✓ |
| Step: Every 15 minutes      |     ~870k |       ~260k ✓ | ~33k ✓ |      ~56k ✓ |
| Specific: 9 AM daily        |     ~934k |       ~340k ✓ | ~32k ✓ |      ~43k ✓ |
| OR-mode: 15th OR Monday     |     ~427k |         ~468k | ~30k ✓ |      ~33k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~675k |       ~308k ✓ | ~26k ✓ |      ~44k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |    ~1408k |       ~182k ✓ | ~32k ✓ |      ~36k ✓ |
| Sparse: First of month      |     ~909k |       ~509k ✓ | ~30k ✓ |       ~8k ✓ |
| Sparse: 31st (skips months) |     ~624k |       ~446k ✓ | ~29k ✓ |       ~8k ✓ |
| Step: Every 15 minutes      |     ~862k |       ~264k ✓ | ~32k ✓ |      ~57k ✓ |
| Specific: 9 AM daily        |     ~960k |       ~347k ✓ | ~32k ✓ |      ~49k ✓ |
| OR-mode: 15th OR Monday     |     ~894k |       ~573k ✓ | ~31k ✓ |      ~65k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~786k |       ~339k ✓ | ~28k ✓ |      ~45k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |    ~2213k |       ~197k ✓ |      ~46k ✓ | ~34k ✓ |       ~599k ✓ |
| 0 0 1 \* \*     |    ~2125k |       ~625k ✓ |     ~127k ✓ | ~34k ✓ |       ~645k ✓ |
| 0 12 31 \* \*   |    ~1775k |       ~620k ✓ |     ~126k ✓ | ~33k ✓ |       ~612k ✓ |
| _/15 _ \* \* \* |    ~1581k |       ~288k ✓ |      ~67k ✓ | ~33k ✓ |       ~672k ✓ |
| 0 9 \* \* \*    |    ~2194k |       ~409k ✓ |      ~88k ✓ | ~33k ✓ |       ~621k ✓ |
| 0 9 15 \* 1     |    ~1789k |       ~786k ✓ |     ~141k ✓ | ~34k ✓ |       ~629k ✓ |
| 0 9 \* \* 1-5   |    ~1377k |       ~398k ✓ |      ~84k ✓ | ~31k ✓ |       ~592k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |    ~1912k |       ~192k ✓ |      ~43k ✓ | ~33k ✓ |       ~580k ✓ |
| 0 0 1 \* \*     |    ~1855k |       ~611k ✓ |     ~125k ✓ | ~31k ✓ |       ~616k ✓ |
| 0 12 31 \* \*   |    ~1756k |       ~624k ✓ |     ~125k ✓ | ~33k ✓ |       ~599k ✓ |
| _/15 _ \* \* \* |    ~1650k |       ~286k ✓ |      ~68k ✓ | ~33k ✓ |       ~639k ✓ |
| 0 9 \* \* \*    |    ~2225k |       ~402k ✓ |      ~86k ✓ | ~33k ✓ |       ~599k ✓ |
| 0 9 15 \* 1     |    ~1762k |       ~782k ✓ |     ~139k ✓ | ~33k ✓ |       ~628k ✓ |
| 0 9 \* \* 1-5   |    ~1357k |       ~403k ✓ |      ~89k ✓ | ~31k ✓ |       ~588k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

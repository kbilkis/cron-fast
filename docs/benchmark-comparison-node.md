# Benchmark

> Tested with node v22.18.0, cron-fast v3.1.0, croner v10.0.1, cron-parser v5.5.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Tested with 1 second per test.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~671k       | baseline     |
| cron-schedule | ~287k       | 2.3x faster  |
| croner        | ~25k        | 26.5x faster |
| cron-parser   | ~28k        | 24.3x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~856k       | baseline     |
| cron-schedule | ~332k       | 2.6x faster  |
| croner        | ~31k        | 27.9x faster |
| cron-parser   | ~35k        | 24.3x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1785k      | baseline     |
| cron-validate | ~654k       | 2.7x faster  |
| cron-schedule | ~452k       | 4.0x faster  |
| cron-parser   | ~90k        | 19.8x faster |
| croner        | ~33k        | 54.6x faster |

### Parsing

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1765k      | baseline     |
| cron-validate | ~637k       | 2.8x faster  |
| cron-schedule | ~427k       | 4.1x faster  |
| cron-parser   | ~90k        | 19.6x faster |
| croner        | ~32k        | 55.2x faster |

Run benchmarks yourself: `pnpm benchmark`

## Detailed Per-Test Results

### Next Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |    ~1171k |       ~126k ✓ | ~19k ✓ |      ~23k ✓ |
| Sparse: First of month      |     ~589k |       ~378k ✓ | ~26k ✓ |      ~15k ✓ |
| Sparse: 31st (skips months) |     ~562k |       ~374k ✓ | ~25k ✓ |       ~6k ✓ |
| Step: Every 15 minutes      |     ~697k |       ~211k ✓ | ~27k ✓ |      ~46k ✓ |
| Specific: 9 AM daily        |     ~651k |       ~252k ✓ | ~25k ✓ |      ~32k ✓ |
| OR-mode: 15th OR Monday     |     ~340k |       ~396k ✗ | ~28k ✓ |      ~32k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~691k |       ~269k ✓ | ~28k ✓ |      ~40k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |    ~1327k |       ~164k ✓ | ~31k ✓ |      ~32k ✓ |
| Sparse: First of month      |     ~859k |       ~446k ✓ | ~30k ✓ |       ~8k ✓ |
| Sparse: 31st (skips months) |     ~620k |       ~367k ✓ | ~29k ✓ |       ~7k ✓ |
| Step: Every 15 minutes      |     ~756k |       ~236k ✓ | ~31k ✓ |      ~51k ✓ |
| Specific: 9 AM daily        |     ~892k |       ~329k ✓ | ~32k ✓ |      ~45k ✓ |
| OR-mode: 15th OR Monday     |     ~785k |       ~477k ✓ | ~31k ✓ |      ~57k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~750k |       ~303k ✓ | ~30k ✓ |      ~47k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |    ~1985k |       ~191k ✓ |      ~44k ✓ | ~34k ✓ |       ~622k ✓ |
| 0 0 1 \* \*     |    ~2038k |       ~610k ✓ |     ~114k ✓ | ~33k ✓ |       ~676k ✓ |
| 0 12 31 \* \*   |    ~1772k |       ~592k ✓ |     ~114k ✓ | ~32k ✓ |       ~653k ✓ |
| _/15 _ \* \* \* |    ~1506k |       ~275k ✓ |      ~63k ✓ | ~33k ✓ |       ~687k ✓ |
| 0 9 \* \* \*    |    ~2086k |       ~387k ✓ |      ~82k ✓ | ~32k ✓ |       ~636k ✓ |
| 0 9 15 \* 1     |    ~1731k |       ~724k ✓ |     ~129k ✓ | ~33k ✓ |       ~666k ✓ |
| 0 9 \* \* 1-5   |    ~1376k |       ~382k ✓ |      ~84k ✓ | ~32k ✓ |       ~636k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |    ~2057k |       ~179k ✓ |      ~41k ✓ | ~32k ✓ |       ~628k ✓ |
| 0 0 1 \* \*     |    ~1987k |       ~588k ✓ |     ~115k ✓ | ~30k ✓ |       ~671k ✓ |
| 0 12 31 \* \*   |    ~1752k |       ~592k ✓ |     ~117k ✓ | ~33k ✓ |       ~603k ✓ |
| _/15 _ \* \* \* |    ~1603k |       ~279k ✓ |      ~64k ✓ | ~34k ✓ |       ~692k ✓ |
| 0 9 \* \* \*    |    ~1919k |       ~366k ✓ |      ~81k ✓ | ~33k ✓ |       ~646k ✓ |
| 0 9 15 \* 1     |    ~1741k |       ~639k ✓ |     ~132k ✓ | ~33k ✓ |       ~594k ✓ |
| 0 9 \* \* 1-5   |    ~1293k |       ~348k ✓ |      ~80k ✓ | ~29k ✓ |       ~627k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

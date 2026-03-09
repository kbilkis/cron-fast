# Benchmark & Feature Comparison

> Tested with deno v2.6.8, cron-fast v2.3.0, croner v10.0.1, cron-parser v5.5.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Tested with 1 second per test.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~894k       | baseline     |
| cron-schedule | ~400k       | 2.2x faster  |
| croner        | ~31k        | 28.5x faster |
| cron-parser   | ~35k        | 25.2x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1014k      | baseline     |
| cron-schedule | ~427k       | 2.4x faster  |
| croner        | ~32k        | 32.0x faster |
| cron-parser   | ~41k        | 24.7x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1923k      | baseline     |
| cron-validate | ~660k       | 2.9x faster  |
| cron-schedule | ~463k       | 4.2x faster  |
| cron-parser   | ~101k       | 19.1x faster |
| croner        | ~34k        | 57.3x faster |

### Parsing

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1931k      | baseline     |
| cron-validate | ~668k       | 2.9x faster  |
| cron-schedule | ~482k       | 4.0x faster  |
| cron-parser   | ~103k       | 18.7x faster |
| croner        | ~34k        | 57.4x faster |

Run benchmarks yourself: `pnpm benchmark:deno`

## Detailed Per-Test Results

### Next Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |    ~1381k |       ~149k ✓ | ~32k ✓ |      ~33k ✓ |
| Sparse: First of month      |     ~829k |       ~543k ✓ | ~32k ✓ |      ~19k ✓ |
| Sparse: 31st (skips months) |     ~744k |       ~531k ✓ | ~30k ✓ |       ~7k ✓ |
| Step: Every 15 minutes      |     ~932k |       ~267k ✓ | ~33k ✓ |      ~57k ✓ |
| Specific: 9 AM daily        |    ~1044k |       ~370k ✓ | ~32k ✓ |      ~45k ✓ |
| OR-mode: 15th OR Monday     |     ~523k |         ~581k | ~30k ✓ |      ~40k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~809k |       ~362k ✓ | ~30k ✓ |      ~46k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |    ~1430k |       ~192k ✓ | ~33k ✓ |      ~37k ✓ |
| Sparse: First of month      |    ~1023k |       ~583k ✓ | ~32k ✓ |       ~9k ✓ |
| Sparse: 31st (skips months) |     ~757k |       ~520k ✓ | ~32k ✓ |       ~9k ✓ |
| Step: Every 15 minutes      |     ~931k |       ~277k ✓ | ~32k ✓ |      ~59k ✓ |
| Specific: 9 AM daily        |    ~1074k |       ~386k ✓ | ~33k ✓ |      ~53k ✓ |
| OR-mode: 15th OR Monday     |    ~1016k |       ~658k ✓ | ~31k ✓ |      ~67k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~867k |       ~378k ✓ | ~31k ✓ |      ~54k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |    ~2216k |       ~200k ✓ |      ~47k ✓ | ~34k ✓ |       ~620k ✓ |
| 0 0 1 \* \*     |    ~2222k |       ~540k ✓ |     ~132k ✓ | ~34k ✓ |       ~669k ✓ |
| 0 12 31 \* \*   |    ~1806k |       ~625k ✓ |     ~133k ✓ | ~34k ✓ |       ~648k ✓ |
| _/15 _ \* \* \* |    ~1653k |       ~292k ✓ |      ~68k ✓ | ~33k ✓ |       ~714k ✓ |
| 0 9 \* \* \*    |    ~2278k |       ~407k ✓ |      ~93k ✓ | ~35k ✓ |       ~645k ✓ |
| 0 9 15 \* 1     |    ~1859k |       ~769k ✓ |     ~137k ✓ | ~31k ✓ |       ~682k ✓ |
| 0 9 \* \* 1-5   |    ~1423k |       ~409k ✓ |      ~95k ✓ | ~34k ✓ |       ~645k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |    ~2214k |       ~199k ✓ |      ~47k ✓ | ~32k ✓ |       ~622k ✓ |
| 0 0 1 \* \*     |    ~2182k |       ~637k ✓ |     ~133k ✓ | ~34k ✓ |       ~678k ✓ |
| 0 12 31 \* \*   |    ~1835k |       ~624k ✓ |     ~132k ✓ | ~33k ✓ |       ~669k ✓ |
| _/15 _ \* \* \* |    ~1675k |       ~291k ✓ |      ~72k ✓ | ~33k ✓ |       ~717k ✓ |
| 0 9 \* \* \*    |    ~2307k |       ~404k ✓ |      ~93k ✓ | ~35k ✓ |       ~648k ✓ |
| 0 9 15 \* 1     |    ~1868k |       ~805k ✓ |     ~149k ✓ | ~35k ✓ |       ~693k ✓ |
| 0 9 \* \* 1-5   |    ~1437k |       ~413k ✓ |      ~96k ✓ | ~34k ✓ |       ~651k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

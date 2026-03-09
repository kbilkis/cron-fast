# Benchmark & Feature Comparison

> Tested with node v22.18.0, cron-fast v2.3.0, croner v10.0.1, cron-parser v5.5.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Tested with 1 second per test.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~913k       | baseline     |
| cron-schedule | ~381k       | 2.4x faster  |
| croner        | ~31k        | 29.1x faster |
| cron-parser   | ~33k        | 27.4x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~991k       | baseline     |
| cron-schedule | ~391k       | 2.5x faster  |
| croner        | ~30k        | 32.6x faster |
| cron-parser   | ~38k        | 26.4x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1899k      | baseline     |
| cron-validate | ~656k       | 2.9x faster  |
| cron-schedule | ~452k       | 4.2x faster  |
| cron-parser   | ~94k        | 20.2x faster |
| croner        | ~33k        | 57.9x faster |

### Parsing

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1913k      | baseline     |
| cron-validate | ~665k       | 2.9x faster  |
| cron-schedule | ~447k       | 4.3x faster  |
| cron-parser   | ~95k        | 20.2x faster |
| croner        | ~33k        | 58.1x faster |

Run benchmarks yourself: `pnpm benchmark`

## Detailed Per-Test Results

### Next Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |    ~1445k |       ~178k ✓ | ~32k ✓ |      ~32k ✓ |
| Sparse: First of month      |     ~877k |       ~509k ✓ | ~32k ✓ |      ~19k ✓ |
| Sparse: 31st (skips months) |     ~813k |       ~512k ✓ | ~30k ✓ |       ~8k ✓ |
| Step: Every 15 minutes      |     ~939k |       ~270k ✓ | ~34k ✓ |      ~56k ✓ |
| Specific: 9 AM daily        |    ~1032k |       ~360k ✓ | ~34k ✓ |      ~43k ✓ |
| OR-mode: 15th OR Monday     |     ~520k |         ~515k | ~31k ✓ |      ~34k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~764k |       ~323k ✓ | ~27k ✓ |      ~41k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |    ~1410k |       ~181k ✓ | ~32k ✓ |      ~34k ✓ |
| Sparse: First of month      |    ~1012k |       ~541k ✓ | ~29k ✓ |       ~8k ✓ |
| Sparse: 31st (skips months) |     ~783k |       ~479k ✓ | ~31k ✓ |       ~8k ✓ |
| Step: Every 15 minutes      |     ~868k |       ~263k ✓ | ~31k ✓ |      ~56k ✓ |
| Specific: 9 AM daily        |    ~1043k |       ~361k ✓ | ~30k ✓ |      ~48k ✓ |
| OR-mode: 15th OR Monday     |     ~979k |       ~585k ✓ | ~31k ✓ |      ~62k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~844k |       ~329k ✓ | ~29k ✓ |      ~47k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |    ~2187k |       ~179k ✓ |      ~44k ✓ | ~33k ✓ |       ~593k ✓ |
| 0 0 1 \* \*     |    ~2194k |       ~601k ✓ |     ~120k ✓ | ~32k ✓ |       ~656k ✓ |
| 0 12 31 \* \*   |    ~1754k |       ~590k ✓ |     ~117k ✓ | ~31k ✓ |       ~650k ✓ |
| _/15 _ \* \* \* |    ~1632k |       ~277k ✓ |      ~66k ✓ | ~33k ✓ |       ~696k ✓ |
| 0 9 \* \* \*    |    ~2251k |       ~374k ✓ |      ~84k ✓ | ~33k ✓ |       ~657k ✓ |
| 0 9 15 \* 1     |    ~1826k |       ~748k ✓ |     ~138k ✓ | ~33k ✓ |       ~692k ✓ |
| 0 9 \* \* 1-5   |    ~1447k |       ~396k ✓ |      ~88k ✓ | ~33k ✓ |       ~650k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |    ~2220k |       ~190k ✓ |      ~45k ✓ | ~34k ✓ |       ~657k ✓ |
| 0 0 1 \* \*     |    ~2217k |       ~615k ✓ |     ~123k ✓ | ~34k ✓ |       ~676k ✓ |
| 0 12 31 \* \*   |    ~1841k |       ~625k ✓ |     ~121k ✓ | ~33k ✓ |       ~664k ✓ |
| _/15 _ \* \* \* |    ~1629k |       ~281k ✓ |      ~66k ✓ | ~32k ✓ |       ~717k ✓ |
| 0 9 \* \* \*    |    ~2259k |       ~333k ✓ |      ~82k ✓ | ~31k ✓ |       ~636k ✓ |
| 0 9 15 \* 1     |    ~1800k |       ~713k ✓ |     ~138k ✓ | ~33k ✓ |       ~673k ✓ |
| 0 9 \* \* 1-5   |    ~1424k |       ~375k ✓ |      ~87k ✓ | ~33k ✓ |       ~634k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

# Benchmark

> Tested with deno v2.6.8, cron-fast v3.0.0, croner v10.0.1, cron-parser v5.5.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Tested with 1 second per test.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~870k       | baseline     |
| cron-schedule | ~398k       | 2.2x faster  |
| croner        | ~31k        | 28.5x faster |
| cron-parser   | ~33k        | 26.0x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~974k       | baseline     |
| cron-schedule | ~414k       | 2.4x faster  |
| croner        | ~31k        | 31.9x faster |
| cron-parser   | ~38k        | 25.7x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1841k      | baseline     |
| cron-validate | ~626k       | 2.9x faster  |
| cron-schedule | ~463k       | 4.0x faster  |
| cron-parser   | ~97k        | 18.9x faster |
| croner        | ~33k        | 55.4x faster |

### Parsing

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1873k      | baseline     |
| cron-validate | ~634k       | 3.0x faster  |
| cron-schedule | ~472k       | 4.0x faster  |
| cron-parser   | ~98k        | 19.2x faster |
| croner        | ~34k        | 55.3x faster |

Run benchmarks yourself: `pnpm benchmark:deno`

## Detailed Per-Test Results

### Next Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |    ~1357k |       ~148k ✓ | ~32k ✓ |      ~32k ✓ |
| Sparse: First of month      |     ~805k |       ~536k ✓ | ~30k ✓ |      ~18k ✓ |
| Sparse: 31st (skips months) |     ~737k |       ~536k ✓ | ~31k ✓ |       ~7k ✓ |
| Step: Every 15 minutes      |     ~934k |       ~275k ✓ | ~33k ✓ |      ~55k ✓ |
| Specific: 9 AM daily        |     ~997k |       ~364k ✓ | ~31k ✓ |      ~42k ✓ |
| OR-mode: 15th OR Monday     |     ~486k |       ~581k ✗ | ~28k ✓ |      ~36k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~778k |       ~342k ✓ | ~29k ✓ |      ~43k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |    ~1418k |       ~181k ✓ | ~31k ✓ |      ~35k ✓ |
| Sparse: First of month      |     ~988k |       ~564k ✓ | ~30k ✓ |       ~9k ✓ |
| Sparse: 31st (skips months) |     ~725k |       ~508k ✓ | ~31k ✓ |       ~8k ✓ |
| Step: Every 15 minutes      |     ~911k |       ~272k ✓ | ~32k ✓ |      ~54k ✓ |
| Specific: 9 AM daily        |    ~1017k |       ~363k ✓ | ~30k ✓ |      ~48k ✓ |
| OR-mode: 15th OR Monday     |     ~944k |       ~648k ✓ | ~30k ✓ |      ~62k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~816k |       ~358k ✓ | ~29k ✓ |      ~49k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |    ~2158k |       ~198k ✓ |      ~45k ✓ | ~33k ✓ |       ~582k ✓ |
| 0 0 1 \* \*     |    ~2065k |       ~602k ✓ |     ~125k ✓ | ~34k ✓ |       ~624k ✓ |
| 0 12 31 \* \*   |    ~1737k |       ~599k ✓ |     ~126k ✓ | ~33k ✓ |       ~636k ✓ |
| _/15 _ \* \* \* |    ~1660k |       ~285k ✓ |      ~66k ✓ | ~34k ✓ |       ~664k ✓ |
| 0 9 \* \* \*    |    ~2176k |       ~399k ✓ |      ~87k ✓ | ~33k ✓ |       ~608k ✓ |
| 0 9 15 \* 1     |    ~1736k |       ~759k ✓ |     ~142k ✓ | ~33k ✓ |       ~661k ✓ |
| 0 9 \* \* 1-5   |    ~1357k |       ~402k ✓ |      ~90k ✓ | ~32k ✓ |       ~604k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |    ~2128k |       ~200k ✓ |      ~46k ✓ | ~33k ✓ |       ~605k ✓ |
| 0 0 1 \* \*     |    ~2130k |       ~606k ✓ |     ~128k ✓ | ~34k ✓ |       ~643k ✓ |
| 0 12 31 \* \*   |    ~1777k |       ~616k ✓ |     ~125k ✓ | ~34k ✓ |       ~637k ✓ |
| _/15 _ \* \* \* |    ~1693k |       ~285k ✓ |      ~68k ✓ | ~34k ✓ |       ~675k ✓ |
| 0 9 \* \* \*    |    ~2241k |       ~406k ✓ |      ~89k ✓ | ~34k ✓ |       ~615k ✓ |
| 0 9 15 \* 1     |    ~1767k |       ~786k ✓ |     ~137k ✓ | ~34k ✓ |       ~652k ✓ |
| 0 9 \* \* 1-5   |    ~1377k |       ~405k ✓ |      ~90k ✓ | ~33k ✓ |       ~614k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

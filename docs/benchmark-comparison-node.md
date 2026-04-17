# Benchmark

> Tested with node v22.18.0, cron-fast v3.0.0, croner v10.0.1, cron-parser v5.5.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Tested with 1 second per test.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~911k       | baseline     |
| cron-schedule | ~352k       | 2.6x faster  |
| croner        | ~31k        | 29.6x faster |
| cron-parser   | ~34k        | 27.1x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1003k      | baseline     |
| cron-schedule | ~399k       | 2.5x faster  |
| croner        | ~32k        | 31.6x faster |
| cron-parser   | ~39k        | 25.8x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1958k      | baseline     |
| cron-validate | ~680k       | 2.9x faster  |
| cron-schedule | ~462k       | 4.2x faster  |
| cron-parser   | ~97k        | 20.2x faster |
| croner        | ~34k        | 56.9x faster |

### Parsing

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1982k      | baseline     |
| cron-validate | ~690k       | 2.9x faster  |
| cron-schedule | ~469k       | 4.2x faster  |
| cron-parser   | ~98k        | 20.2x faster |
| croner        | ~35k        | 57.3x faster |

Run benchmarks yourself: `pnpm benchmark`

## Detailed Per-Test Results

### Next Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |    ~1422k |       ~180k ✓ | ~31k ✓ |      ~32k ✓ |
| Sparse: First of month      |     ~854k |       ~509k ✓ | ~31k ✓ |      ~17k ✓ |
| Sparse: 31st (skips months) |     ~806k |       ~509k ✓ | ~28k ✓ |       ~7k ✓ |
| Step: Every 15 minutes      |     ~940k |       ~258k ✓ | ~32k ✓ |      ~54k ✓ |
| Specific: 9 AM daily        |    ~1013k |       ~356k ✓ | ~33k ✓ |      ~43k ✓ |
| OR-mode: 15th OR Monday     |     ~519k |         ~549k | ~31k ✓ |      ~38k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~823k |       ~104k ✓ | ~30k ✓ |      ~44k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |    ~1324k |       ~184k ✓ | ~31k ✓ |      ~36k ✓ |
| Sparse: First of month      |    ~1019k |       ~545k ✓ | ~31k ✓ |       ~9k ✓ |
| Sparse: 31st (skips months) |     ~786k |       ~478k ✓ | ~31k ✓ |       ~8k ✓ |
| Step: Every 15 minutes      |     ~932k |       ~264k ✓ | ~33k ✓ |      ~56k ✓ |
| Specific: 9 AM daily        |    ~1066k |       ~365k ✓ | ~33k ✓ |      ~49k ✓ |
| OR-mode: 15th OR Monday     |    ~1027k |       ~610k ✓ | ~32k ✓ |      ~64k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~864k |       ~350k ✓ | ~31k ✓ |      ~50k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |    ~2218k |       ~195k ✓ |      ~46k ✓ | ~35k ✓ |       ~653k ✓ |
| 0 0 1 \* \*     |    ~2141k |       ~612k ✓ |     ~124k ✓ | ~33k ✓ |       ~673k ✓ |
| 0 12 31 \* \*   |    ~1890k |       ~628k ✓ |     ~126k ✓ | ~35k ✓ |       ~683k ✓ |
| _/15 _ \* \* \* |    ~1719k |       ~280k ✓ |      ~67k ✓ | ~34k ✓ |       ~729k ✓ |
| 0 9 \* \* \*    |    ~2325k |       ~401k ✓ |      ~89k ✓ | ~35k ✓ |       ~670k ✓ |
| 0 9 15 \* 1     |    ~1936k |       ~748k ✓ |     ~138k ✓ | ~35k ✓ |       ~708k ✓ |
| 0 9 \* \* 1-5   |    ~1481k |       ~373k ✓ |      ~89k ✓ | ~34k ✓ |       ~647k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |    ~2235k |       ~193k ✓ |      ~47k ✓ | ~35k ✓ |       ~668k ✓ |
| 0 0 1 \* \*     |    ~2285k |       ~628k ✓ |     ~126k ✓ | ~34k ✓ |       ~695k ✓ |
| 0 12 31 \* \*   |    ~1895k |       ~625k ✓ |     ~125k ✓ | ~35k ✓ |       ~697k ✓ |
| _/15 _ \* \* \* |    ~1722k |       ~282k ✓ |      ~68k ✓ | ~35k ✓ |       ~731k ✓ |
| 0 9 \* \* \*    |    ~2323k |       ~400k ✓ |      ~88k ✓ | ~35k ✓ |       ~674k ✓ |
| 0 9 15 \* 1     |    ~1915k |       ~759k ✓ |     ~142k ✓ | ~34k ✓ |       ~708k ✓ |
| 0 9 \* \* 1-5   |    ~1495k |       ~397k ✓ |      ~90k ✓ | ~34k ✓ |       ~660k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

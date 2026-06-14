# Benchmark

> Tested with deno v2.8.2, cron-fast v3.1.2, croner v10.0.1, cron-parser v5.5.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by Deno.bench().

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~866k       | baseline     |
| croner        | ~30k        | 28.7x faster |
| cron-parser   | ~34k        | 25.3x faster |
| cron-schedule | ~394k       | 2.2x faster  |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~977k       | baseline     |
| croner        | ~30k        | 32.2x faster |
| cron-parser   | ~40k        | 24.6x faster |
| cron-schedule | ~425k       | 2.3x faster  |

### Validation

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2140k      | baseline     |
| cron-validate | ~1280k      | 1.7x faster  |
| cron-schedule | ~547k       | 3.9x faster  |
| cron-parser   | ~103k       | 20.7x faster |
| croner        | ~33k        | 65.7x faster |

### Parsing

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2136k      | baseline     |
| cron-validate | ~1278k      | 1.7x faster  |
| cron-schedule | ~549k       | 3.9x faster  |
| cron-parser   | ~104k       | 20.6x faster |
| croner        | ~33k        | 65.6x faster |

Run benchmarks yourself: `pnpm bench:deno`

## Detailed Per-Test Results

### Next Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |    ~1437k |       ~157k ✓ | ~32k ✓ |      ~31k ✓ |
| Sparse: First of month      |     ~775k |       ~568k ✓ | ~31k ✓ |      ~19k ✓ |
| Sparse: 31st (skips months) |     ~693k |       ~534k ✓ | ~29k ✓ |       ~7k ✓ |
| Step: Every 15 minutes      |     ~955k |       ~283k ✓ | ~31k ✓ |      ~55k ✓ |
| Specific: 9 AM daily        |     ~940k |       ~375k ✓ | ~30k ✓ |      ~43k ✓ |
| OR-mode: 15th OR Monday     |     ~442k |       ~509k ✗ | ~29k ✓ |      ~39k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~823k |       ~333k ✓ | ~29k ✓ |      ~46k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |    ~1464k |       ~193k ✓ | ~31k ✓ |      ~35k ✓ |
| Sparse: First of month      |     ~935k |       ~601k ✓ | ~30k ✓ |       ~9k ✓ |
| Sparse: 31st (skips months) |     ~693k |       ~508k ✓ | ~30k ✓ |       ~9k ✓ |
| Step: Every 15 minutes      |     ~932k |       ~286k ✓ | ~31k ✓ |      ~56k ✓ |
| Specific: 9 AM daily        |     ~986k |       ~391k ✓ | ~30k ✓ |      ~49k ✓ |
| OR-mode: 15th OR Monday     |     ~950k |       ~623k ✓ | ~31k ✓ |      ~67k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~879k |       ~376k ✓ | ~30k ✓ |      ~53k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |    ~2306k |       ~211k ✓ |      ~45k ✓ | ~34k ✓ |      ~1222k ✓ |
| 0 0 1 \* \*     |    ~2317k |       ~746k ✓ |     ~137k ✓ | ~32k ✓ |      ~1328k ✓ |
| 0 12 31 \* \*   |    ~2060k |       ~751k ✓ |     ~132k ✓ | ~32k ✓ |      ~1345k ✓ |
| _/15 _ \* \* \* |    ~2071k |       ~318k ✓ |      ~67k ✓ | ~33k ✓ |      ~1168k ✓ |
| 0 9 \* \* \*    |    ~2406k |       ~456k ✓ |      ~92k ✓ | ~33k ✓ |      ~1315k ✓ |
| 0 9 15 \* 1     |    ~2050k |       ~894k ✓ |     ~155k ✓ | ~32k ✓ |      ~1350k ✓ |
| 0 9 \* \* 1-5   |    ~1773k |       ~455k ✓ |      ~94k ✓ | ~32k ✓ |      ~1235k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |    ~2284k |       ~212k ✓ |      ~46k ✓ | ~33k ✓ |      ~1242k ✓ |
| 0 0 1 \* \*     |    ~2323k |       ~761k ✓ |     ~138k ✓ | ~33k ✓ |      ~1324k ✓ |
| 0 12 31 \* \*   |    ~2156k |       ~751k ✓ |     ~135k ✓ | ~33k ✓ |      ~1321k ✓ |
| _/15 _ \* \* \* |    ~2049k |       ~323k ✓ |      ~68k ✓ | ~33k ✓ |      ~1187k ✓ |
| 0 9 \* \* \*    |    ~2370k |       ~453k ✓ |      ~90k ✓ | ~32k ✓ |      ~1311k ✓ |
| 0 9 15 \* 1     |    ~2038k |       ~897k ✓ |     ~156k ✓ | ~32k ✓ |      ~1339k ✓ |
| 0 9 \* \* 1-5   |    ~1734k |       ~449k ✓ |      ~93k ✓ | ~32k ✓ |      ~1225k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

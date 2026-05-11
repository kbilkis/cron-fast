# Benchmark

> Tested with deno v2.7.14, cron-fast v3.1.2, croner v10.0.1, cron-parser v5.5.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Tested with 1 second per test.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~827k       | baseline     |
| cron-schedule | ~362k       | 2.3x faster  |
| croner        | ~32k        | 26.2x faster |
| cron-parser   | ~36k        | 23.0x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~946k       | baseline     |
| cron-schedule | ~389k       | 2.4x faster  |
| croner        | ~32k        | 29.8x faster |
| cron-parser   | ~41k        | 22.9x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2024k      | baseline     |
| cron-validate | ~1240k      | 1.6x faster  |
| cron-schedule | ~489k       | 4.1x faster  |
| cron-parser   | ~106k       | 19.1x faster |
| croner        | ~32k        | 62.8x faster |

### Parsing

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2017k      | baseline     |
| cron-validate | ~1232k      | 1.6x faster  |
| cron-schedule | ~488k       | 4.1x faster  |
| cron-parser   | ~107k       | 18.9x faster |
| croner        | ~34k        | 59.8x faster |

Run benchmarks yourself: `pnpm benchmark:deno`

## Detailed Per-Test Results

### Next Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |    ~1369k |       ~145k ✓ | ~32k ✓ |      ~33k ✓ |
| Sparse: First of month      |     ~727k |       ~495k ✓ | ~32k ✓ |      ~19k ✓ |
| Sparse: 31st (skips months) |     ~683k |       ~483k ✓ | ~31k ✓ |       ~8k ✓ |
| Step: Every 15 minutes      |     ~885k |       ~266k ✓ | ~33k ✓ |      ~57k ✓ |
| Specific: 9 AM daily        |     ~925k |       ~347k ✓ | ~32k ✓ |      ~46k ✓ |
| OR-mode: 15th OR Monday     |     ~440k |       ~490k ✗ | ~31k ✓ |      ~41k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~758k |       ~310k ✓ | ~30k ✓ |      ~47k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |    ~1432k |       ~184k ✓ | ~33k ✓ |      ~37k ✓ |
| Sparse: First of month      |     ~916k |       ~528k ✓ | ~32k ✓ |       ~9k ✓ |
| Sparse: 31st (skips months) |     ~684k |       ~456k ✓ | ~31k ✓ |       ~9k ✓ |
| Step: Every 15 minutes      |     ~873k |       ~265k ✓ | ~33k ✓ |      ~58k ✓ |
| Specific: 9 AM daily        |     ~958k |       ~359k ✓ | ~32k ✓ |      ~52k ✓ |
| OR-mode: 15th OR Monday     |     ~956k |       ~588k ✓ | ~32k ✓ |      ~70k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~806k |       ~347k ✓ | ~31k ✓ |      ~54k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |    ~2216k |       ~201k ✓ |      ~47k ✓ | ~35k ✓ |      ~1209k ✓ |
| 0 0 1 \* \*     |    ~2288k |       ~641k ✓ |     ~138k ✓ | ~21k ✓ |      ~1298k ✓ |
| 0 12 31 \* \*   |    ~2074k |       ~643k ✓ |     ~138k ✓ | ~34k ✓ |      ~1297k ✓ |
| _/15 _ \* \* \* |    ~1761k |       ~294k ✓ |      ~70k ✓ | ~34k ✓ |      ~1128k ✓ |
| 0 9 \* \* \*    |    ~2328k |       ~409k ✓ |      ~94k ✓ | ~34k ✓ |      ~1276k ✓ |
| 0 9 15 \* 1     |    ~2022k |       ~821k ✓ |     ~159k ✓ | ~34k ✓ |      ~1286k ✓ |
| 0 9 \* \* 1-5   |    ~1478k |       ~417k ✓ |      ~96k ✓ | ~34k ✓ |      ~1189k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |    ~2231k |       ~201k ✓ |      ~47k ✓ | ~34k ✓ |      ~1195k ✓ |
| 0 0 1 \* \*     |    ~2277k |       ~646k ✓ |     ~143k ✓ | ~34k ✓ |      ~1276k ✓ |
| 0 12 31 \* \*   |    ~2065k |       ~627k ✓ |     ~139k ✓ | ~34k ✓ |      ~1280k ✓ |
| _/15 _ \* \* \* |    ~1771k |       ~291k ✓ |      ~70k ✓ | ~33k ✓ |      ~1137k ✓ |
| 0 9 \* \* \*    |    ~2314k |       ~411k ✓ |      ~94k ✓ | ~34k ✓ |      ~1263k ✓ |
| 0 9 15 \* 1     |    ~1990k |       ~826k ✓ |     ~158k ✓ | ~33k ✓ |      ~1283k ✓ |
| 0 9 \* \* 1-5   |    ~1469k |       ~414k ✓ |      ~95k ✓ | ~33k ✓ |      ~1188k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

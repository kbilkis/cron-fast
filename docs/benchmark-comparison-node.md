# Benchmark & Feature Comparison

> Tested with node v22.18.0, cron-fast v2.1.0, croner v10.0.1, cron-parser v5.5.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Tested with 1 second per test.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~459k       | baseline     |
| cron-schedule | ~374k       | 1.2x faster  |
| croner        | ~31k        | 15.0x faster |
| cron-parser   | ~32k        | 14.2x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~512k       | baseline     |
| cron-schedule | ~388k       | 1.3x faster  |
| croner        | ~31k        | 16.7x faster |
| cron-parser   | ~37k        | 14.0x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~733k       | baseline     |
| cron-validate | ~643k       | 1.1x faster  |
| cron-schedule | ~453k       | 1.6x faster  |
| cron-parser   | ~92k        | 7.9x faster  |
| croner        | ~34k        | 21.4x faster |

### Parsing

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~735k       | baseline     |
| cron-validate | ~655k       | 1.1x faster  |
| cron-schedule | ~458k       | 1.6x faster  |
| cron-parser   | ~92k        | 8.0x faster  |
| croner        | ~34k        | 21.5x faster |

Run benchmarks yourself: `pnpm benchmark`

## Detailed Per-Test Results

### Next Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |     ~361k |       ~177k ✓ | ~32k ✓ |      ~30k ✓ |
| Sparse: First of month      |     ~554k |         ~509k | ~32k ✓ |      ~18k ✓ |
| Sparse: 31st (skips months) |     ~502k |         ~477k | ~27k ✓ |       ~7k ✓ |
| Step: Every 15 minutes      |     ~416k |       ~247k ✓ | ~31k ✓ |      ~51k ✓ |
| Specific: 9 AM daily        |     ~499k |       ~333k ✓ | ~34k ✓ |      ~42k ✓ |
| OR-mode: 15th OR Monday     |     ~420k |       ~546k ✗ | ~30k ✓ |      ~36k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~461k |       ~327k ✓ | ~28k ✓ |      ~42k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |     ~372k |       ~184k ✓ | ~32k ✓ |      ~34k ✓ |
| Sparse: First of month      |     ~593k |       ~533k ✓ | ~31k ✓ |       ~8k ✓ |
| Sparse: 31st (skips months) |     ~508k |       ~436k ✓ | ~31k ✓ |       ~8k ✓ |
| Step: Every 15 minutes      |     ~404k |       ~265k ✓ | ~29k ✓ |      ~53k ✓ |
| Specific: 9 AM daily        |     ~493k |       ~348k ✓ | ~31k ✓ |      ~45k ✓ |
| OR-mode: 15th OR Monday     |     ~723k |       ~597k ✓ | ~31k ✓ |      ~59k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~494k |       ~351k ✓ | ~31k ✓ |      ~48k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |     ~425k |       ~186k ✓ |      ~44k ✓ | ~34k ✓ |       ~625k ✗ |
| 0 0 1 \* \*     |     ~879k |       ~590k ✓ |     ~116k ✓ | ~34k ✓ |       ~633k ✓ |
| 0 12 31 \* \*   |     ~832k |       ~620k ✓ |     ~119k ✓ | ~34k ✓ |       ~658k ✓ |
| _/15 _ \* \* \* |     ~533k |       ~281k ✓ |      ~65k ✓ | ~34k ✓ |       ~693k ✗ |
| 0 9 \* \* \*    |     ~684k |       ~377k ✓ |      ~84k ✓ | ~34k ✓ |         ~624k |
| 0 9 15 \* 1     |    ~1128k |       ~751k ✓ |     ~133k ✓ | ~34k ✓ |       ~682k ✓ |
| 0 9 \* \* 1-5   |     ~649k |       ~366k ✓ |      ~86k ✓ | ~34k ✓ |       ~584k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |     ~416k |       ~192k ✓ |      ~44k ✓ | ~34k ✓ |       ~627k ✗ |
| 0 0 1 \* \*     |     ~897k |       ~604k ✓ |     ~117k ✓ | ~34k ✓ |       ~663k ✓ |
| 0 12 31 \* \*   |     ~839k |       ~602k ✓ |     ~118k ✓ | ~34k ✓ |       ~667k ✓ |
| _/15 _ \* \* \* |     ~523k |       ~275k ✓ |      ~64k ✓ | ~33k ✓ |       ~694k ✗ |
| 0 9 \* \* \*    |     ~696k |       ~391k ✓ |      ~84k ✓ | ~35k ✓ |         ~638k |
| 0 9 15 \* 1     |    ~1132k |       ~756k ✓ |     ~133k ✓ | ~35k ✓ |       ~665k ✓ |
| 0 9 \* \* 1-5   |     ~641k |       ~387k ✓ |      ~85k ✓ | ~34k ✓ |         ~629k |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

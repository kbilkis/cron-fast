# Benchmark & Feature Comparison

> Tested with bun v1.3.9, cron-fast v2.1.0, croner v10.0.1, cron-parser v5.5.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Tested with 1 second per test.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~380k       | baseline     |
| cron-schedule | ~313k       | 1.2x faster  |
| croner        | ~55k        | 6.9x faster  |
| cron-parser   | ~38k        | 10.1x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~417k       | baseline     |
| cron-schedule | ~326k       | 1.3x faster  |
| croner        | ~56k        | 7.4x faster  |
| cron-parser   | ~39k        | 10.6x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~463k       | baseline     |
| cron-validate | ~946k       | 2.0x slower  |
| cron-schedule | ~334k       | 1.4x faster  |
| cron-parser   | ~116k       | 4.0x faster  |
| croner        | ~55k        | 8.3x faster  |

### Parsing

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~494k       | baseline     |
| cron-validate | ~944k       | 1.9x slower  |
| cron-schedule | ~350k       | 1.4x faster  |
| cron-parser   | ~120k       | 4.1x faster  |
| croner        | ~61k        | 8.1x faster  |

Run benchmarks yourself: `pnpm benchmark:bun`

## Detailed Per-Test Results

### Next Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |     ~426k |       ~139k ✓ | ~53k ✓ |      ~35k ✓ |
| Sparse: First of month      |     ~382k |         ~377k | ~51k ✓ |      ~21k ✓ |
| Sparse: 31st (skips months) |     ~404k |         ~409k | ~55k ✓ |       ~9k ✓ |
| Step: Every 15 minutes      |     ~390k |       ~210k ✓ | ~59k ✓ |      ~64k ✓ |
| Specific: 9 AM daily        |     ~358k |       ~299k ✓ | ~60k ✓ |      ~46k ✓ |
| OR-mode: 15th OR Monday     |     ~375k |       ~484k ✗ | ~54k ✓ |      ~42k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~324k |       ~271k ✓ | ~52k ✓ |      ~47k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |     ~405k |       ~159k ✓ | ~58k ✓ |      ~38k ✓ |
| Sparse: First of month      |     ~461k |         ~441k | ~58k ✓ |      ~11k ✓ |
| Sparse: 31st (skips months) |     ~416k |         ~424k | ~57k ✓ |      ~10k ✓ |
| Step: Every 15 minutes      |     ~395k |       ~209k ✓ | ~59k ✓ |      ~60k ✓ |
| Specific: 9 AM daily        |     ~428k |       ~274k ✓ | ~57k ✓ |      ~47k ✓ |
| OR-mode: 15th OR Monday     |     ~491k |         ~496k | ~56k ✓ |      ~60k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~321k |       ~279k ✓ | ~48k ✓ |      ~49k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |     ~380k |       ~163k ✓ |      ~53k ✓ | ~51k ✓ |       ~977k ✗ |
| 0 0 1 \* \*     |     ~494k |       ~433k ✓ |     ~136k ✓ | ~55k ✓ |       ~962k ✗ |
| 0 12 31 \* \*   |     ~566k |       ~434k ✓ |     ~161k ✓ | ~59k ✓ |       ~926k ✗ |
| _/15 _ \* \* \* |     ~353k |       ~210k ✓ |      ~82k ✓ | ~56k ✓ |       ~982k ✗ |
| 0 9 \* \* \*    |     ~482k |       ~309k ✓ |     ~104k ✓ | ~59k ✓ |       ~961k ✗ |
| 0 9 15 \* 1     |     ~619k |       ~523k ✓ |     ~167k ✓ | ~55k ✓ |       ~932k ✗ |
| 0 9 \* \* 1-5   |     ~345k |       ~266k ✓ |     ~106k ✓ | ~52k ✓ |       ~879k ✗ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |     ~420k |       ~158k ✓ |      ~52k ✓ | ~61k ✓ |       ~917k ✗ |
| 0 0 1 \* \*     |     ~592k |       ~464k ✓ |     ~148k ✓ | ~62k ✓ |       ~986k ✗ |
| 0 12 31 \* \*   |     ~552k |       ~475k ✓ |     ~160k ✓ | ~63k ✓ |       ~958k ✗ |
| _/15 _ \* \* \* |     ~395k |       ~226k ✓ |      ~86k ✓ | ~64k ✓ |       ~991k ✗ |
| 0 9 \* \* \*    |     ~478k |       ~301k ✓ |     ~112k ✓ | ~61k ✓ |       ~915k ✗ |
| 0 9 15 \* 1     |     ~659k |       ~531k ✓ |     ~178k ✓ | ~61k ✓ |       ~900k ✗ |
| 0 9 \* \* 1-5   |     ~364k |       ~295k ✓ |     ~106k ✓ | ~58k ✓ |       ~944k ✗ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

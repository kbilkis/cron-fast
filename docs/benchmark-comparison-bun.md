# Benchmark & Feature Comparison

> Tested with bun v1.3.9, cron-fast v2.2.0, croner v10.0.1, cron-parser v5.5.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Tested with 1 second per test.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~390k       | baseline     |
| cron-schedule | ~310k       | 1.3x faster  |
| croner        | ~54k        | 7.2x faster  |
| cron-parser   | ~37k        | 10.7x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~435k       | baseline     |
| cron-schedule | ~313k       | 1.4x faster  |
| croner        | ~55k        | 7.9x faster  |
| cron-parser   | ~40k        | 10.9x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~526k       | baseline     |
| cron-validate | ~945k       | 1.8x slower  |
| cron-schedule | ~346k       | 1.5x faster  |
| cron-parser   | ~120k       | 4.4x faster  |
| croner        | ~59k        | 9.0x faster  |

### Parsing

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~527k       | baseline     |
| cron-validate | ~960k       | 1.8x slower  |
| cron-schedule | ~350k       | 1.5x faster  |
| cron-parser   | ~124k       | 4.2x faster  |
| croner        | ~62k        | 8.5x faster  |

Run benchmarks yourself: `pnpm benchmark:bun`

## Detailed Per-Test Results

### Next Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |     ~457k |       ~147k ✓ | ~54k ✓ |      ~34k ✓ |
| Sparse: First of month      |     ~431k |         ~408k | ~56k ✓ |      ~22k ✓ |
| Sparse: 31st (skips months) |     ~435k |         ~411k | ~55k ✓ |       ~9k ✓ |
| Step: Every 15 minutes      |     ~405k |       ~213k ✓ | ~59k ✓ |      ~63k ✓ |
| Specific: 9 AM daily        |     ~344k |       ~283k ✓ | ~60k ✓ |      ~45k ✓ |
| OR-mode: 15th OR Monday     |     ~347k |       ~443k ✗ | ~46k ✓ |      ~39k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~309k |       ~263k ✓ | ~48k ✓ |      ~44k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |     ~424k |       ~152k ✓ | ~58k ✓ |      ~36k ✓ |
| Sparse: First of month      |     ~489k |       ~415k ✓ | ~57k ✓ |      ~10k ✓ |
| Sparse: 31st (skips months) |     ~424k |         ~401k | ~51k ✓ |      ~10k ✓ |
| Step: Every 15 minutes      |     ~383k |       ~180k ✓ | ~55k ✓ |      ~61k ✓ |
| Specific: 9 AM daily        |     ~446k |       ~280k ✓ | ~56k ✓ |      ~49k ✓ |
| OR-mode: 15th OR Monday     |     ~518k |         ~489k | ~58k ✓ |      ~61k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~359k |       ~274k ✓ | ~53k ✓ |      ~51k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |     ~464k |       ~155k ✓ |      ~51k ✓ | ~61k ✓ |       ~901k ✗ |
| 0 0 1 \* \*     |     ~564k |       ~447k ✓ |     ~155k ✓ | ~60k ✓ |       ~954k ✗ |
| 0 12 31 \* \*   |     ~644k |       ~454k ✓ |     ~160k ✓ | ~57k ✓ |       ~922k ✗ |
| _/15 _ \* \* \* |     ~445k |       ~221k ✓ |      ~85k ✓ | ~60k ✓ |       ~998k ✗ |
| 0 9 \* \* \*    |     ~495k |       ~296k ✓ |     ~109k ✓ | ~61k ✓ |       ~952k ✗ |
| 0 9 15 \* 1     |     ~622k |         ~574k |     ~172k ✓ | ~53k ✓ |       ~954k ✗ |
| 0 9 \* \* 1-5   |     ~450k |       ~276k ✓ |     ~106k ✓ | ~58k ✓ |       ~932k ✗ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |     ~457k |       ~157k ✓ |      ~51k ✓ | ~60k ✓ |       ~940k ✗ |
| 0 0 1 \* \*     |     ~583k |       ~424k ✓ |     ~159k ✓ | ~62k ✓ |       ~943k ✗ |
| 0 12 31 \* \*   |     ~611k |       ~447k ✓ |     ~164k ✓ | ~63k ✓ |       ~955k ✗ |
| _/15 _ \* \* \* |     ~430k |       ~225k ✓ |      ~87k ✓ | ~61k ✓ |      ~1008k ✗ |
| 0 9 \* \* \*    |     ~510k |       ~310k ✓ |     ~112k ✓ | ~62k ✓ |       ~948k ✗ |
| 0 9 15 \* 1     |     ~679k |       ~581k ✓ |     ~182k ✓ | ~63k ✓ |       ~959k ✗ |
| 0 9 \* \* 1-5   |     ~419k |       ~304k ✓ |     ~113k ✓ | ~62k ✓ |       ~967k ✗ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

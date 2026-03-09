# Benchmark & Feature Comparison

> Tested with bun v1.3.9, cron-fast v2.3.0, croner v10.0.1, cron-parser v5.5.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Tested with 1 second per test.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~656k       | baseline     |
| cron-schedule | ~318k       | 2.1x faster  |
| croner        | ~56k        | 11.6x faster |
| cron-parser   | ~37k        | 17.6x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~604k       | baseline     |
| cron-schedule | ~319k       | 1.9x faster  |
| croner        | ~57k        | 10.5x faster |
| cron-parser   | ~40k        | 15.3x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~827k       | baseline     |
| cron-validate | ~961k       | 1.2x slower  |
| cron-schedule | ~354k       | 2.3x faster  |
| cron-parser   | ~121k       | 6.8x faster  |
| croner        | ~61k        | 13.4x faster |

### Parsing

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~858k       | baseline     |
| cron-validate | ~955k       | 1.1x slower  |
| cron-schedule | ~352k       | 2.4x faster  |
| cron-parser   | ~121k       | 7.1x faster  |
| croner        | ~60k        | 14.4x faster |

Run benchmarks yourself: `pnpm benchmark:bun`

## Detailed Per-Test Results

### Next Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |    ~1180k |       ~158k ✓ | ~60k ✓ |      ~37k ✓ |
| Sparse: First of month      |     ~606k |       ~414k ✓ | ~59k ✓ |      ~22k ✓ |
| Sparse: 31st (skips months) |     ~585k |       ~415k ✓ | ~53k ✓ |       ~9k ✓ |
| Step: Every 15 minutes      |     ~569k |       ~216k ✓ | ~59k ✓ |      ~63k ✓ |
| Specific: 9 AM daily        |     ~704k |       ~289k ✓ | ~61k ✓ |      ~45k ✓ |
| OR-mode: 15th OR Monday     |     ~458k |         ~467k | ~52k ✓ |      ~41k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~490k |       ~269k ✓ | ~50k ✓ |      ~44k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |     ~528k |       ~158k ✓ | ~58k ✓ |      ~37k ✓ |
| Sparse: First of month      |     ~735k |       ~430k ✓ | ~57k ✓ |      ~11k ✓ |
| Sparse: 31st (skips months) |     ~547k |       ~412k ✓ | ~56k ✓ |      ~10k ✓ |
| Step: Every 15 minutes      |     ~547k |       ~215k ✓ | ~60k ✓ |      ~60k ✓ |
| Specific: 9 AM daily        |     ~645k |       ~286k ✓ | ~59k ✓ |      ~49k ✓ |
| OR-mode: 15th OR Monday     |     ~691k |       ~462k ✓ | ~57k ✓ |      ~59k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~532k |       ~268k ✓ | ~54k ✓ |      ~50k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |     ~464k |       ~157k ✓ |      ~50k ✓ | ~64k ✓ |       ~952k ✗ |
| 0 0 1 \* \*     |    ~1128k |       ~463k ✓ |     ~156k ✓ | ~62k ✓ |       ~989k ✓ |
| 0 12 31 \* \*   |     ~977k |       ~463k ✓ |     ~159k ✓ | ~60k ✓ |         ~946k |
| _/15 _ \* \* \* |     ~642k |       ~218k ✓ |      ~85k ✓ | ~62k ✓ |       ~990k ✗ |
| 0 9 \* \* \*    |     ~940k |       ~305k ✓ |     ~109k ✓ | ~61k ✓ |         ~954k |
| 0 9 15 \* 1     |     ~874k |       ~574k ✓ |     ~178k ✓ | ~61k ✓ |         ~966k |
| 0 9 \* \* 1-5   |     ~764k |       ~294k ✓ |     ~108k ✓ | ~61k ✓ |       ~931k ✗ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |     ~962k |       ~163k ✓ |      ~52k ✓ | ~58k ✓ |         ~946k |
| 0 0 1 \* \*     |     ~842k |       ~456k ✓ |     ~159k ✓ | ~58k ✓ |       ~958k ✗ |
| 0 12 31 \* \*   |     ~964k |       ~450k ✓ |     ~161k ✓ | ~62k ✓ |         ~941k |
| _/15 _ \* \* \* |     ~648k |       ~227k ✓ |      ~86k ✓ | ~59k ✓ |       ~989k ✗ |
| 0 9 \* \* \*    |     ~949k |       ~307k ✓ |     ~109k ✓ | ~63k ✓ |         ~937k |
| 0 9 15 \* 1     |     ~877k |       ~570k ✓ |     ~171k ✓ | ~57k ✓ |         ~956k |
| 0 9 \* \* 1-5   |     ~766k |       ~295k ✓ |     ~109k ✓ | ~61k ✓ |       ~956k ✗ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

# Benchmark & Feature Comparison

> Tested with bun v1.3.9, cron-fast v3.0.0, croner v10.0.1, cron-parser v5.5.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Tested with 1 second per test.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~655k       | baseline     |
| cron-schedule | ~304k       | 2.2x faster  |
| croner        | ~55k        | 11.8x faster |
| cron-parser   | ~36k        | 18.2x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~616k       | baseline     |
| cron-schedule | ~311k       | 2.0x faster  |
| croner        | ~53k        | 11.5x faster |
| cron-parser   | ~38k        | 16.0x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~814k       | baseline     |
| cron-validate | ~941k       | 1.2x slower  |
| cron-schedule | ~345k       | 2.4x faster  |
| cron-parser   | ~117k       | 6.9x faster  |
| croner        | ~58k        | 14.1x faster |

### Parsing

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~862k       | baseline     |
| cron-validate | ~943k       | 1.1x slower  |
| cron-schedule | ~349k       | 2.5x faster  |
| cron-parser   | ~118k       | 7.3x faster  |
| croner        | ~61k        | 14.1x faster |

Run benchmarks yourself: `pnpm benchmark:bun`

## Detailed Per-Test Results

### Next Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |    ~1216k |       ~159k ✓ | ~60k ✓ |      ~37k ✓ |
| Sparse: First of month      |     ~610k |       ~415k ✓ | ~58k ✓ |      ~21k ✓ |
| Sparse: 31st (skips months) |     ~600k |       ~420k ✓ | ~56k ✓ |       ~9k ✓ |
| Step: Every 15 minutes      |     ~564k |       ~203k ✓ | ~58k ✓ |      ~62k ✓ |
| Specific: 9 AM daily        |     ~699k |       ~259k ✓ | ~60k ✓ |      ~44k ✓ |
| OR-mode: 15th OR Monday     |     ~431k |         ~413k | ~49k ✓ |      ~38k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~467k |       ~258k ✓ | ~45k ✓ |      ~41k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |     ~697k |       ~146k ✓ | ~57k ✓ |      ~35k ✓ |
| Sparse: First of month      |     ~649k |       ~408k ✓ | ~55k ✓ |      ~11k ✓ |
| Sparse: 31st (skips months) |     ~594k |       ~398k ✓ | ~52k ✓ |      ~10k ✓ |
| Step: Every 15 minutes      |     ~530k |       ~206k ✓ | ~51k ✓ |      ~58k ✓ |
| Specific: 9 AM daily        |     ~642k |       ~279k ✓ | ~51k ✓ |      ~47k ✓ |
| OR-mode: 15th OR Monday     |     ~674k |       ~478k ✓ | ~59k ✓ |      ~61k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~525k |       ~259k ✓ | ~49k ✓ |      ~47k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |     ~432k |       ~165k ✓ |      ~48k ✓ | ~59k ✓ |       ~949k ✗ |
| 0 0 1 \* \*     |    ~1156k |       ~441k ✓ |     ~148k ✓ | ~60k ✓ |       ~963k ✓ |
| 0 12 31 \* \*   |     ~972k |       ~453k ✓ |     ~159k ✓ | ~57k ✓ |         ~905k |
| _/15 _ \* \* \* |     ~611k |       ~208k ✓ |      ~84k ✓ | ~55k ✓ |       ~946k ✗ |
| 0 9 \* \* \*    |     ~917k |       ~291k ✓ |     ~105k ✓ | ~58k ✓ |         ~915k |
| 0 9 15 \* 1     |     ~858k |       ~564k ✓ |     ~169k ✓ | ~59k ✓ |         ~931k |
| 0 9 \* \* 1-5   |     ~749k |       ~295k ✓ |     ~109k ✓ | ~57k ✓ |       ~979k ✗ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |     ~997k |       ~162k ✓ |      ~51k ✓ | ~59k ✓ |         ~913k |
| 0 0 1 \* \*     |     ~864k |       ~447k ✓ |     ~151k ✓ | ~61k ✓ |         ~957k |
| 0 12 31 \* \*   |     ~966k |       ~455k ✓ |     ~153k ✓ | ~63k ✓ |         ~918k |
| _/15 _ \* \* \* |     ~618k |       ~221k ✓ |      ~86k ✓ | ~61k ✓ |       ~997k ✗ |
| 0 9 \* \* \*    |     ~964k |       ~296k ✓ |     ~107k ✓ | ~62k ✓ |         ~914k |
| 0 9 15 \* 1     |     ~870k |       ~562k ✓ |     ~171k ✓ | ~59k ✓ |         ~950k |
| 0 9 \* \* 1-5   |     ~756k |       ~299k ✓ |     ~107k ✓ | ~62k ✓ |       ~951k ✗ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

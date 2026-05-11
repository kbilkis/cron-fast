# Benchmark

> Tested with node v24.15.0, cron-fast v3.1.2, croner v10.0.1, cron-parser v5.5.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Tested with 1 second per test.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~849k       | baseline     |
| cron-schedule | ~341k       | 2.5x faster  |
| croner        | ~32k        | 26.2x faster |
| cron-parser   | ~35k        | 24.2x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~949k       | baseline     |
| cron-schedule | ~361k       | 2.6x faster  |
| croner        | ~33k        | 29.1x faster |
| cron-parser   | ~40k        | 23.9x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1858k      | baseline     |
| cron-validate | ~630k       | 2.9x faster  |
| cron-schedule | ~467k       | 4.0x faster  |
| cron-parser   | ~96k        | 19.3x faster |
| croner        | ~34k        | 54.6x faster |

### Parsing

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1867k      | baseline     |
| cron-validate | ~630k       | 3.0x faster  |
| cron-schedule | ~466k       | 4.0x faster  |
| cron-parser   | ~96k        | 19.4x faster |
| croner        | ~34k        | 54.9x faster |

Run benchmarks yourself: `pnpm benchmark`

## Detailed Per-Test Results

### Next Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |    ~1500k |       ~152k ✓ | ~33k ✓ |      ~32k ✓ |
| Sparse: First of month      |     ~750k |       ~459k ✓ | ~33k ✓ |      ~19k ✓ |
| Sparse: 31st (skips months) |     ~685k |       ~454k ✓ | ~31k ✓ |       ~8k ✓ |
| Step: Every 15 minutes      |     ~872k |       ~260k ✓ | ~34k ✓ |      ~57k ✓ |
| Specific: 9 AM daily        |     ~933k |       ~332k ✓ | ~33k ✓ |      ~45k ✓ |
| OR-mode: 15th OR Monday     |     ~443k |         ~440k | ~31k ✓ |      ~40k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~762k |       ~291k ✓ | ~31k ✓ |      ~46k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |    ~1478k |       ~179k ✓ | ~34k ✓ |      ~36k ✓ |
| Sparse: First of month      |     ~934k |       ~500k ✓ | ~32k ✓ |       ~9k ✓ |
| Sparse: 31st (skips months) |     ~691k |       ~408k ✓ | ~32k ✓ |       ~9k ✓ |
| Step: Every 15 minutes      |     ~869k |       ~255k ✓ | ~33k ✓ |      ~57k ✓ |
| Specific: 9 AM daily        |     ~962k |       ~344k ✓ | ~33k ✓ |      ~51k ✓ |
| OR-mode: 15th OR Monday     |     ~922k |       ~518k ✓ | ~33k ✓ |      ~65k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~790k |       ~324k ✓ | ~31k ✓ |      ~51k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |    ~2207k |       ~199k ✓ |      ~46k ✓ | ~36k ✓ |       ~627k ✓ |
| 0 0 1 \* \*     |    ~2094k |       ~627k ✓ |     ~124k ✓ | ~35k ✓ |       ~674k ✓ |
| 0 12 31 \* \*   |    ~1783k |       ~619k ✓ |     ~125k ✓ | ~35k ✓ |       ~612k ✓ |
| _/15 _ \* \* \* |    ~1680k |       ~289k ✓ |      ~69k ✓ | ~35k ✓ |       ~677k ✓ |
| 0 9 \* \* \*    |    ~2162k |       ~394k ✓ |      ~79k ✓ | ~34k ✓ |       ~622k ✓ |
| 0 9 15 \* 1     |    ~1720k |       ~740k ✓ |     ~140k ✓ | ~30k ✓ |       ~605k ✓ |
| 0 9 \* \* 1-5   |    ~1358k |       ~399k ✓ |      ~90k ✓ | ~34k ✓ |       ~594k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |    ~2221k |       ~196k ✓ |      ~40k ✓ | ~34k ✓ |       ~620k ✓ |
| 0 0 1 \* \*     |    ~2075k |       ~611k ✓ |     ~125k ✓ | ~34k ✓ |       ~668k ✓ |
| 0 12 31 \* \*   |    ~1772k |       ~612k ✓ |     ~125k ✓ | ~33k ✓ |       ~597k ✓ |
| _/15 _ \* \* \* |    ~1677k |       ~289k ✓ |      ~67k ✓ | ~35k ✓ |       ~694k ✓ |
| 0 9 \* \* \*    |    ~2192k |       ~401k ✓ |      ~87k ✓ | ~35k ✓ |       ~631k ✓ |
| 0 9 15 \* 1     |    ~1739k |       ~754k ✓ |     ~140k ✓ | ~33k ✓ |       ~609k ✓ |
| 0 9 \* \* 1-5   |    ~1391k |       ~401k ✓ |      ~89k ✓ | ~34k ✓ |       ~590k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

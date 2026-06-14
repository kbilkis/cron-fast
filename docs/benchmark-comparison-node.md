# Benchmark

> Tested with node v24.16.0, cron-fast v3.1.2, croner v10.0.1, cron-parser v5.5.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by vitest bench (tinybench).

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~793k       | baseline     |
| croner        | ~31k        | 25.7x faster |
| cron-parser   | ~35k        | 22.8x faster |
| cron-schedule | ~334k       | 2.4x faster  |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~904k       | baseline     |
| croner        | ~32k        | 28.4x faster |
| cron-parser   | ~39k        | 23.4x faster |
| cron-schedule | ~351k       | 2.6x faster  |

### Validation

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1794k      | baseline     |
| cron-validate | ~644k       | 2.8x faster  |
| cron-schedule | ~459k       | 3.9x faster  |
| cron-parser   | ~96k        | 18.6x faster |
| croner        | ~34k        | 52.0x faster |

### Parsing

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1900k      | baseline     |
| cron-validate | ~665k       | 2.9x faster  |
| cron-schedule | ~462k       | 4.1x faster  |
| cron-parser   | ~101k       | 18.9x faster |
| croner        | ~33k        | 57.3x faster |

Run benchmarks yourself: `pnpm bench`

## Detailed Per-Test Results

### Next Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |    ~1362k |       ~138k ✓ | ~32k ✓ |      ~32k ✓ |
| Sparse: First of month      |     ~692k |       ~450k ✓ | ~32k ✓ |      ~19k ✓ |
| Sparse: 31st (skips months) |     ~646k |       ~447k ✓ | ~30k ✓ |       ~8k ✓ |
| Step: Every 15 minutes      |     ~837k |       ~254k ✓ | ~32k ✓ |      ~56k ✓ |
| Specific: 9 AM daily        |     ~880k |       ~329k ✓ | ~30k ✓ |      ~44k ✓ |
| OR-mode: 15th OR Monday     |     ~411k |         ~431k | ~31k ✓ |      ~39k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~724k |       ~288k ✓ | ~30k ✓ |      ~45k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |    ~1373k |       ~133k ✓ | ~33k ✓ |      ~35k ✓ |
| Sparse: First of month      |     ~913k |       ~494k ✓ | ~31k ✓ |       ~9k ✓ |
| Sparse: 31st (skips months) |     ~646k |       ~416k ✓ | ~31k ✓ |       ~9k ✓ |
| Step: Every 15 minutes      |     ~837k |       ~251k ✓ | ~32k ✓ |      ~55k ✓ |
| Specific: 9 AM daily        |     ~928k |       ~341k ✓ | ~32k ✓ |      ~48k ✓ |
| OR-mode: 15th OR Monday     |     ~872k |       ~505k ✓ | ~32k ✓ |      ~65k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~758k |       ~318k ✓ | ~30k ✓ |      ~50k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |    ~2008k |       ~155k ✓ |      ~45k ✓ | ~35k ✓ |       ~630k ✓ |
| 0 0 1 \* \*     |    ~2011k |       ~619k ✓ |     ~126k ✓ | ~34k ✓ |       ~633k ✓ |
| 0 12 31 \* \*   |    ~1763k |       ~608k ✓ |     ~117k ✓ | ~34k ✓ |       ~657k ✓ |
| _/15 _ \* \* \* |    ~1617k |       ~288k ✓ |      ~68k ✓ | ~34k ✓ |       ~702k ✓ |
| 0 9 \* \* \*    |    ~2119k |       ~401k ✓ |      ~88k ✓ | ~35k ✓ |       ~669k ✓ |
| 0 9 15 \* 1     |    ~1693k |       ~742k ✓ |     ~139k ✓ | ~34k ✓ |       ~597k ✓ |
| 0 9 \* \* 1-5   |    ~1350k |       ~402k ✓ |      ~91k ✓ | ~34k ✓ |       ~623k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |    ~2120k |       ~157k ✓ |      ~47k ✓ | ~35k ✓ |       ~652k ✓ |
| 0 0 1 \* \*     |    ~2162k |       ~621k ✓ |     ~131k ✓ | ~34k ✓ |       ~655k ✓ |
| 0 12 31 \* \*   |    ~1860k |       ~611k ✓ |     ~125k ✓ | ~34k ✓ |       ~680k ✓ |
| _/15 _ \* \* \* |    ~1667k |       ~290k ✓ |      ~71k ✓ | ~27k ✓ |       ~716k ✓ |
| 0 9 \* \* \*    |    ~2251k |       ~399k ✓ |      ~91k ✓ | ~34k ✓ |       ~647k ✓ |
| 0 9 15 \* 1     |    ~1833k |       ~758k ✓ |     ~144k ✓ | ~35k ✓ |       ~659k ✓ |
| 0 9 \* \* 1-5   |    ~1410k |       ~399k ✓ |      ~95k ✓ | ~33k ✓ |       ~648k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

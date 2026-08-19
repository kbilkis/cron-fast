# Benchmark

> Tested with node v24.19.0, cron-fast v3.8.0, croner v10.0.1, cron-parser v5.10.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by vitest bench (tinybench).

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2034k      | baseline     |
| cron-schedule | ~334k       | 6.1x faster  |
| cron-parser   | ~35k        | 58.0x faster |
| croner        | ~31k        | 65.2x faster |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~43k        | baseline     |
| cron-schedule | ~15k        | 2.8x faster  |
| cron-parser   | ~1k         | 35.5x faster |
| croner        | ~2k         | 18.2x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2086k      | baseline     |
| cron-schedule | ~351k       | 5.9x faster  |
| cron-parser   | ~39k        | 52.9x faster |
| croner        | ~32k        | 65.5x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~5059k      | baseline      |
| cron-schedule | ~458k       | 11.0x faster  |
| cron-parser   | ~95k        | 53.1x faster  |
| croner        | ~35k        | 144.9x faster |
| cron-validate | ~646k       | 7.8x faster   |

### Validation Varied Inputs

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~4331k      | baseline      |
| cron-schedule | ~477k       | 9.1x faster   |
| cron-parser   | ~116k       | 37.3x faster  |
| croner        | ~35k        | 124.2x faster |
| cron-validate | ~608k       | 7.1x faster   |

### Parsing

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~5000k      | baseline      |
| cron-schedule | ~462k       | 10.8x faster  |
| cron-parser   | ~97k        | 51.8x faster  |
| croner        | ~35k        | 143.3x faster |
| cron-validate | ~651k       | 7.7x faster   |

Run benchmarks yourself: `pnpm bench`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case    |    cron-fast | cron-schedule |  cron-parser |       croner |
| ------------ | -----------: | ------------: | -----------: | -----------: |
| * * * * *    | ~3585k ±0.4% | ~140k ±0.4% ✓ | ~33k ±0.4% ✓ | ~31k ±2.6% ✓ |
| 0 0 1 * *    | ~1967k ±0.5% | ~450k ±1.3% ✓ | ~19k ±0.5% ✓ | ~32k ±0.4% ✓ |
| 0 12 31 * *  | ~1942k ±0.5% | ~450k ±0.4% ✓ |  ~8k ±0.4% ✓ | ~30k ±1.4% ✓ |
| */15 * * * * | ~1892k ±0.4% | ~255k ±0.4% ✓ | ~57k ±0.4% ✓ | ~33k ±1.7% ✓ |
| 0 9 * * *    | ~2078k ±0.2% | ~319k ±0.6% ✓ | ~44k ±0.4% ✓ | ~32k ±3.4% ✓ |
| 0 9 15 * 1   | ~1276k ±0.5% | ~438k ±0.5% ✓ | ~39k ±0.5% ✓ | ~31k ±0.4% ✓ |
| 0 9 * * 1-5  | ~1497k ±0.6% | ~289k ±0.5% ✓ | ~45k ±0.5% ✓ | ~30k ±0.7% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case    |         cron-fast |       cron-schedule |             cron-parser |                croner |
| ------------ | ----------------: | ------------------: | ----------------------: | --------------------: |
| * * * * *    |   279 ns / 375 ns | 7,156 ns / 8,167 ns |   30,686 ns / 40,708 ns | 32,117 ns / 59,666 ns |
| 0 0 1 * *    |   508 ns / 709 ns | 2,223 ns / 2,833 ns |   51,541 ns / 62,667 ns | 31,289 ns / 37,333 ns |
| 0 12 31 * *  |   515 ns / 708 ns | 2,222 ns / 2,791 ns | 128,745 ns / 163,666 ns | 33,150 ns / 42,042 ns |
| */15 * * * * |   528 ns / 792 ns | 3,917 ns / 4,625 ns |   17,572 ns / 20,458 ns | 30,743 ns / 43,250 ns |
| 0 9 * * *    |   481 ns / 625 ns | 3,134 ns / 3,959 ns |   22,601 ns / 25,792 ns | 31,492 ns / 51,209 ns |
| 0 9 15 * 1   | 784 ns / 1,209 ns | 2,284 ns / 2,792 ns |   25,318 ns / 29,583 ns | 32,132 ns / 37,708 ns |
| 0 9 * * 1-5  | 668 ns / 1,083 ns | 3,464 ns / 4,083 ns |   22,167 ns / 26,208 ns | 33,715 ns / 80,584 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case   |  cron-fast | cron-schedule | cron-parser |      croner |
| ----------- | ---------: | ------------: | ----------: | ----------: |
| * * * * *   | ~63k ±0.2% |  ~21k ±0.2% ✓ | ~2k ±0.5% ✓ | ~4k ±0.3% ✓ |
| 0 9 * * 1-5 | ~23k ±0.5% |  ~10k ±0.2% ✓ | ~1k ±0.5% ✓ | ~1k ±0.3% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case   |             cron-fast |          cron-schedule |                 cron-parser |                      croner |
| ----------- | --------------------: | ---------------------: | --------------------------: | --------------------------: |
| * * * * *   | 15,904 ns / 18,916 ns |  48,356 ns / 56,334 ns |     521,661 ns / 652,708 ns |     266,398 ns / 343,750 ns |
| 0 9 * * 1-5 | 42,986 ns / 52,542 ns | 97,142 ns / 114,750 ns | 1,961,897 ns / 2,207,459 ns | 1,016,775 ns / 1,175,333 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case    |    cron-fast | cron-schedule |  cron-parser |       croner |
| ------------ | -----------: | ------------: | -----------: | -----------: |
| * * * * *    | ~3423k ±0.8% | ~134k ±0.5% ✓ | ~35k ±0.4% ✓ | ~32k ±2.9% ✓ |
| 0 0 1 * *    | ~2004k ±0.5% | ~484k ±0.5% ✓ |  ~9k ±0.5% ✓ | ~32k ±0.4% ✓ |
| 0 12 31 * *  | ~1818k ±0.5% | ~419k ±0.6% ✓ |  ~9k ±0.4% ✓ | ~32k ±1.4% ✓ |
| */15 * * * * | ~1886k ±0.4% | ~250k ±0.4% ✓ | ~56k ±0.4% ✓ | ~33k ±1.0% ✓ |
| 0 9 * * *    | ~2125k ±0.2% | ~344k ±0.5% ✓ | ~49k ±0.5% ✓ | ~31k ±3.0% ✓ |
| 0 9 15 * 1   | ~1828k ±0.5% | ~504k ±0.5% ✓ | ~66k ±0.5% ✓ | ~32k ±0.5% ✓ |
| 0 9 * * 1-5  | ~1516k ±0.6% | ~323k ±0.4% ✓ | ~51k ±0.3% ✓ | ~31k ±1.4% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case    |         cron-fast |        cron-schedule |             cron-parser |                croner |
| ------------ | ----------------: | -------------------: | ----------------------: | --------------------: |
| * * * * *    |   292 ns / 375 ns | 7,446 ns / 10,125 ns |   28,325 ns / 35,333 ns | 31,697 ns / 60,000 ns |
| 0 0 1 * *    |   499 ns / 708 ns |  2,067 ns / 2,750 ns | 108,019 ns / 142,459 ns | 31,191 ns / 35,250 ns |
| 0 12 31 * *  |   550 ns / 750 ns |  2,389 ns / 5,334 ns | 114,324 ns / 149,417 ns | 31,338 ns / 38,125 ns |
| */15 * * * * |   530 ns / 750 ns |  4,000 ns / 4,750 ns |   17,833 ns / 20,250 ns | 30,644 ns / 39,125 ns |
| 0 9 * * *    |   471 ns / 625 ns |  2,908 ns / 3,500 ns |   20,301 ns / 24,292 ns | 31,771 ns / 50,417 ns |
| 0 9 15 * 1   |   547 ns / 875 ns |  1,985 ns / 2,709 ns |   15,195 ns / 18,041 ns | 31,139 ns / 35,917 ns |
| 0 9 * * 1-5  | 660 ns / 1,042 ns |  3,096 ns / 3,667 ns |   19,426 ns / 22,708 ns | 32,120 ns / 38,708 ns |

### Validation - Throughput (ops/sec)

| Test Case    |    cron-fast | cron-schedule |   cron-parser |       croner | cron-validate |
| ------------ | -----------: | ------------: | ------------: | -----------: | ------------: |
| * * * * *    | ~9330k ±1.2% | ~156k ±0.4% ✓ |  ~45k ±0.4% ✓ | ~36k ±0.4% ✓ | ~625k ±0.3% ✓ |
| 0 0 1 * *    | ~4813k ±0.6% | ~624k ±0.5% ✓ | ~123k ±0.4% ✓ | ~34k ±0.4% ✓ | ~656k ±0.5% ✓ |
| 0 12 31 * *  | ~4701k ±0.5% | ~608k ±0.5% ✓ | ~122k ±0.4% ✓ | ~35k ±0.4% ✓ | ~647k ±1.8% ✓ |
| */15 * * * * | ~4136k ±0.7% | ~285k ±0.4% ✓ |  ~67k ±0.4% ✓ | ~35k ±0.3% ✓ | ~695k ±0.3% ✓ |
| 0 9 * * *    | ~5601k ±0.9% | ~388k ±0.7% ✓ |  ~86k ±0.4% ✓ | ~35k ±0.5% ✓ | ~621k ±0.4% ✓ |
| 0 9 15 * 1   | ~3852k ±0.7% | ~745k ±0.4% ✓ | ~135k ±0.7% ✓ | ~35k ±0.4% ✓ | ~639k ±2.7% ✓ |
| 0 9 * * 1-5  | ~2984k ±0.2% | ~400k ±0.4% ✓ |  ~89k ±0.3% ✓ | ~34k ±1.0% ✓ | ~637k ±0.3% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| * * * * *    | 107 ns / 125 ns | 6,395 ns / 7,208 ns | 22,138 ns / 27,542 ns | 28,095 ns / 35,083 ns | 1,601 ns / 2,000 ns |
| 0 0 1 * *    | 208 ns / 334 ns | 1,603 ns / 2,084 ns |   8,124 ns / 9,333 ns | 29,002 ns / 35,500 ns | 1,523 ns / 2,125 ns |
| 0 12 31 * *  | 213 ns / 334 ns | 1,645 ns / 2,250 ns |   8,166 ns / 9,375 ns | 28,543 ns / 34,750 ns | 1,546 ns / 1,958 ns |
| */15 * * * * | 242 ns / 375 ns | 3,510 ns / 4,167 ns | 14,919 ns / 17,500 ns | 28,260 ns / 34,791 ns | 1,439 ns / 1,833 ns |
| 0 9 * * *    | 179 ns / 291 ns | 2,580 ns / 3,375 ns | 11,682 ns / 15,333 ns | 28,769 ns / 35,000 ns | 1,610 ns / 2,042 ns |
| 0 9 15 * 1   | 260 ns / 542 ns | 1,342 ns / 1,792 ns |  7,422 ns / 12,209 ns | 28,730 ns / 34,792 ns | 1,565 ns / 1,959 ns |
| 0 9 * * 1-5  | 335 ns / 667 ns | 2,502 ns / 3,042 ns | 11,269 ns / 12,333 ns | 29,112 ns / 35,584 ns | 1,569 ns / 1,958 ns |

### Parsing - Throughput (ops/sec)

| Test Case    |    cron-fast | cron-schedule |   cron-parser |       croner | cron-validate |
| ------------ | -----------: | ------------: | ------------: | -----------: | ------------: |
| * * * * *    | ~8861k ±0.1% | ~157k ±0.4% ✓ |  ~45k ±0.6% ✓ | ~35k ±0.5% ✓ | ~626k ±0.4% ✓ |
| 0 0 1 * *    | ~4848k ±0.6% | ~620k ±0.5% ✓ | ~126k ±0.4% ✓ | ~33k ±1.8% ✓ | ~658k ±0.4% ✓ |
| 0 12 31 * *  | ~4644k ±0.6% | ~615k ±0.5% ✓ | ~124k ±0.4% ✓ | ~35k ±0.4% ✓ | ~662k ±0.4% ✓ |
| */15 * * * * | ~4184k ±0.7% | ~287k ±0.4% ✓ |  ~68k ±0.3% ✓ | ~35k ±0.3% ✓ | ~693k ±0.3% ✓ |
| 0 9 * * *    | ~5714k ±0.4% | ~404k ±0.4% ✓ |  ~86k ±0.3% ✓ | ~36k ±0.3% ✓ | ~636k ±0.3% ✓ |
| 0 9 15 * 1   | ~3806k ±1.6% | ~751k ±0.4% ✓ | ~139k ±0.3% ✓ | ~34k ±0.4% ✓ | ~660k ±1.4% ✓ |
| 0 9 * * 1-5  | ~2939k ±0.1% | ~400k ±0.4% ✓ |  ~88k ±0.3% ✓ | ~35k ±0.3% ✓ | ~620k ±0.9% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| * * * * *    | 113 ns / 167 ns | 6,382 ns / 7,417 ns | 22,027 ns / 29,333 ns | 28,383 ns / 36,167 ns | 1,598 ns / 2,000 ns |
| 0 0 1 * *    | 206 ns / 334 ns | 1,613 ns / 2,167 ns |   7,965 ns / 8,959 ns | 30,270 ns / 53,209 ns | 1,520 ns / 1,959 ns |
| 0 12 31 * *  | 215 ns / 375 ns | 1,627 ns / 2,167 ns |   8,095 ns / 9,791 ns | 28,206 ns / 34,125 ns | 1,510 ns / 1,916 ns |
| */15 * * * * | 239 ns / 375 ns | 3,482 ns / 4,167 ns | 14,663 ns / 17,250 ns | 28,432 ns / 40,083 ns | 1,442 ns / 1,834 ns |
| 0 9 * * *    | 175 ns / 292 ns | 2,474 ns / 3,042 ns | 11,663 ns / 14,291 ns | 27,903 ns / 34,291 ns | 1,572 ns / 1,958 ns |
| 0 9 15 * 1   | 263 ns / 666 ns | 1,332 ns / 1,792 ns |   7,199 ns / 8,208 ns | 29,026 ns / 35,958 ns | 1,514 ns / 1,958 ns |
| 0 9 * * 1-5  | 340 ns / 750 ns | 2,498 ns / 3,125 ns | 11,340 ns / 13,417 ns | 28,539 ns / 34,750 ns | 1,612 ns / 2,208 ns |

### Validation Varied Inputs - Throughput (ops/sec)

| Test Case                  |    cron-fast | cron-schedule |   cron-parser |       croner | cron-validate |
| -------------------------- | -----------: | ------------: | ------------: | -----------: | ------------: |
| varied inputs (anti-cache) | ~4331k ±2.1% | ~477k ±0.7% ✓ | ~116k ±0.3% ✓ | ~35k ±0.4% ✓ | ~608k ±1.4% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation Varied Inputs - Latency (mean / p99)

| Test Case                  |       cron-fast |       cron-schedule |          cron-parser |                croner |       cron-validate |
| -------------------------- | --------------: | ------------------: | -------------------: | --------------------: | ------------------: |
| varied inputs (anti-cache) | 231 ns / 542 ns | 2,096 ns / 2,875 ns | 8,610 ns / 11,208 ns | 28,678 ns / 41,708 ns | 1,645 ns / 2,084 ns |

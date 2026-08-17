# Benchmark

> Tested with bun v1.3.14, cron-fast v3.6.0, croner v10.0.1, cron-parser v5.10.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by mitata.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~3163k      | baseline     |
| cron-schedule | ~327k       | 9.7x faster  |
| cron-parser   | ~42k        | 75.5x faster |
| croner        | ~60k        | 52.5x faster |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~60k        | baseline     |
| cron-schedule | ~25k        | 2.4x faster  |
| cron-parser   | ~1k         | 45.4x faster |
| croner        | ~6k         | 9.8x faster  |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~3215k      | baseline     |
| cron-schedule | ~339k       | 9.5x faster  |
| cron-parser   | ~50k        | 64.1x faster |
| croner        | ~62k        | 52.1x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~7257k      | baseline      |
| cron-schedule | ~373k       | 19.5x faster  |
| cron-parser   | ~139k       | 52.2x faster  |
| croner        | ~68k        | 107.1x faster |
| cron-validate | ~1020k      | 7.1x faster   |

### Validation Varied Inputs

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~5884k      | baseline     |
| cron-schedule | ~359k       | 16.4x faster |
| cron-parser   | ~156k       | 37.8x faster |
| croner        | ~63k        | 93.8x faster |
| cron-validate | ~788k       | 7.5x faster  |

### Parsing

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~7081k      | baseline      |
| cron-schedule | ~372k       | 19.0x faster  |
| cron-parser   | ~140k       | 50.6x faster  |
| croner        | ~68k        | 104.3x faster |
| cron-validate | ~1031k      | 6.9x faster   |

Run benchmarks yourself: `pnpm bench:bun`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner |
| ------------ | --------: | ------------: | ----------: | -----: |
| * * * * *    |    ~7204k |       ~159k ✓ |      ~36k ✓ | ~63k ✓ |
| 0 0 1 * *    |    ~2970k |       ~427k ✓ |      ~21k ✓ | ~63k ✓ |
| 0 12 31 * *  |    ~2972k |       ~433k ✓ |       ~9k ✓ | ~59k ✓ |
| */15 * * * * |    ~2911k |       ~216k ✓ |      ~72k ✓ | ~64k ✓ |
| 0 9 * * *    |    ~2763k |       ~296k ✓ |      ~54k ✓ | ~64k ✓ |
| 0 9 15 * 1   |    ~1558k |       ~489k ✓ |      ~45k ✓ | ~56k ✓ |
| 0 9 * * 1-5  |    ~1763k |       ~270k ✓ |      ~56k ✓ | ~53k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |             cron-parser |                croner |
| ------------ | --------------: | ------------------: | ----------------------: | --------------------: |
| * * * * *    | 139 ns / 231 ns | 6,305 ns / 6,531 ns |   28,167 ns / 43,542 ns | 15,886 ns / 25,916 ns |
| 0 0 1 * *    | 337 ns / 446 ns | 2,343 ns / 2,567 ns |   46,923 ns / 69,083 ns | 15,982 ns / 16,457 ns |
| 0 12 31 * *  | 336 ns / 445 ns | 2,309 ns / 2,415 ns | 112,952 ns / 155,875 ns | 17,006 ns / 17,962 ns |
| */15 * * * * | 344 ns / 449 ns | 4,627 ns / 4,729 ns |   13,831 ns / 13,918 ns | 15,649 ns / 16,121 ns |
| 0 9 * * *    | 362 ns / 481 ns | 3,380 ns / 3,499 ns |   18,570 ns / 19,438 ns | 15,566 ns / 15,991 ns |
| 0 9 15 * 1   | 642 ns / 834 ns | 2,046 ns / 2,218 ns |   22,344 ns / 33,000 ns | 17,744 ns / 18,541 ns |
| 0 9 * * 1-5  | 567 ns / 708 ns | 3,704 ns / 3,934 ns |   17,705 ns / 17,791 ns | 18,762 ns / 19,218 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case   | cron-fast | cron-schedule | cron-parser | croner |
| ----------- | --------: | ------------: | ----------: | -----: |
| * * * * *   |      ~96k |        ~30k ✓ |       ~2k ✓ | ~11k ✓ |
| 0 9 * * 1-5 |      ~24k |        ~20k ✓ |       ~1k ✓ |  ~1k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case   |             cron-fast |         cron-schedule |                 cron-parser |                  croner |
| ----------- | --------------------: | --------------------: | --------------------------: | ----------------------: |
| * * * * *   | 10,465 ns / 10,594 ns | 33,810 ns / 34,288 ns |     492,303 ns / 744,250 ns |  93,339 ns / 114,084 ns |
| 0 9 * * 1-5 | 40,855 ns / 41,610 ns | 49,905 ns / 50,785 ns | 1,635,248 ns / 2,338,625 ns | 674,364 ns / 749,833 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner |
| ------------ | --------: | ------------: | ----------: | -----: |
| * * * * *    |    ~7232k |       ~156k ✓ |      ~42k ✓ | ~63k ✓ |
| 0 0 1 * *    |    ~2868k |       ~446k ✓ |      ~12k ✓ | ~61k ✓ |
| 0 12 31 * *  |    ~2739k |       ~433k ✓ |      ~11k ✓ | ~60k ✓ |
| */15 * * * * |    ~2541k |       ~217k ✓ |      ~72k ✓ | ~63k ✓ |
| 0 9 * * *    |    ~2872k |       ~301k ✓ |      ~64k ✓ | ~64k ✓ |
| 0 9 15 * 1   |    ~2334k |       ~533k ✓ |      ~86k ✓ | ~63k ✓ |
| 0 9 * * 1-5  |    ~1920k |       ~284k ✓ |      ~65k ✓ | ~57k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |            cron-parser |                croner |
| ------------ | --------------: | ------------------: | ---------------------: | --------------------: |
| * * * * *    | 138 ns / 215 ns | 6,406 ns / 6,755 ns |  24,046 ns / 24,031 ns | 15,973 ns / 16,508 ns |
| 0 0 1 * *    | 349 ns / 463 ns | 2,242 ns / 2,385 ns | 85,802 ns / 113,125 ns | 16,262 ns / 17,301 ns |
| 0 12 31 * *  | 365 ns / 484 ns | 2,308 ns / 2,428 ns | 90,330 ns / 121,000 ns | 16,550 ns / 17,298 ns |
| */15 * * * * | 394 ns / 491 ns | 4,601 ns / 4,777 ns |  13,963 ns / 14,155 ns | 15,773 ns / 16,233 ns |
| 0 9 * * *    | 348 ns / 454 ns | 3,323 ns / 3,432 ns |  15,664 ns / 16,128 ns | 15,737 ns / 16,313 ns |
| 0 9 15 * 1   | 429 ns / 553 ns | 1,878 ns / 2,020 ns |  11,574 ns / 11,674 ns | 15,788 ns / 16,521 ns |
| 0 9 * * 1-5  | 521 ns / 630 ns | 3,519 ns / 3,663 ns |  15,339 ns / 15,995 ns | 17,424 ns / 18,911 ns |

### Validation - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| ------------ | --------: | ------------: | ----------: | -----: | ------------: |
| * * * * *    |   ~17951k |       ~164k ✓ |      ~52k ✓ | ~69k ✓ |       ~897k ✓ |
| 0 0 1 * *    |    ~5893k |       ~488k ✓ |     ~185k ✓ | ~67k ✓ |      ~1083k ✓ |
| 0 12 31 * *  |    ~5691k |       ~488k ✓ |     ~188k ✓ | ~68k ✓ |       ~958k ✓ |
| */15 * * * * |    ~5701k |       ~229k ✓ |      ~91k ✓ | ~68k ✓ |      ~1094k ✓ |
| 0 9 * * *    |    ~7586k |       ~317k ✓ |     ~121k ✓ | ~69k ✓ |      ~1063k ✓ |
| 0 9 15 * 1   |    ~4572k |       ~611k ✓ |     ~213k ✓ | ~67k ✓ |       ~971k ✓ |
| 0 9 * * 1-5  |    ~3404k |       ~311k ✓ |     ~123k ✓ | ~66k ✓ |      ~1072k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| * * * * *    |   56 ns / 64 ns | 6,081 ns / 6,186 ns | 19,169 ns / 19,535 ns | 14,515 ns / 14,569 ns | 1,115 ns / 2,167 ns |
| 0 0 1 * *    | 170 ns / 275 ns | 2,051 ns / 2,165 ns |   5,409 ns / 5,536 ns | 14,840 ns / 15,479 ns |   923 ns / 1,039 ns |
| 0 12 31 * *  | 176 ns / 284 ns | 2,050 ns / 2,202 ns |   5,315 ns / 5,431 ns | 14,683 ns / 14,736 ns | 1,044 ns / 1,155 ns |
| */15 * * * * | 175 ns / 230 ns | 4,360 ns / 4,490 ns | 10,981 ns / 11,061 ns | 14,714 ns / 14,644 ns |   914 ns / 1,041 ns |
| 0 9 * * *    | 132 ns / 239 ns | 3,150 ns / 3,293 ns |   8,248 ns / 8,315 ns | 14,573 ns / 14,369 ns |   941 ns / 1,060 ns |
| 0 9 15 * 1   | 219 ns / 330 ns | 1,637 ns / 1,762 ns |   4,698 ns / 4,847 ns | 14,897 ns / 14,951 ns | 1,030 ns / 1,140 ns |
| 0 9 * * 1-5  | 294 ns / 397 ns | 3,214 ns / 3,384 ns |   8,137 ns / 8,231 ns | 15,068 ns / 14,907 ns |   933 ns / 1,042 ns |

### Parsing - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| ------------ | --------: | ------------: | ----------: | -----: | ------------: |
| * * * * *    |   ~17049k |       ~165k ✓ |      ~53k ✓ | ~69k ✓ |      ~1039k ✓ |
| 0 0 1 * *    |    ~5822k |       ~487k ✓ |     ~189k ✓ | ~68k ✓ |      ~1083k ✓ |
| 0 12 31 * *  |    ~5721k |       ~488k ✓ |     ~189k ✓ | ~68k ✓ |       ~967k ✓ |
| */15 * * * * |    ~5554k |       ~230k ✓ |      ~91k ✓ | ~68k ✓ |      ~1094k ✓ |
| 0 9 * * *    |    ~7552k |       ~319k ✓ |     ~122k ✓ | ~68k ✓ |      ~1026k ✓ |
| 0 9 15 * 1   |    ~4439k |       ~607k ✓ |     ~213k ✓ | ~68k ✓ |       ~977k ✓ |
| 0 9 * * 1-5  |    ~3430k |       ~310k ✓ |     ~122k ✓ | ~67k ✓ |      ~1032k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| * * * * *    |   59 ns / 78 ns | 6,076 ns / 6,211 ns | 18,739 ns / 19,033 ns | 14,540 ns / 14,439 ns |   962 ns / 1,077 ns |
| 0 0 1 * *    | 172 ns / 271 ns | 2,055 ns / 2,180 ns |   5,285 ns / 5,422 ns | 14,739 ns / 14,661 ns |   923 ns / 1,024 ns |
| 0 12 31 * *  | 175 ns / 275 ns | 2,051 ns / 2,160 ns |   5,288 ns / 5,392 ns | 14,649 ns / 14,641 ns | 1,034 ns / 1,123 ns |
| */15 * * * * | 180 ns / 259 ns | 4,345 ns / 4,451 ns | 11,004 ns / 11,106 ns | 14,664 ns / 14,409 ns |   914 ns / 1,025 ns |
| 0 9 * * *    | 132 ns / 225 ns | 3,134 ns / 3,221 ns |   8,178 ns / 8,252 ns | 14,732 ns / 14,705 ns |   975 ns / 1,063 ns |
| 0 9 15 * 1   | 225 ns / 331 ns | 1,648 ns / 1,791 ns |   4,694 ns / 4,812 ns | 14,771 ns / 14,610 ns | 1,023 ns / 1,111 ns |
| 0 9 * * 1-5  | 292 ns / 388 ns | 3,222 ns / 3,351 ns |   8,176 ns / 8,334 ns | 14,976 ns / 14,837 ns |   969 ns / 1,056 ns |

### Validation Varied Inputs - Throughput (ops/sec)

| Test Case | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------- | --------: | ------------: | ----------: | -----: | ------------: |
| varied    |    ~5884k |       ~359k ✓ |     ~156k ✓ | ~63k ✓ |       ~788k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation Varied Inputs - Latency (mean / p99)

| Test Case |       cron-fast |       cron-schedule |          cron-parser |                croner |       cron-validate |
| --------- | --------------: | ------------------: | -------------------: | --------------------: | ------------------: |
| varied    | 170 ns / 299 ns | 2,788 ns / 6,375 ns | 6,430 ns / 12,500 ns | 15,935 ns / 29,458 ns | 1,270 ns / 3,666 ns |

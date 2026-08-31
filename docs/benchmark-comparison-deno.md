# Benchmark

> Tested with deno v2.9.6, cron-fast v3.10.0, croner v10.0.1, cron-parser v5.10.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by Deno.bench().

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2758k      | baseline     |
| cron-schedule | ~407k       | 6.8x faster  |
| cron-parser   | ~36k        | 76.3x faster |
| croner        | ~32k        | 87.1x faster |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~42k        | baseline     |
| cron-schedule | ~18k        | 2.3x faster  |
| cron-parser   | ~1k         | 44.0x faster |
| croner        | ~2k         | 18.6x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2682k      | baseline     |
| cron-schedule | ~436k       | 6.1x faster  |
| cron-parser   | ~41k        | 64.7x faster |
| croner        | ~32k        | 84.9x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~11280k     | baseline      |
| cron-schedule | ~566k       | 19.9x faster  |
| cron-parser   | ~106k       | 105.9x faster |
| croner        | ~34k        | 327.0x faster |
| cron-validate | ~1663k      | 6.8x faster   |

### Validation Varied Inputs

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~9977k      | baseline      |
| cron-schedule | ~670k       | 14.9x faster  |
| cron-parser   | ~134k       | 74.5x faster  |
| croner        | ~35k        | 287.6x faster |
| cron-validate | ~1422k      | 7.0x faster   |

### Parsing

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~11393k     | baseline      |
| cron-schedule | ~567k       | 20.1x faster  |
| cron-parser   | ~107k       | 106.3x faster |
| croner        | ~35k        | 328.1x faster |
| cron-validate | ~1651k      | 6.9x faster   |

Run benchmarks yourself: `pnpm bench:deno`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner |
| ------------ | --------: | ------------: | ----------: | -----: |
| * * * * *    |    ~4557k |       ~161k ✓ |      ~33k ✓ | ~34k ✓ |
| 0 0 1 * *    |    ~2733k |       ~578k ✓ |      ~19k ✓ | ~32k ✓ |
| 0 12 31 * *  |    ~2405k |       ~561k ✓ |       ~8k ✓ | ~31k ✓ |
| */15 * * * * |    ~2831k |       ~296k ✓ |      ~58k ✓ | ~33k ✓ |
| 0 9 * * *    |    ~2823k |       ~391k ✓ |      ~47k ✓ | ~32k ✓ |
| 0 9 15 * 1   |    ~1698k |       ~525k ✓ |      ~41k ✓ | ~31k ✓ |
| 0 9 * * 1-5  |    ~2263k |       ~340k ✓ |      ~48k ✓ | ~30k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |             cron-parser |                croner |
| ------------ | --------------: | ------------------: | ----------------------: | --------------------: |
| * * * * *    | 219 ns / 234 ns | 6,220 ns / 7,272 ns |   30,684 ns / 59,875 ns | 29,774 ns / 61,334 ns |
| 0 0 1 * *    | 366 ns / 396 ns | 1,729 ns / 1,942 ns |   52,438 ns / 84,125 ns | 31,724 ns / 49,250 ns |
| 0 12 31 * *  | 416 ns / 435 ns | 1,783 ns / 1,853 ns | 131,223 ns / 233,666 ns | 32,724 ns / 49,250 ns |
| */15 * * * * | 353 ns / 372 ns | 3,382 ns / 3,478 ns |   17,241 ns / 22,500 ns | 30,384 ns / 40,667 ns |
| 0 9 * * *    | 354 ns / 369 ns | 2,557 ns / 2,597 ns |   21,474 ns / 27,458 ns | 31,186 ns / 41,959 ns |
| 0 9 15 * 1   | 589 ns / 625 ns | 1,906 ns / 1,948 ns |   24,429 ns / 31,459 ns | 32,180 ns / 38,042 ns |
| 0 9 * * 1-5  | 442 ns / 466 ns | 2,940 ns / 2,982 ns |   20,641 ns / 24,083 ns | 33,498 ns / 39,250 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case   | cron-fast | cron-schedule | cron-parser | croner |
| ----------- | --------: | ------------: | ----------: | -----: |
| * * * * *   |      ~57k |        ~25k ✓ |       ~1k ✓ |  ~4k ✓ |
| 0 9 * * 1-5 |      ~26k |        ~12k ✓ |       ~0k ✓ |  ~1k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case   |             cron-fast |          cron-schedule |                 cron-parser |                      croner |
| ----------- | --------------------: | ---------------------: | --------------------------: | --------------------------: |
| * * * * *   | 17,567 ns / 20,041 ns |  40,346 ns / 70,375 ns |     703,443 ns / 851,417 ns |     282,476 ns / 354,917 ns |
| 0 9 * * 1-5 | 37,868 ns / 41,875 ns | 85,073 ns / 109,542 ns | 2,123,103 ns / 2,412,459 ns | 1,051,238 ns / 1,182,958 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner |
| ------------ | --------: | ------------: | ----------: | -----: |
| * * * * *    |    ~3847k |       ~196k ✓ |      ~36k ✓ | ~31k ✓ |
| 0 0 1 * *    |    ~2640k |       ~618k ✓ |       ~9k ✓ | ~31k ✓ |
| 0 12 31 * *  |    ~2338k |       ~519k ✓ |       ~8k ✓ | ~32k ✓ |
| */15 * * * * |    ~2613k |       ~296k ✓ |      ~59k ✓ | ~32k ✓ |
| 0 9 * * *    |    ~2677k |       ~405k ✓ |      ~53k ✓ | ~32k ✓ |
| 0 9 15 * 1   |    ~2423k |       ~641k ✓ |      ~71k ✓ | ~32k ✓ |
| 0 9 * * 1-5  |    ~2235k |       ~381k ✓ |      ~54k ✓ | ~31k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |             cron-parser |                croner |
| ------------ | --------------: | ------------------: | ----------------------: | --------------------: |
| * * * * *    | 260 ns / 278 ns | 5,103 ns / 5,656 ns |   27,906 ns / 42,334 ns | 32,010 ns / 48,625 ns |
| 0 0 1 * *    | 379 ns / 400 ns | 1,618 ns / 1,673 ns | 110,813 ns / 209,375 ns | 31,949 ns / 49,917 ns |
| 0 12 31 * *  | 428 ns / 450 ns | 1,927 ns / 1,989 ns | 118,513 ns / 221,875 ns | 31,476 ns / 46,333 ns |
| */15 * * * * | 383 ns / 400 ns | 3,384 ns / 3,449 ns |   16,863 ns / 22,292 ns | 30,840 ns / 45,625 ns |
| 0 9 * * *    | 373 ns / 395 ns | 2,471 ns / 2,531 ns |   18,977 ns / 25,542 ns | 31,544 ns / 49,916 ns |
| 0 9 15 * 1   | 413 ns / 431 ns | 1,560 ns / 1,597 ns |   14,123 ns / 15,291 ns | 30,994 ns / 36,500 ns |
| 0 9 * * 1-5  | 448 ns / 474 ns | 2,624 ns / 2,683 ns |   18,517 ns / 26,459 ns | 32,772 ns / 49,000 ns |

### Validation - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| ------------ | --------: | ------------: | ----------: | -----: | ------------: |
| * * * * *    |   ~17205k |       ~216k ✓ |      ~47k ✓ | ~35k ✓ |      ~1663k ✓ |
| 0 0 1 * *    |   ~11704k |       ~784k ✓ |     ~140k ✓ | ~35k ✓ |      ~1734k ✓ |
| 0 12 31 * *  |    ~9746k |       ~777k ✓ |     ~138k ✓ | ~35k ✓ |      ~1732k ✓ |
| */15 * * * * |   ~10798k |       ~330k ✓ |      ~70k ✓ | ~33k ✓ |      ~1531k ✓ |
| 0 9 * * *    |   ~12990k |       ~467k ✓ |      ~92k ✓ | ~34k ✓ |      ~1670k ✓ |
| 0 9 15 * 1   |    ~8758k |       ~923k ✓ |     ~163k ✓ | ~34k ✓ |      ~1727k ✓ |
| 0 9 * * 1-5  |    ~7755k |       ~466k ✓ |      ~96k ✓ | ~34k ✓ |      ~1583k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |   cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | --------------: |
| * * * * *    |   58 ns / 69 ns | 4,620 ns / 4,680 ns | 21,222 ns / 24,708 ns | 28,473 ns / 35,542 ns | 601 ns / 685 ns |
| 0 0 1 * *    |   85 ns / 99 ns | 1,276 ns / 1,317 ns |   7,146 ns / 7,437 ns | 28,487 ns / 32,625 ns | 577 ns / 606 ns |
| 0 12 31 * *  | 103 ns / 116 ns | 1,288 ns / 1,341 ns |   7,256 ns / 7,351 ns | 28,373 ns / 33,083 ns | 577 ns / 602 ns |
| */15 * * * * |  93 ns / 105 ns | 3,026 ns / 3,096 ns | 14,292 ns / 17,875 ns | 29,852 ns / 47,500 ns | 653 ns / 751 ns |
| 0 9 * * *    |   77 ns / 90 ns | 2,140 ns / 2,225 ns | 10,918 ns / 19,083 ns | 29,264 ns / 46,834 ns | 599 ns / 634 ns |
| 0 9 15 * 1   | 114 ns / 126 ns | 1,083 ns / 1,101 ns |   6,149 ns / 6,222 ns | 29,233 ns / 35,500 ns | 579 ns / 612 ns |
| 0 9 * * 1-5  | 129 ns / 141 ns | 2,144 ns / 2,270 ns | 10,391 ns / 12,125 ns | 29,287 ns / 38,792 ns | 632 ns / 654 ns |

### Parsing - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| ------------ | --------: | ------------: | ----------: | -----: | ------------: |
| * * * * *    |   ~17357k |       ~217k ✓ |      ~47k ✓ | ~35k ✓ |      ~1638k ✓ |
| 0 0 1 * *    |   ~11803k |       ~782k ✓ |     ~142k ✓ | ~35k ✓ |      ~1697k ✓ |
| 0 12 31 * *  |    ~9834k |       ~784k ✓ |     ~139k ✓ | ~35k ✓ |      ~1684k ✓ |
| */15 * * * * |   ~10969k |       ~333k ✓ |      ~71k ✓ | ~35k ✓ |      ~1528k ✓ |
| 0 9 * * *    |   ~13132k |       ~469k ✓ |      ~93k ✓ | ~34k ✓ |      ~1674k ✓ |
| 0 9 15 * 1   |    ~8857k |       ~913k ✓ |     ~163k ✓ | ~34k ✓ |      ~1747k ✓ |
| 0 9 * * 1-5  |    ~7798k |       ~470k ✓ |      ~96k ✓ | ~35k ✓ |      ~1590k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |   cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | --------------: |
| * * * * *    |   58 ns / 67 ns | 4,601 ns / 4,645 ns | 21,231 ns / 25,167 ns | 28,471 ns / 35,166 ns | 611 ns / 625 ns |
| 0 0 1 * *    |   85 ns / 96 ns | 1,278 ns / 1,336 ns |   7,049 ns / 7,109 ns | 28,612 ns / 34,209 ns | 589 ns / 603 ns |
| 0 12 31 * *  | 102 ns / 111 ns | 1,275 ns / 1,311 ns |   7,212 ns / 7,285 ns | 28,571 ns / 35,000 ns | 594 ns / 623 ns |
| */15 * * * * |  91 ns / 102 ns | 3,000 ns / 3,033 ns | 14,139 ns / 15,166 ns | 28,935 ns / 35,958 ns | 654 ns / 690 ns |
| 0 9 * * *    |   76 ns / 87 ns | 2,134 ns / 2,189 ns | 10,702 ns / 12,084 ns | 29,056 ns / 35,459 ns | 597 ns / 618 ns |
| 0 9 15 * 1   | 113 ns / 123 ns | 1,095 ns / 1,140 ns |   6,149 ns / 6,211 ns | 29,143 ns / 34,125 ns | 573 ns / 601 ns |
| 0 9 * * 1-5  | 128 ns / 141 ns | 2,129 ns / 2,157 ns | 10,420 ns / 12,958 ns | 28,835 ns / 34,417 ns | 629 ns / 661 ns |

### Validation Varied Inputs - Throughput (ops/sec)

| Test Case | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------- | --------: | ------------: | ----------: | -----: | ------------: |
| varied    |    ~9977k |       ~670k ✓ |     ~134k ✓ | ~35k ✓ |      ~1422k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation Varied Inputs - Latency (mean / p99)

| Test Case |       cron-fast |       cron-schedule |         cron-parser |                croner |   cron-validate |
| --------- | --------------: | ------------------: | ------------------: | --------------------: | --------------: |
| varied    | 100 ns / 110 ns | 1,493 ns / 1,554 ns | 7,469 ns / 7,594 ns | 28,830 ns / 35,458 ns | 703 ns / 722 ns |

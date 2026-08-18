# Benchmark

> Tested with deno v2.9.5, cron-fast v3.7.0, croner v10.0.1, cron-parser v5.10.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by Deno.bench().

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2409k      | baseline     |
| cron-schedule | ~391k       | 6.2x faster  |
| cron-parser   | ~34k        | 71.1x faster |
| croner        | ~31k        | 78.9x faster |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~41k        | baseline     |
| cron-schedule | ~18k        | 2.3x faster  |
| cron-parser   | ~1k         | 44.6x faster |
| croner        | ~2k         | 18.6x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2395k      | baseline     |
| cron-schedule | ~426k       | 5.6x faster  |
| cron-parser   | ~40k        | 60.3x faster |
| croner        | ~31k        | 77.7x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~7820k      | baseline      |
| cron-schedule | ~550k       | 14.2x faster  |
| cron-parser   | ~104k       | 75.4x faster  |
| croner        | ~33k        | 234.7x faster |
| cron-validate | ~1647k      | 4.7x faster   |

### Validation Varied Inputs

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~6012k      | baseline      |
| cron-schedule | ~639k       | 9.4x faster   |
| cron-parser   | ~127k       | 47.3x faster  |
| croner        | ~34k        | 178.2x faster |
| cron-validate | ~1379k      | 4.4x faster   |

### Parsing

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~7829k      | baseline      |
| cron-schedule | ~550k       | 14.2x faster  |
| cron-parser   | ~104k       | 75.1x faster  |
| croner        | ~33k        | 236.1x faster |
| cron-validate | ~1608k      | 4.9x faster   |

Run benchmarks yourself: `pnpm bench:deno`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner |
| ------------ | --------: | ------------: | ----------: | -----: |
| * * * * *    |    ~4457k |       ~141k ✓ |      ~31k ✓ | ~33k ✓ |
| 0 0 1 * *    |    ~2122k |       ~539k ✓ |      ~18k ✓ | ~31k ✓ |
| 0 12 31 * *  |    ~2022k |       ~547k ✓ |       ~7k ✓ | ~30k ✓ |
| */15 * * * * |    ~2579k |       ~291k ✓ |      ~55k ✓ | ~31k ✓ |
| 0 9 * * *    |    ~2373k |       ~379k ✓ |      ~43k ✓ | ~31k ✓ |
| 0 9 15 * 1   |    ~1424k |       ~507k ✓ |      ~38k ✓ | ~29k ✓ |
| 0 9 * * 1-5  |    ~1886k |       ~331k ✓ |      ~45k ✓ | ~29k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case    |       cron-fast |        cron-schedule |             cron-parser |                croner |
| ------------ | --------------: | -------------------: | ----------------------: | --------------------: |
| * * * * *    | 224 ns / 239 ns | 7,116 ns / 11,625 ns |   32,067 ns / 73,417 ns | 30,720 ns / 66,500 ns |
| 0 0 1 * *    | 471 ns / 516 ns |  1,855 ns / 2,444 ns |   54,768 ns / 92,375 ns | 32,552 ns / 66,875 ns |
| 0 12 31 * *  | 495 ns / 519 ns |  1,829 ns / 1,887 ns | 135,942 ns / 244,791 ns | 33,392 ns / 53,375 ns |
| */15 * * * * | 388 ns / 408 ns |  3,432 ns / 3,595 ns |   18,252 ns / 28,708 ns | 31,936 ns / 56,291 ns |
| 0 9 * * *    | 421 ns / 444 ns |  2,636 ns / 2,681 ns |   23,364 ns / 48,500 ns | 32,191 ns / 51,917 ns |
| 0 9 15 * 1   | 702 ns / 745 ns |  1,974 ns / 2,038 ns |   26,294 ns / 47,834 ns | 34,315 ns / 64,000 ns |
| 0 9 * * 1-5  | 530 ns / 548 ns |  3,020 ns / 3,120 ns |   22,304 ns / 42,334 ns | 34,561 ns / 54,458 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case   | cron-fast | cron-schedule | cron-parser | croner |
| ----------- | --------: | ------------: | ----------: | -----: |
| * * * * *   |      ~56k |        ~24k ✓ |       ~1k ✓ |  ~3k ✓ |
| 0 9 * * 1-5 |      ~26k |        ~12k ✓ |       ~0k ✓ |  ~1k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case   |             cron-fast |          cron-schedule |                 cron-parser |                      croner |
| ----------- | --------------------: | ---------------------: | --------------------------: | --------------------------: |
| * * * * *   | 17,845 ns / 21,125 ns |  41,505 ns / 71,875 ns |     727,531 ns / 907,458 ns |     286,874 ns / 356,792 ns |
| 0 9 * * 1-5 | 38,545 ns / 54,542 ns | 84,959 ns / 117,041 ns | 2,149,636 ns / 2,514,625 ns | 1,076,623 ns / 1,236,458 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner |
| ------------ | --------: | ------------: | ----------: | -----: |
| * * * * *    |    ~3924k |       ~190k ✓ |      ~35k ✓ | ~31k ✓ |
| 0 0 1 * *    |    ~2189k |       ~604k ✓ |       ~9k ✓ | ~31k ✓ |
| 0 12 31 * *  |    ~2047k |       ~508k ✓ |       ~8k ✓ | ~30k ✓ |
| */15 * * * * |    ~2425k |       ~292k ✓ |      ~57k ✓ | ~31k ✓ |
| 0 9 * * *    |    ~2338k |       ~391k ✓ |      ~51k ✓ | ~31k ✓ |
| 0 9 15 * 1   |    ~1965k |       ~626k ✓ |      ~68k ✓ | ~31k ✓ |
| 0 9 * * 1-5  |    ~1876k |       ~368k ✓ |      ~51k ✓ | ~30k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |             cron-parser |                croner |
| ------------ | --------------: | ------------------: | ----------------------: | --------------------: |
| * * * * *    | 255 ns / 271 ns | 5,250 ns / 5,841 ns |   28,632 ns / 52,458 ns | 31,826 ns / 54,625 ns |
| 0 0 1 * *    | 457 ns / 480 ns | 1,656 ns / 1,744 ns | 115,890 ns / 217,167 ns | 32,268 ns / 49,000 ns |
| 0 12 31 * *  | 489 ns / 511 ns | 1,968 ns / 2,053 ns | 124,240 ns / 241,875 ns | 32,868 ns / 50,917 ns |
| */15 * * * * | 412 ns / 440 ns | 3,429 ns / 3,583 ns |   17,613 ns / 29,083 ns | 32,029 ns / 52,584 ns |
| 0 9 * * *    | 428 ns / 453 ns | 2,556 ns / 2,607 ns |   19,777 ns / 27,292 ns | 32,368 ns / 58,667 ns |
| 0 9 15 * 1   | 509 ns / 535 ns | 1,597 ns / 1,648 ns |   14,803 ns / 21,250 ns | 32,009 ns / 51,458 ns |
| 0 9 * * 1-5  | 533 ns / 554 ns | 2,715 ns / 2,790 ns |   19,474 ns / 36,333 ns | 33,777 ns / 54,292 ns |

### Validation - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| ------------ | --------: | ------------: | ----------: | -----: | ------------: |
| * * * * *    |   ~17063k |       ~212k ✓ |      ~45k ✓ | ~34k ✓ |      ~1647k ✓ |
| 0 0 1 * *    |    ~6056k |       ~767k ✓ |     ~137k ✓ | ~32k ✓ |      ~1727k ✓ |
| 0 12 31 * *  |    ~6007k |       ~748k ✓ |     ~134k ✓ | ~33k ✓ |      ~1711k ✓ |
| */15 * * * * |    ~8509k |       ~323k ✓ |      ~69k ✓ | ~34k ✓ |      ~1511k ✓ |
| 0 9 * * *    |    ~7594k |       ~457k ✓ |      ~91k ✓ | ~33k ✓ |      ~1674k ✓ |
| 0 9 15 * 1   |    ~4757k |       ~887k ✓ |     ~157k ✓ | ~33k ✓ |      ~1708k ✓ |
| 0 9 * * 1-5  |    ~4753k |       ~459k ✓ |      ~93k ✓ | ~33k ✓ |      ~1551k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |   cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | --------------: |
| * * * * *    |   59 ns / 69 ns | 4,719 ns / 4,809 ns | 22,160 ns / 39,541 ns | 29,023 ns / 37,334 ns | 607 ns / 706 ns |
| 0 0 1 * *    | 165 ns / 188 ns | 1,304 ns / 1,363 ns |   7,325 ns / 7,768 ns | 31,143 ns / 61,541 ns | 579 ns / 602 ns |
| 0 12 31 * *  | 166 ns / 184 ns | 1,338 ns / 1,389 ns |   7,454 ns / 7,628 ns | 30,129 ns / 43,042 ns | 584 ns / 634 ns |
| */15 * * * * | 118 ns / 131 ns | 3,101 ns / 3,213 ns | 14,411 ns / 19,459 ns | 29,343 ns / 44,708 ns | 662 ns / 694 ns |
| 0 9 * * *    | 132 ns / 150 ns | 2,186 ns / 2,250 ns | 11,006 ns / 18,666 ns | 29,981 ns / 47,459 ns | 597 ns / 622 ns |
| 0 9 15 * 1   | 210 ns / 230 ns | 1,128 ns / 1,157 ns |   6,373 ns / 6,583 ns | 30,177 ns / 48,625 ns | 586 ns / 610 ns |
| 0 9 * * 1-5  | 210 ns / 229 ns | 2,177 ns / 2,223 ns | 10,745 ns / 20,375 ns | 30,380 ns / 55,000 ns | 645 ns / 676 ns |

### Parsing - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| ------------ | --------: | ------------: | ----------: | -----: | ------------: |
| * * * * *    |   ~16732k |       ~214k ✓ |      ~45k ✓ | ~33k ✓ |      ~1586k ✓ |
| 0 0 1 * *    |    ~6161k |       ~756k ✓ |     ~138k ✓ | ~33k ✓ |      ~1666k ✓ |
| 0 12 31 * *  |    ~6061k |       ~759k ✓ |     ~136k ✓ | ~33k ✓ |      ~1665k ✓ |
| */15 * * * * |    ~8572k |       ~328k ✓ |      ~70k ✓ | ~34k ✓ |      ~1505k ✓ |
| 0 9 * * *    |    ~7900k |       ~450k ✓ |      ~90k ✓ | ~34k ✓ |      ~1610k ✓ |
| 0 9 15 * 1   |    ~4756k |       ~894k ✓ |     ~158k ✓ | ~33k ✓ |      ~1681k ✓ |
| 0 9 * * 1-5  |    ~4623k |       ~452k ✓ |      ~93k ✓ | ~32k ✓ |      ~1538k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |   cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | --------------: |
| * * * * *    |   60 ns / 73 ns | 4,682 ns / 4,807 ns | 22,228 ns / 44,083 ns | 30,239 ns / 57,709 ns | 631 ns / 660 ns |
| 0 0 1 * *    | 162 ns / 181 ns | 1,322 ns / 1,362 ns |   7,241 ns / 7,471 ns | 30,702 ns / 56,750 ns | 600 ns / 621 ns |
| 0 12 31 * *  | 165 ns / 180 ns | 1,318 ns / 1,377 ns |   7,375 ns / 7,553 ns | 30,114 ns / 43,417 ns | 600 ns / 631 ns |
| */15 * * * * | 117 ns / 130 ns | 3,047 ns / 3,129 ns | 14,336 ns / 17,459 ns | 29,510 ns / 38,417 ns | 664 ns / 700 ns |
| 0 9 * * *    | 127 ns / 142 ns | 2,221 ns / 2,279 ns | 11,076 ns / 13,750 ns | 29,596 ns / 41,458 ns | 621 ns / 650 ns |
| 0 9 15 * 1   | 210 ns / 237 ns | 1,118 ns / 1,172 ns |   6,336 ns / 6,487 ns | 30,062 ns / 39,042 ns | 595 ns / 637 ns |
| 0 9 * * 1-5  | 216 ns / 244 ns | 2,215 ns / 2,281 ns | 10,780 ns / 21,750 ns | 30,878 ns / 53,958 ns | 650 ns / 688 ns |

### Validation Varied Inputs - Throughput (ops/sec)

| Test Case | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------- | --------: | ------------: | ----------: | -----: | ------------: |
| varied    |    ~6012k |       ~639k ✓ |     ~127k ✓ | ~34k ✓ |      ~1379k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation Varied Inputs - Latency (mean / p99)

| Test Case |       cron-fast |       cron-schedule |         cron-parser |                croner |   cron-validate |
| --------- | --------------: | ------------------: | ------------------: | --------------------: | --------------: |
| varied    | 166 ns / 183 ns | 1,564 ns / 1,645 ns | 7,866 ns / 8,054 ns | 29,647 ns / 45,208 ns | 725 ns / 762 ns |

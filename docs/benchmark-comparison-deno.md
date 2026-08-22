# Benchmark

> Tested with deno v2.9.5, cron-fast v3.9.0, croner v10.0.1, cron-parser v5.10.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by Deno.bench().

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2621k      | baseline     |
| cron-schedule | ~391k       | 6.7x faster  |
| cron-parser   | ~35k        | 75.0x faster |
| croner        | ~30k        | 87.3x faster |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~41k        | baseline     |
| cron-schedule | ~18k        | 2.3x faster  |
| cron-parser   | ~1k         | 44.5x faster |
| croner        | ~2k         | 18.7x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2632k      | baseline     |
| cron-schedule | ~423k       | 6.2x faster  |
| cron-parser   | ~41k        | 64.5x faster |
| croner        | ~31k        | 85.9x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~10625k     | baseline      |
| cron-schedule | ~547k       | 19.4x faster  |
| cron-parser   | ~105k       | 101.1x faster |
| croner        | ~33k        | 324.2x faster |
| cron-validate | ~1637k      | 6.5x faster   |

### Validation Varied Inputs

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~9411k      | baseline      |
| cron-schedule | ~640k       | 14.7x faster  |
| cron-parser   | ~132k       | 71.5x faster  |
| croner        | ~32k        | 297.4x faster |
| cron-validate | ~1394k      | 6.8x faster   |

### Parsing

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~10661k     | baseline      |
| cron-schedule | ~550k       | 19.4x faster  |
| cron-parser   | ~106k       | 100.5x faster |
| croner        | ~33k        | 319.0x faster |
| cron-validate | ~1618k      | 6.6x faster   |

Run benchmarks yourself: `pnpm bench:deno`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner |
| ------------ | --------: | ------------: | ----------: | -----: |
| * * * * *    |    ~4346k |       ~156k ✓ |      ~31k ✓ | ~31k ✓ |
| 0 0 1 * *    |    ~2700k |       ~568k ✓ |      ~19k ✓ | ~32k ✓ |
| 0 12 31 * *  |    ~2374k |       ~525k ✓ |       ~8k ✓ | ~30k ✓ |
| */15 * * * * |    ~2517k |       ~294k ✓ |      ~57k ✓ | ~32k ✓ |
| 0 9 * * *    |    ~2735k |       ~382k ✓ |      ~45k ✓ | ~30k ✓ |
| 0 9 15 * 1   |    ~1634k |       ~480k ✓ |      ~38k ✓ | ~28k ✓ |
| 0 9 * * 1-5  |    ~2039k |       ~333k ✓ |      ~47k ✓ | ~27k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |             cron-parser |                croner |
| ------------ | --------------: | ------------------: | ----------------------: | --------------------: |
| * * * * *    | 230 ns / 247 ns | 6,402 ns / 7,458 ns |   32,068 ns / 69,167 ns | 32,256 ns / 87,917 ns |
| 0 0 1 * *    | 370 ns / 395 ns | 1,761 ns / 1,955 ns |   52,679 ns / 77,167 ns | 31,625 ns / 65,042 ns |
| 0 12 31 * *  | 421 ns / 440 ns | 1,904 ns / 1,951 ns | 132,591 ns / 236,834 ns | 32,866 ns / 42,958 ns |
| */15 * * * * | 397 ns / 419 ns | 3,404 ns / 3,530 ns |   17,549 ns / 23,250 ns | 31,381 ns / 42,583 ns |
| 0 9 * * *    | 366 ns / 387 ns | 2,619 ns / 2,665 ns |   22,254 ns / 34,833 ns | 32,813 ns / 64,167 ns |
| 0 9 15 * 1   | 612 ns / 657 ns | 2,083 ns / 2,180 ns |   26,115 ns / 46,833 ns | 35,966 ns / 73,250 ns |
| 0 9 * * 1-5  | 490 ns / 562 ns | 3,004 ns / 3,065 ns |   21,415 ns / 28,958 ns | 37,100 ns / 65,542 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case   | cron-fast | cron-schedule | cron-parser | croner |
| ----------- | --------: | ------------: | ----------: | -----: |
| * * * * *   |      ~56k |        ~24k ✓ |       ~1k ✓ |  ~3k ✓ |
| 0 9 * * 1-5 |      ~26k |        ~12k ✓ |       ~0k ✓ |  ~1k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case   |             cron-fast |          cron-schedule |                 cron-parser |                      croner |
| ----------- | --------------------: | ---------------------: | --------------------------: | --------------------------: |
| * * * * *   | 17,850 ns / 19,834 ns |  40,829 ns / 72,416 ns |     719,208 ns / 862,875 ns |     286,579 ns / 352,708 ns |
| 0 9 * * 1-5 | 38,300 ns / 45,334 ns | 86,142 ns / 115,542 ns | 2,207,060 ns / 2,582,000 ns | 1,113,585 ns / 1,311,291 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner |
| ------------ | --------: | ------------: | ----------: | -----: |
| * * * * *    |    ~3859k |       ~193k ✓ |      ~36k ✓ | ~30k ✓ |
| 0 0 1 * *    |    ~2623k |       ~606k ✓ |       ~9k ✓ | ~31k ✓ |
| 0 12 31 * *  |    ~2333k |       ~501k ✓ |       ~8k ✓ | ~29k ✓ |
| */15 * * * * |    ~2466k |       ~287k ✓ |      ~59k ✓ | ~32k ✓ |
| 0 9 * * *    |    ~2692k |       ~384k ✓ |      ~52k ✓ | ~32k ✓ |
| 0 9 15 * 1   |    ~2338k |       ~611k ✓ |      ~68k ✓ | ~30k ✓ |
| 0 9 * * 1-5  |    ~2111k |       ~377k ✓ |      ~54k ✓ | ~30k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |             cron-parser |                croner |
| ------------ | --------------: | ------------------: | ----------------------: | --------------------: |
| * * * * *    | 259 ns / 280 ns | 5,170 ns / 5,764 ns |   27,925 ns / 40,333 ns | 32,845 ns / 49,417 ns |
| 0 0 1 * *    | 381 ns / 405 ns | 1,651 ns / 1,774 ns | 113,310 ns / 217,541 ns | 32,163 ns / 44,917 ns |
| 0 12 31 * *  | 429 ns / 461 ns | 1,997 ns / 2,105 ns | 123,055 ns / 242,792 ns | 34,660 ns / 53,750 ns |
| */15 * * * * | 406 ns / 429 ns | 3,490 ns / 3,935 ns |   17,037 ns / 20,917 ns | 31,277 ns / 41,000 ns |
| 0 9 * * *    | 372 ns / 388 ns | 2,602 ns / 2,660 ns |   19,086 ns / 24,750 ns | 31,563 ns / 39,958 ns |
| 0 9 15 * 1   | 428 ns / 466 ns | 1,638 ns / 1,912 ns |   14,724 ns / 19,209 ns | 33,111 ns / 46,167 ns |
| 0 9 * * 1-5  | 474 ns / 492 ns | 2,654 ns / 2,720 ns |   18,634 ns / 23,167 ns | 32,977 ns / 42,958 ns |

### Validation - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| ------------ | --------: | ------------: | ----------: | -----: | ------------: |
| * * * * *    |   ~17084k |       ~210k ✓ |      ~45k ✓ | ~33k ✓ |      ~1650k ✓ |
| 0 0 1 * *    |   ~11723k |       ~769k ✓ |     ~140k ✓ | ~34k ✓ |      ~1716k ✓ |
| 0 12 31 * *  |    ~9320k |       ~746k ✓ |     ~134k ✓ | ~32k ✓ |      ~1729k ✓ |
| */15 * * * * |    ~8577k |       ~321k ✓ |      ~70k ✓ | ~34k ✓ |      ~1489k ✓ |
| 0 9 * * *    |   ~12845k |       ~452k ✓ |      ~91k ✓ | ~31k ✓ |      ~1650k ✓ |
| 0 9 15 * 1   |    ~8640k |       ~882k ✓ |     ~162k ✓ | ~34k ✓ |      ~1709k ✓ |
| 0 9 * * 1-5  |    ~6189k |       ~450k ✓ |      ~94k ✓ | ~32k ✓ |      ~1520k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |   cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | --------------: |
| * * * * *    |   59 ns / 69 ns | 4,768 ns / 4,866 ns | 22,285 ns / 29,625 ns | 30,035 ns / 40,500 ns | 606 ns / 697 ns |
| 0 0 1 * *    |   85 ns / 97 ns | 1,301 ns / 1,361 ns |   7,138 ns / 7,467 ns | 29,642 ns / 39,084 ns | 583 ns / 624 ns |
| 0 12 31 * *  | 107 ns / 123 ns | 1,340 ns / 1,383 ns |   7,461 ns / 7,646 ns | 31,713 ns / 55,708 ns | 579 ns / 608 ns |
| */15 * * * * | 117 ns / 129 ns | 3,118 ns / 3,200 ns | 14,226 ns / 17,125 ns | 29,489 ns / 45,666 ns | 671 ns / 711 ns |
| 0 9 * * *    |   78 ns / 91 ns | 2,212 ns / 2,295 ns | 11,030 ns / 13,542 ns | 31,760 ns / 47,333 ns | 606 ns / 702 ns |
| 0 9 15 * 1   | 116 ns / 129 ns | 1,134 ns / 1,181 ns |   6,168 ns / 6,433 ns | 29,575 ns / 38,000 ns | 585 ns / 614 ns |
| 0 9 * * 1-5  | 162 ns / 180 ns | 2,222 ns / 2,268 ns | 10,674 ns / 13,583 ns | 31,611 ns / 55,459 ns | 658 ns / 805 ns |

### Parsing - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| ------------ | --------: | ------------: | ----------: | -----: | ------------: |
| * * * * *    |   ~17140k |       ~214k ✓ |      ~47k ✓ | ~35k ✓ |      ~1623k ✓ |
| 0 0 1 * *    |   ~11813k |       ~755k ✓ |     ~137k ✓ | ~33k ✓ |      ~1673k ✓ |
| 0 12 31 * *  |    ~9615k |       ~764k ✓ |     ~139k ✓ | ~33k ✓ |      ~1653k ✓ |
| */15 * * * * |    ~8341k |       ~327k ✓ |      ~70k ✓ | ~34k ✓ |      ~1520k ✓ |
| 0 9 * * *    |   ~12955k |       ~445k ✓ |      ~93k ✓ | ~34k ✓ |      ~1613k ✓ |
| 0 9 15 * 1   |    ~8403k |       ~884k ✓ |     ~160k ✓ | ~32k ✓ |      ~1725k ✓ |
| 0 9 * * 1-5  |    ~6357k |       ~457k ✓ |      ~96k ✓ | ~34k ✓ |      ~1521k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |   cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | --------------: |
| * * * * *    |   58 ns / 69 ns | 4,663 ns / 4,708 ns | 21,149 ns / 25,250 ns | 28,944 ns / 36,292 ns | 616 ns / 638 ns |
| 0 0 1 * *    |   85 ns / 95 ns | 1,325 ns / 1,361 ns |   7,293 ns / 7,445 ns | 30,346 ns / 42,500 ns | 598 ns / 654 ns |
| 0 12 31 * *  | 104 ns / 116 ns | 1,309 ns / 1,366 ns |   7,209 ns / 7,282 ns | 30,429 ns / 40,541 ns | 605 ns / 639 ns |
| */15 * * * * | 120 ns / 146 ns | 3,056 ns / 3,160 ns | 14,273 ns / 17,292 ns | 29,384 ns / 39,583 ns | 658 ns / 713 ns |
| 0 9 * * *    |   77 ns / 90 ns | 2,245 ns / 2,300 ns | 10,752 ns / 12,834 ns | 29,627 ns / 37,500 ns | 620 ns / 682 ns |
| 0 9 15 * 1   | 119 ns / 135 ns | 1,131 ns / 1,156 ns |   6,242 ns / 6,498 ns | 31,277 ns / 46,583 ns | 580 ns / 612 ns |
| 0 9 * * 1-5  | 157 ns / 171 ns | 2,186 ns / 2,265 ns | 10,378 ns / 12,792 ns | 29,588 ns / 37,125 ns | 657 ns / 703 ns |

### Validation Varied Inputs - Throughput (ops/sec)

| Test Case | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------- | --------: | ------------: | ----------: | -----: | ------------: |
| varied    |    ~9411k |       ~640k ✓ |     ~132k ✓ | ~32k ✓ |      ~1394k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation Varied Inputs - Latency (mean / p99)

| Test Case |       cron-fast |       cron-schedule |         cron-parser |                croner |   cron-validate |
| --------- | --------------: | ------------------: | ------------------: | --------------------: | --------------: |
| varied    | 106 ns / 121 ns | 1,562 ns / 1,657 ns | 7,596 ns / 7,924 ns | 31,602 ns / 50,500 ns | 717 ns / 763 ns |

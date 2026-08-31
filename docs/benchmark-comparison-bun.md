# Benchmark

> Tested with bun v1.4.0, cron-fast v3.10.0, croner v10.0.1, cron-parser v5.10.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by mitata.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~4448k      | baseline     |
| cron-schedule | ~446k       | 10.0x faster |
| cron-parser   | ~51k        | 86.8x faster |
| croner        | ~62k        | 71.8x faster |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~83k        | baseline     |
| cron-schedule | ~26k        | 3.2x faster  |
| cron-parser   | ~1k         | 62.2x faster |
| croner        | ~6k         | 13.6x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~4789k      | baseline     |
| cron-schedule | ~461k       | 10.4x faster |
| cron-parser   | ~60k        | 80.1x faster |
| croner        | ~64k        | 75.2x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~13050k     | baseline      |
| cron-schedule | ~519k       | 25.2x faster  |
| cron-parser   | ~175k       | 74.7x faster  |
| croner        | ~68k        | 192.5x faster |
| cron-validate | ~1320k      | 9.9x faster   |

### Validation Varied Inputs

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~12832k     | baseline      |
| cron-schedule | ~488k       | 26.3x faster  |
| cron-parser   | ~188k       | 68.4x faster  |
| croner        | ~68k        | 188.1x faster |
| cron-validate | ~908k       | 14.1x faster  |

### Parsing

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~13219k     | baseline      |
| cron-schedule | ~522k       | 25.3x faster  |
| cron-parser   | ~176k       | 75.3x faster  |
| croner        | ~66k        | 199.1x faster |
| cron-validate | ~1321k      | 10.0x faster  |

Run benchmarks yourself: `pnpm bench:bun`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner |
| ------------ | --------: | ------------: | ----------: | -----: |
| * * * * *    |    ~7656k |       ~226k ✓ |      ~43k ✓ | ~64k ✓ |
| 0 0 1 * *    |    ~4446k |       ~581k ✓ |      ~25k ✓ | ~64k ✓ |
| 0 12 31 * *  |    ~4475k |       ~594k ✓ |      ~10k ✓ | ~62k ✓ |
| */15 * * * * |    ~4417k |       ~312k ✓ |      ~91k ✓ | ~67k ✓ |
| 0 9 * * *    |    ~4398k |       ~406k ✓ |      ~67k ✓ | ~65k ✓ |
| 0 9 15 * 1   |    ~2556k |       ~626k ✓ |      ~54k ✓ | ~58k ✓ |
| 0 9 * * 1-5  |    ~3188k |       ~373k ✓ |      ~67k ✓ | ~55k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |            cron-parser |                croner |
| ------------ | --------------: | ------------------: | ---------------------: | --------------------: |
| * * * * *    | 131 ns / 215 ns | 4,419 ns / 4,698 ns |  23,344 ns / 38,250 ns | 15,732 ns / 25,917 ns |
| 0 0 1 * *    | 225 ns / 332 ns | 1,720 ns / 1,937 ns |  39,650 ns / 55,666 ns | 15,671 ns / 16,394 ns |
| 0 12 31 * *  | 223 ns / 332 ns | 1,684 ns / 1,767 ns | 96,481 ns / 122,291 ns | 16,198 ns / 16,727 ns |
| */15 * * * * | 226 ns / 323 ns | 3,204 ns / 3,441 ns |  10,957 ns / 11,218 ns | 15,005 ns / 15,267 ns |
| 0 9 * * *    | 227 ns / 333 ns | 2,461 ns / 2,544 ns |  14,923 ns / 14,944 ns | 15,299 ns / 15,959 ns |
| 0 9 15 * 1   | 391 ns / 512 ns | 1,598 ns / 1,756 ns |  18,369 ns / 18,901 ns | 17,351 ns / 18,186 ns |
| 0 9 * * 1-5  | 314 ns / 410 ns | 2,678 ns / 2,784 ns |  14,842 ns / 15,068 ns | 18,202 ns / 18,577 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case   | cron-fast | cron-schedule | cron-parser | croner |
| ----------- | --------: | ------------: | ----------: | -----: |
| * * * * *   |     ~126k |        ~32k ✓ |       ~2k ✓ | ~11k ✓ |
| 0 9 * * 1-5 |      ~40k |        ~20k ✓ |       ~1k ✓ |  ~1k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case   |             cron-fast |         cron-schedule |                 cron-parser |                  croner |
| ----------- | --------------------: | --------------------: | --------------------------: | ----------------------: |
| * * * * *   |   7,962 ns / 8,350 ns | 30,943 ns / 31,918 ns |     495,678 ns / 637,792 ns |  93,011 ns / 110,584 ns |
| 0 9 * * 1-5 | 24,707 ns / 25,829 ns | 50,154 ns / 50,694 ns | 1,534,425 ns / 2,183,625 ns | 704,219 ns / 776,833 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner |
| ------------ | --------: | ------------: | ----------: | -----: |
| * * * * *    |    ~7898k |       ~222k ✓ |      ~50k ✓ | ~66k ✓ |
| 0 0 1 * *    |    ~4530k |       ~610k ✓ |      ~13k ✓ | ~63k ✓ |
| 0 12 31 * *  |    ~4239k |       ~592k ✓ |      ~12k ✓ | ~63k ✓ |
| */15 * * * * |    ~4443k |       ~313k ✓ |      ~91k ✓ | ~65k ✓ |
| 0 9 * * *    |    ~4665k |       ~412k ✓ |      ~77k ✓ | ~64k ✓ |
| 0 9 15 * 1   |    ~4177k |       ~684k ✓ |      ~98k ✓ | ~65k ✓ |
| 0 9 * * 1-5  |    ~3574k |       ~398k ✓ |      ~78k ✓ | ~59k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |            cron-parser |                croner |
| ------------ | --------------: | ------------------: | ---------------------: | --------------------: |
| * * * * *    | 127 ns / 149 ns | 4,507 ns / 4,811 ns |  19,838 ns / 20,434 ns | 15,107 ns / 15,867 ns |
| 0 0 1 * *    | 221 ns / 312 ns | 1,640 ns / 1,768 ns | 79,485 ns / 102,125 ns | 15,829 ns / 16,359 ns |
| 0 12 31 * *  | 236 ns / 317 ns | 1,690 ns / 1,820 ns |  82,476 ns / 96,250 ns | 15,877 ns / 16,373 ns |
| */15 * * * * | 225 ns / 317 ns | 3,190 ns / 3,323 ns |  10,999 ns / 11,051 ns | 15,434 ns / 16,116 ns |
| 0 9 * * *    | 214 ns / 296 ns | 2,430 ns / 2,557 ns |  13,070 ns / 13,172 ns | 15,567 ns / 16,276 ns |
| 0 9 15 * 1   | 239 ns / 324 ns | 1,463 ns / 1,601 ns |  10,211 ns / 10,425 ns | 15,351 ns / 16,315 ns |
| 0 9 * * 1-5  | 280 ns / 361 ns | 2,510 ns / 2,652 ns |  12,795 ns / 12,896 ns | 16,945 ns / 17,414 ns |

### Validation - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| ------------ | --------: | ------------: | ----------: | -----: | ------------: |
| * * * * *    |   ~17883k |       ~234k ✓ |      ~65k ✓ | ~71k ✓ |      ~1252k ✓ |
| 0 0 1 * *    |   ~13417k |       ~685k ✓ |     ~228k ✓ | ~68k ✓ |      ~1342k ✓ |
| 0 12 31 * *  |   ~13249k |       ~692k ✓ |     ~236k ✓ | ~66k ✓ |      ~1287k ✓ |
| */15 * * * * |   ~12265k |       ~332k ✓ |     ~115k ✓ | ~69k ✓ |      ~1374k ✓ |
| 0 9 * * *    |   ~14904k |       ~445k ✓ |     ~154k ✓ | ~68k ✓ |      ~1344k ✓ |
| 0 9 15 * 1   |   ~11065k |       ~804k ✓ |     ~268k ✓ | ~65k ✓ |      ~1308k ✓ |
| 0 9 * * 1-5  |    ~8565k |       ~438k ✓ |     ~157k ✓ | ~68k ✓ |      ~1334k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |   cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | --------------: |
| * * * * *    |   56 ns / 63 ns | 4,268 ns / 4,380 ns | 15,357 ns / 15,619 ns | 14,163 ns / 14,515 ns | 798 ns / 899 ns |
| 0 0 1 * *    |   75 ns / 80 ns | 1,459 ns / 1,589 ns |   4,391 ns / 4,540 ns | 14,735 ns / 16,196 ns | 745 ns / 852 ns |
| 0 12 31 * *  |   75 ns / 82 ns | 1,445 ns / 1,566 ns |   4,229 ns / 4,349 ns | 15,046 ns / 15,775 ns | 777 ns / 887 ns |
| */15 * * * * |   82 ns / 91 ns | 3,012 ns / 3,185 ns |   8,659 ns / 8,791 ns | 14,524 ns / 15,723 ns | 728 ns / 860 ns |
| 0 9 * * *    |  67 ns / 103 ns | 2,247 ns / 2,373 ns |   6,509 ns / 6,757 ns | 14,688 ns / 15,664 ns | 744 ns / 859 ns |
| 0 9 15 * 1   |  90 ns / 100 ns | 1,243 ns / 1,371 ns |   3,727 ns / 3,866 ns | 15,483 ns / 16,656 ns | 765 ns / 888 ns |
| 0 9 * * 1-5  | 117 ns / 130 ns | 2,283 ns / 2,410 ns |   6,387 ns / 6,780 ns | 14,707 ns / 16,053 ns | 750 ns / 860 ns |

### Parsing - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| ------------ | --------: | ------------: | ----------: | -----: | ------------: |
| * * * * *    |   ~18243k |       ~239k ✓ |      ~66k ✓ | ~68k ✓ |      ~1274k ✓ |
| 0 0 1 * *    |   ~13117k |       ~685k ✓ |     ~239k ✓ | ~67k ✓ |      ~1339k ✓ |
| 0 12 31 * *  |   ~13580k |       ~695k ✓ |     ~238k ✓ | ~67k ✓ |      ~1322k ✓ |
| */15 * * * * |   ~12553k |       ~335k ✓ |     ~115k ✓ | ~67k ✓ |      ~1381k ✓ |
| 0 9 * * *    |   ~15278k |       ~446k ✓ |     ~152k ✓ | ~67k ✓ |      ~1304k ✓ |
| 0 9 15 * 1   |   ~11324k |       ~810k ✓ |     ~266k ✓ | ~64k ✓ |      ~1307k ✓ |
| 0 9 * * 1-5  |    ~8436k |       ~444k ✓ |     ~154k ✓ | ~65k ✓ |      ~1321k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |   cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | --------------: |
| * * * * *    |   55 ns / 73 ns | 4,177 ns / 4,274 ns | 15,057 ns / 15,872 ns | 14,801 ns / 16,201 ns | 785 ns / 894 ns |
| 0 0 1 * *    |   76 ns / 92 ns | 1,459 ns / 1,587 ns |   4,189 ns / 4,354 ns | 14,938 ns / 15,651 ns | 747 ns / 848 ns |
| 0 12 31 * *  |   74 ns / 80 ns | 1,439 ns / 1,554 ns |   4,198 ns / 4,390 ns | 15,034 ns / 16,317 ns | 757 ns / 847 ns |
| */15 * * * * |   80 ns / 86 ns | 2,983 ns / 3,117 ns |   8,700 ns / 8,882 ns | 14,946 ns / 16,175 ns | 724 ns / 828 ns |
| 0 9 * * *    |   65 ns / 70 ns | 2,242 ns / 2,346 ns |   6,593 ns / 7,261 ns | 14,907 ns / 16,305 ns | 767 ns / 870 ns |
| 0 9 15 * 1   |  88 ns / 100 ns | 1,234 ns / 1,351 ns |   3,764 ns / 3,952 ns | 15,506 ns / 17,539 ns | 765 ns / 876 ns |
| 0 9 * * 1-5  | 119 ns / 155 ns | 2,252 ns / 2,358 ns |   6,505 ns / 7,142 ns | 15,300 ns / 16,334 ns | 757 ns / 879 ns |

### Validation Varied Inputs - Throughput (ops/sec)

| Test Case | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------- | --------: | ------------: | ----------: | -----: | ------------: |
| varied    |   ~12832k |       ~488k ✓ |     ~188k ✓ | ~68k ✓ |       ~908k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation Varied Inputs - Latency (mean / p99)

| Test Case |      cron-fast |       cron-schedule |         cron-parser |                croner |       cron-validate |
| --------- | -------------: | ------------------: | ------------------: | --------------------: | ------------------: |
| varied    | 78 ns / 161 ns | 2,050 ns / 5,125 ns | 5,333 ns / 9,750 ns | 14,659 ns / 24,750 ns | 1,101 ns / 3,875 ns |

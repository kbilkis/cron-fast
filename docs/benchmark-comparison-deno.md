# Benchmark

> Tested with deno v2.9.6, cron-fast v3.12.0, croner v10.0.1, cron-parser v5.10.1, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by Deno.bench().

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2736k      | baseline     |
| cron-schedule | ~407k       | 6.7x faster  |
| cron-parser   | ~36k        | 76.1x faster |
| croner        | ~32k        | 86.1x faster |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~75k        | baseline     |
| cron-schedule | ~18k        | 4.1x faster  |
| cron-parser   | ~1k         | 79.0x faster |
| croner        | ~2k         | 33.6x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2711k      | baseline     |
| cron-schedule | ~437k       | 6.2x faster  |
| cron-parser   | ~42k        | 65.1x faster |
| croner        | ~32k        | 84.3x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~11312k     | baseline      |
| cron-schedule | ~567k       | 20.0x faster  |
| cron-parser   | ~108k       | 104.9x faster |
| croner        | ~34k        | 334.0x faster |
| cron-validate | ~1685k      | 6.7x faster   |

### Validation Varied Inputs

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~9794k      | baseline      |
| cron-schedule | ~648k       | 15.1x faster  |
| cron-parser   | ~135k       | 72.4x faster  |
| croner        | ~35k        | 281.3x faster |
| cron-validate | ~1391k      | 7.0x faster   |

### Parsing

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~11314k     | baseline      |
| cron-schedule | ~568k       | 19.9x faster  |
| cron-parser   | ~109k       | 103.7x faster |
| croner        | ~35k        | 327.8x faster |
| cron-validate | ~1660k      | 6.8x faster   |

Run benchmarks yourself: `pnpm bench:deno`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner |
| ------------ | --------: | ------------: | ----------: | -----: |
| * * * * *    |    ~4512k |       ~162k ✓ |      ~33k ✓ | ~34k ✓ |
| 0 0 1 * *    |    ~2732k |       ~584k ✓ |      ~19k ✓ | ~33k ✓ |
| 0 12 31 * *  |    ~2369k |       ~554k ✓ |       ~8k ✓ | ~31k ✓ |
| */15 * * * * |    ~2790k |       ~298k ✓ |      ~58k ✓ | ~32k ✓ |
| 0 9 * * *    |    ~2794k |       ~391k ✓ |      ~46k ✓ | ~33k ✓ |
| 0 9 15 * 1   |    ~1697k |       ~523k ✓ |      ~41k ✓ | ~31k ✓ |
| 0 9 * * 1-5  |    ~2256k |       ~338k ✓ |      ~48k ✓ | ~30k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |             cron-parser |                croner |
| ------------ | --------------: | ------------------: | ----------------------: | --------------------: |
| * * * * *    | 222 ns / 234 ns | 6,182 ns / 7,184 ns |   30,461 ns / 56,042 ns | 29,622 ns / 61,542 ns |
| 0 0 1 * *    | 366 ns / 382 ns | 1,713 ns / 1,931 ns |   52,483 ns / 77,042 ns | 30,565 ns / 43,833 ns |
| 0 12 31 * *  | 422 ns / 464 ns | 1,805 ns / 1,867 ns | 130,626 ns / 229,916 ns | 32,200 ns / 40,583 ns |
| */15 * * * * | 358 ns / 387 ns | 3,360 ns / 3,517 ns |   17,360 ns / 22,125 ns | 31,250 ns / 41,625 ns |
| 0 9 * * *    | 358 ns / 375 ns | 2,556 ns / 2,580 ns |   21,561 ns / 27,708 ns | 30,410 ns / 36,875 ns |
| 0 9 15 * 1   | 589 ns / 626 ns | 1,911 ns / 1,960 ns |   24,606 ns / 32,208 ns | 32,722 ns / 45,750 ns |
| 0 9 * * 1-5  | 443 ns / 459 ns | 2,955 ns / 3,001 ns |   20,995 ns / 26,167 ns | 33,867 ns / 47,166 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case   | cron-fast | cron-schedule | cron-parser | croner |
| ----------- | --------: | ------------: | ----------: | -----: |
| * * * * *   |     ~115k |        ~25k ✓ |       ~1k ✓ |  ~4k ✓ |
| 0 9 * * 1-5 |      ~35k |        ~12k ✓ |       ~0k ✓ |  ~1k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case   |             cron-fast |         cron-schedule |                 cron-parser |                      croner |
| ----------- | --------------------: | --------------------: | --------------------------: | --------------------------: |
| * * * * *   |   8,678 ns / 8,890 ns | 40,296 ns / 70,584 ns |     703,610 ns / 838,042 ns |     284,036 ns / 357,375 ns |
| 0 9 * * 1-5 | 28,780 ns / 33,667 ns | 82,472 ns / 99,459 ns | 2,094,985 ns / 2,369,792 ns | 1,054,723 ns / 1,181,625 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner |
| ------------ | --------: | ------------: | ----------: | -----: |
| * * * * *    |    ~3985k |       ~198k ✓ |      ~37k ✓ | ~33k ✓ |
| 0 0 1 * *    |    ~2654k |       ~620k ✓ |       ~9k ✓ | ~32k ✓ |
| 0 12 31 * *  |    ~2363k |       ~525k ✓ |       ~9k ✓ | ~32k ✓ |
| */15 * * * * |    ~2612k |       ~296k ✓ |      ~60k ✓ | ~32k ✓ |
| 0 9 * * *    |    ~2691k |       ~406k ✓ |      ~53k ✓ | ~33k ✓ |
| 0 9 15 * 1   |    ~2420k |       ~637k ✓ |      ~70k ✓ | ~32k ✓ |
| 0 9 * * 1-5  |    ~2253k |       ~380k ✓ |      ~54k ✓ | ~31k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |             cron-parser |                croner |
| ------------ | --------------: | ------------------: | ----------------------: | --------------------: |
| * * * * *    | 251 ns / 263 ns | 5,049 ns / 5,487 ns |   26,955 ns / 33,083 ns | 30,249 ns / 38,083 ns |
| 0 0 1 * *    | 377 ns / 393 ns | 1,613 ns / 1,722 ns | 111,861 ns / 208,042 ns | 31,532 ns / 41,583 ns |
| 0 12 31 * *  | 423 ns / 440 ns | 1,906 ns / 1,974 ns | 117,177 ns / 218,667 ns | 31,390 ns / 38,209 ns |
| */15 * * * * | 383 ns / 403 ns | 3,373 ns / 3,510 ns |   16,784 ns / 19,875 ns | 31,025 ns / 41,292 ns |
| 0 9 * * *    | 372 ns / 385 ns | 2,464 ns / 2,515 ns |   19,035 ns / 22,875 ns | 30,459 ns / 37,708 ns |
| 0 9 15 * 1   | 413 ns / 431 ns | 1,571 ns / 1,631 ns |   14,208 ns / 17,875 ns | 30,895 ns / 38,334 ns |
| 0 9 * * 1-5  | 444 ns / 458 ns | 2,632 ns / 2,748 ns |   18,440 ns / 23,541 ns | 32,144 ns / 39,708 ns |

### Validation - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| ------------ | --------: | ------------: | ----------: | -----: | ------------: |
| * * * * *    |   ~17329k |       ~218k ✓ |      ~47k ✓ | ~35k ✓ |      ~1660k ✓ |
| 0 0 1 * *    |   ~11835k |       ~789k ✓ |     ~143k ✓ | ~34k ✓ |      ~1724k ✓ |
| 0 12 31 * *  |    ~9733k |       ~780k ✓ |     ~139k ✓ | ~34k ✓ |      ~1765k ✓ |
| */15 * * * * |   ~10942k |       ~327k ✓ |      ~72k ✓ | ~35k ✓ |      ~1546k ✓ |
| 0 9 * * *    |   ~13114k |       ~472k ✓ |      ~96k ✓ | ~35k ✓ |      ~1734k ✓ |
| 0 9 15 * 1   |    ~8687k |       ~919k ✓ |     ~164k ✓ | ~34k ✓ |      ~1761k ✓ |
| 0 9 * * 1-5  |    ~7544k |       ~462k ✓ |      ~93k ✓ | ~30k ✓ |      ~1605k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |   cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | --------------: |
| * * * * *    |   58 ns / 67 ns | 4,586 ns / 4,641 ns | 21,256 ns / 26,750 ns | 28,399 ns / 40,875 ns | 603 ns / 681 ns |
| 0 0 1 * *    |   84 ns / 96 ns | 1,268 ns / 1,291 ns |   6,982 ns / 7,319 ns | 28,996 ns / 36,084 ns | 580 ns / 606 ns |
| 0 12 31 * *  | 103 ns / 112 ns | 1,282 ns / 1,314 ns |   7,187 ns / 8,027 ns | 29,113 ns / 43,041 ns | 567 ns / 604 ns |
| */15 * * * * |  91 ns / 103 ns | 3,055 ns / 3,149 ns | 13,899 ns / 15,375 ns | 28,869 ns / 42,542 ns | 647 ns / 672 ns |
| 0 9 * * *    |   76 ns / 85 ns | 2,118 ns / 2,154 ns | 10,460 ns / 11,959 ns | 28,699 ns / 37,583 ns | 577 ns / 599 ns |
| 0 9 15 * 1   | 115 ns / 127 ns | 1,088 ns / 1,125 ns |   6,081 ns / 6,194 ns | 29,622 ns / 37,083 ns | 568 ns / 593 ns |
| 0 9 * * 1-5  | 133 ns / 144 ns | 2,166 ns / 2,661 ns | 10,737 ns / 13,584 ns | 33,549 ns / 39,917 ns | 623 ns / 644 ns |

### Parsing - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| ------------ | --------: | ------------: | ----------: | -----: | ------------: |
| * * * * *    |   ~17137k |       ~217k ✓ |      ~48k ✓ | ~35k ✓ |      ~1634k ✓ |
| 0 0 1 * *    |   ~11863k |       ~787k ✓ |     ~143k ✓ | ~35k ✓ |      ~1665k ✓ |
| 0 12 31 * *  |    ~9701k |       ~784k ✓ |     ~141k ✓ | ~34k ✓ |      ~1720k ✓ |
| */15 * * * * |   ~10953k |       ~330k ✓ |      ~72k ✓ | ~35k ✓ |      ~1533k ✓ |
| 0 9 * * *    |   ~13146k |       ~469k ✓ |      ~95k ✓ | ~34k ✓ |      ~1690k ✓ |
| 0 9 15 * 1   |    ~8598k |       ~923k ✓ |     ~165k ✓ | ~34k ✓ |      ~1772k ✓ |
| 0 9 * * 1-5  |    ~7801k |       ~467k ✓ |      ~99k ✓ | ~35k ✓ |      ~1608k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |   cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | --------------: |
| * * * * *    |   58 ns / 68 ns | 4,598 ns / 4,653 ns | 20,728 ns / 24,750 ns | 28,481 ns / 38,000 ns | 612 ns / 627 ns |
| 0 0 1 * *    |   84 ns / 96 ns | 1,270 ns / 1,293 ns |   6,973 ns / 7,152 ns | 28,831 ns / 36,458 ns | 601 ns / 631 ns |
| 0 12 31 * *  | 103 ns / 114 ns | 1,275 ns / 1,322 ns |   7,104 ns / 7,138 ns | 29,529 ns / 40,125 ns | 581 ns / 593 ns |
| */15 * * * * |  91 ns / 103 ns | 3,030 ns / 3,144 ns | 13,878 ns / 15,709 ns | 28,568 ns / 34,959 ns | 652 ns / 673 ns |
| 0 9 * * *    |   76 ns / 86 ns | 2,130 ns / 2,238 ns | 10,502 ns / 11,375 ns | 29,184 ns / 38,958 ns | 592 ns / 619 ns |
| 0 9 15 * 1   | 116 ns / 129 ns | 1,084 ns / 1,127 ns |   6,064 ns / 6,122 ns | 29,388 ns / 36,541 ns | 564 ns / 584 ns |
| 0 9 * * 1-5  | 128 ns / 137 ns | 2,141 ns / 2,225 ns | 10,107 ns / 10,958 ns | 28,867 ns / 35,958 ns | 622 ns / 641 ns |

### Validation Varied Inputs - Throughput (ops/sec)

| Test Case | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------- | --------: | ------------: | ----------: | -----: | ------------: |
| varied    |    ~9794k |       ~648k ✓ |     ~135k ✓ | ~35k ✓ |      ~1391k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation Varied Inputs - Latency (mean / p99)

| Test Case |       cron-fast |       cron-schedule |         cron-parser |                croner |   cron-validate |
| --------- | --------------: | ------------------: | ------------------: | --------------------: | --------------: |
| varied    | 102 ns / 114 ns | 1,544 ns / 1,645 ns | 7,389 ns / 7,657 ns | 28,725 ns / 38,792 ns | 719 ns / 748 ns |

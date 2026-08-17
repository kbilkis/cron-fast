# Benchmark

> Tested with deno v2.9.5, cron-fast v3.6.0, croner v10.0.1, cron-parser v5.10.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by Deno.bench().

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2434k      | baseline     |
| cron-schedule | ~404k       | 6.0x faster  |
| cron-parser   | ~35k        | 69.1x faster |
| croner        | ~31k        | 77.3x faster |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~35k        | baseline     |
| cron-schedule | ~18k        | 1.9x faster  |
| cron-parser   | ~1k         | 37.2x faster |
| croner        | ~2k         | 15.8x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2511k      | baseline     |
| cron-schedule | ~434k       | 5.8x faster  |
| cron-parser   | ~41k        | 61.7x faster |
| croner        | ~32k        | 79.6x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~7819k      | baseline      |
| cron-schedule | ~563k       | 13.9x faster  |
| cron-parser   | ~106k       | 74.1x faster  |
| croner        | ~34k        | 232.4x faster |
| cron-validate | ~1668k      | 4.7x faster   |

### Validation Varied Inputs

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~5985k      | baseline      |
| cron-schedule | ~658k       | 9.1x faster   |
| cron-parser   | ~132k       | 45.3x faster  |
| croner        | ~34k        | 174.0x faster |
| cron-validate | ~1406k      | 4.3x faster   |

### Parsing

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~7878k      | baseline      |
| cron-schedule | ~563k       | 14.0x faster  |
| cron-parser   | ~106k       | 74.3x faster  |
| croner        | ~34k        | 231.7x faster |
| cron-validate | ~1632k      | 4.8x faster   |

Run benchmarks yourself: `pnpm bench:deno`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner |
| ------------ | --------: | ------------: | ----------: | -----: |
| * * * * *    |    ~4469k |       ~161k ✓ |      ~32k ✓ | ~33k ✓ |
| 0 0 1 * *    |    ~2225k |       ~575k ✓ |      ~19k ✓ | ~32k ✓ |
| 0 12 31 * *  |    ~2046k |       ~557k ✓ |       ~8k ✓ | ~30k ✓ |
| */15 * * * * |    ~2563k |       ~296k ✓ |      ~57k ✓ | ~33k ✓ |
| 0 9 * * *    |    ~2420k |       ~384k ✓ |      ~45k ✓ | ~32k ✓ |
| 0 9 15 * 1   |    ~1420k |       ~518k ✓ |      ~40k ✓ | ~30k ✓ |
| 0 9 * * 1-5  |    ~1898k |       ~336k ✓ |      ~47k ✓ | ~30k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |             cron-parser |                croner |
| ------------ | --------------: | ------------------: | ----------------------: | --------------------: |
| * * * * *    | 224 ns / 237 ns | 6,228 ns / 7,280 ns |   31,040 ns / 58,916 ns | 30,213 ns / 64,917 ns |
| 0 0 1 * *    | 449 ns / 473 ns | 1,739 ns / 1,950 ns |   52,785 ns / 78,083 ns | 31,394 ns / 49,958 ns |
| 0 12 31 * *  | 489 ns / 504 ns | 1,796 ns / 1,854 ns | 131,661 ns / 237,167 ns | 32,816 ns / 46,417 ns |
| */15 * * * * | 390 ns / 415 ns | 3,375 ns / 3,477 ns |   17,665 ns / 21,584 ns | 30,622 ns / 45,875 ns |
| 0 9 * * *    | 413 ns / 432 ns | 2,605 ns / 2,684 ns |   22,292 ns / 29,750 ns | 30,900 ns / 41,416 ns |
| 0 9 15 * 1   | 704 ns / 781 ns | 1,932 ns / 1,990 ns |   25,209 ns / 33,084 ns | 32,879 ns / 42,584 ns |
| 0 9 * * 1-5  | 527 ns / 561 ns | 2,979 ns / 3,029 ns |   21,372 ns / 26,500 ns | 33,831 ns / 45,709 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case   | cron-fast | cron-schedule | cron-parser | croner |
| ----------- | --------: | ------------: | ----------: | -----: |
| * * * * *   |      ~47k |        ~25k ✓ |       ~1k ✓ |  ~4k ✓ |
| 0 9 * * 1-5 |      ~24k |        ~12k ✓ |       ~0k ✓ |  ~1k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case   |             cron-fast |          cron-schedule |                 cron-parser |                      croner |
| ----------- | --------------------: | ---------------------: | --------------------------: | --------------------------: |
| * * * * *   | 21,358 ns / 24,458 ns |  40,465 ns / 70,625 ns |     703,714 ns / 842,084 ns |     283,872 ns / 382,083 ns |
| 0 9 * * 1-5 | 42,161 ns / 51,250 ns | 83,137 ns / 101,125 ns | 2,101,788 ns / 2,396,250 ns | 1,059,667 ns / 1,185,500 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner |
| ------------ | --------: | ------------: | ----------: | -----: |
| * * * * *    |    ~4224k |       ~197k ✓ |      ~36k ✓ | ~32k ✓ |
| 0 0 1 * *    |    ~2288k |       ~614k ✓ |       ~9k ✓ | ~31k ✓ |
| 0 12 31 * *  |    ~2132k |       ~518k ✓ |       ~8k ✓ | ~31k ✓ |
| */15 * * * * |    ~2535k |       ~294k ✓ |      ~58k ✓ | ~32k ✓ |
| 0 9 * * *    |    ~2450k |       ~401k ✓ |      ~52k ✓ | ~32k ✓ |
| 0 9 15 * 1   |    ~1993k |       ~638k ✓ |      ~69k ✓ | ~32k ✓ |
| 0 9 * * 1-5  |    ~1955k |       ~378k ✓ |      ~53k ✓ | ~31k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |             cron-parser |                croner |
| ------------ | --------------: | ------------------: | ----------------------: | --------------------: |
| * * * * *    | 237 ns / 250 ns | 5,083 ns / 5,548 ns |   27,508 ns / 35,875 ns | 31,198 ns / 41,458 ns |
| 0 0 1 * *    | 437 ns / 455 ns | 1,629 ns / 1,722 ns | 111,885 ns / 215,375 ns | 32,525 ns / 49,417 ns |
| 0 12 31 * *  | 469 ns / 495 ns | 1,930 ns / 1,990 ns | 119,006 ns / 235,125 ns | 31,782 ns / 40,417 ns |
| */15 * * * * | 394 ns / 428 ns | 3,396 ns / 3,472 ns |   17,332 ns / 22,625 ns | 31,162 ns / 47,083 ns |
| 0 9 * * *    | 408 ns / 427 ns | 2,494 ns / 2,590 ns |   19,373 ns / 24,375 ns | 31,293 ns / 38,042 ns |
| 0 9 15 * 1   | 502 ns / 520 ns | 1,568 ns / 1,631 ns |   14,556 ns / 16,584 ns | 31,376 ns / 39,792 ns |
| 0 9 * * 1-5  | 512 ns / 528 ns | 2,646 ns / 2,801 ns |   18,881 ns / 23,625 ns | 32,740 ns / 41,958 ns |

### Validation - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| ------------ | --------: | ------------: | ----------: | -----: | ------------: |
| * * * * *    |   ~17133k |       ~216k ✓ |      ~46k ✓ | ~35k ✓ |      ~1670k ✓ |
| 0 0 1 * *    |    ~6140k |       ~780k ✓ |     ~139k ✓ | ~34k ✓ |      ~1743k ✓ |
| 0 12 31 * *  |    ~6010k |       ~778k ✓ |     ~137k ✓ | ~34k ✓ |      ~1722k ✓ |
| */15 * * * * |    ~8344k |       ~328k ✓ |      ~70k ✓ | ~33k ✓ |      ~1545k ✓ |
| 0 9 * * *    |    ~7711k |       ~464k ✓ |      ~92k ✓ | ~33k ✓ |      ~1698k ✓ |
| 0 9 15 * 1   |    ~4692k |       ~914k ✓ |     ~159k ✓ | ~34k ✓ |      ~1724k ✓ |
| 0 9 * * 1-5  |    ~4699k |       ~463k ✓ |      ~95k ✓ | ~33k ✓ |      ~1574k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |   cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | --------------: |
| * * * * *    |   58 ns / 69 ns | 4,635 ns / 4,698 ns | 21,709 ns / 27,042 ns | 28,667 ns / 36,708 ns | 599 ns / 675 ns |
| 0 0 1 * *    | 163 ns / 175 ns | 1,283 ns / 1,312 ns |   7,189 ns / 7,506 ns | 29,741 ns / 44,083 ns | 574 ns / 598 ns |
| 0 12 31 * *  | 166 ns / 178 ns | 1,286 ns / 1,322 ns |   7,300 ns / 7,368 ns | 29,534 ns / 38,167 ns | 581 ns / 637 ns |
| */15 * * * * | 120 ns / 136 ns | 3,048 ns / 3,111 ns | 14,344 ns / 18,167 ns | 30,155 ns / 47,000 ns | 647 ns / 685 ns |
| 0 9 * * *    | 130 ns / 144 ns | 2,157 ns / 2,244 ns | 10,842 ns / 13,916 ns | 29,915 ns / 43,666 ns | 589 ns / 614 ns |
| 0 9 15 * 1   | 213 ns / 228 ns | 1,094 ns / 1,119 ns |   6,279 ns / 6,383 ns | 29,784 ns / 47,625 ns | 580 ns / 599 ns |
| 0 9 * * 1-5  | 213 ns / 230 ns | 2,161 ns / 2,211 ns | 10,489 ns / 11,875 ns | 30,310 ns / 42,875 ns | 636 ns / 658 ns |

### Parsing - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| ------------ | --------: | ------------: | ----------: | -----: | ------------: |
| * * * * *    |   ~17178k |       ~215k ✓ |      ~47k ✓ | ~35k ✓ |      ~1610k ✓ |
| 0 0 1 * *    |    ~6152k |       ~778k ✓ |     ~140k ✓ | ~34k ✓ |      ~1677k ✓ |
| 0 12 31 * *  |    ~5972k |       ~776k ✓ |     ~137k ✓ | ~34k ✓ |      ~1678k ✓ |
| */15 * * * * |    ~8574k |       ~329k ✓ |      ~69k ✓ | ~34k ✓ |      ~1510k ✓ |
| 0 9 * * *    |    ~7809k |       ~466k ✓ |      ~93k ✓ | ~34k ✓ |      ~1653k ✓ |
| 0 9 15 * 1   |    ~4725k |       ~913k ✓ |     ~160k ✓ | ~34k ✓ |      ~1727k ✓ |
| 0 9 * * 1-5  |    ~4738k |       ~465k ✓ |      ~96k ✓ | ~34k ✓ |      ~1571k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |   cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | --------------: |
| * * * * *    |   58 ns / 69 ns | 4,642 ns / 4,684 ns | 21,264 ns / 25,917 ns | 28,974 ns / 37,584 ns | 621 ns / 662 ns |
| 0 0 1 * *    | 163 ns / 179 ns | 1,285 ns / 1,317 ns |   7,118 ns / 7,174 ns | 29,461 ns / 36,834 ns | 596 ns / 617 ns |
| 0 12 31 * *  | 167 ns / 182 ns | 1,289 ns / 1,316 ns |   7,284 ns / 7,372 ns | 29,546 ns / 40,541 ns | 596 ns / 624 ns |
| */15 * * * * | 117 ns / 130 ns | 3,043 ns / 3,122 ns | 14,419 ns / 18,042 ns | 29,564 ns / 37,167 ns | 662 ns / 686 ns |
| 0 9 * * *    | 128 ns / 140 ns | 2,147 ns / 2,189 ns | 10,798 ns / 12,959 ns | 29,156 ns / 35,583 ns | 605 ns / 639 ns |
| 0 9 15 * 1   | 212 ns / 238 ns | 1,096 ns / 1,122 ns |   6,258 ns / 6,285 ns | 29,826 ns / 38,584 ns | 579 ns / 605 ns |
| 0 9 * * 1-5  | 211 ns / 230 ns | 2,149 ns / 2,187 ns | 10,464 ns / 13,125 ns | 29,386 ns / 37,625 ns | 637 ns / 666 ns |

### Validation Varied Inputs - Throughput (ops/sec)

| Test Case | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------- | --------: | ------------: | ----------: | -----: | ------------: |
| varied    |    ~5985k |       ~658k ✓ |     ~132k ✓ | ~34k ✓ |      ~1406k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation Varied Inputs - Latency (mean / p99)

| Test Case |       cron-fast |       cron-schedule |         cron-parser |                croner |   cron-validate |
| --------- | --------------: | ------------------: | ------------------: | --------------------: | --------------: |
| varied    | 167 ns / 183 ns | 1,521 ns / 1,574 ns | 7,569 ns / 7,822 ns | 29,072 ns / 40,834 ns | 711 ns / 740 ns |

# Benchmark

> Tested with deno v2.9.7, cron-fast v3.13.0, croner v10.0.1, cron-parser v5.10.1, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by Deno.bench().

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2797k      | baseline     |
| cron-schedule | ~394k       | 7.1x faster  |
| cron-parser   | ~34k        | 81.1x faster |
| croner        | ~31k        | 90.8x faster |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~73k        | baseline     |
| cron-schedule | ~18k        | 4.0x faster  |
| cron-parser   | ~1k         | 78.9x faster |
| croner        | ~2k         | 33.2x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2789k      | baseline     |
| cron-schedule | ~424k       | 6.6x faster  |
| cron-parser   | ~40k        | 69.1x faster |
| croner        | ~31k        | 90.9x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~13479k     | baseline      |
| cron-schedule | ~549k       | 24.6x faster  |
| cron-parser   | ~105k       | 128.4x faster |
| croner        | ~33k        | 405.6x faster |
| cron-validate | ~1630k      | 8.3x faster   |

### Validation Varied Inputs

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~12301k     | baseline      |
| cron-schedule | ~656k       | 18.7x faster  |
| cron-parser   | ~130k       | 94.5x faster  |
| croner        | ~33k        | 377.7x faster |
| cron-validate | ~1390k      | 8.9x faster   |

### Parsing

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~13535k     | baseline      |
| cron-schedule | ~557k       | 24.3x faster  |
| cron-parser   | ~105k       | 128.3x faster |
| croner        | ~33k        | 405.0x faster |
| cron-validate | ~1608k      | 8.4x faster   |

Run benchmarks yourself: `pnpm bench:deno`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner |
| ------------ | --------: | ------------: | ----------: | -----: |
| * * * * *    |    ~4394k |       ~160k ✓ |      ~32k ✓ | ~32k ✓ |
| 0 0 1 * *    |    ~2885k |       ~558k ✓ |      ~18k ✓ | ~32k ✓ |
| 0 12 31 * *  |    ~2523k |       ~547k ✓ |       ~7k ✓ | ~29k ✓ |
| */15 * * * * |    ~2902k |       ~291k ✓ |      ~56k ✓ | ~33k ✓ |
| 0 9 * * *    |    ~2837k |       ~373k ✓ |      ~43k ✓ | ~31k ✓ |
| 0 9 15 * 1   |    ~1696k |       ~507k ✓ |      ~39k ✓ | ~30k ✓ |
| 0 9 * * 1-5  |    ~2344k |       ~318k ✓ |      ~45k ✓ | ~29k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |             cron-parser |                croner |
| ------------ | --------------: | ------------------: | ----------------------: | --------------------: |
| * * * * *    | 228 ns / 439 ns | 6,257 ns / 7,271 ns |   31,281 ns / 64,250 ns | 31,295 ns / 82,458 ns |
| 0 0 1 * *    | 347 ns / 362 ns | 1,792 ns / 2,010 ns |  54,487 ns / 106,042 ns | 31,141 ns / 46,834 ns |
| 0 12 31 * *  | 396 ns / 424 ns | 1,828 ns / 1,884 ns | 136,923 ns / 260,250 ns | 34,298 ns / 67,125 ns |
| */15 * * * * | 345 ns / 362 ns | 3,432 ns / 3,538 ns |   17,713 ns / 27,667 ns | 30,715 ns / 43,500 ns |
| 0 9 * * *    | 352 ns / 371 ns | 2,680 ns / 2,734 ns |   23,108 ns / 46,917 ns | 32,052 ns / 60,250 ns |
| 0 9 15 * 1   | 590 ns / 622 ns | 1,971 ns / 2,041 ns |   25,516 ns / 37,958 ns | 33,833 ns / 57,792 ns |
| 0 9 * * 1-5  | 427 ns / 445 ns | 3,141 ns / 4,331 ns |   22,323 ns / 33,792 ns | 34,471 ns / 53,167 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case   | cron-fast | cron-schedule | cron-parser | croner |
| ----------- | --------: | ------------: | ----------: | -----: |
| * * * * *   |     ~112k |        ~25k ✓ |       ~1k ✓ |  ~3k ✓ |
| 0 9 * * 1-5 |      ~34k |        ~12k ✓ |       ~0k ✓ |  ~1k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case   |             cron-fast |         cron-schedule |                 cron-parser |                      croner |
| ----------- | --------------------: | --------------------: | --------------------------: | --------------------------: |
| * * * * *   |   8,945 ns / 9,020 ns | 40,675 ns / 71,959 ns |     722,746 ns / 879,666 ns |     288,281 ns / 388,500 ns |
| 0 9 * * 1-5 | 29,183 ns / 34,500 ns | 83,609 ns / 97,042 ns | 2,143,362 ns / 2,410,958 ns | 1,069,320 ns / 1,207,875 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner |
| ------------ | --------: | ------------: | ----------: | -----: |
| * * * * *    |    ~4100k |       ~192k ✓ |      ~35k ✓ | ~31k ✓ |
| 0 0 1 * *    |    ~2756k |       ~600k ✓ |       ~9k ✓ | ~30k ✓ |
| 0 12 31 * *  |    ~2470k |       ~500k ✓ |       ~8k ✓ | ~30k ✓ |
| */15 * * * * |    ~2659k |       ~288k ✓ |      ~58k ✓ | ~32k ✓ |
| 0 9 * * *    |    ~2764k |       ~389k ✓ |      ~51k ✓ | ~32k ✓ |
| 0 9 15 * 1   |    ~2467k |       ~626k ✓ |      ~69k ✓ | ~31k ✓ |
| 0 9 * * 1-5  |    ~2309k |       ~376k ✓ |      ~53k ✓ | ~29k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |             cron-parser |                croner |
| ------------ | --------------: | ------------------: | ----------------------: | --------------------: |
| * * * * *    | 244 ns / 260 ns | 5,212 ns / 5,711 ns |   28,265 ns / 48,833 ns | 32,444 ns / 62,792 ns |
| 0 0 1 * *    | 363 ns / 383 ns | 1,665 ns / 1,732 ns | 113,822 ns / 220,750 ns | 33,041 ns / 55,334 ns |
| 0 12 31 * *  | 405 ns / 424 ns | 2,002 ns / 2,054 ns | 123,458 ns / 248,458 ns | 33,650 ns / 65,208 ns |
| */15 * * * * | 376 ns / 394 ns | 3,468 ns / 4,052 ns |   17,320 ns / 25,542 ns | 31,093 ns / 49,292 ns |
| 0 9 * * *    | 362 ns / 385 ns | 2,573 ns / 2,626 ns |   19,532 ns / 31,209 ns | 31,537 ns / 47,000 ns |
| 0 9 15 * 1   | 405 ns / 429 ns | 1,597 ns / 1,650 ns |   14,584 ns / 19,500 ns | 32,621 ns / 57,167 ns |
| 0 9 * * 1-5  | 433 ns / 460 ns | 2,662 ns / 2,732 ns |   18,879 ns / 28,584 ns | 33,987 ns / 53,458 ns |

### Validation - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| ------------ | --------: | ------------: | ----------: | -----: | ------------: |
| * * * * *    |   ~19707k |       ~213k ✓ |      ~45k ✓ | ~32k ✓ |      ~1654k ✓ |
| 0 0 1 * *    |   ~14838k |       ~746k ✓ |     ~140k ✓ | ~34k ✓ |      ~1650k ✓ |
| 0 12 31 * *  |   ~12155k |       ~751k ✓ |     ~134k ✓ | ~33k ✓ |      ~1691k ✓ |
| */15 * * * * |   ~12244k |       ~318k ✓ |      ~69k ✓ | ~33k ✓ |      ~1503k ✓ |
| 0 9 * * *    |   ~15833k |       ~464k ✓ |      ~92k ✓ | ~34k ✓ |      ~1680k ✓ |
| 0 9 15 * 1   |   ~10598k |       ~888k ✓ |     ~157k ✓ | ~34k ✓ |      ~1680k ✓ |
| 0 9 * * 1-5  |    ~8978k |       ~461k ✓ |      ~97k ✓ | ~34k ✓ |      ~1554k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |   cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | --------------: |
| * * * * *    |   51 ns / 61 ns | 4,691 ns / 4,793 ns | 22,328 ns / 35,292 ns | 31,186 ns / 61,417 ns | 604 ns / 682 ns |
| 0 0 1 * *    |   67 ns / 79 ns | 1,340 ns / 1,383 ns |   7,138 ns / 7,513 ns | 29,756 ns / 39,083 ns | 606 ns / 636 ns |
| 0 12 31 * *  |   82 ns / 98 ns | 1,331 ns / 1,371 ns |   7,438 ns / 8,286 ns | 30,514 ns / 55,417 ns | 591 ns / 619 ns |
| */15 * * * * |   82 ns / 97 ns | 3,141 ns / 3,402 ns | 14,509 ns / 22,000 ns | 30,692 ns / 58,375 ns | 665 ns / 694 ns |
| 0 9 * * *    |   63 ns / 75 ns | 2,154 ns / 2,221 ns | 10,826 ns / 13,917 ns | 29,186 ns / 36,125 ns | 595 ns / 632 ns |
| 0 9 15 * 1   |  94 ns / 108 ns | 1,126 ns / 1,151 ns |   6,355 ns / 6,460 ns | 29,625 ns / 38,209 ns | 595 ns / 625 ns |
| 0 9 * * 1-5  | 111 ns / 126 ns | 2,170 ns / 2,252 ns | 10,346 ns / 13,000 ns | 29,795 ns / 38,209 ns | 644 ns / 674 ns |

### Parsing - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| ------------ | --------: | ------------: | ----------: | -----: | ------------: |
| * * * * *    |   ~19668k |       ~208k ✓ |      ~46k ✓ | ~34k ✓ |      ~1604k ✓ |
| 0 0 1 * *    |   ~14855k |       ~769k ✓ |     ~141k ✓ | ~34k ✓ |      ~1663k ✓ |
| 0 12 31 * *  |   ~12173k |       ~770k ✓ |     ~135k ✓ | ~33k ✓ |      ~1628k ✓ |
| */15 * * * * |   ~12499k |       ~325k ✓ |      ~69k ✓ | ~34k ✓ |      ~1467k ✓ |
| 0 9 * * *    |   ~16092k |       ~458k ✓ |      ~93k ✓ | ~33k ✓ |      ~1634k ✓ |
| 0 9 15 * 1   |   ~10575k |       ~908k ✓ |     ~159k ✓ | ~34k ✓ |      ~1722k ✓ |
| 0 9 * * 1-5  |    ~8883k |       ~462k ✓ |      ~96k ✓ | ~33k ✓ |      ~1542k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |   cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | --------------: |
| * * * * *    |   51 ns / 62 ns | 4,814 ns / 5,601 ns | 21,785 ns / 34,750 ns | 29,604 ns / 47,167 ns | 624 ns / 655 ns |
| 0 0 1 * *    |   67 ns / 79 ns | 1,301 ns / 1,354 ns |   7,108 ns / 7,178 ns | 29,534 ns / 45,875 ns | 601 ns / 631 ns |
| 0 12 31 * *  |   82 ns / 96 ns | 1,299 ns / 1,378 ns |   7,405 ns / 7,620 ns | 30,528 ns / 51,875 ns | 614 ns / 639 ns |
| */15 * * * * |   80 ns / 92 ns | 3,080 ns / 3,160 ns | 14,568 ns / 19,667 ns | 29,848 ns / 47,958 ns | 681 ns / 718 ns |
| 0 9 * * *    |   62 ns / 74 ns | 2,185 ns / 2,273 ns | 10,782 ns / 13,458 ns | 30,423 ns / 53,083 ns | 612 ns / 646 ns |
| 0 9 15 * 1   |  95 ns / 107 ns | 1,101 ns / 1,136 ns |   6,285 ns / 6,835 ns | 29,635 ns / 39,292 ns | 581 ns / 610 ns |
| 0 9 * * 1-5  | 113 ns / 126 ns | 2,166 ns / 2,252 ns | 10,391 ns / 12,791 ns | 29,927 ns / 44,250 ns | 649 ns / 683 ns |

### Validation Varied Inputs - Throughput (ops/sec)

| Test Case | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------- | --------: | ------------: | ----------: | -----: | ------------: |
| varied    |   ~12301k |       ~656k ✓ |     ~130k ✓ | ~33k ✓ |      ~1390k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation Varied Inputs - Latency (mean / p99)

| Test Case |     cron-fast |       cron-schedule |         cron-parser |                croner |   cron-validate |
| --------- | ------------: | ------------------: | ------------------: | --------------------: | --------------: |
| varied    | 81 ns / 97 ns | 1,524 ns / 1,613 ns | 7,681 ns / 7,955 ns | 30,709 ns / 47,500 ns | 719 ns / 751 ns |

# Benchmark

> Tested with deno v2.9.5, cron-fast v3.5.0, croner v10.0.1, cron-parser v5.7.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by Deno.bench().

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1819k      | baseline     |
| cron-schedule | ~387k       | 4.7x faster  |
| cron-parser   | ~34k        | 52.8x faster |
| croner        | ~30k        | 60.2x faster |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~28k        | baseline     |
| cron-schedule | ~17k        | 1.6x faster  |
| cron-parser   | ~1k         | 30.1x faster |
| croner        | ~2k         | 13.0x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1981k      | baseline     |
| cron-schedule | ~428k       | 4.6x faster  |
| cron-parser   | ~40k        | 48.9x faster |
| croner        | ~30k        | 65.1x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~7643k      | baseline      |
| cron-schedule | ~551k       | 13.9x faster  |
| cron-parser   | ~105k       | 72.9x faster  |
| croner        | ~33k        | 233.2x faster |
| cron-validate | ~1630k      | 4.7x faster   |

### Validation Varied Inputs

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~6009k      | baseline      |
| cron-schedule | ~659k       | 9.1x faster   |
| cron-parser   | ~135k       | 44.6x faster  |
| croner        | ~34k        | 174.4x faster |
| cron-validate | ~1395k      | 4.3x faster   |

### Parsing

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~7658k      | baseline      |
| cron-schedule | ~553k       | 13.9x faster  |
| cron-parser   | ~105k       | 72.6x faster  |
| croner        | ~33k        | 234.1x faster |
| cron-validate | ~1605k      | 4.8x faster   |

Run benchmarks yourself: `pnpm bench:deno`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner |
| ------------ | --------: | ------------: | ----------: | -----: |
| * * * * *    |    ~3943k |       ~139k ✓ |      ~31k ✓ | ~33k ✓ |
| 0 0 1 * *    |    ~1353k |       ~546k ✓ |      ~19k ✓ | ~31k ✓ |
| 0 12 31 * *  |    ~1299k |       ~536k ✓ |       ~8k ✓ | ~30k ✓ |
| */15 * * * * |    ~2133k |       ~293k ✓ |      ~55k ✓ | ~31k ✓ |
| 0 9 * * *    |    ~1791k |       ~363k ✓ |      ~43k ✓ | ~31k ✓ |
| 0 9 15 * 1   |     ~750k |       ~499k ✓ |      ~37k ✓ | ~28k ✓ |
| 0 9 * * 1-5  |    ~1464k |       ~329k ✓ |      ~47k ✓ | ~29k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case    |           cron-fast |        cron-schedule |             cron-parser |                croner |
| ------------ | ------------------: | -------------------: | ----------------------: | --------------------: |
| * * * * *    |     254 ns / 272 ns | 7,195 ns / 10,000 ns |   31,753 ns / 67,541 ns | 30,734 ns / 68,958 ns |
| 0 0 1 * *    |     739 ns / 785 ns |  1,831 ns / 2,392 ns |   53,012 ns / 85,250 ns | 32,582 ns / 64,042 ns |
| 0 12 31 * *  |     770 ns / 799 ns |  1,866 ns / 1,935 ns | 131,909 ns / 238,708 ns | 32,902 ns / 41,625 ns |
| */15 * * * * |     469 ns / 510 ns |  3,410 ns / 3,559 ns |   18,108 ns / 26,125 ns | 32,674 ns / 53,500 ns |
| 0 9 * * *    |     558 ns / 598 ns |  2,752 ns / 4,113 ns |   23,106 ns / 43,042 ns | 32,169 ns / 52,084 ns |
| 0 9 15 * 1   | 1,334 ns / 1,388 ns |  2,002 ns / 2,103 ns |   26,781 ns / 60,708 ns | 36,351 ns / 81,250 ns |
| 0 9 * * 1-5  |     683 ns / 783 ns |  3,035 ns / 3,166 ns |   21,122 ns / 27,125 ns | 35,069 ns / 56,000 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case   | cron-fast | cron-schedule | cron-parser | croner |
| ----------- | --------: | ------------: | ----------: | -----: |
| * * * * *   |      ~41k |        ~23k ✓ |       ~1k ✓ |  ~3k ✓ |
| 0 9 * * 1-5 |      ~15k |        ~11k ✓ |       ~0k ✓ |  ~1k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case   |              cron-fast |          cron-schedule |                 cron-parser |                      croner |
| ----------- | ---------------------: | ---------------------: | --------------------------: | --------------------------: |
| * * * * *   |  24,302 ns / 34,791 ns |  43,073 ns / 92,959 ns |     704,146 ns / 840,833 ns |     288,937 ns / 385,834 ns |
| 0 9 * * 1-5 | 65,639 ns / 106,000 ns | 88,896 ns / 135,042 ns | 2,205,944 ns / 2,536,916 ns | 1,137,060 ns / 1,431,625 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner |
| ------------ | --------: | ------------: | ----------: | -----: |
| * * * * *    |    ~3575k |       ~195k ✓ |      ~36k ✓ | ~32k ✓ |
| 0 0 1 * *    |    ~1628k |       ~596k ✓ |       ~9k ✓ | ~31k ✓ |
| 0 12 31 * *  |    ~1219k |       ~518k ✓ |       ~8k ✓ | ~29k ✓ |
| */15 * * * * |    ~2150k |       ~294k ✓ |      ~58k ✓ | ~32k ✓ |
| 0 9 * * *    |    ~1894k |       ~391k ✓ |      ~51k ✓ | ~30k ✓ |
| 0 9 15 * 1   |    ~1711k |       ~637k ✓ |      ~68k ✓ | ~30k ✓ |
| 0 9 * * 1-5  |    ~1690k |       ~367k ✓ |      ~54k ✓ | ~30k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |             cron-parser |                croner |
| ------------ | --------------: | ------------------: | ----------------------: | --------------------: |
| * * * * *    | 280 ns / 418 ns | 5,128 ns / 5,546 ns |   27,611 ns / 37,125 ns | 31,458 ns / 44,416 ns |
| 0 0 1 * *    | 614 ns / 643 ns | 1,678 ns / 1,756 ns | 111,810 ns / 211,041 ns | 32,113 ns / 45,375 ns |
| 0 12 31 * *  | 820 ns / 854 ns | 1,929 ns / 2,035 ns | 125,106 ns / 250,083 ns | 34,374 ns / 79,250 ns |
| */15 * * * * | 465 ns / 480 ns | 3,402 ns / 3,473 ns |   17,237 ns / 22,542 ns | 31,344 ns / 47,083 ns |
| 0 9 * * *    | 528 ns / 578 ns | 2,560 ns / 2,634 ns |   19,768 ns / 27,958 ns | 33,713 ns / 54,000 ns |
| 0 9 15 * 1   | 585 ns / 629 ns | 1,570 ns / 1,628 ns |   14,691 ns / 20,625 ns | 33,297 ns / 82,959 ns |
| 0 9 * * 1-5  | 592 ns / 620 ns | 2,728 ns / 2,965 ns |   18,682 ns / 25,125 ns | 33,886 ns / 53,542 ns |

### Validation - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| ------------ | --------: | ------------: | ----------: | -----: | ------------: |
| * * * * *    |   ~16510k |       ~214k ✓ |      ~44k ✓ | ~32k ✓ |      ~1651k ✓ |
| 0 0 1 * *    |    ~6102k |       ~744k ✓ |     ~141k ✓ | ~33k ✓ |      ~1644k ✓ |
| 0 12 31 * *  |    ~5700k |       ~774k ✓ |     ~134k ✓ | ~31k ✓ |      ~1724k ✓ |
| */15 * * * * |    ~8522k |       ~323k ✓ |      ~70k ✓ | ~34k ✓ |      ~1476k ✓ |
| 0 9 * * *    |    ~7368k |       ~451k ✓ |      ~87k ✓ | ~32k ✓ |      ~1683k ✓ |
| 0 9 15 * 1   |    ~4719k |       ~889k ✓ |     ~161k ✓ | ~33k ✓ |      ~1664k ✓ |
| 0 9 * * 1-5  |    ~4580k |       ~465k ✓ |      ~97k ✓ | ~34k ✓ |      ~1564k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |   cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | --------------: |
| * * * * *    |   61 ns / 73 ns | 4,675 ns / 4,883 ns | 22,829 ns / 54,291 ns | 31,304 ns / 53,667 ns | 606 ns / 674 ns |
| 0 0 1 * *    | 164 ns / 184 ns | 1,344 ns / 1,645 ns |   7,103 ns / 7,382 ns | 30,106 ns / 48,375 ns | 608 ns / 643 ns |
| 0 12 31 * *  | 175 ns / 197 ns | 1,292 ns / 1,344 ns |   7,462 ns / 7,663 ns | 32,429 ns / 61,334 ns | 580 ns / 611 ns |
| */15 * * * * | 117 ns / 129 ns | 3,094 ns / 3,271 ns | 14,216 ns / 17,750 ns | 29,172 ns / 37,833 ns | 678 ns / 777 ns |
| 0 9 * * *    | 136 ns / 154 ns | 2,216 ns / 2,489 ns | 11,441 ns / 23,708 ns | 31,146 ns / 53,334 ns | 594 ns / 634 ns |
| 0 9 15 * 1   | 212 ns / 234 ns | 1,125 ns / 1,206 ns |   6,223 ns / 6,409 ns | 30,127 ns / 49,292 ns | 601 ns / 633 ns |
| 0 9 * * 1-5  | 218 ns / 237 ns | 2,150 ns / 2,203 ns | 10,290 ns / 13,041 ns | 29,528 ns / 37,416 ns | 639 ns / 718 ns |

### Parsing - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| ------------ | --------: | ------------: | ----------: | -----: | ------------: |
| * * * * *    |   ~16975k |       ~207k ✓ |      ~46k ✓ | ~34k ✓ |      ~1619k ✓ |
| 0 0 1 * *    |    ~6063k |       ~761k ✓ |     ~142k ✓ | ~34k ✓ |      ~1648k ✓ |
| 0 12 31 * *  |    ~5805k |       ~768k ✓ |     ~134k ✓ | ~32k ✓ |      ~1692k ✓ |
| */15 * * * * |    ~8465k |       ~320k ✓ |      ~70k ✓ | ~34k ✓ |      ~1500k ✓ |
| 0 9 * * *    |    ~7350k |       ~455k ✓ |      ~91k ✓ | ~32k ✓ |      ~1510k ✓ |
| 0 9 15 * 1   |    ~4428k |       ~915k ✓ |     ~162k ✓ | ~34k ✓ |      ~1703k ✓ |
| 0 9 * * 1-5  |    ~4521k |       ~442k ✓ |      ~94k ✓ | ~31k ✓ |      ~1561k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |     cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | ----------------: |
| * * * * *    |   59 ns / 69 ns | 4,820 ns / 4,961 ns | 21,899 ns / 33,417 ns | 29,640 ns / 46,000 ns |   617 ns / 644 ns |
| 0 0 1 * *    | 165 ns / 185 ns | 1,314 ns / 1,444 ns |   7,027 ns / 7,107 ns | 29,706 ns / 40,416 ns |   607 ns / 738 ns |
| 0 12 31 * *  | 172 ns / 190 ns | 1,301 ns / 1,349 ns |   7,469 ns / 7,589 ns | 31,724 ns / 54,375 ns |   591 ns / 612 ns |
| */15 * * * * | 118 ns / 132 ns | 3,125 ns / 4,424 ns | 14,192 ns / 17,167 ns | 29,198 ns / 38,125 ns |   667 ns / 709 ns |
| 0 9 * * *    | 136 ns / 154 ns | 2,198 ns / 2,255 ns | 10,993 ns / 13,625 ns | 31,651 ns / 53,209 ns | 662 ns / 1,393 ns |
| 0 9 15 * 1   | 226 ns / 264 ns | 1,093 ns / 1,141 ns |   6,191 ns / 6,334 ns | 29,762 ns / 40,291 ns |   587 ns / 643 ns |
| 0 9 * * 1-5  | 221 ns / 238 ns | 2,264 ns / 2,428 ns | 10,686 ns / 14,292 ns | 32,634 ns / 55,666 ns |   641 ns / 682 ns |

### Validation Varied Inputs - Throughput (ops/sec)

| Test Case | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------- | --------: | ------------: | ----------: | -----: | ------------: |
| varied    |    ~6009k |       ~659k ✓ |     ~135k ✓ | ~34k ✓ |      ~1395k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation Varied Inputs - Latency (mean / p99)

| Test Case |       cron-fast |       cron-schedule |         cron-parser |                croner |   cron-validate |
| --------- | --------------: | ------------------: | ------------------: | --------------------: | --------------: |
| varied    | 166 ns / 186 ns | 1,518 ns / 1,598 ns | 7,426 ns / 7,700 ns | 29,033 ns / 35,916 ns | 717 ns / 777 ns |

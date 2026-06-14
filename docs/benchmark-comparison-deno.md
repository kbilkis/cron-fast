# Benchmark

> Tested with deno v2.8.3, cron-fast v3.2.0, croner v10.0.1, cron-parser v5.5.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by Deno.bench().

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~886k       | baseline     |
| cron-schedule | ~405k       | 2.2x faster  |
| cron-parser   | ~35k        | 25.3x faster |
| croner        | ~31k        | 28.4x faster |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~22k        | baseline     |
| cron-schedule | ~18k        | 1.2x faster  |
| cron-parser   | ~1k         | 23.5x faster |
| croner        | ~2k         | 9.9x faster  |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1003k      | baseline     |
| cron-schedule | ~433k       | 2.3x faster  |
| cron-parser   | ~40k        | 24.9x faster |
| croner        | ~31k        | 32.0x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2232k      | baseline     |
| cron-schedule | ~558k       | 4.0x faster  |
| cron-parser   | ~105k       | 21.3x faster |
| croner        | ~34k        | 66.4x faster |
| cron-validate | ~1305k      | 1.7x faster  |

### Parsing

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2234k      | baseline     |
| cron-schedule | ~567k       | 3.9x faster  |
| cron-parser   | ~105k       | 21.2x faster |
| croner        | ~34k        | 66.7x faster |
| cron-validate | ~1311k      | 1.7x faster  |

Run benchmarks yourself: `pnpm bench:deno`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case       | cron-fast | cron-schedule | cron-parser | croner |
| --------------- | --------: | ------------: | ----------: | -----: |
| \* \* \* \* \*  |    ~1481k |       ~160k ✓ |      ~31k ✓ | ~33k ✓ |
| 0 0 1 \* \*     |     ~789k |       ~574k ✓ |      ~19k ✓ | ~31k ✓ |
| 0 12 31 \* \*   |     ~704k |       ~557k ✓ |       ~8k ✓ | ~30k ✓ |
| _/15 _ \* \* \* |     ~969k |       ~296k ✓ |      ~55k ✓ | ~32k ✓ |
| 0 9 \* \* \*    |     ~968k |       ~386k ✓ |      ~45k ✓ | ~33k ✓ |
| 0 9 15 \* 1     |     ~445k |       ~526k ✗ |      ~40k ✓ | ~30k ✓ |
| 0 9 \* \* 1-5   |     ~842k |       ~338k ✓ |      ~47k ✓ | ~29k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case       |           cron-fast |       cron-schedule |             cron-parser |                croner |
| --------------- | ------------------: | ------------------: | ----------------------: | --------------------: |
| \* \* \* \* \*  |     675 ns / 945 ns | 6,243 ns / 7,223 ns |   32,207 ns / 62,125 ns | 30,124 ns / 70,709 ns |
| 0 0 1 \* \*     | 1,267 ns / 1,502 ns | 1,742 ns / 1,959 ns |   53,134 ns / 86,292 ns | 32,260 ns / 55,166 ns |
| 0 12 31 \* \*   | 1,420 ns / 1,615 ns | 1,795 ns / 1,855 ns | 131,342 ns / 241,042 ns | 32,804 ns / 41,917 ns |
| _/15 _ \* \* \* | 1,032 ns / 1,088 ns | 3,382 ns / 3,493 ns |   18,070 ns / 28,416 ns | 30,970 ns / 43,333 ns |
| 0 9 \* \* \*    | 1,033 ns / 1,082 ns | 2,588 ns / 2,619 ns |   22,103 ns / 25,375 ns | 30,656 ns / 35,291 ns |
| 0 9 15 \* 1     | 2,246 ns / 2,309 ns | 1,902 ns / 1,972 ns |   25,135 ns / 30,417 ns | 33,013 ns / 46,875 ns |
| 0 9 \* \* 1-5   | 1,188 ns / 1,371 ns | 2,960 ns / 3,034 ns |   21,375 ns / 24,917 ns | 34,875 ns / 53,042 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case      | cron-fast | cron-schedule | cron-parser | croner |
| -------------- | --------: | ------------: | ----------: | -----: |
| \* \* \* \* \* |      ~33k |        ~25k ✓ |       ~1k ✓ |  ~4k ✓ |
| 0 9 \* \* 1-5  |      ~11k |          ~12k |       ~0k ✓ |  ~1k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case      |              cron-fast |          cron-schedule |                 cron-parser |                      croner |
| -------------- | ---------------------: | ---------------------: | --------------------------: | --------------------------: |
| \* \* \* \* \* |  30,043 ns / 32,000 ns |  40,669 ns / 72,166 ns |     710,353 ns / 884,625 ns |     284,769 ns / 367,583 ns |
| 0 9 \* \* 1-5  | 92,231 ns / 101,667 ns | 83,420 ns / 102,208 ns | 2,132,320 ns / 2,520,416 ns | 1,064,284 ns / 1,198,334 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case       | cron-fast | cron-schedule | cron-parser | croner |
| --------------- | --------: | ------------: | ----------: | -----: |
| \* \* \* \* \*  |    ~1489k |       ~196k ✓ |      ~36k ✓ | ~32k ✓ |
| 0 0 1 \* \*     |     ~970k |       ~611k ✓ |       ~9k ✓ | ~31k ✓ |
| 0 12 31 \* \*   |     ~704k |       ~517k ✓ |       ~8k ✓ | ~31k ✓ |
| _/15 _ \* \* \* |     ~968k |       ~292k ✓ |      ~58k ✓ | ~32k ✓ |
| 0 9 \* \* \*    |    ~1001k |       ~396k ✓ |      ~51k ✓ | ~31k ✓ |
| 0 9 15 \* 1     |     ~988k |       ~636k ✓ |      ~67k ✓ | ~31k ✓ |
| 0 9 \* \* 1-5   |     ~903k |       ~382k ✓ |      ~53k ✓ | ~30k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case       |           cron-fast |       cron-schedule |             cron-parser |                croner |
| --------------- | ------------------: | ------------------: | ----------------------: | --------------------: |
| \* \* \* \* \*  |     672 ns / 924 ns | 5,098 ns / 5,553 ns |   27,710 ns / 32,625 ns | 31,114 ns / 38,500 ns |
| 0 0 1 \* \*     | 1,031 ns / 1,057 ns | 1,636 ns / 1,713 ns | 112,328 ns / 214,958 ns | 31,911 ns / 41,458 ns |
| 0 12 31 \* \*   | 1,419 ns / 1,453 ns | 1,934 ns / 2,024 ns | 118,855 ns / 233,000 ns | 32,249 ns / 39,833 ns |
| _/15 _ \* \* \* | 1,034 ns / 1,068 ns | 3,430 ns / 3,548 ns |   17,256 ns / 20,041 ns | 31,171 ns / 42,250 ns |
| 0 9 \* \* \*    |   999 ns / 1,044 ns | 2,524 ns / 2,597 ns |   19,610 ns / 27,666 ns | 31,823 ns / 44,709 ns |
| 0 9 15 \* 1     | 1,012 ns / 1,051 ns | 1,571 ns / 1,627 ns |   14,858 ns / 19,333 ns | 32,071 ns / 46,292 ns |
| 0 9 \* \* 1-5   | 1,107 ns / 1,148 ns | 2,618 ns / 2,673 ns |   18,913 ns / 23,083 ns | 33,022 ns / 41,041 ns |

### Validation - Throughput (ops/sec)

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |    ~2386k |       ~216k ✓ |      ~46k ✓ | ~34k ✓ |      ~1260k ✓ |
| 0 0 1 \* \*     |    ~2442k |       ~774k ✓ |     ~139k ✓ | ~33k ✓ |      ~1366k ✓ |
| 0 12 31 \* \*   |    ~2181k |       ~780k ✓ |     ~136k ✓ | ~34k ✓ |      ~1362k ✓ |
| _/15 _ \* \* \* |    ~2124k |       ~331k ✓ |      ~69k ✓ | ~34k ✓ |      ~1192k ✓ |
| 0 9 \* \* \*    |    ~2517k |       ~459k ✓ |      ~91k ✓ | ~34k ✓ |      ~1350k ✓ |
| 0 9 15 \* 1     |    ~2145k |       ~923k ✓ |     ~158k ✓ | ~33k ✓ |      ~1346k ✓ |
| 0 9 \* \* 1-5   |    ~1827k |       ~424k ✓ |      ~95k ✓ | ~33k ✓ |      ~1259k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case       |       cron-fast |       cron-schedule |           cron-parser |                croner |     cron-validate |
| --------------- | --------------: | ------------------: | --------------------: | --------------------: | ----------------: |
| \* \* \* \* \*  | 419 ns / 436 ns | 4,638 ns / 4,728 ns | 21,533 ns / 23,875 ns | 29,624 ns / 35,791 ns |   794 ns / 869 ns |
| 0 0 1 \* \*     | 409 ns / 428 ns | 1,291 ns / 1,332 ns |   7,214 ns / 7,461 ns | 29,877 ns / 38,917 ns |   732 ns / 778 ns |
| 0 12 31 \* \*   | 458 ns / 479 ns | 1,282 ns / 1,328 ns |   7,366 ns / 7,510 ns | 29,617 ns / 35,750 ns |   734 ns / 772 ns |
| _/15 _ \* \* \* | 471 ns / 488 ns | 3,026 ns / 3,080 ns | 14,428 ns / 16,500 ns | 29,628 ns / 36,125 ns |   839 ns / 880 ns |
| 0 9 \* \* \*    | 397 ns / 412 ns | 2,178 ns / 2,217 ns | 10,945 ns / 13,083 ns | 29,740 ns / 38,458 ns |   741 ns / 765 ns |
| 0 9 15 \* 1     | 466 ns / 494 ns | 1,083 ns / 1,126 ns |   6,345 ns / 6,478 ns | 29,872 ns / 36,000 ns |   743 ns / 771 ns |
| 0 9 \* \* 1-5   | 547 ns / 575 ns | 2,360 ns / 5,615 ns | 10,536 ns / 11,625 ns | 29,896 ns / 36,333 ns | 794 ns / 1,102 ns |

### Parsing - Throughput (ops/sec)

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |    ~2387k |       ~216k ✓ |      ~46k ✓ | ~34k ✓ |      ~1272k ✓ |
| 0 0 1 \* \*     |    ~2442k |       ~785k ✓ |     ~140k ✓ | ~34k ✓ |      ~1360k ✓ |
| 0 12 31 \* \*   |    ~2160k |       ~782k ✓ |     ~137k ✓ | ~34k ✓ |      ~1369k ✓ |
| _/15 _ \* \* \* |    ~2163k |       ~330k ✓ |      ~69k ✓ | ~33k ✓ |      ~1220k ✓ |
| 0 9 \* \* \*    |    ~2519k |       ~465k ✓ |      ~92k ✓ | ~34k ✓ |      ~1336k ✓ |
| 0 9 15 \* 1     |    ~2150k |       ~924k ✓ |     ~157k ✓ | ~33k ✓ |      ~1365k ✓ |
| 0 9 \* \* 1-5   |    ~1821k |       ~466k ✓ |      ~95k ✓ | ~33k ✓ |      ~1253k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case       |       cron-fast |       cron-schedule |           cron-parser |                croner |   cron-validate |
| --------------- | --------------: | ------------------: | --------------------: | --------------------: | --------------: |
| \* \* \* \* \*  | 419 ns / 431 ns | 4,633 ns / 4,667 ns | 21,648 ns / 28,208 ns | 29,162 ns / 36,041 ns | 786 ns / 805 ns |
| 0 0 1 \* \*     | 409 ns / 423 ns | 1,275 ns / 1,365 ns |   7,118 ns / 7,197 ns | 29,763 ns / 36,791 ns | 735 ns / 788 ns |
| 0 12 31 \* \*   | 463 ns / 484 ns | 1,278 ns / 1,309 ns |   7,297 ns / 7,396 ns | 29,584 ns / 36,125 ns | 730 ns / 754 ns |
| _/15 _ \* \* \* | 462 ns / 479 ns | 3,026 ns / 3,094 ns | 14,537 ns / 17,959 ns | 29,973 ns / 42,209 ns | 820 ns / 884 ns |
| 0 9 \* \* \*    | 397 ns / 411 ns | 2,152 ns / 2,202 ns | 10,819 ns / 11,875 ns | 29,557 ns / 36,459 ns | 749 ns / 786 ns |
| 0 9 15 \* 1     | 465 ns / 485 ns | 1,083 ns / 1,114 ns |   6,363 ns / 6,484 ns | 30,143 ns / 37,333 ns | 733 ns / 754 ns |
| 0 9 \* \* 1-5   | 549 ns / 573 ns | 2,144 ns / 2,178 ns | 10,567 ns / 13,167 ns | 30,732 ns / 45,458 ns | 798 ns / 830 ns |

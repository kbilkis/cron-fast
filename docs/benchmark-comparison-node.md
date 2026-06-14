# Benchmark

> Tested with node v24.16.0, cron-fast v3.1.2, croner v10.0.1, cron-parser v5.5.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by vitest bench (tinybench).

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~788k       | baseline     |
| cron-schedule | ~334k       | 2.4x faster  |
| cron-parser   | ~34k        | 22.8x faster |
| croner        | ~31k        | 25.7x faster |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~10k        | baseline     |
| cron-schedule | ~15k        | 1.5x slower  |
| cron-parser   | ~1k         | 8.4x faster  |
| croner        | ~2k         | 4.2x faster  |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~906k       | baseline     |
| cron-schedule | ~356k       | 2.5x faster  |
| cron-parser   | ~39k        | 23.1x faster |
| croner        | ~32k        | 28.4x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1805k      | baseline     |
| cron-schedule | ~461k       | 3.9x faster  |
| cron-parser   | ~98k        | 18.5x faster |
| croner        | ~35k        | 51.2x faster |
| cron-validate | ~636k       | 2.8x faster  |

### Parsing

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1803k      | baseline     |
| cron-schedule | ~463k       | 3.9x faster  |
| cron-parser   | ~97k        | 18.6x faster |
| croner        | ~35k        | 52.2x faster |
| cron-validate | ~636k       | 2.8x faster  |

Run benchmarks yourself: `pnpm bench`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case       |    cron-fast | cron-schedule |  cron-parser |       croner |
| --------------- | -----------: | ------------: | -----------: | -----------: |
| \* \* \* \* \*  | ~1356k ±1.3% | ~139k ±0.4% ✓ | ~32k ±0.4% ✓ | ~32k ±0.5% ✓ |
| 0 0 1 \* \*     |  ~692k ±0.3% | ~451k ±0.5% ✓ | ~19k ±0.4% ✓ | ~30k ±2.9% ✓ |
| 0 12 31 \* \*   |  ~637k ±0.4% | ~446k ±0.5% ✓ |  ~8k ±0.5% ✓ | ~28k ±3.4% ✓ |
| _/15 _ \* \* \* |  ~832k ±0.1% | ~256k ±0.3% ✓ | ~57k ±0.3% ✓ | ~33k ±1.0% ✓ |
| 0 9 \* \* \*    |  ~884k ±0.1% | ~322k ±0.4% ✓ | ~42k ±0.5% ✓ | ~31k ±1.6% ✓ |
| 0 9 15 \* 1     |  ~409k ±0.3% |   ~437k ±0.4% | ~39k ±0.4% ✓ | ~31k ±0.3% ✓ |
| 0 9 \* \* 1-5   |  ~704k ±1.0% | ~291k ±0.4% ✓ | ~44k ±0.4% ✓ | ~29k ±0.7% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case       |           cron-fast |       cron-schedule |             cron-parser |                croner |
| --------------- | ------------------: | ------------------: | ----------------------: | --------------------: |
| \* \* \* \* \*  |   738 ns / 1,291 ns | 7,214 ns / 9,000 ns |   30,908 ns / 38,458 ns | 31,011 ns / 43,625 ns |
| 0 0 1 \* \*     | 1,445 ns / 1,834 ns | 2,219 ns / 2,792 ns |   51,715 ns / 58,333 ns | 33,243 ns / 76,417 ns |
| 0 12 31 \* \*   | 1,569 ns / 1,958 ns | 2,244 ns / 2,792 ns | 130,077 ns / 153,750 ns | 35,352 ns / 78,167 ns |
| _/15 _ \* \* \* | 1,202 ns / 1,333 ns | 3,907 ns / 4,542 ns |   17,547 ns / 18,709 ns | 29,998 ns / 34,541 ns |
| 0 9 \* \* \*    | 1,132 ns / 1,333 ns | 3,103 ns / 3,875 ns |   24,044 ns / 30,375 ns | 32,781 ns / 47,375 ns |
| 0 9 15 \* 1     | 2,443 ns / 2,792 ns | 2,291 ns / 2,833 ns |   25,510 ns / 29,458 ns | 32,372 ns / 38,333 ns |
| 0 9 \* \* 1-5   | 1,420 ns / 1,917 ns | 3,442 ns / 4,000 ns |   22,630 ns / 29,833 ns | 34,416 ns / 44,708 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case      |  cron-fast | cron-schedule | cron-parser |      croner |
| -------------- | ---------: | ------------: | ----------: | ----------: |
| \* \* \* \* \* | ~14k ±0.6% |  ~20k ±0.2% ✗ | ~2k ±0.4% ✓ | ~4k ±0.2% ✓ |
| 0 9 \* \* 1-5  |  ~6k ±0.3% |  ~10k ±0.2% ✗ | ~1k ±0.8% ✓ | ~1k ±0.3% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case      |               cron-fast |          cron-schedule |                 cron-parser |                      croner |
| -------------- | ----------------------: | ---------------------: | --------------------------: | --------------------------: |
| \* \* \* \* \* |  71,825 ns / 123,125 ns |  48,968 ns / 54,334 ns |     528,485 ns / 667,000 ns |     265,366 ns / 348,083 ns |
| 0 9 \* \* 1-5  | 163,053 ns / 230,625 ns | 97,048 ns / 104,250 ns | 1,989,573 ns / 2,491,708 ns | 1,008,412 ns / 1,116,833 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case       |    cron-fast | cron-schedule |  cron-parser |       croner |
| --------------- | -----------: | ------------: | -----------: | -----------: |
| \* \* \* \* \*  | ~1384k ±0.5% | ~134k ±0.4% ✓ | ~35k ±0.4% ✓ | ~33k ±0.4% ✓ |
| 0 0 1 \* \*     |  ~911k ±0.2% | ~494k ±0.4% ✓ |  ~9k ±0.4% ✓ | ~32k ±0.2% ✓ |
| 0 12 31 \* \*   |  ~648k ±0.3% | ~430k ±0.2% ✓ |  ~9k ±0.4% ✓ | ~31k ±0.8% ✓ |
| _/15 _ \* \* \* |  ~818k ±0.3% | ~256k ±0.4% ✓ | ~57k ±0.3% ✓ | ~32k ±0.3% ✓ |
| 0 9 \* \* \*    |  ~933k ±0.3% | ~339k ±0.4% ✓ | ~49k ±0.3% ✓ | ~33k ±0.3% ✓ |
| 0 9 15 \* 1     |  ~874k ±1.0% | ~514k ±0.3% ✓ | ~65k ±0.4% ✓ | ~32k ±0.7% ✓ |
| 0 9 \* \* 1-5   |  ~772k ±0.3% | ~322k ±0.3% ✓ | ~51k ±0.3% ✓ | ~31k ±0.3% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case       |           cron-fast |       cron-schedule |             cron-parser |                croner |
| --------------- | ------------------: | ------------------: | ----------------------: | --------------------: |
| \* \* \* \* \*  |   722 ns / 1,167 ns | 7,435 ns / 8,292 ns |   28,613 ns / 36,250 ns | 30,429 ns / 43,791 ns |
| 0 0 1 \* \*     | 1,097 ns / 1,417 ns | 2,024 ns / 2,583 ns | 107,820 ns / 129,459 ns | 31,538 ns / 36,250 ns |
| 0 12 31 \* \*   | 1,543 ns / 1,875 ns | 2,324 ns / 2,875 ns | 114,620 ns / 142,750 ns | 32,192 ns / 38,750 ns |
| _/15 _ \* \* \* | 1,222 ns / 1,708 ns | 3,901 ns / 4,541 ns |   17,681 ns / 19,500 ns | 30,791 ns / 37,833 ns |
| 0 9 \* \* \*    | 1,072 ns / 1,417 ns | 2,953 ns / 3,750 ns |   20,531 ns / 24,167 ns | 30,686 ns / 36,166 ns |
| 0 9 15 \* 1     | 1,144 ns / 1,542 ns | 1,945 ns / 2,458 ns |   15,334 ns / 18,125 ns | 31,219 ns / 35,792 ns |
| 0 9 \* \* 1-5   | 1,296 ns / 1,791 ns | 3,103 ns / 3,708 ns |   19,587 ns / 22,416 ns | 32,704 ns / 36,542 ns |

### Validation - Throughput (ops/sec)

| Test Case       |    cron-fast | cron-schedule |   cron-parser |       croner | cron-validate |
| --------------- | -----------: | ------------: | ------------: | -----------: | ------------: |
| \* \* \* \* \*  | ~2025k ±0.7% | ~157k ±0.4% ✓ |  ~45k ±0.3% ✓ | ~36k ±0.3% ✓ | ~631k ±0.3% ✓ |
| 0 0 1 \* \*     | ~2047k ±0.4% | ~620k ±0.5% ✓ | ~127k ±0.3% ✓ | ~36k ±0.3% ✓ | ~667k ±0.3% ✓ |
| 0 12 31 \* \*   | ~1751k ±0.1% | ~618k ±0.4% ✓ | ~125k ±0.3% ✓ | ~35k ±0.2% ✓ | ~631k ±4.4% ✓ |
| _/15 _ \* \* \* | ~1603k ±0.9% | ~291k ±0.4% ✓ |  ~69k ±0.3% ✓ | ~35k ±0.2% ✓ | ~669k ±2.2% ✓ |
| 0 9 \* \* \*    | ~2112k ±0.2% | ~402k ±0.4% ✓ |  ~87k ±1.4% ✓ | ~35k ±0.2% ✓ | ~639k ±0.3% ✓ |
| 0 9 15 \* 1     | ~1722k ±0.4% | ~756k ±0.3% ✓ | ~140k ±0.3% ✓ | ~35k ±0.3% ✓ | ~609k ±0.7% ✓ |
| 0 9 \* \* 1-5   | ~1372k ±0.4% | ~382k ±3.7% ✓ |  ~90k ±0.3% ✓ | ~35k ±0.3% ✓ | ~604k ±2.9% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case       |         cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| --------------- | ----------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| \* \* \* \* \*  | 494 ns / 1,042 ns | 6,376 ns / 7,167 ns | 22,241 ns / 26,750 ns | 27,765 ns / 34,542 ns | 1,586 ns / 2,000 ns |
| 0 0 1 \* \*     |   489 ns / 708 ns | 1,614 ns / 2,125 ns |   7,858 ns / 8,708 ns | 28,033 ns / 34,958 ns | 1,498 ns / 1,916 ns |
| 0 12 31 \* \*   |   571 ns / 708 ns | 1,619 ns / 2,125 ns |  7,986 ns / 10,416 ns | 28,677 ns / 35,250 ns | 1,584 ns / 2,000 ns |
| _/15 _ \* \* \* | 624 ns / 1,042 ns | 3,441 ns / 4,041 ns | 14,499 ns / 15,334 ns | 28,272 ns / 32,709 ns | 1,496 ns / 2,250 ns |
| 0 9 \* \* \*    |   473 ns / 666 ns | 2,488 ns / 3,042 ns | 11,461 ns / 12,833 ns | 28,291 ns / 34,250 ns | 1,566 ns / 1,958 ns |
| 0 9 15 \* 1     |   581 ns / 834 ns | 1,324 ns / 1,792 ns |   7,134 ns / 7,958 ns | 28,810 ns / 35,584 ns | 1,642 ns / 2,042 ns |
| 0 9 \* \* 1-5   | 729 ns / 1,167 ns | 2,619 ns / 5,167 ns | 11,053 ns / 12,875 ns | 28,907 ns / 34,708 ns | 1,657 ns / 2,458 ns |

### Parsing - Throughput (ops/sec)

| Test Case       |    cron-fast | cron-schedule |   cron-parser |       croner | cron-validate |
| --------------- | -----------: | ------------: | ------------: | -----------: | ------------: |
| \* \* \* \* \*  | ~2049k ±1.2% | ~156k ±0.4% ✓ |  ~45k ±0.3% ✓ | ~36k ±0.3% ✓ | ~636k ±0.3% ✓ |
| 0 0 1 \* \*     | ~2059k ±0.4% | ~619k ±0.4% ✓ | ~127k ±0.3% ✓ | ~35k ±0.2% ✓ | ~620k ±1.0% ✓ |
| 0 12 31 \* \*   | ~1727k ±0.4% | ~619k ±0.4% ✓ | ~124k ±0.4% ✓ | ~34k ±0.3% ✓ | ~622k ±2.8% ✓ |
| _/15 _ \* \* \* | ~1583k ±0.5% | ~288k ±0.4% ✓ |  ~68k ±0.4% ✓ | ~34k ±0.4% ✓ | ~694k ±0.3% ✓ |
| 0 9 \* \* \*    | ~2133k ±0.2% | ~400k ±0.4% ✓ |  ~88k ±0.3% ✓ | ~34k ±0.3% ✓ | ~625k ±1.7% ✓ |
| 0 9 15 \* 1     | ~1703k ±0.4% | ~758k ±0.3% ✓ | ~140k ±0.3% ✓ | ~34k ±0.3% ✓ | ~620k ±2.4% ✓ |
| 0 9 \* \* 1-5   | ~1370k ±0.4% | ~399k ±0.4% ✓ |  ~88k ±0.4% ✓ | ~34k ±0.3% ✓ | ~636k ±0.3% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case       |         cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| --------------- | ----------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| \* \* \* \* \*  | 488 ns / 1,000 ns | 6,417 ns / 7,375 ns | 22,408 ns / 28,584 ns | 27,849 ns / 34,375 ns | 1,573 ns / 1,917 ns |
| 0 0 1 \* \*     |   486 ns / 791 ns | 1,616 ns / 2,167 ns |   7,851 ns / 8,583 ns | 28,618 ns / 31,792 ns | 1,613 ns / 2,125 ns |
| 0 12 31 \* \*   |   579 ns / 667 ns | 1,616 ns / 2,125 ns |  8,089 ns / 11,000 ns | 29,209 ns / 34,667 ns | 1,607 ns / 2,500 ns |
| _/15 _ \* \* \* | 632 ns / 1,083 ns | 3,474 ns / 4,042 ns | 14,742 ns / 16,042 ns | 29,321 ns / 35,875 ns | 1,440 ns / 1,875 ns |
| 0 9 \* \* \*    |   469 ns / 625 ns | 2,497 ns / 3,125 ns | 11,305 ns / 12,166 ns | 29,249 ns / 37,333 ns | 1,600 ns / 2,041 ns |
| 0 9 15 \* 1     |   587 ns / 875 ns | 1,319 ns / 1,792 ns |   7,140 ns / 7,833 ns | 29,119 ns / 35,125 ns | 1,613 ns / 2,459 ns |
| 0 9 \* \* 1-5   | 730 ns / 1,208 ns | 2,507 ns / 3,083 ns | 11,412 ns / 15,209 ns | 29,374 ns / 35,417 ns | 1,573 ns / 1,958 ns |

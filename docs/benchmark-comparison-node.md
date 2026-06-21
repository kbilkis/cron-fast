# Benchmark

> Tested with node v24.16.0, cron-fast v3.3.0, croner v10.0.1, cron-parser v5.5.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by vitest bench (tinybench).

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~929k       | baseline     |
| cron-schedule | ~329k       | 2.8x faster  |
| cron-parser   | ~35k        | 26.3x faster |
| croner        | ~31k        | 30.4x faster |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~24k        | baseline     |
| cron-schedule | ~15k        | 1.6x faster  |
| cron-parser   | ~1k         | 20.7x faster |
| croner        | ~2k         | 10.4x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1003k      | baseline     |
| cron-schedule | ~345k       | 2.9x faster  |
| cron-parser   | ~38k        | 26.5x faster |
| croner        | ~30k        | 32.9x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1732k      | baseline     |
| cron-schedule | ~438k       | 4.0x faster  |
| cron-parser   | ~93k        | 18.7x faster |
| croner        | ~33k        | 52.0x faster |
| cron-validate | ~596k       | 2.9x faster  |

### Parsing

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1653k      | baseline     |
| cron-schedule | ~431k       | 3.8x faster  |
| cron-parser   | ~87k        | 19.1x faster |
| croner        | ~32k        | 52.4x faster |
| cron-validate | ~609k       | 2.7x faster  |

Run benchmarks yourself: `pnpm bench`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case       |    cron-fast | cron-schedule |  cron-parser |       croner |
| --------------- | -----------: | ------------: | -----------: | -----------: |
| \* \* \* \* \*  | ~1361k ±1.0% | ~136k ±0.4% ✓ | ~33k ±0.5% ✓ | ~31k ±1.3% ✓ |
| 0 0 1 \* \*     |  ~954k ±0.3% | ~442k ±0.5% ✓ | ~19k ±0.5% ✓ | ~31k ±0.5% ✓ |
| 0 12 31 \* \*   |  ~843k ±0.4% | ~441k ±0.5% ✓ |  ~8k ±0.5% ✓ | ~30k ±0.5% ✓ |
| _/15 _ \* \* \* |  ~891k ±4.2% | ~249k ±0.5% ✓ | ~58k ±0.4% ✓ | ~32k ±0.6% ✓ |
| 0 9 \* \* \*    | ~1050k ±0.4% | ~322k ±0.4% ✓ | ~44k ±0.6% ✓ | ~30k ±2.7% ✓ |
| 0 9 15 \* 1     |  ~573k ±0.4% | ~426k ±0.4% ✓ | ~39k ±0.5% ✓ | ~30k ±0.9% ✓ |
| 0 9 \* \* 1-5   |  ~829k ±0.4% | ~285k ±0.5% ✓ | ~46k ±0.5% ✓ | ~29k ±1.4% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case       |           cron-fast |        cron-schedule |             cron-parser |                croner |
| --------------- | ------------------: | -------------------: | ----------------------: | --------------------: |
| \* \* \* \* \*  |   735 ns / 1,250 ns | 7,335 ns / 11,000 ns |   30,742 ns / 65,333 ns | 32,529 ns / 68,833 ns |
| 0 0 1 \* \*     | 1,048 ns / 1,500 ns |  2,260 ns / 2,958 ns |   51,329 ns / 90,500 ns | 31,761 ns / 54,167 ns |
| 0 12 31 \* \*   | 1,186 ns / 1,625 ns |  2,269 ns / 2,917 ns | 127,389 ns / 203,500 ns | 33,692 ns / 56,375 ns |
| _/15 _ \* \* \* | 1,123 ns / 2,292 ns |  4,013 ns / 5,584 ns |   17,232 ns / 28,834 ns | 30,838 ns / 56,458 ns |
| 0 9 \* \* \*    |   953 ns / 1,334 ns |  3,105 ns / 3,958 ns |   22,749 ns / 44,083 ns | 32,892 ns / 64,250 ns |
| 0 9 15 \* 1     | 1,744 ns / 2,291 ns |  2,348 ns / 3,000 ns |   25,393 ns / 52,917 ns | 33,530 ns / 63,500 ns |
| 0 9 \* \* 1-5   | 1,207 ns / 1,750 ns |  3,513 ns / 4,334 ns |   21,887 ns / 36,667 ns | 34,514 ns / 65,542 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case      |  cron-fast | cron-schedule | cron-parser |      croner |
| -------------- | ---------: | ------------: | ----------: | ----------: |
| \* \* \* \* \* | ~34k ±1.4% |  ~20k ±0.4% ✓ | ~2k ±0.7% ✓ | ~4k ±0.4% ✓ |
| 0 9 \* \* 1-5  | ~14k ±0.3% |  ~10k ±1.1% ✓ | ~0k ±0.9% ✓ | ~1k ±0.5% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case      |              cron-fast |           cron-schedule |                 cron-parser |                      croner |
| -------------- | ---------------------: | ----------------------: | --------------------------: | --------------------------: |
| \* \* \* \* \* |  29,442 ns / 50,833 ns |   50,109 ns / 78,083 ns |     549,356 ns / 794,625 ns |     274,185 ns / 405,584 ns |
| 0 9 \* \* 1-5  | 73,025 ns / 107,209 ns | 101,531 ns / 139,292 ns | 2,086,915 ns / 2,628,375 ns | 1,048,070 ns / 1,269,834 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case       |    cron-fast | cron-schedule |  cron-parser |       croner |
| --------------- | -----------: | ------------: | -----------: | -----------: |
| \* \* \* \* \*  | ~1317k ±0.9% | ~129k ±0.4% ✓ | ~34k ±0.5% ✓ | ~32k ±1.2% ✓ |
| 0 0 1 \* \*     | ~1050k ±0.2% | ~480k ±0.5% ✓ |  ~9k ±0.5% ✓ | ~31k ±0.5% ✓ |
| 0 12 31 \* \*   |  ~824k ±0.4% | ~415k ±0.3% ✓ |  ~8k ±0.6% ✓ | ~29k ±1.7% ✓ |
| _/15 _ \* \* \* |  ~925k ±0.5% | ~248k ±0.5% ✓ | ~55k ±0.5% ✓ | ~30k ±2.7% ✓ |
| 0 9 \* \* \*    | ~1079k ±0.2% | ~331k ±0.5% ✓ | ~47k ±0.5% ✓ | ~31k ±0.6% ✓ |
| 0 9 15 \* 1     |  ~978k ±1.2% | ~501k ±0.4% ✓ | ~63k ±0.4% ✓ | ~31k ±0.8% ✓ |
| 0 9 \* \* 1-5   |  ~845k ±0.5% | ~309k ±0.5% ✓ | ~49k ±0.5% ✓ | ~29k ±2.2% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case       |           cron-fast |        cron-schedule |             cron-parser |                croner |
| --------------- | ------------------: | -------------------: | ----------------------: | --------------------: |
| \* \* \* \* \*  |   759 ns / 1,291 ns | 7,724 ns / 13,750 ns |   29,808 ns / 59,250 ns | 31,459 ns / 62,750 ns |
| 0 0 1 \* \*     |   952 ns / 1,375 ns |  2,083 ns / 2,792 ns | 113,272 ns / 188,584 ns | 32,729 ns / 56,417 ns |
| 0 12 31 \* \*   | 1,214 ns / 1,667 ns |  2,409 ns / 3,125 ns | 121,267 ns / 202,250 ns | 34,018 ns / 71,625 ns |
| _/15 _ \* \* \* | 1,081 ns / 1,625 ns |  4,038 ns / 5,167 ns |   18,270 ns / 33,459 ns | 33,219 ns / 74,875 ns |
| 0 9 \* \* \*    |   927 ns / 1,375 ns |  3,024 ns / 3,792 ns |   21,370 ns / 42,583 ns | 31,934 ns / 58,083 ns |
| 0 9 15 \* 1     | 1,022 ns / 1,458 ns |  1,997 ns / 2,625 ns |   15,780 ns / 26,583 ns | 32,005 ns / 49,083 ns |
| 0 9 \* \* 1-5   | 1,184 ns / 1,750 ns |  3,234 ns / 4,167 ns |   20,214 ns / 36,334 ns | 34,565 ns / 65,500 ns |

### Validation - Throughput (ops/sec)

| Test Case       |    cron-fast | cron-schedule |   cron-parser |       croner | cron-validate |
| --------------- | -----------: | ------------: | ------------: | -----------: | ------------: |
| \* \* \* \* \*  | ~1929k ±1.1% | ~146k ±0.5% ✓ |  ~42k ±0.6% ✓ | ~34k ±0.5% ✓ | ~587k ±1.0% ✓ |
| 0 0 1 \* \*     | ~1930k ±0.5% | ~590k ±0.5% ✓ | ~117k ±0.9% ✓ | ~33k ±0.6% ✓ | ~564k ±3.7% ✓ |
| 0 12 31 \* \*   | ~1650k ±0.3% | ~558k ±0.7% ✓ | ~119k ±0.5% ✓ | ~32k ±0.7% ✓ | ~620k ±0.4% ✓ |
| _/15 _ \* \* \* | ~1518k ±0.6% | ~274k ±0.4% ✓ |  ~65k ±0.5% ✓ | ~33k ±0.5% ✓ | ~641k ±1.7% ✓ |
| 0 9 \* \* \*    | ~2105k ±0.2% | ~387k ±0.5% ✓ |  ~85k ±0.4% ✓ | ~34k ±0.5% ✓ | ~555k ±2.6% ✓ |
| 0 9 15 \* 1     | ~1672k ±0.5% | ~724k ±0.5% ✓ | ~135k ±0.5% ✓ | ~33k ±0.6% ✓ | ~625k ±0.4% ✓ |
| 0 9 \* \* 1-5   | ~1322k ±0.6% | ~386k ±0.5% ✓ |  ~88k ±0.4% ✓ | ~33k ±0.5% ✓ | ~578k ±3.1% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case       |         cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| --------------- | ----------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| \* \* \* \* \*  | 518 ns / 1,125 ns | 6,856 ns / 7,958 ns | 23,907 ns / 48,625 ns | 29,271 ns / 46,916 ns | 1,703 ns / 2,333 ns |
| 0 0 1 \* \*     |   518 ns / 917 ns | 1,695 ns / 2,375 ns |  8,549 ns / 11,334 ns | 29,862 ns / 47,291 ns | 1,773 ns / 2,916 ns |
| 0 12 31 \* \*   |   606 ns / 750 ns | 1,791 ns / 2,666 ns |  8,439 ns / 10,375 ns | 31,082 ns / 54,292 ns | 1,614 ns / 2,166 ns |
| _/15 _ \* \* \* | 659 ns / 1,208 ns | 3,651 ns / 4,417 ns | 15,503 ns / 22,459 ns | 29,971 ns / 47,250 ns | 1,559 ns / 2,167 ns |
| 0 9 \* \* \*    |   475 ns / 667 ns | 2,581 ns / 3,375 ns | 11,743 ns / 21,875 ns | 29,686 ns / 48,875 ns | 1,802 ns / 2,708 ns |
| 0 9 15 \* 1     | 598 ns / 1,000 ns | 1,381 ns / 1,917 ns |  7,403 ns / 11,833 ns | 29,917 ns / 52,958 ns | 1,601 ns / 2,084 ns |
| 0 9 \* \* 1-5   | 757 ns / 1,291 ns | 2,590 ns / 3,375 ns | 11,424 ns / 19,000 ns | 30,193 ns / 52,416 ns | 1,731 ns / 2,625 ns |

### Parsing - Throughput (ops/sec)

| Test Case       |    cron-fast | cron-schedule |   cron-parser |       croner | cron-validate |
| --------------- | -----------: | ------------: | ------------: | -----------: | ------------: |
| \* \* \* \* \*  | ~1697k ±4.8% | ~140k ±0.5% ✓ |  ~39k ±0.8% ✓ | ~32k ±0.9% ✓ | ~573k ±1.0% ✓ |
| 0 0 1 \* \*     | ~1918k ±0.5% | ~558k ±0.6% ✓ | ~112k ±0.7% ✓ | ~31k ±0.8% ✓ | ~604k ±2.6% ✓ |
| 0 12 31 \* \*   | ~1578k ±0.3% | ~574k ±0.6% ✓ | ~93k ±10.0% ✓ | ~26k ±2.7% ✓ | ~599k ±0.5% ✓ |
| _/15 _ \* \* \* | ~1495k ±0.6% | ~273k ±0.5% ✓ |  ~64k ±0.5% ✓ | ~33k ±0.6% ✓ | ~627k ±2.9% ✓ |
| 0 9 \* \* \*    | ~1991k ±0.3% | ~380k ±0.6% ✓ |  ~83k ±0.5% ✓ | ~33k ±0.6% ✓ | ~632k ±0.4% ✓ |
| 0 9 15 \* 1     | ~1608k ±0.6% | ~712k ±0.5% ✓ | ~131k ±0.5% ✓ | ~33k ±0.6% ✓ | ~624k ±1.6% ✓ |
| 0 9 \* \* 1-5   | ~1282k ±1.0% | ~381k ±0.5% ✓ |  ~85k ±0.5% ✓ | ~33k ±0.6% ✓ | ~606k ±0.8% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case       |         cron-fast |        cron-schedule |           cron-parser |                 croner |       cron-validate |
| --------------- | ----------------: | -------------------: | --------------------: | ---------------------: | ------------------: |
| \* \* \* \* \*  | 589 ns / 1,500 ns | 7,126 ns / 14,792 ns | 25,469 ns / 85,375 ns | 31,636 ns / 101,917 ns | 1,744 ns / 3,250 ns |
| 0 0 1 \* \*     | 521 ns / 1,000 ns |  1,791 ns / 2,625 ns |  8,945 ns / 19,208 ns |  32,353 ns / 95,667 ns | 1,657 ns / 2,792 ns |
| 0 12 31 \* \*   |   634 ns / 833 ns |  1,743 ns / 2,541 ns | 10,737 ns / 48,709 ns | 37,963 ns / 195,750 ns | 1,669 ns / 2,334 ns |
| _/15 _ \* \* \* | 669 ns / 1,250 ns |  3,663 ns / 4,958 ns | 15,562 ns / 25,000 ns |  30,209 ns / 53,916 ns | 1,595 ns / 2,458 ns |
| 0 9 \* \* \*    |   502 ns / 792 ns |  2,629 ns / 3,583 ns | 12,091 ns / 21,500 ns |  30,155 ns / 57,292 ns | 1,582 ns / 2,208 ns |
| 0 9 15 \* 1     | 622 ns / 1,083 ns |  1,404 ns / 2,083 ns |  7,662 ns / 13,833 ns |  30,362 ns / 57,166 ns | 1,603 ns / 2,292 ns |
| 0 9 \* \* 1-5   | 780 ns / 1,416 ns |  2,623 ns / 3,459 ns | 11,723 ns / 19,834 ns |  30,649 ns / 54,833 ns | 1,651 ns / 2,292 ns |

# Benchmark

> Tested with node v24.16.0, cron-fast v3.4.0, croner v10.0.1, cron-parser v5.6.1, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by vitest bench (tinybench).

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1179k      | baseline     |
| cron-schedule | ~331k       | 3.6x faster  |
| cron-parser   | ~36k        | 32.3x faster |
| croner        | ~31k        | 38.2x faster |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~25k        | baseline     |
| cron-schedule | ~15k        | 1.6x faster  |
| cron-parser   | ~1k         | 21.4x faster |
| croner        | ~2k         | 10.8x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1296k      | baseline     |
| cron-schedule | ~346k       | 3.7x faster  |
| cron-parser   | ~39k        | 33.2x faster |
| croner        | ~31k        | 41.8x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2912k      | baseline     |
| cron-schedule | ~454k       | 6.4x faster  |
| cron-parser   | ~95k        | 30.6x faster |
| croner        | ~34k        | 86.6x faster |
| cron-validate | ~620k       | 4.7x faster  |

### Parsing

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2922k      | baseline     |
| cron-schedule | ~449k       | 6.5x faster  |
| cron-parser   | ~96k        | 30.4x faster |
| croner        | ~34k        | 86.3x faster |
| cron-validate | ~640k       | 4.6x faster  |

Run benchmarks yourself: `pnpm bench`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case       |    cron-fast | cron-schedule |  cron-parser |       croner |
| --------------- | -----------: | ------------: | -----------: | -----------: |
| \* \* \* \* \*  | ~1580k ±1.5% | ~139k ±0.4% ✓ | ~34k ±0.4% ✓ | ~32k ±0.5% ✓ |
| 0 0 1 \* \*     | ~1197k ±0.4% | ~448k ±0.5% ✓ | ~19k ±0.5% ✓ | ~31k ±0.5% ✓ |
| 0 12 31 \* \*   | ~1162k ±0.4% | ~441k ±0.5% ✓ |  ~8k ±0.5% ✓ | ~30k ±0.4% ✓ |
| _/15 _ \* \* \* | ~1215k ±0.5% | ~252k ±0.4% ✓ | ~60k ±0.4% ✓ | ~32k ±2.1% ✓ |
| 0 9 \* \* \*    | ~1303k ±0.4% | ~325k ±0.4% ✓ | ~46k ±0.4% ✓ | ~32k ±0.4% ✓ |
| 0 9 15 \* 1     |  ~695k ±0.4% | ~428k ±0.4% ✓ | ~41k ±0.4% ✓ | ~30k ±1.2% ✓ |
| 0 9 \* \* 1-5   | ~1104k ±0.5% | ~286k ±0.4% ✓ | ~46k ±0.4% ✓ | ~29k ±0.9% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case       |           cron-fast |        cron-schedule |             cron-parser |                croner |
| --------------- | ------------------: | -------------------: | ----------------------: | --------------------: |
| \* \* \* \* \*  |   633 ns / 1,083 ns | 7,200 ns / 10,083 ns |   29,214 ns / 52,542 ns | 31,214 ns / 47,084 ns |
| 0 0 1 \* \*     |   835 ns / 1,250 ns |  2,230 ns / 2,875 ns |   51,312 ns / 94,333 ns | 32,345 ns / 53,208 ns |
| 0 12 31 \* \*   |   860 ns / 1,291 ns |  2,265 ns / 2,959 ns | 124,973 ns / 169,334 ns | 33,396 ns / 45,625 ns |
| _/15 _ \* \* \* |   823 ns / 1,291 ns |  3,960 ns / 6,083 ns |   16,609 ns / 24,333 ns | 30,954 ns / 47,000 ns |
| 0 9 \* \* \*    |   767 ns / 1,125 ns |  3,072 ns / 3,834 ns |   21,766 ns / 34,958 ns | 31,729 ns / 48,959 ns |
| 0 9 15 \* 1     | 1,439 ns / 1,917 ns |  2,338 ns / 3,042 ns |   24,352 ns / 36,583 ns | 32,951 ns / 44,875 ns |
| 0 9 \* \* 1-5   |   906 ns / 1,458 ns |  3,498 ns / 4,750 ns |   21,554 ns / 37,125 ns | 34,192 ns / 56,042 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case      |  cron-fast | cron-schedule | cron-parser |      croner |
| -------------- | ---------: | ------------: | ----------: | ----------: |
| \* \* \* \* \* | ~35k ±0.5% |  ~20k ±0.4% ✓ | ~2k ±0.8% ✓ | ~4k ±0.4% ✓ |
| 0 9 \* \* 1-5  | ~14k ±0.3% |  ~10k ±0.3% ✓ | ~0k ±0.6% ✓ | ~1k ±0.4% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case      |              cron-fast |          cron-schedule |                 cron-parser |                      croner |
| -------------- | ---------------------: | ---------------------: | --------------------------: | --------------------------: |
| \* \* \* \* \* |  28,581 ns / 48,583 ns |  49,936 ns / 79,458 ns |     552,761 ns / 791,959 ns |     276,748 ns / 379,167 ns |
| 0 9 \* \* 1-5  | 69,674 ns / 100,000 ns | 99,008 ns / 134,167 ns | 2,007,978 ns / 2,227,875 ns | 1,031,775 ns / 1,190,750 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case       |    cron-fast | cron-schedule |  cron-parser |       croner |
| --------------- | -----------: | ------------: | -----------: | -----------: |
| \* \* \* \* \*  | ~1520k ±1.6% | ~133k ±0.4% ✓ | ~35k ±0.5% ✓ | ~32k ±0.5% ✓ |
| 0 0 1 \* \*     | ~1361k ±0.2% | ~473k ±0.5% ✓ |  ~9k ±0.7% ✓ | ~31k ±0.5% ✓ |
| 0 12 31 \* \*   | ~1119k ±0.4% | ~420k ±0.3% ✓ |  ~8k ±1.3% ✓ | ~30k ±1.4% ✓ |
| _/15 _ \* \* \* | ~1162k ±0.5% | ~249k ±0.5% ✓ | ~56k ±0.5% ✓ | ~31k ±2.8% ✓ |
| 0 9 \* \* \*    | ~1329k ±0.5% | ~333k ±0.4% ✓ | ~49k ±0.4% ✓ | ~32k ±1.0% ✓ |
| 0 9 15 \* 1     | ~1397k ±2.5% | ~501k ±0.4% ✓ | ~65k ±0.9% ✓ | ~32k ±0.8% ✓ |
| 0 9 \* \* 1-5   | ~1184k ±0.5% | ~314k ±0.4% ✓ | ~51k ±0.4% ✓ | ~30k ±0.5% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case       |         cron-fast |        cron-schedule |             cron-parser |                croner |
| --------------- | ----------------: | -------------------: | ----------------------: | --------------------: |
| \* \* \* \* \*  | 658 ns / 1,166 ns | 7,544 ns / 10,333 ns |   28,752 ns / 48,000 ns | 30,844 ns / 48,917 ns |
| 0 0 1 \* \*     |   735 ns / 959 ns |  2,113 ns / 2,792 ns | 112,873 ns / 189,292 ns | 32,258 ns / 46,042 ns |
| 0 12 31 \* \*   | 894 ns / 1,333 ns |  2,384 ns / 3,042 ns | 119,908 ns / 225,792 ns | 33,384 ns / 52,417 ns |
| _/15 _ \* \* \* | 861 ns / 1,333 ns |  4,014 ns / 6,292 ns |   17,912 ns / 30,042 ns | 32,649 ns / 63,041 ns |
| 0 9 \* \* \*    | 753 ns / 1,167 ns |  3,004 ns / 3,833 ns |   20,263 ns / 26,334 ns | 31,692 ns / 43,417 ns |
| 0 9 15 \* 1     | 716 ns / 1,209 ns |  1,996 ns / 2,625 ns |   15,415 ns / 25,792 ns | 31,729 ns / 44,458 ns |
| 0 9 \* \* 1-5   | 845 ns / 1,375 ns |  3,187 ns / 4,125 ns |   19,443 ns / 30,917 ns | 33,576 ns / 52,833 ns |

### Validation - Throughput (ops/sec)

| Test Case       |    cron-fast | cron-schedule |   cron-parser |       croner | cron-validate |
| --------------- | -----------: | ------------: | ------------: | -----------: | ------------: |
| \* \* \* \* \*  | ~2191k ±3.5% | ~150k ±0.4% ✓ |  ~44k ±0.4% ✓ | ~34k ±0.5% ✓ | ~593k ±1.0% ✓ |
| 0 0 1 \* \*     | ~3458k ±0.5% | ~611k ±0.5% ✓ | ~123k ±0.4% ✓ | ~35k ±0.4% ✓ | ~657k ±0.4% ✓ |
| 0 12 31 \* \*   | ~3406k ±0.6% | ~614k ±0.5% ✓ | ~125k ±0.4% ✓ | ~33k ±0.5% ✓ | ~599k ±0.3% ✓ |
| _/15 _ \* \* \* | ~2448k ±0.1% | ~279k ±0.5% ✓ |  ~58k ±5.7% ✓ | ~33k ±0.5% ✓ | ~673k ±2.6% ✓ |
| 0 9 \* \* \*    | ~3200k ±0.6% | ~394k ±0.5% ✓ |  ~86k ±0.4% ✓ | ~34k ±0.5% ✓ | ~622k ±0.4% ✓ |
| 0 9 15 \* 1     | ~3420k ±0.6% | ~734k ±0.5% ✓ | ~140k ±0.4% ✓ | ~33k ±0.5% ✓ | ~630k ±0.4% ✓ |
| 0 9 \* \* 1-5   | ~2262k ±0.6% | ~394k ±0.4% ✓ |  ~89k ±0.4% ✓ | ~33k ±0.5% ✓ | ~571k ±2.6% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case       |         cron-fast |        cron-schedule |           cron-parser |                croner |       cron-validate |
| --------------- | ----------------: | -------------------: | --------------------: | --------------------: | ------------------: |
| \* \* \* \* \*  | 456 ns / 1,125 ns | 6,679 ns / 10,666 ns | 22,500 ns / 39,125 ns | 29,202 ns / 44,208 ns | 1,687 ns / 2,334 ns |
| 0 0 1 \* \*     |   289 ns / 541 ns |  1,636 ns / 2,250 ns |  8,143 ns / 12,375 ns | 28,732 ns / 36,084 ns | 1,523 ns / 2,000 ns |
| 0 12 31 \* \*   |   294 ns / 542 ns |  1,629 ns / 2,125 ns |  8,001 ns / 10,000 ns | 30,092 ns / 48,167 ns | 1,671 ns / 2,167 ns |
| _/15 _ \* \* \* |   409 ns / 625 ns |  3,583 ns / 4,500 ns | 17,099 ns / 31,625 ns | 30,041 ns / 48,500 ns | 1,486 ns / 1,958 ns |
| 0 9 \* \* \*    |   313 ns / 625 ns |  2,538 ns / 3,209 ns | 11,575 ns / 17,625 ns | 29,715 ns / 45,459 ns | 1,609 ns / 2,083 ns |
| 0 9 15 \* 1     |   292 ns / 708 ns |  1,363 ns / 1,875 ns |   7,145 ns / 8,917 ns | 29,994 ns / 46,542 ns | 1,588 ns / 2,042 ns |
| 0 9 \* \* 1-5   |   442 ns / 916 ns |  2,541 ns / 3,209 ns | 11,202 ns / 14,750 ns | 30,420 ns / 50,167 ns | 1,752 ns / 2,208 ns |

### Parsing - Throughput (ops/sec)

| Test Case       |    cron-fast | cron-schedule |   cron-parser |       croner | cron-validate |
| --------------- | -----------: | ------------: | ------------: | -----------: | ------------: |
| \* \* \* \* \*  | ~2400k ±0.7% | ~154k ±0.4% ✓ |  ~45k ±0.4% ✓ | ~35k ±0.4% ✓ | ~614k ±0.3% ✓ |
| 0 0 1 \* \*     | ~3440k ±0.5% | ~613k ±0.5% ✓ | ~126k ±0.4% ✓ | ~34k ±0.5% ✓ | ~660k ±0.3% ✓ |
| 0 12 31 \* \*   | ~3397k ±0.6% | ~596k ±0.6% ✓ | ~124k ±0.4% ✓ | ~34k ±0.5% ✓ | ~636k ±0.4% ✓ |
| _/15 _ \* \* \* | ~2398k ±0.2% | ~282k ±0.5% ✓ |  ~66k ±0.4% ✓ | ~33k ±0.5% ✓ | ~666k ±2.6% ✓ |
| 0 9 \* \* \*    | ~3198k ±0.6% | ~387k ±0.5% ✓ |  ~86k ±0.4% ✓ | ~34k ±0.4% ✓ | ~654k ±0.4% ✓ |
| 0 9 15 \* 1     | ~3339k ±1.2% | ~723k ±0.5% ✓ | ~136k ±0.4% ✓ | ~34k ±0.5% ✓ | ~665k ±0.4% ✓ |
| 0 9 \* \* 1-5   | ~2278k ±0.5% | ~391k ±0.5% ✓ |  ~89k ±0.4% ✓ | ~33k ±0.4% ✓ | ~584k ±4.3% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case       |       cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| --------------- | --------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| \* \* \* \* \*  | 417 ns / 917 ns | 6,515 ns / 9,375 ns | 22,402 ns / 35,375 ns | 28,751 ns / 40,542 ns | 1,628 ns / 2,125 ns |
| 0 0 1 \* \*     | 291 ns / 541 ns | 1,632 ns / 2,208 ns |  7,959 ns / 10,375 ns | 29,287 ns / 38,250 ns | 1,516 ns / 1,959 ns |
| 0 12 31 \* \*   | 294 ns / 583 ns | 1,678 ns / 2,292 ns |  8,033 ns / 10,417 ns | 29,662 ns / 40,208 ns | 1,572 ns / 2,083 ns |
| _/15 _ \* \* \* | 417 ns / 708 ns | 3,551 ns / 5,833 ns | 15,080 ns / 24,167 ns | 30,193 ns / 45,292 ns | 1,501 ns / 2,000 ns |
| 0 9 \* \* \*    | 313 ns / 667 ns | 2,585 ns / 3,375 ns | 11,653 ns / 15,333 ns | 29,390 ns / 39,208 ns | 1,530 ns / 2,000 ns |
| 0 9 15 \* 1     | 300 ns / 750 ns | 1,383 ns / 1,917 ns |  7,346 ns / 10,416 ns | 29,710 ns / 39,834 ns | 1,503 ns / 1,958 ns |
| 0 9 \* \* 1-5   | 439 ns / 875 ns | 2,555 ns / 3,250 ns | 11,277 ns / 15,666 ns | 29,913 ns / 41,500 ns | 1,711 ns / 3,000 ns |

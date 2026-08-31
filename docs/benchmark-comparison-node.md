# Benchmark

> Tested with node v24.19.0, cron-fast v3.10.0, croner v10.0.1, cron-parser v5.10.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by vitest bench (tinybench).

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2328k      | baseline     |
| cron-schedule | ~342k       | 6.8x faster  |
| cron-parser   | ~36k        | 64.7x faster |
| croner        | ~32k        | 72.9x faster |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~44k        | baseline     |
| cron-schedule | ~16k        | 2.8x faster  |
| cron-parser   | ~1k         | 35.7x faster |
| croner        | ~2k         | 18.3x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2433k      | baseline     |
| cron-schedule | ~361k       | 6.7x faster  |
| cron-parser   | ~40k        | 60.7x faster |
| croner        | ~32k        | 76.1x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~7085k      | baseline      |
| cron-schedule | ~470k       | 15.1x faster  |
| cron-parser   | ~97k        | 72.8x faster  |
| croner        | ~35k        | 201.8x faster |
| cron-validate | ~657k       | 10.8x faster  |

### Validation Varied Inputs

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~6172k      | baseline      |
| cron-schedule | ~490k       | 12.6x faster  |
| cron-parser   | ~119k       | 51.8x faster  |
| croner        | ~36k        | 171.7x faster |
| cron-validate | ~625k       | 9.9x faster   |

### Parsing

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~7047k      | baseline      |
| cron-schedule | ~470k       | 15.0x faster  |
| cron-parser   | ~98k        | 71.9x faster  |
| croner        | ~35k        | 200.5x faster |
| cron-validate | ~653k       | 10.8x faster  |

Run benchmarks yourself: `pnpm bench`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case    |    cron-fast | cron-schedule |  cron-parser |       croner |
| ------------ | -----------: | ------------: | -----------: | -----------: |
| * * * * *    | ~3663k ±0.4% | ~141k ±0.4% ✓ | ~34k ±0.4% ✓ | ~33k ±0.9% ✓ |
| 0 0 1 * *    | ~2351k ±0.1% | ~463k ±0.4% ✓ | ~20k ±0.4% ✓ | ~33k ±0.8% ✓ |
| 0 12 31 * *  | ~2227k ±0.2% | ~457k ±0.5% ✓ |  ~8k ±0.5% ✓ | ~30k ±3.2% ✓ |
| */15 * * * * | ~2381k ±0.4% | ~260k ±0.5% ✓ | ~58k ±0.4% ✓ | ~33k ±0.5% ✓ |
| 0 9 * * *    | ~2292k ±0.3% | ~333k ±0.3% ✓ | ~45k ±0.4% ✓ | ~33k ±1.5% ✓ |
| 0 9 15 * 1   | ~1483k ±0.3% | ~440k ±0.4% ✓ | ~41k ±0.4% ✓ | ~31k ±0.4% ✓ |
| 0 9 * * 1-5  | ~1899k ±0.3% | ~297k ±0.3% ✓ | ~47k ±0.3% ✓ | ~31k ±1.1% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |             cron-parser |                croner |
| ------------ | --------------: | ------------------: | ----------------------: | --------------------: |
| * * * * *    | 273 ns / 333 ns | 7,078 ns / 8,000 ns |   29,715 ns / 38,083 ns | 30,425 ns / 40,875 ns |
| 0 0 1 * *    | 425 ns / 541 ns | 2,161 ns / 2,708 ns |   49,986 ns / 60,000 ns | 30,121 ns / 35,708 ns |
| 0 12 31 * *  | 449 ns / 542 ns | 2,188 ns / 2,709 ns | 125,129 ns / 156,459 ns | 33,716 ns / 63,166 ns |
| */15 * * * * | 420 ns / 500 ns | 3,839 ns / 4,417 ns |   17,225 ns / 20,125 ns | 30,162 ns / 36,125 ns |
| 0 9 * * *    | 436 ns / 500 ns | 3,006 ns / 3,584 ns |   22,253 ns / 35,000 ns | 30,073 ns / 43,917 ns |
| 0 9 15 * 1   | 674 ns / 792 ns | 2,275 ns / 2,792 ns |   24,662 ns / 32,334 ns | 32,388 ns / 48,375 ns |
| 0 9 * * 1-5  | 526 ns / 666 ns | 3,366 ns / 3,916 ns |   21,445 ns / 24,958 ns | 32,755 ns / 39,125 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case   |  cron-fast | cron-schedule | cron-parser |      croner |
| ----------- | ---------: | ------------: | ----------: | ----------: |
| * * * * *   | ~64k ±0.2% |  ~21k ±0.2% ✓ | ~2k ±0.5% ✓ | ~4k ±0.2% ✓ |
| 0 9 * * 1-5 | ~24k ±0.2% |  ~10k ±0.2% ✓ | ~1k ±0.5% ✓ | ~1k ±0.3% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case   |             cron-fast |          cron-schedule |                 cron-parser |                    croner |
| ----------- | --------------------: | ---------------------: | --------------------------: | ------------------------: |
| * * * * *   | 15,557 ns / 17,292 ns |  47,624 ns / 55,250 ns |     512,215 ns / 658,500 ns |   261,112 ns / 328,584 ns |
| 0 9 * * 1-5 | 41,784 ns / 46,458 ns | 95,433 ns / 108,959 ns | 1,931,498 ns / 2,115,625 ns | 999,020 ns / 1,121,375 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case    |    cron-fast | cron-schedule |  cron-parser |       croner |
| ------------ | -----------: | ------------: | -----------: | -----------: |
| * * * * *    | ~3531k ±0.8% | ~136k ±0.4% ✓ | ~35k ±0.4% ✓ | ~33k ±1.7% ✓ |
| 0 0 1 * *    | ~2442k ±0.2% | ~504k ±0.5% ✓ |  ~9k ±0.5% ✓ | ~31k ±0.6% ✓ |
| 0 12 31 * *  | ~2116k ±0.2% | ~432k ±0.2% ✓ |  ~9k ±0.5% ✓ | ~32k ±1.3% ✓ |
| */15 * * * * | ~2329k ±0.3% | ~261k ±0.4% ✓ | ~58k ±0.3% ✓ | ~33k ±1.1% ✓ |
| 0 9 * * *    | ~2380k ±0.3% | ~343k ±0.5% ✓ | ~50k ±0.5% ✓ | ~31k ±2.9% ✓ |
| 0 9 15 * 1   | ~2234k ±0.3% | ~523k ±0.5% ✓ | ~67k ±0.5% ✓ | ~32k ±0.4% ✓ |
| 0 9 * * 1-5  | ~2000k ±0.4% | ~330k ±0.3% ✓ | ~53k ±0.3% ✓ | ~32k ±1.5% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case    |       cron-fast |        cron-schedule |             cron-parser |                croner |
| ------------ | --------------: | -------------------: | ----------------------: | --------------------: |
| * * * * *    | 283 ns / 334 ns | 7,357 ns / 11,667 ns |   28,562 ns / 39,709 ns | 30,243 ns / 57,375 ns |
| 0 0 1 * *    | 409 ns / 500 ns |  1,984 ns / 2,500 ns | 108,524 ns / 163,042 ns | 32,371 ns / 47,542 ns |
| 0 12 31 * *  | 473 ns / 583 ns |  2,313 ns / 2,875 ns | 116,202 ns / 186,875 ns | 31,712 ns / 45,291 ns |
| */15 * * * * | 429 ns / 541 ns |  3,830 ns / 4,417 ns |   17,305 ns / 19,875 ns | 30,163 ns / 36,333 ns |
| 0 9 * * *    | 420 ns / 500 ns |  2,912 ns / 3,542 ns |   20,018 ns / 23,333 ns | 31,932 ns / 56,792 ns |
| 0 9 15 * 1   | 448 ns / 583 ns |  1,912 ns / 2,375 ns |   14,899 ns / 19,416 ns | 30,794 ns / 42,833 ns |
| 0 9 * * 1-5  | 500 ns / 625 ns |  3,032 ns / 3,542 ns |   18,849 ns / 21,542 ns | 31,730 ns / 36,958 ns |

### Validation - Throughput (ops/sec)

| Test Case    |    cron-fast | cron-schedule |   cron-parser |       croner | cron-validate |
| ------------ | -----------: | ------------: | ------------: | -----------: | ------------: |
| * * * * *    | ~9420k ±0.1% | ~160k ±0.4% ✓ |  ~45k ±0.4% ✓ | ~35k ±0.5% ✓ | ~596k ±3.4% ✓ |
| 0 0 1 * *    | ~7575k ±0.1% | ~637k ±0.5% ✓ | ~125k ±0.3% ✓ | ~35k ±0.3% ✓ | ~683k ±0.4% ✓ |
| 0 12 31 * *  | ~6545k ±0.1% | ~632k ±0.5% ✓ | ~125k ±0.4% ✓ | ~35k ±0.4% ✓ | ~666k ±0.4% ✓ |
| */15 * * * * | ~7044k ±0.5% | ~293k ±0.4% ✓ |  ~69k ±0.3% ✓ | ~35k ±0.3% ✓ | ~698k ±0.4% ✓ |
| 0 9 * * *    | ~7925k ±0.3% | ~404k ±0.5% ✓ |  ~88k ±0.4% ✓ | ~36k ±0.3% ✓ | ~647k ±0.4% ✓ |
| 0 9 15 * 1   | ~5902k ±0.1% | ~756k ±0.4% ✓ | ~140k ±0.4% ✓ | ~35k ±0.3% ✓ | ~666k ±0.4% ✓ |
| 0 9 * * 1-5  | ~5184k ±0.4% | ~407k ±0.5% ✓ |  ~90k ±0.4% ✓ | ~35k ±0.3% ✓ | ~644k ±0.3% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| * * * * *    | 106 ns / 125 ns | 6,258 ns / 7,125 ns | 22,268 ns / 27,834 ns | 28,862 ns / 40,666 ns | 1,679 ns / 3,208 ns |
| 0 0 1 * *    | 132 ns / 167 ns | 1,570 ns / 2,000 ns |   7,970 ns / 8,792 ns | 28,228 ns / 34,916 ns | 1,464 ns / 1,792 ns |
| 0 12 31 * *  | 153 ns / 167 ns | 1,582 ns / 2,042 ns |   8,028 ns / 8,792 ns | 28,511 ns / 34,792 ns | 1,502 ns / 1,875 ns |
| */15 * * * * | 142 ns / 167 ns | 3,413 ns / 4,042 ns | 14,583 ns / 15,708 ns | 28,174 ns / 31,125 ns | 1,433 ns / 1,792 ns |
| 0 9 * * *    | 126 ns / 167 ns | 2,475 ns / 3,042 ns | 11,358 ns / 12,584 ns | 28,133 ns / 34,750 ns | 1,545 ns / 1,875 ns |
| 0 9 15 * 1   | 169 ns / 209 ns | 1,322 ns / 1,750 ns |   7,141 ns / 8,166 ns | 28,796 ns / 36,291 ns | 1,501 ns / 1,875 ns |
| 0 9 * * 1-5  | 193 ns / 250 ns | 2,456 ns / 2,959 ns | 11,105 ns / 13,875 ns | 28,656 ns / 33,166 ns | 1,552 ns / 1,917 ns |

### Parsing - Throughput (ops/sec)

| Test Case    |    cron-fast | cron-schedule |   cron-parser |       croner | cron-validate |
| ------------ | -----------: | ------------: | ------------: | -----------: | ------------: |
| * * * * *    | ~9469k ±0.8% | ~159k ±0.4% ✓ |  ~46k ±0.4% ✓ | ~35k ±0.5% ✓ | ~606k ±3.1% ✓ |
| 0 0 1 * *    | ~7544k ±0.1% | ~631k ±0.5% ✓ | ~124k ±0.4% ✓ | ~36k ±0.3% ✓ | ~633k ±0.3% ✓ |
| 0 12 31 * *  | ~6463k ±0.1% | ~633k ±0.5% ✓ | ~125k ±0.4% ✓ | ~35k ±0.4% ✓ | ~671k ±0.4% ✓ |
| */15 * * * * | ~6798k ±0.5% | ~295k ±0.4% ✓ |  ~69k ±0.3% ✓ | ~36k ±0.3% ✓ | ~707k ±0.4% ✓ |
| 0 9 * * *    | ~7864k ±0.3% | ~408k ±0.5% ✓ |  ~88k ±0.4% ✓ | ~35k ±0.4% ✓ | ~652k ±0.4% ✓ |
| 0 9 15 * 1   | ~5962k ±0.2% | ~760k ±0.4% ✓ | ~142k ±0.3% ✓ | ~35k ±0.3% ✓ | ~655k ±0.3% ✓ |
| 0 9 * * 1-5  | ~5226k ±0.4% | ~406k ±0.5% ✓ |  ~92k ±0.4% ✓ | ~34k ±0.5% ✓ | ~646k ±0.3% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| * * * * *    | 106 ns / 125 ns | 6,276 ns / 7,166 ns | 21,945 ns / 28,125 ns | 28,412 ns / 39,416 ns | 1,651 ns / 2,417 ns |
| 0 0 1 * *    | 133 ns / 167 ns | 1,584 ns / 2,042 ns |   8,035 ns / 9,125 ns | 27,927 ns / 31,333 ns | 1,580 ns / 1,958 ns |
| 0 12 31 * *  | 155 ns / 208 ns | 1,580 ns / 2,042 ns |   8,025 ns / 8,833 ns | 28,422 ns / 33,583 ns | 1,489 ns / 1,834 ns |
| */15 * * * * | 147 ns / 167 ns | 3,385 ns / 3,917 ns | 14,433 ns / 16,416 ns | 28,124 ns / 33,000 ns | 1,414 ns / 1,791 ns |
| 0 9 * * *    | 127 ns / 167 ns | 2,453 ns / 3,000 ns | 11,315 ns / 14,000 ns | 28,544 ns / 37,709 ns | 1,535 ns / 1,875 ns |
| 0 9 15 * 1   | 168 ns / 209 ns | 1,316 ns / 1,750 ns |   7,062 ns / 7,750 ns | 28,293 ns / 34,500 ns | 1,527 ns / 1,875 ns |
| 0 9 * * 1-5  | 191 ns / 209 ns | 2,461 ns / 3,000 ns | 10,905 ns / 11,750 ns | 29,499 ns / 35,459 ns | 1,548 ns / 1,917 ns |

### Validation Varied Inputs - Throughput (ops/sec)

| Test Case                  |    cron-fast | cron-schedule |   cron-parser |       croner | cron-validate |
| -------------------------- | -----------: | ------------: | ------------: | -----------: | ------------: |
| varied inputs (anti-cache) | ~6172k ±0.1% | ~490k ±0.5% ✓ | ~119k ±0.4% ✓ | ~36k ±0.4% ✓ | ~625k ±0.3% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation Varied Inputs - Latency (mean / p99)

| Test Case                  |       cron-fast |       cron-schedule |          cron-parser |                croner |       cron-validate |
| -------------------------- | --------------: | ------------------: | -------------------: | --------------------: | ------------------: |
| varied inputs (anti-cache) | 162 ns / 291 ns | 2,040 ns / 2,750 ns | 8,400 ns / 11,166 ns | 27,824 ns / 34,417 ns | 1,599 ns / 1,958 ns |

# Benchmark

> Tested with node v24.19.0, cron-fast v3.6.0, croner v10.0.1, cron-parser v5.10.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by vitest bench (tinybench).

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2017k      | baseline     |
| cron-schedule | ~337k       | 6.0x faster  |
| cron-parser   | ~35k        | 57.3x faster |
| croner        | ~31k        | 64.3x faster |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~37k        | baseline     |
| cron-schedule | ~15k        | 2.4x faster  |
| cron-parser   | ~1k         | 30.2x faster |
| croner        | ~2k         | 15.4x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2137k      | baseline     |
| cron-schedule | ~357k       | 6.0x faster  |
| cron-parser   | ~39k        | 54.3x faster |
| croner        | ~32k        | 67.4x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~4962k      | baseline      |
| cron-schedule | ~460k       | 10.8x faster  |
| cron-parser   | ~96k        | 51.5x faster  |
| croner        | ~35k        | 143.2x faster |
| cron-validate | ~643k       | 7.7x faster   |

### Validation Varied Inputs

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~4463k      | baseline      |
| cron-schedule | ~475k       | 9.4x faster   |
| cron-parser   | ~114k       | 39.1x faster  |
| croner        | ~35k        | 126.4x faster |
| cron-validate | ~616k       | 7.2x faster   |

### Parsing

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~4950k      | baseline      |
| cron-schedule | ~459k       | 10.8x faster  |
| cron-parser   | ~90k        | 54.8x faster  |
| croner        | ~35k        | 142.5x faster |
| cron-validate | ~641k       | 7.7x faster   |

Run benchmarks yourself: `pnpm bench`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case    |    cron-fast | cron-schedule |  cron-parser |       croner |
| ------------ | -----------: | ------------: | -----------: | -----------: |
| * * * * *    | ~3616k ±0.7% | ~140k ±0.4% ✓ | ~33k ±0.4% ✓ | ~32k ±1.1% ✓ |
| 0 0 1 * *    | ~1891k ±0.4% | ~457k ±0.4% ✓ | ~19k ±0.4% ✓ | ~32k ±0.9% ✓ |
| 0 12 31 * *  | ~1884k ±0.4% | ~445k ±0.5% ✓ |  ~8k ±0.5% ✓ | ~29k ±4.1% ✓ |
| */15 * * * * | ~1866k ±0.6% | ~256k ±0.5% ✓ | ~57k ±0.5% ✓ | ~33k ±0.4% ✓ |
| 0 9 * * *    | ~2091k ±0.2% | ~330k ±0.4% ✓ | ~44k ±0.4% ✓ | ~33k ±1.5% ✓ |
| 0 9 15 * 1   | ~1300k ±0.3% | ~442k ±0.4% ✓ | ~40k ±0.4% ✓ | ~31k ±0.3% ✓ |
| 0 9 * * 1-5  | ~1470k ±0.5% | ~291k ±0.4% ✓ | ~46k ±0.4% ✓ | ~29k ±2.8% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case    |         cron-fast |       cron-schedule |             cron-parser |                croner |
| ------------ | ----------------: | ------------------: | ----------------------: | --------------------: |
| * * * * *    |   277 ns / 375 ns | 7,165 ns / 9,500 ns |   30,423 ns / 40,334 ns | 30,942 ns / 41,208 ns |
| 0 0 1 * *    |   529 ns / 709 ns | 2,189 ns / 2,708 ns |   51,601 ns / 77,041 ns | 30,981 ns / 38,541 ns |
| 0 12 31 * *  |   531 ns / 709 ns | 2,247 ns / 2,833 ns | 128,339 ns / 171,250 ns | 34,725 ns / 65,333 ns |
| */15 * * * * |   536 ns / 792 ns | 3,902 ns / 4,625 ns |   17,640 ns / 21,125 ns | 30,050 ns / 36,541 ns |
| 0 9 * * *    |   478 ns / 625 ns | 3,029 ns / 3,666 ns |   22,571 ns / 28,708 ns | 30,303 ns / 39,042 ns |
| 0 9 15 * 1   | 769 ns / 1,125 ns | 2,263 ns / 2,833 ns |   25,217 ns / 30,834 ns | 32,301 ns / 39,792 ns |
| 0 9 * * 1-5  | 680 ns / 1,125 ns | 3,437 ns / 4,083 ns |   21,947 ns / 28,000 ns | 34,427 ns / 56,375 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case   |  cron-fast | cron-schedule | cron-parser |      croner |
| ----------- | ---------: | ------------: | ----------: | ----------: |
| * * * * *   | ~53k ±0.4% |  ~21k ±0.3% ✓ | ~2k ±0.4% ✓ | ~4k ±0.3% ✓ |
| 0 9 * * 1-5 | ~21k ±0.2% |  ~10k ±0.2% ✓ | ~1k ±0.6% ✓ | ~1k ±0.3% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case   |             cron-fast |          cron-schedule |                 cron-parser |                      croner |
| ----------- | --------------------: | ---------------------: | --------------------------: | --------------------------: |
| * * * * *   | 18,761 ns / 25,291 ns |  48,413 ns / 66,791 ns |     509,280 ns / 631,792 ns |     258,673 ns / 344,708 ns |
| 0 9 * * 1-5 | 46,695 ns / 65,292 ns | 97,005 ns / 118,750 ns | 1,944,416 ns / 2,206,334 ns | 1,007,550 ns / 1,132,459 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case    |    cron-fast | cron-schedule |  cron-parser |       croner |
| ------------ | -----------: | ------------: | -----------: | -----------: |
| * * * * *    | ~3631k ±0.7% | ~135k ±0.5% ✓ | ~35k ±0.4% ✓ | ~32k ±2.8% ✓ |
| 0 0 1 * *    | ~2053k ±0.5% | ~498k ±0.5% ✓ |  ~9k ±0.5% ✓ | ~32k ±0.4% ✓ |
| 0 12 31 * *  | ~1895k ±0.5% | ~432k ±0.2% ✓ |  ~9k ±0.6% ✓ | ~30k ±4.1% ✓ |
| */15 * * * * | ~1905k ±0.6% | ~255k ±0.6% ✓ | ~57k ±0.5% ✓ | ~33k ±0.4% ✓ |
| 0 9 * * *    | ~2111k ±0.2% | ~344k ±0.4% ✓ | ~49k ±0.4% ✓ | ~32k ±1.5% ✓ |
| 0 9 15 * 1   | ~1862k ±0.4% | ~512k ±0.4% ✓ | ~65k ±0.4% ✓ | ~32k ±1.0% ✓ |
| 0 9 * * 1-5  | ~1502k ±0.5% | ~322k ±0.3% ✓ | ~52k ±0.4% ✓ | ~31k ±0.4% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case    |         cron-fast |       cron-schedule |             cron-parser |                croner |
| ------------ | ----------------: | ------------------: | ----------------------: | --------------------: |
| * * * * *    |   275 ns / 334 ns | 7,412 ns / 8,334 ns |   28,359 ns / 37,500 ns | 31,428 ns / 56,458 ns |
| 0 0 1 * *    |   487 ns / 667 ns | 2,010 ns / 2,542 ns | 108,473 ns / 149,500 ns | 31,334 ns / 37,916 ns |
| 0 12 31 * *  |   528 ns / 709 ns | 2,315 ns / 2,875 ns | 116,086 ns / 165,291 ns | 33,436 ns / 70,667 ns |
| */15 * * * * |   525 ns / 750 ns | 3,920 ns / 4,625 ns |   17,649 ns / 21,292 ns | 30,014 ns / 37,333 ns |
| 0 9 * * *    |   474 ns / 667 ns | 2,908 ns / 3,583 ns |   20,433 ns / 25,125 ns | 31,119 ns / 41,375 ns |
| 0 9 15 * 1   |   537 ns / 875 ns | 1,951 ns / 2,500 ns |   15,326 ns / 19,500 ns | 31,130 ns / 42,667 ns |
| 0 9 * * 1-5  | 666 ns / 1,125 ns | 3,102 ns / 3,667 ns |   19,380 ns / 23,542 ns | 32,644 ns / 42,834 ns |

### Validation - Throughput (ops/sec)

| Test Case    |    cron-fast | cron-schedule |   cron-parser |       croner | cron-validate |
| ------------ | -----------: | ------------: | ------------: | -----------: | ------------: |
| * * * * *    | ~9104k ±1.7% | ~156k ±0.4% ✓ |  ~44k ±0.4% ✓ | ~35k ±0.5% ✓ | ~616k ±1.8% ✓ |
| 0 0 1 * *    | ~4726k ±0.5% | ~615k ±0.5% ✓ | ~121k ±0.5% ✓ | ~34k ±0.5% ✓ | ~670k ±0.4% ✓ |
| 0 12 31 * *  | ~4595k ±0.6% | ~615k ±0.6% ✓ | ~125k ±0.4% ✓ | ~35k ±0.5% ✓ | ~655k ±0.4% ✓ |
| */15 * * * * | ~4135k ±0.7% | ~285k ±0.5% ✓ |  ~68k ±0.3% ✓ | ~35k ±0.4% ✓ | ~680k ±0.4% ✓ |
| 0 9 * * *    | ~5557k ±0.5% | ~401k ±0.5% ✓ |  ~88k ±0.4% ✓ | ~36k ±0.4% ✓ | ~624k ±0.4% ✓ |
| 0 9 15 * 1   | ~3703k ±0.8% | ~748k ±0.4% ✓ | ~138k ±0.3% ✓ | ~34k ±0.4% ✓ | ~629k ±3.1% ✓ |
| 0 9 * * 1-5  | ~2916k ±0.6% | ~401k ±0.4% ✓ |  ~90k ±0.3% ✓ | ~35k ±0.3% ✓ | ~629k ±0.3% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| * * * * *    | 110 ns / 125 ns | 6,430 ns / 8,917 ns | 22,591 ns / 34,625 ns | 28,982 ns / 46,042 ns | 1,622 ns / 2,083 ns |
| 0 0 1 * *    | 212 ns / 334 ns | 1,625 ns / 2,208 ns |  8,254 ns / 11,666 ns | 29,553 ns / 48,541 ns | 1,493 ns / 1,917 ns |
| 0 12 31 * *  | 218 ns / 334 ns | 1,627 ns / 2,125 ns |   8,017 ns / 9,000 ns | 28,787 ns / 36,958 ns | 1,527 ns / 1,917 ns |
| */15 * * * * | 242 ns / 375 ns | 3,511 ns / 4,500 ns | 14,640 ns / 17,667 ns | 28,536 ns / 35,000 ns | 1,471 ns / 1,917 ns |
| 0 9 * * *    | 180 ns / 291 ns | 2,495 ns / 3,083 ns | 11,404 ns / 14,209 ns | 28,082 ns / 34,125 ns | 1,602 ns / 2,041 ns |
| 0 9 15 * 1   | 270 ns / 625 ns | 1,338 ns / 1,792 ns |   7,228 ns / 8,209 ns | 29,568 ns / 36,833 ns | 1,590 ns / 2,041 ns |
| 0 9 * * 1-5  | 343 ns / 708 ns | 2,494 ns / 3,042 ns | 11,123 ns / 13,833 ns | 28,600 ns / 34,833 ns | 1,591 ns / 2,000 ns |

### Parsing - Throughput (ops/sec)

| Test Case    |    cron-fast | cron-schedule |   cron-parser |       croner | cron-validate |
| ------------ | -----------: | ------------: | ------------: | -----------: | ------------: |
| * * * * *    | ~9222k ±1.1% | ~156k ±0.4% ✓ |  ~45k ±0.4% ✓ | ~35k ±0.4% ✓ | ~624k ±0.4% ✓ |
| 0 0 1 * *    | ~4673k ±0.6% | ~616k ±0.5% ✓ |  ~91k ±4.7% ✓ | ~33k ±0.8% ✓ | ~675k ±0.4% ✓ |
| 0 12 31 * *  | ~4442k ±0.6% | ~620k ±0.5% ✓ | ~120k ±0.4% ✓ | ~35k ±0.4% ✓ | ~643k ±0.4% ✓ |
| */15 * * * * | ~4114k ±0.7% | ~286k ±0.4% ✓ |  ~67k ±0.3% ✓ | ~35k ±0.3% ✓ | ~612k ±0.3% ✓ |
| 0 9 * * *    | ~5595k ±0.4% | ~397k ±0.5% ✓ |  ~86k ±0.3% ✓ | ~35k ±0.4% ✓ | ~635k ±0.3% ✓ |
| 0 9 15 * 1   | ~3768k ±0.7% | ~745k ±0.5% ✓ | ~136k ±0.4% ✓ | ~35k ±0.3% ✓ | ~666k ±0.4% ✓ |
| 0 9 * * 1-5  | ~2840k ±0.7% | ~395k ±0.6% ✓ |  ~87k ±0.4% ✓ | ~34k ±0.4% ✓ | ~630k ±0.4% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| * * * * *    | 108 ns / 125 ns | 6,404 ns / 7,958 ns | 22,360 ns / 32,416 ns | 28,461 ns / 38,250 ns | 1,602 ns / 2,000 ns |
| 0 0 1 * *    | 214 ns / 334 ns | 1,622 ns / 2,166 ns | 10,938 ns / 52,083 ns | 30,639 ns / 61,167 ns | 1,481 ns / 1,875 ns |
| 0 12 31 * *  | 225 ns / 375 ns | 1,614 ns / 2,083 ns |  8,331 ns / 10,292 ns | 28,238 ns / 34,500 ns | 1,555 ns / 1,959 ns |
| */15 * * * * | 243 ns / 375 ns | 3,501 ns / 4,166 ns | 15,026 ns / 18,250 ns | 28,480 ns / 37,125 ns | 1,633 ns / 2,000 ns |
| 0 9 * * *    | 179 ns / 250 ns | 2,516 ns / 3,166 ns | 11,673 ns / 14,583 ns | 28,377 ns / 35,250 ns | 1,574 ns / 1,917 ns |
| 0 9 15 * 1   | 265 ns / 583 ns | 1,343 ns / 1,792 ns |   7,335 ns / 8,833 ns | 28,239 ns / 34,500 ns | 1,501 ns / 1,875 ns |
| 0 9 * * 1-5  | 352 ns / 708 ns | 2,533 ns / 3,167 ns | 11,460 ns / 14,458 ns | 29,164 ns / 36,000 ns | 1,586 ns / 2,000 ns |

### Validation Varied Inputs - Throughput (ops/sec)

| Test Case                  |    cron-fast | cron-schedule |   cron-parser |       croner | cron-validate |
| -------------------------- | -----------: | ------------: | ------------: | -----------: | ------------: |
| varied inputs (anti-cache) | ~4463k ±1.2% | ~475k ±0.7% ✓ | ~114k ±0.4% ✓ | ~35k ±0.4% ✓ | ~616k ±0.3% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation Varied Inputs - Latency (mean / p99)

| Test Case                  |       cron-fast |       cron-schedule |          cron-parser |                croner |       cron-validate |
| -------------------------- | --------------: | ------------------: | -------------------: | --------------------: | ------------------: |
| varied inputs (anti-cache) | 224 ns / 500 ns | 2,107 ns / 3,083 ns | 8,755 ns / 12,208 ns | 28,312 ns / 34,833 ns | 1,624 ns / 2,000 ns |

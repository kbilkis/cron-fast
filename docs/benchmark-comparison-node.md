# Benchmark

> Tested with node v24.19.0, cron-fast v3.13.0, croner v11.0.0, cron-parser v5.10.3, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by vitest bench (tinybench).

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~5077k      | baseline      |
| cron-schedule | ~347k       | 14.6x faster  |
| cron-parser   | ~36k        | 141.6x faster |
| croner        | ~30k        | 171.4x faster |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~112k       | baseline     |
| cron-schedule | ~16k        | 7.2x faster  |
| cron-parser   | ~1k         | 95.5x faster |
| croner        | ~2k         | 67.5x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~4908k      | baseline      |
| cron-schedule | ~368k       | 13.3x faster  |
| cron-parser   | ~40k        | 121.4x faster |
| croner        | ~30k        | 161.6x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~12298k     | baseline      |
| cron-schedule | ~476k       | 25.8x faster  |
| cron-parser   | ~98k        | 125.0x faster |
| croner        | ~34k        | 356.6x faster |
| cron-validate | ~665k       | 18.5x faster  |

### Validation Varied Inputs

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~11824k     | baseline      |
| cron-schedule | ~533k       | 22.2x faster  |
| cron-parser   | ~123k       | 96.0x faster  |
| croner        | ~34k        | 343.9x faster |
| cron-validate | ~630k       | 18.8x faster  |

### Parsing

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~12565k     | baseline      |
| cron-schedule | ~476k       | 26.4x faster  |
| cron-parser   | ~97k        | 129.1x faster |
| croner        | ~34k        | 364.9x faster |
| cron-validate | ~669k       | 18.8x faster  |

Run benchmarks yourself: `pnpm bench`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case    |    cron-fast | cron-schedule |  cron-parser |       croner |
| ------------ | -----------: | ------------: | -----------: | -----------: |
| * * * * *    | ~8809k ±0.2% | ~172k ±0.3% ✓ | ~34k ±0.3% ✓ | ~31k ±0.2% ✓ |
| 0 0 1 * *    | ~5388k ±0.3% | ~471k ±0.2% ✓ | ~20k ±0.3% ✓ | ~30k ±0.3% ✓ |
| 0 12 31 * *  | ~4870k ±0.3% | ~456k ±0.2% ✓ |  ~8k ±0.5% ✓ | ~28k ±0.2% ✓ |
| */15 * * * * | ~5144k ±0.2% | ~261k ±0.3% ✓ | ~59k ±0.2% ✓ | ~30k ±1.7% ✓ |
| 0 9 * * *    | ~5089k ±0.2% | ~336k ±0.3% ✓ | ~45k ±0.3% ✓ | ~31k ±0.3% ✓ |
| 0 9 15 * 1   | ~2595k ±1.7% | ~443k ±0.3% ✓ | ~40k ±0.3% ✓ | ~29k ±0.5% ✓ |
| 0 9 * * 1-5  | ~3647k ±0.6% | ~291k ±0.3% ✓ | ~46k ±0.2% ✓ | ~28k ±0.3% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |             cron-parser |                croner |
| ------------ | --------------: | ------------------: | ----------------------: | --------------------: |
| * * * * *    | 119 ns / 166 ns | 5,977 ns / 7,917 ns |   30,173 ns / 38,274 ns | 32,696 ns / 39,458 ns |
| 0 0 1 * *    | 192 ns / 250 ns | 2,157 ns / 2,667 ns |   51,508 ns / 64,988 ns | 33,439 ns / 43,246 ns |
| 0 12 31 * *  | 212 ns / 250 ns | 2,232 ns / 3,042 ns | 134,640 ns / 291,391 ns | 35,555 ns / 46,364 ns |
| */15 * * * * | 200 ns / 250 ns | 3,909 ns / 4,709 ns |   17,133 ns / 19,750 ns | 33,945 ns / 44,017 ns |
| 0 9 * * *    | 202 ns / 250 ns | 3,027 ns / 3,625 ns |   22,526 ns / 27,503 ns | 32,486 ns / 40,099 ns |
| 0 9 15 * 1   | 408 ns / 541 ns | 2,299 ns / 2,833 ns |   25,222 ns / 31,689 ns | 35,522 ns / 46,458 ns |
| 0 9 * * 1-5  | 283 ns / 375 ns | 3,489 ns / 4,125 ns |   21,824 ns / 26,325 ns | 36,522 ns / 48,383 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case   |   cron-fast | cron-schedule | cron-parser |      croner |
| ----------- | ----------: | ------------: | ----------: | ----------: |
| * * * * *   | ~178k ±0.3% |  ~21k ±0.3% ✓ | ~2k ±0.4% ✓ | ~2k ±0.2% ✓ |
| 0 9 * * 1-5 |  ~47k ±0.2% |  ~10k ±0.1% ✓ | ~0k ±0.4% ✓ | ~1k ±0.2% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case   |             cron-fast |          cron-schedule |                 cron-parser |                      croner |
| ----------- | --------------------: | ---------------------: | --------------------------: | --------------------------: |
| * * * * *   |   5,723 ns / 6,875 ns |  48,725 ns / 61,824 ns |     537,360 ns / 673,002 ns |     402,674 ns / 487,981 ns |
| 0 9 * * 1-5 | 21,429 ns / 24,583 ns | 96,942 ns / 110,035 ns | 2,077,201 ns / 2,337,346 ns | 1,188,216 ns / 1,352,510 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case    |    cron-fast | cron-schedule |  cron-parser |       croner |
| ------------ | -----------: | ------------: | -----------: | -----------: |
| * * * * *    | ~7227k ±0.7% | ~170k ±0.3% ✓ | ~37k ±0.2% ✓ | ~32k ±0.2% ✓ |
| 0 0 1 * *    | ~5157k ±1.4% | ~503k ±0.3% ✓ |  ~9k ±0.3% ✓ | ~30k ±0.2% ✓ |
| 0 12 31 * *  | ~4631k ±0.2% | ~435k ±0.3% ✓ |  ~9k ±0.3% ✓ | ~30k ±0.2% ✓ |
| */15 * * * * | ~4586k ±0.1% | ~254k ±0.3% ✓ | ~57k ±0.2% ✓ | ~31k ±0.3% ✓ |
| 0 9 * * *    | ~4939k ±0.1% | ~351k ±0.2% ✓ | ~51k ±0.2% ✓ | ~31k ±0.2% ✓ |
| 0 9 15 * 1   | ~4048k ±1.6% | ~535k ±0.2% ✓ | ~67k ±0.2% ✓ | ~30k ±0.3% ✓ |
| 0 9 * * 1-5  | ~3768k ±0.1% | ~330k ±0.3% ✓ | ~52k ±0.3% ✓ | ~29k ±0.2% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |             cron-parser |                croner |
| ------------ | --------------: | ------------------: | ----------------------: | --------------------: |
| * * * * *    | 145 ns / 167 ns | 6,067 ns / 8,042 ns |   27,448 ns / 32,583 ns | 32,044 ns / 39,161 ns |
| 0 0 1 * *    | 201 ns / 250 ns | 2,032 ns / 2,667 ns | 107,258 ns / 138,206 ns | 33,583 ns / 41,010 ns |
| 0 12 31 * *  | 221 ns / 291 ns | 2,344 ns / 2,958 ns | 116,703 ns / 168,593 ns | 33,427 ns / 38,321 ns |
| */15 * * * * | 221 ns / 250 ns | 4,030 ns / 5,334 ns |   17,615 ns / 25,083 ns | 32,786 ns / 44,083 ns |
| 0 9 * * *    | 205 ns / 250 ns | 2,889 ns / 3,458 ns |   19,623 ns / 23,292 ns | 32,675 ns / 39,833 ns |
| 0 9 15 * 1   | 255 ns / 292 ns | 1,897 ns / 2,500 ns |   14,983 ns / 16,292 ns | 33,507 ns / 42,541 ns |
| 0 9 * * 1-5  | 269 ns / 334 ns | 3,084 ns / 3,750 ns |   19,480 ns / 26,056 ns | 35,022 ns / 42,478 ns |

### Validation - Throughput (ops/sec)

| Test Case    |     cron-fast | cron-schedule |   cron-parser |       croner | cron-validate |
| ------------ | ------------: | ------------: | ------------: | -----------: | ------------: |
| * * * * *    | ~18589k ±0.4% | ~190k ±0.3% ✓ |  ~45k ±0.3% ✓ | ~36k ±0.2% ✓ | ~641k ±3.7% ✓ |
| 0 0 1 * *    | ~12939k ±0.3% | ~635k ±0.3% ✓ | ~126k ±0.2% ✓ | ~34k ±0.3% ✓ | ~686k ±0.2% ✓ |
| 0 12 31 * *  | ~11231k ±0.3% | ~638k ±0.3% ✓ | ~126k ±0.3% ✓ | ~35k ±0.2% ✓ | ~640k ±0.2% ✓ |
| */15 * * * * | ~11160k ±0.2% | ~292k ±0.3% ✓ |  ~69k ±0.2% ✓ | ~35k ±0.2% ✓ | ~709k ±0.2% ✓ |
| 0 9 * * *    | ~14317k ±0.4% | ~398k ±0.3% ✓ |  ~88k ±0.3% ✓ | ~34k ±0.3% ✓ | ~659k ±0.2% ✓ |
| 0 9 15 * 1   |  ~9593k ±0.3% | ~772k ±0.3% ✓ | ~143k ±0.2% ✓ | ~34k ±0.3% ✓ | ~680k ±0.2% ✓ |
| 0 9 * * 1-5  |  ~8258k ±0.0% | ~409k ±0.3% ✓ |  ~91k ±0.2% ✓ | ~33k ±0.2% ✓ | ~640k ±0.2% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| * * * * *    |   63 ns / 84 ns | 5,397 ns / 6,958 ns | 22,239 ns / 28,375 ns | 28,036 ns / 31,430 ns | 1,608 ns / 2,250 ns |
| 0 0 1 * *    |  83 ns / 125 ns | 1,611 ns / 2,250 ns |  8,014 ns / 10,625 ns | 29,705 ns / 37,584 ns | 1,484 ns / 2,042 ns |
| 0 12 31 * *  |  94 ns / 125 ns | 1,603 ns / 2,166 ns |   8,049 ns / 8,917 ns | 29,050 ns / 35,459 ns | 1,582 ns / 2,000 ns |
| */15 * * * * |  94 ns / 125 ns | 3,492 ns / 4,291 ns | 14,540 ns / 16,792 ns | 28,585 ns / 34,959 ns | 1,432 ns / 1,875 ns |
| 0 9 * * *    |  78 ns / 125 ns | 2,576 ns / 3,375 ns | 11,449 ns / 14,791 ns | 29,699 ns / 36,750 ns | 1,536 ns / 1,959 ns |
| 0 9 15 * 1   | 112 ns / 167 ns | 1,329 ns / 1,916 ns |   7,082 ns / 7,916 ns | 29,873 ns / 38,052 ns | 1,491 ns / 1,917 ns |
| 0 9 * * 1-5  | 124 ns / 167 ns | 2,484 ns / 3,083 ns | 11,108 ns / 13,041 ns | 30,505 ns / 36,458 ns | 1,586 ns / 2,083 ns |

### Parsing - Throughput (ops/sec)

| Test Case    |     cron-fast | cron-schedule |   cron-parser |       croner | cron-validate |
| ------------ | ------------: | ------------: | ------------: | -----------: | ------------: |
| * * * * *    | ~18755k ±0.4% | ~189k ±0.4% ✓ |  ~46k ±0.5% ✓ | ~35k ±0.3% ✓ | ~639k ±0.2% ✓ |
| 0 0 1 * *    | ~13997k ±0.3% | ~637k ±0.3% ✓ | ~125k ±0.2% ✓ | ~35k ±0.3% ✓ | ~682k ±0.2% ✓ |
| 0 12 31 * *  | ~11272k ±0.4% | ~633k ±0.4% ✓ | ~121k ±0.3% ✓ | ~35k ±0.2% ✓ | ~627k ±0.2% ✓ |
| */15 * * * * | ~11337k ±0.3% | ~291k ±0.3% ✓ |  ~69k ±0.2% ✓ | ~35k ±0.3% ✓ | ~712k ±0.2% ✓ |
| 0 9 * * *    | ~14459k ±0.4% | ~412k ±0.3% ✓ |  ~88k ±0.2% ✓ | ~35k ±0.2% ✓ | ~690k ±0.2% ✓ |
| 0 9 15 * 1   |  ~9684k ±0.3% | ~759k ±0.3% ✓ | ~142k ±0.3% ✓ | ~34k ±0.3% ✓ | ~689k ±0.2% ✓ |
| 0 9 * * 1-5  |  ~8453k ±0.1% | ~409k ±0.3% ✓ |  ~90k ±0.3% ✓ | ~33k ±0.2% ✓ | ~641k ±3.8% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| * * * * *    |   62 ns / 84 ns | 5,470 ns / 7,208 ns | 22,121 ns / 28,623 ns | 28,972 ns / 43,750 ns | 1,587 ns / 2,041 ns |
| 0 0 1 * *    |  79 ns / 125 ns | 1,607 ns / 2,208 ns |   8,115 ns / 9,500 ns | 29,307 ns / 40,491 ns | 1,494 ns / 1,958 ns |
| 0 12 31 * *  |  96 ns / 125 ns | 1,632 ns / 2,250 ns |  8,425 ns / 10,750 ns | 28,981 ns / 35,417 ns | 1,614 ns / 2,041 ns |
| */15 * * * * |  93 ns / 125 ns | 3,510 ns / 4,333 ns | 14,708 ns / 17,666 ns | 29,263 ns / 36,928 ns | 1,419 ns / 1,834 ns |
| 0 9 * * *    |  78 ns / 125 ns | 2,466 ns / 3,083 ns | 11,453 ns / 12,875 ns | 29,115 ns / 35,792 ns | 1,470 ns / 1,916 ns |
| 0 9 15 * 1   | 110 ns / 166 ns | 1,366 ns / 2,041 ns |   7,138 ns / 9,667 ns | 30,135 ns / 43,632 ns | 1,476 ns / 2,042 ns |
| 0 9 * * 1-5  | 122 ns / 167 ns | 2,490 ns / 3,083 ns | 11,225 ns / 13,750 ns | 30,432 ns / 36,167 ns | 1,610 ns / 2,000 ns |

### Validation Varied Inputs - Throughput (ops/sec)

| Test Case                  |     cron-fast | cron-schedule |   cron-parser |       croner | cron-validate |
| -------------------------- | ------------: | ------------: | ------------: | -----------: | ------------: |
| varied inputs (anti-cache) | ~11824k ±0.3% | ~533k ±0.3% ✓ | ~123k ±0.2% ✓ | ~34k ±0.3% ✓ | ~630k ±0.2% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation Varied Inputs - Latency (mean / p99)

| Test Case                  |      cron-fast |       cron-schedule |         cron-parser |                croner |       cron-validate |
| -------------------------- | -------------: | ------------------: | ------------------: | --------------------: | ------------------: |
| varied inputs (anti-cache) | 91 ns / 125 ns | 1,917 ns / 2,458 ns | 8,217 ns / 9,416 ns | 29,523 ns / 37,750 ns | 1,602 ns / 2,041 ns |

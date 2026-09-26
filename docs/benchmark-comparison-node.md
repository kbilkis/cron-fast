# Benchmark

> Tested with node v24.19.0, cron-fast v3.13.0, croner v10.0.1, cron-parser v5.10.1, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by vitest bench (tinybench).

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2955k      | baseline     |
| cron-schedule | ~341k       | 8.7x faster  |
| cron-parser   | ~35k        | 85.4x faster |
| croner        | ~31k        | 94.7x faster |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~86k        | baseline     |
| cron-schedule | ~15k        | 5.7x faster  |
| cron-parser   | ~1k         | 74.8x faster |
| croner        | ~2k         | 36.0x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~3011k      | baseline     |
| cron-schedule | ~362k       | 8.3x faster  |
| cron-parser   | ~39k        | 76.8x faster |
| croner        | ~32k        | 94.8x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~12264k     | baseline      |
| cron-schedule | ~470k       | 26.1x faster  |
| cron-parser   | ~95k        | 128.5x faster |
| croner        | ~34k        | 360.8x faster |
| cron-validate | ~647k       | 19.0x faster  |

### Validation Varied Inputs

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~10966k     | baseline      |
| cron-schedule | ~526k       | 20.9x faster  |
| cron-parser   | ~120k       | 91.2x faster  |
| croner        | ~34k        | 325.7x faster |
| cron-validate | ~569k       | 19.3x faster  |

### Parsing

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~12263k     | baseline      |
| cron-schedule | ~472k       | 26.0x faster  |
| cron-parser   | ~94k        | 130.6x faster |
| croner        | ~34k        | 360.1x faster |
| cron-validate | ~654k       | 18.7x faster  |

Run benchmarks yourself: `pnpm bench`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case    |    cron-fast | cron-schedule |  cron-parser |       croner |
| ------------ | -----------: | ------------: | -----------: | -----------: |
| * * * * *    | ~4685k ±0.1% | ~167k ±0.4% ✓ | ~33k ±0.3% ✓ | ~32k ±1.9% ✓ |
| 0 0 1 * *    | ~3050k ±0.1% | ~454k ±0.8% ✓ | ~19k ±0.4% ✓ | ~32k ±0.4% ✓ |
| 0 12 31 * *  | ~2882k ±0.1% | ~451k ±0.3% ✓ |  ~8k ±0.4% ✓ | ~30k ±0.4% ✓ |
| */15 * * * * | ~2980k ±0.2% | ~259k ±0.4% ✓ | ~55k ±0.4% ✓ | ~33k ±0.5% ✓ |
| 0 9 * * *    | ~2964k ±0.6% | ~331k ±0.4% ✓ | ~44k ±0.4% ✓ | ~32k ±5.3% ✓ |
| 0 9 15 * 1   | ~1756k ±0.2% | ~436k ±0.2% ✓ | ~38k ±0.5% ✓ | ~30k ±3.2% ✓ |
| 0 9 * * 1-5  | ~2368k ±0.6% | ~291k ±0.6% ✓ | ~45k ±0.3% ✓ | ~29k ±0.5% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |             cron-parser |                croner |
| ------------ | --------------: | ------------------: | ----------------------: | --------------------: |
| * * * * *    | 218 ns / 250 ns | 6,223 ns / 8,250 ns |   30,476 ns / 45,198 ns | 32,305 ns / 48,913 ns |
| 0 0 1 * *    | 332 ns / 417 ns | 2,285 ns / 2,958 ns |   53,473 ns / 94,164 ns | 31,789 ns / 44,727 ns |
| 0 12 31 * *  | 355 ns / 458 ns | 2,270 ns / 2,834 ns | 135,361 ns / 224,235 ns | 33,660 ns / 49,292 ns |
| */15 * * * * | 343 ns / 458 ns | 3,975 ns / 5,000 ns |   18,435 ns / 28,565 ns | 31,077 ns / 46,060 ns |
| 0 9 * * *    | 349 ns / 458 ns | 3,092 ns / 3,750 ns |   23,197 ns / 34,708 ns | 33,269 ns / 53,605 ns |
| 0 9 15 * 1   | 578 ns / 708 ns | 2,332 ns / 3,000 ns |   26,833 ns / 50,264 ns | 34,872 ns / 53,958 ns |
| 0 9 * * 1-5  | 429 ns / 542 ns | 3,528 ns / 4,333 ns |   22,801 ns / 31,708 ns | 34,944 ns / 60,792 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case   |   cron-fast | cron-schedule | cron-parser |      croner |
| ----------- | ----------: | ------------: | ----------: | ----------: |
| * * * * *   | ~136k ±0.1% |  ~20k ±1.0% ✓ | ~2k ±0.5% ✓ | ~4k ±0.3% ✓ |
| 0 9 * * 1-5 |  ~36k ±0.2% |  ~10k ±0.2% ✓ | ~1k ±0.3% ✓ | ~1k ±0.2% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case   |             cron-fast |          cron-schedule |                 cron-parser |                      croner |
| ----------- | --------------------: | ---------------------: | --------------------------: | --------------------------: |
| * * * * *   |   7,411 ns / 9,416 ns |  50,265 ns / 80,338 ns |     560,232 ns / 774,248 ns |     264,326 ns / 374,128 ns |
| 0 9 * * 1-5 | 27,776 ns / 34,208 ns | 98,613 ns / 128,375 ns | 1,991,125 ns / 2,203,324 ns | 1,011,492 ns / 1,181,959 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case    |    cron-fast | cron-schedule |  cron-parser |       croner |
| ------------ | -----------: | ------------: | -----------: | -----------: |
| * * * * *    | ~4433k ±0.1% | ~167k ±0.4% ✓ | ~36k ±0.3% ✓ | ~33k ±9.0% ✓ |
| 0 0 1 * *    | ~3038k ±0.1% | ~499k ±0.4% ✓ |  ~9k ±0.4% ✓ | ~31k ±0.4% ✓ |
| 0 12 31 * *  | ~2797k ±0.2% | ~416k ±0.4% ✓ |  ~8k ±0.6% ✓ | ~31k ±0.5% ✓ |
| */15 * * * * | ~2837k ±0.3% | ~256k ±1.3% ✓ | ~54k ±0.4% ✓ | ~32k ±0.7% ✓ |
| 0 9 * * *    | ~2892k ±0.7% | ~347k ±0.4% ✓ | ~49k ±0.3% ✓ | ~32k ±0.4% ✓ |
| 0 9 15 * 1   | ~2675k ±2.1% | ~525k ±0.3% ✓ | ~66k ±0.3% ✓ | ~32k ±0.3% ✓ |
| 0 9 * * 1-5  | ~2403k ±0.2% | ~324k ±0.9% ✓ | ~51k ±0.3% ✓ | ~31k ±0.3% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |             cron-parser |                croner |
| ------------ | --------------: | ------------------: | ----------------------: | --------------------: |
| * * * * *    | 231 ns / 292 ns | 6,259 ns / 9,167 ns |   28,239 ns / 44,375 ns | 32,721 ns / 46,532 ns |
| 0 0 1 * *    | 335 ns / 417 ns | 2,069 ns / 2,709 ns | 110,762 ns / 171,932 ns | 32,482 ns / 47,762 ns |
| 0 12 31 * *  | 367 ns / 500 ns | 2,499 ns / 3,333 ns | 121,006 ns / 205,655 ns | 33,105 ns / 51,166 ns |
| */15 * * * * | 367 ns / 500 ns | 4,120 ns / 5,166 ns |   18,793 ns / 33,953 ns | 32,858 ns / 62,209 ns |
| 0 9 * * *    | 361 ns / 500 ns | 2,966 ns / 3,709 ns |   20,670 ns / 35,550 ns | 31,984 ns / 53,683 ns |
| 0 9 15 * 1   | 409 ns / 542 ns | 1,953 ns / 2,500 ns |   15,375 ns / 22,958 ns | 31,340 ns / 43,705 ns |
| 0 9 * * 1-5  | 426 ns / 542 ns | 3,189 ns / 3,917 ns |   20,037 ns / 31,287 ns | 32,361 ns / 38,250 ns |

### Validation - Throughput (ops/sec)

| Test Case    |     cron-fast | cron-schedule |   cron-parser |       croner |  cron-validate |
| ------------ | ------------: | ------------: | ------------: | -----------: | -------------: |
| * * * * *    | ~18976k ±0.4% | ~186k ±0.7% ✓ |  ~45k ±0.5% ✓ | ~33k ±0.7% ✓ | ~598k ±18.2% ✓ |
| 0 0 1 * *    | ~13491k ±0.6% | ~631k ±0.7% ✓ | ~126k ±0.5% ✓ | ~35k ±0.6% ✓ | ~667k ±14.6% ✓ |
| 0 12 31 * *  | ~10948k ±0.7% | ~614k ±0.7% ✓ | ~120k ±0.5% ✓ | ~34k ±0.6% ✓ | ~657k ±10.1% ✓ |
| */15 * * * * | ~11083k ±0.5% | ~290k ±0.5% ✓ |  ~67k ±1.0% ✓ | ~34k ±0.5% ✓ |  ~697k ±9.8% ✓ |
| 0 9 * * *    | ~13961k ±0.8% | ~404k ±0.7% ✓ |  ~86k ±1.0% ✓ | ~34k ±0.6% ✓ | ~628k ±14.3% ✓ |
| 0 9 15 * 1   |  ~9178k ±0.7% | ~759k ±0.6% ✓ | ~136k ±3.0% ✓ | ~34k ±0.6% ✓ | ~650k ±12.3% ✓ |
| 0 9 * * 1-5  |  ~8210k ±0.1% | ~404k ±0.6% ✓ |  ~88k ±0.5% ✓ | ~33k ±0.5% ✓ | ~631k ±11.7% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| * * * * *    |   62 ns / 84 ns | 5,640 ns / 7,500 ns | 22,741 ns / 36,041 ns | 31,074 ns / 48,467 ns | 1,969 ns / 2,125 ns |
| 0 0 1 * *    |  82 ns / 125 ns | 1,657 ns / 2,333 ns |   8,100 ns / 9,834 ns | 29,611 ns / 40,928 ns | 1,721 ns / 2,041 ns |
| 0 12 31 * *  |  99 ns / 167 ns | 1,744 ns / 2,708 ns |  8,569 ns / 11,375 ns | 30,363 ns / 49,777 ns | 1,681 ns / 2,000 ns |
| */15 * * * * |  97 ns / 125 ns | 3,567 ns / 4,375 ns | 15,477 ns / 26,417 ns | 30,380 ns / 40,119 ns | 1,602 ns / 2,125 ns |
| 0 9 * * *    |  83 ns / 125 ns | 2,581 ns / 3,250 ns | 12,060 ns / 20,187 ns | 30,050 ns / 49,561 ns | 1,799 ns / 2,125 ns |
| 0 9 15 * 1   | 120 ns / 208 ns | 1,376 ns / 1,875 ns |  7,708 ns / 10,083 ns | 30,501 ns / 44,637 ns | 1,703 ns / 2,042 ns |
| 0 9 * * 1-5  | 126 ns / 167 ns | 2,574 ns / 3,208 ns | 11,667 ns / 18,000 ns | 30,837 ns / 49,988 ns | 1,749 ns / 1,834 ns |

### Parsing - Throughput (ops/sec)

| Test Case    |     cron-fast | cron-schedule |   cron-parser |       croner |  cron-validate |
| ------------ | ------------: | ------------: | ------------: | -----------: | -------------: |
| * * * * *    | ~18414k ±0.5% | ~180k ±0.8% ✓ |  ~43k ±0.9% ✓ | ~34k ±0.7% ✓ | ~610k ±13.5% ✓ |
| 0 0 1 * *    | ~13494k ±3.4% | ~639k ±0.7% ✓ | ~121k ±0.8% ✓ | ~34k ±1.2% ✓ | ~682k ±16.8% ✓ |
| 0 12 31 * *  | ~10833k ±0.6% | ~625k ±0.6% ✓ | ~118k ±0.5% ✓ | ~34k ±0.6% ✓ |  ~655k ±6.0% ✓ |
| */15 * * * * | ~10889k ±0.7% | ~285k ±0.4% ✓ |  ~65k ±0.4% ✓ | ~34k ±0.5% ✓ |  ~700k ±6.6% ✓ |
| 0 9 * * *    | ~15242k ±0.7% | ~406k ±0.7% ✓ |  ~86k ±0.5% ✓ | ~34k ±0.6% ✓ | ~642k ±11.6% ✓ |
| 0 9 15 * 1   |  ~9190k ±7.5% | ~765k ±0.5% ✓ | ~134k ±0.4% ✓ | ~35k ±0.4% ✓ | ~668k ±10.5% ✓ |
| 0 9 * * 1-5  |  ~7779k ±0.2% | ~405k ±0.6% ✓ |  ~89k ±0.4% ✓ | ~34k ±0.4% ✓ | ~624k ±11.6% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| * * * * *    |  65 ns / 125 ns | 5,831 ns / 7,667 ns | 23,841 ns / 49,149 ns | 31,138 ns / 50,577 ns | 1,856 ns / 2,125 ns |
| 0 0 1 * *    |  84 ns / 125 ns | 1,631 ns / 2,166 ns |  8,588 ns / 12,375 ns | 30,455 ns / 43,444 ns | 1,716 ns / 1,959 ns |
| 0 12 31 * *  | 101 ns / 125 ns | 1,675 ns / 2,333 ns |  8,689 ns / 11,959 ns | 30,079 ns / 46,065 ns | 1,626 ns / 2,250 ns |
| */15 * * * * | 100 ns / 167 ns | 3,629 ns / 4,916 ns | 15,773 ns / 26,792 ns | 30,509 ns / 47,321 ns | 1,540 ns / 2,208 ns |
| 0 9 * * *    |  76 ns / 125 ns | 2,577 ns / 3,292 ns | 11,846 ns / 14,958 ns | 30,429 ns / 50,974 ns | 1,721 ns / 2,083 ns |
| 0 9 15 * 1   | 125 ns / 208 ns | 1,358 ns / 1,916 ns |   7,610 ns / 9,250 ns | 29,553 ns / 38,542 ns | 1,648 ns / 2,000 ns |
| 0 9 * * 1-5  | 132 ns / 167 ns | 2,567 ns / 3,209 ns | 11,455 ns / 14,500 ns | 30,020 ns / 42,403 ns | 1,798 ns / 2,375 ns |

### Validation Varied Inputs - Throughput (ops/sec)

| Test Case                  |     cron-fast | cron-schedule |   cron-parser |       croner | cron-validate |
| -------------------------- | ------------: | ------------: | ------------: | -----------: | ------------: |
| varied inputs (anti-cache) | ~10966k ±0.3% | ~526k ±0.6% ✓ | ~120k ±0.4% ✓ | ~34k ±0.6% ✓ | ~569k ±6.6% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation Varied Inputs - Latency (mean / p99)

| Test Case                  |      cron-fast |       cron-schedule |          cron-parser |                croner |       cron-validate |
| -------------------------- | -------------: | ------------------: | -------------------: | --------------------: | ------------------: |
| varied inputs (anti-cache) | 99 ns / 166 ns | 1,984 ns / 2,625 ns | 8,512 ns / 11,542 ns | 30,642 ns / 45,472 ns | 1,888 ns / 2,292 ns |

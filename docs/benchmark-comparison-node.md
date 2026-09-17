# Benchmark

> Tested with node v24.19.0, cron-fast v3.12.0, croner v10.0.1, cron-parser v5.10.1, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by vitest bench (tinybench).

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2835k      | baseline     |
| cron-schedule | ~349k       | 8.1x faster  |
| cron-parser   | ~35k        | 79.9x faster |
| croner        | ~32k        | 87.4x faster |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~86k        | baseline     |
| cron-schedule | ~16k        | 5.5x faster  |
| cron-parser   | ~1k         | 75.0x faster |
| croner        | ~2k         | 36.5x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2917k      | baseline     |
| cron-schedule | ~369k       | 7.9x faster  |
| cron-parser   | ~40k        | 72.0x faster |
| croner        | ~33k        | 88.3x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~10333k     | baseline      |
| cron-schedule | ~475k       | 21.7x faster  |
| cron-parser   | ~97k        | 106.3x faster |
| croner        | ~36k        | 290.6x faster |
| cron-validate | ~671k       | 15.4x faster  |

### Validation Varied Inputs

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~8646k      | baseline      |
| cron-schedule | ~535k       | 16.2x faster  |
| cron-parser   | ~121k       | 71.3x faster  |
| croner        | ~36k        | 243.3x faster |
| cron-validate | ~590k       | 14.6x faster  |

### Parsing

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~10178k     | baseline      |
| cron-schedule | ~487k       | 20.9x faster  |
| cron-parser   | ~94k        | 108.2x faster |
| croner        | ~36k        | 286.1x faster |
| cron-validate | ~654k       | 15.6x faster  |

Run benchmarks yourself: `pnpm bench`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case    |    cron-fast | cron-schedule |  cron-parser |       croner |
| ------------ | -----------: | ------------: | -----------: | -----------: |
| * * * * *    | ~4535k ±0.1% | ~172k ±0.3% ✓ | ~34k ±0.3% ✓ | ~33k ±1.2% ✓ |
| 0 0 1 * *    | ~2911k ±0.3% | ~465k ±1.7% ✓ | ~20k ±0.5% ✓ | ~33k ±5.8% ✓ |
| 0 12 31 * *  | ~2754k ±0.2% | ~462k ±0.1% ✓ |  ~8k ±0.4% ✓ | ~31k ±5.3% ✓ |
| */15 * * * * | ~2856k ±0.3% | ~262k ±0.3% ✓ | ~57k ±0.3% ✓ | ~34k ±0.3% ✓ |
| 0 9 * * *    | ~2831k ±0.2% | ~338k ±0.3% ✓ | ~45k ±0.3% ✓ | ~34k ±0.4% ✓ |
| 0 9 15 * 1   | ~1732k ±0.3% | ~447k ±0.4% ✓ | ~40k ±0.4% ✓ | ~31k ±0.3% ✓ |
| 0 9 * * 1-5  | ~2227k ±0.5% | ~296k ±0.3% ✓ | ~46k ±0.3% ✓ | ~31k ±4.6% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |             cron-parser |                croner |
| ------------ | --------------: | ------------------: | ----------------------: | --------------------: |
| * * * * *    | 225 ns / 250 ns | 5,992 ns / 7,666 ns |   30,186 ns / 38,905 ns | 31,164 ns / 36,880 ns |
| 0 0 1 * *    | 351 ns / 417 ns | 2,192 ns / 2,750 ns |   51,943 ns / 65,475 ns | 31,935 ns / 35,958 ns |
| 0 12 31 * *  | 370 ns / 458 ns | 2,181 ns / 2,708 ns | 129,439 ns / 175,062 ns | 33,907 ns / 39,167 ns |
| */15 * * * * | 357 ns / 458 ns | 3,872 ns / 4,458 ns |   17,750 ns / 21,458 ns | 29,399 ns / 35,292 ns |
| 0 9 * * *    | 359 ns / 417 ns | 3,014 ns / 3,500 ns |   22,485 ns / 26,833 ns | 30,159 ns / 35,810 ns |
| 0 9 15 * 1   | 588 ns / 709 ns | 2,281 ns / 2,792 ns |   25,537 ns / 32,042 ns | 32,099 ns / 37,875 ns |
| 0 9 * * 1-5  | 460 ns / 584 ns | 3,433 ns / 4,000 ns |   22,009 ns / 26,584 ns | 33,847 ns / 39,088 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case   |   cron-fast | cron-schedule | cron-parser |      croner |
| ----------- | ----------: | ------------: | ----------: | ----------: |
| * * * * *   | ~137k ±0.2% |  ~21k ±0.2% ✓ | ~2k ±0.4% ✓ | ~4k ±0.2% ✓ |
| 0 9 * * 1-5 |  ~36k ±0.2% |  ~10k ±0.1% ✓ | ~0k ±0.3% ✓ | ~1k ±0.2% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case   |             cron-fast |          cron-schedule |                 cron-parser |                      croner |
| ----------- | --------------------: | ---------------------: | --------------------------: | --------------------------: |
| * * * * *   |   7,392 ns / 8,084 ns |  48,043 ns / 58,071 ns |     556,190 ns / 691,437 ns |     267,314 ns / 364,250 ns |
| 0 9 * * 1-5 | 27,889 ns / 33,666 ns | 96,883 ns / 112,108 ns | 2,034,511 ns / 2,209,541 ns | 1,016,894 ns / 1,170,073 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case    |    cron-fast | cron-schedule |  cron-parser |       croner |
| ------------ | -----------: | ------------: | -----------: | -----------: |
| * * * * *    | ~4376k ±0.1% | ~170k ±0.4% ✓ | ~37k ±0.3% ✓ | ~34k ±4.4% ✓ |
| 0 0 1 * *    | ~2907k ±0.3% | ~511k ±0.4% ✓ |  ~9k ±0.4% ✓ | ~33k ±0.4% ✓ |
| 0 12 31 * *  | ~2656k ±0.2% | ~437k ±0.3% ✓ |  ~9k ±0.3% ✓ | ~32k ±5.3% ✓ |
| */15 * * * * | ~2777k ±0.3% | ~262k ±0.3% ✓ | ~58k ±0.2% ✓ | ~34k ±0.2% ✓ |
| 0 9 * * *    | ~2841k ±0.2% | ~352k ±0.3% ✓ | ~51k ±0.3% ✓ | ~33k ±0.4% ✓ |
| 0 9 15 * 1   | ~2564k ±0.3% | ~526k ±0.4% ✓ | ~67k ±0.3% ✓ | ~33k ±5.6% ✓ |
| 0 9 * * 1-5  | ~2296k ±0.4% | ~328k ±0.3% ✓ | ~52k ±0.3% ✓ | ~32k ±0.3% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |             cron-parser |                croner |
| ------------ | --------------: | ------------------: | ----------------------: | --------------------: |
| * * * * *    | 233 ns / 250 ns | 6,088 ns / 8,167 ns |   27,470 ns / 33,792 ns | 30,567 ns / 35,750 ns |
| 0 0 1 * *    | 351 ns / 417 ns | 2,005 ns / 2,500 ns | 106,951 ns / 144,688 ns | 31,112 ns / 37,084 ns |
| 0 12 31 * *  | 383 ns / 459 ns | 2,332 ns / 2,833 ns | 113,612 ns / 147,123 ns | 32,395 ns / 37,625 ns |
| */15 * * * * | 367 ns / 458 ns | 3,875 ns / 4,458 ns |   17,462 ns / 20,375 ns | 29,795 ns / 48,166 ns |
| 0 9 * * *    | 358 ns / 417 ns | 2,907 ns / 3,583 ns |   19,907 ns / 23,833 ns | 30,421 ns / 39,012 ns |
| 0 9 15 * 1   | 399 ns / 500 ns | 1,945 ns / 2,458 ns |   15,026 ns / 17,583 ns | 31,566 ns / 36,042 ns |
| 0 9 * * 1-5  | 447 ns / 583 ns | 3,100 ns / 3,667 ns |   19,344 ns / 23,709 ns | 31,943 ns / 39,209 ns |

### Validation - Throughput (ops/sec)

| Test Case    |     cron-fast | cron-schedule |   cron-parser |       croner |  cron-validate |
| ------------ | ------------: | ------------: | ------------: | -----------: | -------------: |
| * * * * *    | ~17336k ±0.2% | ~192k ±0.6% ✓ |  ~46k ±0.5% ✓ | ~36k ±0.4% ✓ | ~643k ±10.4% ✓ |
| 0 0 1 * *    | ~10858k ±5.4% | ~640k ±1.5% ✓ | ~127k ±0.3% ✓ | ~35k ±0.5% ✓ |  ~707k ±0.5% ✓ |
| 0 12 31 * *  |  ~8794k ±0.6% | ~639k ±0.6% ✓ | ~123k ±0.4% ✓ | ~35k ±0.5% ✓ | ~693k ±14.6% ✓ |
| */15 * * * * |  ~9727k ±0.5% | ~295k ±0.6% ✓ |  ~64k ±0.7% ✓ | ~36k ±0.4% ✓ |  ~722k ±3.9% ✓ |
| 0 9 * * *    | ~11043k ±0.5% | ~403k ±0.4% ✓ |  ~88k ±0.4% ✓ | ~36k ±0.3% ✓ |  ~654k ±9.1% ✓ |
| 0 9 15 * 1   |  ~7921k ±0.5% | ~750k ±0.4% ✓ | ~142k ±0.3% ✓ | ~36k ±0.3% ✓ |  ~643k ±9.6% ✓ |
| 0 9 * * 1-5  |  ~6650k ±0.4% | ~407k ±0.5% ✓ |  ~91k ±0.4% ✓ | ~35k ±0.4% ✓ |  ~634k ±6.9% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| * * * * *    |   66 ns / 84 ns | 5,423 ns / 6,958 ns | 22,007 ns / 26,542 ns | 28,347 ns / 39,644 ns | 1,715 ns / 1,958 ns |
| 0 0 1 * *    | 106 ns / 125 ns | 1,624 ns / 2,209 ns |   7,969 ns / 9,875 ns | 28,615 ns / 35,209 ns | 1,446 ns / 2,000 ns |
| 0 12 31 * *  | 122 ns / 167 ns | 1,617 ns / 2,084 ns |   8,243 ns / 9,041 ns | 29,392 ns / 36,084 ns | 1,634 ns / 1,833 ns |
| */15 * * * * | 111 ns / 125 ns | 3,500 ns / 4,042 ns | 15,782 ns / 18,709 ns | 28,269 ns / 35,000 ns | 1,445 ns / 1,750 ns |
| 0 9 * * *    |  97 ns / 125 ns | 2,538 ns / 3,375 ns | 11,573 ns / 14,250 ns | 28,542 ns / 35,125 ns | 1,664 ns / 2,167 ns |
| 0 9 15 * 1   | 135 ns / 167 ns | 1,378 ns / 1,958 ns |   7,169 ns / 9,208 ns | 28,377 ns / 34,541 ns | 1,662 ns / 2,125 ns |
| 0 9 * * 1-5  | 159 ns / 209 ns | 2,521 ns / 3,042 ns | 11,158 ns / 13,125 ns | 28,641 ns / 34,750 ns | 1,663 ns / 2,000 ns |

### Parsing - Throughput (ops/sec)

| Test Case    |      cron-fast | cron-schedule |   cron-parser |       croner |  cron-validate |
| ------------ | -------------: | ------------: | ------------: | -----------: | -------------: |
| * * * * *    |  ~16871k ±0.2% | ~193k ±0.6% ✓ |  ~46k ±0.5% ✓ | ~36k ±0.4% ✓ |  ~642k ±0.5% ✓ |
| 0 0 1 * *    |  ~10878k ±1.0% | ~657k ±0.4% ✓ | ~122k ±0.3% ✓ | ~35k ±0.2% ✓ |  ~632k ±4.3% ✓ |
| 0 12 31 * *  |   ~8844k ±0.7% | ~652k ±1.3% ✓ | ~120k ±0.4% ✓ | ~35k ±0.3% ✓ | ~641k ±10.7% ✓ |
| */15 * * * * |   ~9796k ±0.5% | ~299k ±0.6% ✓ |  ~64k ±0.8% ✓ | ~35k ±0.6% ✓ |  ~717k ±5.3% ✓ |
| 0 9 * * *    | ~10212k ±11.0% | ~416k ±0.3% ✓ |  ~84k ±0.3% ✓ | ~36k ±0.3% ✓ |  ~652k ±1.2% ✓ |
| 0 9 15 * 1   |   ~7969k ±1.4% | ~780k ±0.5% ✓ | ~136k ±0.3% ✓ | ~36k ±0.5% ✓ | ~652k ±14.9% ✓ |
| 0 9 * * 1-5  |   ~6680k ±0.6% | ~410k ±0.5% ✓ |  ~87k ±0.4% ✓ | ~35k ±0.3% ✓ |  ~644k ±9.3% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| * * * * *    |   68 ns / 84 ns | 5,391 ns / 7,041 ns | 21,880 ns / 27,083 ns | 28,005 ns / 34,375 ns | 1,592 ns / 1,958 ns |
| 0 0 1 * *    | 104 ns / 125 ns | 1,560 ns / 2,083 ns |   8,308 ns / 9,542 ns | 28,585 ns / 35,458 ns | 1,648 ns / 2,000 ns |
| 0 12 31 * *  | 122 ns / 167 ns | 1,597 ns / 2,042 ns |   8,503 ns / 9,542 ns | 28,861 ns / 35,041 ns | 1,680 ns / 1,959 ns |
| */15 * * * * | 111 ns / 125 ns | 3,446 ns / 4,041 ns | 15,969 ns / 18,742 ns | 29,669 ns / 37,042 ns | 1,464 ns / 1,792 ns |
| 0 9 * * *    | 220 ns / 291 ns | 2,449 ns / 3,000 ns | 12,035 ns / 14,292 ns | 28,146 ns / 34,916 ns | 1,566 ns / 1,959 ns |
| 0 9 15 * 1   | 134 ns / 167 ns | 1,328 ns / 1,792 ns |   7,449 ns / 8,333 ns | 28,418 ns / 34,791 ns | 1,745 ns / 1,916 ns |
| 0 9 * * 1-5  | 160 ns / 209 ns | 2,507 ns / 3,083 ns | 11,645 ns / 14,209 ns | 28,659 ns / 35,000 ns | 1,690 ns / 1,959 ns |

### Validation Varied Inputs - Throughput (ops/sec)

| Test Case                  |    cron-fast | cron-schedule |   cron-parser |       croner |  cron-validate |
| -------------------------- | -----------: | ------------: | ------------: | -----------: | -------------: |
| varied inputs (anti-cache) | ~8646k ±1.0% | ~535k ±0.5% ✓ | ~121k ±0.4% ✓ | ~36k ±0.5% ✓ | ~590k ±11.7% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation Varied Inputs - Latency (mean / p99)

| Test Case                  |       cron-fast |       cron-schedule |         cron-parser |                croner |       cron-validate |
| -------------------------- | --------------: | ------------------: | ------------------: | --------------------: | ------------------: |
| varied inputs (anti-cache) | 126 ns / 167 ns | 1,944 ns / 2,500 ns | 8,371 ns / 9,333 ns | 28,585 ns / 34,875 ns | 1,869 ns / 2,083 ns |

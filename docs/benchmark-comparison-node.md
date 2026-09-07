# Benchmark

> Tested with node v24.19.0, cron-fast v3.11.0, croner v10.0.1, cron-parser v5.10.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by vitest bench (tinybench).

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2780k      | baseline     |
| cron-schedule | ~345k       | 8.1x faster  |
| cron-parser   | ~35k        | 78.7x faster |
| croner        | ~32k        | 87.3x faster |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~45k        | baseline     |
| cron-schedule | ~15k        | 2.9x faster  |
| cron-parser   | ~1k         | 38.8x faster |
| croner        | ~2k         | 19.3x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2883k      | baseline     |
| cron-schedule | ~365k       | 7.9x faster  |
| cron-parser   | ~40k        | 72.2x faster |
| croner        | ~32k        | 89.6x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~10110k     | baseline      |
| cron-schedule | ~474k       | 21.3x faster  |
| cron-parser   | ~97k        | 104.3x faster |
| croner        | ~34k        | 299.4x faster |
| cron-validate | ~664k       | 15.2x faster  |

### Validation Varied Inputs

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~8605k      | baseline      |
| cron-schedule | ~526k       | 16.4x faster  |
| cron-parser   | ~120k       | 71.5x faster  |
| croner        | ~34k        | 252.2x faster |
| cron-validate | ~618k       | 13.9x faster  |

### Parsing

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~10062k     | baseline      |
| cron-schedule | ~470k       | 21.4x faster  |
| cron-parser   | ~97k        | 103.9x faster |
| croner        | ~35k        | 289.8x faster |
| cron-validate | ~670k       | 15.0x faster  |

Run benchmarks yourself: `pnpm bench`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case    |    cron-fast | cron-schedule |  cron-parser |       croner |
| ------------ | -----------: | ------------: | -----------: | -----------: |
| * * * * *    | ~4473k ±0.4% | ~172k ±0.3% ✓ | ~34k ±0.3% ✓ | ~33k ±6.2% ✓ |
| 0 0 1 * *    | ~2858k ±0.3% | ~461k ±0.2% ✓ | ~20k ±0.4% ✓ | ~33k ±0.4% ✓ |
| 0 12 31 * *  | ~2717k ±0.2% | ~456k ±0.1% ✓ |  ~8k ±0.4% ✓ | ~31k ±0.3% ✓ |
| */15 * * * * | ~2821k ±0.2% | ~261k ±0.3% ✓ | ~56k ±0.3% ✓ | ~32k ±0.5% ✓ |
| 0 9 * * *    | ~2787k ±0.2% | ~334k ±0.5% ✓ | ~45k ±0.3% ✓ | ~34k ±0.3% ✓ |
| 0 9 15 * 1   | ~1649k ±1.8% | ~438k ±0.3% ✓ | ~39k ±0.4% ✓ | ~31k ±3.1% ✓ |
| 0 9 * * 1-5  | ~2153k ±0.9% | ~293k ±0.3% ✓ | ~46k ±0.3% ✓ | ~30k ±0.9% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |             cron-parser |                croner |
| ------------ | --------------: | ------------------: | ----------------------: | --------------------: |
| * * * * *    | 230 ns / 292 ns | 5,982 ns / 7,667 ns |   29,890 ns / 37,208 ns | 31,926 ns / 35,833 ns |
| 0 0 1 * *    | 358 ns / 458 ns | 2,196 ns / 2,792 ns |   51,624 ns / 65,916 ns | 30,975 ns / 37,125 ns |
| 0 12 31 * *  | 375 ns / 459 ns | 2,218 ns / 2,833 ns | 131,946 ns / 195,304 ns | 32,569 ns / 38,082 ns |
| */15 * * * * | 362 ns / 459 ns | 3,907 ns / 4,542 ns |   17,987 ns / 22,125 ns | 31,611 ns / 39,403 ns |
| 0 9 * * *    | 366 ns / 459 ns | 3,051 ns / 3,625 ns |   22,598 ns / 30,042 ns | 30,187 ns / 36,542 ns |
| 0 9 15 * 1   | 649 ns / 875 ns | 2,333 ns / 3,292 ns |   26,624 ns / 48,125 ns | 33,633 ns / 46,250 ns |
| 0 9 * * 1-5  | 480 ns / 666 ns | 3,479 ns / 4,125 ns |   21,932 ns / 27,502 ns | 34,443 ns / 42,083 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case   |  cron-fast | cron-schedule | cron-parser |      croner |
| ----------- | ---------: | ------------: | ----------: | ----------: |
| * * * * *   | ~64k ±0.2% |  ~21k ±0.4% ✓ | ~2k ±0.4% ✓ | ~4k ±0.3% ✓ |
| 0 9 * * 1-5 | ~27k ±0.2% |  ~10k ±0.2% ✓ | ~0k ±0.3% ✓ | ~1k ±0.3% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case   |             cron-fast |          cron-schedule |                 cron-parser |                      croner |
| ----------- | --------------------: | ---------------------: | --------------------------: | --------------------------: |
| * * * * *   | 15,873 ns / 19,250 ns |  48,830 ns / 63,068 ns |     542,326 ns / 708,586 ns |     269,973 ns / 382,522 ns |
| 0 9 * * 1-5 | 37,266 ns / 50,125 ns | 97,847 ns / 120,650 ns | 2,069,319 ns / 2,294,251 ns | 1,027,440 ns / 1,181,800 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case    |    cron-fast | cron-schedule |  cron-parser |       croner |
| ------------ | -----------: | ------------: | -----------: | -----------: |
| * * * * *    | ~4271k ±0.2% | ~169k ±0.4% ✓ | ~37k ±0.3% ✓ | ~33k ±9.3% ✓ |
| 0 0 1 * *    | ~2865k ±0.3% | ~502k ±0.5% ✓ |  ~9k ±0.5% ✓ | ~32k ±6.8% ✓ |
| 0 12 31 * *  | ~2596k ±0.2% | ~434k ±0.3% ✓ |  ~8k ±0.4% ✓ | ~31k ±5.1% ✓ |
| */15 * * * * | ~2755k ±0.3% | ~260k ±0.3% ✓ | ~58k ±0.2% ✓ | ~33k ±0.3% ✓ |
| 0 9 * * *    | ~2837k ±0.2% | ~342k ±1.6% ✓ | ~50k ±0.3% ✓ | ~33k ±0.4% ✓ |
| 0 9 15 * 1   | ~2570k ±0.3% | ~524k ±0.3% ✓ | ~65k ±0.4% ✓ | ~32k ±0.4% ✓ |
| 0 9 * * 1-5  | ~2284k ±0.3% | ~322k ±1.4% ✓ | ~52k ±0.3% ✓ | ~31k ±5.5% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |             cron-parser |                croner |
| ------------ | --------------: | ------------------: | ----------------------: | --------------------: |
| * * * * *    | 240 ns / 333 ns | 6,129 ns / 8,125 ns |   27,679 ns / 35,072 ns | 32,713 ns / 38,541 ns |
| 0 0 1 * *    | 358 ns / 459 ns | 2,054 ns / 2,708 ns | 109,201 ns / 150,286 ns | 33,034 ns / 38,303 ns |
| 0 12 31 * *  | 393 ns / 500 ns | 2,350 ns / 2,917 ns | 119,634 ns / 176,776 ns | 33,422 ns / 40,159 ns |
| */15 * * * * | 370 ns / 459 ns | 3,907 ns / 4,583 ns |   17,497 ns / 20,792 ns | 30,611 ns / 36,875 ns |
| 0 9 * * *    | 358 ns / 458 ns | 3,022 ns / 3,792 ns |   20,437 ns / 28,500 ns | 30,964 ns / 46,250 ns |
| 0 9 15 * 1   | 399 ns / 500 ns | 1,950 ns / 2,500 ns |   15,658 ns / 25,181 ns | 31,737 ns / 43,573 ns |
| 0 9 * * 1-5  | 448 ns / 584 ns | 3,183 ns / 3,792 ns |   19,438 ns / 24,417 ns | 34,397 ns / 41,875 ns |

### Validation - Throughput (ops/sec)

| Test Case    |     cron-fast | cron-schedule |   cron-parser |       croner |  cron-validate |
| ------------ | ------------: | ------------: | ------------: | -----------: | -------------: |
| * * * * *    | ~16418k ±0.2% | ~184k ±0.7% ✓ |  ~44k ±0.6% ✓ | ~33k ±1.6% ✓ |  ~606k ±8.7% ✓ |
| 0 0 1 * *    | ~10623k ±1.0% | ~632k ±0.4% ✓ | ~127k ±0.4% ✓ | ~35k ±0.3% ✓ |  ~697k ±3.5% ✓ |
| 0 12 31 * *  |  ~8626k ±0.7% | ~631k ±0.6% ✓ | ~121k ±1.8% ✓ | ~34k ±0.6% ✓ | ~686k ±13.1% ✓ |
| */15 * * * * |  ~9406k ±0.6% | ~292k ±0.5% ✓ |  ~68k ±2.0% ✓ | ~33k ±0.6% ✓ |  ~704k ±0.4% ✓ |
| 0 9 * * *    | ~10993k ±3.6% | ~406k ±0.4% ✓ |  ~87k ±1.1% ✓ | ~34k ±0.5% ✓ |  ~649k ±7.1% ✓ |
| 0 9 15 * 1   |  ~7997k ±2.7% | ~766k ±0.5% ✓ | ~141k ±0.4% ✓ | ~34k ±0.4% ✓ |  ~659k ±9.4% ✓ |
| 0 9 * * 1-5  |  ~6704k ±0.5% | ~406k ±0.6% ✓ |  ~91k ±0.4% ✓ | ~34k ±0.4% ✓ | ~645k ±10.5% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| * * * * *    |   70 ns / 84 ns | 5,697 ns / 7,791 ns | 23,430 ns / 36,601 ns | 32,836 ns / 60,436 ns | 1,915 ns / 2,958 ns |
| 0 0 1 * *    | 107 ns / 167 ns | 1,625 ns / 2,250 ns |  8,036 ns / 11,000 ns | 29,306 ns / 39,348 ns | 1,496 ns / 2,084 ns |
| 0 12 31 * *  | 125 ns / 167 ns | 1,647 ns / 2,208 ns |  8,616 ns / 11,417 ns | 30,653 ns / 38,699 ns | 1,592 ns / 1,875 ns |
| */15 * * * * | 117 ns / 167 ns | 3,524 ns / 4,375 ns | 15,081 ns / 17,958 ns | 31,448 ns / 47,960 ns | 1,453 ns / 1,875 ns |
| 0 9 * * *    | 100 ns / 125 ns | 2,524 ns / 3,334 ns | 11,725 ns / 15,000 ns | 30,370 ns / 45,197 ns | 1,651 ns / 2,209 ns |
| 0 9 15 * 1   | 136 ns / 208 ns | 1,349 ns / 1,875 ns |   7,233 ns / 9,041 ns | 29,807 ns / 38,334 ns | 1,651 ns / 1,959 ns |
| 0 9 * * 1-5  | 159 ns / 250 ns | 2,542 ns / 3,375 ns | 11,206 ns / 14,167 ns | 29,884 ns / 39,041 ns | 1,692 ns / 2,000 ns |

### Parsing - Throughput (ops/sec)

| Test Case    |     cron-fast | cron-schedule |   cron-parser |       croner |  cron-validate |
| ------------ | ------------: | ------------: | ------------: | -----------: | -------------: |
| * * * * *    | ~16639k ±0.2% | ~184k ±0.7% ✓ |  ~45k ±0.6% ✓ | ~35k ±0.6% ✓ | ~639k ±13.7% ✓ |
| 0 0 1 * *    | ~10674k ±1.1% | ~621k ±1.3% ✓ | ~127k ±0.3% ✓ | ~35k ±0.3% ✓ |  ~699k ±2.7% ✓ |
| 0 12 31 * *  |  ~8453k ±0.8% | ~629k ±0.6% ✓ | ~124k ±2.3% ✓ | ~35k ±0.5% ✓ | ~672k ±16.3% ✓ |
| */15 * * * * |  ~9421k ±0.5% | ~291k ±0.5% ✓ |  ~67k ±0.4% ✓ | ~35k ±0.4% ✓ |  ~709k ±2.4% ✓ |
| 0 9 * * *    | ~10948k ±0.6% | ~406k ±0.5% ✓ |  ~87k ±0.4% ✓ | ~35k ±0.5% ✓ |  ~654k ±0.4% ✓ |
| 0 9 15 * 1   |  ~7722k ±0.7% | ~752k ±0.6% ✓ | ~140k ±1.5% ✓ | ~35k ±0.4% ✓ | ~672k ±13.4% ✓ |
| 0 9 * * 1-5  |  ~6575k ±0.6% | ~405k ±0.5% ✓ |  ~89k ±0.8% ✓ | ~35k ±0.4% ✓ | ~647k ±10.6% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| * * * * *    |   69 ns / 84 ns | 5,668 ns / 7,084 ns | 22,569 ns / 28,622 ns | 29,654 ns / 36,416 ns | 1,767 ns / 1,959 ns |
| 0 0 1 * *    | 108 ns / 167 ns | 1,670 ns / 2,333 ns |  8,006 ns / 10,458 ns | 29,137 ns / 37,742 ns | 1,481 ns / 2,125 ns |
| 0 12 31 * *  | 127 ns / 167 ns | 1,647 ns / 2,209 ns |  8,386 ns / 11,166 ns | 29,254 ns / 39,471 ns | 1,715 ns / 1,917 ns |
| */15 * * * * | 115 ns / 167 ns | 3,535 ns / 4,208 ns | 15,299 ns / 19,500 ns | 29,621 ns / 39,434 ns | 1,455 ns / 1,916 ns |
| 0 9 * * *    |  99 ns / 125 ns | 2,530 ns / 3,208 ns | 11,623 ns / 14,292 ns | 29,428 ns / 36,967 ns | 1,556 ns / 1,958 ns |
| 0 9 15 * 1   | 141 ns / 209 ns | 1,391 ns / 2,000 ns |   7,389 ns / 9,500 ns | 29,353 ns / 35,680 ns | 1,679 ns / 1,917 ns |
| 0 9 * * 1-5  | 163 ns / 209 ns | 2,541 ns / 3,125 ns | 11,501 ns / 13,834 ns | 29,559 ns / 35,959 ns | 1,699 ns / 1,959 ns |

### Validation Varied Inputs - Throughput (ops/sec)

| Test Case                  |    cron-fast | cron-schedule |   cron-parser |       croner |  cron-validate |
| -------------------------- | -----------: | ------------: | ------------: | -----------: | -------------: |
| varied inputs (anti-cache) | ~8605k ±1.3% | ~526k ±0.6% ✓ | ~120k ±0.4% ✓ | ~34k ±0.6% ✓ | ~618k ±14.4% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation Varied Inputs - Latency (mean / p99)

| Test Case                  |       cron-fast |       cron-schedule |          cron-parser |                croner |       cron-validate |
| -------------------------- | --------------: | ------------------: | -------------------: | --------------------: | ------------------: |
| varied inputs (anti-cache) | 128 ns / 167 ns | 1,992 ns / 2,709 ns | 8,521 ns / 11,959 ns | 30,147 ns / 40,054 ns | 1,836 ns / 2,084 ns |

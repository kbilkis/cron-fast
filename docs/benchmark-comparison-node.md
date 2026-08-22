# Benchmark

> Tested with node v24.19.0, cron-fast v3.9.0, croner v10.0.1, cron-parser v5.10.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by vitest bench (tinybench).

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2137k      | baseline     |
| cron-schedule | ~329k       | 6.5x faster  |
| cron-parser   | ~34k        | 62.2x faster |
| croner        | ~30k        | 70.4x faster |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~43k        | baseline     |
| cron-schedule | ~15k        | 2.8x faster  |
| cron-parser   | ~1k         | 35.2x faster |
| croner        | ~2k         | 18.0x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2249k      | baseline     |
| cron-schedule | ~350k       | 6.4x faster  |
| cron-parser   | ~39k        | 57.9x faster |
| croner        | ~30k        | 73.9x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~5965k      | baseline      |
| cron-schedule | ~445k       | 13.4x faster  |
| cron-parser   | ~88k        | 67.6x faster  |
| croner        | ~33k        | 182.1x faster |
| cron-validate | ~619k       | 9.6x faster   |

### Validation Varied Inputs

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~5952k      | baseline      |
| cron-schedule | ~473k       | 12.6x faster  |
| cron-parser   | ~118k       | 50.5x faster  |
| croner        | ~35k        | 170.6x faster |
| cron-validate | ~618k       | 9.6x faster   |

### Parsing

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~6117k      | baseline      |
| cron-schedule | ~448k       | 13.7x faster  |
| cron-parser   | ~94k        | 65.0x faster  |
| croner        | ~34k        | 181.4x faster |
| cron-validate | ~638k       | 9.6x faster   |

Run benchmarks yourself: `pnpm bench`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case    |    cron-fast | cron-schedule |  cron-parser |       croner |
| ------------ | -----------: | ------------: | -----------: | -----------: |
| * * * * *    | ~3509k ±0.4% | ~140k ±0.4% ✓ | ~33k ±0.4% ✓ | ~32k ±1.0% ✓ |
| 0 0 1 * *    | ~2317k ±0.2% | ~436k ±0.4% ✓ | ~19k ±0.5% ✓ | ~32k ±1.2% ✓ |
| 0 12 31 * *  | ~2138k ±0.2% | ~445k ±0.4% ✓ |  ~8k ±0.4% ✓ | ~30k ±1.0% ✓ |
| */15 * * * * | ~1805k ±0.4% | ~248k ±0.6% ✓ | ~55k ±0.5% ✓ | ~30k ±5.3% ✓ |
| 0 9 * * *    | ~2207k ±0.5% | ~325k ±0.5% ✓ | ~43k ±0.5% ✓ | ~30k ±1.9% ✓ |
| 0 9 15 * 1   | ~1455k ±0.3% | ~432k ±0.4% ✓ | ~39k ±0.4% ✓ | ~30k ±1.7% ✓ |
| 0 9 * * 1-5  | ~1527k ±0.4% | ~277k ±0.5% ✓ | ~44k ±0.4% ✓ | ~28k ±0.5% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case    |         cron-fast |       cron-schedule |             cron-parser |                croner |
| ------------ | ----------------: | ------------------: | ----------------------: | --------------------: |
| * * * * *    |   285 ns / 375 ns | 7,137 ns / 8,208 ns |   30,623 ns / 40,958 ns | 30,910 ns / 41,209 ns |
| 0 0 1 * *    |   432 ns / 542 ns | 2,292 ns / 2,959 ns |   53,952 ns / 83,709 ns | 31,276 ns / 37,833 ns |
| 0 12 31 * *  |   468 ns / 625 ns | 2,249 ns / 2,792 ns | 128,672 ns / 173,458 ns | 33,819 ns / 46,125 ns |
| */15 * * * * |   554 ns / 750 ns | 4,034 ns / 4,916 ns |   18,064 ns / 23,750 ns | 32,839 ns / 75,750 ns |
| 0 9 * * *    |   453 ns / 584 ns | 3,080 ns / 3,750 ns |   23,152 ns / 30,083 ns | 33,168 ns / 43,791 ns |
| 0 9 15 * 1   |   687 ns / 834 ns | 2,316 ns / 2,875 ns |   25,932 ns / 32,958 ns | 33,704 ns / 50,709 ns |
| 0 9 * * 1-5  | 655 ns / 1,000 ns | 3,614 ns / 5,000 ns |   22,608 ns / 28,083 ns | 35,479 ns / 59,292 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case   |  cron-fast | cron-schedule | cron-parser |      croner |
| ----------- | ---------: | ------------: | ----------: | ----------: |
| * * * * *   | ~62k ±0.3% |  ~21k ±0.3% ✓ | ~2k ±0.4% ✓ | ~4k ±0.3% ✓ |
| 0 9 * * 1-5 | ~23k ±0.3% |  ~10k ±0.3% ✓ | ~1k ±0.5% ✓ | ~1k ±0.3% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case   |             cron-fast |           cron-schedule |                 cron-parser |                      croner |
| ----------- | --------------------: | ----------------------: | --------------------------: | --------------------------: |
| * * * * *   | 16,037 ns / 20,083 ns |   48,761 ns / 67,375 ns |     517,698 ns / 629,958 ns |     266,043 ns / 356,250 ns |
| 0 9 * * 1-5 | 43,119 ns / 50,667 ns | 100,430 ns / 123,125 ns | 1,996,322 ns / 2,289,042 ns | 1,018,575 ns / 1,155,959 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case    |    cron-fast | cron-schedule |  cron-parser |       croner |
| ------------ | -----------: | ------------: | -----------: | -----------: |
| * * * * *    | ~3318k ±1.0% | ~134k ±0.5% ✓ | ~35k ±0.5% ✓ | ~29k ±3.7% ✓ |
| 0 0 1 * *    | ~2424k ±0.2% | ~499k ±0.5% ✓ |  ~9k ±0.5% ✓ | ~31k ±0.5% ✓ |
| 0 12 31 * *  | ~2069k ±0.3% | ~409k ±0.4% ✓ |  ~8k ±0.7% ✓ | ~29k ±0.6% ✓ |
| */15 * * * * | ~1780k ±0.6% | ~255k ±0.4% ✓ | ~57k ±0.4% ✓ | ~33k ±3.0% ✓ |
| 0 9 * * *    | ~2391k ±0.3% | ~333k ±0.6% ✓ | ~47k ±0.6% ✓ | ~28k ±3.2% ✓ |
| 0 9 15 * 1   | ~2179k ±0.4% | ~506k ±0.5% ✓ | ~65k ±0.5% ✓ | ~33k ±0.4% ✓ |
| 0 9 * * 1-5  | ~1584k ±1.5% | ~312k ±0.5% ✓ | ~50k ±0.4% ✓ | ~30k ±1.9% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |             cron-parser |                 croner |
| ------------ | --------------: | ------------------: | ----------------------: | ---------------------: |
| * * * * *    | 301 ns / 417 ns | 7,485 ns / 8,709 ns |   28,825 ns / 43,875 ns |  34,391 ns / 67,542 ns |
| 0 0 1 * *    | 413 ns / 542 ns | 2,005 ns / 2,541 ns | 107,235 ns / 149,083 ns |  31,862 ns / 39,125 ns |
| 0 12 31 * *  | 483 ns / 625 ns | 2,445 ns / 3,750 ns | 117,755 ns / 190,125 ns |  34,381 ns / 53,083 ns |
| */15 * * * * | 562 ns / 750 ns | 3,918 ns / 4,583 ns |   17,643 ns / 20,917 ns |  30,739 ns / 37,792 ns |
| 0 9 * * *    | 418 ns / 542 ns | 3,002 ns / 3,750 ns |   21,288 ns / 28,959 ns | 35,336 ns / 101,833 ns |
| 0 9 15 * 1   | 459 ns / 625 ns | 1,977 ns / 2,958 ns |   15,275 ns / 19,958 ns |  30,761 ns / 37,125 ns |
| 0 9 * * 1-5  | 631 ns / 917 ns | 3,200 ns / 3,958 ns |   19,920 ns / 25,916 ns |  33,128 ns / 56,667 ns |

### Validation - Throughput (ops/sec)

| Test Case    |    cron-fast | cron-schedule |   cron-parser |       croner |  cron-validate |
| ------------ | -----------: | ------------: | ------------: | -----------: | -------------: |
| * * * * *    | ~8707k ±0.2% | ~152k ±0.5% ✓ |  ~38k ±2.4% ✓ | ~35k ±0.5% ✓ |  ~620k ±0.4% ✓ |
| 0 0 1 * *    | ~7403k ±0.1% | ~582k ±0.7% ✓ |  ~91k ±5.0% ✓ | ~29k ±2.9% ✓ |  ~638k ±0.5% ✓ |
| 0 12 31 * *  | ~5424k ±4.1% | ~596k ±0.5% ✓ | ~117k ±0.5% ✓ | ~31k ±0.7% ✓ | ~582k ±10.3% ✓ |
| */15 * * * * | ~3637k ±0.4% | ~280k ±0.4% ✓ |  ~67k ±0.4% ✓ | ~35k ±0.4% ✓ |  ~657k ±0.9% ✓ |
| 0 9 * * *    | ~7491k ±0.3% | ~388k ±0.5% ✓ |  ~82k ±0.5% ✓ | ~32k ±0.5% ✓ |  ~592k ±4.6% ✓ |
| 0 9 15 * 1   | ~5833k ±0.1% | ~740k ±0.4% ✓ | ~136k ±0.4% ✓ | ~35k ±0.4% ✓ |  ~646k ±0.4% ✓ |
| 0 9 * * 1-5  | ~3261k ±0.6% | ~378k ±0.6% ✓ |  ~86k ±0.5% ✓ | ~32k ±0.7% ✓ |  ~600k ±0.4% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |            cron-parser |                croner |       cron-validate |
| ------------ | --------------: | ------------------: | ---------------------: | --------------------: | ------------------: |
| * * * * *    | 115 ns / 208 ns | 6,585 ns / 8,958 ns | 26,361 ns / 104,125 ns | 28,545 ns / 37,791 ns | 1,612 ns / 2,042 ns |
| 0 0 1 * *    | 135 ns / 167 ns | 1,718 ns / 2,750 ns |  11,005 ns / 42,125 ns | 34,720 ns / 88,541 ns | 1,568 ns / 2,125 ns |
| 0 12 31 * *  | 184 ns / 250 ns | 1,677 ns / 2,541 ns |   8,526 ns / 10,292 ns | 31,926 ns / 51,334 ns | 1,719 ns / 2,291 ns |
| */15 * * * * | 275 ns / 417 ns | 3,566 ns / 4,417 ns |  14,849 ns / 18,125 ns | 28,457 ns / 35,000 ns | 1,521 ns / 2,208 ns |
| 0 9 * * *    | 133 ns / 167 ns | 2,575 ns / 3,375 ns |  12,157 ns / 16,542 ns | 30,970 ns / 44,875 ns | 1,689 ns / 2,667 ns |
| 0 9 15 * 1   | 171 ns / 250 ns | 1,351 ns / 1,875 ns |   7,333 ns / 12,000 ns | 28,814 ns / 35,709 ns | 1,549 ns / 2,166 ns |
| 0 9 * * 1-5  | 307 ns / 583 ns | 2,647 ns / 3,625 ns |  11,695 ns / 15,417 ns | 31,291 ns / 39,209 ns | 1,667 ns / 2,208 ns |

### Parsing - Throughput (ops/sec)

| Test Case    |    cron-fast | cron-schedule |   cron-parser |       croner | cron-validate |
| ------------ | -----------: | ------------: | ------------: | -----------: | ------------: |
| * * * * *    | ~8951k ±1.1% | ~158k ±0.4% ✓ |  ~44k ±0.4% ✓ | ~36k ±0.4% ✓ | ~591k ±3.5% ✓ |
| 0 0 1 * *    | ~7289k ±0.1% | ~595k ±0.5% ✓ | ~117k ±0.5% ✓ | ~33k ±0.5% ✓ | ~641k ±0.5% ✓ |
| 0 12 31 * *  | ~6424k ±0.1% | ~613k ±0.6% ✓ | ~121k ±0.5% ✓ | ~33k ±0.6% ✓ | ~663k ±0.4% ✓ |
| */15 * * * * | ~3612k ±0.6% | ~267k ±6.8% ✓ |  ~65k ±0.3% ✓ | ~33k ±0.5% ✓ | ~660k ±0.5% ✓ |
| 0 9 * * *    | ~7476k ±0.7% | ~403k ±0.4% ✓ |  ~87k ±0.4% ✓ | ~34k ±0.5% ✓ | ~645k ±0.3% ✓ |
| 0 9 15 * 1   | ~5803k ±0.2% | ~701k ±0.6% ✓ | ~138k ±0.4% ✓ | ~34k ±0.5% ✓ | ~649k ±0.4% ✓ |
| 0 9 * * 1-5  | ~3262k ±0.8% | ~397k ±0.6% ✓ |  ~88k ±0.5% ✓ | ~33k ±0.7% ✓ | ~618k ±0.5% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| * * * * *    | 112 ns / 167 ns | 6,348 ns / 7,417 ns | 22,890 ns / 32,416 ns | 28,019 ns / 35,208 ns | 1,693 ns / 2,542 ns |
| 0 0 1 * *    | 137 ns / 208 ns | 1,680 ns / 2,333 ns |  8,558 ns / 12,292 ns | 30,263 ns / 40,417 ns | 1,559 ns / 2,541 ns |
| 0 12 31 * *  | 156 ns / 208 ns | 1,633 ns / 2,167 ns |  8,295 ns / 10,791 ns | 30,071 ns / 37,375 ns | 1,508 ns / 1,916 ns |
| */15 * * * * | 277 ns / 417 ns | 3,745 ns / 4,333 ns | 15,292 ns / 18,708 ns | 30,031 ns / 41,500 ns | 1,516 ns / 2,625 ns |
| 0 9 * * *    | 134 ns / 167 ns | 2,484 ns / 3,083 ns | 11,524 ns / 12,959 ns | 29,513 ns / 39,917 ns | 1,551 ns / 1,958 ns |
| 0 9 15 * 1   | 172 ns / 291 ns | 1,426 ns / 1,959 ns |   7,256 ns / 8,292 ns | 29,115 ns / 35,959 ns | 1,540 ns / 2,000 ns |
| 0 9 * * 1-5  | 307 ns / 583 ns | 2,518 ns / 3,042 ns | 11,395 ns / 13,500 ns | 30,744 ns / 47,291 ns | 1,617 ns / 2,042 ns |

### Validation Varied Inputs - Throughput (ops/sec)

| Test Case                  |    cron-fast | cron-schedule |   cron-parser |       croner | cron-validate |
| -------------------------- | -----------: | ------------: | ------------: | -----------: | ------------: |
| varied inputs (anti-cache) | ~5952k ±0.2% | ~473k ±0.5% ✓ | ~118k ±0.4% ✓ | ~35k ±0.4% ✓ | ~618k ±0.3% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation Varied Inputs - Latency (mean / p99)

| Test Case                  |       cron-fast |       cron-schedule |          cron-parser |                croner |       cron-validate |
| -------------------------- | --------------: | ------------------: | -------------------: | --------------------: | ------------------: |
| varied inputs (anti-cache) | 168 ns / 292 ns | 2,114 ns / 2,959 ns | 8,487 ns / 11,792 ns | 28,660 ns / 35,583 ns | 1,619 ns / 2,041 ns |

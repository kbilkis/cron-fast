# Benchmark

> Tested with node v24.19.0, cron-fast v3.5.0, croner v10.0.1, cron-parser v5.7.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by vitest bench (tinybench).

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1494k      | baseline     |
| cron-schedule | ~324k       | 4.6x faster  |
| cron-parser   | ~34k        | 44.1x faster |
| croner        | ~30k        | 50.0x faster |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~31k        | baseline     |
| cron-schedule | ~15k        | 2.0x faster  |
| cron-parser   | ~1k         | 25.6x faster |
| croner        | ~2k         | 13.2x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1701k      | baseline     |
| cron-schedule | ~345k       | 4.9x faster  |
| cron-parser   | ~38k        | 45.3x faster |
| croner        | ~31k        | 55.7x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~4886k      | baseline      |
| cron-schedule | ~454k       | 10.8x faster  |
| cron-parser   | ~95k        | 51.5x faster  |
| croner        | ~34k        | 145.2x faster |
| cron-validate | ~637k       | 7.7x faster   |

### Validation Varied Inputs

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~4293k      | baseline      |
| cron-schedule | ~477k       | 9.0x faster   |
| cron-parser   | ~115k       | 37.4x faster  |
| croner        | ~33k        | 128.5x faster |
| cron-validate | ~615k       | 7.0x faster   |

### Parsing

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~5273k      | baseline      |
| cron-schedule | ~453k       | 11.6x faster  |
| cron-parser   | ~101k       | 52.5x faster  |
| croner        | ~33k        | 159.7x faster |
| cron-validate | ~622k       | 8.5x faster   |

Run benchmarks yourself: `pnpm bench`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case    |    cron-fast | cron-schedule |  cron-parser |       croner |
| ------------ | -----------: | ------------: | -----------: | -----------: |
| * * * * *    | ~3035k ±2.1% | ~137k ±0.5% ✓ | ~33k ±0.4% ✓ | ~30k ±2.6% ✓ |
| 0 0 1 * *    | ~1265k ±0.4% | ~432k ±0.6% ✓ | ~19k ±0.6% ✓ | ~29k ±0.7% ✓ |
| 0 12 31 * *  | ~1206k ±0.5% | ~447k ±0.4% ✓ |  ~8k ±0.5% ✓ | ~30k ±1.5% ✓ |
| */15 * * * * | ~1584k ±0.3% | ~246k ±0.5% ✓ | ~54k ±0.8% ✓ | ~32k ±1.0% ✓ |
| 0 9 * * *    | ~1505k ±0.2% | ~307k ±0.6% ✓ | ~41k ±0.7% ✓ | ~30k ±0.7% ✓ |
| 0 9 15 * 1   |  ~666k ±0.9% | ~420k ±0.5% ✓ | ~38k ±0.7% ✓ | ~30k ±1.5% ✓ |
| 0 9 * * 1-5  | ~1198k ±0.4% | ~281k ±0.4% ✓ | ~44k ±0.5% ✓ | ~29k ±1.2% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case    |           cron-fast |        cron-schedule |             cron-parser |                croner |
| ------------ | ------------------: | -------------------: | ----------------------: | --------------------: |
| * * * * *    |     329 ns / 417 ns | 7,294 ns / 10,000 ns |   30,467 ns / 46,250 ns | 32,927 ns / 68,583 ns |
| 0 0 1 * *    |   791 ns / 1,000 ns |  2,316 ns / 3,166 ns |  54,046 ns / 103,625 ns | 35,012 ns / 65,125 ns |
| 0 12 31 * *  |   829 ns / 1,291 ns |  2,237 ns / 2,792 ns | 129,376 ns / 179,792 ns | 33,536 ns / 48,708 ns |
| */15 * * * * |     631 ns / 792 ns |  4,065 ns / 5,000 ns |   18,387 ns / 24,000 ns | 31,333 ns / 52,333 ns |
| 0 9 * * *    |     664 ns / 833 ns |  3,256 ns / 4,125 ns |   24,436 ns / 42,417 ns | 33,504 ns / 57,583 ns |
| 0 9 15 * 1   | 1,502 ns / 2,083 ns |  2,383 ns / 3,042 ns |   26,120 ns / 39,750 ns | 33,649 ns / 55,042 ns |
| 0 9 * * 1-5  |   835 ns / 1,250 ns |  3,563 ns / 4,333 ns |   22,534 ns / 34,250 ns | 34,523 ns / 52,375 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case   |  cron-fast | cron-schedule | cron-parser |      croner |
| ----------- | ---------: | ------------: | ----------: | ----------: |
| * * * * *   | ~46k ±0.3% |  ~20k ±0.3% ✓ | ~2k ±0.4% ✓ | ~4k ±0.3% ✓ |
| 0 9 * * 1-5 | ~15k ±0.3% |  ~10k ±0.4% ✓ | ~0k ±0.6% ✓ | ~1k ±0.3% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case   |             cron-fast |          cron-schedule |                 cron-parser |                      croner |
| ----------- | --------------------: | ---------------------: | --------------------------: | --------------------------: |
| * * * * *   | 21,686 ns / 27,833 ns |  48,946 ns / 61,417 ns |     519,880 ns / 660,709 ns |     271,201 ns / 377,792 ns |
| 0 9 * * 1-5 | 64,896 ns / 79,709 ns | 99,902 ns / 132,333 ns | 2,077,648 ns / 2,342,208 ns | 1,025,284 ns / 1,196,417 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case    |    cron-fast | cron-schedule |  cron-parser |       croner |
| ------------ | -----------: | ------------: | -----------: | -----------: |
| * * * * *    | ~3148k ±0.8% | ~123k ±0.6% ✓ | ~32k ±0.6% ✓ | ~32k ±1.2% ✓ |
| 0 0 1 * *    | ~1443k ±0.3% | ~484k ±0.4% ✓ |  ~9k ±0.6% ✓ | ~28k ±0.7% ✓ |
| 0 12 31 * *  | ~1264k ±1.0% | ~425k ±0.2% ✓ |  ~8k ±0.5% ✓ | ~31k ±0.9% ✓ |
| */15 * * * * | ~1578k ±1.1% | ~244k ±0.4% ✓ | ~53k ±0.6% ✓ | ~31k ±0.5% ✓ |
| 0 9 * * *    | ~1643k ±0.3% | ~336k ±0.4% ✓ | ~49k ±0.4% ✓ | ~31k ±1.4% ✓ |
| 0 9 15 * 1   | ~1539k ±0.4% | ~490k ±0.4% ✓ | ~65k ±0.4% ✓ | ~32k ±0.3% ✓ |
| 0 9 * * 1-5  | ~1291k ±0.5% | ~310k ±0.4% ✓ | ~47k ±1.1% ✓ | ~28k ±6.4% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case    |         cron-fast |        cron-schedule |             cron-parser |                croner |
| ------------ | ----------------: | -------------------: | ----------------------: | --------------------: |
| * * * * *    |   318 ns / 417 ns | 8,148 ns / 16,583 ns |   31,327 ns / 79,000 ns | 31,335 ns / 63,584 ns |
| 0 0 1 * *    |   693 ns / 958 ns |  2,066 ns / 2,667 ns | 115,900 ns / 203,667 ns | 35,280 ns / 61,250 ns |
| 0 12 31 * *  | 791 ns / 1,000 ns |  2,354 ns / 2,958 ns | 119,882 ns / 205,208 ns | 32,053 ns / 41,166 ns |
| */15 * * * * |   634 ns / 792 ns |  4,092 ns / 5,042 ns |   18,832 ns / 27,750 ns | 32,342 ns / 56,916 ns |
| 0 9 * * *    |   609 ns / 750 ns |  2,977 ns / 3,708 ns |   20,423 ns / 26,417 ns | 31,931 ns / 47,667 ns |
| 0 9 15 * 1   | 650 ns / 1,000 ns |  2,039 ns / 2,750 ns |   15,457 ns / 18,917 ns | 31,231 ns / 37,583 ns |
| 0 9 * * 1-5  | 775 ns / 1,292 ns |  3,221 ns / 4,000 ns |   21,276 ns / 43,583 ns | 35,842 ns / 61,417 ns |

### Validation - Throughput (ops/sec)

| Test Case    |    cron-fast | cron-schedule |   cron-parser |       croner | cron-validate |
| ------------ | -----------: | ------------: | ------------: | -----------: | ------------: |
| * * * * *    | ~8808k ±0.2% | ~153k ±0.5% ✓ |  ~45k ±0.4% ✓ | ~35k ±0.4% ✓ | ~611k ±0.4% ✓ |
| 0 0 1 * *    | ~4663k ±0.6% | ~595k ±0.5% ✓ | ~121k ±0.5% ✓ | ~32k ±0.5% ✓ | ~652k ±0.4% ✓ |
| 0 12 31 * *  | ~4590k ±0.5% | ~617k ±0.5% ✓ | ~123k ±0.4% ✓ | ~35k ±0.4% ✓ | ~643k ±0.4% ✓ |
| */15 * * * * | ~3945k ±0.8% | ~278k ±0.5% ✓ |  ~67k ±0.4% ✓ | ~34k ±0.4% ✓ | ~675k ±0.4% ✓ |
| 0 9 * * *    | ~5671k ±0.4% | ~398k ±0.5% ✓ |  ~83k ±0.6% ✓ | ~32k ±0.7% ✓ | ~625k ±0.4% ✓ |
| 0 9 15 * 1   | ~3615k ±0.8% | ~750k ±0.4% ✓ | ~139k ±0.3% ✓ | ~34k ±0.4% ✓ | ~627k ±4.2% ✓ |
| 0 9 * * 1-5  | ~2910k ±0.5% | ~385k ±0.5% ✓ |  ~86k ±0.5% ✓ | ~33k ±0.5% ✓ | ~626k ±0.3% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| * * * * *    | 114 ns / 208 ns | 6,541 ns / 9,166 ns | 22,342 ns / 28,500 ns | 28,236 ns / 35,042 ns | 1,637 ns / 2,042 ns |
| 0 0 1 * *    | 214 ns / 375 ns | 1,681 ns / 2,583 ns |  8,264 ns / 10,000 ns | 31,036 ns / 44,458 ns | 1,535 ns / 2,167 ns |
| 0 12 31 * *  | 218 ns / 334 ns | 1,621 ns / 2,125 ns |  8,113 ns / 10,500 ns | 28,820 ns / 44,583 ns | 1,554 ns / 1,958 ns |
| */15 * * * * | 253 ns / 458 ns | 3,603 ns / 4,791 ns | 14,851 ns / 18,167 ns | 29,546 ns / 42,167 ns | 1,482 ns / 2,000 ns |
| 0 9 * * *    | 176 ns / 250 ns | 2,512 ns / 3,125 ns | 12,036 ns / 15,209 ns | 31,273 ns / 49,833 ns | 1,600 ns / 2,000 ns |
| 0 9 15 * 1   | 277 ns / 750 ns | 1,334 ns / 1,791 ns |   7,204 ns / 8,541 ns | 29,093 ns / 37,709 ns | 1,595 ns / 2,041 ns |
| 0 9 * * 1-5  | 344 ns / 708 ns | 2,595 ns / 3,333 ns | 11,627 ns / 15,042 ns | 30,358 ns / 39,083 ns | 1,597 ns / 2,000 ns |

### Parsing - Throughput (ops/sec)

| Test Case    |     cron-fast | cron-schedule |   cron-parser |       croner | cron-validate |
| ------------ | ------------: | ------------: | ------------: | -----------: | ------------: |
| * * * * *    | ~10376k ±1.3% | ~156k ±0.4% ✓ |  ~47k ±0.3% ✓ | ~33k ±0.5% ✓ | ~553k ±5.9% ✓ |
| 0 0 1 * *    |  ~4888k ±0.5% | ~629k ±0.4% ✓ | ~132k ±0.3% ✓ | ~33k ±0.5% ✓ | ~546k ±8.6% ✓ |
| 0 12 31 * *  |  ~4804k ±0.5% | ~600k ±0.6% ✓ | ~129k ±0.4% ✓ | ~34k ±0.4% ✓ | ~657k ±0.4% ✓ |
| */15 * * * * |  ~4234k ±0.8% | ~286k ±0.5% ✓ |  ~70k ±0.4% ✓ | ~33k ±0.6% ✓ | ~706k ±0.4% ✓ |
| 0 9 * * *    |  ~5744k ±0.6% | ~393k ±0.5% ✓ |  ~88k ±0.6% ✓ | ~33k ±0.5% ✓ | ~623k ±0.4% ✓ |
| 0 9 15 * 1   |  ~4000k ±0.7% | ~728k ±0.5% ✓ | ~143k ±0.5% ✓ | ~32k ±0.6% ✓ | ~662k ±0.4% ✓ |
| 0 9 * * 1-5  |  ~2863k ±0.8% | ~379k ±7.6% ✓ |  ~94k ±0.4% ✓ | ~32k ±2.8% ✓ | ~607k ±0.5% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| * * * * *    |  96 ns / 125 ns | 6,396 ns / 7,542 ns | 21,075 ns / 26,167 ns | 30,026 ns / 47,209 ns | 1,809 ns / 2,458 ns |
| 0 0 1 * *    | 205 ns / 334 ns | 1,591 ns / 2,084 ns |   7,563 ns / 9,000 ns | 30,105 ns / 40,958 ns | 1,831 ns / 2,667 ns |
| 0 12 31 * *  | 208 ns / 375 ns | 1,666 ns / 2,333 ns |   7,727 ns / 9,041 ns | 29,492 ns / 36,208 ns | 1,521 ns / 2,000 ns |
| */15 * * * * | 236 ns / 417 ns | 3,494 ns / 4,208 ns | 14,312 ns / 20,875 ns | 30,713 ns / 46,167 ns | 1,417 ns / 1,875 ns |
| 0 9 * * *    | 174 ns / 292 ns | 2,543 ns / 3,250 ns | 11,376 ns / 18,250 ns | 29,872 ns / 43,125 ns | 1,606 ns / 2,292 ns |
| 0 9 15 * 1   | 250 ns / 542 ns | 1,373 ns / 1,958 ns |   7,009 ns / 9,042 ns | 30,953 ns / 48,875 ns | 1,511 ns / 1,875 ns |
| 0 9 * * 1-5  | 349 ns / 833 ns | 2,638 ns / 3,333 ns | 10,629 ns / 13,583 ns | 30,902 ns / 49,000 ns | 1,647 ns / 2,167 ns |

### Validation Varied Inputs - Throughput (ops/sec)

| Test Case                  |    cron-fast | cron-schedule |   cron-parser |       croner | cron-validate |
| -------------------------- | -----------: | ------------: | ------------: | -----------: | ------------: |
| varied inputs (anti-cache) | ~4293k ±2.2% | ~477k ±0.5% ✓ | ~115k ±0.4% ✓ | ~33k ±0.6% ✓ | ~615k ±0.3% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation Varied Inputs - Latency (mean / p99)

| Test Case                  |       cron-fast |       cron-schedule |          cron-parser |                croner |       cron-validate |
| -------------------------- | --------------: | ------------------: | -------------------: | --------------------: | ------------------: |
| varied inputs (anti-cache) | 233 ns / 625 ns | 2,097 ns / 2,875 ns | 8,721 ns / 13,167 ns | 29,944 ns / 48,583 ns | 1,627 ns / 2,041 ns |

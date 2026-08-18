# Benchmark

> Tested with node v24.19.0, cron-fast v3.7.0, croner v10.0.1, cron-parser v5.10.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by vitest bench (tinybench).

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1976k      | baseline     |
| cron-schedule | ~330k       | 6.0x faster  |
| cron-parser   | ~35k        | 57.0x faster |
| croner        | ~31k        | 64.1x faster |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~42k        | baseline     |
| cron-schedule | ~15k        | 2.8x faster  |
| cron-parser   | ~1k         | 35.4x faster |
| croner        | ~2k         | 18.2x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2139k      | baseline     |
| cron-schedule | ~349k       | 6.1x faster  |
| cron-parser   | ~40k        | 52.8x faster |
| croner        | ~31k        | 68.7x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~4873k      | baseline      |
| cron-schedule | ~450k       | 10.8x faster  |
| cron-parser   | ~94k        | 52.1x faster  |
| croner        | ~34k        | 143.5x faster |
| cron-validate | ~629k       | 7.8x faster   |

### Validation Varied Inputs

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~4317k      | baseline      |
| cron-schedule | ~424k       | 10.2x faster  |
| cron-parser   | ~103k       | 42.0x faster  |
| croner        | ~33k        | 130.8x faster |
| cron-validate | ~564k       | 7.7x faster   |

### Parsing

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~5008k      | baseline      |
| cron-schedule | ~454k       | 11.0x faster  |
| cron-parser   | ~94k        | 53.2x faster  |
| croner        | ~34k        | 146.5x faster |
| cron-validate | ~628k       | 8.0x faster   |

Run benchmarks yourself: `pnpm bench`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case    |    cron-fast | cron-schedule |  cron-parser |       croner |
| ------------ | -----------: | ------------: | -----------: | -----------: |
| * * * * *    | ~3450k ±0.5% | ~140k ±0.4% ✓ | ~33k ±0.4% ✓ | ~32k ±1.1% ✓ |
| 0 0 1 * *    | ~1921k ±0.4% | ~443k ±0.4% ✓ | ~18k ±3.6% ✓ | ~32k ±0.4% ✓ |
| 0 12 31 * *  | ~1820k ±2.0% | ~431k ±0.5% ✓ |  ~8k ±0.4% ✓ | ~30k ±1.0% ✓ |
| */15 * * * * | ~1865k ±0.5% | ~248k ±0.5% ✓ | ~55k ±0.4% ✓ | ~31k ±1.2% ✓ |
| 0 9 * * *    | ~2054k ±0.2% | ~328k ±0.4% ✓ | ~44k ±0.4% ✓ | ~32k ±1.0% ✓ |
| 0 9 15 * 1   | ~1264k ±0.3% | ~434k ±0.4% ✓ | ~39k ±0.4% ✓ | ~30k ±0.5% ✓ |
| 0 9 * * 1-5  | ~1462k ±0.4% | ~287k ±0.4% ✓ | ~46k ±0.4% ✓ | ~30k ±1.1% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case    |         cron-fast |       cron-schedule |             cron-parser |                croner |
| ------------ | ----------------: | ------------------: | ----------------------: | --------------------: |
| * * * * *    |   290 ns / 416 ns | 7,139 ns / 8,500 ns |   30,546 ns / 44,208 ns | 31,645 ns / 43,917 ns |
| 0 0 1 * *    |   521 ns / 750 ns | 2,255 ns / 2,875 ns |  55,676 ns / 117,250 ns | 30,988 ns / 45,333 ns |
| 0 12 31 * *  |   550 ns / 875 ns | 2,321 ns / 3,000 ns | 129,297 ns / 177,500 ns | 33,789 ns / 51,375 ns |
| */15 * * * * |   536 ns / 792 ns | 4,035 ns / 6,792 ns |   18,150 ns / 32,083 ns | 32,484 ns / 61,750 ns |
| 0 9 * * *    |   487 ns / 625 ns | 3,053 ns / 3,666 ns |   22,668 ns / 29,333 ns | 31,194 ns / 38,959 ns |
| 0 9 15 * 1   | 791 ns / 1,167 ns | 2,306 ns / 2,833 ns |   25,368 ns / 37,666 ns | 33,660 ns / 54,708 ns |
| 0 9 * * 1-5  | 684 ns / 1,083 ns | 3,485 ns / 4,167 ns |   21,973 ns / 27,583 ns | 33,688 ns / 41,000 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case   |  cron-fast | cron-schedule | cron-parser |      croner |
| ----------- | ---------: | ------------: | ----------: | ----------: |
| * * * * *   | ~61k ±0.4% |  ~20k ±0.4% ✓ | ~2k ±0.6% ✓ | ~4k ±0.4% ✓ |
| 0 9 * * 1-5 | ~23k ±0.3% |  ~10k ±0.2% ✓ | ~1k ±0.5% ✓ | ~1k ±0.5% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case   |             cron-fast |          cron-schedule |                 cron-parser |                      croner |
| ----------- | --------------------: | ---------------------: | --------------------------: | --------------------------: |
| * * * * *   | 16,294 ns / 28,917 ns |  50,273 ns / 82,750 ns |     536,008 ns / 724,333 ns |     272,255 ns / 376,459 ns |
| 0 9 * * 1-5 | 44,037 ns / 66,375 ns | 98,178 ns / 125,417 ns | 1,974,727 ns / 2,190,625 ns | 1,042,826 ns / 1,223,792 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case    |    cron-fast | cron-schedule |  cron-parser |       croner |
| ------------ | -----------: | ------------: | -----------: | -----------: |
| * * * * *    | ~3614k ±0.7% | ~132k ±0.4% ✓ | ~36k ±0.4% ✓ | ~33k ±0.9% ✓ |
| 0 0 1 * *    | ~2015k ±0.5% | ~490k ±0.4% ✓ |  ~9k ±0.5% ✓ | ~31k ±1.1% ✓ |
| 0 12 31 * *  | ~1933k ±0.4% | ~420k ±0.3% ✓ |  ~9k ±0.6% ✓ | ~30k ±2.8% ✓ |
| */15 * * * * | ~1912k ±0.5% | ~253k ±0.5% ✓ | ~58k ±0.5% ✓ | ~33k ±0.5% ✓ |
| 0 9 * * *    | ~2183k ±0.2% | ~337k ±0.5% ✓ | ~50k ±0.5% ✓ | ~30k ±4.2% ✓ |
| 0 9 15 * 1   | ~1871k ±0.5% | ~501k ±0.5% ✓ | ~68k ±0.5% ✓ | ~32k ±0.5% ✓ |
| 0 9 * * 1-5  | ~1448k ±3.1% | ~312k ±0.5% ✓ | ~53k ±0.4% ✓ | ~30k ±1.8% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case    |         cron-fast |        cron-schedule |             cron-parser |                croner |
| ------------ | ----------------: | -------------------: | ----------------------: | --------------------: |
| * * * * *    |   277 ns / 375 ns | 7,575 ns / 14,541 ns |   27,636 ns / 47,750 ns | 30,652 ns / 53,167 ns |
| 0 0 1 * *    |   496 ns / 750 ns |  2,041 ns / 2,625 ns | 108,023 ns / 179,000 ns | 32,648 ns / 55,416 ns |
| 0 12 31 * *  |   517 ns / 709 ns |  2,382 ns / 3,042 ns | 114,345 ns / 181,292 ns | 33,322 ns / 64,292 ns |
| */15 * * * * |   523 ns / 791 ns |  3,954 ns / 4,625 ns |   17,123 ns / 29,125 ns | 30,749 ns / 45,375 ns |
| 0 9 * * *    |   458 ns / 625 ns |  2,968 ns / 3,584 ns |   19,956 ns / 28,833 ns | 33,732 ns / 69,834 ns |
| 0 9 15 * 1   |   534 ns / 875 ns |  1,996 ns / 2,625 ns |   14,811 ns / 20,958 ns | 31,038 ns / 46,292 ns |
| 0 9 * * 1-5  | 691 ns / 1,292 ns |  3,201 ns / 4,542 ns |   18,781 ns / 22,916 ns | 33,049 ns / 48,166 ns |

### Validation - Throughput (ops/sec)

| Test Case    |    cron-fast | cron-schedule |   cron-parser |       croner | cron-validate |
| ------------ | -----------: | ------------: | ------------: | -----------: | ------------: |
| * * * * *    | ~8914k ±1.2% | ~150k ±0.6% ✓ |  ~44k ±0.4% ✓ | ~35k ±0.5% ✓ | ~600k ±0.4% ✓ |
| 0 0 1 * *    | ~4680k ±0.6% | ~606k ±0.5% ✓ | ~120k ±0.5% ✓ | ~34k ±0.7% ✓ | ~653k ±0.4% ✓ |
| 0 12 31 * *  | ~4360k ±0.7% | ~594k ±0.6% ✓ | ~118k ±0.5% ✓ | ~34k ±0.6% ✓ | ~608k ±0.4% ✓ |
| */15 * * * * | ~3934k ±0.8% | ~282k ±0.5% ✓ |  ~65k ±0.5% ✓ | ~34k ±0.5% ✓ | ~666k ±0.4% ✓ |
| 0 9 * * *    | ~5479k ±0.5% | ~395k ±0.5% ✓ |  ~84k ±0.5% ✓ | ~34k ±0.5% ✓ | ~622k ±0.4% ✓ |
| 0 9 15 * 1   | ~3774k ±0.8% | ~732k ±0.4% ✓ | ~137k ±0.4% ✓ | ~34k ±0.4% ✓ | ~622k ±0.4% ✓ |
| 0 9 * * 1-5  | ~2967k ±0.2% | ~390k ±0.4% ✓ |  ~87k ±0.4% ✓ | ~34k ±0.4% ✓ | ~628k ±1.2% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| * * * * *    | 112 ns / 166 ns | 6,650 ns / 9,000 ns | 22,852 ns / 37,584 ns | 28,622 ns / 36,500 ns | 1,667 ns / 2,125 ns |
| 0 0 1 * *    | 214 ns / 334 ns | 1,649 ns / 2,250 ns |  8,306 ns / 14,208 ns | 29,832 ns / 52,833 ns | 1,530 ns / 1,959 ns |
| 0 12 31 * *  | 229 ns / 375 ns | 1,682 ns / 2,333 ns |  8,510 ns / 13,083 ns | 29,783 ns / 44,250 ns | 1,644 ns / 2,209 ns |
| */15 * * * * | 254 ns / 417 ns | 3,552 ns / 4,792 ns | 15,339 ns / 30,667 ns | 29,409 ns / 49,625 ns | 1,501 ns / 2,000 ns |
| 0 9 * * *    | 183 ns / 292 ns | 2,529 ns / 3,125 ns | 11,870 ns / 23,083 ns | 29,793 ns / 50,041 ns | 1,607 ns / 2,000 ns |
| 0 9 15 * 1   | 265 ns / 583 ns | 1,367 ns / 1,875 ns |   7,277 ns / 9,291 ns | 29,084 ns / 38,250 ns | 1,607 ns / 2,083 ns |
| 0 9 * * 1-5  | 337 ns / 708 ns | 2,566 ns / 3,208 ns | 11,529 ns / 22,666 ns | 29,656 ns / 43,625 ns | 1,593 ns / 2,084 ns |

### Parsing - Throughput (ops/sec)

| Test Case    |    cron-fast | cron-schedule |   cron-parser |       croner | cron-validate |
| ------------ | -----------: | ------------: | ------------: | -----------: | ------------: |
| * * * * *    | ~9239k ±1.1% | ~149k ±0.4% ✓ |  ~44k ±0.4% ✓ | ~35k ±0.4% ✓ | ~580k ±3.4% ✓ |
| 0 0 1 * *    | ~4758k ±0.9% | ~618k ±0.5% ✓ | ~121k ±0.4% ✓ | ~34k ±0.5% ✓ | ~667k ±0.3% ✓ |
| 0 12 31 * *  | ~4710k ±0.5% | ~617k ±0.5% ✓ | ~121k ±0.4% ✓ | ~35k ±0.4% ✓ | ~672k ±0.4% ✓ |
| */15 * * * * | ~4062k ±0.7% | ~282k ±0.5% ✓ |  ~66k ±0.4% ✓ | ~34k ±0.4% ✓ | ~591k ±0.4% ✓ |
| 0 9 * * *    | ~5624k ±0.4% | ~394k ±0.5% ✓ |  ~86k ±0.4% ✓ | ~34k ±0.4% ✓ | ~631k ±0.4% ✓ |
| 0 9 15 * 1   | ~3783k ±0.8% | ~728k ±0.4% ✓ | ~135k ±0.4% ✓ | ~34k ±0.4% ✓ | ~635k ±0.3% ✓ |
| 0 9 * * 1-5  | ~2876k ±0.2% | ~393k ±0.4% ✓ |  ~86k ±0.4% ✓ | ~34k ±0.4% ✓ | ~618k ±1.7% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| * * * * *    | 108 ns / 125 ns | 6,689 ns / 9,458 ns | 22,784 ns / 37,250 ns | 28,372 ns / 35,084 ns | 1,724 ns / 2,584 ns |
| 0 0 1 * *    | 210 ns / 334 ns | 1,619 ns / 2,125 ns |  8,269 ns / 10,000 ns | 29,370 ns / 40,875 ns | 1,498 ns / 1,875 ns |
| 0 12 31 * *  | 212 ns / 334 ns | 1,621 ns / 2,125 ns |   8,270 ns / 9,417 ns | 28,852 ns / 39,000 ns | 1,488 ns / 1,875 ns |
| */15 * * * * | 246 ns / 417 ns | 3,552 ns / 5,500 ns | 15,147 ns / 27,916 ns | 29,198 ns / 46,458 ns | 1,692 ns / 2,125 ns |
| 0 9 * * *    | 178 ns / 291 ns | 2,536 ns / 3,167 ns | 11,679 ns / 14,917 ns | 29,632 ns / 44,833 ns | 1,585 ns / 2,000 ns |
| 0 9 15 * 1   | 264 ns / 583 ns | 1,373 ns / 1,917 ns |  7,382 ns / 10,250 ns | 29,671 ns / 44,083 ns | 1,575 ns / 2,000 ns |
| 0 9 * * 1-5  | 348 ns / 791 ns | 2,547 ns / 3,166 ns | 11,594 ns / 20,709 ns | 29,737 ns / 46,917 ns | 1,617 ns / 2,125 ns |

### Validation Varied Inputs - Throughput (ops/sec)

| Test Case                  |    cron-fast | cron-schedule |   cron-parser |       croner | cron-validate |
| -------------------------- | -----------: | ------------: | ------------: | -----------: | ------------: |
| varied inputs (anti-cache) | ~4317k ±2.1% | ~424k ±1.8% ✓ | ~103k ±1.8% ✓ | ~33k ±0.7% ✓ | ~564k ±0.5% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation Varied Inputs - Latency (mean / p99)

| Test Case                  |       cron-fast |       cron-schedule |          cron-parser |                croner |       cron-validate |
| -------------------------- | --------------: | ------------------: | -------------------: | --------------------: | ------------------: |
| varied inputs (anti-cache) | 232 ns / 625 ns | 2,358 ns / 5,334 ns | 9,725 ns / 21,500 ns | 30,293 ns / 50,375 ns | 1,772 ns / 2,333 ns |

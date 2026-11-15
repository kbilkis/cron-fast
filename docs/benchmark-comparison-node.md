# Benchmark

> Tested with node v24.19.0, cron-fast v3.15.0, croner v11.0.1, cron-parser v5.10.6, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by vitest bench (tinybench).

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~5455k      | baseline      |
| cron-schedule | ~345k       | 15.8x faster  |
| cron-parser   | ~40k        | 135.4x faster |
| croner        | ~65k        | 84.4x faster  |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~113k       | baseline     |
| cron-schedule | ~16k        | 7.3x faster  |
| cron-parser   | ~1k         | 85.2x faster |
| croner        | ~2k         | 66.3x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~5374k      | baseline      |
| cron-schedule | ~371k       | 14.5x faster  |
| cron-parser   | ~45k        | 118.9x faster |
| croner        | ~69k        | 77.9x faster  |

### Validation

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~16828k     | baseline      |
| cron-schedule | ~477k       | 35.2x faster  |
| cron-parser   | ~107k       | 156.8x faster |
| croner        | ~98k        | 170.9x faster |
| cron-validate | ~668k       | 25.2x faster  |

### Validation Varied Inputs

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~17078k     | baseline      |
| cron-schedule | ~535k       | 31.9x faster  |
| cron-parser   | ~134k       | 127.8x faster |
| croner        | ~97k        | 175.8x faster |
| cron-validate | ~631k       | 27.1x faster  |

### Parsing

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~16009k     | baseline      |
| cron-schedule | ~476k       | 33.6x faster  |
| cron-parser   | ~106k       | 151.2x faster |
| croner        | ~99k        | 162.4x faster |
| cron-validate | ~671k       | 23.9x faster  |

Run benchmarks yourself: `pnpm bench`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case    |    cron-fast | cron-schedule |  cron-parser |       croner |
| ------------ | -----------: | ------------: | -----------: | -----------: |
| * * * * *    | ~8913k ±0.2% | ~171k ±0.3% ✓ | ~42k ±0.2% ✓ | ~67k ±0.4% ✓ |
| 0 0 1 * *    | ~6126k ±0.3% | ~469k ±0.3% ✓ | ~20k ±0.3% ✓ | ~71k ±0.2% ✓ |
| 0 12 31 * *  | ~5738k ±0.3% | ~458k ±0.3% ✓ |  ~8k ±0.5% ✓ | ~61k ±0.3% ✓ |
| */15 * * * * | ~5174k ±2.6% | ~258k ±0.3% ✓ | ~66k ±0.3% ✓ | ~66k ±0.4% ✓ |
| 0 9 * * *    | ~5414k ±0.3% | ~337k ±0.3% ✓ | ~51k ±0.3% ✓ | ~72k ±0.4% ✓ |
| 0 9 15 * 1   | ~2876k ±0.3% | ~436k ±0.3% ✓ | ~42k ±0.4% ✓ | ~61k ±0.4% ✓ |
| 0 9 * * 1-5  | ~3945k ±0.7% | ~289k ±0.3% ✓ | ~52k ±0.3% ✓ | ~55k ±0.4% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |             cron-parser |                croner |
| ------------ | --------------: | ------------------: | ----------------------: | --------------------: |
| * * * * *    | 118 ns / 125 ns | 6,010 ns / 7,916 ns |   24,267 ns / 29,833 ns | 15,443 ns / 28,333 ns |
| 0 0 1 * *    | 168 ns / 209 ns | 2,166 ns / 2,666 ns |   49,495 ns / 58,666 ns | 14,280 ns / 15,209 ns |
| 0 12 31 * *  | 180 ns / 209 ns | 2,228 ns / 3,000 ns | 125,687 ns / 264,032 ns | 16,733 ns / 22,625 ns |
| */15 * * * * | 206 ns / 250 ns | 3,985 ns / 4,875 ns |   15,484 ns / 29,556 ns | 15,710 ns / 28,792 ns |
| 0 9 * * *    | 193 ns / 291 ns | 3,023 ns / 3,625 ns |   19,654 ns / 23,375 ns | 14,259 ns / 21,362 ns |
| 0 9 15 * 1   | 357 ns / 458 ns | 2,367 ns / 3,000 ns |   24,538 ns / 53,914 ns | 16,816 ns / 27,666 ns |
| 0 9 * * 1-5  | 262 ns / 334 ns | 3,534 ns / 4,208 ns |   19,546 ns / 30,975 ns | 18,762 ns / 33,583 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case   |   cron-fast | cron-schedule | cron-parser |      croner |
| ----------- | ----------: | ------------: | ----------: | ----------: |
| * * * * *   | ~179k ±0.3% |  ~21k ±0.2% ✓ | ~2k ±0.4% ✓ | ~3k ±0.2% ✓ |
| 0 9 * * 1-5 |  ~47k ±0.2% |  ~10k ±0.2% ✓ | ~1k ±0.8% ✓ | ~1k ±0.4% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case   |             cron-fast |          cron-schedule |                 cron-parser |                      croner |
| ----------- | --------------------: | ---------------------: | --------------------------: | --------------------------: |
| * * * * *   |   5,671 ns / 6,292 ns |  48,295 ns / 57,209 ns |     488,096 ns / 610,923 ns |     391,125 ns / 503,250 ns |
| 0 9 * * 1-5 | 21,447 ns / 24,375 ns | 97,722 ns / 115,278 ns | 1,692,223 ns / 1,933,542 ns | 1,190,550 ns / 1,346,681 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case    |    cron-fast | cron-schedule |  cron-parser |       croner |
| ------------ | -----------: | ------------: | -----------: | -----------: |
| * * * * *    | ~7423k ±0.7% | ~170k ±0.3% ✓ | ~45k ±0.5% ✓ | ~74k ±0.4% ✓ |
| 0 0 1 * *    | ~5780k ±2.5% | ~507k ±0.6% ✓ |  ~9k ±0.3% ✓ | ~67k ±0.3% ✓ |
| 0 12 31 * *  | ~5186k ±0.2% | ~431k ±0.3% ✓ |  ~9k ±0.3% ✓ | ~64k ±0.4% ✓ |
| */15 * * * * | ~4404k ±2.7% | ~259k ±0.3% ✓ | ~67k ±0.3% ✓ | ~73k ±0.5% ✓ |
| 0 9 * * *    | ~5373k ±0.2% | ~353k ±0.2% ✓ | ~56k ±0.2% ✓ | ~73k ±0.2% ✓ |
| 0 9 15 * 1   | ~5315k ±0.3% | ~548k ±0.2% ✓ | ~73k ±0.2% ✓ | ~72k ±0.2% ✓ |
| 0 9 * * 1-5  | ~4136k ±0.4% | ~330k ±0.3% ✓ | ~58k ±0.3% ✓ | ~60k ±0.3% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |             cron-parser |                croner |
| ------------ | --------------: | ------------------: | ----------------------: | --------------------: |
| * * * * *    | 143 ns / 167 ns | 6,101 ns / 8,333 ns |   22,942 ns / 41,422 ns | 13,916 ns / 24,225 ns |
| 0 0 1 * *    | 180 ns / 209 ns | 2,030 ns / 2,625 ns | 109,835 ns / 175,034 ns | 15,241 ns / 18,500 ns |
| 0 12 31 * *  | 200 ns / 250 ns | 2,396 ns / 3,125 ns | 115,850 ns / 181,684 ns | 16,109 ns / 30,343 ns |
| */15 * * * * | 252 ns / 334 ns | 3,934 ns / 4,708 ns |   15,173 ns / 21,167 ns | 14,258 ns / 27,375 ns |
| 0 9 * * *    | 191 ns / 209 ns | 2,870 ns / 3,417 ns |   18,032 ns / 22,203 ns | 13,931 ns / 17,458 ns |
| 0 9 15 * 1   | 195 ns / 209 ns | 1,850 ns / 2,333 ns |   13,821 ns / 14,667 ns | 14,143 ns / 16,667 ns |
| 0 9 * * 1-5  | 247 ns / 292 ns | 3,099 ns / 4,292 ns |   17,565 ns / 26,500 ns | 16,956 ns / 23,667 ns |

### Validation - Throughput (ops/sec)

| Test Case    |     cron-fast | cron-schedule |   cron-parser |        croner | cron-validate |
| ------------ | ------------: | ------------: | ------------: | ------------: | ------------: |
| * * * * *    | ~20937k ±0.5% | ~188k ±0.3% ✓ |  ~56k ±0.3% ✓ | ~103k ±0.6% ✓ | ~633k ±0.6% ✓ |
| 0 0 1 * *    | ~20033k ±0.3% | ~637k ±0.3% ✓ | ~136k ±0.3% ✓ | ~100k ±0.3% ✓ | ~697k ±0.2% ✓ |
| 0 12 31 * *  | ~17956k ±0.3% | ~639k ±0.5% ✓ | ~133k ±0.3% ✓ |  ~96k ±0.3% ✓ | ~680k ±0.3% ✓ |
| */15 * * * * | ~11515k ±0.2% | ~293k ±0.3% ✓ |  ~77k ±1.5% ✓ | ~101k ±0.2% ✓ | ~716k ±0.2% ✓ |
| 0 9 * * *    | ~19422k ±0.4% | ~406k ±0.3% ✓ |  ~98k ±0.2% ✓ | ~102k ±0.2% ✓ | ~647k ±0.2% ✓ |
| 0 9 15 * 1   | ~16852k ±0.1% | ~770k ±0.3% ✓ | ~150k ±0.2% ✓ |  ~99k ±0.2% ✓ | ~659k ±0.2% ✓ |
| 0 9 * * 1-5  | ~11082k ±0.3% | ~410k ±0.3% ✓ | ~103k ±0.2% ✓ |  ~88k ±0.2% ✓ | ~641k ±0.2% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case    |      cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| ------------ | -------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| * * * * *    |  55 ns / 84 ns | 5,550 ns / 9,042 ns | 18,339 ns / 30,686 ns | 10,181 ns / 15,375 ns | 1,665 ns / 2,667 ns |
| 0 0 1 * *    |  57 ns / 84 ns | 1,605 ns / 2,208 ns |   7,505 ns / 9,667 ns | 10,297 ns / 14,209 ns | 1,455 ns / 2,000 ns |
| 0 12 31 * *  |  65 ns / 84 ns | 1,638 ns / 2,292 ns |  7,678 ns / 10,458 ns | 10,693 ns / 14,917 ns | 1,512 ns / 2,000 ns |
| */15 * * * * | 90 ns / 125 ns | 3,475 ns / 4,125 ns | 13,267 ns / 16,125 ns | 10,007 ns / 12,500 ns | 1,409 ns / 1,791 ns |
| 0 9 * * *    |  60 ns / 84 ns | 2,515 ns / 3,250 ns | 10,340 ns / 11,747 ns |  9,913 ns / 10,833 ns | 1,565 ns / 2,084 ns |
| 0 9 15 * 1   |  67 ns / 84 ns | 1,331 ns / 1,875 ns |   6,745 ns / 7,458 ns | 10,216 ns / 10,916 ns | 1,533 ns / 1,958 ns |
| 0 9 * * 1-5  | 95 ns / 125 ns | 2,483 ns / 3,042 ns |  9,793 ns / 10,500 ns | 11,488 ns / 13,875 ns | 1,576 ns / 1,958 ns |

### Parsing - Throughput (ops/sec)

| Test Case    |     cron-fast | cron-schedule |   cron-parser |        croner | cron-validate |
| ------------ | ------------: | ------------: | ------------: | ------------: | ------------: |
| * * * * *    | ~19665k ±0.4% | ~187k ±0.3% ✓ |  ~55k ±0.2% ✓ | ~106k ±0.2% ✓ | ~640k ±0.2% ✓ |
| 0 0 1 * *    | ~19024k ±0.3% | ~638k ±0.3% ✓ | ~133k ±0.3% ✓ |  ~98k ±0.3% ✓ | ~705k ±0.2% ✓ |
| 0 12 31 * *  | ~16900k ±0.3% | ~633k ±0.3% ✓ | ~130k ±0.2% ✓ |  ~98k ±0.3% ✓ | ~683k ±0.2% ✓ |
| */15 * * * * | ~11169k ±0.2% | ~288k ±0.3% ✓ |  ~77k ±0.2% ✓ | ~102k ±0.3% ✓ | ~710k ±0.2% ✓ |
| 0 9 * * *    | ~18503k ±0.4% | ~405k ±0.3% ✓ |  ~97k ±0.6% ✓ | ~101k ±0.3% ✓ | ~657k ±0.2% ✓ |
| 0 9 15 * 1   | ~16151k ±0.1% | ~773k ±0.3% ✓ | ~147k ±0.2% ✓ |  ~98k ±0.2% ✓ | ~642k ±0.2% ✓ |
| 0 9 * * 1-5  | ~10652k ±0.2% | ~412k ±0.3% ✓ | ~102k ±0.2% ✓ |  ~88k ±0.3% ✓ | ~656k ±0.2% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case    |      cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| ------------ | -------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| * * * * *    |  59 ns / 84 ns | 5,488 ns / 6,958 ns | 18,268 ns / 21,792 ns |  9,636 ns / 12,416 ns | 1,585 ns / 2,125 ns |
| 0 0 1 * *    |  61 ns / 84 ns | 1,602 ns / 2,167 ns |  7,702 ns / 10,125 ns | 10,476 ns / 13,833 ns | 1,438 ns / 1,959 ns |
| 0 12 31 * *  |  68 ns / 84 ns | 1,616 ns / 2,209 ns |   7,777 ns / 9,125 ns | 10,441 ns / 13,166 ns | 1,488 ns / 1,958 ns |
| */15 * * * * | 95 ns / 125 ns | 3,542 ns / 4,500 ns | 13,131 ns / 15,834 ns | 10,035 ns / 13,250 ns | 1,429 ns / 1,917 ns |
| 0 9 * * *    |  63 ns / 84 ns | 2,543 ns / 3,417 ns | 10,569 ns / 15,950 ns | 10,151 ns / 13,917 ns | 1,555 ns / 2,083 ns |
| 0 9 15 * 1   |  70 ns / 84 ns | 1,319 ns / 1,833 ns |   6,842 ns / 7,542 ns | 10,370 ns / 13,292 ns | 1,575 ns / 1,917 ns |
| 0 9 * * 1-5  | 99 ns / 125 ns | 2,468 ns / 3,041 ns |  9,839 ns / 10,584 ns | 11,492 ns / 14,542 ns | 1,545 ns / 1,917 ns |

### Validation Varied Inputs - Throughput (ops/sec)

| Test Case                  |     cron-fast | cron-schedule |   cron-parser |       croner | cron-validate |
| -------------------------- | ------------: | ------------: | ------------: | -----------: | ------------: |
| varied inputs (anti-cache) | ~17078k ±0.3% | ~535k ±0.3% ✓ | ~134k ±1.2% ✓ | ~97k ±0.3% ✓ | ~631k ±0.2% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation Varied Inputs - Latency (mean / p99)

| Test Case                  |     cron-fast |       cron-schedule |         cron-parser |                croner |       cron-validate |
| -------------------------- | ------------: | ------------------: | ------------------: | --------------------: | ------------------: |
| varied inputs (anti-cache) | 68 ns / 84 ns | 1,908 ns / 2,417 ns | 7,662 ns / 8,791 ns | 10,500 ns / 13,583 ns | 1,603 ns / 2,000 ns |

# Benchmark

> Tested with bun v1.3.14, cron-fast v3.5.0, croner v10.0.1, cron-parser v5.7.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by mitata.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2219k      | baseline     |
| cron-schedule | ~294k       | 7.6x faster  |
| cron-parser   | ~38k        | 59.1x faster |
| croner        | ~51k        | 43.8x faster |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~52k        | baseline     |
| cron-schedule | ~24k        | 2.2x faster  |
| cron-parser   | ~1k         | 42.8x faster |
| croner        | ~6k         | 9.0x faster  |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2814k      | baseline     |
| cron-schedule | ~314k       | 9.0x faster  |
| cron-parser   | ~48k        | 58.9x faster |
| croner        | ~56k        | 50.3x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~6881k      | baseline      |
| cron-schedule | ~355k       | 19.4x faster  |
| cron-parser   | ~134k       | 51.3x faster  |
| croner        | ~61k        | 112.2x faster |
| cron-validate | ~977k       | 7.0x faster   |

### Validation Varied Inputs

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~5741k      | baseline     |
| cron-schedule | ~350k       | 16.4x faster |
| cron-parser   | ~148k       | 38.7x faster |
| croner        | ~59k        | 96.7x faster |
| cron-validate | ~761k       | 7.5x faster  |

### Parsing

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~6737k      | baseline      |
| cron-schedule | ~362k       | 18.6x faster  |
| cron-parser   | ~140k       | 48.1x faster  |
| croner        | ~62k        | 107.8x faster |
| cron-validate | ~1008k      | 6.7x faster   |

Run benchmarks yourself: `pnpm bench:bun`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner |
| ------------ | --------: | ------------: | ----------: | -----: |
| * * * * *    |    ~4377k |       ~138k ✓ |      ~34k ✓ | ~59k ✓ |
| 0 0 1 * *    |    ~1773k |       ~395k ✓ |      ~20k ✓ | ~53k ✓ |
| 0 12 31 * *  |    ~1683k |       ~419k ✓ |       ~9k ✓ | ~56k ✓ |
| */15 * * * * |    ~2902k |       ~195k ✓ |      ~69k ✓ | ~57k ✓ |
| 0 9 * * *    |    ~2434k |       ~285k ✓ |      ~54k ✓ | ~48k ✓ |
| 0 9 15 * 1   |    ~1216k |       ~372k ✓ |      ~30k ✓ | ~45k ✓ |
| 0 9 * * 1-5  |    ~1147k |       ~252k ✓ |      ~46k ✓ | ~37k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case    |         cron-fast |        cron-schedule |             cron-parser |                 croner |
| ------------ | ----------------: | -------------------: | ----------------------: | ---------------------: |
| * * * * *    | 228 ns / 1,500 ns | 7,264 ns / 20,166 ns |   29,489 ns / 57,833 ns |  16,975 ns / 32,041 ns |
| 0 0 1 * *    |   564 ns / 739 ns |  2,530 ns / 2,951 ns |   49,197 ns / 86,375 ns |  18,866 ns / 19,611 ns |
| 0 12 31 * *  |   594 ns / 712 ns |  2,386 ns / 2,610 ns | 116,792 ns / 168,042 ns |  17,965 ns / 19,252 ns |
| */15 * * * * |   345 ns / 458 ns |  5,122 ns / 5,618 ns |   14,423 ns / 14,760 ns |  17,582 ns / 18,825 ns |
| 0 9 * * *    |   411 ns / 542 ns |  3,513 ns / 3,750 ns |   18,528 ns / 19,377 ns |  20,754 ns / 25,576 ns |
| 0 9 15 * 1   | 823 ns / 1,066 ns |  2,691 ns / 4,704 ns |  33,176 ns / 168,792 ns |  22,348 ns / 25,846 ns |
| 0 9 * * 1-5  | 872 ns / 3,166 ns |  3,971 ns / 4,415 ns |   21,584 ns / 50,750 ns | 27,091 ns / 141,500 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case   | cron-fast | cron-schedule | cron-parser | croner |
| ----------- | --------: | ------------: | ----------: | -----: |
| * * * * *   |      ~79k |        ~29k ✓ |       ~2k ✓ | ~10k ✓ |
| 0 9 * * 1-5 |      ~26k |        ~19k ✓ |       ~1k ✓ |  ~1k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case   |             cron-fast |         cron-schedule |                 cron-parser |                    croner |
| ----------- | --------------------: | --------------------: | --------------------------: | ------------------------: |
| * * * * *   | 12,691 ns / 13,429 ns | 34,853 ns / 52,166 ns |     521,299 ns / 788,208 ns |    96,547 ns / 129,542 ns |
| 0 9 * * 1-5 | 38,760 ns / 39,479 ns | 53,780 ns / 91,667 ns | 1,893,846 ns / 3,322,167 ns | 775,302 ns / 1,225,750 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner |
| ------------ | --------: | ------------: | ----------: | -----: |
| * * * * *    |    ~6424k |       ~138k ✓ |      ~35k ✓ | ~51k ✓ |
| 0 0 1 * *    |    ~1769k |       ~434k ✓ |      ~11k ✓ | ~58k ✓ |
| 0 12 31 * *  |    ~1582k |       ~416k ✓ |      ~10k ✓ | ~54k ✓ |
| */15 * * * * |    ~2776k |       ~214k ✓ |      ~69k ✓ | ~60k ✓ |
| 0 9 * * *    |    ~2712k |       ~280k ✓ |      ~63k ✓ | ~59k ✓ |
| 0 9 15 * 1   |    ~2431k |       ~456k ✓ |      ~83k ✓ | ~57k ✓ |
| 0 9 * * 1-5  |    ~2006k |       ~262k ✓ |      ~63k ✓ | ~53k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case    |         cron-fast |       cron-schedule |             cron-parser |                croner |
| ------------ | ----------------: | ------------------: | ----------------------: | --------------------: |
| * * * * *    |   156 ns / 283 ns | 7,221 ns / 7,863 ns |   28,209 ns / 60,125 ns | 19,531 ns / 22,192 ns |
| 0 0 1 * *    | 565 ns / 2,084 ns | 2,305 ns / 2,573 ns |  89,399 ns / 123,166 ns | 17,322 ns / 19,559 ns |
| 0 12 31 * *  | 632 ns / 1,116 ns | 2,403 ns / 2,695 ns | 104,009 ns / 247,584 ns | 18,653 ns / 19,560 ns |
| */15 * * * * |   360 ns / 692 ns | 4,677 ns / 5,140 ns |   14,408 ns / 15,071 ns | 16,582 ns / 17,318 ns |
| 0 9 * * *    |   369 ns / 721 ns | 3,571 ns / 3,939 ns |   15,985 ns / 16,675 ns | 16,951 ns / 18,196 ns |
| 0 9 15 * 1   |   411 ns / 635 ns | 2,192 ns / 2,792 ns |   12,087 ns / 12,603 ns | 17,497 ns / 19,436 ns |
| 0 9 * * 1-5  |   498 ns / 671 ns | 3,812 ns / 4,907 ns |   15,790 ns / 17,222 ns | 18,940 ns / 21,396 ns |

### Validation - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| ------------ | --------: | ------------: | ----------: | -----: | ------------: |
| * * * * *    |   ~17172k |       ~148k ✓ |      ~46k ✓ | ~58k ✓ |       ~832k ✓ |
| 0 0 1 * *    |    ~5225k |       ~459k ✓ |     ~178k ✓ | ~66k ✓ |       ~999k ✓ |
| 0 12 31 * *  |    ~5645k |       ~458k ✓ |     ~177k ✓ | ~56k ✓ |       ~961k ✓ |
| */15 * * * * |    ~5158k |       ~225k ✓ |      ~90k ✓ | ~66k ✓ |      ~1060k ✓ |
| 0 9 * * *    |    ~7251k |       ~300k ✓ |     ~116k ✓ | ~57k ✓ |      ~1030k ✓ |
| 0 9 15 * 1   |    ~4332k |       ~596k ✓ |     ~214k ✓ | ~66k ✓ |       ~961k ✓ |
| 0 9 * * 1-5  |    ~3383k |       ~297k ✓ |     ~117k ✓ | ~60k ✓ |       ~999k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| * * * * *    |   58 ns / 80 ns | 6,748 ns / 7,790 ns | 21,847 ns / 54,833 ns | 17,278 ns / 19,105 ns | 1,203 ns / 3,667 ns |
| 0 0 1 * *    | 191 ns / 359 ns | 2,178 ns / 2,475 ns |   5,611 ns / 6,829 ns | 15,226 ns / 15,178 ns | 1,001 ns / 1,344 ns |
| 0 12 31 * *  | 177 ns / 286 ns | 2,184 ns / 2,339 ns |   5,639 ns / 6,142 ns | 17,731 ns / 16,559 ns | 1,041 ns / 1,144 ns |
| */15 * * * * | 194 ns / 330 ns | 4,444 ns / 4,612 ns | 11,128 ns / 11,326 ns | 15,157 ns / 16,670 ns |   944 ns / 1,167 ns |
| 0 9 * * *    | 138 ns / 247 ns | 3,329 ns / 3,433 ns |   8,613 ns / 8,825 ns | 17,463 ns / 16,099 ns |   970 ns / 1,064 ns |
| 0 9 15 * 1   | 231 ns / 344 ns | 1,679 ns / 1,853 ns |   4,676 ns / 4,888 ns | 15,243 ns / 15,688 ns | 1,041 ns / 1,147 ns |
| 0 9 * * 1-5  | 296 ns / 398 ns | 3,368 ns / 3,564 ns |   8,546 ns / 8,775 ns | 16,557 ns / 15,817 ns | 1,001 ns / 1,131 ns |

### Parsing - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| ------------ | --------: | ------------: | ----------: | -----: | ------------: |
| * * * * *    |   ~16283k |       ~162k ✓ |      ~54k ✓ | ~66k ✓ |      ~1036k ✓ |
| 0 0 1 * *    |    ~5499k |       ~465k ✓ |     ~187k ✓ | ~62k ✓ |      ~1016k ✓ |
| 0 12 31 * *  |    ~5545k |       ~478k ✓ |     ~193k ✓ | ~62k ✓ |       ~947k ✓ |
| */15 * * * * |    ~5304k |       ~220k ✓ |      ~90k ✓ | ~64k ✓ |      ~1038k ✓ |
| 0 9 * * *    |    ~7499k |       ~318k ✓ |     ~120k ✓ | ~57k ✓ |      ~1018k ✓ |
| 0 9 15 * 1   |    ~3621k |       ~590k ✓ |     ~218k ✓ | ~65k ✓ |       ~926k ✓ |
| 0 9 * * 1-5  |    ~3406k |       ~305k ✓ |     ~119k ✓ | ~62k ✓ |      ~1073k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| * * * * *    |   61 ns / 97 ns | 6,185 ns / 6,493 ns | 18,514 ns / 18,709 ns | 15,130 ns / 15,261 ns |   965 ns / 1,069 ns |
| 0 0 1 * *    | 182 ns / 299 ns | 2,152 ns / 2,291 ns |   5,345 ns / 5,465 ns | 16,105 ns / 15,220 ns |   984 ns / 1,142 ns |
| 0 12 31 * *  | 180 ns / 286 ns | 2,094 ns / 2,237 ns |   5,171 ns / 5,384 ns | 16,072 ns / 16,200 ns | 1,056 ns / 1,140 ns |
| */15 * * * * | 189 ns / 241 ns | 4,544 ns / 4,752 ns | 11,075 ns / 11,273 ns | 15,587 ns / 15,467 ns |   964 ns / 1,086 ns |
| 0 9 * * *    | 133 ns / 217 ns | 3,145 ns / 3,253 ns |   8,367 ns / 8,798 ns | 17,585 ns / 19,482 ns |   982 ns / 1,084 ns |
| 0 9 15 * 1   | 276 ns / 633 ns | 1,694 ns / 1,854 ns |   4,594 ns / 4,724 ns | 15,502 ns / 16,939 ns | 1,080 ns / 1,205 ns |
| 0 9 * * 1-5  | 294 ns / 383 ns | 3,284 ns / 3,419 ns |   8,438 ns / 8,682 ns | 16,251 ns / 16,719 ns |   932 ns / 1,042 ns |

### Validation Varied Inputs - Throughput (ops/sec)

| Test Case | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------- | --------: | ------------: | ----------: | -----: | ------------: |
| varied    |    ~5741k |       ~350k ✓ |     ~148k ✓ | ~59k ✓ |       ~761k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation Varied Inputs - Latency (mean / p99)

| Test Case |       cron-fast |       cron-schedule |          cron-parser |                croner |       cron-validate |
| --------- | --------------: | ------------------: | -------------------: | --------------------: | ------------------: |
| varied    | 174 ns / 337 ns | 2,858 ns / 6,208 ns | 6,739 ns / 13,875 ns | 16,848 ns / 34,542 ns | 1,315 ns / 3,750 ns |

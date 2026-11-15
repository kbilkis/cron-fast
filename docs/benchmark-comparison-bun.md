# Benchmark

> Tested with bun v1.4.2, cron-fast v3.15.0, croner v11.0.1, cron-parser v5.10.6, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by mitata.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~7084k      | baseline      |
| cron-schedule | ~428k       | 16.6x faster  |
| cron-parser   | ~47k        | 151.0x faster |
| croner        | ~106k       | 66.9x faster  |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~144k       | baseline     |
| cron-schedule | ~26k        | 5.6x faster  |
| cron-parser   | ~1k         | 99.4x faster |
| croner        | ~3k         | 44.3x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~6604k      | baseline      |
| cron-schedule | ~438k       | 15.1x faster  |
| cron-parser   | ~54k        | 122.0x faster |
| croner        | ~108k       | 61.4x faster  |

### Validation

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~21243k     | baseline      |
| cron-schedule | ~493k       | 43.1x faster  |
| cron-parser   | ~152k       | 139.3x faster |
| croner        | ~150k       | 141.7x faster |
| cron-validate | ~1268k      | 16.7x faster  |

### Validation Varied Inputs

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~18733k     | baseline      |
| cron-schedule | ~460k       | 40.7x faster  |
| cron-parser   | ~161k       | 116.4x faster |
| croner        | ~135k       | 138.5x faster |
| cron-validate | ~897k       | 20.9x faster  |

### Parsing

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~21171k     | baseline      |
| cron-schedule | ~495k       | 42.8x faster  |
| cron-parser   | ~154k       | 137.0x faster |
| croner        | ~145k       | 146.3x faster |
| cron-validate | ~1273k      | 16.6x faster  |

Run benchmarks yourself: `pnpm bench:bun`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser |  croner |
| ------------ | --------: | ------------: | ----------: | ------: |
| * * * * *    |   ~11765k |       ~218k ✓ |      ~39k ✓ | ~104k ✓ |
| 0 0 1 * *    |    ~7556k |       ~594k ✓ |      ~24k ✓ | ~113k ✓ |
| 0 12 31 * *  |    ~7323k |       ~541k ✓ |      ~10k ✓ | ~105k ✓ |
| */15 * * * * |    ~6921k |       ~301k ✓ |      ~79k ✓ | ~115k ✓ |
| 0 9 * * *    |    ~6971k |       ~389k ✓ |      ~59k ✓ | ~123k ✓ |
| 0 9 15 * 1   |    ~3739k |       ~598k ✓ |      ~54k ✓ |  ~97k ✓ |
| 0 9 * * 1-5  |    ~5313k |       ~354k ✓ |      ~64k ✓ |  ~84k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |             cron-parser |                croner |
| ------------ | --------------: | ------------------: | ----------------------: | --------------------: |
| * * * * *    |  85 ns / 154 ns | 4,591 ns / 4,750 ns |   25,651 ns / 49,666 ns |  9,579 ns / 18,458 ns |
| 0 0 1 * *    | 132 ns / 222 ns | 1,685 ns / 1,902 ns |   41,900 ns / 66,750 ns |   8,814 ns / 9,631 ns |
| 0 12 31 * *  | 137 ns / 229 ns | 1,849 ns / 1,997 ns | 100,784 ns / 159,667 ns |   9,513 ns / 9,744 ns |
| */15 * * * * | 144 ns / 240 ns | 3,325 ns / 3,486 ns |   12,697 ns / 12,851 ns |   8,680 ns / 9,240 ns |
| 0 9 * * *    | 143 ns / 228 ns | 2,574 ns / 2,693 ns |   16,812 ns / 16,961 ns |   8,153 ns / 8,310 ns |
| 0 9 15 * 1   | 267 ns / 361 ns | 1,672 ns / 1,831 ns |   18,596 ns / 18,892 ns | 10,361 ns / 11,066 ns |
| 0 9 * * 1-5  | 188 ns / 261 ns | 2,821 ns / 2,980 ns |   15,716 ns / 15,932 ns | 11,941 ns / 12,283 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case   | cron-fast | cron-schedule | cron-parser | croner |
| ----------- | --------: | ------------: | ----------: | -----: |
| * * * * *   |     ~231k |        ~32k ✓ |       ~2k ✓ |  ~5k ✓ |
| 0 9 * * 1-5 |      ~57k |        ~19k ✓ |       ~1k ✓ |  ~1k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case   |             cron-fast |         cron-schedule |                 cron-parser |                  croner |
| ----------- | --------------------: | --------------------: | --------------------------: | ----------------------: |
| * * * * *   |   4,338 ns / 4,514 ns | 31,031 ns / 31,155 ns |     450,213 ns / 616,583 ns | 193,927 ns / 255,167 ns |
| 0 9 * * 1-5 | 17,457 ns / 18,403 ns | 51,613 ns / 51,940 ns | 1,482,671 ns / 2,167,000 ns | 746,435 ns / 864,042 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser |  croner |
| ------------ | --------: | ------------: | ----------: | ------: |
| * * * * *    |    ~9872k |       ~211k ✓ |      ~44k ✓ | ~114k ✓ |
| 0 0 1 * *    |    ~4885k |       ~570k ✓ |      ~12k ✓ | ~104k ✓ |
| 0 12 31 * *  |    ~6409k |       ~568k ✓ |      ~11k ✓ | ~104k ✓ |
| */15 * * * * |    ~5982k |       ~299k ✓ |      ~79k ✓ | ~115k ✓ |
| 0 9 * * *    |    ~6759k |       ~395k ✓ |      ~66k ✓ | ~115k ✓ |
| 0 9 15 * 1   |    ~6647k |       ~650k ✓ |      ~95k ✓ | ~111k ✓ |
| 0 9 * * 1-5  |    ~5675k |       ~375k ✓ |      ~73k ✓ |  ~91k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |            cron-parser |                croner |
| ------------ | --------------: | ------------------: | ---------------------: | --------------------: |
| * * * * *    | 101 ns / 127 ns | 4,729 ns / 5,034 ns |  22,876 ns / 23,643 ns |   8,737 ns / 9,349 ns |
| 0 0 1 * *    | 205 ns / 666 ns | 1,753 ns / 1,918 ns | 86,414 ns / 141,125 ns |  9,606 ns / 10,724 ns |
| 0 12 31 * *  | 156 ns / 207 ns | 1,762 ns / 1,909 ns | 88,640 ns / 140,292 ns |  9,644 ns / 10,764 ns |
| */15 * * * * | 167 ns / 193 ns | 3,347 ns / 3,499 ns |  12,707 ns / 12,797 ns |   8,720 ns / 9,218 ns |
| 0 9 * * *    | 148 ns / 207 ns | 2,529 ns / 2,647 ns |  15,179 ns / 15,438 ns |   8,733 ns / 9,367 ns |
| 0 9 15 * 1   | 150 ns / 187 ns | 1,538 ns / 1,645 ns |  10,576 ns / 10,659 ns |   9,032 ns / 9,855 ns |
| 0 9 * * 1-5  | 176 ns / 218 ns | 2,667 ns / 2,842 ns |  13,654 ns / 13,760 ns | 11,019 ns / 11,826 ns |

### Validation - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser |  croner | cron-validate |
| ------------ | --------: | ------------: | ----------: | ------: | ------------: |
| * * * * *    |   ~26768k |       ~227k ✓ |      ~58k ✓ | ~151k ✓ |      ~1194k ✓ |
| 0 0 1 * *    |   ~23623k |       ~641k ✓ |     ~192k ✓ | ~154k ✓ |      ~1279k ✓ |
| 0 12 31 * *  |   ~21047k |       ~655k ✓ |     ~195k ✓ | ~151k ✓ |      ~1248k ✓ |
| */15 * * * * |   ~16095k |       ~328k ✓ |     ~100k ✓ | ~155k ✓ |      ~1327k ✓ |
| 0 9 * * *    |   ~25480k |       ~420k ✓ |     ~133k ✓ | ~157k ✓ |      ~1308k ✓ |
| 0 9 15 * 1   |   ~21424k |       ~763k ✓ |     ~248k ✓ | ~153k ✓ |      ~1250k ✓ |
| 0 9 * * 1-5  |   ~14262k |       ~414k ✓ |     ~142k ✓ | ~129k ✓ |      ~1274k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case    |     cron-fast |       cron-schedule |           cron-parser |              croner |   cron-validate |
| ------------ | ------------: | ------------------: | --------------------: | ------------------: | --------------: |
| * * * * *    | 37 ns / 50 ns | 4,398 ns / 4,565 ns | 17,327 ns / 17,563 ns | 6,605 ns / 7,937 ns | 837 ns / 960 ns |
| 0 0 1 * *    | 42 ns / 54 ns | 1,559 ns / 1,708 ns |   5,202 ns / 5,392 ns | 6,493 ns / 6,778 ns | 782 ns / 887 ns |
| 0 12 31 * *  | 48 ns / 60 ns | 1,526 ns / 1,647 ns |   5,132 ns / 5,276 ns | 6,619 ns / 7,298 ns | 802 ns / 907 ns |
| */15 * * * * | 62 ns / 76 ns | 3,050 ns / 3,142 ns | 10,031 ns / 10,118 ns | 6,471 ns / 6,917 ns | 754 ns / 873 ns |
| 0 9 * * *    | 39 ns / 49 ns | 2,383 ns / 2,542 ns |   7,532 ns / 7,714 ns | 6,361 ns / 6,643 ns | 765 ns / 874 ns |
| 0 9 15 * 1   | 47 ns / 61 ns | 1,311 ns / 1,428 ns |   4,027 ns / 4,176 ns | 6,546 ns / 6,940 ns | 800 ns / 905 ns |
| 0 9 * * 1-5  | 70 ns / 87 ns | 2,417 ns / 2,585 ns |   7,059 ns / 7,176 ns | 7,778 ns / 9,179 ns | 785 ns / 898 ns |

### Parsing - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser |  croner | cron-validate |
| ------------ | --------: | ------------: | ----------: | ------: | ------------: |
| * * * * *    |   ~26810k |       ~232k ✓ |      ~59k ✓ | ~155k ✓ |      ~1239k ✓ |
| 0 0 1 * *    |   ~22846k |       ~655k ✓ |     ~204k ✓ | ~147k ✓ |      ~1312k ✓ |
| 0 12 31 * *  |   ~20941k |       ~652k ✓ |     ~201k ✓ | ~144k ✓ |      ~1262k ✓ |
| */15 * * * * |   ~16045k |       ~328k ✓ |      ~99k ✓ | ~148k ✓ |      ~1312k ✓ |
| 0 9 * * *    |   ~25554k |       ~424k ✓ |     ~132k ✓ | ~147k ✓ |      ~1271k ✓ |
| 0 9 15 * 1   |   ~21559k |       ~760k ✓ |     ~247k ✓ | ~145k ✓ |      ~1268k ✓ |
| 0 9 * * 1-5  |   ~14439k |       ~417k ✓ |     ~141k ✓ | ~127k ✓ |      ~1246k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case    |     cron-fast |       cron-schedule |           cron-parser |              croner |   cron-validate |
| ------------ | ------------: | ------------------: | --------------------: | ------------------: | --------------: |
| * * * * *    | 37 ns / 47 ns | 4,319 ns / 4,522 ns | 17,075 ns / 17,299 ns | 6,439 ns / 7,655 ns | 807 ns / 905 ns |
| 0 0 1 * *    | 44 ns / 56 ns | 1,528 ns / 1,651 ns |   4,905 ns / 5,135 ns | 6,810 ns / 8,641 ns | 762 ns / 866 ns |
| 0 12 31 * *  | 48 ns / 66 ns | 1,535 ns / 1,640 ns |   4,969 ns / 5,103 ns | 6,930 ns / 8,711 ns | 792 ns / 913 ns |
| */15 * * * * | 62 ns / 76 ns | 3,051 ns / 3,196 ns | 10,139 ns / 10,240 ns | 6,751 ns / 8,549 ns | 762 ns / 878 ns |
| 0 9 * * *    | 39 ns / 49 ns | 2,360 ns / 2,495 ns |   7,574 ns / 7,711 ns | 6,802 ns / 8,430 ns | 787 ns / 892 ns |
| 0 9 15 * 1   | 46 ns / 60 ns | 1,316 ns / 1,465 ns |   4,056 ns / 4,211 ns | 6,901 ns / 8,531 ns | 789 ns / 888 ns |
| 0 9 * * 1-5  | 69 ns / 83 ns | 2,399 ns / 2,542 ns |   7,117 ns / 7,262 ns | 7,895 ns / 9,290 ns | 802 ns / 917 ns |

### Validation Varied Inputs - Throughput (ops/sec)

| Test Case | cron-fast | cron-schedule | cron-parser |  croner | cron-validate |
| --------- | --------: | ------------: | ----------: | ------: | ------------: |
| varied    |   ~18733k |       ~460k ✓ |     ~161k ✓ | ~135k ✓ |       ~897k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation Varied Inputs - Latency (mean / p99)

| Test Case |      cron-fast |       cron-schedule |          cron-parser |               croner |       cron-validate |
| --------- | -------------: | ------------------: | -------------------: | -------------------: | ------------------: |
| varied    | 53 ns / 135 ns | 2,175 ns / 5,708 ns | 6,215 ns / 13,875 ns | 7,395 ns / 15,750 ns | 1,115 ns / 3,708 ns |

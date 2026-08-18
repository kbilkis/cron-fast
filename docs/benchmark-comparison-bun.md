# Benchmark

> Tested with bun v1.3.14, cron-fast v3.7.0, croner v10.0.1, cron-parser v5.10.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by mitata.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2801k      | baseline     |
| cron-schedule | ~319k       | 8.8x faster  |
| cron-parser   | ~41k        | 68.7x faster |
| croner        | ~58k        | 48.6x faster |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~66k        | baseline     |
| cron-schedule | ~24k        | 2.7x faster  |
| cron-parser   | ~1k         | 52.1x faster |
| croner        | ~6k         | 11.0x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~3117k      | baseline     |
| cron-schedule | ~326k       | 9.6x faster  |
| cron-parser   | ~46k        | 67.1x faster |
| croner        | ~57k        | 55.1x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~7104k      | baseline      |
| cron-schedule | ~366k       | 19.4x faster  |
| cron-parser   | ~136k       | 52.3x faster  |
| croner        | ~66k        | 108.2x faster |
| cron-validate | ~998k       | 7.1x faster   |

### Validation Varied Inputs

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~5767k      | baseline     |
| cron-schedule | ~362k       | 15.9x faster |
| cron-parser   | ~151k       | 38.3x faster |
| croner        | ~63k        | 91.4x faster |
| cron-validate | ~758k       | 7.6x faster  |

### Parsing

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~7011k      | baseline      |
| cron-schedule | ~364k       | 19.3x faster  |
| cron-parser   | ~138k       | 50.8x faster  |
| croner        | ~64k        | 108.7x faster |
| cron-validate | ~1004k      | 7.0x faster   |

Run benchmarks yourself: `pnpm bench:bun`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner |
| ------------ | --------: | ------------: | ----------: | -----: |
| * * * * *    |    ~4699k |       ~149k ✓ |      ~35k ✓ | ~61k ✓ |
| 0 0 1 * *    |    ~2973k |       ~417k ✓ |      ~21k ✓ | ~58k ✓ |
| 0 12 31 * *  |    ~2948k |       ~424k ✓ |       ~9k ✓ | ~55k ✓ |
| */15 * * * * |    ~2906k |       ~213k ✓ |      ~71k ✓ | ~62k ✓ |
| 0 9 * * *    |    ~2773k |       ~286k ✓ |      ~51k ✓ | ~60k ✓ |
| 0 9 15 * 1   |    ~1560k |       ~472k ✓ |      ~43k ✓ | ~56k ✓ |
| 0 9 * * 1-5  |    ~1745k |       ~272k ✓ |      ~56k ✓ | ~51k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case    |         cron-fast |       cron-schedule |             cron-parser |                croner |
| ------------ | ----------------: | ------------------: | ----------------------: | --------------------: |
| * * * * *    | 213 ns / 1,250 ns | 6,729 ns / 6,860 ns |   28,889 ns / 46,875 ns | 16,277 ns / 31,083 ns |
| 0 0 1 * *    |   336 ns / 451 ns | 2,397 ns / 2,613 ns |   48,424 ns / 78,541 ns | 17,259 ns / 18,601 ns |
| 0 12 31 * *  |   339 ns / 455 ns | 2,357 ns / 2,510 ns | 116,508 ns / 162,792 ns | 18,303 ns / 19,292 ns |
| */15 * * * * |   344 ns / 456 ns | 4,693 ns / 4,862 ns |   14,089 ns / 14,367 ns | 16,000 ns / 16,503 ns |
| 0 9 * * *    |   361 ns / 472 ns | 3,491 ns / 3,714 ns |   19,461 ns / 20,667 ns | 16,632 ns / 17,522 ns |
| 0 9 15 * 1   |   641 ns / 828 ns | 2,117 ns / 2,407 ns |   23,238 ns / 42,958 ns | 17,979 ns / 18,612 ns |
| 0 9 * * 1-5  |   573 ns / 718 ns | 3,670 ns / 3,830 ns |   17,850 ns / 18,135 ns | 19,718 ns / 20,344 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case   | cron-fast | cron-schedule | cron-parser | croner |
| ----------- | --------: | ------------: | ----------: | -----: |
| * * * * *   |     ~106k |        ~28k ✓ |       ~2k ✓ | ~11k ✓ |
| 0 9 * * 1-5 |      ~25k |        ~20k ✓ |       ~1k ✓ |  ~1k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case   |             cron-fast |         cron-schedule |                 cron-parser |                  croner |
| ----------- | --------------------: | --------------------: | --------------------------: | ----------------------: |
| * * * * *   |   9,397 ns / 9,905 ns | 35,400 ns / 36,281 ns |     515,881 ns / 833,459 ns |  94,782 ns / 124,083 ns |
| 0 9 * * 1-5 | 39,665 ns / 40,420 ns | 50,085 ns / 50,467 ns | 1,696,886 ns / 2,421,334 ns | 703,115 ns / 819,541 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner |
| ------------ | --------: | ------------: | ----------: | -----: |
| * * * * *    |    ~7088k |       ~145k ✓ |      ~36k ✓ | ~59k ✓ |
| 0 0 1 * *    |    ~2727k |       ~429k ✓ |       ~9k ✓ | ~54k ✓ |
| 0 12 31 * *  |    ~2685k |       ~429k ✓ |      ~11k ✓ | ~57k ✓ |
| */15 * * * * |    ~2458k |       ~203k ✓ |      ~66k ✓ | ~53k ✓ |
| 0 9 * * *    |    ~2779k |       ~281k ✓ |      ~61k ✓ | ~59k ✓ |
| 0 9 15 * 1   |    ~2234k |       ~514k ✓ |      ~83k ✓ | ~58k ✓ |
| 0 9 * * 1-5  |    ~1850k |       ~281k ✓ |      ~61k ✓ | ~56k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |             cron-parser |                croner |
| ------------ | --------------: | ------------------: | ----------------------: | --------------------: |
| * * * * *    | 141 ns / 166 ns | 6,889 ns / 7,466 ns |   27,722 ns / 30,142 ns | 16,848 ns / 17,519 ns |
| 0 0 1 * *    | 367 ns / 500 ns | 2,330 ns / 2,498 ns | 116,277 ns / 421,000 ns | 18,595 ns / 19,826 ns |
| 0 12 31 * *  | 372 ns / 497 ns | 2,332 ns / 2,454 ns |  94,796 ns / 139,875 ns | 17,422 ns / 18,178 ns |
| */15 * * * * | 407 ns / 532 ns | 4,915 ns / 5,176 ns |   15,230 ns / 16,369 ns | 18,996 ns / 23,570 ns |
| 0 9 * * *    | 360 ns / 480 ns | 3,560 ns / 3,806 ns |   16,506 ns / 17,386 ns | 16,861 ns / 18,301 ns |
| 0 9 15 * 1   | 448 ns / 583 ns | 1,947 ns / 2,154 ns |   12,076 ns / 12,515 ns | 17,276 ns / 17,398 ns |
| 0 9 * * 1-5  | 540 ns / 652 ns | 3,561 ns / 3,699 ns |   16,362 ns / 16,627 ns | 17,883 ns / 18,151 ns |

### Validation - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| ------------ | --------: | ------------: | ----------: | -----: | ------------: |
| * * * * *    |   ~17091k |       ~159k ✓ |      ~52k ✓ | ~66k ✓ |       ~847k ✓ |
| 0 0 1 * *    |    ~5850k |       ~477k ✓ |     ~177k ✓ | ~66k ✓ |      ~1067k ✓ |
| 0 12 31 * *  |    ~5729k |       ~482k ✓ |     ~185k ✓ | ~66k ✓ |       ~965k ✓ |
| */15 * * * * |    ~5671k |       ~226k ✓ |      ~90k ✓ | ~64k ✓ |      ~1076k ✓ |
| 0 9 * * *    |    ~7440k |       ~313k ✓ |     ~120k ✓ | ~67k ✓ |      ~1022k ✓ |
| 0 9 15 * 1   |    ~4534k |       ~593k ✓ |     ~206k ✓ | ~65k ✓ |       ~953k ✓ |
| 0 9 * * 1-5  |    ~3413k |       ~310k ✓ |     ~122k ✓ | ~64k ✓ |      ~1054k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| * * * * *    |   59 ns / 79 ns | 6,282 ns / 6,505 ns | 19,261 ns / 19,599 ns | 15,074 ns / 15,526 ns | 1,180 ns / 3,583 ns |
| 0 0 1 * *    | 171 ns / 281 ns | 2,095 ns / 2,207 ns |   5,649 ns / 5,921 ns | 15,046 ns / 15,459 ns |   937 ns / 1,072 ns |
| 0 12 31 * *  | 175 ns / 284 ns | 2,075 ns / 2,184 ns |   5,414 ns / 5,560 ns | 15,131 ns / 15,237 ns | 1,036 ns / 1,149 ns |
| */15 * * * * | 176 ns / 236 ns | 4,426 ns / 4,520 ns | 11,127 ns / 11,211 ns | 15,549 ns / 16,633 ns |   930 ns / 1,067 ns |
| 0 9 * * *    | 134 ns / 239 ns | 3,196 ns / 3,300 ns |   8,332 ns / 8,449 ns | 14,883 ns / 14,774 ns |   978 ns / 1,092 ns |
| 0 9 15 * 1   | 221 ns / 330 ns | 1,686 ns / 1,821 ns |   4,862 ns / 4,969 ns | 15,337 ns / 15,672 ns | 1,049 ns / 1,169 ns |
| 0 9 * * 1-5  | 293 ns / 413 ns | 3,227 ns / 3,348 ns |   8,220 ns / 8,354 ns | 15,670 ns / 15,481 ns |   948 ns / 1,072 ns |

### Parsing - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| ------------ | --------: | ------------: | ----------: | -----: | ------------: |
| * * * * *    |   ~16927k |       ~163k ✓ |      ~53k ✓ | ~66k ✓ |      ~1020k ✓ |
| 0 0 1 * *    |    ~5705k |       ~482k ✓ |     ~186k ✓ | ~65k ✓ |      ~1065k ✓ |
| 0 12 31 * *  |    ~5664k |       ~481k ✓ |     ~188k ✓ | ~66k ✓ |       ~939k ✓ |
| */15 * * * * |    ~5637k |       ~222k ✓ |      ~90k ✓ | ~65k ✓ |      ~1079k ✓ |
| 0 9 * * *    |    ~7329k |       ~300k ✓ |     ~117k ✓ | ~65k ✓ |       ~977k ✓ |
| 0 9 15 * 1   |    ~4421k |       ~594k ✓ |     ~211k ✓ | ~63k ✓ |       ~962k ✓ |
| 0 9 * * 1-5  |    ~3392k |       ~307k ✓ |     ~121k ✓ | ~61k ✓ |       ~984k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| * * * * *    |   59 ns / 86 ns | 6,135 ns / 6,201 ns | 18,945 ns / 19,091 ns | 15,163 ns / 15,958 ns |   980 ns / 1,067 ns |
| 0 0 1 * *    | 175 ns / 291 ns | 2,075 ns / 2,213 ns |   5,373 ns / 5,524 ns | 15,297 ns / 14,907 ns |   939 ns / 1,047 ns |
| 0 12 31 * *  | 177 ns / 277 ns | 2,079 ns / 2,211 ns |   5,306 ns / 5,436 ns | 15,205 ns / 15,210 ns | 1,065 ns / 1,146 ns |
| */15 * * * * | 177 ns / 239 ns | 4,499 ns / 4,623 ns | 11,128 ns / 11,193 ns | 15,380 ns / 15,779 ns |   927 ns / 1,024 ns |
| 0 9 * * *    | 136 ns / 214 ns | 3,336 ns / 3,559 ns |   8,538 ns / 8,672 ns | 15,421 ns / 15,213 ns | 1,024 ns / 1,132 ns |
| 0 9 15 * 1   | 226 ns / 344 ns | 1,684 ns / 1,819 ns |   4,741 ns / 4,961 ns | 15,797 ns / 16,927 ns | 1,040 ns / 1,137 ns |
| 0 9 * * 1-5  | 295 ns / 402 ns | 3,255 ns / 3,435 ns |   8,244 ns / 8,386 ns | 16,350 ns / 16,351 ns | 1,016 ns / 1,119 ns |

### Validation Varied Inputs - Throughput (ops/sec)

| Test Case | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------- | --------: | ------------: | ----------: | -----: | ------------: |
| varied    |    ~5767k |       ~362k ✓ |     ~151k ✓ | ~63k ✓ |       ~758k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation Varied Inputs - Latency (mean / p99)

| Test Case |       cron-fast |       cron-schedule |          cron-parser |                croner |       cron-validate |
| --------- | --------------: | ------------------: | -------------------: | --------------------: | ------------------: |
| varied    | 173 ns / 329 ns | 2,761 ns / 6,166 ns | 6,641 ns / 13,875 ns | 15,844 ns / 29,708 ns | 1,319 ns / 3,959 ns |

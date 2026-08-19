# Benchmark

> Tested with bun v1.3.14, cron-fast v3.8.0, croner v10.0.1, cron-parser v5.10.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by mitata.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2882k      | baseline     |
| cron-schedule | ~327k       | 8.8x faster  |
| cron-parser   | ~42k        | 68.1x faster |
| croner        | ~60k        | 48.0x faster |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~65k        | baseline     |
| cron-schedule | ~26k        | 2.5x faster  |
| cron-parser   | ~1k         | 52.8x faster |
| croner        | ~6k         | 10.7x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~3255k      | baseline     |
| cron-schedule | ~338k       | 9.6x faster  |
| cron-parser   | ~49k        | 66.0x faster |
| croner        | ~62k        | 52.4x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~7282k      | baseline      |
| cron-schedule | ~369k       | 19.7x faster  |
| cron-parser   | ~141k       | 51.6x faster  |
| croner        | ~68k        | 107.7x faster |
| cron-validate | ~1017k      | 7.2x faster   |

### Validation Varied Inputs

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~5928k      | baseline     |
| cron-schedule | ~367k       | 16.1x faster |
| cron-parser   | ~153k       | 38.6x faster |
| croner        | ~64k        | 92.7x faster |
| cron-validate | ~792k       | 7.5x faster  |

### Parsing

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~7021k      | baseline      |
| cron-schedule | ~369k       | 19.0x faster  |
| cron-parser   | ~142k       | 49.6x faster  |
| croner        | ~67k        | 105.6x faster |
| cron-validate | ~1026k      | 6.8x faster   |

Run benchmarks yourself: `pnpm bench:bun`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner |
| ------------ | --------: | ------------: | ----------: | -----: |
| * * * * *    |    ~5120k |       ~147k ✓ |      ~35k ✓ | ~62k ✓ |
| 0 0 1 * *    |    ~2962k |       ~429k ✓ |      ~21k ✓ | ~63k ✓ |
| 0 12 31 * *  |    ~2992k |       ~435k ✓ |       ~8k ✓ | ~60k ✓ |
| */15 * * * * |    ~2968k |       ~210k ✓ |      ~73k ✓ | ~64k ✓ |
| 0 9 * * *    |    ~2769k |       ~298k ✓ |      ~54k ✓ | ~62k ✓ |
| 0 9 15 * 1   |    ~1568k |       ~497k ✓ |      ~48k ✓ | ~57k ✓ |
| 0 9 * * 1-5  |    ~1799k |       ~273k ✓ |      ~57k ✓ | ~52k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case    |         cron-fast |       cron-schedule |             cron-parser |                croner |
| ------------ | ----------------: | ------------------: | ----------------------: | --------------------: |
| * * * * *    | 195 ns / 1,125 ns | 6,814 ns / 9,083 ns |   28,386 ns / 43,416 ns | 16,012 ns / 28,833 ns |
| 0 0 1 * *    |   338 ns / 457 ns | 2,329 ns / 2,542 ns |   46,736 ns / 65,250 ns | 15,959 ns / 16,379 ns |
| 0 12 31 * *  |   334 ns / 438 ns | 2,301 ns / 2,395 ns | 119,900 ns / 158,125 ns | 16,679 ns / 16,844 ns |
| */15 * * * * |   337 ns / 438 ns | 4,757 ns / 4,951 ns |   13,776 ns / 13,874 ns | 15,666 ns / 16,188 ns |
| 0 9 * * *    |   361 ns / 475 ns | 3,350 ns / 3,471 ns |   18,465 ns / 19,124 ns | 16,106 ns / 17,204 ns |
| 0 9 15 * 1   |   638 ns / 830 ns | 2,013 ns / 2,230 ns |   20,906 ns / 21,824 ns | 17,655 ns / 18,001 ns |
| 0 9 * * 1-5  |   556 ns / 691 ns | 3,661 ns / 3,795 ns |   17,563 ns / 17,687 ns | 19,055 ns / 20,517 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case   | cron-fast | cron-schedule | cron-parser | croner |
| ----------- | --------: | ------------: | ----------: | -----: |
| * * * * *   |     ~105k |        ~31k ✓ |       ~2k ✓ | ~11k ✓ |
| 0 9 * * 1-5 |      ~26k |        ~21k ✓ |       ~1k ✓ |  ~1k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case   |             cron-fast |         cron-schedule |                 cron-parser |                  croner |
| ----------- | --------------------: | --------------------: | --------------------------: | ----------------------: |
| * * * * *   |  9,552 ns / 10,228 ns | 32,134 ns / 32,059 ns |     535,324 ns / 850,125 ns |  93,722 ns / 114,292 ns |
| 0 9 * * 1-5 | 39,044 ns / 39,459 ns | 48,579 ns / 49,114 ns | 1,666,070 ns / 2,376,458 ns | 682,566 ns / 812,209 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner |
| ------------ | --------: | ------------: | ----------: | -----: |
| * * * * *    |    ~7194k |       ~156k ✓ |      ~41k ✓ | ~63k ✓ |
| 0 0 1 * *    |    ~2931k |       ~446k ✓ |      ~11k ✓ | ~60k ✓ |
| 0 12 31 * *  |    ~2788k |       ~434k ✓ |      ~11k ✓ | ~62k ✓ |
| */15 * * * * |    ~2589k |       ~217k ✓ |      ~72k ✓ | ~64k ✓ |
| 0 9 * * *    |    ~2927k |       ~300k ✓ |      ~61k ✓ | ~65k ✓ |
| 0 9 15 * 1   |    ~2417k |       ~529k ✓ |      ~85k ✓ | ~62k ✓ |
| 0 9 * * 1-5  |    ~1943k |       ~287k ✓ |      ~64k ✓ | ~58k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |            cron-parser |                croner |
| ------------ | --------------: | ------------------: | ---------------------: | --------------------: |
| * * * * *    | 139 ns / 159 ns | 6,414 ns / 6,766 ns |  24,550 ns / 25,468 ns | 15,853 ns / 17,556 ns |
| 0 0 1 * *    | 341 ns / 454 ns | 2,244 ns / 2,348 ns | 88,348 ns / 119,542 ns | 16,571 ns / 17,456 ns |
| 0 12 31 * *  | 359 ns / 463 ns | 2,306 ns / 2,419 ns | 90,258 ns / 116,708 ns | 16,043 ns / 16,205 ns |
| */15 * * * * | 386 ns / 491 ns | 4,599 ns / 4,740 ns |  13,863 ns / 13,923 ns | 15,716 ns / 16,078 ns |
| 0 9 * * *    | 342 ns / 450 ns | 3,339 ns / 3,463 ns |  16,482 ns / 17,687 ns | 15,467 ns / 16,350 ns |
| 0 9 15 * 1   | 414 ns / 522 ns | 1,890 ns / 2,028 ns |  11,744 ns / 11,833 ns | 16,030 ns / 16,027 ns |
| 0 9 * * 1-5  | 515 ns / 609 ns | 3,481 ns / 3,597 ns |  15,563 ns / 16,626 ns | 17,174 ns / 17,295 ns |

### Validation - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| ------------ | --------: | ------------: | ----------: | -----: | ------------: |
| * * * * *    |   ~17920k |       ~165k ✓ |      ~53k ✓ | ~68k ✓ |       ~888k ✓ |
| 0 0 1 * *    |    ~5977k |       ~479k ✓ |     ~189k ✓ | ~68k ✓ |      ~1080k ✓ |
| 0 12 31 * *  |    ~5775k |       ~482k ✓ |     ~189k ✓ | ~67k ✓ |       ~959k ✓ |
| */15 * * * * |    ~5807k |       ~232k ✓ |      ~91k ✓ | ~68k ✓ |      ~1095k ✓ |
| 0 9 * * *    |    ~7488k |       ~318k ✓ |     ~123k ✓ | ~67k ✓ |      ~1050k ✓ |
| 0 9 15 * 1   |    ~4550k |       ~590k ✓ |     ~217k ✓ | ~68k ✓ |       ~980k ✓ |
| 0 9 * * 1-5  |    ~3458k |       ~316k ✓ |     ~125k ✓ | ~66k ✓ |      ~1071k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| * * * * *    |   56 ns / 63 ns | 6,068 ns / 6,172 ns | 18,997 ns / 19,194 ns | 14,619 ns / 14,780 ns | 1,127 ns / 2,875 ns |
| 0 0 1 * *    | 167 ns / 271 ns | 2,086 ns / 2,203 ns |   5,292 ns / 5,458 ns | 14,623 ns / 14,531 ns |   926 ns / 1,058 ns |
| 0 12 31 * *  | 173 ns / 280 ns | 2,073 ns / 2,206 ns |   5,279 ns / 5,516 ns | 14,939 ns / 14,990 ns | 1,043 ns / 1,141 ns |
| */15 * * * * | 172 ns / 216 ns | 4,306 ns / 4,405 ns | 10,964 ns / 11,082 ns | 14,729 ns / 14,731 ns |   913 ns / 1,018 ns |
| 0 9 * * *    | 134 ns / 231 ns | 3,143 ns / 3,252 ns |   8,102 ns / 8,180 ns | 14,819 ns / 17,781 ns |   953 ns / 1,058 ns |
| 0 9 15 * 1   | 220 ns / 327 ns | 1,696 ns / 1,820 ns |   4,600 ns / 4,711 ns | 14,632 ns / 14,505 ns | 1,020 ns / 1,121 ns |
| 0 9 * * 1-5  | 289 ns / 392 ns | 3,164 ns / 3,258 ns |   8,001 ns / 8,094 ns | 15,210 ns / 15,171 ns |   934 ns / 1,040 ns |

### Parsing - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| ------------ | --------: | ------------: | ----------: | -----: | ------------: |
| * * * * *    |   ~17249k |       ~165k ✓ |      ~54k ✓ | ~69k ✓ |      ~1037k ✓ |
| 0 0 1 * *    |    ~5827k |       ~482k ✓ |     ~195k ✓ | ~68k ✓ |      ~1071k ✓ |
| 0 12 31 * *  |    ~5632k |       ~483k ✓ |     ~190k ✓ | ~67k ✓ |       ~954k ✓ |
| */15 * * * * |    ~5713k |       ~220k ✓ |      ~90k ✓ | ~66k ✓ |      ~1093k ✓ |
| 0 9 * * *    |    ~6901k |       ~318k ✓ |     ~123k ✓ | ~63k ✓ |      ~1020k ✓ |
| 0 9 15 * 1   |    ~4450k |       ~608k ✓ |     ~218k ✓ | ~68k ✓ |       ~974k ✓ |
| 0 9 * * 1-5  |    ~3374k |       ~306k ✓ |     ~121k ✓ | ~65k ✓ |      ~1032k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| * * * * *    |   58 ns / 79 ns | 6,058 ns / 6,163 ns | 18,620 ns / 18,721 ns | 14,568 ns / 14,495 ns |   964 ns / 1,073 ns |
| 0 0 1 * *    | 172 ns / 269 ns | 2,073 ns / 2,197 ns |   5,132 ns / 5,263 ns | 14,661 ns / 14,428 ns |   933 ns / 1,051 ns |
| 0 12 31 * *  | 178 ns / 274 ns | 2,069 ns / 2,263 ns |   5,259 ns / 5,419 ns | 14,869 ns / 14,646 ns | 1,048 ns / 1,139 ns |
| */15 * * * * | 175 ns / 225 ns | 4,538 ns / 4,697 ns | 11,069 ns / 11,197 ns | 15,218 ns / 17,339 ns |   915 ns / 1,022 ns |
| 0 9 * * *    | 145 ns / 288 ns | 3,142 ns / 3,233 ns |   8,105 ns / 8,174 ns | 15,965 ns / 19,970 ns |   981 ns / 1,077 ns |
| 0 9 15 * 1   | 225 ns / 335 ns | 1,646 ns / 1,762 ns |   4,580 ns / 4,695 ns | 14,716 ns / 14,468 ns | 1,027 ns / 1,074 ns |
| 0 9 * * 1-5  | 296 ns / 404 ns | 3,267 ns / 3,388 ns |   8,275 ns / 8,373 ns | 15,355 ns / 15,400 ns |   969 ns / 1,039 ns |

### Validation Varied Inputs - Throughput (ops/sec)

| Test Case | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------- | --------: | ------------: | ----------: | -----: | ------------: |
| varied    |    ~5928k |       ~367k ✓ |     ~153k ✓ | ~64k ✓ |       ~792k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation Varied Inputs - Latency (mean / p99)

| Test Case |       cron-fast |       cron-schedule |          cron-parser |                croner |       cron-validate |
| --------- | --------------: | ------------------: | -------------------: | --------------------: | ------------------: |
| varied    | 169 ns / 288 ns | 2,723 ns / 5,834 ns | 6,520 ns / 13,875 ns | 15,639 ns / 29,458 ns | 1,263 ns / 3,666 ns |

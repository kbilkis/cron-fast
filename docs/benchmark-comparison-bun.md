# Benchmark

> Tested with bun v1.4.0, cron-fast v3.11.0, croner v10.0.1, cron-parser v5.10.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by mitata.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~4320k      | baseline     |
| cron-schedule | ~438k       | 9.9x faster  |
| cron-parser   | ~49k        | 88.0x faster |
| croner        | ~59k        | 73.1x faster |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~81k        | baseline     |
| cron-schedule | ~25k        | 3.2x faster  |
| cron-parser   | ~1k         | 62.1x faster |
| croner        | ~6k         | 13.5x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~4468k      | baseline     |
| cron-schedule | ~447k       | 10.0x faster |
| cron-parser   | ~57k        | 78.5x faster |
| croner        | ~61k        | 73.7x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~12570k     | baseline      |
| cron-schedule | ~509k       | 24.7x faster  |
| cron-parser   | ~162k       | 77.7x faster  |
| croner        | ~65k        | 194.4x faster |
| cron-validate | ~1247k      | 10.1x faster  |

### Validation Varied Inputs

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~12322k     | baseline      |
| cron-schedule | ~472k       | 26.1x faster  |
| cron-parser   | ~178k       | 69.3x faster  |
| croner        | ~65k        | 190.9x faster |
| cron-validate | ~905k       | 13.6x faster  |

### Parsing

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~12319k     | baseline      |
| cron-schedule | ~514k       | 24.0x faster  |
| cron-parser   | ~167k       | 73.9x faster  |
| croner        | ~63k        | 196.3x faster |
| cron-validate | ~1280k      | 9.6x faster   |

Run benchmarks yourself: `pnpm bench:bun`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner |
| ------------ | --------: | ------------: | ----------: | -----: |
| * * * * *    |    ~7394k |       ~228k ✓ |      ~40k ✓ | ~61k ✓ |
| 0 0 1 * *    |    ~4303k |       ~556k ✓ |      ~24k ✓ | ~63k ✓ |
| 0 12 31 * *  |    ~4352k |       ~586k ✓ |      ~10k ✓ | ~59k ✓ |
| */15 * * * * |    ~4306k |       ~313k ✓ |      ~86k ✓ | ~60k ✓ |
| 0 9 * * *    |    ~4295k |       ~394k ✓ |      ~65k ✓ | ~63k ✓ |
| 0 9 15 * 1   |    ~2465k |       ~619k ✓ |      ~53k ✓ | ~55k ✓ |
| 0 9 * * 1-5  |    ~3123k |       ~367k ✓ |      ~65k ✓ | ~52k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |            cron-parser |                croner |
| ------------ | --------------: | ------------------: | ---------------------: | --------------------: |
| * * * * *    | 135 ns / 229 ns | 4,389 ns / 4,642 ns |  24,900 ns / 49,375 ns | 16,314 ns / 26,625 ns |
| 0 0 1 * *    | 232 ns / 328 ns | 1,799 ns / 1,939 ns |  41,190 ns / 57,500 ns | 15,946 ns / 16,368 ns |
| 0 12 31 * *  | 230 ns / 317 ns | 1,707 ns / 1,799 ns | 99,564 ns / 130,917 ns | 16,885 ns / 17,522 ns |
| */15 * * * * | 232 ns / 335 ns | 3,193 ns / 3,419 ns |  11,607 ns / 11,861 ns | 16,685 ns / 18,060 ns |
| 0 9 * * *    | 233 ns / 318 ns | 2,536 ns / 2,712 ns |  15,362 ns / 15,438 ns | 15,769 ns / 16,109 ns |
| 0 9 15 * 1   | 406 ns / 522 ns | 1,614 ns / 1,827 ns |  18,772 ns / 19,194 ns | 18,045 ns / 18,985 ns |
| 0 9 * * 1-5  | 320 ns / 417 ns | 2,724 ns / 2,891 ns |  15,461 ns / 16,151 ns | 19,291 ns / 19,739 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case   | cron-fast | cron-schedule | cron-parser | croner |
| ----------- | --------: | ------------: | ----------: | -----: |
| * * * * *   |     ~122k |        ~31k ✓ |       ~2k ✓ | ~11k ✓ |
| 0 9 * * 1-5 |      ~40k |        ~19k ✓ |       ~1k ✓ |  ~1k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case   |             cron-fast |         cron-schedule |                 cron-parser |                  croner |
| ----------- | --------------------: | --------------------: | --------------------------: | ----------------------: |
| * * * * *   |   8,190 ns / 9,397 ns | 32,581 ns / 34,434 ns |     507,158 ns / 664,500 ns |  94,402 ns / 113,042 ns |
| 0 9 * * 1-5 | 25,163 ns / 26,659 ns | 51,795 ns / 53,324 ns | 1,575,956 ns / 2,227,416 ns | 722,129 ns / 815,291 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner |
| ------------ | --------: | ------------: | ----------: | -----: |
| * * * * *    |    ~7712k |       ~217k ✓ |      ~47k ✓ | ~63k ✓ |
| 0 0 1 * *    |    ~3062k |       ~598k ✓ |      ~12k ✓ | ~61k ✓ |
| 0 12 31 * *  |    ~4123k |       ~580k ✓ |      ~12k ✓ | ~59k ✓ |
| */15 * * * * |    ~4351k |       ~311k ✓ |      ~87k ✓ | ~63k ✓ |
| 0 9 * * *    |    ~4509k |       ~407k ✓ |      ~74k ✓ | ~62k ✓ |
| 0 9 15 * 1   |    ~4031k |       ~639k ✓ |      ~92k ✓ | ~59k ✓ |
| 0 9 * * 1-5  |    ~3484k |       ~380k ✓ |      ~76k ✓ | ~57k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case    |         cron-fast |       cron-schedule |            cron-parser |                croner |
| ------------ | ----------------: | ------------------: | ---------------------: | --------------------: |
| * * * * *    |   130 ns / 157 ns | 4,612 ns / 4,911 ns |  21,408 ns / 22,334 ns | 15,818 ns / 16,775 ns |
| 0 0 1 * *    | 327 ns / 1,625 ns | 1,673 ns / 1,787 ns | 83,383 ns / 106,792 ns | 16,392 ns / 17,116 ns |
| 0 12 31 * *  |   243 ns / 319 ns | 1,725 ns / 1,881 ns | 85,648 ns / 111,917 ns | 16,957 ns / 18,048 ns |
| */15 * * * * |   230 ns / 319 ns | 3,216 ns / 3,379 ns |  11,548 ns / 11,620 ns | 15,898 ns / 16,499 ns |
| 0 9 * * *    |   222 ns / 291 ns | 2,459 ns / 2,602 ns |  13,564 ns / 13,625 ns | 16,010 ns / 17,242 ns |
| 0 9 15 * 1   |   248 ns / 341 ns | 1,565 ns / 1,845 ns |  10,890 ns / 11,176 ns | 16,912 ns / 18,357 ns |
| 0 9 * * 1-5  |   287 ns / 368 ns | 2,629 ns / 3,274 ns |  13,216 ns / 13,321 ns | 17,604 ns / 18,683 ns |

### Validation - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| ------------ | --------: | ------------: | ----------: | -----: | ------------: |
| * * * * *    |   ~17317k |       ~231k ✓ |      ~61k ✓ | ~66k ✓ |      ~1208k ✓ |
| 0 0 1 * *    |   ~12974k |       ~670k ✓ |     ~209k ✓ | ~65k ✓ |      ~1321k ✓ |
| 0 12 31 * *  |   ~12540k |       ~673k ✓ |     ~218k ✓ | ~64k ✓ |      ~1275k ✓ |
| */15 * * * * |   ~11583k |       ~335k ✓ |     ~108k ✓ | ~64k ✓ |      ~1024k ✓ |
| 0 9 * * *    |   ~14687k |       ~430k ✓ |     ~144k ✓ | ~66k ✓ |      ~1326k ✓ |
| 0 9 15 * 1   |   ~10875k |       ~791k ✓ |     ~248k ✓ | ~63k ✓ |      ~1277k ✓ |
| 0 9 * * 1-5  |    ~8015k |       ~430k ✓ |     ~145k ✓ | ~63k ✓ |      ~1295k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |     cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | ----------------: |
| * * * * *    |   58 ns / 70 ns | 4,321 ns / 4,447 ns | 16,324 ns / 16,645 ns | 15,042 ns / 15,632 ns |   828 ns / 937 ns |
| 0 0 1 * *    |  77 ns / 105 ns | 1,492 ns / 1,611 ns |   4,781 ns / 4,984 ns | 15,344 ns / 16,226 ns |   757 ns / 859 ns |
| 0 12 31 * *  |   80 ns / 89 ns | 1,486 ns / 1,656 ns |   4,577 ns / 4,944 ns | 15,535 ns / 16,928 ns |   784 ns / 885 ns |
| */15 * * * * |  86 ns / 115 ns | 2,989 ns / 3,101 ns |   9,297 ns / 9,584 ns | 15,631 ns / 16,743 ns | 977 ns / 3,250 ns |
| 0 9 * * *    |   68 ns / 77 ns | 2,323 ns / 2,557 ns |   6,956 ns / 7,189 ns | 15,160 ns / 16,039 ns |   754 ns / 853 ns |
| 0 9 15 * 1   |  92 ns / 131 ns | 1,265 ns / 1,386 ns |   4,038 ns / 4,226 ns | 15,827 ns / 16,719 ns |   783 ns / 880 ns |
| 0 9 * * 1-5  | 125 ns / 205 ns | 2,326 ns / 2,509 ns |   6,906 ns / 7,397 ns | 15,773 ns / 17,389 ns |   772 ns / 923 ns |

### Parsing - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| ------------ | --------: | ------------: | ----------: | -----: | ------------: |
| * * * * *    |   ~17267k |       ~233k ✓ |      ~62k ✓ | ~64k ✓ |      ~1252k ✓ |
| 0 0 1 * *    |   ~12833k |       ~680k ✓ |     ~225k ✓ | ~64k ✓ |      ~1333k ✓ |
| 0 12 31 * *  |   ~12510k |       ~681k ✓ |     ~225k ✓ | ~65k ✓ |      ~1251k ✓ |
| */15 * * * * |   ~11883k |       ~330k ✓ |     ~106k ✓ | ~61k ✓ |      ~1342k ✓ |
| 0 9 * * *    |   ~13546k |       ~440k ✓ |     ~143k ✓ | ~59k ✓ |      ~1248k ✓ |
| 0 9 15 * 1   |   ~10234k |       ~800k ✓ |     ~259k ✓ | ~62k ✓ |      ~1249k ✓ |
| 0 9 * * 1-5  |    ~7958k |       ~436k ✓ |     ~148k ✓ | ~64k ✓ |      ~1283k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |   cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | --------------: |
| * * * * *    |   58 ns / 79 ns | 4,288 ns / 4,478 ns | 16,184 ns / 16,789 ns | 15,721 ns / 16,694 ns | 798 ns / 905 ns |
| 0 0 1 * *    |   78 ns / 92 ns | 1,471 ns / 1,579 ns |   4,447 ns / 4,599 ns | 15,635 ns / 17,865 ns | 750 ns / 831 ns |
| 0 12 31 * *  |   80 ns / 97 ns | 1,469 ns / 1,580 ns |   4,452 ns / 4,552 ns | 15,336 ns / 16,880 ns | 799 ns / 879 ns |
| */15 * * * * |   84 ns / 93 ns | 3,033 ns / 3,234 ns |   9,453 ns / 9,586 ns | 16,342 ns / 17,891 ns | 745 ns / 839 ns |
| 0 9 * * *    |  74 ns / 159 ns | 2,273 ns / 2,392 ns |   7,011 ns / 7,389 ns | 16,981 ns / 19,973 ns | 801 ns / 887 ns |
| 0 9 15 * 1   |  98 ns / 143 ns | 1,250 ns / 1,366 ns |   3,864 ns / 4,026 ns | 16,006 ns / 18,627 ns | 801 ns / 936 ns |
| 0 9 * * 1-5  | 126 ns / 154 ns | 2,293 ns / 2,405 ns |   6,766 ns / 7,248 ns | 15,639 ns / 17,526 ns | 779 ns / 931 ns |

### Validation Varied Inputs - Throughput (ops/sec)

| Test Case | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------- | --------: | ------------: | ----------: | -----: | ------------: |
| varied    |   ~12322k |       ~472k ✓ |     ~178k ✓ | ~65k ✓ |       ~905k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation Varied Inputs - Latency (mean / p99)

| Test Case |      cron-fast |       cron-schedule |          cron-parser |                croner |       cron-validate |
| --------- | -------------: | ------------------: | -------------------: | --------------------: | ------------------: |
| varied    | 81 ns / 179 ns | 2,120 ns / 5,250 ns | 5,621 ns / 10,750 ns | 15,495 ns / 26,292 ns | 1,105 ns / 3,667 ns |

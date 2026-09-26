# Benchmark

> Tested with bun v1.4.0, cron-fast v3.13.0, croner v10.0.1, cron-parser v5.10.1, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by mitata.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~4627k      | baseline     |
| cron-schedule | ~428k       | 10.8x faster |
| cron-parser   | ~49k        | 95.0x faster |
| croner        | ~59k        | 78.9x faster |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~147k       | baseline      |
| cron-schedule | ~25k        | 6.0x faster   |
| cron-parser   | ~1k         | 115.1x faster |
| croner        | ~6k         | 24.7x faster  |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~4808k      | baseline     |
| cron-schedule | ~442k       | 10.9x faster |
| cron-parser   | ~57k        | 84.2x faster |
| croner        | ~60k        | 80.7x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~16348k     | baseline      |
| cron-schedule | ~499k       | 32.7x faster  |
| cron-parser   | ~171k       | 95.4x faster  |
| croner        | ~63k        | 257.8x faster |
| cron-validate | ~1270k      | 12.9x faster  |

### Validation Varied Inputs

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~14979k     | baseline      |
| cron-schedule | ~482k       | 31.1x faster  |
| cron-parser   | ~183k       | 81.9x faster  |
| croner        | ~64k        | 232.6x faster |
| cron-validate | ~914k       | 16.4x faster  |

### Parsing

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~16461k     | baseline      |
| cron-schedule | ~497k       | 33.2x faster  |
| cron-parser   | ~177k       | 93.1x faster  |
| croner        | ~61k        | 270.8x faster |
| cron-validate | ~1207k      | 13.6x faster  |

Run benchmarks yourself: `pnpm bench:bun`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner |
| ------------ | --------: | ------------: | ----------: | -----: |
| * * * * *    |    ~8064k |       ~214k ✓ |      ~41k ✓ | ~60k ✓ |
| 0 0 1 * *    |    ~4654k |       ~563k ✓ |      ~24k ✓ | ~62k ✓ |
| 0 12 31 * *  |    ~4496k |       ~581k ✓ |      ~10k ✓ | ~58k ✓ |
| */15 * * * * |    ~4855k |       ~296k ✓ |      ~85k ✓ | ~63k ✓ |
| 0 9 * * *    |    ~4384k |       ~396k ✓ |      ~62k ✓ | ~60k ✓ |
| 0 9 15 * 1   |    ~2592k |       ~580k ✓ |      ~53k ✓ | ~55k ✓ |
| 0 9 * * 1-5  |    ~3341k |       ~364k ✓ |      ~64k ✓ | ~52k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |             cron-parser |                croner |
| ------------ | --------------: | ------------------: | ----------------------: | --------------------: |
| * * * * *    | 124 ns / 186 ns | 4,681 ns / 4,775 ns |   24,109 ns / 40,292 ns | 16,555 ns / 28,750 ns |
| 0 0 1 * *    | 215 ns / 304 ns | 1,776 ns / 1,961 ns |   40,890 ns / 62,334 ns | 16,082 ns / 16,744 ns |
| 0 12 31 * *  | 222 ns / 321 ns | 1,722 ns / 1,828 ns | 100,849 ns / 142,917 ns | 17,319 ns / 17,805 ns |
| */15 * * * * | 206 ns / 291 ns | 3,383 ns / 3,865 ns |   11,710 ns / 11,921 ns | 15,914 ns / 16,719 ns |
| 0 9 * * *    | 228 ns / 326 ns | 2,526 ns / 2,646 ns |   16,105 ns / 17,458 ns | 16,615 ns / 17,711 ns |
| 0 9 15 * 1   | 386 ns / 496 ns | 1,725 ns / 2,185 ns |   18,743 ns / 18,951 ns | 18,185 ns / 19,202 ns |
| 0 9 * * 1-5  | 299 ns / 378 ns | 2,745 ns / 2,875 ns |   15,540 ns / 16,066 ns | 19,275 ns / 20,310 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case   | cron-fast | cron-schedule | cron-parser | croner |
| ----------- | --------: | ------------: | ----------: | -----: |
| * * * * *   |     ~249k |        ~30k ✓ |       ~2k ✓ | ~11k ✓ |
| 0 9 * * 1-5 |      ~45k |        ~19k ✓ |       ~1k ✓ |  ~1k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case   |             cron-fast |         cron-schedule |                 cron-parser |                  croner |
| ----------- | --------------------: | --------------------: | --------------------------: | ----------------------: |
| * * * * *   |   4,019 ns / 4,647 ns | 33,235 ns / 68,208 ns |     519,380 ns / 910,333 ns |  94,835 ns / 122,625 ns |
| 0 9 * * 1-5 | 22,265 ns / 24,609 ns | 52,109 ns / 52,541 ns | 1,595,444 ns / 2,220,875 ns | 735,348 ns / 817,500 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner |
| ------------ | --------: | ------------: | ----------: | -----: |
| * * * * *    |    ~8191k |       ~216k ✓ |      ~48k ✓ | ~60k ✓ |
| 0 0 1 * *    |    ~3547k |       ~573k ✓ |      ~12k ✓ | ~61k ✓ |
| 0 12 31 * *  |    ~4251k |       ~584k ✓ |      ~12k ✓ | ~59k ✓ |
| */15 * * * * |    ~4877k |       ~296k ✓ |      ~85k ✓ | ~62k ✓ |
| 0 9 * * *    |    ~4754k |       ~404k ✓ |      ~75k ✓ | ~62k ✓ |
| 0 9 15 * 1   |    ~4292k |       ~634k ✓ |      ~93k ✓ | ~61k ✓ |
| 0 9 * * 1-5  |    ~3747k |       ~391k ✓ |      ~76k ✓ | ~53k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case    |         cron-fast |       cron-schedule |            cron-parser |                croner |
| ------------ | ----------------: | ------------------: | ---------------------: | --------------------: |
| * * * * *    |   122 ns / 148 ns | 4,639 ns / 4,999 ns |  20,927 ns / 21,980 ns | 16,668 ns / 17,896 ns |
| 0 0 1 * *    | 282 ns / 1,209 ns | 1,746 ns / 1,866 ns | 82,956 ns / 115,458 ns | 16,495 ns / 17,312 ns |
| 0 12 31 * *  |   235 ns / 273 ns | 1,713 ns / 1,828 ns | 83,927 ns / 101,292 ns | 17,004 ns / 17,845 ns |
| */15 * * * * |   205 ns / 226 ns | 3,383 ns / 3,550 ns |  11,815 ns / 12,099 ns | 16,161 ns / 16,712 ns |
| 0 9 * * *    |   210 ns / 263 ns | 2,474 ns / 2,581 ns |  13,400 ns / 13,458 ns | 16,132 ns / 16,480 ns |
| 0 9 15 * 1   |   233 ns / 281 ns | 1,578 ns / 1,743 ns |  10,808 ns / 11,098 ns | 16,299 ns / 16,964 ns |
| 0 9 * * 1-5  |   267 ns / 308 ns | 2,557 ns / 2,693 ns |  13,086 ns / 13,301 ns | 18,996 ns / 19,031 ns |

### Validation - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| ------------ | --------: | ------------: | ----------: | -----: | ------------: |
| * * * * *    |   ~23475k |       ~226k ✓ |      ~60k ✓ | ~63k ✓ |      ~1213k ✓ |
| 0 0 1 * *    |   ~16005k |       ~666k ✓ |     ~224k ✓ | ~65k ✓ |      ~1299k ✓ |
| 0 12 31 * *  |   ~15259k |       ~665k ✓ |     ~224k ✓ | ~65k ✓ |      ~1216k ✓ |
| */15 * * * * |   ~17038k |       ~320k ✓ |     ~110k ✓ | ~66k ✓ |      ~1340k ✓ |
| 0 9 * * *    |   ~18749k |       ~424k ✓ |     ~152k ✓ | ~64k ✓ |      ~1301k ✓ |
| 0 9 15 * 1   |   ~13080k |       ~787k ✓ |     ~278k ✓ | ~62k ✓ |      ~1265k ✓ |
| 0 9 * * 1-5  |   ~10827k |       ~408k ✓ |     ~152k ✓ | ~59k ✓ |      ~1256k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case    |      cron-fast |       cron-schedule |           cron-parser |                croner |   cron-validate |
| ------------ | -------------: | ------------------: | --------------------: | --------------------: | --------------: |
| * * * * *    |  43 ns / 52 ns | 4,422 ns / 4,550 ns | 16,664 ns / 16,991 ns | 15,759 ns / 17,934 ns | 824 ns / 924 ns |
| 0 0 1 * *    |  62 ns / 83 ns | 1,502 ns / 1,620 ns |   4,466 ns / 4,618 ns | 15,305 ns / 16,351 ns | 770 ns / 877 ns |
| 0 12 31 * *  |  66 ns / 83 ns | 1,505 ns / 1,640 ns |   4,458 ns / 4,631 ns | 15,498 ns / 17,919 ns | 823 ns / 936 ns |
| */15 * * * * |  59 ns / 68 ns | 3,123 ns / 3,309 ns |   9,115 ns / 9,288 ns | 15,242 ns / 15,953 ns | 746 ns / 868 ns |
| 0 9 * * *    |  53 ns / 68 ns | 2,359 ns / 2,463 ns |   6,559 ns / 6,759 ns | 15,745 ns / 17,131 ns | 769 ns / 863 ns |
| 0 9 15 * 1   | 76 ns / 102 ns | 1,271 ns / 1,387 ns |   3,601 ns / 3,771 ns | 16,099 ns / 18,833 ns | 790 ns / 888 ns |
| 0 9 * * 1-5  | 92 ns / 127 ns | 2,449 ns / 2,560 ns |   6,588 ns / 6,763 ns | 16,876 ns / 19,118 ns | 796 ns / 924 ns |

### Parsing - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| ------------ | --------: | ------------: | ----------: | -----: | ------------: |
| * * * * *    |   ~24429k |       ~230k ✓ |      ~64k ✓ | ~61k ✓ |      ~1232k ✓ |
| 0 0 1 * *    |   ~15381k |       ~662k ✓ |     ~245k ✓ | ~62k ✓ |      ~1273k ✓ |
| 0 12 31 * *  |   ~16267k |       ~652k ✓ |     ~239k ✓ | ~60k ✓ |      ~1275k ✓ |
| */15 * * * * |   ~16975k |       ~327k ✓ |     ~111k ✓ | ~57k ✓ |      ~1300k ✓ |
| 0 9 * * *    |   ~18288k |       ~396k ✓ |     ~146k ✓ | ~59k ✓ |       ~877k ✓ |
| 0 9 15 * 1   |   ~13405k |       ~788k ✓ |     ~280k ✓ | ~63k ✓ |      ~1229k ✓ |
| 0 9 * * 1-5  |   ~10478k |       ~420k ✓ |     ~153k ✓ | ~63k ✓ |      ~1262k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case    |      cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| ------------ | -------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| * * * * *    |  41 ns / 54 ns | 4,342 ns / 4,465 ns | 15,709 ns / 16,675 ns | 16,487 ns / 18,628 ns |     812 ns / 909 ns |
| 0 0 1 * *    |  65 ns / 86 ns | 1,510 ns / 1,613 ns |   4,088 ns / 4,242 ns | 16,036 ns / 17,652 ns |     785 ns / 894 ns |
| 0 12 31 * *  |  61 ns / 73 ns | 1,534 ns / 1,635 ns |   4,188 ns / 4,347 ns | 16,707 ns / 18,678 ns |     784 ns / 892 ns |
| */15 * * * * |  59 ns / 74 ns | 3,056 ns / 3,132 ns |   8,989 ns / 9,357 ns | 17,440 ns / 19,954 ns |     769 ns / 881 ns |
| 0 9 * * *    |  55 ns / 77 ns | 2,525 ns / 3,945 ns |   6,871 ns / 7,385 ns | 16,857 ns / 20,074 ns | 1,141 ns / 2,949 ns |
| 0 9 15 * 1   |  75 ns / 89 ns | 1,269 ns / 1,400 ns |   3,574 ns / 3,914 ns | 15,873 ns / 18,559 ns |     814 ns / 951 ns |
| 0 9 * * 1-5  | 95 ns / 146 ns | 2,381 ns / 2,484 ns |   6,518 ns / 7,263 ns | 15,887 ns / 16,487 ns |     792 ns / 934 ns |

### Validation Varied Inputs - Throughput (ops/sec)

| Test Case | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------- | --------: | ------------: | ----------: | -----: | ------------: |
| varied    |   ~14979k |       ~482k ✓ |     ~183k ✓ | ~64k ✓ |       ~914k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation Varied Inputs - Latency (mean / p99)

| Test Case |      cron-fast |       cron-schedule |          cron-parser |                croner |       cron-validate |
| --------- | -------------: | ------------------: | -------------------: | --------------------: | ------------------: |
| varied    | 67 ns / 149 ns | 2,074 ns / 5,292 ns | 5,468 ns / 12,583 ns | 15,532 ns / 27,458 ns | 1,094 ns / 3,833 ns |

# Benchmark

> Tested with bun v1.4.2, cron-fast v3.13.0, croner v11.0.0, cron-parser v5.10.3, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by mitata.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~6327k      | baseline      |
| cron-schedule | ~437k       | 14.5x faster  |
| cron-parser   | ~51k        | 123.3x faster |
| croner        | ~57k        | 110.5x faster |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~147k       | baseline      |
| cron-schedule | ~26k        | 5.6x faster   |
| cron-parser   | ~1k         | 110.0x faster |
| croner        | ~3k         | 46.5x faster  |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~6378k      | baseline      |
| cron-schedule | ~442k       | 14.4x faster  |
| cron-parser   | ~61k        | 105.4x faster |
| croner        | ~57k        | 112.4x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~16795k     | baseline      |
| cron-schedule | ~500k       | 33.6x faster  |
| cron-parser   | ~171k       | 97.9x faster  |
| croner        | ~64k        | 263.5x faster |
| cron-validate | ~1291k      | 13.0x faster  |

### Validation Varied Inputs

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~15278k     | baseline      |
| cron-schedule | ~565k       | 27.0x faster  |
| cron-parser   | ~199k       | 76.9x faster  |
| croner        | ~64k        | 238.8x faster |
| cron-validate | ~920k       | 16.6x faster  |

### Parsing

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~16796k     | baseline      |
| cron-schedule | ~501k       | 33.5x faster  |
| cron-parser   | ~170k       | 98.7x faster  |
| croner        | ~64k        | 263.8x faster |
| cron-validate | ~1298k      | 12.9x faster  |

Run benchmarks yourself: `pnpm bench:bun`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner |
| ------------ | --------: | ------------: | ----------: | -----: |
| * * * * *    |   ~10409k |       ~223k ✓ |      ~43k ✓ | ~59k ✓ |
| 0 0 1 * *    |    ~6433k |       ~601k ✓ |      ~25k ✓ | ~61k ✓ |
| 0 12 31 * *  |    ~6484k |       ~560k ✓ |      ~10k ✓ | ~57k ✓ |
| */15 * * * * |    ~6884k |       ~303k ✓ |      ~90k ✓ | ~59k ✓ |
| 0 9 * * *    |    ~6178k |       ~385k ✓ |      ~68k ✓ | ~62k ✓ |
| 0 9 15 * 1   |    ~3354k |       ~617k ✓ |      ~56k ✓ | ~53k ✓ |
| 0 9 * * 1-5  |    ~4544k |       ~367k ✓ |      ~67k ✓ | ~50k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |            cron-parser |                croner |
| ------------ | --------------: | ------------------: | ---------------------: | --------------------: |
| * * * * *    |  96 ns / 164 ns | 4,490 ns / 4,706 ns |  23,176 ns / 35,041 ns | 16,820 ns / 22,334 ns |
| 0 0 1 * *    | 155 ns / 238 ns | 1,663 ns / 1,923 ns |  40,297 ns / 57,417 ns | 16,495 ns / 17,114 ns |
| 0 12 31 * *  | 154 ns / 235 ns | 1,784 ns / 1,880 ns | 96,525 ns / 128,500 ns | 17,445 ns / 17,872 ns |
| */15 * * * * | 145 ns / 223 ns | 3,304 ns / 3,442 ns |  11,172 ns / 11,322 ns | 17,060 ns / 17,692 ns |
| 0 9 * * *    | 162 ns / 249 ns | 2,597 ns / 2,734 ns |  14,714 ns / 15,010 ns | 16,053 ns / 16,152 ns |
| 0 9 15 * 1   | 298 ns / 409 ns | 1,620 ns / 1,725 ns |  17,889 ns / 18,080 ns | 18,883 ns / 19,294 ns |
| 0 9 * * 1-5  | 220 ns / 295 ns | 2,726 ns / 2,832 ns |  14,845 ns / 14,973 ns | 20,197 ns / 20,702 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case   | cron-fast | cron-schedule | cron-parser | croner |
| ----------- | --------: | ------------: | ----------: | -----: |
| * * * * *   |     ~235k |        ~33k ✓ |       ~2k ✓ |  ~5k ✓ |
| 0 9 * * 1-5 |      ~59k |        ~20k ✓ |       ~1k ✓ |  ~1k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case   |             cron-fast |         cron-schedule |                 cron-parser |                  croner |
| ----------- | --------------------: | --------------------: | --------------------------: | ----------------------: |
| * * * * *   |   4,251 ns / 4,393 ns | 30,563 ns / 31,263 ns |     496,028 ns / 611,083 ns | 202,208 ns / 246,792 ns |
| 0 9 * * 1-5 | 16,931 ns / 17,473 ns | 50,784 ns / 51,955 ns | 1,515,060 ns / 2,096,417 ns | 722,052 ns / 801,500 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner |
| ------------ | --------: | ------------: | ----------: | -----: |
| * * * * *    |    ~9563k |       ~212k ✓ |      ~49k ✓ | ~59k ✓ |
| 0 0 1 * *    |    ~6255k |       ~590k ✓ |      ~12k ✓ | ~54k ✓ |
| 0 12 31 * *  |    ~5933k |       ~569k ✓ |      ~12k ✓ | ~57k ✓ |
| */15 * * * * |    ~6139k |       ~301k ✓ |      ~90k ✓ | ~60k ✓ |
| 0 9 * * *    |    ~6210k |       ~407k ✓ |      ~78k ✓ | ~57k ✓ |
| 0 9 15 * 1   |    ~5664k |       ~634k ✓ |     ~104k ✓ | ~58k ✓ |
| 0 9 * * 1-5  |    ~4880k |       ~383k ✓ |      ~78k ✓ | ~52k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |            cron-parser |                croner |
| ------------ | --------------: | ------------------: | ---------------------: | --------------------: |
| * * * * *    | 105 ns / 124 ns | 4,726 ns / 4,956 ns |  20,212 ns / 20,610 ns | 17,086 ns / 17,811 ns |
| 0 0 1 * *    | 160 ns / 197 ns | 1,695 ns / 1,805 ns | 81,271 ns / 102,750 ns | 18,479 ns / 19,462 ns |
| 0 12 31 * *  | 169 ns / 190 ns | 1,759 ns / 1,960 ns | 83,822 ns / 114,375 ns | 17,593 ns / 18,132 ns |
| */15 * * * * | 163 ns / 173 ns | 3,323 ns / 3,447 ns |  11,126 ns / 11,334 ns | 16,668 ns / 17,314 ns |
| 0 9 * * *    | 161 ns / 193 ns | 2,455 ns / 2,544 ns |  12,871 ns / 12,959 ns | 17,458 ns / 18,067 ns |
| 0 9 15 * 1   | 177 ns / 210 ns | 1,578 ns / 1,709 ns |    9,632 ns / 9,698 ns | 17,230 ns / 18,146 ns |
| 0 9 * * 1-5  | 205 ns / 227 ns | 2,611 ns / 2,750 ns |  12,752 ns / 13,019 ns | 19,119 ns / 20,515 ns |

### Validation - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| ------------ | --------: | ------------: | ----------: | -----: | ------------: |
| * * * * *    |   ~25002k |       ~227k ✓ |      ~63k ✓ | ~64k ✓ |      ~1232k ✓ |
| 0 0 1 * *    |   ~16389k |       ~659k ✓ |     ~218k ✓ | ~65k ✓ |      ~1320k ✓ |
| 0 12 31 * *  |   ~15341k |       ~660k ✓ |     ~224k ✓ | ~64k ✓ |      ~1260k ✓ |
| */15 * * * * |   ~17074k |       ~323k ✓ |     ~113k ✓ | ~62k ✓ |      ~1360k ✓ |
| 0 9 * * *    |   ~19208k |       ~430k ✓ |     ~151k ✓ | ~67k ✓ |      ~1293k ✓ |
| 0 9 15 * 1   |   ~13332k |       ~777k ✓ |     ~272k ✓ | ~63k ✓ |      ~1286k ✓ |
| 0 9 * * 1-5  |   ~11222k |       ~423k ✓ |     ~160k ✓ | ~61k ✓ |      ~1284k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case    |     cron-fast |       cron-schedule |           cron-parser |                croner |   cron-validate |
| ------------ | ------------: | ------------------: | --------------------: | --------------------: | --------------: |
| * * * * *    | 40 ns / 46 ns | 4,400 ns / 4,559 ns | 15,807 ns / 16,054 ns | 15,626 ns / 16,963 ns | 812 ns / 908 ns |
| 0 0 1 * *    | 61 ns / 71 ns | 1,518 ns / 1,614 ns |   4,586 ns / 4,776 ns | 15,314 ns / 16,501 ns | 757 ns / 864 ns |
| 0 12 31 * *  | 65 ns / 79 ns | 1,515 ns / 1,638 ns |   4,469 ns / 4,613 ns | 15,675 ns / 16,445 ns | 793 ns / 882 ns |
| */15 * * * * | 59 ns / 65 ns | 3,097 ns / 3,252 ns |   8,848 ns / 9,008 ns | 16,026 ns / 17,690 ns | 735 ns / 839 ns |
| 0 9 * * *    | 52 ns / 58 ns | 2,327 ns / 2,455 ns |   6,644 ns / 6,807 ns | 14,910 ns / 16,262 ns | 773 ns / 848 ns |
| 0 9 15 * 1   | 75 ns / 86 ns | 1,287 ns / 1,398 ns |   3,674 ns / 3,773 ns | 15,861 ns / 16,760 ns | 778 ns / 882 ns |
| 0 9 * * 1-5  | 89 ns / 97 ns | 2,364 ns / 2,475 ns |   6,266 ns / 6,388 ns | 16,506 ns / 17,301 ns | 779 ns / 876 ns |

### Parsing - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| ------------ | --------: | ------------: | ----------: | -----: | ------------: |
| * * * * *    |   ~24163k |       ~233k ✓ |      ~64k ✓ | ~65k ✓ |      ~1267k ✓ |
| 0 0 1 * *    |   ~15864k |       ~661k ✓ |     ~223k ✓ | ~62k ✓ |      ~1296k ✓ |
| 0 12 31 * *  |   ~16248k |       ~664k ✓ |     ~223k ✓ | ~62k ✓ |      ~1308k ✓ |
| */15 * * * * |   ~17460k |       ~324k ✓ |     ~110k ✓ | ~66k ✓ |      ~1357k ✓ |
| 0 9 * * *    |   ~19351k |       ~433k ✓ |     ~149k ✓ | ~66k ✓ |      ~1299k ✓ |
| 0 9 15 * 1   |   ~13210k |       ~777k ✓ |     ~268k ✓ | ~64k ✓ |      ~1264k ✓ |
| 0 9 * * 1-5  |   ~11274k |       ~416k ✓ |     ~155k ✓ | ~60k ✓ |      ~1293k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case    |     cron-fast |       cron-schedule |           cron-parser |                croner |   cron-validate |
| ------------ | ------------: | ------------------: | --------------------: | --------------------: | --------------: |
| * * * * *    | 41 ns / 47 ns | 4,286 ns / 4,414 ns | 15,717 ns / 16,166 ns | 15,446 ns / 16,976 ns | 789 ns / 880 ns |
| 0 0 1 * *    | 63 ns / 69 ns | 1,513 ns / 1,608 ns |   4,485 ns / 4,737 ns | 16,236 ns / 18,607 ns | 772 ns / 849 ns |
| 0 12 31 * *  | 62 ns / 66 ns | 1,507 ns / 1,610 ns |   4,489 ns / 4,752 ns | 16,023 ns / 17,795 ns | 765 ns / 844 ns |
| */15 * * * * | 57 ns / 63 ns | 3,087 ns / 3,232 ns |   9,111 ns / 9,273 ns | 15,090 ns / 16,056 ns | 737 ns / 841 ns |
| 0 9 * * *    | 52 ns / 57 ns | 2,309 ns / 2,425 ns |   6,704 ns / 6,883 ns | 15,077 ns / 16,061 ns | 770 ns / 861 ns |
| 0 9 15 * 1   | 76 ns / 85 ns | 1,287 ns / 1,396 ns |   3,735 ns / 3,891 ns | 15,606 ns / 16,821 ns | 791 ns / 855 ns |
| 0 9 * * 1-5  | 89 ns / 95 ns | 2,404 ns / 2,525 ns |   6,443 ns / 6,558 ns | 16,608 ns / 18,107 ns | 773 ns / 862 ns |

### Validation Varied Inputs - Throughput (ops/sec)

| Test Case | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------- | --------: | ------------: | ----------: | -----: | ------------: |
| varied    |   ~15278k |       ~565k ✓ |     ~199k ✓ | ~64k ✓ |       ~920k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation Varied Inputs - Latency (mean / p99)

| Test Case |      cron-fast |       cron-schedule |         cron-parser |                croner |       cron-validate |
| --------- | -------------: | ------------------: | ------------------: | --------------------: | ------------------: |
| varied    | 65 ns / 134 ns | 1,770 ns / 2,346 ns | 5,031 ns / 9,750 ns | 15,629 ns / 22,208 ns | 1,087 ns / 4,042 ns |

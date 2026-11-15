# Benchmark

> Tested with deno v2.9.8, cron-fast v3.15.0, croner v11.0.1, cron-parser v5.10.6, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by Deno.bench().

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~5361k      | baseline      |
| cron-schedule | ~396k       | 13.5x faster  |
| cron-parser   | ~42k        | 129.0x faster |
| croner        | ~65k        | 82.3x faster  |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~99k        | baseline     |
| cron-schedule | ~18k        | 5.6x faster  |
| cron-parser   | ~1k         | 77.7x faster |
| croner        | ~1k         | 73.7x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~5924k      | baseline      |
| cron-schedule | ~423k       | 14.0x faster  |
| cron-parser   | ~49k        | 122.1x faster |
| croner        | ~60k        | 98.4x faster  |

### Validation

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~17020k     | baseline      |
| cron-schedule | ~566k       | 30.1x faster  |
| cron-parser   | ~130k       | 131.0x faster |
| croner        | ~92k        | 185.1x faster |
| cron-validate | ~1677k      | 10.1x faster  |

### Validation Varied Inputs

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~17451k     | baseline      |
| cron-schedule | ~643k       | 27.1x faster  |
| cron-parser   | ~159k       | 109.4x faster |
| croner        | ~92k        | 189.2x faster |
| cron-validate | ~1412k      | 12.4x faster  |

### Parsing

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~17153k     | baseline      |
| cron-schedule | ~568k       | 30.2x faster  |
| cron-parser   | ~130k       | 131.9x faster |
| croner        | ~92k        | 186.8x faster |
| cron-validate | ~1646k      | 10.4x faster  |

Run benchmarks yourself: `pnpm bench:deno`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner |
| ------------ | --------: | ------------: | ----------: | -----: |
| * * * * *    |    ~8545k |       ~155k ✓ |      ~38k ✓ | ~69k ✓ |
| 0 0 1 * *    |    ~5806k |       ~564k ✓ |      ~19k ✓ | ~71k ✓ |
| 0 12 31 * *  |    ~5574k |       ~543k ✓ |       ~8k ✓ | ~63k ✓ |
| */15 * * * * |    ~5072k |       ~290k ✓ |      ~72k ✓ | ~69k ✓ |
| 0 9 * * *    |    ~5473k |       ~378k ✓ |      ~53k ✓ | ~71k ✓ |
| 0 9 15 * 1   |    ~2833k |       ~512k ✓ |      ~45k ✓ | ~62k ✓ |
| 0 9 * * 1-5  |    ~4221k |       ~330k ✓ |      ~55k ✓ | ~53k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |             cron-parser |                croner |
| ------------ | --------------: | ------------------: | ----------------------: | --------------------: |
| * * * * *    | 117 ns / 132 ns | 6,455 ns / 7,516 ns |   26,077 ns / 67,708 ns | 14,484 ns / 45,625 ns |
| 0 0 1 * *    | 172 ns / 187 ns | 1,774 ns / 2,067 ns |  51,644 ns / 121,583 ns | 14,166 ns / 38,709 ns |
| 0 12 31 * *  | 179 ns / 200 ns | 1,841 ns / 1,880 ns | 127,358 ns / 233,666 ns | 15,924 ns / 37,041 ns |
| */15 * * * * | 197 ns / 218 ns | 3,445 ns / 3,575 ns |   13,894 ns / 23,250 ns | 14,585 ns / 35,500 ns |
| 0 9 * * *    | 183 ns / 203 ns | 2,648 ns / 2,701 ns |   18,744 ns / 37,250 ns | 14,161 ns / 30,583 ns |
| 0 9 15 * 1   | 353 ns / 373 ns | 1,954 ns / 2,044 ns |   22,396 ns / 37,834 ns | 16,219 ns / 38,500 ns |
| 0 9 * * 1-5  | 237 ns / 260 ns | 3,034 ns / 3,099 ns |   18,103 ns / 34,208 ns | 18,958 ns / 51,375 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case   | cron-fast | cron-schedule | cron-parser | croner |
| ----------- | --------: | ------------: | ----------: | -----: |
| * * * * *   |     ~153k |        ~24k ✓ |       ~2k ✓ |  ~2k ✓ |
| 0 9 * * 1-5 |      ~46k |        ~12k ✓ |       ~1k ✓ |  ~1k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case   |             cron-fast |          cron-schedule |                 cron-parser |                      croner |
| ----------- | --------------------: | ---------------------: | --------------------------: | --------------------------: |
| * * * * *   |   6,540 ns / 6,694 ns |  41,769 ns / 73,833 ns |     499,837 ns / 633,750 ns |     528,694 ns / 673,875 ns |
| 0 9 * * 1-5 | 21,845 ns / 33,958 ns | 85,099 ns / 113,917 ns | 1,799,827 ns / 2,386,875 ns | 1,241,420 ns / 1,398,416 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner |
| ------------ | --------: | ------------: | ----------: | -----: |
| * * * * *    |    ~8592k |       ~190k ✓ |      ~47k ✓ | ~64k ✓ |
| 0 0 1 * *    |    ~6060k |       ~597k ✓ |       ~9k ✓ | ~59k ✓ |
| 0 12 31 * *  |    ~5214k |       ~509k ✓ |       ~9k ✓ | ~57k ✓ |
| */15 * * * * |    ~5117k |       ~289k ✓ |      ~74k ✓ | ~65k ✓ |
| 0 9 * * *    |    ~6074k |       ~388k ✓ |      ~59k ✓ | ~62k ✓ |
| 0 9 15 * 1   |    ~5857k |       ~619k ✓ |      ~78k ✓ | ~61k ✓ |
| 0 9 * * 1-5  |    ~4551k |       ~369k ✓ |      ~64k ✓ | ~52k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |             cron-parser |                croner |
| ------------ | --------------: | ------------------: | ----------------------: | --------------------: |
| * * * * *    | 116 ns / 134 ns | 5,260 ns / 5,833 ns |   21,294 ns / 34,625 ns | 15,535 ns / 28,625 ns |
| 0 0 1 * *    | 165 ns / 186 ns | 1,676 ns / 1,798 ns | 108,687 ns / 220,083 ns | 16,875 ns / 31,375 ns |
| 0 12 31 * *  | 192 ns / 213 ns | 1,965 ns / 2,037 ns | 117,087 ns / 234,084 ns | 17,421 ns / 31,958 ns |
| */15 * * * * | 195 ns / 216 ns | 3,457 ns / 3,543 ns |   13,461 ns / 21,875 ns | 15,451 ns / 26,583 ns |
| 0 9 * * *    | 165 ns / 183 ns | 2,580 ns / 2,653 ns |   16,973 ns / 31,334 ns | 16,189 ns / 26,792 ns |
| 0 9 15 * 1   | 171 ns / 187 ns | 1,616 ns / 1,664 ns |   12,857 ns / 21,166 ns | 16,298 ns / 26,292 ns |
| 0 9 * * 1-5  | 220 ns / 241 ns | 2,711 ns / 2,752 ns |   15,665 ns / 24,250 ns | 19,085 ns / 37,167 ns |

### Validation - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| ------------ | --------: | ------------: | ----------: | -----: | ------------: |
| * * * * *    |   ~20669k |       ~212k ✓ |      ~61k ✓ | ~96k ✓ |      ~1682k ✓ |
| 0 0 1 * *    |   ~19692k |       ~785k ✓ |     ~170k ✓ | ~93k ✓ |      ~1751k ✓ |
| 0 12 31 * *  |   ~17377k |       ~783k ✓ |     ~163k ✓ | ~93k ✓ |      ~1732k ✓ |
| */15 * * * * |   ~12215k |       ~326k ✓ |      ~88k ✓ | ~94k ✓ |      ~1561k ✓ |
| 0 9 * * *    |   ~20187k |       ~466k ✓ |     ~116k ✓ | ~95k ✓ |      ~1681k ✓ |
| 0 9 15 * 1   |   ~17318k |       ~927k ✓ |     ~190k ✓ | ~92k ✓ |      ~1744k ✓ |
| 0 9 * * 1-5  |   ~11680k |       ~464k ✓ |     ~121k ✓ | ~82k ✓ |      ~1588k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case    |      cron-fast |       cron-schedule |           cron-parser |                croner |   cron-validate |
| ------------ | -------------: | ------------------: | --------------------: | --------------------: | --------------: |
| * * * * *    |  48 ns / 61 ns | 4,724 ns / 4,801 ns | 16,354 ns / 27,416 ns | 10,467 ns / 16,458 ns | 595 ns / 677 ns |
| 0 0 1 * *    |  51 ns / 63 ns | 1,274 ns / 1,342 ns |   5,895 ns / 6,208 ns | 10,790 ns / 19,666 ns | 571 ns / 602 ns |
| 0 12 31 * *  |  58 ns / 73 ns | 1,277 ns / 1,313 ns |   6,135 ns / 6,250 ns | 10,786 ns / 18,583 ns | 577 ns / 607 ns |
| */15 * * * * |  82 ns / 96 ns | 3,069 ns / 3,140 ns | 11,313 ns / 16,167 ns | 10,660 ns / 16,042 ns | 641 ns / 679 ns |
| 0 9 * * *    |  50 ns / 62 ns | 2,146 ns / 2,216 ns |   8,614 ns / 8,684 ns | 10,533 ns / 16,084 ns | 595 ns / 636 ns |
| 0 9 15 * 1   |  58 ns / 71 ns | 1,079 ns / 1,112 ns |   5,254 ns / 5,338 ns | 10,915 ns / 18,625 ns | 573 ns / 610 ns |
| 0 9 * * 1-5  | 86 ns / 101 ns | 2,155 ns / 2,208 ns |   8,283 ns / 8,411 ns | 12,164 ns / 23,833 ns | 630 ns / 657 ns |

### Parsing - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| ------------ | --------: | ------------: | ----------: | -----: | ------------: |
| * * * * *    |   ~20648k |       ~212k ✓ |      ~61k ✓ | ~95k ✓ |      ~1637k ✓ |
| 0 0 1 * *    |   ~19908k |       ~786k ✓ |     ~170k ✓ | ~95k ✓ |      ~1683k ✓ |
| 0 12 31 * *  |   ~17592k |       ~784k ✓ |     ~166k ✓ | ~91k ✓ |      ~1683k ✓ |
| */15 * * * * |   ~12317k |       ~328k ✓ |      ~88k ✓ | ~93k ✓ |      ~1545k ✓ |
| 0 9 * * *    |   ~20114k |       ~465k ✓ |     ~116k ✓ | ~94k ✓ |      ~1661k ✓ |
| 0 9 15 * 1   |   ~17712k |       ~937k ✓ |     ~189k ✓ | ~92k ✓ |      ~1724k ✓ |
| 0 9 * * 1-5  |   ~11780k |       ~464k ✓ |     ~121k ✓ | ~84k ✓ |      ~1592k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case    |      cron-fast |       cron-schedule |           cron-parser |                croner |   cron-validate |
| ------------ | -------------: | ------------------: | --------------------: | --------------------: | --------------: |
| * * * * *    |  48 ns / 60 ns | 4,728 ns / 4,895 ns | 16,327 ns / 28,959 ns | 10,517 ns / 17,166 ns | 611 ns / 671 ns |
| 0 0 1 * *    |  50 ns / 62 ns | 1,273 ns / 1,308 ns |   5,885 ns / 5,981 ns | 10,547 ns / 15,625 ns | 594 ns / 635 ns |
| 0 12 31 * *  |  57 ns / 71 ns | 1,276 ns / 1,308 ns |   6,033 ns / 6,177 ns | 11,048 ns / 18,875 ns | 594 ns / 618 ns |
| */15 * * * * |  81 ns / 96 ns | 3,049 ns / 3,147 ns | 11,397 ns / 19,083 ns | 10,803 ns / 18,541 ns | 647 ns / 672 ns |
| 0 9 * * *    |  50 ns / 63 ns | 2,151 ns / 2,226 ns |   8,622 ns / 8,750 ns | 10,689 ns / 18,875 ns | 602 ns / 638 ns |
| 0 9 15 * 1   |  56 ns / 69 ns | 1,068 ns / 1,105 ns |   5,305 ns / 5,410 ns | 10,841 ns / 17,500 ns | 580 ns / 602 ns |
| 0 9 * * 1-5  | 85 ns / 100 ns | 2,153 ns / 2,215 ns |   8,231 ns / 8,355 ns | 11,905 ns / 19,917 ns | 628 ns / 672 ns |

### Validation Varied Inputs - Throughput (ops/sec)

| Test Case | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------- | --------: | ------------: | ----------: | -----: | ------------: |
| varied    |   ~17451k |       ~643k ✓ |     ~159k ✓ | ~92k ✓ |      ~1412k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation Varied Inputs - Latency (mean / p99)

| Test Case |     cron-fast |       cron-schedule |         cron-parser |                croner |   cron-validate |
| --------- | ------------: | ------------------: | ------------------: | --------------------: | --------------: |
| varied    | 57 ns / 71 ns | 1,555 ns / 1,753 ns | 6,270 ns / 6,352 ns | 10,843 ns / 17,833 ns | 708 ns / 751 ns |

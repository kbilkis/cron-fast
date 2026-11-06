# Benchmark

> Tested with deno v2.9.8, cron-fast v3.13.0, croner v11.0.0, cron-parser v5.10.3, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by Deno.bench().

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~5019k      | baseline      |
| cron-schedule | ~398k       | 12.6x faster  |
| cron-parser   | ~36k        | 141.4x faster |
| croner        | ~30k        | 168.9x faster |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~101k       | baseline      |
| cron-schedule | ~18k        | 5.6x faster   |
| cron-parser   | ~1k         | 107.9x faster |
| croner        | ~2k         | 60.0x faster  |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~5451k      | baseline      |
| cron-schedule | ~424k       | 12.9x faster  |
| cron-parser   | ~41k        | 134.0x faster |
| croner        | ~30k        | 182.9x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~13632k     | baseline      |
| cron-schedule | ~560k       | 24.3x faster  |
| cron-parser   | ~107k       | 127.3x faster |
| croner        | ~34k        | 405.1x faster |
| cron-validate | ~1654k      | 8.2x faster   |

### Validation Varied Inputs

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~12972k     | baseline      |
| cron-schedule | ~631k       | 20.6x faster  |
| cron-parser   | ~136k       | 95.1x faster  |
| croner        | ~33k        | 392.8x faster |
| cron-validate | ~1390k      | 9.3x faster   |

### Parsing

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~13719k     | baseline      |
| cron-schedule | ~561k       | 24.4x faster  |
| cron-parser   | ~108k       | 127.6x faster |
| croner        | ~33k        | 412.3x faster |
| cron-validate | ~1617k      | 8.5x faster   |

Run benchmarks yourself: `pnpm bench:deno`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner |
| ------------ | --------: | ------------: | ----------: | -----: |
| * * * * *    |    ~8591k |       ~161k ✓ |      ~33k ✓ | ~31k ✓ |
| 0 0 1 * *    |    ~5256k |       ~566k ✓ |      ~19k ✓ | ~30k ✓ |
| 0 12 31 * *  |    ~4955k |       ~553k ✓ |       ~7k ✓ | ~29k ✓ |
| */15 * * * * |    ~5100k |       ~289k ✓ |      ~58k ✓ | ~31k ✓ |
| 0 9 * * *    |    ~5039k |       ~387k ✓ |      ~46k ✓ | ~31k ✓ |
| 0 9 15 * 1   |    ~2535k |       ~497k ✓ |      ~40k ✓ | ~29k ✓ |
| 0 9 * * 1-5  |    ~3656k |       ~333k ✓ |      ~47k ✓ | ~27k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |             cron-parser |                croner |
| ------------ | --------------: | ------------------: | ----------------------: | --------------------: |
| * * * * *    | 116 ns / 133 ns | 6,218 ns / 7,237 ns |   30,595 ns / 55,833 ns | 32,150 ns / 64,833 ns |
| 0 0 1 * *    | 190 ns / 201 ns | 1,768 ns / 1,939 ns |   53,307 ns / 79,875 ns | 33,841 ns / 54,042 ns |
| 0 12 31 * *  | 202 ns / 220 ns | 1,807 ns / 1,844 ns | 133,443 ns / 241,583 ns | 34,574 ns / 44,167 ns |
| */15 * * * * | 196 ns / 208 ns | 3,465 ns / 3,558 ns |   17,312 ns / 20,708 ns | 32,486 ns / 40,792 ns |
| 0 9 * * *    | 198 ns / 217 ns | 2,585 ns / 2,617 ns |   21,944 ns / 28,041 ns | 32,216 ns / 38,875 ns |
| 0 9 15 * 1   | 394 ns / 413 ns | 2,011 ns / 2,067 ns |   25,250 ns / 35,958 ns | 34,040 ns / 46,125 ns |
| 0 9 * * 1-5  | 273 ns / 318 ns | 3,000 ns / 3,072 ns |   21,448 ns / 29,166 ns | 36,690 ns / 52,958 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case   | cron-fast | cron-schedule | cron-parser | croner |
| ----------- | --------: | ------------: | ----------: | -----: |
| * * * * *   |     ~155k |        ~24k ✓ |       ~1k ✓ |  ~3k ✓ |
| 0 9 * * 1-5 |      ~47k |        ~12k ✓ |       ~0k ✓ |  ~1k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case   |             cron-fast |         cron-schedule |                 cron-parser |                      croner |
| ----------- | --------------------: | --------------------: | --------------------------: | --------------------------: |
| * * * * *   |   6,436 ns / 6,509 ns | 41,606 ns / 73,042 ns |     715,116 ns / 875,750 ns |     398,505 ns / 525,666 ns |
| 0 9 * * 1-5 | 21,485 ns / 25,500 ns | 83,605 ns / 96,458 ns | 2,113,890 ns / 2,412,958 ns | 1,167,390 ns / 1,315,917 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner |
| ------------ | --------: | ------------: | ----------: | -----: |
| * * * * *    |    ~8677k |       ~192k ✓ |      ~36k ✓ | ~31k ✓ |
| 0 0 1 * *    |    ~5529k |       ~597k ✓ |       ~9k ✓ | ~30k ✓ |
| 0 12 31 * *  |    ~4558k |       ~509k ✓ |       ~8k ✓ | ~30k ✓ |
| */15 * * * * |    ~5078k |       ~293k ✓ |      ~58k ✓ | ~31k ✓ |
| 0 9 * * *    |    ~5552k |       ~385k ✓ |      ~51k ✓ | ~30k ✓ |
| 0 9 15 * 1   |    ~4750k |       ~620k ✓ |      ~69k ✓ | ~30k ✓ |
| 0 9 * * 1-5  |    ~4013k |       ~371k ✓ |      ~53k ✓ | ~28k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |             cron-parser |                croner |
| ------------ | --------------: | ------------------: | ----------------------: | --------------------: |
| * * * * *    | 115 ns / 126 ns | 5,217 ns / 5,677 ns |   27,781 ns / 33,792 ns | 32,421 ns / 42,667 ns |
| 0 0 1 * *    | 181 ns / 197 ns | 1,675 ns / 1,763 ns | 112,294 ns / 217,875 ns | 33,738 ns / 45,625 ns |
| 0 12 31 * *  | 219 ns / 236 ns | 1,965 ns / 2,035 ns | 119,053 ns / 228,500 ns | 33,885 ns / 44,625 ns |
| */15 * * * * | 197 ns / 213 ns | 3,416 ns / 3,484 ns |   17,159 ns / 22,333 ns | 32,754 ns / 41,458 ns |
| 0 9 * * *    | 180 ns / 194 ns | 2,594 ns / 2,660 ns |   19,459 ns / 22,209 ns | 33,296 ns / 43,375 ns |
| 0 9 15 * 1   | 211 ns / 228 ns | 1,613 ns / 1,652 ns |   14,480 ns / 15,875 ns | 33,450 ns / 44,833 ns |
| 0 9 * * 1-5  | 249 ns / 264 ns | 2,695 ns / 2,799 ns |   18,946 ns / 22,250 ns | 35,441 ns / 45,166 ns |

### Validation - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| ------------ | --------: | ------------: | ----------: | -----: | ------------: |
| * * * * *    |   ~19522k |       ~215k ✓ |      ~46k ✓ | ~34k ✓ |      ~1659k ✓ |
| 0 0 1 * *    |   ~14905k |       ~779k ✓ |     ~140k ✓ | ~34k ✓ |      ~1736k ✓ |
| 0 12 31 * *  |   ~12741k |       ~762k ✓ |     ~139k ✓ | ~33k ✓ |      ~1726k ✓ |
| */15 * * * * |   ~12724k |       ~325k ✓ |      ~71k ✓ | ~34k ✓ |      ~1546k ✓ |
| 0 9 * * *    |   ~15957k |       ~463k ✓ |      ~93k ✓ | ~33k ✓ |      ~1675k ✓ |
| 0 9 15 * 1   |   ~10607k |       ~910k ✓ |     ~163k ✓ | ~34k ✓ |      ~1688k ✓ |
| 0 9 * * 1-5  |    ~8971k |       ~465k ✓ |      ~98k ✓ | ~33k ✓ |      ~1551k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |   cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | --------------: |
| * * * * *    |   51 ns / 62 ns | 4,641 ns / 4,757 ns | 21,834 ns / 30,125 ns | 29,600 ns / 40,875 ns | 603 ns / 675 ns |
| 0 0 1 * *    |   67 ns / 77 ns | 1,284 ns / 1,326 ns |   7,145 ns / 7,497 ns | 29,613 ns / 37,750 ns | 576 ns / 604 ns |
| 0 12 31 * *  |   78 ns / 91 ns | 1,312 ns / 1,362 ns |   7,168 ns / 7,317 ns | 30,020 ns / 41,583 ns | 579 ns / 607 ns |
| */15 * * * * |   79 ns / 89 ns | 3,074 ns / 3,164 ns | 14,167 ns / 18,084 ns | 29,389 ns / 39,334 ns | 647 ns / 669 ns |
| 0 9 * * *    |   63 ns / 72 ns | 2,161 ns / 2,221 ns | 10,810 ns / 13,500 ns | 30,052 ns / 38,833 ns | 597 ns / 641 ns |
| 0 9 15 * 1   |  94 ns / 107 ns | 1,099 ns / 1,142 ns |   6,135 ns / 6,357 ns | 29,181 ns / 33,625 ns | 593 ns / 615 ns |
| 0 9 * * 1-5  | 111 ns / 124 ns | 2,151 ns / 2,214 ns | 10,206 ns / 11,000 ns | 30,174 ns / 35,250 ns | 645 ns / 669 ns |

### Parsing - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| ------------ | --------: | ------------: | ----------: | -----: | ------------: |
| * * * * *    |   ~19519k |       ~214k ✓ |      ~47k ✓ | ~34k ✓ |      ~1627k ✓ |
| 0 0 1 * *    |   ~15013k |       ~776k ✓ |     ~144k ✓ | ~34k ✓ |      ~1625k ✓ |
| 0 12 31 * *  |   ~12767k |       ~777k ✓ |     ~139k ✓ | ~34k ✓ |      ~1677k ✓ |
| */15 * * * * |   ~12766k |       ~331k ✓ |      ~71k ✓ | ~33k ✓ |      ~1489k ✓ |
| 0 9 * * *    |   ~15909k |       ~462k ✓ |      ~94k ✓ | ~32k ✓ |      ~1611k ✓ |
| 0 9 15 * 1   |   ~10935k |       ~902k ✓ |     ~162k ✓ | ~34k ✓ |      ~1717k ✓ |
| 0 9 * * 1-5  |    ~9121k |       ~466k ✓ |      ~97k ✓ | ~31k ✓ |      ~1575k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |   cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | --------------: |
| * * * * *    |   51 ns / 65 ns | 4,667 ns / 4,760 ns | 21,483 ns / 25,833 ns | 29,474 ns / 37,125 ns | 615 ns / 628 ns |
| 0 0 1 * *    |   67 ns / 76 ns | 1,289 ns / 1,341 ns |   6,956 ns / 6,981 ns | 29,237 ns / 36,083 ns | 615 ns / 677 ns |
| 0 12 31 * *  |   78 ns / 91 ns | 1,288 ns / 1,325 ns |   7,182 ns / 7,297 ns | 29,156 ns / 33,667 ns | 596 ns / 620 ns |
| */15 * * * * |   78 ns / 89 ns | 3,017 ns / 3,050 ns | 14,097 ns / 17,125 ns | 30,433 ns / 42,875 ns | 671 ns / 703 ns |
| 0 9 * * *    |   63 ns / 74 ns | 2,163 ns / 2,239 ns | 10,642 ns / 12,167 ns | 30,840 ns / 50,042 ns | 621 ns / 649 ns |
| 0 9 15 * 1   |  91 ns / 104 ns | 1,108 ns / 1,151 ns |   6,179 ns / 6,375 ns | 29,661 ns / 37,917 ns | 582 ns / 628 ns |
| 0 9 * * 1-5  | 110 ns / 121 ns | 2,145 ns / 2,172 ns | 10,355 ns / 13,209 ns | 31,768 ns / 46,875 ns | 635 ns / 655 ns |

### Validation Varied Inputs - Throughput (ops/sec)

| Test Case | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------- | --------: | ------------: | ----------: | -----: | ------------: |
| varied    |   ~12972k |       ~631k ✓ |     ~136k ✓ | ~33k ✓ |      ~1390k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation Varied Inputs - Latency (mean / p99)

| Test Case |     cron-fast |       cron-schedule |         cron-parser |                croner |   cron-validate |
| --------- | ------------: | ------------------: | ------------------: | --------------------: | --------------: |
| varied    | 77 ns / 89 ns | 1,585 ns / 1,747 ns | 7,332 ns / 7,534 ns | 30,281 ns / 38,708 ns | 720 ns / 753 ns |

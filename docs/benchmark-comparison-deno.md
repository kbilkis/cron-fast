# Benchmark

> Tested with deno v2.9.5, cron-fast v3.8.0, croner v10.0.1, cron-parser v5.10.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by Deno.bench().

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2416k      | baseline     |
| cron-schedule | ~401k       | 6.0x faster  |
| cron-parser   | ~35k        | 68.2x faster |
| croner        | ~31k        | 77.2x faster |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~41k        | baseline     |
| cron-schedule | ~18k        | 2.3x faster  |
| cron-parser   | ~1k         | 44.4x faster |
| croner        | ~2k         | 18.8x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2400k      | baseline     |
| cron-schedule | ~433k       | 5.5x faster  |
| cron-parser   | ~41k        | 58.0x faster |
| croner        | ~31k        | 76.5x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~7711k      | baseline      |
| cron-schedule | ~559k       | 13.8x faster  |
| cron-parser   | ~107k       | 72.4x faster  |
| croner        | ~34k        | 226.5x faster |
| cron-validate | ~1659k      | 4.6x faster   |

### Validation Varied Inputs

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~6034k      | baseline      |
| cron-schedule | ~644k       | 9.4x faster   |
| cron-parser   | ~134k       | 45.0x faster  |
| croner        | ~34k        | 177.3x faster |
| cron-validate | ~1350k      | 4.5x faster   |

### Parsing

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~7808k      | baseline      |
| cron-schedule | ~558k       | 14.0x faster  |
| cron-parser   | ~107k       | 72.6x faster  |
| croner        | ~34k        | 231.4x faster |
| cron-validate | ~1640k      | 4.8x faster   |

Run benchmarks yourself: `pnpm bench:deno`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner |
| ------------ | --------: | ------------: | ----------: | -----: |
| * * * * *    |    ~4364k |       ~160k ✓ |      ~33k ✓ | ~33k ✓ |
| 0 0 1 * *    |    ~2191k |       ~576k ✓ |      ~19k ✓ | ~32k ✓ |
| 0 12 31 * *  |    ~2037k |       ~545k ✓ |       ~8k ✓ | ~31k ✓ |
| */15 * * * * |    ~2594k |       ~295k ✓ |      ~57k ✓ | ~32k ✓ |
| 0 9 * * *    |    ~2401k |       ~383k ✓ |      ~46k ✓ | ~33k ✓ |
| 0 9 15 * 1   |    ~1413k |       ~515k ✓ |      ~40k ✓ | ~29k ✓ |
| 0 9 * * 1-5  |    ~1913k |       ~334k ✓ |      ~46k ✓ | ~29k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |             cron-parser |                croner |
| ------------ | --------------: | ------------------: | ----------------------: | --------------------: |
| * * * * *    | 229 ns / 242 ns | 6,255 ns / 7,292 ns |   30,617 ns / 58,291 ns | 30,147 ns / 63,625 ns |
| 0 0 1 * *    | 456 ns / 812 ns | 1,737 ns / 1,940 ns |   53,261 ns / 87,459 ns | 30,993 ns / 39,334 ns |
| 0 12 31 * *  | 491 ns / 507 ns | 1,835 ns / 2,840 ns | 132,144 ns / 241,625 ns | 32,627 ns / 39,250 ns |
| */15 * * * * | 386 ns / 403 ns | 3,391 ns / 3,486 ns |   17,518 ns / 21,583 ns | 31,417 ns / 39,542 ns |
| 0 9 * * *    | 417 ns / 442 ns | 2,608 ns / 2,850 ns |   21,738 ns / 27,625 ns | 30,569 ns / 36,375 ns |
| 0 9 15 * 1   | 708 ns / 752 ns | 1,943 ns / 2,015 ns |   25,120 ns / 34,167 ns | 34,161 ns / 44,333 ns |
| 0 9 * * 1-5  | 523 ns / 544 ns | 2,994 ns / 3,082 ns |   21,731 ns / 39,333 ns | 34,127 ns / 43,917 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case   | cron-fast | cron-schedule | cron-parser | croner |
| ----------- | --------: | ------------: | ----------: | -----: |
| * * * * *   |      ~56k |        ~24k ✓ |       ~1k ✓ |  ~3k ✓ |
| 0 9 * * 1-5 |      ~26k |        ~12k ✓ |       ~0k ✓ |  ~1k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case   |             cron-fast |         cron-schedule |                 cron-parser |                      croner |
| ----------- | --------------------: | --------------------: | --------------------------: | --------------------------: |
| * * * * *   | 17,796 ns / 20,750 ns | 40,843 ns / 72,292 ns |     717,396 ns / 866,333 ns |     290,792 ns / 386,375 ns |
| 0 9 * * 1-5 | 38,091 ns / 48,333 ns | 83,410 ns / 99,875 ns | 2,158,216 ns / 2,945,166 ns | 1,063,652 ns / 1,202,084 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner |
| ------------ | --------: | ------------: | ----------: | -----: |
| * * * * *    |    ~3945k |       ~193k ✓ |      ~36k ✓ | ~32k ✓ |
| 0 0 1 * *    |    ~2215k |       ~617k ✓ |       ~9k ✓ | ~31k ✓ |
| 0 12 31 * *  |    ~2011k |       ~514k ✓ |       ~8k ✓ | ~31k ✓ |
| */15 * * * * |    ~2435k |       ~296k ✓ |      ~59k ✓ | ~31k ✓ |
| 0 9 * * *    |    ~2372k |       ~401k ✓ |      ~53k ✓ | ~32k ✓ |
| 0 9 15 * 1   |    ~1911k |       ~637k ✓ |      ~70k ✓ | ~32k ✓ |
| 0 9 * * 1-5  |    ~1908k |       ~376k ✓ |      ~54k ✓ | ~30k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |             cron-parser |                croner |
| ------------ | --------------: | ------------------: | ----------------------: | --------------------: |
| * * * * *    | 253 ns / 269 ns | 5,185 ns / 5,779 ns |   27,577 ns / 34,125 ns | 30,799 ns / 38,334 ns |
| 0 0 1 * *    | 451 ns / 467 ns | 1,622 ns / 1,753 ns | 112,063 ns / 217,708 ns | 32,489 ns / 82,625 ns |
| 0 12 31 * *  | 497 ns / 511 ns | 1,945 ns / 2,028 ns | 117,889 ns / 223,916 ns | 32,291 ns / 41,209 ns |
| */15 * * * * | 411 ns / 430 ns | 3,383 ns / 3,467 ns |   16,958 ns / 20,667 ns | 32,092 ns / 82,750 ns |
| 0 9 * * *    | 422 ns / 441 ns | 2,491 ns / 2,593 ns |   18,980 ns / 23,250 ns | 31,127 ns / 39,667 ns |
| 0 9 15 * 1   | 523 ns / 845 ns | 1,570 ns / 1,600 ns |   14,285 ns / 17,625 ns | 31,530 ns / 44,458 ns |
| 0 9 * * 1-5  | 524 ns / 537 ns | 2,659 ns / 2,758 ns |   18,499 ns / 22,583 ns | 33,069 ns / 44,334 ns |

### Validation - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| ------------ | --------: | ------------: | ----------: | -----: | ------------: |
| * * * * *    |   ~16041k |       ~215k ✓ |      ~47k ✓ | ~35k ✓ |      ~1664k ✓ |
| 0 0 1 * *    |    ~6220k |       ~774k ✓ |     ~138k ✓ | ~34k ✓ |      ~1743k ✓ |
| 0 12 31 * *  |    ~6028k |       ~751k ✓ |     ~139k ✓ | ~34k ✓ |      ~1729k ✓ |
| */15 * * * * |    ~8479k |       ~332k ✓ |      ~71k ✓ | ~34k ✓ |      ~1524k ✓ |
| 0 9 * * *    |    ~7642k |       ~465k ✓ |      ~92k ✓ | ~33k ✓ |      ~1687k ✓ |
| 0 9 15 * 1   |    ~4780k |       ~911k ✓ |     ~162k ✓ | ~34k ✓ |      ~1710k ✓ |
| 0 9 * * 1-5  |    ~4790k |       ~466k ✓ |      ~98k ✓ | ~34k ✓ |      ~1555k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |     cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | ----------------: |
| * * * * *    |   62 ns / 73 ns | 4,646 ns / 4,740 ns | 21,504 ns / 26,375 ns | 28,789 ns / 37,125 ns |   601 ns / 678 ns |
| 0 0 1 * *    | 161 ns / 173 ns | 1,292 ns / 1,347 ns |   7,229 ns / 8,980 ns | 29,518 ns / 36,792 ns |   574 ns / 597 ns |
| 0 12 31 * *  | 166 ns / 177 ns | 1,331 ns / 1,370 ns |   7,195 ns / 7,605 ns | 29,733 ns / 38,625 ns |   578 ns / 598 ns |
| */15 * * * * | 118 ns / 130 ns | 3,014 ns / 3,040 ns | 14,152 ns / 17,000 ns | 29,036 ns / 37,458 ns |   656 ns / 736 ns |
| 0 9 * * *    | 131 ns / 283 ns | 2,152 ns / 2,204 ns | 10,902 ns / 13,125 ns | 30,090 ns / 43,542 ns |   593 ns / 670 ns |
| 0 9 15 * 1   | 209 ns / 225 ns | 1,097 ns / 1,139 ns |   6,168 ns / 7,294 ns | 29,210 ns / 35,292 ns |   585 ns / 616 ns |
| 0 9 * * 1-5  | 209 ns / 222 ns | 2,147 ns / 2,166 ns | 10,233 ns / 11,125 ns | 29,268 ns / 38,291 ns | 643 ns / 1,146 ns |

### Parsing - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| ------------ | --------: | ------------: | ----------: | -----: | ------------: |
| * * * * *    |   ~16733k |       ~215k ✓ |      ~47k ✓ | ~34k ✓ |      ~1631k ✓ |
| 0 0 1 * *    |    ~6240k |       ~771k ✓ |     ~143k ✓ | ~33k ✓ |      ~1678k ✓ |
| 0 12 31 * *  |    ~6018k |       ~776k ✓ |     ~139k ✓ | ~34k ✓ |      ~1688k ✓ |
| */15 * * * * |    ~8288k |       ~327k ✓ |      ~71k ✓ | ~34k ✓ |      ~1527k ✓ |
| 0 9 * * *    |    ~7851k |       ~455k ✓ |      ~94k ✓ | ~34k ✓ |      ~1641k ✓ |
| 0 9 15 * 1   |    ~4768k |       ~909k ✓ |     ~164k ✓ | ~33k ✓ |      ~1733k ✓ |
| 0 9 * * 1-5  |    ~4757k |       ~454k ✓ |      ~96k ✓ | ~33k ✓ |      ~1581k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |   cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | --------------: |
| * * * * *    |   60 ns / 70 ns | 4,644 ns / 4,675 ns | 21,410 ns / 26,041 ns | 29,025 ns / 37,459 ns | 613 ns / 626 ns |
| 0 0 1 * *    | 160 ns / 177 ns | 1,297 ns / 1,374 ns |   7,013 ns / 7,047 ns | 30,124 ns / 65,875 ns | 596 ns / 615 ns |
| 0 12 31 * *  | 166 ns / 180 ns | 1,289 ns / 1,319 ns |   7,217 ns / 7,850 ns | 29,567 ns / 38,250 ns | 592 ns / 610 ns |
| */15 * * * * | 121 ns / 136 ns | 3,054 ns / 3,721 ns | 14,176 ns / 17,125 ns | 29,081 ns / 37,958 ns | 655 ns / 673 ns |
| 0 9 * * *    | 127 ns / 142 ns | 2,200 ns / 2,262 ns | 10,639 ns / 12,334 ns | 29,158 ns / 36,166 ns | 609 ns / 632 ns |
| 0 9 15 * 1   | 210 ns / 226 ns | 1,100 ns / 1,162 ns |   6,114 ns / 6,213 ns | 29,882 ns / 68,083 ns | 577 ns / 600 ns |
| 0 9 * * 1-5  | 210 ns / 226 ns | 2,202 ns / 3,409 ns | 10,373 ns / 13,541 ns | 30,742 ns / 41,958 ns | 632 ns / 650 ns |

### Validation Varied Inputs - Throughput (ops/sec)

| Test Case | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------- | --------: | ------------: | ----------: | -----: | ------------: |
| varied    |    ~6034k |       ~644k ✓ |     ~134k ✓ | ~34k ✓ |      ~1350k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation Varied Inputs - Latency (mean / p99)

| Test Case |       cron-fast |       cron-schedule |         cron-parser |                croner |     cron-validate |
| --------- | --------------: | ------------------: | ------------------: | --------------------: | ----------------: |
| varied    | 166 ns / 178 ns | 1,553 ns / 1,684 ns | 7,452 ns / 7,612 ns | 29,389 ns / 41,459 ns | 741 ns / 1,417 ns |

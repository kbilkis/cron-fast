# Benchmark

> Tested with bun v1.3.14, cron-fast v3.3.0, croner v10.0.1, cron-parser v5.5.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by mitata.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~716k       | baseline     |
| cron-schedule | ~308k       | 2.3x faster  |
| cron-parser   | ~36k        | 19.7x faster |
| croner        | ~56k        | 12.7x faster |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~23k        | baseline     |
| cron-schedule | ~23k        | 1.0x slower  |
| cron-parser   | ~1k         | 22.6x faster |
| croner        | ~6k         | 3.9x faster  |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~936k       | baseline     |
| cron-schedule | ~306k       | 3.1x faster  |
| cron-parser   | ~37k        | 25.1x faster |
| croner        | ~56k        | 16.7x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1377k      | baseline     |
| cron-schedule | ~334k       | 4.1x faster  |
| cron-parser   | ~116k       | 11.9x faster |
| croner        | ~59k        | 23.2x faster |
| cron-validate | ~835k       | 1.6x faster  |

### Parsing

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1350k      | baseline     |
| cron-schedule | ~335k       | 4.0x faster  |
| cron-parser   | ~116k       | 11.6x faster |
| croner        | ~60k        | 22.6x faster |
| cron-validate | ~859k       | 1.6x faster  |

Run benchmarks yourself: `pnpm bench:bun`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case       | cron-fast | cron-schedule | cron-parser | croner |
| --------------- | --------: | ------------: | ----------: | -----: |
| \* \* \* \* \*  |     ~981k |       ~140k ✓ |      ~34k ✓ | ~59k ✓ |
| 0 0 1 \* \*     |     ~724k |       ~402k ✓ |      ~20k ✓ | ~58k ✓ |
| 0 12 31 \* \*   |     ~701k |       ~412k ✓ |       ~9k ✓ | ~55k ✓ |
| _/15 _ \* \* \* |     ~441k |       ~203k ✓ |      ~62k ✓ | ~59k ✓ |
| 0 9 \* \* \*    |     ~879k |       ~278k ✓ |      ~46k ✓ | ~60k ✓ |
| 0 9 15 \* 1     |     ~545k |       ~459k ✓ |      ~39k ✓ | ~53k ✓ |
| 0 9 \* \* 1-5   |     ~743k |       ~259k ✓ |      ~45k ✓ | ~51k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case       |           cron-fast |        cron-schedule |             cron-parser |                croner |
| --------------- | ------------------: | -------------------: | ----------------------: | --------------------: |
| \* \* \* \* \*  | 1,020 ns / 2,917 ns | 7,145 ns / 11,916 ns |   29,029 ns / 51,208 ns | 17,002 ns / 30,334 ns |
| 0 0 1 \* \*     | 1,381 ns / 1,707 ns |  2,487 ns / 2,777 ns |   49,321 ns / 79,500 ns | 17,307 ns / 17,785 ns |
| 0 12 31 \* \*   | 1,427 ns / 1,703 ns |  2,428 ns / 2,524 ns | 114,528 ns / 179,375 ns | 18,251 ns / 19,184 ns |
| _/15 _ \* \* \* | 2,270 ns / 2,451 ns |  4,914 ns / 5,114 ns |   16,106 ns / 16,553 ns | 16,881 ns / 17,539 ns |
| 0 9 \* \* \*    | 1,138 ns / 1,277 ns |  3,595 ns / 3,667 ns |   21,880 ns / 22,578 ns | 16,609 ns / 17,396 ns |
| 0 9 15 \* 1     | 1,834 ns / 1,993 ns |  2,179 ns / 2,330 ns |   25,595 ns / 25,622 ns | 18,926 ns / 19,316 ns |
| 0 9 \* \* 1-5   | 1,346 ns / 1,590 ns |  3,865 ns / 3,967 ns |   22,379 ns / 22,918 ns | 19,742 ns / 20,723 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case      | cron-fast | cron-schedule | cron-parser | croner |
| -------------- | --------: | ------------: | ----------: | -----: |
| \* \* \* \* \* |      ~29k |          ~27k |       ~2k ✓ | ~10k ✓ |
| 0 9 \* \* 1-5  |      ~16k |        ~19k ✗ |       ~0k ✓ |  ~1k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case      |             cron-fast |         cron-schedule |                 cron-parser |                  croner |
| -------------- | --------------------: | --------------------: | --------------------------: | ----------------------: |
| \* \* \* \* \* | 33,973 ns / 34,172 ns | 36,561 ns / 69,500 ns |     649,884 ns / 897,750 ns |  98,569 ns / 135,750 ns |
| 0 9 \* \* 1-5  | 61,560 ns / 91,625 ns | 51,320 ns / 51,588 ns | 2,065,753 ns / 3,040,209 ns | 698,585 ns / 824,708 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case       | cron-fast | cron-schedule | cron-parser | croner |
| --------------- | --------: | ------------: | ----------: | -----: |
| \* \* \* \* \*  |     ~957k |       ~136k ✓ |      ~38k ✓ | ~62k ✓ |
| 0 0 1 \* \*     |    ~1160k |       ~419k ✓ |      ~10k ✓ | ~56k ✓ |
| 0 12 31 \* \*   |     ~957k |       ~389k ✓ |      ~10k ✓ | ~59k ✓ |
| _/15 _ \* \* \* |     ~686k |       ~192k ✓ |      ~57k ✓ | ~52k ✓ |
| 0 9 \* \* \*    |     ~920k |       ~265k ✓ |      ~44k ✓ | ~51k ✓ |
| 0 9 15 \* 1     |    ~1132k |       ~483k ✓ |      ~56k ✓ | ~58k ✓ |
| 0 9 \* \* 1-5   |     ~741k |       ~257k ✓ |      ~46k ✓ | ~53k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case       |           cron-fast |       cron-schedule |            cron-parser |                croner |
| --------------- | ------------------: | ------------------: | ---------------------: | --------------------: |
| \* \* \* \* \*  | 1,045 ns / 1,171 ns | 7,332 ns / 7,571 ns |  26,455 ns / 27,401 ns | 16,224 ns / 16,359 ns |
| 0 0 1 \* \*     |   862 ns / 1,000 ns | 2,389 ns / 2,537 ns | 97,141 ns / 164,125 ns | 17,710 ns / 18,470 ns |
| 0 12 31 \* \*   | 1,045 ns / 1,159 ns | 2,571 ns / 2,676 ns | 99,441 ns / 132,000 ns | 16,966 ns / 17,409 ns |
| _/15 _ \* \* \* | 1,458 ns / 2,354 ns | 5,204 ns / 5,406 ns |  17,647 ns / 19,577 ns | 19,114 ns / 21,379 ns |
| 0 9 \* \* \*    | 1,086 ns / 1,390 ns | 3,767 ns / 4,207 ns |  22,882 ns / 27,523 ns | 19,671 ns / 20,489 ns |
| 0 9 15 \* 1     |   884 ns / 1,026 ns | 2,070 ns / 2,247 ns |  17,855 ns / 20,300 ns | 17,132 ns / 17,862 ns |
| 0 9 \* \* 1-5   | 1,350 ns / 1,511 ns | 3,894 ns / 4,122 ns |  21,622 ns / 23,806 ns | 18,853 ns / 19,340 ns |

### Validation - Throughput (ops/sec)

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |    ~1326k |       ~151k ✓ |      ~51k ✓ | ~56k ✓ |       ~753k ✓ |
| 0 0 1 \* \*     |    ~1805k |       ~440k ✓ |     ~149k ✓ | ~57k ✓ |       ~897k ✓ |
| 0 12 31 \* \*   |    ~1698k |       ~440k ✓ |     ~153k ✓ | ~62k ✓ |       ~796k ✓ |
| _/15 _ \* \* \* |     ~868k |       ~209k ✓ |      ~83k ✓ | ~65k ✓ |         ~919k |
| 0 9 \* \* \*    |    ~1550k |       ~277k ✓ |     ~103k ✓ | ~55k ✓ |       ~836k ✓ |
| 0 9 15 \* 1     |    ~1440k |       ~542k ✓ |     ~164k ✓ | ~61k ✓ |       ~769k ✓ |
| 0 9 \* \* 1-5   |     ~953k |       ~281k ✓ |     ~107k ✓ | ~61k ✓ |         ~877k |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case       |           cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| --------------- | ------------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| \* \* \* \* \*  |     754 ns / 878 ns | 6,603 ns / 6,685 ns | 19,764 ns / 20,392 ns | 17,766 ns / 18,504 ns | 1,329 ns / 3,625 ns |
| 0 0 1 \* \*     |     554 ns / 872 ns | 2,273 ns / 2,440 ns |   6,708 ns / 6,828 ns | 17,485 ns / 19,264 ns | 1,115 ns / 1,242 ns |
| 0 12 31 \* \*   |     589 ns / 936 ns | 2,273 ns / 2,440 ns |   6,515 ns / 6,702 ns | 16,193 ns / 32,209 ns | 1,256 ns / 1,366 ns |
| _/15 _ \* \* \* | 1,153 ns / 2,144 ns | 4,787 ns / 4,997 ns | 12,097 ns / 12,302 ns | 15,495 ns / 16,006 ns | 1,088 ns / 1,285 ns |
| 0 9 \* \* \*    |     645 ns / 844 ns | 3,611 ns / 3,836 ns |   9,714 ns / 9,820 ns | 18,106 ns / 19,150 ns | 1,197 ns / 1,360 ns |
| 0 9 15 \* 1     |   695 ns / 1,086 ns | 1,844 ns / 2,052 ns |   6,084 ns / 6,962 ns | 16,527 ns / 18,275 ns | 1,300 ns / 1,556 ns |
| 0 9 \* \* 1-5   | 1,050 ns / 1,392 ns | 3,556 ns / 3,710 ns |   9,357 ns / 9,517 ns | 16,519 ns / 16,501 ns | 1,140 ns / 1,283 ns |

### Parsing - Throughput (ops/sec)

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |    ~1241k |       ~151k ✓ |      ~50k ✓ | ~62k ✓ |       ~873k ✓ |
| 0 0 1 \* \*     |    ~1583k |       ~442k ✓ |     ~154k ✓ | ~62k ✓ |       ~901k ✓ |
| 0 12 31 \* \*   |    ~1590k |       ~446k ✓ |     ~155k ✓ | ~61k ✓ |       ~798k ✓ |
| _/15 _ \* \* \* |     ~771k |       ~207k ✓ |      ~79k ✓ | ~63k ✓ |       ~910k ✗ |
| 0 9 \* \* \*    |    ~1586k |       ~273k ✓ |     ~101k ✓ | ~53k ✓ |       ~834k ✓ |
| 0 9 15 \* 1     |    ~1615k |       ~542k ✓ |     ~167k ✓ | ~61k ✓ |       ~810k ✓ |
| 0 9 \* \* 1-5   |    ~1062k |       ~286k ✓ |     ~109k ✓ | ~58k ✓ |       ~888k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case       |           cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| --------------- | ------------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| \* \* \* \* \*  |   806 ns / 1,102 ns | 6,625 ns / 6,798 ns | 19,863 ns / 20,214 ns | 16,098 ns / 17,902 ns | 1,146 ns / 1,229 ns |
| 0 0 1 \* \*     |     632 ns / 821 ns | 2,265 ns / 2,455 ns |   6,482 ns / 6,690 ns | 16,241 ns / 17,107 ns | 1,110 ns / 1,207 ns |
| 0 12 31 \* \*   |   629 ns / 1,040 ns | 2,242 ns / 2,376 ns |   6,441 ns / 6,538 ns | 16,518 ns / 17,496 ns | 1,253 ns / 1,362 ns |
| _/15 _ \* \* \* | 1,298 ns / 2,020 ns | 4,821 ns / 4,963 ns | 12,696 ns / 12,809 ns | 15,969 ns / 15,574 ns | 1,098 ns / 1,212 ns |
| 0 9 \* \* \*    |     630 ns / 835 ns | 3,659 ns / 4,059 ns |  9,903 ns / 10,106 ns | 18,820 ns / 19,253 ns | 1,198 ns / 1,351 ns |
| 0 9 15 \* 1     |     619 ns / 964 ns | 1,846 ns / 2,053 ns |   6,001 ns / 6,121 ns | 16,323 ns / 16,751 ns | 1,234 ns / 1,448 ns |
| 0 9 \* \* 1-5   |   942 ns / 1,178 ns | 3,495 ns / 3,631 ns |   9,213 ns / 9,383 ns | 17,337 ns / 19,001 ns | 1,127 ns / 1,219 ns |

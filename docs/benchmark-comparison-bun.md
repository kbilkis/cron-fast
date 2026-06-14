# Benchmark

> Tested with bun v1.3.14, cron-fast v3.2.0, croner v10.0.1, cron-parser v5.5.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by mitata.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~689k       | baseline     |
| cron-schedule | ~317k       | 2.2x faster  |
| cron-parser   | ~39k        | 17.5x faster |
| croner        | ~59k        | 11.6x faster |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~22k        | baseline     |
| cron-schedule | ~26k        | 1.1x slower  |
| cron-parser   | ~1k         | 21.1x faster |
| croner        | ~6k         | 3.7x faster  |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~928k       | baseline     |
| cron-schedule | ~323k       | 2.9x faster  |
| cron-parser   | ~42k        | 22.3x faster |
| croner        | ~61k        | 15.2x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1509k      | baseline     |
| cron-schedule | ~359k       | 4.2x faster  |
| cron-parser   | ~135k       | 11.2x faster |
| croner        | ~67k        | 22.6x faster |
| cron-validate | ~900k       | 1.7x faster  |

### Parsing

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1525k      | baseline     |
| cron-schedule | ~358k       | 4.3x faster  |
| cron-parser   | ~135k       | 11.3x faster |
| croner        | ~66k        | 23.1x faster |
| cron-validate | ~920k       | 1.7x faster  |

Run benchmarks yourself: `pnpm bench:bun`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case       | cron-fast | cron-schedule | cron-parser | croner |
| --------------- | --------: | ------------: | ----------: | -----: |
| \* \* \* \* \*  |     ~946k |       ~141k ✓ |      ~39k ✓ | ~61k ✓ |
| 0 0 1 \* \*     |     ~672k |       ~411k ✓ |      ~21k ✓ | ~60k ✓ |
| 0 12 31 \* \*   |     ~590k |       ~424k ✓ |       ~9k ✓ | ~59k ✓ |
| _/15 _ \* \* \* |     ~651k |       ~210k ✓ |      ~69k ✓ | ~63k ✓ |
| 0 9 \* \* \*    |     ~684k |       ~286k ✓ |      ~49k ✓ | ~65k ✓ |
| 0 9 15 \* 1     |     ~531k |       ~478k ✓ |      ~41k ✓ | ~55k ✓ |
| 0 9 \* \* 1-5   |     ~745k |       ~267k ✓ |      ~49k ✓ | ~53k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case       |           cron-fast |        cron-schedule |             cron-parser |                croner |
| --------------- | ------------------: | -------------------: | ----------------------: | --------------------: |
| \* \* \* \* \*  | 1,057 ns / 3,833 ns | 7,116 ns / 11,167 ns |   25,723 ns / 44,334 ns | 16,454 ns / 31,417 ns |
| 0 0 1 \* \*     | 1,489 ns / 1,760 ns |  2,435 ns / 2,659 ns |   48,768 ns / 78,708 ns | 16,791 ns / 17,889 ns |
| 0 12 31 \* \*   | 1,694 ns / 1,952 ns |  2,360 ns / 2,489 ns | 114,002 ns / 178,334 ns | 17,019 ns / 18,189 ns |
| _/15 _ \* \* \* | 1,536 ns / 2,328 ns |  4,757 ns / 5,028 ns |   14,531 ns / 14,987 ns | 15,880 ns / 16,651 ns |
| 0 9 \* \* \*    | 1,462 ns / 1,937 ns |  3,496 ns / 3,634 ns |   20,380 ns / 20,811 ns | 15,401 ns / 16,365 ns |
| 0 9 15 \* 1     | 1,883 ns / 2,150 ns |  2,090 ns / 2,362 ns |   24,219 ns / 24,421 ns | 18,019 ns / 18,409 ns |
| 0 9 \* \* 1-5   | 1,341 ns / 1,597 ns |  3,745 ns / 3,877 ns |   20,615 ns / 20,920 ns | 18,692 ns / 19,169 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case      | cron-fast | cron-schedule | cron-parser | croner |
| -------------- | --------: | ------------: | ----------: | -----: |
| \* \* \* \* \* |      ~30k |          ~31k |       ~2k ✓ | ~10k ✓ |
| 0 9 \* \* 1-5  |      ~15k |        ~21k ✗ |       ~1k ✓ |  ~1k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case      |             cron-fast |         cron-schedule |                 cron-parser |                  croner |
| -------------- | --------------------: | --------------------: | --------------------------: | ----------------------: |
| \* \* \* \* \* | 33,682 ns / 34,732 ns | 32,730 ns / 33,234 ns |     624,743 ns / 807,709 ns |  95,297 ns / 115,292 ns |
| 0 9 \* \* 1-5  | 67,127 ns / 79,417 ns | 48,726 ns / 49,984 ns | 1,957,420 ns / 2,678,292 ns | 674,806 ns / 740,208 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case       | cron-fast | cron-schedule | cron-parser | croner |
| --------------- | --------: | ------------: | ----------: | -----: |
| \* \* \* \* \*  |     ~999k |       ~151k ✓ |      ~42k ✓ | ~62k ✓ |
| 0 0 1 \* \*     |    ~1175k |       ~437k ✓ |      ~11k ✓ | ~62k ✓ |
| 0 12 31 \* \*   |     ~933k |       ~425k ✓ |      ~11k ✓ | ~61k ✓ |
| _/15 _ \* \* \* |     ~694k |       ~214k ✓ |      ~68k ✓ | ~64k ✓ |
| 0 9 \* \* \*    |    ~1017k |       ~276k ✓ |      ~52k ✓ | ~65k ✓ |
| 0 9 15 \* 1     |     ~918k |       ~498k ✓ |      ~59k ✓ | ~59k ✓ |
| 0 9 \* \* 1-5   |     ~759k |       ~265k ✓ |      ~48k ✓ | ~55k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case       |           cron-fast |       cron-schedule |            cron-parser |                croner |
| --------------- | ------------------: | ------------------: | ---------------------: | --------------------: |
| \* \* \* \* \*  | 1,001 ns / 1,102 ns | 6,638 ns / 7,123 ns |  23,632 ns / 24,751 ns | 16,017 ns / 16,799 ns |
| 0 0 1 \* \*     |     851 ns / 972 ns | 2,290 ns / 2,388 ns | 91,640 ns / 123,791 ns | 16,081 ns / 16,849 ns |
| 0 12 31 \* \*   | 1,072 ns / 1,179 ns | 2,354 ns / 2,458 ns | 95,074 ns / 116,625 ns | 16,400 ns / 16,648 ns |
| _/15 _ \* \* \* | 1,441 ns / 2,326 ns | 4,676 ns / 4,799 ns |  14,712 ns / 15,923 ns | 15,580 ns / 15,893 ns |
| 0 9 \* \* \*    |   983 ns / 1,090 ns | 3,623 ns / 4,059 ns |  19,113 ns / 20,110 ns | 15,482 ns / 16,027 ns |
| 0 9 15 \* 1     | 1,089 ns / 3,061 ns | 2,010 ns / 2,159 ns |  16,869 ns / 19,995 ns | 16,944 ns / 17,743 ns |
| 0 9 \* \* 1-5   | 1,318 ns / 1,403 ns | 3,779 ns / 3,945 ns |  20,997 ns / 23,802 ns | 18,329 ns / 19,590 ns |

### Validation - Throughput (ops/sec)

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |    ~1410k |       ~157k ✓ |      ~61k ✓ | ~66k ✓ |       ~774k ✓ |
| 0 0 1 \* \*     |    ~1973k |       ~468k ✓ |     ~172k ✓ | ~67k ✓ |       ~966k ✓ |
| 0 12 31 \* \*   |    ~1910k |       ~466k ✓ |     ~174k ✓ | ~67k ✓ |       ~855k ✓ |
| _/15 _ \* \* \* |     ~980k |       ~226k ✓ |      ~98k ✓ | ~67k ✓ |         ~969k |
| 0 9 \* \* \*    |    ~1655k |       ~307k ✓ |     ~126k ✓ | ~68k ✓ |       ~933k ✓ |
| 0 9 15 \* 1     |    ~1597k |       ~586k ✓ |     ~190k ✓ | ~67k ✓ |       ~867k ✓ |
| 0 9 \* \* 1-5   |    ~1038k |       ~301k ✓ |     ~126k ✓ | ~64k ✓ |       ~933k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case       |           cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| --------------- | ------------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| \* \* \* \* \*  |     709 ns / 832 ns | 6,363 ns / 6,523 ns | 16,411 ns / 16,871 ns | 15,068 ns / 15,421 ns | 1,292 ns / 3,292 ns |
| 0 0 1 \* \*     |     507 ns / 626 ns | 2,138 ns / 2,270 ns |   5,828 ns / 6,021 ns | 15,027 ns / 15,192 ns | 1,035 ns / 1,145 ns |
| 0 12 31 \* \*   |     524 ns / 664 ns | 2,148 ns / 2,287 ns |   5,752 ns / 5,870 ns | 14,819 ns / 15,036 ns | 1,170 ns / 1,283 ns |
| _/15 _ \* \* \* | 1,020 ns / 1,906 ns | 4,418 ns / 4,509 ns | 10,183 ns / 10,326 ns | 14,859 ns / 15,220 ns | 1,032 ns / 1,135 ns |
| 0 9 \* \* \*    |     604 ns / 750 ns | 3,256 ns / 3,384 ns |   7,936 ns / 8,063 ns | 14,747 ns / 15,175 ns | 1,072 ns / 1,172 ns |
| 0 9 15 \* 1     |     626 ns / 758 ns | 1,707 ns / 1,811 ns |   5,261 ns / 5,426 ns | 15,023 ns / 15,461 ns | 1,154 ns / 1,271 ns |
| 0 9 \* \* 1-5   |   964 ns / 1,117 ns | 3,323 ns / 3,435 ns |   7,931 ns / 8,129 ns | 15,512 ns / 15,912 ns | 1,071 ns / 1,161 ns |

### Parsing - Throughput (ops/sec)

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |    ~1363k |       ~159k ✓ |      ~62k ✓ | ~64k ✓ |       ~912k ✓ |
| 0 0 1 \* \*     |    ~1728k |       ~476k ✓ |     ~173k ✓ | ~67k ✓ |       ~975k ✓ |
| 0 12 31 \* \*   |    ~1926k |       ~477k ✓ |     ~174k ✓ | ~68k ✓ |       ~859k ✓ |
| _/15 _ \* \* \* |     ~788k |       ~227k ✓ |      ~98k ✓ | ~66k ✓ |       ~968k ✗ |
| 0 9 \* \* \*    |    ~1813k |       ~304k ✓ |     ~125k ✓ | ~67k ✓ |       ~915k ✓ |
| 0 9 15 \* 1     |    ~1899k |       ~563k ✓ |     ~186k ✓ | ~67k ✓ |       ~864k ✓ |
| 0 9 \* \* 1-5   |    ~1159k |       ~304k ✓ |     ~126k ✓ | ~64k ✓ |       ~946k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case       |           cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| --------------- | ------------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| \* \* \* \* \*  |     734 ns / 917 ns | 6,308 ns / 6,411 ns | 16,200 ns / 16,491 ns | 15,622 ns / 15,707 ns | 1,096 ns / 1,196 ns |
| 0 0 1 \* \*     |     579 ns / 731 ns | 2,103 ns / 2,215 ns |   5,786 ns / 5,903 ns | 14,967 ns / 15,490 ns | 1,026 ns / 1,071 ns |
| 0 12 31 \* \*   |     519 ns / 646 ns | 2,095 ns / 2,213 ns |   5,742 ns / 5,835 ns | 14,767 ns / 15,206 ns | 1,164 ns / 1,246 ns |
| _/15 _ \* \* \* | 1,269 ns / 2,021 ns | 4,406 ns / 4,501 ns | 10,237 ns / 10,403 ns | 15,196 ns / 15,103 ns | 1,034 ns / 1,100 ns |
| 0 9 \* \* \*    |     552 ns / 689 ns | 3,292 ns / 3,405 ns |   7,994 ns / 8,076 ns | 14,918 ns / 15,213 ns | 1,092 ns / 1,175 ns |
| 0 9 15 \* 1     |     527 ns / 639 ns | 1,776 ns / 1,895 ns |   5,379 ns / 5,523 ns | 14,955 ns / 15,169 ns | 1,157 ns / 1,215 ns |
| 0 9 \* \* 1-5   |   863 ns / 1,057 ns | 3,294 ns / 3,383 ns |   7,911 ns / 8,043 ns | 15,609 ns / 15,578 ns | 1,058 ns / 1,126 ns |

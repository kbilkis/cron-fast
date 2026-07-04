# Benchmark

> Tested with bun v1.3.14, cron-fast v3.4.0, croner v10.0.1, cron-parser v5.6.1, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by mitata.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1328k      | baseline     |
| cron-schedule | ~314k       | 4.2x faster  |
| cron-parser   | ~42k        | 31.8x faster |
| croner        | ~57k        | 23.5x faster |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~31k        | baseline     |
| cron-schedule | ~24k        | 1.3x faster  |
| cron-parser   | ~1k         | 25.8x faster |
| croner        | ~6k         | 5.2x faster  |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1531k      | baseline     |
| cron-schedule | ~330k       | 4.6x faster  |
| cron-parser   | ~49k        | 31.6x faster |
| croner        | ~61k        | 25.3x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2857k      | baseline     |
| cron-schedule | ~359k       | 8.0x faster  |
| cron-parser   | ~140k       | 20.3x faster |
| croner        | ~65k        | 43.9x faster |
| cron-validate | ~886k       | 3.2x faster  |

### Parsing

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2816k      | baseline     |
| cron-schedule | ~361k       | 7.8x faster  |
| cron-parser   | ~142k       | 19.8x faster |
| croner        | ~65k        | 43.6x faster |
| cron-validate | ~894k       | 3.2x faster  |

Run benchmarks yourself: `pnpm bench:bun`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case       | cron-fast | cron-schedule | cron-parser | croner |
| --------------- | --------: | ------------: | ----------: | -----: |
| \* \* \* \* \*  |    ~1589k |       ~148k ✓ |      ~37k ✓ | ~56k ✓ |
| 0 0 1 \* \*     |    ~1490k |       ~410k ✓ |      ~21k ✓ | ~59k ✓ |
| 0 12 31 \* \*   |    ~1374k |       ~415k ✓ |       ~9k ✓ | ~57k ✓ |
| _/15 _ \* \* \* |    ~1382k |       ~217k ✓ |      ~72k ✓ | ~59k ✓ |
| 0 9 \* \* \*    |    ~1366k |       ~286k ✓ |      ~51k ✓ | ~60k ✓ |
| 0 9 15 \* 1     |     ~947k |       ~450k ✓ |      ~46k ✓ | ~53k ✓ |
| 0 9 \* \* 1-5   |    ~1146k |       ~270k ✓ |      ~56k ✓ | ~51k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case       |           cron-fast |        cron-schedule |             cron-parser |                croner |
| --------------- | ------------------: | -------------------: | ----------------------: | --------------------: |
| \* \* \* \* \*  |     629 ns / 937 ns | 6,760 ns / 11,291 ns |   26,731 ns / 47,250 ns | 17,796 ns / 38,250 ns |
| 0 0 1 \* \*     |     671 ns / 796 ns |  2,438 ns / 2,793 ns |   46,939 ns / 87,000 ns | 16,882 ns / 17,791 ns |
| 0 12 31 \* \*   |     728 ns / 838 ns |  2,412 ns / 2,513 ns | 109,202 ns / 167,416 ns | 17,575 ns / 17,743 ns |
| _/15 _ \* \* \* |   723 ns / 1,081 ns |  4,608 ns / 4,786 ns |   13,954 ns / 14,200 ns | 16,935 ns / 18,141 ns |
| 0 9 \* \* \*    |     732 ns / 852 ns |  3,501 ns / 3,674 ns |   19,568 ns / 20,782 ns | 16,680 ns / 17,067 ns |
| 0 9 15 \* 1     | 1,056 ns / 1,178 ns |  2,221 ns / 2,903 ns |   21,659 ns / 23,065 ns | 18,774 ns / 18,898 ns |
| 0 9 \* \* 1-5   |   873 ns / 1,033 ns |  3,710 ns / 3,934 ns |   17,894 ns / 18,106 ns | 19,448 ns / 19,800 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case      | cron-fast | cron-schedule | cron-parser | croner |
| -------------- | --------: | ------------: | ----------: | -----: |
| \* \* \* \* \* |      ~45k |        ~28k ✓ |       ~2k ✓ | ~10k ✓ |
| 0 9 \* \* 1-5  |      ~16k |        ~20k ✗ |       ~1k ✓ |  ~1k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case      |             cron-fast |         cron-schedule |                 cron-parser |                  croner |
| -------------- | --------------------: | --------------------: | --------------------------: | ----------------------: |
| \* \* \* \* \* | 22,169 ns / 23,272 ns | 35,483 ns / 35,995 ns |     554,478 ns / 748,208 ns |  97,522 ns / 134,541 ns |
| 0 9 \* \* 1-5  | 61,611 ns / 78,625 ns | 50,990 ns / 51,728 ns | 1,745,376 ns / 2,609,250 ns | 681,900 ns / 763,583 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case       | cron-fast | cron-schedule | cron-parser | croner |
| --------------- | --------: | ------------: | ----------: | -----: |
| \* \* \* \* \*  |    ~1403k |       ~151k ✓ |      ~41k ✓ | ~61k ✓ |
| 0 0 1 \* \*     |    ~1700k |       ~436k ✓ |      ~11k ✓ | ~59k ✓ |
| 0 12 31 \* \*   |    ~1277k |       ~424k ✓ |      ~11k ✓ | ~61k ✓ |
| _/15 _ \* \* \* |    ~1379k |       ~221k ✓ |      ~73k ✓ | ~61k ✓ |
| 0 9 \* \* \*    |    ~1582k |       ~287k ✓ |      ~62k ✓ | ~63k ✓ |
| 0 9 15 \* 1     |    ~1948k |       ~511k ✓ |      ~77k ✓ | ~63k ✓ |
| 0 9 \* \* 1-5   |    ~1430k |       ~280k ✓ |      ~64k ✓ | ~57k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case       |       cron-fast |       cron-schedule |            cron-parser |                croner |
| --------------- | --------------: | ------------------: | ---------------------: | --------------------: |
| \* \* \* \* \*  | 713 ns / 838 ns | 6,608 ns / 6,872 ns |  24,501 ns / 26,324 ns | 16,471 ns / 16,665 ns |
| 0 0 1 \* \*     | 588 ns / 688 ns | 2,294 ns / 2,429 ns | 89,403 ns / 132,500 ns | 16,879 ns / 17,644 ns |
| 0 12 31 \* \*   | 783 ns / 888 ns | 2,360 ns / 2,496 ns | 93,076 ns / 128,000 ns | 16,488 ns / 16,455 ns |
| _/15 _ \* \* \* | 725 ns / 840 ns | 4,527 ns / 4,649 ns |  13,680 ns / 13,604 ns | 16,355 ns / 16,343 ns |
| 0 9 \* \* \*    | 632 ns / 739 ns | 3,487 ns / 3,683 ns |  16,045 ns / 17,177 ns | 15,820 ns / 15,789 ns |
| 0 9 15 \* 1     | 513 ns / 624 ns | 1,958 ns / 2,082 ns |  12,965 ns / 13,539 ns | 15,940 ns / 15,830 ns |
| 0 9 \* \* 1-5   | 699 ns / 805 ns | 3,573 ns / 3,810 ns |  15,560 ns / 17,117 ns | 17,682 ns / 17,688 ns |

### Validation - Throughput (ops/sec)

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |    ~1818k |       ~164k ✓ |      ~54k ✓ | ~67k ✓ |       ~802k ✓ |
| 0 0 1 \* \*     |    ~3670k |       ~463k ✓ |     ~191k ✓ | ~63k ✓ |       ~916k ✓ |
| 0 12 31 \* \*   |    ~3558k |       ~478k ✓ |     ~188k ✓ | ~66k ✓ |       ~827k ✓ |
| _/15 _ \* \* \* |    ~2179k |       ~227k ✓ |      ~93k ✓ | ~66k ✓ |       ~957k ✓ |
| 0 9 \* \* \*    |    ~2884k |       ~311k ✓ |     ~122k ✓ | ~65k ✓ |       ~917k ✓ |
| 0 9 15 \* 1     |    ~3746k |       ~570k ✓ |     ~210k ✓ | ~64k ✓ |       ~853k ✓ |
| 0 9 \* \* 1-5   |    ~2146k |       ~300k ✓ |     ~125k ✓ | ~63k ✓ |       ~926k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case       |       cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| --------------- | --------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| \* \* \* \* \*  | 550 ns / 680 ns | 6,102 ns / 6,232 ns | 18,412 ns / 18,675 ns | 14,851 ns / 14,623 ns | 1,247 ns / 2,583 ns |
| 0 0 1 \* \*     | 272 ns / 400 ns | 2,158 ns / 2,297 ns |   5,236 ns / 5,349 ns | 15,870 ns / 16,041 ns | 1,091 ns / 1,249 ns |
| 0 12 31 \* \*   | 281 ns / 410 ns | 2,093 ns / 2,213 ns |   5,328 ns / 5,464 ns | 15,141 ns / 14,985 ns | 1,209 ns / 1,312 ns |
| _/15 _ \* \* \* | 459 ns / 610 ns | 4,406 ns / 4,503 ns | 10,752 ns / 10,840 ns | 15,157 ns / 14,976 ns | 1,044 ns / 1,174 ns |
| 0 9 \* \* \*    | 347 ns / 512 ns | 3,217 ns / 3,338 ns |   8,217 ns / 8,345 ns | 15,343 ns / 16,019 ns | 1,091 ns / 1,208 ns |
| 0 9 15 \* 1     | 267 ns / 400 ns | 1,753 ns / 1,885 ns |   4,763 ns / 4,870 ns | 15,536 ns / 15,277 ns | 1,173 ns / 1,306 ns |
| 0 9 \* \* 1-5   | 466 ns / 636 ns | 3,336 ns / 3,522 ns |   7,970 ns / 8,036 ns | 15,809 ns / 17,278 ns | 1,080 ns / 1,179 ns |

### Parsing - Throughput (ops/sec)

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |    ~1747k |       ~160k ✓ |      ~55k ✓ | ~65k ✓ |       ~911k ✓ |
| 0 0 1 \* \*     |    ~3575k |       ~474k ✓ |     ~195k ✓ | ~65k ✓ |       ~923k ✓ |
| 0 12 31 \* \*   |    ~3633k |       ~467k ✓ |     ~191k ✓ | ~64k ✓ |       ~838k ✓ |
| _/15 _ \* \* \* |    ~2085k |       ~228k ✓ |      ~94k ✓ | ~65k ✓ |       ~944k ✓ |
| 0 9 \* \* \*    |    ~2798k |       ~312k ✓ |     ~122k ✓ | ~66k ✓ |       ~884k ✓ |
| 0 9 15 \* 1     |    ~3725k |       ~578k ✓ |     ~215k ✓ | ~65k ✓ |       ~851k ✓ |
| 0 9 \* \* 1-5   |    ~2149k |       ~308k ✓ |     ~125k ✓ | ~63k ✓ |       ~905k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case       |       cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| --------------- | --------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| \* \* \* \* \*  | 572 ns / 790 ns | 6,231 ns / 6,409 ns | 18,247 ns / 18,569 ns | 15,379 ns / 15,684 ns | 1,098 ns / 1,202 ns |
| 0 0 1 \* \*     | 280 ns / 412 ns | 2,110 ns / 2,240 ns |   5,129 ns / 5,300 ns | 15,377 ns / 16,031 ns | 1,083 ns / 1,248 ns |
| 0 12 31 \* \*   | 275 ns / 405 ns | 2,141 ns / 2,277 ns |   5,234 ns / 5,320 ns | 15,745 ns / 16,277 ns | 1,193 ns / 1,309 ns |
| _/15 _ \* \* \* | 480 ns / 669 ns | 4,379 ns / 4,540 ns | 10,690 ns / 10,770 ns | 15,358 ns / 15,296 ns | 1,060 ns / 1,143 ns |
| 0 9 \* \* \*    | 357 ns / 540 ns | 3,201 ns / 3,360 ns |   8,205 ns / 8,404 ns | 15,202 ns / 15,091 ns | 1,132 ns / 1,202 ns |
| 0 9 15 \* 1     | 268 ns / 398 ns | 1,729 ns / 1,874 ns |   4,653 ns / 4,761 ns | 15,413 ns / 15,858 ns | 1,175 ns / 1,235 ns |
| 0 9 \* \* 1-5   | 465 ns / 621 ns | 3,246 ns / 3,354 ns |   7,997 ns / 8,138 ns | 15,916 ns / 16,508 ns | 1,104 ns / 1,214 ns |

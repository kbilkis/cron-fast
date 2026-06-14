# Benchmark

> Tested with bun v1.3.14, cron-fast v3.1.2, croner v10.0.1, cron-parser v5.5.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by mitata.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~694k       | baseline     |
| cron-schedule | ~318k       | 2.2x faster  |
| cron-parser   | ~40k        | 17.5x faster |
| croner        | ~60k        | 11.6x faster |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~8k         | baseline     |
| cron-schedule | ~26k        | 3.3x slower  |
| cron-parser   | ~1k         | 7.3x faster  |
| croner        | ~6k         | 1.3x faster  |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~954k       | baseline     |
| cron-schedule | ~329k       | 2.9x faster  |
| cron-parser   | ~44k        | 21.8x faster |
| croner        | ~62k        | 15.4x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1600k      | baseline     |
| cron-schedule | ~360k       | 4.4x faster  |
| cron-parser   | ~139k       | 11.5x faster |
| croner        | ~65k        | 24.5x faster |
| cron-validate | ~902k       | 1.8x faster  |

### Parsing

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1481k      | baseline     |
| cron-schedule | ~360k       | 4.1x faster  |
| cron-parser   | ~140k       | 10.6x faster |
| croner        | ~65k        | 22.7x faster |
| cron-validate | ~908k       | 1.6x faster  |

Run benchmarks yourself: `pnpm bench:bun`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case       | cron-fast | cron-schedule | cron-parser | croner |
| --------------- | --------: | ------------: | ----------: | -----: |
| \* \* \* \* \*  |     ~991k |       ~146k ✓ |      ~40k ✓ | ~63k ✓ |
| 0 0 1 \* \*     |     ~688k |       ~420k ✓ |      ~21k ✓ | ~63k ✓ |
| 0 12 31 \* \*   |     ~590k |       ~427k ✓ |       ~9k ✓ | ~60k ✓ |
| _/15 _ \* \* \* |     ~623k |       ~209k ✓ |      ~70k ✓ | ~61k ✓ |
| 0 9 \* \* \*    |     ~704k |       ~284k ✓ |      ~49k ✓ | ~63k ✓ |
| 0 9 15 \* 1     |     ~523k |         ~479k |      ~41k ✓ | ~55k ✓ |
| 0 9 \* \* 1-5   |     ~740k |       ~265k ✓ |      ~49k ✓ | ~53k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case       |           cron-fast |       cron-schedule |             cron-parser |                croner |
| --------------- | ------------------: | ------------------: | ----------------------: | --------------------: |
| \* \* \* \* \*  | 1,009 ns / 3,208 ns | 6,852 ns / 9,250 ns |   24,941 ns / 41,750 ns | 15,879 ns / 27,708 ns |
| 0 0 1 \* \*     | 1,453 ns / 1,718 ns | 2,378 ns / 2,638 ns |   47,639 ns / 76,041 ns | 15,789 ns / 16,545 ns |
| 0 12 31 \* \*   | 1,694 ns / 1,958 ns | 2,344 ns / 2,421 ns | 112,115 ns / 176,083 ns | 16,725 ns / 17,294 ns |
| _/15 _ \* \* \* | 1,604 ns / 2,367 ns | 4,796 ns / 5,073 ns |   14,378 ns / 15,203 ns | 16,266 ns / 17,631 ns |
| 0 9 \* \* \*    | 1,421 ns / 1,920 ns | 3,525 ns / 3,640 ns |   20,436 ns / 20,640 ns | 15,768 ns / 16,503 ns |
| 0 9 15 \* 1     | 1,911 ns / 2,159 ns | 2,089 ns / 2,319 ns |   24,163 ns / 24,157 ns | 18,046 ns / 18,289 ns |
| 0 9 \* \* 1-5   | 1,351 ns / 1,593 ns | 3,774 ns / 3,988 ns |   20,593 ns / 20,811 ns | 18,785 ns / 19,373 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case      | cron-fast | cron-schedule | cron-parser | croner |
| -------------- | --------: | ------------: | ----------: | -----: |
| \* \* \* \* \* |       ~9k |        ~31k ✗ |       ~2k ✓ | ~10k ✗ |
| 0 9 \* \* 1-5  |       ~6k |        ~21k ✗ |       ~1k ✓ |  ~1k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case      |               cron-fast |         cron-schedule |                 cron-parser |                  croner |
| -------------- | ----------------------: | --------------------: | --------------------------: | ----------------------: |
| \* \* \* \* \* | 106,860 ns / 114,375 ns | 32,180 ns / 32,073 ns |     607,939 ns / 800,292 ns |  95,399 ns / 108,667 ns |
| 0 9 \* \* 1-5  | 157,722 ns / 190,875 ns | 48,774 ns / 49,010 ns | 1,927,413 ns / 2,650,500 ns | 704,508 ns / 807,834 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case       | cron-fast | cron-schedule | cron-parser | croner |
| --------------- | --------: | ------------: | ----------: | -----: |
| \* \* \* \* \*  |    ~1002k |       ~152k ✓ |      ~44k ✓ | ~63k ✓ |
| 0 0 1 \* \*     |    ~1168k |       ~437k ✓ |      ~11k ✓ | ~62k ✓ |
| 0 12 31 \* \*   |     ~930k |       ~428k ✓ |      ~11k ✓ | ~62k ✓ |
| _/15 _ \* \* \* |     ~689k |       ~213k ✓ |      ~69k ✓ | ~64k ✓ |
| 0 9 \* \* \*    |    ~1016k |       ~288k ✓ |      ~54k ✓ | ~64k ✓ |
| 0 9 15 \* 1     |    ~1128k |       ~513k ✓ |      ~64k ✓ | ~63k ✓ |
| 0 9 \* \* 1-5   |     ~744k |       ~275k ✓ |      ~54k ✓ | ~56k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case       |           cron-fast |       cron-schedule |            cron-parser |                croner |
| --------------- | ------------------: | ------------------: | ---------------------: | --------------------: |
| \* \* \* \* \*  |   998 ns / 1,115 ns | 6,575 ns / 6,925 ns |  22,832 ns / 24,161 ns | 15,958 ns / 16,084 ns |
| 0 0 1 \* \*     |     856 ns / 960 ns | 2,288 ns / 2,386 ns | 91,276 ns / 115,291 ns | 16,179 ns / 16,901 ns |
| 0 12 31 \* \*   | 1,076 ns / 1,182 ns | 2,339 ns / 2,451 ns | 94,845 ns / 115,667 ns | 16,088 ns / 16,139 ns |
| _/15 _ \* \* \* | 1,451 ns / 2,329 ns | 4,696 ns / 4,818 ns |  14,441 ns / 15,657 ns | 15,521 ns / 15,571 ns |
| 0 9 \* \* \*    |   984 ns / 1,097 ns | 3,471 ns / 3,593 ns |  18,639 ns / 19,626 ns | 15,675 ns / 16,719 ns |
| 0 9 15 \* 1     |     886 ns / 994 ns | 1,951 ns / 2,060 ns |  15,740 ns / 17,189 ns | 15,956 ns / 15,955 ns |
| 0 9 \* \* 1-5   | 1,344 ns / 1,446 ns | 3,634 ns / 3,758 ns |  18,459 ns / 20,209 ns | 17,823 ns / 17,698 ns |

### Validation - Throughput (ops/sec)

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |    ~1424k |       ~159k ✓ |      ~64k ✓ | ~66k ✓ |       ~783k ✓ |
| 0 0 1 \* \*     |    ~2015k |       ~469k ✓ |     ~174k ✓ | ~65k ✓ |       ~960k ✓ |
| 0 12 31 \* \*   |    ~1887k |       ~473k ✓ |     ~177k ✓ | ~65k ✓ |       ~843k ✓ |
| _/15 _ \* \* \* |     ~990k |       ~225k ✓ |     ~102k ✓ | ~63k ✓ |         ~988k |
| 0 9 \* \* \*    |    ~1820k |       ~305k ✓ |     ~129k ✓ | ~68k ✓ |       ~928k ✓ |
| 0 9 15 \* 1     |    ~1901k |       ~587k ✓ |     ~196k ✓ | ~65k ✓ |       ~870k ✓ |
| 0 9 \* \* 1-5   |    ~1163k |       ~302k ✓ |     ~131k ✓ | ~65k ✓ |       ~939k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case       |           cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| --------------- | ------------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| \* \* \* \* \*  |     702 ns / 806 ns | 6,275 ns / 6,327 ns | 15,648 ns / 15,851 ns | 15,234 ns / 15,639 ns | 1,277 ns / 3,417 ns |
| 0 0 1 \* \*     |     496 ns / 619 ns | 2,131 ns / 2,245 ns |   5,760 ns / 5,934 ns | 15,423 ns / 16,137 ns | 1,041 ns / 1,144 ns |
| 0 12 31 \* \*   |     530 ns / 730 ns | 2,113 ns / 2,213 ns |   5,649 ns / 5,767 ns | 15,285 ns / 15,835 ns | 1,186 ns / 1,294 ns |
| _/15 _ \* \* \* | 1,010 ns / 1,913 ns | 4,439 ns / 4,547 ns |   9,790 ns / 9,860 ns | 15,800 ns / 15,948 ns | 1,012 ns / 1,129 ns |
| 0 9 \* \* \*    |     550 ns / 741 ns | 3,276 ns / 3,374 ns |   7,737 ns / 7,836 ns | 14,713 ns / 14,597 ns | 1,078 ns / 1,173 ns |
| 0 9 15 \* 1     |     526 ns / 638 ns | 1,705 ns / 1,825 ns |   5,101 ns / 5,240 ns | 15,405 ns / 15,963 ns | 1,149 ns / 1,251 ns |
| 0 9 \* \* 1-5   |   860 ns / 1,055 ns | 3,316 ns / 3,426 ns |   7,643 ns / 7,772 ns | 15,477 ns / 16,019 ns | 1,065 ns / 1,165 ns |

### Parsing - Throughput (ops/sec)

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |    ~1382k |       ~160k ✓ |      ~65k ✓ | ~67k ✓ |       ~926k ✓ |
| 0 0 1 \* \*     |    ~1968k |       ~476k ✓ |     ~181k ✓ | ~64k ✓ |       ~963k ✓ |
| 0 12 31 \* \*   |    ~1912k |       ~469k ✓ |     ~178k ✓ | ~64k ✓ |       ~813k ✓ |
| _/15 _ \* \* \* |     ~874k |       ~224k ✓ |     ~102k ✓ | ~65k ✓ |       ~985k ✗ |
| 0 9 \* \* \*    |    ~1634k |       ~305k ✓ |     ~129k ✓ | ~66k ✓ |       ~904k ✓ |
| 0 9 15 \* 1     |    ~1554k |       ~583k ✓ |     ~195k ✓ | ~65k ✓ |       ~858k ✓ |
| 0 9 \* \* 1-5   |    ~1043k |       ~304k ✓ |     ~132k ✓ | ~65k ✓ |       ~910k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case       |           cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| --------------- | ------------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| \* \* \* \* \*  |     724 ns / 935 ns | 6,254 ns / 6,331 ns | 15,374 ns / 15,553 ns | 14,950 ns / 15,614 ns | 1,079 ns / 1,124 ns |
| 0 0 1 \* \*     |     508 ns / 627 ns | 2,100 ns / 2,195 ns |   5,527 ns / 5,634 ns | 15,614 ns / 15,967 ns | 1,039 ns / 1,073 ns |
| 0 12 31 \* \*   |     523 ns / 640 ns | 2,133 ns / 2,236 ns |   5,618 ns / 5,743 ns | 15,548 ns / 15,687 ns | 1,230 ns / 1,306 ns |
| _/15 _ \* \* \* | 1,144 ns / 1,950 ns | 4,468 ns / 4,554 ns |   9,819 ns / 9,884 ns | 15,310 ns / 15,668 ns | 1,015 ns / 1,109 ns |
| 0 9 \* \* \*    |     612 ns / 808 ns | 3,280 ns / 3,465 ns |   7,770 ns / 8,035 ns | 15,053 ns / 15,479 ns | 1,106 ns / 1,193 ns |
| 0 9 15 \* 1     |     643 ns / 832 ns | 1,715 ns / 1,829 ns |   5,125 ns / 5,319 ns | 15,385 ns / 15,852 ns | 1,166 ns / 1,265 ns |
| 0 9 \* \* 1-5   |   959 ns / 1,144 ns | 3,291 ns / 3,447 ns |   7,584 ns / 7,657 ns | 15,435 ns / 15,894 ns | 1,099 ns / 1,204 ns |

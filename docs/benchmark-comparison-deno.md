# Benchmark

> Tested with deno v2.8.3, cron-fast v3.3.0, croner v10.0.1, cron-parser v5.5.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by Deno.bench().

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~973k       | baseline     |
| cron-schedule | ~376k       | 2.6x faster  |
| cron-parser   | ~32k        | 30.0x faster |
| croner        | ~28k        | 34.3x faster |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~23k        | baseline     |
| cron-schedule | ~18k        | 1.3x faster  |
| cron-parser   | ~1k         | 25.8x faster |
| croner        | ~2k         | 10.7x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1055k      | baseline     |
| cron-schedule | ~407k       | 2.6x faster  |
| cron-parser   | ~37k        | 28.2x faster |
| croner        | ~29k        | 36.2x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2016k      | baseline     |
| cron-schedule | ~522k       | 3.9x faster  |
| cron-parser   | ~97k        | 20.7x faster |
| croner        | ~31k        | 64.8x faster |
| cron-validate | ~1230k      | 1.6x faster  |

### Parsing

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1944k      | baseline     |
| cron-schedule | ~511k       | 3.8x faster  |
| cron-parser   | ~94k        | 20.8x faster |
| croner        | ~30k        | 63.8x faster |
| cron-validate | ~1190k      | 1.6x faster  |

Run benchmarks yourself: `pnpm bench:deno`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case       | cron-fast | cron-schedule | cron-parser | croner |
| --------------- | --------: | ------------: | ----------: | -----: |
| \* \* \* \* \*  |    ~1376k |       ~133k ✓ |      ~28k ✓ | ~30k ✓ |
| 0 0 1 \* \*     |     ~938k |       ~512k ✓ |      ~18k ✓ | ~30k ✓ |
| 0 12 31 \* \*   |     ~863k |       ~521k ✓ |       ~7k ✓ | ~24k ✓ |
| _/15 _ \* \* \* |    ~1046k |       ~274k ✓ |      ~51k ✓ | ~29k ✓ |
| 0 9 \* \* \*    |    ~1070k |       ~366k ✓ |      ~42k ✓ | ~30k ✓ |
| 0 9 15 \* 1     |     ~593k |       ~501k ✓ |      ~37k ✓ | ~28k ✓ |
| 0 9 \* \* 1-5   |     ~923k |       ~324k ✓ |      ~44k ✓ | ~28k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case       |           cron-fast |        cron-schedule |             cron-parser |                 croner |
| --------------- | ------------------: | -------------------: | ----------------------: | ---------------------: |
| \* \* \* \* \*  |     727 ns / 961 ns | 7,524 ns / 13,458 ns |  35,771 ns / 123,709 ns | 33,055 ns / 115,750 ns |
| 0 0 1 \* \*     | 1,066 ns / 1,384 ns |  1,955 ns / 2,587 ns |  56,223 ns / 140,083 ns | 33,546 ns / 101,625 ns |
| 0 12 31 \* \*   | 1,159 ns / 1,372 ns |  1,920 ns / 1,988 ns | 147,380 ns / 321,333 ns | 41,548 ns / 166,583 ns |
| _/15 _ \* \* \* |   956 ns / 1,096 ns |  3,656 ns / 3,794 ns |   19,607 ns / 64,542 ns | 34,663 ns / 126,125 ns |
| 0 9 \* \* \*    |     935 ns / 990 ns |  2,733 ns / 2,809 ns |   23,806 ns / 55,167 ns |  33,142 ns / 77,875 ns |
| 0 9 15 \* 1     | 1,687 ns / 1,748 ns |  1,997 ns / 2,063 ns |   27,106 ns / 64,916 ns |  36,349 ns / 87,542 ns |
| 0 9 \* \* 1-5   | 1,083 ns / 1,270 ns |  3,087 ns / 3,217 ns |   22,625 ns / 50,583 ns |  35,692 ns / 73,958 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case      | cron-fast | cron-schedule | cron-parser | croner |
| -------------- | --------: | ------------: | ----------: | -----: |
| \* \* \* \* \* |      ~32k |        ~24k ✓ |       ~1k ✓ |  ~3k ✓ |
| 0 9 \* \* 1-5  |      ~14k |        ~11k ✓ |       ~0k ✓ |  ~1k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case      |              cron-fast |          cron-schedule |                 cron-parser |                      croner |
| -------------- | ---------------------: | ---------------------: | --------------------------: | --------------------------: |
| \* \* \* \* \* |  31,209 ns / 48,500 ns |  42,459 ns / 82,125 ns |   744,043 ns / 1,036,625 ns |     295,319 ns / 412,167 ns |
| 0 9 \* \* 1-5  | 71,206 ns / 115,250 ns | 87,096 ns / 136,750 ns | 2,258,585 ns / 2,857,042 ns | 1,100,703 ns / 1,292,541 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case       | cron-fast | cron-schedule | cron-parser | croner |
| --------------- | --------: | ------------: | ----------: | -----: |
| \* \* \* \* \*  |    ~1360k |       ~186k ✓ |      ~34k ✓ | ~31k ✓ |
| 0 0 1 \* \*     |    ~1075k |       ~582k ✓ |       ~8k ✓ | ~30k ✓ |
| 0 12 31 \* \*   |     ~840k |       ~492k ✓ |       ~8k ✓ | ~29k ✓ |
| _/15 _ \* \* \* |    ~1052k |       ~266k ✓ |      ~53k ✓ | ~30k ✓ |
| 0 9 \* \* \*    |    ~1042k |       ~357k ✓ |      ~45k ✓ | ~28k ✓ |
| 0 9 15 \* 1     |    ~1028k |       ~604k ✓ |      ~64k ✓ | ~28k ✓ |
| 0 9 \* \* 1-5   |     ~986k |       ~363k ✓ |      ~50k ✓ | ~29k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case       |           cron-fast |       cron-schedule |             cron-parser |                croner |
| --------------- | ------------------: | ------------------: | ----------------------: | --------------------: |
| \* \* \* \* \*  |     735 ns / 785 ns | 5,364 ns / 5,876 ns |   29,596 ns / 70,125 ns | 32,783 ns / 83,084 ns |
| 0 0 1 \* \*     |     930 ns / 971 ns | 1,717 ns / 1,871 ns | 120,009 ns / 263,792 ns | 33,838 ns / 76,791 ns |
| 0 12 31 \* \*   | 1,190 ns / 1,258 ns | 2,031 ns / 2,095 ns | 125,338 ns / 258,917 ns | 34,135 ns / 80,625 ns |
| _/15 _ \* \* \* |     951 ns / 990 ns | 3,758 ns / 4,202 ns |   18,967 ns / 49,000 ns | 32,827 ns / 79,792 ns |
| 0 9 \* \* \*    |   960 ns / 1,132 ns | 2,801 ns / 2,888 ns |   21,983 ns / 54,916 ns | 36,068 ns / 97,250 ns |
| 0 9 15 \* 1     |   972 ns / 1,037 ns | 1,655 ns / 1,713 ns |   15,640 ns / 23,917 ns | 36,269 ns / 82,167 ns |
| 0 9 \* \* 1-5   | 1,014 ns / 1,058 ns | 2,758 ns / 2,913 ns |   20,090 ns / 34,584 ns | 34,855 ns / 51,291 ns |

### Validation - Throughput (ops/sec)

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |    ~2068k |       ~204k ✓ |      ~43k ✓ | ~32k ✓ |      ~1200k ✓ |
| 0 0 1 \* \*     |    ~2277k |       ~718k ✓ |     ~131k ✓ | ~32k ✓ |      ~1292k ✓ |
| 0 12 31 \* \*   |    ~2039k |       ~715k ✓ |     ~125k ✓ | ~32k ✓ |      ~1272k ✓ |
| _/15 _ \* \* \* |    ~1952k |       ~313k ✓ |      ~65k ✓ | ~31k ✓ |      ~1131k ✓ |
| 0 9 \* \* \*    |    ~2282k |       ~450k ✓ |      ~86k ✓ | ~32k ✓ |      ~1299k ✓ |
| 0 9 15 \* 1     |    ~1959k |       ~811k ✓ |     ~140k ✓ | ~30k ✓ |      ~1208k ✓ |
| 0 9 \* \* 1-5   |    ~1538k |       ~444k ✓ |      ~90k ✓ | ~29k ✓ |      ~1210k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case       |       cron-fast |       cron-schedule |           cron-parser |                 croner |   cron-validate |
| --------------- | --------------: | ------------------: | --------------------: | ---------------------: | --------------: |
| \* \* \* \* \*  | 483 ns / 515 ns | 4,906 ns / 5,075 ns | 23,066 ns / 44,542 ns |  31,232 ns / 73,292 ns | 834 ns / 919 ns |
| 0 0 1 \* \*     | 439 ns / 467 ns | 1,392 ns / 2,043 ns |   7,609 ns / 8,002 ns |  31,292 ns / 63,208 ns | 774 ns / 896 ns |
| 0 12 31 \* \*   | 490 ns / 526 ns | 1,398 ns / 1,489 ns |   8,011 ns / 8,497 ns |  31,177 ns / 49,958 ns | 786 ns / 852 ns |
| _/15 _ \* \* \* | 512 ns / 552 ns | 3,192 ns / 3,270 ns | 15,315 ns / 23,625 ns |  31,875 ns / 79,500 ns | 884 ns / 960 ns |
| 0 9 \* \* \*    | 438 ns / 471 ns | 2,221 ns / 2,279 ns | 11,585 ns / 21,541 ns |  31,716 ns / 71,375 ns | 770 ns / 807 ns |
| 0 9 15 \* 1     | 510 ns / 608 ns | 1,233 ns / 1,402 ns |   7,143 ns / 7,414 ns | 33,866 ns / 126,458 ns | 828 ns / 955 ns |
| 0 9 \* \* 1-5   | 650 ns / 833 ns | 2,251 ns / 2,340 ns | 11,164 ns / 18,750 ns | 34,000 ns / 123,958 ns | 827 ns / 884 ns |

### Parsing - Throughput (ops/sec)

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |    ~1946k |       ~202k ✓ |      ~44k ✓ | ~32k ✓ |      ~1134k ✓ |
| 0 0 1 \* \*     |    ~2134k |       ~694k ✓ |     ~125k ✓ | ~30k ✓ |      ~1209k ✓ |
| 0 12 31 \* \*   |    ~1943k |       ~657k ✓ |     ~112k ✓ | ~30k ✓ |      ~1179k ✓ |
| _/15 _ \* \* \* |    ~1828k |       ~288k ✓ |      ~57k ✓ | ~29k ✓ |      ~1073k ✓ |
| 0 9 \* \* \*    |    ~2142k |       ~410k ✓ |      ~79k ✓ | ~30k ✓ |      ~1182k ✓ |
| 0 9 15 \* 1     |    ~1881k |       ~875k ✓ |     ~147k ✓ | ~31k ✓ |      ~1322k ✓ |
| 0 9 \* \* 1-5   |    ~1737k |       ~452k ✓ |      ~92k ✓ | ~32k ✓ |      ~1229k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case       |       cron-fast |       cron-schedule |           cron-parser |                 croner |   cron-validate |
| --------------- | --------------: | ------------------: | --------------------: | ---------------------: | --------------: |
| \* \* \* \* \*  | 514 ns / 690 ns | 4,955 ns / 5,191 ns | 22,690 ns / 41,792 ns |  31,419 ns / 75,375 ns | 882 ns / 982 ns |
| 0 0 1 \* \*     | 469 ns / 513 ns | 1,441 ns / 1,537 ns |   8,031 ns / 8,324 ns |  33,387 ns / 79,833 ns | 827 ns / 903 ns |
| 0 12 31 \* \*   | 515 ns / 557 ns | 1,522 ns / 1,642 ns |   8,955 ns / 9,812 ns |  33,028 ns / 62,000 ns | 848 ns / 980 ns |
| _/15 _ \* \* \* | 547 ns / 601 ns | 3,470 ns / 3,596 ns | 17,504 ns / 57,542 ns | 34,980 ns / 107,958 ns | 932 ns / 998 ns |
| 0 9 \* \* \*    | 467 ns / 504 ns | 2,438 ns / 2,923 ns | 12,657 ns / 35,084 ns |  33,868 ns / 74,458 ns | 846 ns / 923 ns |
| 0 9 15 \* 1     | 532 ns / 614 ns | 1,143 ns / 1,183 ns |   6,788 ns / 7,052 ns |  31,847 ns / 48,209 ns | 757 ns / 798 ns |
| 0 9 \* \* 1-5   | 576 ns / 616 ns | 2,214 ns / 2,270 ns | 10,887 ns / 17,292 ns |  31,423 ns / 54,334 ns | 814 ns / 862 ns |

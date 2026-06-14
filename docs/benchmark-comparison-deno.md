# Benchmark

> Tested with deno v2.8.3, cron-fast v3.1.2, croner v10.0.1, cron-parser v5.5.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by Deno.bench().

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~888k       | baseline     |
| cron-schedule | ~407k       | 2.2x faster  |
| cron-parser   | ~35k        | 25.1x faster |
| croner        | ~32k        | 27.9x faster |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~10k        | baseline     |
| cron-schedule | ~18k        | 1.8x slower  |
| cron-parser   | ~1k         | 10.9x faster |
| croner        | ~2k         | 4.5x faster  |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1004k      | baseline     |
| cron-schedule | ~437k       | 2.3x faster  |
| cron-parser   | ~41k        | 24.5x faster |
| croner        | ~32k        | 31.6x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2222k      | baseline     |
| cron-schedule | ~566k       | 3.9x faster  |
| cron-parser   | ~105k       | 21.1x faster |
| croner        | ~33k        | 66.5x faster |
| cron-validate | ~1313k      | 1.7x faster  |

### Parsing

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2224k      | baseline     |
| cron-schedule | ~567k       | 3.9x faster  |
| cron-parser   | ~106k       | 21.1x faster |
| croner        | ~33k        | 67.1x faster |
| cron-validate | ~1316k      | 1.7x faster  |

Run benchmarks yourself: `pnpm bench:deno`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case       | cron-fast | cron-schedule | cron-parser | croner |
| --------------- | --------: | ------------: | ----------: | -----: |
| \* \* \* \* \*  |    ~1470k |       ~160k ✓ |      ~32k ✓ | ~33k ✓ |
| 0 0 1 \* \*     |     ~793k |       ~578k ✓ |      ~19k ✓ | ~32k ✓ |
| 0 12 31 \* \*   |     ~702k |       ~558k ✓ |       ~8k ✓ | ~31k ✓ |
| _/15 _ \* \* \* |     ~980k |       ~294k ✓ |      ~57k ✓ | ~33k ✓ |
| 0 9 \* \* \*    |     ~970k |       ~387k ✓ |      ~45k ✓ | ~33k ✓ |
| 0 9 15 \* 1     |     ~448k |       ~527k ✗ |      ~40k ✓ | ~31k ✓ |
| 0 9 \* \* 1-5   |     ~850k |       ~341k ✓ |      ~47k ✓ | ~30k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case       |           cron-fast |       cron-schedule |             cron-parser |                croner |
| --------------- | ------------------: | ------------------: | ----------------------: | --------------------: |
| \* \* \* \* \*  |     680 ns / 916 ns | 6,232 ns / 7,260 ns |   31,679 ns / 59,125 ns | 30,042 ns / 67,834 ns |
| 0 0 1 \* \*     | 1,260 ns / 1,514 ns | 1,730 ns / 1,959 ns |   52,172 ns / 69,417 ns | 30,812 ns / 40,291 ns |
| 0 12 31 \* \*   | 1,425 ns / 1,618 ns | 1,793 ns / 1,819 ns | 132,660 ns / 243,084 ns | 32,450 ns / 38,250 ns |
| _/15 _ \* \* \* | 1,020 ns / 1,052 ns | 3,397 ns / 3,534 ns |   17,508 ns / 20,333 ns | 30,389 ns / 38,709 ns |
| 0 9 \* \* \*    | 1,031 ns / 1,065 ns | 2,586 ns / 2,615 ns |   22,235 ns / 27,875 ns | 30,353 ns / 33,500 ns |
| 0 9 15 \* 1     | 2,232 ns / 2,283 ns | 1,897 ns / 1,946 ns |   25,175 ns / 31,125 ns | 32,717 ns / 39,084 ns |
| 0 9 \* \* 1-5   | 1,176 ns / 1,369 ns | 2,931 ns / 2,990 ns |   21,210 ns / 24,375 ns | 33,694 ns / 42,375 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case      | cron-fast | cron-schedule | cron-parser | croner |
| -------------- | --------: | ------------: | ----------: | -----: |
| \* \* \* \* \* |      ~14k |        ~25k ✗ |       ~1k ✓ |  ~4k ✓ |
| 0 9 \* \* 1-5  |       ~7k |        ~12k ✗ |       ~0k ✓ |  ~1k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case      |               cron-fast |         cron-schedule |                 cron-parser |                      croner |
| -------------- | ----------------------: | --------------------: | --------------------------: | --------------------------: |
| \* \* \* \* \* |  73,257 ns / 163,750 ns | 40,371 ns / 70,917 ns |     715,933 ns / 892,708 ns |     283,799 ns / 377,125 ns |
| 0 9 \* \* 1-5  | 149,621 ns / 250,500 ns | 82,663 ns / 87,375 ns | 2,113,577 ns / 2,400,791 ns | 1,051,707 ns / 1,199,792 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case       | cron-fast | cron-schedule | cron-parser | croner |
| --------------- | --------: | ------------: | ----------: | -----: |
| \* \* \* \* \*  |    ~1498k |       ~198k ✓ |      ~36k ✓ | ~32k ✓ |
| 0 0 1 \* \*     |     ~964k |       ~616k ✓ |       ~9k ✓ | ~31k ✓ |
| 0 12 31 \* \*   |     ~701k |       ~519k ✓ |       ~9k ✓ | ~31k ✓ |
| _/15 _ \* \* \* |     ~968k |       ~295k ✓ |      ~58k ✓ | ~33k ✓ |
| 0 9 \* \* \*    |    ~1002k |       ~405k ✓ |      ~52k ✓ | ~32k ✓ |
| 0 9 15 \* 1     |     ~992k |       ~642k ✓ |      ~69k ✓ | ~32k ✓ |
| 0 9 \* \* 1-5   |     ~899k |       ~382k ✓ |      ~54k ✓ | ~30k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case       |           cron-fast |       cron-schedule |             cron-parser |                croner |
| --------------- | ------------------: | ------------------: | ----------------------: | --------------------: |
| \* \* \* \* \*  |     667 ns / 696 ns | 5,061 ns / 5,512 ns |   27,665 ns / 32,959 ns | 31,413 ns / 50,125 ns |
| 0 0 1 \* \*     | 1,038 ns / 1,070 ns | 1,623 ns / 1,722 ns | 111,083 ns / 214,042 ns | 32,042 ns / 39,042 ns |
| 0 12 31 \* \*   | 1,426 ns / 1,466 ns | 1,925 ns / 2,003 ns | 117,542 ns / 225,958 ns | 31,806 ns / 37,417 ns |
| _/15 _ \* \* \* | 1,033 ns / 1,063 ns | 3,392 ns / 3,471 ns |   17,183 ns / 18,625 ns | 30,408 ns / 34,541 ns |
| 0 9 \* \* \*    |   998 ns / 1,017 ns | 2,468 ns / 2,499 ns |   19,197 ns / 23,459 ns | 31,177 ns / 35,792 ns |
| 0 9 15 \* 1     | 1,008 ns / 1,024 ns | 1,558 ns / 1,625 ns |   14,523 ns / 15,625 ns | 31,049 ns / 36,083 ns |
| 0 9 \* \* 1-5   | 1,112 ns / 1,147 ns | 2,619 ns / 2,686 ns |   18,612 ns / 21,292 ns | 32,792 ns / 39,291 ns |

### Validation - Throughput (ops/sec)

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |    ~2400k |       ~214k ✓ |      ~47k ✓ | ~35k ✓ |      ~1263k ✓ |
| 0 0 1 \* \*     |    ~2439k |       ~785k ✓ |     ~138k ✓ | ~34k ✓ |      ~1382k ✓ |
| 0 12 31 \* \*   |    ~2125k |       ~775k ✓ |     ~136k ✓ | ~33k ✓ |      ~1348k ✓ |
| _/15 _ \* \* \* |    ~2155k |       ~331k ✓ |      ~69k ✓ | ~33k ✓ |      ~1198k ✓ |
| 0 9 \* \* \*    |    ~2471k |       ~468k ✓ |      ~93k ✓ | ~33k ✓ |      ~1354k ✓ |
| 0 9 15 \* 1     |    ~2133k |       ~924k ✓ |     ~157k ✓ | ~33k ✓ |      ~1375k ✓ |
| 0 9 \* \* 1-5   |    ~1829k |       ~466k ✓ |      ~96k ✓ | ~33k ✓ |      ~1272k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case       |       cron-fast |       cron-schedule |           cron-parser |                croner |   cron-validate |
| --------------- | --------------: | ------------------: | --------------------: | --------------------: | --------------: |
| \* \* \* \* \*  | 417 ns / 432 ns | 4,664 ns / 4,851 ns | 21,385 ns / 23,500 ns | 28,894 ns / 34,708 ns | 792 ns / 863 ns |
| 0 0 1 \* \*     | 410 ns / 426 ns | 1,274 ns / 1,301 ns |   7,244 ns / 7,430 ns | 29,158 ns / 35,750 ns | 724 ns / 748 ns |
| 0 12 31 \* \*   | 471 ns / 487 ns | 1,290 ns / 1,376 ns |   7,338 ns / 7,441 ns | 30,234 ns / 42,541 ns | 742 ns / 767 ns |
| _/15 _ \* \* \* | 464 ns / 482 ns | 3,022 ns / 3,081 ns | 14,415 ns / 15,250 ns | 30,139 ns / 37,458 ns | 835 ns / 846 ns |
| 0 9 \* \* \*    | 405 ns / 429 ns | 2,139 ns / 2,180 ns | 10,803 ns / 12,959 ns | 30,321 ns / 37,375 ns | 739 ns / 755 ns |
| 0 9 15 \* 1     | 469 ns / 485 ns | 1,082 ns / 1,101 ns |   6,362 ns / 6,582 ns | 30,291 ns / 36,834 ns | 727 ns / 759 ns |
| 0 9 \* \* 1-5   | 547 ns / 557 ns | 2,147 ns / 2,178 ns | 10,443 ns / 11,291 ns | 30,652 ns / 37,208 ns | 786 ns / 822 ns |

### Parsing - Throughput (ops/sec)

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |    ~2383k |       ~216k ✓ |      ~47k ✓ | ~34k ✓ |      ~1282k ✓ |
| 0 0 1 \* \*     |    ~2377k |       ~784k ✓ |     ~140k ✓ | ~33k ✓ |      ~1355k ✓ |
| 0 12 31 \* \*   |    ~2174k |       ~780k ✓ |     ~136k ✓ | ~32k ✓ |      ~1367k ✓ |
| _/15 _ \* \* \* |    ~2154k |       ~331k ✓ |      ~70k ✓ | ~33k ✓ |      ~1223k ✓ |
| 0 9 \* \* \*    |    ~2503k |       ~467k ✓ |      ~93k ✓ | ~33k ✓ |      ~1351k ✓ |
| 0 9 15 \* 1     |    ~2149k |       ~925k ✓ |     ~159k ✓ | ~33k ✓ |      ~1373k ✓ |
| 0 9 \* \* 1-5   |    ~1829k |       ~467k ✓ |      ~96k ✓ | ~33k ✓ |      ~1263k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case       |       cron-fast |       cron-schedule |           cron-parser |                croner |   cron-validate |
| --------------- | --------------: | ------------------: | --------------------: | --------------------: | --------------: |
| \* \* \* \* \*  | 420 ns / 433 ns | 4,630 ns / 4,654 ns | 21,330 ns / 24,209 ns | 29,436 ns / 33,875 ns | 780 ns / 799 ns |
| 0 0 1 \* \*     | 421 ns / 437 ns | 1,276 ns / 1,301 ns |   7,162 ns / 7,296 ns | 30,620 ns / 40,583 ns | 738 ns / 766 ns |
| 0 12 31 \* \*   | 460 ns / 486 ns | 1,282 ns / 1,301 ns |   7,364 ns / 7,547 ns | 30,777 ns / 39,917 ns | 732 ns / 738 ns |
| _/15 _ \* \* \* | 464 ns / 476 ns | 3,023 ns / 3,086 ns | 14,382 ns / 15,167 ns | 29,935 ns / 36,750 ns | 818 ns / 848 ns |
| 0 9 \* \* \*    | 400 ns / 417 ns | 2,140 ns / 2,215 ns | 10,750 ns / 12,208 ns | 29,991 ns / 36,750 ns | 740 ns / 759 ns |
| 0 9 15 \* 1     | 465 ns / 486 ns | 1,082 ns / 1,124 ns |   6,306 ns / 6,413 ns | 30,254 ns / 36,834 ns | 729 ns / 738 ns |
| 0 9 \* \* 1-5   | 547 ns / 561 ns | 2,142 ns / 2,172 ns | 10,412 ns / 11,250 ns | 30,152 ns / 34,250 ns | 792 ns / 824 ns |

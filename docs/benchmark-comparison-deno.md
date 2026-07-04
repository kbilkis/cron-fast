# Benchmark

> Tested with deno v2.8.3, cron-fast v3.4.0, croner v10.0.1, cron-parser v5.6.1, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by Deno.bench().

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1267k      | baseline     |
| cron-schedule | ~392k       | 3.2x faster  |
| cron-parser   | ~35k        | 36.1x faster |
| croner        | ~31k        | 41.3x faster |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~24k        | baseline     |
| cron-schedule | ~18k        | 1.3x faster  |
| cron-parser   | ~1k         | 25.3x faster |
| croner        | ~2k         | 10.8x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1417k      | baseline     |
| cron-schedule | ~421k       | 3.4x faster  |
| cron-parser   | ~40k        | 35.1x faster |
| croner        | ~30k        | 46.5x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~3659k      | baseline      |
| cron-schedule | ~548k       | 6.7x faster   |
| cron-parser   | ~105k       | 34.8x faster  |
| croner        | ~33k        | 112.4x faster |
| cron-validate | ~1282k      | 2.9x faster   |

### Parsing

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~3676k      | baseline      |
| cron-schedule | ~551k       | 6.7x faster   |
| cron-parser   | ~106k       | 34.8x faster  |
| croner        | ~33k        | 112.7x faster |
| cron-validate | ~1286k      | 2.9x faster   |

Run benchmarks yourself: `pnpm bench:deno`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case       | cron-fast | cron-schedule | cron-parser | croner |
| --------------- | --------: | ------------: | ----------: | -----: |
| \* \* \* \* \*  |    ~1700k |       ~157k ✓ |      ~32k ✓ | ~32k ✓ |
| 0 0 1 \* \*     |    ~1224k |       ~560k ✓ |      ~19k ✓ | ~31k ✓ |
| 0 12 31 \* \*   |    ~1141k |       ~535k ✓ |       ~8k ✓ | ~29k ✓ |
| _/15 _ \* \* \* |    ~1424k |       ~288k ✓ |      ~57k ✓ | ~32k ✓ |
| 0 9 \* \* \*    |    ~1367k |       ~374k ✓ |      ~45k ✓ | ~32k ✓ |
| 0 9 15 \* 1     |     ~719k |       ~508k ✓ |      ~39k ✓ | ~30k ✓ |
| 0 9 \* \* 1-5   |    ~1297k |       ~326k ✓ |      ~47k ✓ | ~29k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case       |           cron-fast |       cron-schedule |             cron-parser |                croner |
| --------------- | ------------------: | ------------------: | ----------------------: | --------------------: |
| \* \* \* \* \*  |     588 ns / 670 ns | 6,359 ns / 7,344 ns |   31,732 ns / 71,000 ns | 31,707 ns / 87,792 ns |
| 0 0 1 \* \*     |     817 ns / 900 ns | 1,786 ns / 1,985 ns |   52,863 ns / 83,833 ns | 32,181 ns / 57,750 ns |
| 0 12 31 \* \*   |     877 ns / 902 ns | 1,870 ns / 1,962 ns | 132,279 ns / 253,875 ns | 33,901 ns / 59,709 ns |
| _/15 _ \* \* \* |     702 ns / 773 ns | 3,476 ns / 3,579 ns |   17,603 ns / 25,625 ns | 31,199 ns / 46,458 ns |
| 0 9 \* \* \*    |     731 ns / 782 ns | 2,674 ns / 2,725 ns |   22,053 ns / 31,625 ns | 31,444 ns / 46,375 ns |
| 0 9 15 \* 1     | 1,392 ns / 1,421 ns | 1,969 ns / 2,045 ns |   25,754 ns / 40,333 ns | 33,367 ns / 47,667 ns |
| 0 9 \* \* 1-5   |     771 ns / 793 ns | 3,067 ns / 3,144 ns |   21,343 ns / 32,083 ns | 34,758 ns / 51,125 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case      | cron-fast | cron-schedule | cron-parser | croner |
| -------------- | --------: | ------------: | ----------: | -----: |
| \* \* \* \* \* |      ~33k |        ~24k ✓ |       ~1k ✓ |  ~3k ✓ |
| 0 9 \* \* 1-5  |      ~15k |        ~12k ✓ |       ~0k ✓ |  ~1k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case      |             cron-fast |          cron-schedule |                 cron-parser |                      croner |
| -------------- | --------------------: | ---------------------: | --------------------------: | --------------------------: |
| \* \* \* \* \* | 30,296 ns / 41,583 ns |  41,943 ns / 75,458 ns |     707,373 ns / 861,917 ns |     287,950 ns / 385,250 ns |
| 0 9 \* \* 1-5  | 68,109 ns / 96,708 ns | 84,312 ns / 110,791 ns | 2,119,692 ns / 2,392,625 ns | 1,066,083 ns / 1,247,166 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case       | cron-fast | cron-schedule | cron-parser | croner |
| --------------- | --------: | ------------: | ----------: | -----: |
| \* \* \* \* \*  |    ~1698k |       ~193k ✓ |      ~37k ✓ | ~32k ✓ |
| 0 0 1 \* \*     |    ~1393k |       ~597k ✓ |       ~9k ✓ | ~31k ✓ |
| 0 12 31 \* \*   |    ~1111k |       ~496k ✓ |       ~8k ✓ | ~30k ✓ |
| _/15 _ \* \* \* |    ~1373k |       ~288k ✓ |      ~57k ✓ | ~31k ✓ |
| 0 9 \* \* \*    |    ~1403k |       ~394k ✓ |      ~51k ✓ | ~30k ✓ |
| 0 9 15 \* 1     |    ~1547k |       ~612k ✓ |      ~68k ✓ | ~30k ✓ |
| 0 9 \* \* 1-5   |    ~1394k |       ~369k ✓ |      ~52k ✓ | ~29k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case       |       cron-fast |       cron-schedule |             cron-parser |                croner |
| --------------- | --------------: | ------------------: | ----------------------: | --------------------: |
| \* \* \* \* \*  | 589 ns / 619 ns | 5,184 ns / 5,691 ns |   27,376 ns / 34,542 ns | 31,446 ns / 43,250 ns |
| 0 0 1 \* \*     | 718 ns / 739 ns | 1,675 ns / 1,768 ns | 114,730 ns / 231,500 ns | 32,597 ns / 49,084 ns |
| 0 12 31 \* \*   | 900 ns / 923 ns | 2,016 ns / 2,105 ns | 122,627 ns / 247,959 ns | 33,302 ns / 68,125 ns |
| _/15 _ \* \* \* | 728 ns / 770 ns | 3,476 ns / 3,553 ns |   17,416 ns / 27,333 ns | 32,173 ns / 58,375 ns |
| 0 9 \* \* \*    | 713 ns / 760 ns | 2,535 ns / 2,577 ns |   19,488 ns / 29,791 ns | 33,153 ns / 63,167 ns |
| 0 9 15 \* 1     | 647 ns / 673 ns | 1,633 ns / 1,690 ns |   14,628 ns / 21,750 ns | 33,227 ns / 56,667 ns |
| 0 9 \* \* 1-5   | 717 ns / 738 ns | 2,710 ns / 2,748 ns |   19,203 ns / 31,125 ns | 34,110 ns / 55,334 ns |

### Validation - Throughput (ops/sec)

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |    ~2864k |       ~209k ✓ |      ~46k ✓ | ~33k ✓ |      ~1229k ✓ |
| 0 0 1 \* \*     |    ~4115k |       ~749k ✓ |     ~139k ✓ | ~32k ✓ |      ~1349k ✓ |
| 0 12 31 \* \*   |    ~4103k |       ~755k ✓ |     ~137k ✓ | ~33k ✓ |      ~1320k ✓ |
| _/15 _ \* \* \* |    ~3373k |       ~325k ✓ |      ~69k ✓ | ~33k ✓ |      ~1180k ✓ |
| 0 9 \* \* \*    |    ~3818k |       ~459k ✓ |      ~91k ✓ | ~33k ✓ |      ~1304k ✓ |
| 0 9 15 \* 1     |    ~4001k |       ~881k ✓ |     ~159k ✓ | ~33k ✓ |      ~1348k ✓ |
| 0 9 \* \* 1-5   |    ~3341k |       ~457k ✓ |      ~94k ✓ | ~32k ✓ |      ~1244k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case       |       cron-fast |       cron-schedule |           cron-parser |                croner |     cron-validate |
| --------------- | --------------: | ------------------: | --------------------: | --------------------: | ----------------: |
| \* \* \* \* \*  | 349 ns / 372 ns | 4,789 ns / 4,873 ns | 21,859 ns / 32,459 ns | 30,729 ns / 49,708 ns | 813 ns / 1,031 ns |
| 0 0 1 \* \*     | 243 ns / 264 ns | 1,336 ns / 1,682 ns |   7,190 ns / 7,459 ns | 30,943 ns / 55,667 ns |   741 ns / 763 ns |
| 0 12 31 \* \*   | 244 ns / 264 ns | 1,324 ns / 1,381 ns |   7,295 ns / 7,368 ns | 30,150 ns / 43,833 ns |   757 ns / 807 ns |
| _/15 _ \* \* \* | 296 ns / 314 ns | 3,076 ns / 3,158 ns | 14,434 ns / 22,209 ns | 30,394 ns / 45,541 ns |   847 ns / 862 ns |
| 0 9 \* \* \*    | 262 ns / 284 ns | 2,181 ns / 2,238 ns | 10,942 ns / 13,917 ns | 30,695 ns / 47,292 ns |   767 ns / 794 ns |
| 0 9 15 \* 1     | 250 ns / 269 ns | 1,136 ns / 1,191 ns |   6,291 ns / 6,351 ns | 30,620 ns / 46,167 ns |   742 ns / 772 ns |
| 0 9 \* \* 1-5   | 299 ns / 373 ns | 2,187 ns / 2,221 ns | 10,634 ns / 16,542 ns | 31,608 ns / 49,958 ns |   804 ns / 827 ns |

### Parsing - Throughput (ops/sec)

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |    ~2857k |       ~209k ✓ |      ~46k ✓ | ~32k ✓ |      ~1241k ✓ |
| 0 0 1 \* \*     |    ~4147k |       ~759k ✓ |     ~140k ✓ | ~33k ✓ |      ~1327k ✓ |
| 0 12 31 \* \*   |    ~4110k |       ~757k ✓ |     ~137k ✓ | ~33k ✓ |      ~1334k ✓ |
| _/15 _ \* \* \* |    ~3361k |       ~319k ✓ |      ~68k ✓ | ~32k ✓ |      ~1190k ✓ |
| 0 9 \* \* \*    |    ~3852k |       ~457k ✓ |      ~93k ✓ | ~33k ✓ |      ~1325k ✓ |
| 0 9 15 \* 1     |    ~4084k |       ~905k ✓ |     ~160k ✓ | ~33k ✓ |      ~1345k ✓ |
| 0 9 \* \* 1-5   |    ~3319k |       ~449k ✓ |      ~95k ✓ | ~32k ✓ |      ~1237k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case       |       cron-fast |       cron-schedule |           cron-parser |                croner |   cron-validate |
| --------------- | --------------: | ------------------: | --------------------: | --------------------: | --------------: |
| \* \* \* \* \*  | 350 ns / 374 ns | 4,785 ns / 5,060 ns | 21,792 ns / 34,083 ns | 30,803 ns / 52,958 ns | 806 ns / 846 ns |
| 0 0 1 \* \*     | 241 ns / 260 ns | 1,317 ns / 1,352 ns |   7,161 ns / 7,282 ns | 30,347 ns / 46,125 ns | 753 ns / 775 ns |
| 0 12 31 \* \*   | 243 ns / 261 ns | 1,320 ns / 1,365 ns |   7,290 ns / 7,379 ns | 30,249 ns / 43,875 ns | 750 ns / 772 ns |
| _/15 _ \* \* \* | 298 ns / 318 ns | 3,136 ns / 4,068 ns | 14,701 ns / 26,208 ns | 31,122 ns / 53,750 ns | 840 ns / 866 ns |
| 0 9 \* \* \*    | 260 ns / 282 ns | 2,189 ns / 2,247 ns | 10,810 ns / 14,583 ns | 30,659 ns / 46,959 ns | 755 ns / 771 ns |
| 0 9 15 \* 1     | 245 ns / 263 ns | 1,105 ns / 1,139 ns |   6,255 ns / 6,294 ns | 30,524 ns / 46,833 ns | 744 ns / 767 ns |
| 0 9 \* \* 1-5   | 301 ns / 326 ns | 2,228 ns / 2,316 ns | 10,474 ns / 13,541 ns | 30,937 ns / 46,417 ns | 808 ns / 835 ns |

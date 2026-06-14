# Benchmark

> Tested with deno v2.8.3, cron-fast v3.1.2, croner v10.0.1, cron-parser v5.5.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by Deno.bench().

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~887k       | baseline     |
| cron-schedule | ~404k       | 2.2x faster  |
| cron-parser   | ~35k        | 25.3x faster |
| croner        | ~32k        | 28.1x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~998k       | baseline     |
| cron-schedule | ~434k       | 2.3x faster  |
| cron-parser   | ~40k        | 24.7x faster |
| croner        | ~31k        | 31.8x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2216k      | baseline     |
| cron-schedule | ~565k       | 3.9x faster  |
| cron-parser   | ~106k       | 20.9x faster |
| croner        | ~33k        | 66.6x faster |
| cron-validate | ~1309k      | 1.7x faster  |

### Parsing

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~2237k      | baseline     |
| cron-schedule | ~566k       | 3.9x faster  |
| cron-parser   | ~107k       | 21.0x faster |
| croner        | ~33k        | 66.8x faster |
| cron-validate | ~1271k      | 1.8x faster  |

Run benchmarks yourself: `pnpm bench:deno`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case       | cron-fast | cron-schedule | cron-parser | croner |
| --------------- | --------: | ------------: | ----------: | -----: |
| \* \* \* \* \*  |    ~1468k |       ~160k ✓ |      ~31k ✓ | ~33k ✓ |
| 0 0 1 \* \*     |     ~789k |       ~577k ✓ |      ~19k ✓ | ~32k ✓ |
| 0 12 31 \* \*   |     ~706k |       ~553k ✓ |       ~8k ✓ | ~30k ✓ |
| _/15 _ \* \* \* |     ~979k |       ~294k ✓ |      ~57k ✓ | ~33k ✓ |
| 0 9 \* \* \*    |     ~965k |       ~385k ✓ |      ~44k ✓ | ~32k ✓ |
| 0 9 15 \* 1     |     ~451k |       ~525k ✗ |      ~40k ✓ | ~30k ✓ |
| 0 9 \* \* 1-5   |     ~851k |       ~336k ✓ |      ~46k ✓ | ~30k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case       |           cron-fast |       cron-schedule |             cron-parser |                croner |
| --------------- | ------------------: | ------------------: | ----------------------: | --------------------: |
| \* \* \* \* \*  |     681 ns / 912 ns | 6,261 ns / 7,282 ns |   31,952 ns / 60,375 ns | 30,075 ns / 70,625 ns |
| 0 0 1 \* \*     | 1,267 ns / 1,495 ns | 1,734 ns / 1,928 ns |   53,022 ns / 79,416 ns | 30,970 ns / 41,167 ns |
| 0 12 31 \* \*   | 1,416 ns / 1,621 ns | 1,808 ns / 1,856 ns | 131,602 ns / 243,875 ns | 32,823 ns / 40,542 ns |
| _/15 _ \* \* \* | 1,021 ns / 1,069 ns | 3,404 ns / 3,487 ns |   17,578 ns / 23,167 ns | 30,681 ns / 39,083 ns |
| 0 9 \* \* \*    | 1,036 ns / 1,074 ns | 2,596 ns / 2,615 ns |   22,513 ns / 31,250 ns | 31,070 ns / 39,541 ns |
| 0 9 15 \* 1     | 2,217 ns / 2,269 ns | 1,903 ns / 1,954 ns |   25,256 ns / 32,583 ns | 32,838 ns / 46,375 ns |
| 0 9 \* \* 1-5   | 1,176 ns / 1,374 ns | 2,977 ns / 3,050 ns |   21,516 ns / 28,750 ns | 33,775 ns / 41,875 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case       | cron-fast | cron-schedule | cron-parser | croner |
| --------------- | --------: | ------------: | ----------: | -----: |
| \* \* \* \* \*  |    ~1480k |       ~195k ✓ |      ~36k ✓ | ~32k ✓ |
| 0 0 1 \* \*     |     ~957k |       ~615k ✓ |       ~9k ✓ | ~31k ✓ |
| 0 12 31 \* \*   |     ~702k |       ~519k ✓ |       ~9k ✓ | ~31k ✓ |
| _/15 _ \* \* \* |     ~953k |       ~293k ✓ |      ~58k ✓ | ~32k ✓ |
| 0 9 \* \* \*    |    ~1004k |       ~400k ✓ |      ~50k ✓ | ~31k ✓ |
| 0 9 15 \* 1     |     ~987k |       ~637k ✓ |      ~68k ✓ | ~32k ✓ |
| 0 9 \* \* 1-5   |     ~900k |       ~380k ✓ |      ~52k ✓ | ~30k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case       |           cron-fast |       cron-schedule |             cron-parser |                croner |
| --------------- | ------------------: | ------------------: | ----------------------: | --------------------: |
| \* \* \* \* \*  |     675 ns / 700 ns | 5,115 ns / 5,506 ns |   27,603 ns / 34,583 ns | 31,494 ns / 42,583 ns |
| 0 0 1 \* \*     | 1,045 ns / 1,071 ns | 1,626 ns / 1,699 ns | 108,591 ns / 214,917 ns | 32,165 ns / 42,292 ns |
| 0 12 31 \* \*   | 1,425 ns / 1,466 ns | 1,928 ns / 1,978 ns | 114,229 ns / 221,291 ns | 32,257 ns / 41,334 ns |
| _/15 _ \* \* \* | 1,049 ns / 1,114 ns | 3,411 ns / 3,472 ns |   17,232 ns / 22,542 ns | 30,896 ns / 42,750 ns |
| 0 9 \* \* \*    |   996 ns / 1,028 ns | 2,500 ns / 2,562 ns |   19,880 ns / 28,666 ns | 31,837 ns / 41,334 ns |
| 0 9 15 \* 1     | 1,013 ns / 1,062 ns | 1,569 ns / 1,605 ns |   14,769 ns / 20,541 ns | 31,399 ns / 39,541 ns |
| 0 9 \* \* 1-5   | 1,111 ns / 1,138 ns | 2,629 ns / 2,706 ns |   19,124 ns / 26,541 ns | 33,518 ns / 41,958 ns |

### Validation - Throughput (ops/sec)

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |    ~2348k |       ~216k ✓ |      ~47k ✓ | ~33k ✓ |      ~1267k ✓ |
| 0 0 1 \* \*     |    ~2412k |       ~781k ✓ |     ~139k ✓ | ~34k ✓ |      ~1384k ✓ |
| 0 12 31 \* \*   |    ~2193k |       ~781k ✓ |     ~138k ✓ | ~33k ✓ |      ~1371k ✓ |
| _/15 _ \* \* \* |    ~2127k |       ~331k ✓ |      ~69k ✓ | ~34k ✓ |      ~1205k ✓ |
| 0 9 \* \* \*    |    ~2468k |       ~462k ✓ |      ~93k ✓ | ~34k ✓ |      ~1328k ✓ |
| 0 9 15 \* 1     |    ~2146k |       ~921k ✓ |     ~161k ✓ | ~33k ✓ |      ~1376k ✓ |
| 0 9 \* \* 1-5   |    ~1820k |       ~466k ✓ |      ~96k ✓ | ~32k ✓ |      ~1232k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case       |       cron-fast |       cron-schedule |           cron-parser |                croner |   cron-validate |
| --------------- | --------------: | ------------------: | --------------------: | --------------------: | --------------: |
| \* \* \* \* \*  | 426 ns / 450 ns | 4,626 ns / 4,723 ns | 21,380 ns / 27,542 ns | 30,036 ns / 45,125 ns | 789 ns / 873 ns |
| 0 0 1 \* \*     | 415 ns / 440 ns | 1,280 ns / 1,320 ns |   7,187 ns / 7,412 ns | 29,621 ns / 37,666 ns | 723 ns / 749 ns |
| 0 12 31 \* \*   | 456 ns / 466 ns | 1,281 ns / 1,339 ns |   7,234 ns / 7,312 ns | 30,140 ns / 39,208 ns | 729 ns / 794 ns |
| _/15 _ \* \* \* | 470 ns / 492 ns | 3,021 ns / 3,071 ns | 14,571 ns / 20,416 ns | 29,561 ns / 35,875 ns | 830 ns / 852 ns |
| 0 9 \* \* \*    | 405 ns / 423 ns | 2,163 ns / 2,232 ns | 10,709 ns / 13,458 ns | 29,803 ns / 38,042 ns | 753 ns / 794 ns |
| 0 9 15 \* 1     | 466 ns / 488 ns | 1,086 ns / 1,146 ns |   6,228 ns / 6,373 ns | 30,137 ns / 38,791 ns | 727 ns / 756 ns |
| 0 9 \* \* 1-5   | 549 ns / 566 ns | 2,147 ns / 2,200 ns | 10,455 ns / 14,917 ns | 31,005 ns / 42,583 ns | 812 ns / 835 ns |

### Parsing - Throughput (ops/sec)

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |    ~2373k |       ~216k ✓ |      ~47k ✓ | ~34k ✓ |      ~1241k ✓ |
| 0 0 1 \* \*     |    ~2437k |       ~781k ✓ |     ~141k ✓ | ~33k ✓ |      ~1316k ✓ |
| 0 12 31 \* \*   |    ~2184k |       ~784k ✓ |     ~138k ✓ | ~34k ✓ |      ~1322k ✓ |
| _/15 _ \* \* \* |    ~2152k |       ~332k ✓ |      ~70k ✓ | ~33k ✓ |      ~1148k ✓ |
| 0 9 \* \* \*    |    ~2507k |       ~469k ✓ |      ~93k ✓ | ~34k ✓ |      ~1314k ✓ |
| 0 9 15 \* 1     |    ~2168k |       ~920k ✓ |     ~161k ✓ | ~33k ✓ |      ~1322k ✓ |
| 0 9 \* \* 1-5   |    ~1837k |       ~464k ✓ |      ~97k ✓ | ~33k ✓ |      ~1230k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case       |       cron-fast |       cron-schedule |           cron-parser |                croner |   cron-validate |
| --------------- | --------------: | ------------------: | --------------------: | --------------------: | --------------: |
| \* \* \* \* \*  | 421 ns / 444 ns | 4,630 ns / 4,728 ns | 21,441 ns / 30,083 ns | 29,760 ns / 39,083 ns | 806 ns / 829 ns |
| 0 0 1 \* \*     | 410 ns / 433 ns | 1,281 ns / 1,312 ns |   7,086 ns / 7,185 ns | 29,934 ns / 39,084 ns | 760 ns / 786 ns |
| 0 12 31 \* \*   | 458 ns / 481 ns | 1,276 ns / 1,299 ns |   7,252 ns / 7,402 ns | 29,284 ns / 36,667 ns | 756 ns / 771 ns |
| _/15 _ \* \* \* | 465 ns / 480 ns | 3,014 ns / 3,054 ns | 14,200 ns / 18,792 ns | 29,932 ns / 38,542 ns | 871 ns / 898 ns |
| 0 9 \* \* \*    | 399 ns / 423 ns | 2,132 ns / 2,163 ns | 10,776 ns / 14,667 ns | 29,745 ns / 38,459 ns | 761 ns / 776 ns |
| 0 9 15 \* 1     | 461 ns / 472 ns | 1,087 ns / 1,123 ns |   6,224 ns / 6,287 ns | 30,190 ns / 40,125 ns | 756 ns / 777 ns |
| 0 9 \* \* 1-5   | 544 ns / 557 ns | 2,153 ns / 2,213 ns | 10,350 ns / 13,041 ns | 30,230 ns / 40,416 ns | 813 ns / 829 ns |

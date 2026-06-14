# Benchmark

> Tested with bun v1.3.14, cron-fast v3.1.2, croner v10.0.1, cron-parser v5.5.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by mitata.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~688k       | baseline     |
| cron-schedule | ~317k       | 2.2x faster  |
| cron-parser   | ~37k        | 18.5x faster |
| croner        | ~60k        | 11.5x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~962k       | baseline     |
| cron-schedule | ~332k       | 2.9x faster  |
| cron-parser   | ~41k        | 23.6x faster |
| croner        | ~62k        | 15.5x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1609k      | baseline     |
| cron-schedule | ~358k       | 4.5x faster  |
| cron-parser   | ~124k       | 13.0x faster |
| croner        | ~65k        | 24.6x faster |
| cron-validate | ~910k       | 1.8x faster  |

### Parsing

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1488k      | baseline     |
| cron-schedule | ~358k       | 4.2x faster  |
| cron-parser   | ~124k       | 12.0x faster |
| croner        | ~65k        | 22.8x faster |
| cron-validate | ~916k       | 1.6x faster  |

Run benchmarks yourself: `pnpm bench:bun`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case       | cron-fast | cron-schedule | cron-parser | croner |
| --------------- | --------: | ------------: | ----------: | -----: |
| \* \* \* \* \*  |     ~967k |       ~143k ✓ |      ~34k ✓ | ~60k ✓ |
| 0 0 1 \* \*     |     ~663k |       ~417k ✓ |      ~21k ✓ | ~63k ✓ |
| 0 12 31 \* \*   |     ~589k |       ~425k ✓ |       ~9k ✓ | ~59k ✓ |
| _/15 _ \* \* \* |     ~665k |       ~209k ✓ |      ~62k ✓ | ~63k ✓ |
| 0 9 \* \* \*    |     ~663k |       ~286k ✓ |      ~46k ✓ | ~64k ✓ |
| 0 9 15 \* 1     |     ~530k |       ~474k ✓ |      ~41k ✓ | ~56k ✓ |
| 0 9 \* \* 1-5   |     ~741k |       ~267k ✓ |      ~46k ✓ | ~54k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case       |           cron-fast |        cron-schedule |             cron-parser |                croner |
| --------------- | ------------------: | -------------------: | ----------------------: | --------------------: |
| \* \* \* \* \*  | 1,034 ns / 4,083 ns | 6,983 ns / 10,167 ns |   29,091 ns / 47,500 ns | 16,604 ns / 32,625 ns |
| 0 0 1 \* \*     | 1,508 ns / 1,764 ns |  2,396 ns / 2,640 ns |   46,961 ns / 66,375 ns | 15,913 ns / 16,523 ns |
| 0 12 31 \* \*   | 1,699 ns / 1,951 ns |  2,356 ns / 2,435 ns | 112,016 ns / 173,041 ns | 16,985 ns / 17,562 ns |
| _/15 _ \* \* \* | 1,503 ns / 2,336 ns |  4,774 ns / 5,035 ns |   16,148 ns / 16,535 ns | 15,835 ns / 16,237 ns |
| 0 9 \* \* \*    | 1,509 ns / 1,946 ns |  3,502 ns / 3,637 ns |   21,752 ns / 22,273 ns | 15,513 ns / 16,118 ns |
| 0 9 15 \* 1     | 1,885 ns / 2,149 ns |  2,111 ns / 2,283 ns |   24,252 ns / 24,252 ns | 17,908 ns / 18,165 ns |
| 0 9 \* \* 1-5   | 1,349 ns / 1,618 ns |  3,746 ns / 3,933 ns |   21,602 ns / 22,329 ns | 18,537 ns / 18,613 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case       | cron-fast | cron-schedule | cron-parser | croner |
| --------------- | --------: | ------------: | ----------: | -----: |
| \* \* \* \* \*  |     ~998k |       ~151k ✓ |      ~37k ✓ | ~62k ✓ |
| 0 0 1 \* \*     |    ~1175k |       ~438k ✓ |      ~11k ✓ | ~62k ✓ |
| 0 12 31 \* \*   |     ~930k |       ~428k ✓ |      ~11k ✓ | ~62k ✓ |
| _/15 _ \* \* \* |     ~692k |       ~216k ✓ |      ~61k ✓ | ~65k ✓ |
| 0 9 \* \* \*    |    ~1021k |       ~294k ✓ |      ~50k ✓ | ~64k ✓ |
| 0 9 15 \* 1     |    ~1146k |       ~514k ✓ |      ~63k ✓ | ~63k ✓ |
| 0 9 \* \* 1-5   |     ~770k |       ~281k ✓ |      ~52k ✓ | ~58k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case       |           cron-fast |       cron-schedule |            cron-parser |                croner |
| --------------- | ------------------: | ------------------: | ---------------------: | --------------------: |
| \* \* \* \* \*  | 1,002 ns / 1,110 ns | 6,614 ns / 6,939 ns |  26,813 ns / 28,089 ns | 16,164 ns / 16,352 ns |
| 0 0 1 \* \*     |     851 ns / 956 ns | 2,284 ns / 2,398 ns | 94,288 ns / 125,791 ns | 16,140 ns / 16,606 ns |
| 0 12 31 \* \*   | 1,075 ns / 1,182 ns | 2,337 ns / 2,448 ns | 94,316 ns / 121,417 ns | 16,189 ns / 16,160 ns |
| _/15 _ \* \* \* | 1,446 ns / 2,329 ns | 4,638 ns / 4,796 ns |  16,302 ns / 17,370 ns | 15,468 ns / 15,533 ns |
| 0 9 \* \* \*    |   979 ns / 1,102 ns | 3,402 ns / 3,529 ns |  19,881 ns / 21,476 ns | 15,679 ns / 16,355 ns |
| 0 9 15 \* 1     |     872 ns / 982 ns | 1,945 ns / 2,053 ns |  15,824 ns / 17,436 ns | 15,910 ns / 16,755 ns |
| 0 9 \* \* 1-5   | 1,299 ns / 1,407 ns | 3,560 ns / 3,676 ns |  19,347 ns / 20,876 ns | 17,277 ns / 17,653 ns |

### Validation - Throughput (ops/sec)

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |    ~1431k |       ~159k ✓ |      ~50k ✓ | ~65k ✓ |       ~808k ✓ |
| 0 0 1 \* \*     |    ~2008k |       ~474k ✓ |     ~162k ✓ | ~68k ✓ |       ~964k ✓ |
| 0 12 31 \* \*   |    ~1943k |       ~461k ✓ |     ~164k ✓ | ~65k ✓ |       ~855k ✓ |
| _/15 _ \* \* \* |     ~987k |       ~225k ✓ |      ~86k ✓ | ~65k ✓ |         ~989k |
| 0 9 \* \* \*    |    ~1831k |       ~298k ✓ |     ~109k ✓ | ~65k ✓ |       ~943k ✓ |
| 0 9 15 \* 1     |    ~1899k |       ~587k ✓ |     ~186k ✓ | ~66k ✓ |       ~874k ✓ |
| 0 9 \* \* 1-5   |    ~1165k |       ~300k ✓ |     ~112k ✓ | ~64k ✓ |       ~940k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case       |           cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| --------------- | ------------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| \* \* \* \* \*  |     699 ns / 801 ns | 6,278 ns / 6,400 ns | 19,821 ns / 20,662 ns | 15,418 ns / 15,791 ns | 1,238 ns / 3,208 ns |
| 0 0 1 \* \*     |     498 ns / 622 ns | 2,110 ns / 2,224 ns |   6,177 ns / 6,307 ns | 14,629 ns / 14,629 ns | 1,037 ns / 1,146 ns |
| 0 12 31 \* \*   |     515 ns / 640 ns | 2,168 ns / 3,221 ns |   6,091 ns / 6,247 ns | 15,417 ns / 15,621 ns | 1,170 ns / 1,271 ns |
| _/15 _ \* \* \* | 1,014 ns / 1,960 ns | 4,448 ns / 4,584 ns | 11,662 ns / 11,725 ns | 15,346 ns / 15,590 ns | 1,011 ns / 1,119 ns |
| 0 9 \* \* \*    |     546 ns / 709 ns | 3,357 ns / 3,473 ns |   9,159 ns / 9,259 ns | 15,289 ns / 15,496 ns | 1,061 ns / 1,163 ns |
| 0 9 15 \* 1     |     527 ns / 646 ns | 1,704 ns / 1,831 ns |   5,376 ns / 5,586 ns | 15,196 ns / 15,691 ns | 1,144 ns / 1,246 ns |
| 0 9 \* \* 1-5   |   858 ns / 1,049 ns | 3,332 ns / 3,474 ns |   8,912 ns / 8,962 ns | 15,696 ns / 16,030 ns | 1,064 ns / 1,160 ns |

### Parsing - Throughput (ops/sec)

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |    ~1370k |       ~159k ✓ |      ~50k ✓ | ~67k ✓ |       ~926k ✓ |
| 0 0 1 \* \*     |    ~1955k |       ~473k ✓ |     ~165k ✓ | ~62k ✓ |       ~969k ✓ |
| 0 12 31 \* \*   |    ~1895k |       ~466k ✓ |     ~164k ✓ | ~65k ✓ |       ~846k ✓ |
| _/15 _ \* \* \* |     ~865k |       ~221k ✓ |      ~83k ✓ | ~65k ✓ |       ~965k ✗ |
| 0 9 \* \* \*    |    ~1660k |       ~306k ✓ |     ~108k ✓ | ~66k ✓ |       ~898k ✓ |
| 0 9 15 \* 1     |    ~1627k |       ~582k ✓ |     ~185k ✓ | ~66k ✓ |       ~861k ✓ |
| 0 9 \* \* 1-5   |    ~1042k |       ~302k ✓ |     ~113k ✓ | ~65k ✓ |       ~944k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case       |           cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| --------------- | ------------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| \* \* \* \* \*  |     730 ns / 966 ns | 6,300 ns / 6,399 ns | 19,824 ns / 20,918 ns | 14,818 ns / 15,559 ns | 1,080 ns / 1,121 ns |
| 0 0 1 \* \*     |     512 ns / 658 ns | 2,113 ns / 2,247 ns |   6,047 ns / 6,130 ns | 16,252 ns / 22,018 ns | 1,032 ns / 1,098 ns |
| 0 12 31 \* \*   |     528 ns / 717 ns | 2,147 ns / 2,256 ns |   6,089 ns / 6,185 ns | 15,391 ns / 15,718 ns | 1,181 ns / 1,269 ns |
| _/15 _ \* \* \* | 1,157 ns / 1,971 ns | 4,529 ns / 4,627 ns | 11,976 ns / 12,051 ns | 15,343 ns / 15,856 ns | 1,036 ns / 1,112 ns |
| 0 9 \* \* \*    |     602 ns / 750 ns | 3,270 ns / 3,401 ns |   9,279 ns / 9,495 ns | 15,049 ns / 15,361 ns | 1,114 ns / 1,211 ns |
| 0 9 15 \* 1     |     614 ns / 761 ns | 1,718 ns / 1,853 ns |   5,407 ns / 5,565 ns | 15,150 ns / 15,801 ns | 1,161 ns / 1,231 ns |
| 0 9 \* \* 1-5   |   959 ns / 1,142 ns | 3,310 ns / 3,428 ns |   8,883 ns / 9,016 ns | 15,439 ns / 15,720 ns | 1,060 ns / 1,105 ns |

# Benchmark

> Tested with bun v1.3.14, cron-fast v3.9.0, croner v10.0.1, cron-parser v5.10.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by mitata.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~3247k      | baseline     |
| cron-schedule | ~323k       | 10.0x faster |
| cron-parser   | ~40k        | 80.6x faster |
| croner        | ~58k        | 56.1x faster |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~63k        | baseline     |
| cron-schedule | ~24k        | 2.6x faster  |
| cron-parser   | ~1k         | 52.5x faster |
| croner        | ~6k         | 10.4x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~3399k      | baseline     |
| cron-schedule | ~336k       | 10.1x faster |
| cron-parser   | ~48k        | 71.3x faster |
| croner        | ~59k        | 58.0x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~10927k     | baseline      |
| cron-schedule | ~366k       | 29.8x faster  |
| cron-parser   | ~135k       | 80.8x faster  |
| croner        | ~63k        | 174.0x faster |
| cron-validate | ~1003k      | 10.9x faster  |

### Validation Varied Inputs

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~12719k     | baseline      |
| cron-schedule | ~361k       | 35.2x faster  |
| cron-parser   | ~152k       | 83.6x faster  |
| croner        | ~63k        | 201.9x faster |
| cron-validate | ~794k       | 16.0x faster  |

### Parsing

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~10525k     | baseline      |
| cron-schedule | ~365k       | 28.9x faster  |
| cron-parser   | ~136k       | 77.3x faster  |
| croner        | ~62k        | 169.5x faster |
| cron-validate | ~998k       | 10.6x faster  |

Run benchmarks yourself: `pnpm bench:bun`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner |
| ------------ | --------: | ------------: | ----------: | -----: |
| * * * * *    |    ~5062k |       ~149k ✓ |      ~29k ✓ | ~62k ✓ |
| 0 0 1 * *    |    ~4357k |       ~432k ✓ |      ~21k ✓ | ~60k ✓ |
| 0 12 31 * *  |    ~4221k |       ~422k ✓ |       ~8k ✓ | ~52k ✓ |
| */15 * * * * |    ~2776k |       ~215k ✓ |      ~72k ✓ | ~63k ✓ |
| 0 9 * * *    |    ~2924k |       ~284k ✓ |      ~50k ✓ | ~62k ✓ |
| 0 9 15 * 1   |    ~1596k |       ~490k ✓ |      ~48k ✓ | ~56k ✓ |
| 0 9 * * 1-5  |    ~1792k |       ~271k ✓ |      ~53k ✓ | ~50k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case    |         cron-fast |       cron-schedule |             cron-parser |                croner |
| ------------ | ----------------: | ------------------: | ----------------------: | --------------------: |
| * * * * *    | 198 ns / 1,166 ns | 6,696 ns / 8,959 ns |   34,041 ns / 87,667 ns | 16,224 ns / 27,625 ns |
| 0 0 1 * *    |   230 ns / 333 ns | 2,314 ns / 2,559 ns |   47,478 ns / 66,917 ns | 16,626 ns / 17,436 ns |
| 0 12 31 * *  |   237 ns / 343 ns | 2,367 ns / 2,538 ns | 121,989 ns / 199,708 ns | 19,128 ns / 20,052 ns |
| */15 * * * * |   360 ns / 479 ns | 4,651 ns / 4,855 ns |   13,888 ns / 13,934 ns | 15,784 ns / 16,764 ns |
| 0 9 * * *    |   342 ns / 440 ns | 3,519 ns / 3,690 ns |   19,853 ns / 20,719 ns | 16,230 ns / 17,352 ns |
| 0 9 15 * 1   |   627 ns / 783 ns | 2,040 ns / 2,358 ns |   21,010 ns / 21,040 ns | 17,903 ns / 18,871 ns |
| 0 9 * * 1-5  |   558 ns / 730 ns | 3,694 ns / 3,885 ns |   18,714 ns / 19,247 ns | 20,038 ns / 20,722 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case   | cron-fast | cron-schedule | cron-parser | croner |
| ----------- | --------: | ------------: | ----------: | -----: |
| * * * * *   |     ~106k |        ~29k ✓ |       ~2k ✓ | ~11k ✓ |
| 0 9 * * 1-5 |      ~21k |          ~20k |       ~1k ✓ |  ~1k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case   |             cron-fast |         cron-schedule |                 cron-parser |                  croner |
| ----------- | --------------------: | --------------------: | --------------------------: | ----------------------: |
| * * * * *   |   9,456 ns / 9,894 ns | 34,393 ns / 36,077 ns |     551,917 ns / 724,667 ns |  93,021 ns / 113,500 ns |
| 0 9 * * 1-5 | 47,169 ns / 49,539 ns | 50,616 ns / 52,521 ns | 1,646,276 ns / 2,328,083 ns | 687,626 ns / 823,500 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner |
| ------------ | --------: | ------------: | ----------: | -----: |
| * * * * *    |    ~7032k |       ~155k ✓ |      ~37k ✓ | ~56k ✓ |
| 0 0 1 * *    |    ~3409k |       ~441k ✓ |      ~12k ✓ | ~62k ✓ |
| 0 12 31 * *  |    ~3122k |       ~431k ✓ |      ~11k ✓ | ~58k ✓ |
| */15 * * * * |    ~2449k |       ~218k ✓ |      ~69k ✓ | ~63k ✓ |
| 0 9 * * *    |    ~2995k |       ~292k ✓ |      ~60k ✓ | ~57k ✓ |
| 0 9 15 * 1   |    ~2881k |       ~534k ✓ |      ~84k ✓ | ~60k ✓ |
| 0 9 * * 1-5  |    ~1903k |       ~280k ✓ |      ~61k ✓ | ~55k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |            cron-parser |                croner |
| ------------ | --------------: | ------------------: | ---------------------: | --------------------: |
| * * * * *    | 142 ns / 173 ns | 6,437 ns / 6,985 ns |  26,786 ns / 37,625 ns | 18,007 ns / 20,674 ns |
| 0 0 1 * *    | 293 ns / 397 ns | 2,270 ns / 2,480 ns | 86,766 ns / 115,542 ns | 16,008 ns / 16,318 ns |
| 0 12 31 * *  | 320 ns / 405 ns | 2,323 ns / 2,537 ns | 92,865 ns / 119,875 ns | 17,168 ns / 17,995 ns |
| */15 * * * * | 408 ns / 506 ns | 4,598 ns / 4,739 ns |  14,539 ns / 15,305 ns | 15,862 ns / 15,817 ns |
| 0 9 * * *    | 334 ns / 382 ns | 3,421 ns / 3,807 ns |  16,774 ns / 17,364 ns | 17,576 ns / 17,006 ns |
| 0 9 15 * 1   | 347 ns / 385 ns | 1,873 ns / 1,992 ns |  11,852 ns / 11,957 ns | 16,758 ns / 15,996 ns |
| 0 9 * * 1-5  | 525 ns / 582 ns | 3,573 ns / 3,768 ns |  16,295 ns / 18,144 ns | 18,314 ns / 18,612 ns |

### Validation - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| ------------ | --------: | ------------: | ----------: | -----: | ------------: |
| * * * * *    |   ~17495k |       ~163k ✓ |      ~52k ✓ | ~65k ✓ |       ~903k ✓ |
| 0 0 1 * *    |   ~12495k |       ~473k ✓ |     ~180k ✓ | ~64k ✓ |      ~1052k ✓ |
| 0 12 31 * *  |   ~12415k |       ~482k ✓ |     ~179k ✓ | ~59k ✓ |       ~956k ✓ |
| */15 * * * * |    ~5419k |       ~227k ✓ |      ~90k ✓ | ~66k ✓ |      ~1048k ✓ |
| 0 9 * * *    |   ~14966k |       ~315k ✓ |     ~114k ✓ | ~64k ✓ |      ~1060k ✓ |
| 0 9 15 * 1   |    ~9495k |       ~600k ✓ |     ~214k ✓ | ~67k ✓ |       ~926k ✓ |
| 0 9 * * 1-5  |    ~4200k |       ~304k ✓ |     ~116k ✓ | ~55k ✓ |      ~1074k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| * * * * *    |   57 ns / 83 ns | 6,143 ns / 6,284 ns | 19,065 ns / 19,192 ns | 15,388 ns / 15,468 ns | 1,108 ns / 2,167 ns |
| 0 0 1 * *    |  80 ns / 139 ns | 2,112 ns / 2,243 ns |   5,551 ns / 5,761 ns | 15,529 ns / 15,052 ns |   951 ns / 1,072 ns |
| 0 12 31 * *  |  81 ns / 116 ns | 2,073 ns / 2,217 ns |   5,575 ns / 5,728 ns | 16,984 ns / 16,414 ns | 1,045 ns / 1,153 ns |
| */15 * * * * | 185 ns / 241 ns | 4,408 ns / 4,594 ns | 11,075 ns / 11,223 ns | 15,214 ns / 15,297 ns |   954 ns / 1,082 ns |
| 0 9 * * *    |   67 ns / 97 ns | 3,173 ns / 3,285 ns |   8,760 ns / 8,877 ns | 15,685 ns / 15,855 ns |   943 ns / 1,051 ns |
| 0 9 15 * 1   | 105 ns / 148 ns | 1,667 ns / 1,792 ns |   4,663 ns / 4,836 ns | 14,873 ns / 15,603 ns | 1,080 ns / 1,229 ns |
| 0 9 * * 1-5  | 238 ns / 300 ns | 3,292 ns / 3,510 ns |   8,601 ns / 8,774 ns | 18,283 ns / 22,684 ns |   931 ns / 1,063 ns |

### Parsing - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| ------------ | --------: | ------------: | ----------: | -----: | ------------: |
| * * * * *    |   ~16232k |       ~161k ✓ |      ~53k ✓ | ~68k ✓ |       ~984k ✓ |
| 0 0 1 * *    |   ~12552k |       ~476k ✓ |     ~181k ✓ | ~58k ✓ |      ~1072k ✓ |
| 0 12 31 * *  |   ~11975k |       ~481k ✓ |     ~187k ✓ | ~62k ✓ |       ~917k ✓ |
| */15 * * * * |    ~5631k |       ~219k ✓ |      ~86k ✓ | ~59k ✓ |      ~1096k ✓ |
| 0 9 * * *    |   ~13621k |       ~308k ✓ |     ~120k ✓ | ~67k ✓ |       ~963k ✓ |
| 0 9 15 * 1   |    ~9706k |       ~606k ✓ |     ~204k ✓ | ~57k ✓ |       ~967k ✓ |
| 0 9 * * 1-5  |    ~3961k |       ~303k ✓ |     ~123k ✓ | ~63k ✓ |       ~985k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| * * * * *    |   62 ns / 89 ns | 6,220 ns / 6,381 ns | 18,875 ns / 19,027 ns | 14,679 ns / 14,467 ns | 1,016 ns / 1,184 ns |
| 0 0 1 * *    |  80 ns / 128 ns | 2,101 ns / 2,230 ns |   5,530 ns / 5,672 ns | 17,315 ns / 16,572 ns |   933 ns / 1,025 ns |
| 0 12 31 * *  |  84 ns / 117 ns | 2,080 ns / 2,223 ns |   5,362 ns / 5,486 ns | 16,035 ns / 15,487 ns | 1,091 ns / 1,203 ns |
| */15 * * * * | 178 ns / 226 ns | 4,566 ns / 4,706 ns | 11,686 ns / 12,170 ns | 17,002 ns / 16,588 ns |   912 ns / 1,005 ns |
| 0 9 * * *    |  73 ns / 122 ns | 3,250 ns / 3,474 ns |   8,318 ns / 8,422 ns | 14,915 ns / 15,284 ns | 1,039 ns / 1,167 ns |
| 0 9 15 * 1   | 103 ns / 143 ns | 1,649 ns / 1,777 ns |   4,892 ns / 5,065 ns | 17,477 ns / 20,782 ns | 1,034 ns / 1,140 ns |
| 0 9 * * 1-5  | 252 ns / 338 ns | 3,300 ns / 3,442 ns |   8,124 ns / 8,207 ns | 15,753 ns / 29,417 ns | 1,015 ns / 1,117 ns |

### Validation Varied Inputs - Throughput (ops/sec)

| Test Case | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------- | --------: | ------------: | ----------: | -----: | ------------: |
| varied    |   ~12719k |       ~361k ✓ |     ~152k ✓ | ~63k ✓ |       ~794k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation Varied Inputs - Latency (mean / p99)

| Test Case |      cron-fast |       cron-schedule |          cron-parser |                croner |       cron-validate |
| --------- | -------------: | ------------------: | -------------------: | --------------------: | ------------------: |
| varied    | 79 ns / 170 ns | 2,768 ns / 5,875 ns | 6,572 ns / 12,334 ns | 15,871 ns / 31,125 ns | 1,260 ns / 2,375 ns |

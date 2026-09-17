# Benchmark

> Tested with bun v1.4.0, cron-fast v3.12.0, croner v10.0.1, cron-parser v5.10.1, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by mitata.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~4407k      | baseline     |
| cron-schedule | ~441k       | 10.0x faster |
| cron-parser   | ~50k        | 88.0x faster |
| croner        | ~63k        | 70.4x faster |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~150k       | baseline      |
| cron-schedule | ~26k        | 5.8x faster   |
| cron-parser   | ~1k         | 115.0x faster |
| croner        | ~6k         | 24.8x faster  |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~4720k      | baseline     |
| cron-schedule | ~459k       | 10.3x faster |
| cron-parser   | ~60k        | 79.1x faster |
| croner        | ~63k        | 74.5x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~12925k     | baseline      |
| cron-schedule | ~513k       | 25.2x faster  |
| cron-parser   | ~177k       | 72.8x faster  |
| croner        | ~67k        | 194.1x faster |
| cron-validate | ~1311k      | 9.9x faster   |

### Validation Varied Inputs

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~12764k     | baseline      |
| cron-schedule | ~478k       | 26.7x faster  |
| cron-parser   | ~194k       | 65.9x faster  |
| croner        | ~67k        | 189.1x faster |
| cron-validate | ~924k       | 13.8x faster  |

### Parsing

| Library       | Avg ops/sec | vs cron-fast  |
| ------------- | ----------- | ------------- |
| **cron-fast** | ~13073k     | baseline      |
| cron-schedule | ~517k       | 25.3x faster  |
| cron-parser   | ~182k       | 71.7x faster  |
| croner        | ~65k        | 201.7x faster |
| cron-validate | ~1300k      | 10.1x faster  |

Run benchmarks yourself: `pnpm bench:bun`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner |
| ------------ | --------: | ------------: | ----------: | -----: |
| * * * * *    |    ~7586k |       ~228k ✓ |      ~42k ✓ | ~65k ✓ |
| 0 0 1 * *    |    ~4428k |       ~574k ✓ |      ~25k ✓ | ~66k ✓ |
| 0 12 31 * *  |    ~4431k |       ~583k ✓ |      ~10k ✓ | ~62k ✓ |
| */15 * * * * |    ~4399k |       ~315k ✓ |      ~87k ✓ | ~66k ✓ |
| 0 9 * * *    |    ~4334k |       ~399k ✓ |      ~67k ✓ | ~67k ✓ |
| 0 9 15 * 1   |    ~2525k |       ~621k ✓ |      ~54k ✓ | ~58k ✓ |
| 0 9 * * 1-5  |    ~3143k |       ~369k ✓ |      ~65k ✓ | ~55k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |            cron-parser |                croner |
| ------------ | --------------: | ------------------: | ---------------------: | --------------------: |
| * * * * *    | 132 ns / 218 ns | 4,383 ns / 4,699 ns |  23,655 ns / 36,125 ns | 15,312 ns / 19,333 ns |
| 0 0 1 * *    | 226 ns / 316 ns | 1,742 ns / 1,932 ns |  40,015 ns / 53,417 ns | 15,266 ns / 15,310 ns |
| 0 12 31 * *  | 226 ns / 320 ns | 1,716 ns / 1,828 ns | 97,835 ns / 124,250 ns | 16,146 ns / 16,419 ns |
| */15 * * * * | 227 ns / 326 ns | 3,171 ns / 3,355 ns |  11,525 ns / 11,640 ns | 15,064 ns / 15,308 ns |
| 0 9 * * *    | 231 ns / 326 ns | 2,504 ns / 2,690 ns |  15,036 ns / 15,140 ns | 15,006 ns / 15,248 ns |
| 0 9 15 * 1   | 396 ns / 513 ns | 1,610 ns / 1,721 ns |  18,417 ns / 18,658 ns | 17,206 ns / 18,361 ns |
| 0 9 * * 1-5  | 318 ns / 425 ns | 2,706 ns / 2,828 ns |  15,282 ns / 15,485 ns | 18,326 ns / 18,732 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case   | cron-fast | cron-schedule | cron-parser | croner |
| ----------- | --------: | ------------: | ----------: | -----: |
| * * * * *   |     ~253k |        ~32k ✓ |       ~2k ✓ | ~11k ✓ |
| 0 9 * * 1-5 |      ~47k |        ~20k ✓ |       ~1k ✓ |  ~1k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case   |             cron-fast |         cron-schedule |                 cron-parser |                  croner |
| ----------- | --------------------: | --------------------: | --------------------------: | ----------------------: |
| * * * * *   |   3,946 ns / 4,253 ns | 31,180 ns / 32,455 ns |     507,379 ns / 688,625 ns |  93,442 ns / 113,250 ns |
| 0 9 * * 1-5 | 21,285 ns / 22,805 ns | 50,980 ns / 52,028 ns | 1,561,196 ns / 2,240,125 ns | 718,434 ns / 806,209 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner |
| ------------ | --------: | ------------: | ----------: | -----: |
| * * * * *    |    ~7746k |       ~220k ✓ |      ~49k ✓ | ~66k ✓ |
| 0 0 1 * *    |    ~4475k |       ~601k ✓ |      ~13k ✓ | ~64k ✓ |
| 0 12 31 * *  |    ~4138k |       ~589k ✓ |      ~12k ✓ | ~63k ✓ |
| */15 * * * * |    ~4401k |       ~318k ✓ |      ~89k ✓ | ~64k ✓ |
| 0 9 * * *    |    ~4641k |       ~407k ✓ |      ~76k ✓ | ~65k ✓ |
| 0 9 15 * 1   |    ~4116k |       ~679k ✓ |     ~101k ✓ | ~65k ✓ |
| 0 9 * * 1-5  |    ~3524k |       ~396k ✓ |      ~78k ✓ | ~58k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |            cron-parser |                croner |
| ------------ | --------------: | ------------------: | ---------------------: | --------------------: |
| * * * * *    | 129 ns / 156 ns | 4,538 ns / 4,855 ns |  20,572 ns / 21,138 ns | 15,263 ns / 16,179 ns |
| 0 0 1 * *    | 223 ns / 302 ns | 1,664 ns / 1,795 ns | 79,938 ns / 104,333 ns | 15,698 ns / 16,294 ns |
| 0 12 31 * *  | 242 ns / 311 ns | 1,697 ns / 1,818 ns |  82,337 ns / 96,584 ns | 15,953 ns / 16,689 ns |
| */15 * * * * | 227 ns / 315 ns | 3,145 ns / 3,256 ns |  11,242 ns / 11,346 ns | 15,706 ns / 17,432 ns |
| 0 9 * * *    | 215 ns / 268 ns | 2,460 ns / 2,617 ns |  13,133 ns / 13,248 ns | 15,366 ns / 16,256 ns |
| 0 9 15 * 1   | 243 ns / 333 ns | 1,472 ns / 1,590 ns |    9,867 ns / 9,948 ns | 15,429 ns / 16,482 ns |
| 0 9 * * 1-5  | 284 ns / 373 ns | 2,523 ns / 2,656 ns |  12,848 ns / 12,892 ns | 17,166 ns / 17,826 ns |

### Validation - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| ------------ | --------: | ------------: | ----------: | -----: | ------------: |
| * * * * *    |   ~17866k |       ~238k ✓ |      ~63k ✓ | ~69k ✓ |      ~1242k ✓ |
| 0 0 1 * *    |   ~13351k |       ~673k ✓ |     ~230k ✓ | ~65k ✓ |      ~1335k ✓ |
| 0 12 31 * *  |   ~13153k |       ~677k ✓ |     ~228k ✓ | ~68k ✓ |      ~1285k ✓ |
| */15 * * * * |   ~12011k |       ~338k ✓ |     ~115k ✓ | ~67k ✓ |      ~1363k ✓ |
| 0 9 * * *    |   ~14567k |       ~440k ✓ |     ~156k ✓ | ~65k ✓ |      ~1325k ✓ |
| 0 9 15 * 1   |   ~11120k |       ~794k ✓ |     ~289k ✓ | ~65k ✓ |      ~1298k ✓ |
| 0 9 * * 1-5  |    ~8411k |       ~430k ✓ |     ~160k ✓ | ~66k ✓ |      ~1325k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |   cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | --------------: |
| * * * * *    |   56 ns / 61 ns | 4,202 ns / 4,325 ns | 15,907 ns / 16,302 ns | 14,476 ns / 15,087 ns | 805 ns / 917 ns |
| 0 0 1 * *    |   75 ns / 82 ns | 1,486 ns / 1,602 ns |   4,339 ns / 4,442 ns | 15,322 ns / 16,267 ns | 749 ns / 856 ns |
| 0 12 31 * *  |   76 ns / 83 ns | 1,477 ns / 1,597 ns |   4,387 ns / 4,558 ns | 14,684 ns / 15,970 ns | 778 ns / 888 ns |
| */15 * * * * |  83 ns / 113 ns | 2,961 ns / 3,079 ns |   8,683 ns / 8,885 ns | 14,886 ns / 15,778 ns | 733 ns / 845 ns |
| 0 9 * * *    |   69 ns / 76 ns | 2,272 ns / 2,392 ns |   6,401 ns / 6,562 ns | 15,323 ns / 16,261 ns | 755 ns / 854 ns |
| 0 9 15 * 1   |  90 ns / 102 ns | 1,260 ns / 1,368 ns |   3,457 ns / 3,581 ns | 15,312 ns / 17,091 ns | 770 ns / 881 ns |
| 0 9 * * 1-5  | 119 ns / 131 ns | 2,325 ns / 2,444 ns |   6,239 ns / 6,359 ns | 15,146 ns / 16,135 ns | 755 ns / 870 ns |

### Parsing - Throughput (ops/sec)

| Test Case    | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| ------------ | --------: | ------------: | ----------: | -----: | ------------: |
| * * * * *    |   ~18358k |       ~239k ✓ |      ~65k ✓ | ~65k ✓ |      ~1260k ✓ |
| 0 0 1 * *    |   ~12896k |       ~677k ✓ |     ~251k ✓ | ~64k ✓ |      ~1318k ✓ |
| 0 12 31 * *  |   ~13418k |       ~689k ✓ |     ~249k ✓ | ~65k ✓ |      ~1314k ✓ |
| */15 * * * * |   ~12284k |       ~340k ✓ |     ~113k ✓ | ~64k ✓ |      ~1366k ✓ |
| 0 9 * * *    |   ~15138k |       ~434k ✓ |     ~154k ✓ | ~64k ✓ |      ~1243k ✓ |
| 0 9 15 * 1   |   ~11043k |       ~801k ✓ |     ~287k ✓ | ~64k ✓ |      ~1278k ✓ |
| 0 9 * * 1-5  |    ~8371k |       ~437k ✓ |     ~157k ✓ | ~66k ✓ |      ~1322k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case    |       cron-fast |       cron-schedule |           cron-parser |                croner |   cron-validate |
| ------------ | --------------: | ------------------: | --------------------: | --------------------: | --------------: |
| * * * * *    |   54 ns / 74 ns | 4,184 ns / 4,298 ns | 15,421 ns / 16,058 ns | 15,372 ns / 16,646 ns | 794 ns / 909 ns |
| 0 0 1 * *    |   78 ns / 91 ns | 1,476 ns / 1,590 ns |   3,980 ns / 4,214 ns | 15,533 ns / 17,175 ns | 759 ns / 844 ns |
| 0 12 31 * *  |   75 ns / 85 ns | 1,452 ns / 1,575 ns |   4,012 ns / 4,232 ns | 15,327 ns / 16,757 ns | 761 ns / 856 ns |
| */15 * * * * |   81 ns / 93 ns | 2,944 ns / 3,038 ns |   8,835 ns / 8,970 ns | 15,515 ns / 16,820 ns | 732 ns / 845 ns |
| 0 9 * * *    |   66 ns / 75 ns | 2,303 ns / 2,403 ns |   6,477 ns / 7,112 ns | 15,634 ns / 17,183 ns | 805 ns / 938 ns |
| 0 9 15 * 1   |  91 ns / 128 ns | 1,249 ns / 1,370 ns |   3,481 ns / 3,657 ns | 15,555 ns / 17,774 ns | 782 ns / 893 ns |
| 0 9 * * 1-5  | 119 ns / 159 ns | 2,289 ns / 2,382 ns |   6,382 ns / 6,992 ns | 15,064 ns / 16,753 ns | 757 ns / 854 ns |

### Validation Varied Inputs - Throughput (ops/sec)

| Test Case | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------- | --------: | ------------: | ----------: | -----: | ------------: |
| varied    |   ~12764k |       ~478k ✓ |     ~194k ✓ | ~67k ✓ |       ~924k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation Varied Inputs - Latency (mean / p99)

| Test Case |      cron-fast |       cron-schedule |         cron-parser |                croner |       cron-validate |
| --------- | -------------: | ------------------: | ------------------: | --------------------: | ------------------: |
| varied    | 78 ns / 160 ns | 2,094 ns / 5,250 ns | 5,164 ns / 9,958 ns | 14,818 ns / 23,750 ns | 1,082 ns / 4,000 ns |

# Benchmark

> Tested with node v24.16.0, cron-fast v3.2.0, croner v10.0.1, cron-parser v5.5.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Powered by vitest bench (tinybench).

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~796k       | baseline     |
| cron-schedule | ~333k       | 2.4x faster  |
| cron-parser   | ~35k        | 22.7x faster |
| croner        | ~31k        | 25.5x faster |

### Next 100 Runs Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~23k        | baseline     |
| cron-schedule | ~15k        | 1.5x faster  |
| cron-parser   | ~1k         | 19.3x faster |
| croner        | ~2k         | 9.8x faster  |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~895k       | baseline     |
| cron-schedule | ~354k       | 2.5x faster  |
| cron-parser   | ~39k        | 23.0x faster |
| croner        | ~32k        | 28.1x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1786k      | baseline     |
| cron-schedule | ~459k       | 3.9x faster  |
| cron-parser   | ~97k        | 18.3x faster |
| croner        | ~34k        | 51.9x faster |
| cron-validate | ~633k       | 2.8x faster  |

### Parsing

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~1779k      | baseline     |
| cron-schedule | ~452k       | 3.9x faster  |
| cron-parser   | ~95k        | 18.7x faster |
| croner        | ~33k        | 53.4x faster |
| cron-validate | ~617k       | 2.9x faster  |

Run benchmarks yourself: `pnpm bench`

## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

| Test Case       |    cron-fast | cron-schedule |  cron-parser |       croner |
| --------------- | -----------: | ------------: | -----------: | -----------: |
| \* \* \* \* \*  | ~1361k ±1.3% | ~139k ±0.4% ✓ | ~32k ±0.4% ✓ | ~31k ±0.8% ✓ |
| 0 0 1 \* \*     |  ~702k ±0.4% | ~442k ±0.5% ✓ | ~20k ±0.4% ✓ | ~32k ±0.3% ✓ |
| 0 12 31 \* \*   |  ~643k ±0.3% | ~447k ±0.4% ✓ |  ~8k ±0.4% ✓ | ~30k ±0.4% ✓ |
| _/15 _ \* \* \* |  ~826k ±0.4% | ~255k ±0.5% ✓ | ~56k ±0.5% ✓ | ~31k ±3.8% ✓ |
| 0 9 \* \* \*    |  ~897k ±0.2% | ~328k ±0.5% ✓ | ~44k ±0.4% ✓ | ~33k ±0.4% ✓ |
| 0 9 15 \* 1     |  ~413k ±0.3% |   ~432k ±0.5% | ~39k ±0.4% ✓ | ~31k ±1.2% ✓ |
| 0 9 \* \* 1-5   |  ~728k ±0.7% | ~291k ±0.4% ✓ | ~46k ±0.4% ✓ | ~30k ±1.2% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

| Test Case       |           cron-fast |       cron-schedule |             cron-parser |                croner |
| --------------- | ------------------: | ------------------: | ----------------------: | --------------------: |
| \* \* \* \* \*  |   735 ns / 1,208 ns | 7,176 ns / 9,042 ns |   30,854 ns / 48,292 ns | 31,885 ns / 46,458 ns |
| 0 0 1 \* \*     | 1,425 ns / 1,833 ns | 2,261 ns / 3,083 ns |   50,945 ns / 58,208 ns | 30,804 ns / 36,209 ns |
| 0 12 31 \* \*   | 1,556 ns / 1,958 ns | 2,238 ns / 2,834 ns | 128,986 ns / 155,958 ns | 33,261 ns / 39,958 ns |
| _/15 _ \* \* \* | 1,211 ns / 1,708 ns | 3,919 ns / 4,708 ns |   17,799 ns / 23,916 ns | 32,086 ns / 66,916 ns |
| 0 9 \* \* \*    | 1,115 ns / 1,334 ns | 3,047 ns / 3,625 ns |   22,628 ns / 26,625 ns | 30,762 ns / 36,583 ns |
| 0 9 15 \* 1     | 2,420 ns / 2,792 ns | 2,316 ns / 2,917 ns |   25,384 ns / 30,708 ns | 32,563 ns / 38,125 ns |
| 0 9 \* \* 1-5   | 1,374 ns / 1,833 ns | 3,442 ns / 4,042 ns |   21,918 ns / 25,083 ns | 33,436 ns / 46,292 ns |

### Next 100 Runs - Throughput (ops/sec)

| Test Case      |  cron-fast | cron-schedule | cron-parser |      croner |
| -------------- | ---------: | ------------: | ----------: | ----------: |
| \* \* \* \* \* | ~35k ±0.4% |  ~21k ±0.2% ✓ | ~2k ±0.5% ✓ | ~4k ±0.3% ✓ |
| 0 9 \* \* 1-5  | ~11k ±0.2% |    ~10k ±1.2% | ~0k ±0.8% ✓ | ~1k ±0.3% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

| Test Case      |              cron-fast |          cron-schedule |                 cron-parser |                      croner |
| -------------- | ---------------------: | ---------------------: | --------------------------: | --------------------------: |
| \* \* \* \* \* |  28,177 ns / 39,625 ns |  48,603 ns / 62,042 ns |     528,769 ns / 690,625 ns |     268,826 ns / 359,541 ns |
| 0 9 \* \* 1-5  | 94,479 ns / 113,625 ns | 99,317 ns / 123,459 ns | 2,013,394 ns / 2,452,667 ns | 1,017,481 ns / 1,150,625 ns |

### Previous Execution - Throughput (ops/sec)

| Test Case       |    cron-fast | cron-schedule |  cron-parser |       croner |
| --------------- | -----------: | ------------: | -----------: | -----------: |
| \* \* \* \* \*  | ~1364k ±1.3% | ~134k ±0.4% ✓ | ~35k ±0.4% ✓ | ~33k ±0.7% ✓ |
| 0 0 1 \* \*     |  ~903k ±0.3% | ~495k ±0.4% ✓ |  ~9k ±0.5% ✓ | ~32k ±0.3% ✓ |
| 0 12 31 \* \*   |  ~646k ±0.3% | ~425k ±0.2% ✓ |  ~8k ±0.6% ✓ | ~32k ±0.3% ✓ |
| _/15 _ \* \* \* |  ~818k ±0.1% | ~255k ±0.4% ✓ | ~56k ±0.4% ✓ | ~32k ±1.3% ✓ |
| 0 9 \* \* \*    |  ~928k ±0.3% | ~342k ±0.4% ✓ | ~48k ±0.4% ✓ | ~32k ±0.4% ✓ |
| 0 9 15 \* 1     |  ~869k ±0.3% | ~502k ±0.4% ✓ | ~64k ±0.4% ✓ | ~31k ±0.4% ✓ |
| 0 9 \* \* 1-5   |  ~736k ±3.6% | ~323k ±0.4% ✓ | ~52k ±0.4% ✓ | ~31k ±0.3% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

| Test Case       |           cron-fast |       cron-schedule |             cron-parser |                croner |
| --------------- | ------------------: | ------------------: | ----------------------: | --------------------: |
| \* \* \* \* \*  |   733 ns / 1,166 ns | 7,464 ns / 9,000 ns |   28,684 ns / 37,708 ns | 30,507 ns / 41,083 ns |
| 0 0 1 \* \*     | 1,108 ns / 1,459 ns | 2,021 ns / 2,625 ns | 107,875 ns / 150,833 ns | 31,582 ns / 36,625 ns |
| 0 12 31 \* \*   | 1,548 ns / 1,958 ns | 2,355 ns / 3,000 ns | 118,171 ns / 189,875 ns | 31,698 ns / 35,750 ns |
| _/15 _ \* \* \* | 1,223 ns / 1,375 ns | 3,926 ns / 4,542 ns |   17,724 ns / 21,125 ns | 31,178 ns / 43,125 ns |
| 0 9 \* \* \*    | 1,078 ns / 1,458 ns | 2,924 ns / 3,542 ns |   20,757 ns / 28,250 ns | 31,049 ns / 40,042 ns |
| 0 9 15 \* 1     | 1,151 ns / 1,541 ns | 1,993 ns / 2,625 ns |   15,694 ns / 20,458 ns | 31,797 ns / 44,458 ns |
| 0 9 \* \* 1-5   | 1,359 ns / 1,916 ns | 3,099 ns / 3,708 ns |   19,378 ns / 21,625 ns | 32,318 ns / 35,875 ns |

### Validation - Throughput (ops/sec)

| Test Case       |    cron-fast | cron-schedule |   cron-parser |       croner | cron-validate |
| --------------- | -----------: | ------------: | ------------: | -----------: | ------------: |
| \* \* \* \* \*  | ~1948k ±1.3% | ~155k ±0.4% ✓ |  ~44k ±0.3% ✓ | ~36k ±0.4% ✓ | ~624k ±0.3% ✓ |
| 0 0 1 \* \*     | ~2028k ±0.4% | ~612k ±0.5% ✓ | ~125k ±0.4% ✓ | ~34k ±0.4% ✓ | ~632k ±3.0% ✓ |
| 0 12 31 \* \*   | ~1728k ±0.2% | ~613k ±0.5% ✓ | ~125k ±0.4% ✓ | ~34k ±0.5% ✓ | ~650k ±0.4% ✓ |
| _/15 _ \* \* \* | ~1597k ±0.5% | ~285k ±0.4% ✓ |  ~68k ±0.3% ✓ | ~35k ±0.3% ✓ | ~653k ±3.3% ✓ |
| 0 9 \* \* \*    | ~2134k ±0.2% | ~399k ±0.4% ✓ |  ~88k ±0.3% ✓ | ~35k ±0.3% ✓ | ~642k ±0.3% ✓ |
| 0 9 15 \* 1     | ~1705k ±0.5% | ~753k ±0.4% ✓ | ~142k ±0.3% ✓ | ~35k ±0.3% ✓ | ~602k ±3.3% ✓ |
| 0 9 \* \* 1-5   | ~1362k ±0.5% | ~398k ±0.4% ✓ |  ~89k ±0.4% ✓ | ~33k ±0.5% ✓ | ~629k ±0.3% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

| Test Case       |         cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| --------------- | ----------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| \* \* \* \* \*  | 513 ns / 1,000 ns | 6,469 ns / 8,458 ns | 22,487 ns / 29,250 ns | 28,104 ns / 35,209 ns | 1,602 ns / 2,375 ns |
| 0 0 1 \* \*     |   493 ns / 791 ns | 1,634 ns / 2,208 ns |  7,980 ns / 10,875 ns | 29,311 ns / 39,458 ns | 1,583 ns / 2,458 ns |
| 0 12 31 \* \*   |   579 ns / 750 ns | 1,633 ns / 2,167 ns |   7,971 ns / 9,292 ns | 29,762 ns / 41,333 ns | 1,538 ns / 2,000 ns |
| _/15 _ \* \* \* | 626 ns / 1,083 ns | 3,503 ns / 4,333 ns | 14,642 ns / 16,250 ns | 28,975 ns / 35,500 ns | 1,531 ns / 2,292 ns |
| 0 9 \* \* \*    |   469 ns / 666 ns | 2,504 ns / 3,125 ns | 11,392 ns / 14,042 ns | 28,501 ns / 34,291 ns | 1,556 ns / 1,958 ns |
| 0 9 15 \* 1     |   586 ns / 875 ns | 1,328 ns / 1,792 ns |   7,067 ns / 7,875 ns | 28,698 ns / 34,792 ns | 1,662 ns / 2,500 ns |
| 0 9 \* \* 1-5   | 734 ns / 1,208 ns | 2,514 ns / 3,125 ns | 11,175 ns / 14,333 ns | 30,054 ns / 43,583 ns | 1,591 ns / 2,000 ns |

### Parsing - Throughput (ops/sec)

| Test Case       |    cron-fast | cron-schedule |   cron-parser |       croner | cron-validate |
| --------------- | -----------: | ------------: | ------------: | -----------: | ------------: |
| \* \* \* \* \*  | ~2043k ±0.7% | ~155k ±0.4% ✓ |  ~44k ±0.3% ✓ | ~35k ±0.4% ✓ | ~612k ±0.3% ✓ |
| 0 0 1 \* \*     | ~2038k ±0.4% | ~619k ±0.4% ✓ | ~124k ±0.4% ✓ | ~33k ±0.5% ✓ | ~621k ±2.9% ✓ |
| 0 12 31 \* \*   | ~1733k ±0.1% | ~615k ±0.5% ✓ | ~121k ±0.7% ✓ | ~33k ±0.5% ✓ | ~644k ±0.4% ✓ |
| _/15 _ \* \* \* | ~1537k ±1.5% | ~282k ±0.4% ✓ |  ~66k ±0.4% ✓ | ~33k ±0.5% ✓ | ~662k ±0.4% ✓ |
| 0 9 \* \* \*    | ~2084k ±0.2% | ~394k ±0.4% ✓ |  ~87k ±0.6% ✓ | ~31k ±3.9% ✓ | ~615k ±1.2% ✓ |
| 0 9 15 \* 1     | ~1680k ±0.5% | ~705k ±0.5% ✓ | ~134k ±0.4% ✓ | ~34k ±0.3% ✓ | ~553k ±7.0% ✓ |
| 0 9 \* \* 1-5   | ~1341k ±0.8% | ~395k ±0.4% ✓ |  ~90k ±0.3% ✓ | ~34k ±0.3% ✓ | ~614k ±0.7% ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

| Test Case       |         cron-fast |       cron-schedule |           cron-parser |                croner |       cron-validate |
| --------------- | ----------------: | ------------------: | --------------------: | --------------------: | ------------------: |
| \* \* \* \* \*  | 490 ns / 1,000 ns | 6,432 ns / 7,791 ns | 22,588 ns / 28,042 ns | 28,823 ns / 37,167 ns | 1,634 ns / 2,042 ns |
| 0 0 1 \* \*     |   491 ns / 750 ns | 1,616 ns / 2,125 ns |  8,048 ns / 10,458 ns | 30,045 ns / 47,000 ns | 1,612 ns / 2,417 ns |
| 0 12 31 \* \*   |   577 ns / 709 ns | 1,627 ns / 2,125 ns |  8,281 ns / 10,875 ns | 30,396 ns / 46,000 ns | 1,552 ns / 1,958 ns |
| _/15 _ \* \* \* | 651 ns / 1,166 ns | 3,551 ns / 4,584 ns | 15,127 ns / 26,917 ns | 29,965 ns / 45,250 ns | 1,511 ns / 2,083 ns |
| 0 9 \* \* \*    |   480 ns / 708 ns | 2,540 ns / 3,250 ns | 11,535 ns / 14,250 ns | 31,764 ns / 69,333 ns | 1,626 ns / 2,084 ns |
| 0 9 15 \* 1     |   595 ns / 959 ns | 1,418 ns / 2,000 ns |  7,468 ns / 10,458 ns | 29,424 ns / 36,542 ns | 1,809 ns / 2,958 ns |
| 0 9 \* \* 1-5   | 746 ns / 1,209 ns | 2,530 ns / 3,125 ns | 11,114 ns / 13,750 ns | 29,686 ns / 36,459 ns | 1,630 ns / 2,125 ns |

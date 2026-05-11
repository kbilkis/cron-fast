# Benchmark

> Tested with bun v1.3.13, cron-fast v3.1.2, croner v10.0.1, cron-parser v5.5.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Tested with 1 second per test.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~661k       | baseline     |
| cron-schedule | ~309k       | 2.1x faster  |
| croner        | ~56k        | 11.9x faster |
| cron-parser   | ~37k        | 18.0x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~614k       | baseline     |
| cron-schedule | ~315k       | 1.9x faster  |
| croner        | ~58k        | 10.6x faster |
| cron-parser   | ~41k        | 15.1x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~849k       | baseline     |
| cron-validate | ~942k       | 1.1x slower  |
| cron-schedule | ~339k       | 2.5x faster  |
| cron-parser   | ~115k       | 7.4x faster  |
| croner        | ~62k        | 13.7x faster |

### Parsing

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~877k       | baseline     |
| cron-validate | ~948k       | 1.1x slower  |
| cron-schedule | ~342k       | 2.6x faster  |
| cron-parser   | ~123k       | 7.1x faster  |
| croner        | ~63k        | 14.0x faster |

Run benchmarks yourself: `pnpm benchmark:bun`

## Detailed Per-Test Results

### Next Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |    ~1221k |       ~149k ✓ | ~58k ✓ |      ~36k ✓ |
| Sparse: First of month      |     ~619k |       ~406k ✓ | ~55k ✓ |      ~22k ✓ |
| Sparse: 31st (skips months) |     ~541k |       ~407k ✓ | ~55k ✓ |       ~9k ✓ |
| Step: Every 15 minutes      |     ~566k |       ~206k ✓ | ~60k ✓ |      ~64k ✓ |
| Specific: 9 AM daily        |     ~728k |       ~282k ✓ | ~61k ✓ |      ~42k ✓ |
| OR-mode: 15th OR Monday     |     ~467k |         ~460k | ~52k ✓ |      ~39k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~485k |       ~256k ✓ | ~49k ✓ |      ~44k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |     ~551k |       ~149k ✓ | ~59k ✓ |      ~38k ✓ |
| Sparse: First of month      |     ~735k |       ~417k ✓ | ~54k ✓ |      ~11k ✓ |
| Sparse: 31st (skips months) |     ~556k |       ~407k ✓ | ~58k ✓ |      ~11k ✓ |
| Step: Every 15 minutes      |     ~561k |       ~211k ✓ | ~59k ✓ |      ~63k ✓ |
| Specific: 9 AM daily        |     ~675k |       ~284k ✓ | ~60k ✓ |      ~51k ✓ |
| OR-mode: 15th OR Monday     |     ~700k |       ~470k ✓ | ~60k ✓ |      ~63k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~520k |       ~267k ✓ | ~55k ✓ |      ~48k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |     ~542k |       ~153k ✓ |      ~51k ✓ | ~63k ✓ |       ~952k ✗ |
| 0 0 1 \* \*     |    ~1160k |       ~444k ✓ |     ~127k ✓ | ~62k ✓ |       ~944k ✓ |
| 0 12 31 \* \*   |     ~967k |       ~451k ✓ |     ~155k ✓ | ~61k ✓ |         ~882k |
| _/15 _ \* \* \* |     ~656k |       ~214k ✓ |      ~86k ✓ | ~63k ✓ |      ~1005k ✗ |
| 0 9 \* \* \*    |     ~963k |       ~269k ✓ |     ~107k ✓ | ~63k ✓ |         ~953k |
| 0 9 15 \* 1     |     ~874k |       ~552k ✓ |     ~170k ✓ | ~63k ✓ |         ~898k |
| 0 9 \* \* 1-5   |     ~782k |       ~292k ✓ |     ~111k ✓ | ~61k ✓ |       ~962k ✗ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |    ~1227k |       ~160k ✓ |      ~52k ✓ | ~64k ✓ |       ~956k ✓ |
| 0 0 1 \* \*     |    ~1009k |       ~460k ✓ |     ~164k ✓ | ~63k ✓ |        ~1002k |
| 0 12 31 \* \*   |    ~1007k |       ~445k ✓ |     ~163k ✓ | ~63k ✓ |       ~887k ✓ |
| _/15 _ \* \* \* |     ~507k |       ~222k ✓ |      ~84k ✓ | ~62k ✓ |       ~996k ✗ |
| 0 9 \* \* \*    |     ~851k |       ~297k ✓ |     ~108k ✓ | ~62k ✓ |       ~947k ✗ |
| 0 9 15 \* 1     |     ~929k |       ~530k ✓ |     ~178k ✓ | ~62k ✓ |         ~896k |
| 0 9 \* \* 1-5   |     ~609k |       ~283k ✓ |     ~109k ✓ | ~60k ✓ |       ~952k ✗ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

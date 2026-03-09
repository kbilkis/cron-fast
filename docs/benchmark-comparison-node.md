# Benchmark & Feature Comparison

> Tested with node v22.18.0, cron-fast v2.2.0, croner v10.0.1, cron-parser v5.5.0, cron-schedule v6.0.0, cron-validate v1.5.3
> Tested on MacBook M1 pro

## Performance Benchmarks

Tested with 1 second per test.

### Next Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~484k       | baseline     |
| cron-schedule | ~380k       | 1.3x faster  |
| croner        | ~30k        | 15.9x faster |
| cron-parser   | ~33k        | 14.5x faster |

### Previous Execution Time

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~551k       | baseline     |
| cron-schedule | ~393k       | 1.4x faster  |
| croner        | ~31k        | 17.6x faster |
| cron-parser   | ~38k        | 14.6x faster |

### Validation

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~651k       | baseline     |
| cron-validate | ~579k       | 1.1x faster  |
| cron-schedule | ~372k       | 1.8x faster  |
| cron-parser   | ~78k        | 8.4x faster  |
| croner        | ~28k        | 23.5x faster |

### Parsing

| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ~718k       | baseline     |
| cron-validate | ~620k       | 1.2x faster  |
| cron-schedule | ~430k       | 1.7x faster  |
| cron-parser   | ~86k        | 8.3x faster  |
| croner        | ~29k        | 24.4x faster |

Run benchmarks yourself: `pnpm benchmark`

## Detailed Per-Test Results

### Next Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |     ~357k |       ~172k ✓ | ~31k ✓ |      ~31k ✓ |
| Sparse: First of month      |     ~586k |       ~511k ✓ | ~31k ✓ |      ~18k ✓ |
| Sparse: 31st (skips months) |     ~563k |         ~513k | ~29k ✓ |       ~7k ✓ |
| Step: Every 15 minutes      |     ~446k |       ~253k ✓ | ~34k ✓ |      ~55k ✓ |
| Specific: 9 AM daily        |     ~504k |       ~339k ✓ | ~31k ✓ |      ~41k ✓ |
| OR-mode: 15th OR Monday     |     ~431k |       ~546k ✗ | ~28k ✓ |      ~36k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~499k |       ~326k ✓ | ~29k ✓ |      ~43k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - All Libraries

| Test Case                   | cron-fast | cron-schedule | croner | cron-parser |
| --------------------------- | --------: | ------------: | -----: | ----------: |
| Every minute                |     ~395k |       ~182k ✓ | ~32k ✓ |      ~35k ✓ |
| Sparse: First of month      |     ~660k |       ~535k ✓ | ~31k ✓ |       ~9k ✓ |
| Sparse: 31st (skips months) |     ~544k |       ~482k ✓ | ~30k ✓ |       ~8k ✓ |
| Step: Every 15 minutes      |     ~442k |       ~259k ✓ | ~33k ✓ |      ~56k ✓ |
| Specific: 9 AM daily        |     ~536k |       ~362k ✓ | ~31k ✓ |      ~49k ✓ |
| OR-mode: 15th OR Monday     |     ~765k |       ~582k ✓ | ~32k ✓ |      ~59k ✓ |
| Weekdays: Mon-Fri 9 AM      |     ~517k |       ~351k ✓ | ~31k ✓ |      ~49k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |     ~444k |       ~196k ✓ |      ~47k ✓ | ~35k ✓ |       ~647k ✗ |
| 0 0 1 \* \*     |     ~711k |       ~417k ✓ |      ~90k ✓ | ~24k ✓ |       ~568k ✓ |
| 0 12 31 \* \*   |     ~702k |       ~511k ✓ |      ~99k ✓ | ~25k ✓ |       ~565k ✓ |
| _/15 _ \* \* \* |     ~455k |       ~218k ✓ |      ~54k ✓ | ~28k ✓ |       ~598k ✗ |
| 0 9 \* \* \*    |     ~678k |       ~323k ✓ |      ~71k ✓ | ~27k ✓ |       ~556k ✓ |
| 0 9 15 \* 1     |    ~1004k |       ~620k ✓ |     ~111k ✓ | ~28k ✓ |       ~586k ✓ |
| 0 9 \* \* 1-5   |     ~562k |       ~316k ✓ |      ~72k ✓ | ~27k ✓ |         ~533k |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - All Libraries

| Test Case       | cron-fast | cron-schedule | cron-parser | croner | cron-validate |
| --------------- | --------: | ------------: | ----------: | -----: | ------------: |
| \* \* \* \* \*  |     ~353k |       ~152k ✓ |      ~37k ✓ | ~27k ✓ |       ~524k ✗ |
| 0 0 1 \* \*     |     ~811k |       ~501k ✓ |      ~98k ✓ | ~25k ✓ |       ~553k ✓ |
| 0 12 31 \* \*   |     ~753k |       ~511k ✓ |      ~99k ✓ | ~27k ✓ |       ~546k ✓ |
| _/15 _ \* \* \* |     ~431k |       ~284k ✓ |      ~55k ✓ | ~24k ✓ |       ~727k ✗ |
| 0 9 \* \* \*    |     ~767k |       ~398k ✓ |      ~87k ✓ | ~34k ✓ |       ~670k ✓ |
| 0 9 15 \* 1     |    ~1225k |       ~766k ✓ |     ~138k ✓ | ~34k ✓ |       ~701k ✓ |
| 0 9 \* \* 1-5   |     ~688k |       ~399k ✓ |      ~89k ✓ | ~34k ✓ |       ~617k ✓ |

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

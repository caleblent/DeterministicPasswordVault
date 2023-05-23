# Deterministic Password Vault

This project is an attempt to be a password vault that can generate deterministically pseudorandom password outputs to different applications a user may have, based off of no outside data or other exterior input.

Because it does this deterministically, no personal data needs to be stored anywhere, so there's no danger of passwords being "leaked" or stolen. All that is required is that
the user remembers there's seed phrase, and that this seed phrase is obscure or random enough that it is implausible a would-be attacker could figure it out.

_This project is a **WIP**, updates and screenshots can be seen below._

## TODOS

1. Remove "Calculate" button/column, as it calculates automatically
1. Add "Length" column with + and - buttons (default value: 12)
1. "Add New" button near bottom to add more rows

# Progress

## May 23, 2023

Added **Length** column to specify the desired character length of passwords.

![May 23, 2023](img/Screenshot3.png)

Removed **Calculate** button/column. It was redundant because the password is automatically calculated upon launching the application, and passwords are automatically recalculated anytime any value is changed (seed phrase, number, etc.).

![May 23, 2023](img/Screenshot2.png)

## April 9, 2023

Completed first draft.

![April 9, 2023](img/Screenshot1.png)

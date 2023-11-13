# meson wallet app

### Installation

Install dependencies for the app

```
$ yarn --ignore-engines
```

### Demo

#### Trezor

- Trezor can only be used in the browser for now
- You can test Trezor hardware wallet with **Sepolia** network

#### Ledger

- Ledger cannot be run in the browser as it's invoked by Rust
- You can test Ledger hardware wallet with **Goerli** network (To be implemented)

Run the app in the browser

```
$ yarn dev
```

Run the app as a desktop app

- Trezor can only be used in the browser for now

```
$ yarn tauri dev
```

#### Demo on local(hardhat)

- Select **localhost** as network

```
$ cd smart_contract
$ yarn
```

Run hardhat node

```
$ cd smart_contract
$ yarn start
```

### Viewable screen

- Start screen
- Create wallet screens
- Home screen
- Transactttions screen
- New transaction modal

### Functions

[🔺] Create new meson wallet

- [🟢] Hardhat
- [🟢] Trezor
- [❌] Ledger

[🔺] Add existing meson wallet  
[🟢] Receive fund
[🟢] View historical transactions
[🔺] Send fund

use meson_wallet::wallet::MesonWallet;

const WALLET_CONFIG_PATH: &str = "./configuration/wallet_config.toml";

// generate a new random 12 words mnemonic
#[tauri::command]
pub fn gen_mnemonic() -> Result<String, String> {
    match MesonWallet::gen_mnemonic() {
        Ok(m) => return Ok(m),
        Err(e) => return Err(e.to_string()),
    }
}

// save a mnemonic encrypted with given password
// caution: this function will wipe the previous mnomonic, must prompt for user confirm
#[tauri::command]
pub fn save_mnemonic(mnemonic: &str, password: &str) -> Result<(), String> {
    let wallet = MesonWallet::new(WALLET_CONFIG_PATH);
    match wallet.save_mnemonic(mnemonic, password) {
        Ok(()) => return Ok(()),
        Err(e) => return Err(e.to_string()),
    }
}

#[tauri::command]
pub fn show_mnemonic(password: &str) -> Result<String, String> {
    let wallet = MesonWallet::new(WALLET_CONFIG_PATH);
    match wallet.show_mnemonic(password) {
        Ok(m) => return Ok(m),
        Err(e) => return Err(e.to_string()),
    }
}

// get all saved account
#[tauri::command]
pub fn get_saved_accounts() -> Result<Vec<String>, String> {
    let wallet = MesonWallet::new(WALLET_CONFIG_PATH);
    match wallet.saved_accounts() {
        Ok(accounts) => {
            let addrs: Vec<String> = accounts
                .iter()
                .map(|account| account.addr.clone())
                .collect();
            return Ok(addrs);
        }
        Err(e) => return Err(e.to_string()),
    }
}

// import and save an account with private key
#[tauri::command]
pub fn import_account(sk: &str, password: &str) -> Result<String, String> {
    let wallet = MesonWallet::new(WALLET_CONFIG_PATH);
    match wallet.import_account(sk, password) {
        Ok(addr) => return Ok(addr),
        Err(e) => return Err(e.to_string()),
    }
}

// return a lagacy transaction, including nonce, estimated fee and gas
// #[tauri::command]
// pub fn query_nonce()

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    pub fn test_new_mnemonic() {
        let phrase = gen_mnemonic().unwrap();
        save_mnemonic(&phrase, "123456789");
        let a = show_mnemonic("123456789").unwrap();
        println!("{}", a);
    }
}

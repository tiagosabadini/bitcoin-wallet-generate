const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

// definindo a rede
// rede de teste testnet
// rede de produção bitcoin
const network = bitcoin.networks.testnet

// definição do tipo de carteira
const path = `m/49'/1'/0'/0`

// gerar palavras chave
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

// criar raiz da carteira HD
const root = bip32.fromSeed(seed, network)

// criando uma conta par pvt-pub keys
const account = root.derivePath(path)
let node = account.derive(0).derive(0)

const btcAddress = bitcoin.payments.p2pkh({
  pubkey: node.publicKey,
  network: network
}).address

console.log('Carteira gerada')
console.log(`Endereço: ${btcAddress}`)
console.log(`Chave privada: ${node.toWIF()}`)
console.log(`Seed: ${mnemonic}`)





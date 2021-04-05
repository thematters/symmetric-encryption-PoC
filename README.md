PoCs for HTML string encryption and decryption with Web Crypto API

# encrypt-decrypt

Content in `origin` class is encrypted and written to `encrypted` class, then descypted to `decrypted` class.

# TODO

-   encryopt on node server and descrpt on browser by passing in query string

# Notes

Current encryption method use AES in “counter” mode, counting up from 0 for each encryption block. This has some down side and need to investigate different modes of operation in block ciphers.

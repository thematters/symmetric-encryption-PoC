PoCs for HTML string encryption and decryption with Web Crypto API

# encrypt-decrypt

Showcase both encryption and decryption. Content in `origin` class is encrypted and written to `encrypted` class, then descypted to `decrypted` class.

-   Open index.html file.
-   You should see the original content under `Origin` header, encrypted content under `Encrypted`, decrypted content under `Decrypted` header, and secret string logged out in console.

# decrypt-with-query-string

Decrypt encrypted content by passing in secret in query string.

-   Open index.html file, you should see the encrypted content.
-   Add query string `?secret=lUE7rYm9-y2h1WVamWVSlw`, you should see the decrypted content.
-   Alternatively, [test it on IPFS](https://gateway.pinata.cloud/ipfs/QmSx5MUS2cJNL7WAmVMDRPa4vdFp2tUHe55XANDzQUapzC/?secret=lUE7rYm9-y2h1WVamWVSlw)

# decrypt-with-form

Same with `decrypt-with-query-string`, except user can enter key in an input box. Test it [here](https://gateway.pinata.cloud/ipfs/QmU7ZLzUAbRvdgHmg3C4mqKuHtn4NrmNzM5sG9dFCVop83/) with key `lUE7rYm9-y2h1WVamWVSlw`. Also added `data-algorithm-version` attribute and `decrypt` function that works as reference implementation.

# encryption-with-node

Reads html file and asset from `./article`, encrypt `article` tag, and return url with encryption key.

-   Start an IPFS daemon with default API port `5001` and default gateway port `8080`
-   `cd encryption-with-node`
-   `npm i`
-   `npm run publish`
-   Vist the result url in terminal, the content should be decrypted

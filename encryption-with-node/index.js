const createClient = require('ipfs-http-client')
const fs = require('fs')
const cheerio = require('cheerio')
const { Crypto } = require('@peculiar/webcrypto')

// connect to the default API address http://localhost:5001
const client = createClient()
const crypto = new Crypto()

const encrypt = async (content) => {
    const buf2hex = (buf) => {
        return Array.prototype.map
            .call(new Uint8Array(buf), (x) => ('00' + x.toString(16)).slice(-2))
            .join('')
    }

    const key = await crypto.subtle.generateKey(
        {
            name: 'AES-CTR',
            length: 128,
        },
        true, // extractable
        ['encrypt', 'decrypt'] // key usages
    )

    const encrypted = buf2hex(
        await crypto.subtle.encrypt(
            {
                name: 'AES-CTR',
                counter: new Uint8Array(16),
                length: 16 * 8,
            },
            key,
            new TextEncoder('utf-8').encode(content)
        )
    )

    const keyJSON = await crypto.subtle.exportKey('jwk', key)

    return {
        key: keyJSON.k,
        encrypted,
    }
}

const publish = async () => {
    const localFilePath = './article'
    const userArticlePath = '/@test-user/article1'

    const htmlString = fs.readFileSync(`${localFilePath}/index.html`, 'utf8')
    const $ = cheerio.load(htmlString)
    const articleString = $('article').html()

    const { key, encrypted } = await encrypt(articleString)

    // uppdate encrypted content
    $('article')
        .html(encrypted)
        .addClass('encrypted')
        .attr('data-algorithm-version', '1')

    // add decrpter script
    $('head').append(
        `<script type="text/javascript"> ${fs.readFileSync(
            './decrypter.js',
            'binary'
        )}</script>`
    )

    // get encrypted html
    encryptedHtml = $.html()

    // write in index.html
    await client.files.write(
        `${userArticlePath}/index.html`,
        Buffer.from(encryptedHtml, 'utf-8'),
        {
            create: true,
            parents: true,
        }
    )

    // write in other assets
    const files = fs.readdirSync(localFilePath)
    for (const file of files) {
        if (file !== 'index.html') {
            await client.files.write(
                `${userArticlePath}/${file}`,
                fs.readFileSync(`${localFilePath}/${file}`),
                {
                    create: true,
                    parents: true,
                }
            )
        }
    }

    // get final status of directory
    const stat = await client.files.stat(userArticlePath)

    // assemble url
    return `http://localhost:8080/ipfs/${stat.cid.toString()}?key=${key}`
}

publish().then((result) => console.log('open', result))

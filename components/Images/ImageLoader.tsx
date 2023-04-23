export default function ImageLoader({ src, width?, quality}) {
    return `https://example.com/${src}?w=${width}&q=${quality || 75}`

}
export function capitalize(str) {
    str = str.replace("_", "-")
    let words = str.split('-')
    for (let i = 0 ; i < words.length; i++) {
        words[i] = words[i].slice(0,1).toUpperCase() + words[i].slice(1)
    }

    return words.join(" ")
}
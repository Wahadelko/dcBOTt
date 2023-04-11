function listener(message) {
    let messages = message.content;
    const user = message.author;
    const member = message.member;
    if (message.author.bot) return;
    if (message.content = true) console.log(`${user.tag} ${messages}`);
    return;
}
module.exports = { listener };
module.exports = {
    name:"ping",
    execute(message, args, Discord, bot, axios){
        const now = Date.now()
        const ping = now - message.createdTimestamp
        message.reply(`Ponged back in ${ping}ms!`)
    }
}

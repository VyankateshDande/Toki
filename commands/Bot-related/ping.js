module.exports = {
    name:"ping",
    module:"Bot-related Information",
    description:"Gives bot latency",
    execute(message, args, Discord, bot, axios){
        const now = Date.now()
        const ping = now - message.createdTimestamp
        message.reply(`Ponged back in ${ping}ms!`)
    }
}

module.exports = {
    name:"setStatus",
    module:"Owner",
    description:"Set the bot's status.",
    execute (message, args, Discord, bot, axios, embeds, redis) {
        if (message.author.id != 912351813041262662n){
            return
        }
        if (!args[0]){
            message.reply("Give me a status as well.")
            return
        }
        for (i in args) {
            if (args[0] == args[i]) continue;
            args[0] += ` ${args[i]}`;
        }
        const valid_status = ["online", "dnd", "idle"]
        if (valid_status.includes(args[0].toLowerCase())){
            bot.user.setStatus(args[0].toLowerCase())
            message.reply(`Status has been set to ${args[0]}.`)
        }
        else if (args[0].toLowerCase() == "offline") {
            message.reply("That wont be good for the bot!")
            return
        }
        else {
            message.reply("Not a valid status!")
            return
        }
    }
}
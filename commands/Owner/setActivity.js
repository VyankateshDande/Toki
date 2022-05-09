module.exports = {
    name:"setActivity",
    module:"Owner",
    description:"Set the bot's activity.",
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
        if (args[0] == "-clear") {
            bot.user.setActivity();
            message.reply("Status has been reset.")
            return
        }
        bot.user.setActivity({
            name:args[0]
        })
        message.reply(`Status has been set to ${args[0]}`)
    }
}
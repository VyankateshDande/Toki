module.exports = {
    name:"help",
    module:"Bot-related Information",
    description:"Provides informationa about the commands present in the bot.",
    execute(message, args, Discord, bot, axios, database, embeds){
        let embed_fields = []
        for (i in args){
            if (args[0] == args[i]) continue
            args[0] += ` ${args[i]}`
        }
        if (!args[0]){
            for (i in bot.modules['modules']){
                embed_fields.push({name:bot.modules['modules'][i], value:`Type \`<help ${bot.modules['modules'][i].toString()}\` for more info on this module`})
            }
        }
        else if (bot.modules['modules'].includes(args[0].toLowerCase())){
            for (const cmd of bot.modules[args[0].toLowerCase()]){
                const cmd_info = bot.commands.get(cmd)
                embed_fields.push({name:cmd_info.name, value:cmd_info.description})
            }
        }
        else if (bot.valid_cmds.includes(args[0].toLowerCase())){
            const cmd_info = bot.commands.get(args[0].toLowerCase())
            embed_fields.push({name:cmd_info.name, value:cmd_info.description})
        }
        else {
            message.reply("No such command/module!")
            return
        }
        const help_embed = new Discord.MessageEmbed({
            description:"Please replace `<` with your custom prefix in case you have set one for your server.",
            color:"#00ccff",
            timestamp:new Date(),
            author:{
                name:message.author.username,
                iconURL:(message.author.avatarURL({
                    dynamic:false,
                    format:"png",
                    size:128
                }))
            },
            fields: embed_fields
        })
        embeds.push(help_embed)
        message.reply({embeds:embeds})
    }
}
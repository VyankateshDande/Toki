module.exports = {
    name:"setprefix",
    async execute(message, args, Discord, bot, axios, database, announcement){

        if (!args[0]){
            message.reply("You must specify a prefix!")
            return
        }
        else if (args[1]){
            message.reply("You are not allowed to use space in prefix!")
            return
        }
        else if (message.member.permissions.has("MANAGE_GUILD")){
            database
                .query("UPDATE server_info SET prefix=$1 WHERE server_id = $2", [args[0], message.guild.id])
                .then((data)=>{
                    console.log(`Set prefix to [${args[0]}] in [${message.guild.name}]\n`)
                    message.reply(`The prefix for this server is set to \`${args[0]}\`.`)
                })
                .catch(err=>{console.error(err);});
            let guild_info = bot.server_info.get(message.guild.id)
            guild_info.prefix = args[0];
            bot.server_info.set(message.guild.id, guild_info)
            return
        }
        else {
            message.reply("You need to have `Manage Server` permission to do perform this action!")
            return
        }
    }
}
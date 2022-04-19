module.exports = {
    name:"help",
    execute(message, args, Discord, bot, axios, database, announcement){
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
            fields: [
                {name:"<help", value:"Provides a list of all commands and a short description of each command.", inline:false},
                {name:"<ping", value:"Returns the bot latency", inline:false},
                {name:"<setprefix [custom prefix]", value:"Set a custom prefix for your server! \n`Note`: This command can only be used by users who have `Manage Server` permission.", inline:false},
                {name:"<server-info", value:"Provides information about server. \nProvided information includes but is not limited to number of roles, members, how many members are bots, how many members are humans, nad other information.", inline:false},
                {name:"<user-info [user]", value:"Provides information about specified user. If no user is specified, provides information about the author of the command. \nProvided information inlcudes but is not limited to roles the user has in the server, permissions, account creation date with time, the date the user joined the server (with time), and other information", inline:false},
                {name:"<role-info [role name]", value:"Provides information about the specified role. \nProvided information includes but is not limited to Permissions granted to the role, role creation date, color of role (represented by embed color), role ID, and other information.\nIf two roles have the same name, the role lower in the role list will be displayed.", inline:false},
                {name:"<dog", value:"Provides a cute dog picture!", inline:false},
                {name:"<cat", value:"Provides a cute cat picture!", inline:false},
                {name:"<duck", value:"Provides a cute duck picture!", inline:false},
                {name:"<fox", value:"Provides a cute fox picture!", inline:false},
                {name:"<panda", value:"Provides a cute panda picture!", inline:false},
                
            ]
        })
        message.reply({embeds:[announcement, help_embed]})
    }
}
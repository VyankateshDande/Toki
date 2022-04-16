module.exports = {
    name:"help",
    execute(message, args, Discord){
        const help_embed = new Discord.MessageEmbed({
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
                {name:"<server-info", value:"Provides information about server. \nProvided information includes but is not limited to number of roles, members, how many members are bots, how many members are humans, nad other information.", inline:false},
                {name:"<user-info [user]", value:"Provides information about specified user. If no user is specified, provides information about the author of the command. \nProvided information inlcudes but is not limited to roles the user has in the server, permissions, account creation date with time, the date the user joined the server (with time), and other information", inline:false},
                {name:"<role-info [role name]", value:"Provides information about the specified role. \nProvided information includes but is not limited to Permissions granted to the role, role creation date, color of role (represented by embed color), role ID, and other information.\nIf two roles have the same name, the role lower in the role list will be displayed.", inline:false}
            ]
        })
        message.reply({embeds:[help_embed]})
    }
}
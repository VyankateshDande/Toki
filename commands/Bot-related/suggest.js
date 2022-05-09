module.exports = {
    name: "suggest",
    module: "Bot-related Information",
    description: "Suggest a feature to the bot developer!",
    async execute (message, args, Discord, bot, axios, embeds, redis) {
        for (i in args) {
            if (args[i] == args[0]) continue;
            args[0] += ` ${args[i]}`;
        }

        if (!args[0]) {
            message.reply("Give me something to suggest");
            return
        }
        else {
            axios.post("https://discord.com/api/webhooks/973135422211358730/IT4ZHtviNBC9lOOHzD8opIIDFpxaJkhlXO5Bmw26ra-wwv3WiNFFyAsf92f5_KmO7IM3", {
                embeds:[
                    new Discord.MessageEmbed({
                        color:"#00ccff",
                        timestamp:new Date(),
                        author:{
                            name:message.author.username,
                            iconURL:(message.author.displayAvatarURL({
                                dynamic:false,
                                format:"png",
                                size:128
                            }))
                        },
                        description: args[0],
                    })
                ]
            })
                .then ( data => {
                    message.reply("Your suggestion has been successfully sent to the developer!")
                })
                .catch ( data => {
                    message.reply("Some error occured while sending your suggestion. Please try again.")
                    console.log(data);
                })
        }
    }
}
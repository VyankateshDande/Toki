module.exports = {
    name:"8ball",
    module:"Fun",
    description:"Let the bot decide your fate",
    execute(message, args, Discord, bot, axios, database, embeds){
        for (i in args){
            if (args[i] == args[0]) continue
            args[0] += ` ${args[i]}`
        }
        if (!args[0]){
            message.reply("You need to ask a question for me to decide.")
            return
        }
        const fate = Math.floor(Math.random()*3)
        const answer_no = Math.floor(Math.random()*5)
        const choices = [
            ["It is certain.", "Yes, definitely.", "Most likely.", "As I see it, yes.", "Without a doubt."],
            ["Can not predit now.", "Concentrate and ask again.", "Better not tell you now.", "Ask again later.", "Reply hazy, try again."],
            ["My reply is no.", "My sources say no.", "Very doubtful.", "Signs point to no.", "Don't count on it."]
        ]
        const colours = ["#00cc00", "#ffcc00", "#ff0000"]
        let response = choices[fate][answer_no]
        if (!response) response = "Hmm. You will have to decide this by yourself. What do you think?"
        const ball_embed = new Discord.MessageEmbed({
            author:{
                name:`Q: ${args[0].toString()}`
            },
            color:colours[fate],
            description:`A: ${response}`,
            footer:{
                text:`Requested by ${message.author.tag}`,
                iconURL:message.author.avatarURL({
                    dynamic:false,
                    format:"png",
                    size:64,
                }),
            },
            timestamp:new Date(),

        })
        message.reply({embeds:[ball_embed]})
    }
}
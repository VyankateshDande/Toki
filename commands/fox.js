module.exports = {
    name:"fox",
    async execute(message, args, Discord, bot, axios, database, embeds){
        const fox_pic_req = await axios.get(('https://some-random-api.ml/img/fox'))
        if (fox_pic_req.data.link == undefined){
            message.reply("Something went wrong. Try again later.")
            return
        }
        const foxpic_embed = new Discord.MessageEmbed({
            title:"Fox <3",
            color:"#00ccff",
            timestamp:new Date(),
            image:{
                url:fox_pic_req.data.link
            },
            footer:{
                text:`Requested by ${message.author.tag}`,
                iconURL:message.author.avatarURL({
                    dynamic:false,
                    format:"png",
                    size:64,
                }),
            }
        })
        embeds.push(foxpic_embed)
        message.reply({embeds:embeds})
        return
    }
}
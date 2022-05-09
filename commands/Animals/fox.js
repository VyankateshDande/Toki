module.exports = {
    name:"fox",
    module:"Animals",
    description:"Gives a cute picture of a fox and a random fox fact!",
    async execute(message, args, Discord, bot, axios, embeds){
        const fox_pic_req = await axios.get(('https://some-random-api.ml/animal/fox'))
        if (fox_pic_req.data.image == undefined){
            message.reply("Something went wrong. Try again later.")
            return
        }
        const foxpic_embed = new Discord.MessageEmbed({
            title:"Fox",
            description:fox_pic_req.data.fact,
            color:"#00ccff",
            timestamp:new Date(),
            image:{
                url:fox_pic_req.data.image
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
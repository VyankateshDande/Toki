module.exports = {
    name:"duck",
    module:"Animals",
    description:"Gives a cute picture of a duck!",
    async execute(message, args, Discord, bot, axios, database, embeds){
        const duck_pic_req = await axios.get(('https://random-d.uk/api/random?type=jpg'))
        if (duck_pic_req.data.url == undefined){
            message.reply("Something went wrong. Try again later.")
            return
        }
        const duck_pic = duck_pic_req.data.url
        const duckpic_embed = new Discord.MessageEmbed({
            color:"#00ccff",
            title:"**Duck**",
            timestamp:new Date(),
            image:{
                url:duck_pic
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
        embeds.push(duckpic_embed)
        message.reply({embeds:embeds})
        return
    }
}
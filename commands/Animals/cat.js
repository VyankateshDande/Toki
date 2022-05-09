module.exports = {
    name:"cat",
    module:"Animals",
    description:"Gives a cute picture of a cat and a random cat fact!",
    async execute(message, args, Discord, bot, axios, embeds){
        const cat_pic_req = await axios.get(('https://some-random-api.ml/animal/cat'))
        if (cat_pic_req.data.image == undefined){
            message.reply("Something went wrong. Try again later.")
            return
        }
        const catpic_embed = new Discord.MessageEmbed({
            title:"**Cat**",
            color:"#00ccff",
            timestamp:new Date(),
            description:cat_pic_req.data.fact,
            image:{
                url:cat_pic_req.data.image
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
        embeds.push(catpic_embed)
        message.reply({embeds:embeds})
        return
    }
}

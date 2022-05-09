module.exports = {
    name:"dog",
    module:"Animals",
    description:"Gives a cute picture of a dog and a random dog fact!",
    async execute(message, args, Discord, bot, axios, embeds){
        let dog_pic
        const dog_pic_req = await axios.get('https://some-random-api.ml/animal/dog')
        if (dog_pic_req.link) {
            message.reply("Something went wrong. Try again later.")
            return
        }
        const dogpic_embed = new Discord.MessageEmbed({
            title:"*Dog**",
            description:dog_pic_req.data.fact,
            color:"#00ccff",
            timestamp:new Date(),
            image:{
                url:dog_pic_req.data.image
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
        embeds.push(dogpic_embed)
        message.reply({embeds:embeds})
        return
    }
}
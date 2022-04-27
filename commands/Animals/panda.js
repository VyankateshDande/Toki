module.exports = {
    name:"panda",
    module:"Animals",
    description:"Gives a cute a picture of panda and a random panda fact!",
    async execute(message, args, Discord, bot, axios, database, embeds){
        const panda_pic_req = await axios.get(('https://some-random-api.ml/animal/panda'))
        if (panda_pic_req.data.image == undefined){
            message.reply("Something went wrong. Try again later.")
            return
        }
        const pandapic_embed = new Discord.MessageEmbed({
            title:"Panda <3",
            description:panda_pic_req.data.fact,
            color:"#00ccff",
            timestamp:new Date(),
            image:{
                url:panda_pic_req.data.image
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
        embeds.push(pandapic_embed)
        message.reply({embeds:embeds})
        return
    }
}
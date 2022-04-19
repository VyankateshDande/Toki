module.exports = {
    name:"panda",
    async execute(message, args, Discord, bot, axios){
        const panda_pic_req = await axios.get(('https://some-random-api.ml/img/panda'))
        if (panda_pic_req.data.link == undefined){
            message.reply("Something went wrong. Try again later.")
            return
        }
        const pandapic_embed = new Discord.MessageEmbed({
            title:"Panda <3",
            color:"#00ccff",
            timestamp:new Date(),
            image:{
                url:panda_pic_req.data.link
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
        message.reply({embeds:[pandapic_embed]})
        return
    }
}
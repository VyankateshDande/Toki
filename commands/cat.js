module.exports = {
    name:"cat",
    async execute(message, args, Discord, bot, axios, database, announcement){
        const cat_pic_req = await axios.get(('https://some-random-api.ml/img/cat'))
        if (cat_pic_req.data.link == undefined){
            message.reply("Something went wrong. Try again later.")
            return
        }
        const catpic_embed = new Discord.MessageEmbed({
            title:"cat <3",
            color:"#00ccff",
            timestamp:new Date(),
            image:{
                url:cat_pic_req.data.link
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
        message.reply({embeds:[announcement, catpic_embed]})
        return
    }
}

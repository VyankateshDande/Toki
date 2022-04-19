module.exports = {
    name:"cat",
    async execute(message, args, Discord, bot, axios, database, announcement){
        const cat_pic_req = await axios.get(('https://cataas.com/cat?json=true&tags=cute'))
        if (cat_pic_req.data.url == undefined){
            message.reply("Something went wrong. Try again later.")
            return
        }
        const cat_pic = `https://cataas.com/${cat_pic_req.data.url}`
        const catpic_embed = new Discord.MessageEmbed({
            title:"cat <3",
            color:"#00ccff",
            timestamp:new Date(),
            image:{
                url:cat_pic
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
module.exports = {
    name:"dog",
    async execute(message, args, Discord, bot, axios){
        let dog_pic
        const dog_pic_req = await axios.get(('https://dog.ceo/api/breeds/image/random'))
        if (dog_pic_req.status == false) {
            message.reply("Something went wrong. Try again later.")
            return
        }
        else{
            dog_pic = dog_pic_req.data['message']
        }
        const dogpic_embed = new Discord.MessageEmbed({
            title:"Dog <3",
            color:"#00ccff",
            timestamp:new Date(),
            image:{
                url:dog_pic
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
        message.reply({embeds:[dogpic_embed]})
        return
    }
}
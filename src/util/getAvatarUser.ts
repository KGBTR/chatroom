import axios from "axios";
import client from "../../prisma/prisma";


type User = {
    kind: string,
    data: {
        snoovatar_img: string,
        subreddit: {
            icon_img: string
        }
    }
}

export default async function GetAvatarUser(
    username: string
): Promise<string | undefined> {
    return new Promise(async (resolve,reject) => {
        try {
            await client.message.findFirst({
                where: {
                    author: username
                }
            }).then(res => {
                if(res) {
                    resolve(res.author_image);
                }
            }).catch((err) => console.error("ERR", err))

            const res: User = await axios.get(`https://www.reddit.com/user/${username}/about.json`, {
                timeout: 2000
            }).then(res => res.data);
            resolve(res.data.subreddit.icon_img.replace(/&amp;/g, '&'));
        } catch(err) {
            reject(undefined);
        }
    })
} 
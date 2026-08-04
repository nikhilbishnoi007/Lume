import ImageKit from '@imagekit/nodejs';
import config from '../config/config.js';

const client= new ImageKit({
    privateKey:config.IMAGE_KIT_PRIVATE_KEY,
})


async function uploadFile(buffer){
   const data=await client.files.upload({
    file:buffer.toString("base64"),
    fileName:"file-name.jpg"
   })
   return data
}

export default uploadFile
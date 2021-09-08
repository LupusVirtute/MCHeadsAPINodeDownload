let url = "https://minecraft-heads.com/scripts/api.php?cat=animals"
import base64 from 'base-64';
import fetch from 'node-fetch'
import fs from 'fs'
const fetchAndOutputData = async () =>{
    (await fetch(url)).json().then(data => {
        for(let result of data) {
            dataSolver(result);
        }
    })
}
async function dataSolver(result) {
    if(!fs.existsSync("results"))
        fs.mkdir("results", (err) => {console.log(err)});
    const fileStream = fs.createWriteStream("results/"+result.uuid + ".png");
    let skin = base64.decode(result.value);
    let skinUrl = JSON.parse(skin).textures.SKIN.url;
    let res = (await fetch(skinUrl));
    res.body.pipe(fileStream);
}
fetchAndOutputData();
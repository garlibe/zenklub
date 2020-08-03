const csvtojson = require("csvtojson");
const users = require("./assets/users.json");
const fs = require('fs');
let newusers = users;

// industry add
const industryadd = () => {
    csvtojson().fromFile("./assets/industries.csv").then((industries) => {
        for (let cont1 = 0; cont1 < newusers.length; cont1 = cont1 + 1) {
            for (let cont2 = 0; cont2 < industries.length; cont2 = cont2 + 1) {
                if (newusers[cont1].industryId === industries[cont2].id){
                    newusers[cont1].industryName = industries[cont2].name;
                }
            }
        }
        console.log('Industry Added!');
        return newusers;
    }).then ((output) => {
        moodcountadd(output);
    })
    .catch((error) => console.log(error));
}

// mood count add
const moodcountadd = (newusers) => {
    csvtojson().fromFile("./assets/mood_tracker.csv").then((mood) => {
        for (let cont1 = 0; cont1 < newusers.length; cont1 = cont1 + 1) {
            let moodcount = 0;
            for (let cont2 = 0; cont2 < mood.length; cont2 = cont2 + 1) {
                if (newusers[cont1].id === mood[cont2].userId){
                    moodcount = moodcount + 1;
                }
            }
            newusers[cont1].amountOfTracks = moodcount;
        }
        console.log('Mood Count Added!');
        return newusers;
    }).then ((output) => {
// file creating
        fs.writeFileSync("newusers.json", JSON.stringify(output), function(err) {
            if (error) throw error;
        });
        console.log('New File Created!');        
    })
    .catch((error) => console.log(error));
}

// function call
industryadd();
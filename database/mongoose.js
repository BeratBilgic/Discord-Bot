trackSchema = require("./schema/tracks.js");

module.exports.countTrackViews = async (track) => {

    let trackDB = await trackSchema.findOne({ url: track.url });

    if(trackDB){
        const newViews = trackDB.views + 1;
        const query = { url: track.url };
        await trackSchema.updateOne(query, { views: newViews});
    }else{
        trackDB = new trackSchema({
            id: track.id,
            title: track.title,
            author: track.author,
            duration: track.duration,
            url: track.url,
            views: 1
        })
        await trackDB.save().catch(err => console.log(err));
    }
};

module.exports.getTrends = async () => {
    let tracksDB = await trackSchema.find().sort({ views: 'desc', test: -1 }).limit(10);
    return tracksDB;
};
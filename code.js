const express = require("express");
const ytdl = require("ytdl-core");
const app = express();
const ytplaylist = require("youtube-playlist-downloader");
const ytfps = require("ytfps");
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "public/index.html");
});

app.get("/videoInfo", async (req, res) => {
  console.log("fetching from ytdl");
  const videoURL = req.query.videoURL;
  const info = await ytdl.getInfo(videoURL);
  res.status(200).json(info);
});

app.get("/download", (req, res) => {
  console.log("inside download api endpoint");
  const videoURL = req.query.videoURL;
  const itag = req.query.itag;
  const title = req.query.title;
  res.header("Content-Disposition", `attachment; filename=${title}.mp4`);
  ytdl(videoURL, {
    filter: (format) => format.itag == itag,
  }).pipe(res);
});

// app.get("/downloadPlaylist", (req, res) => {
//   console.log("Inside download Playlist");
//   const videoURL = req.query.videoURL;
//   ytfps("PLLVBUs9CnYAcKtyAHhCXK_QNPSfEl1zD6")
//     .then((playlist) => {
//       console.log("playlist data", playlist);
//       res.send(playlist);
//     })
//     .catch((err) => {
//       throw err;
//     });
//   console.log("inside download api endpoint");

//   const itag = req.query.itag;
//   const title = req.query.title;
//   res.header("Content-Disposition", `attachment; filename=${title}.mp4`);
//   ytdl(videoURL, {
//     filter: (format) => format.itag == itag,
//   }).pipe(res);
// });

app.listen(5000, () => {
  console.log("server listening on 5000");
});

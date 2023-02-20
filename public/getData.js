const host = "http://localhost:5000/";

document
  .querySelector("#get-video-info-btn")
  .addEventListener("click", function () {
    console.log("inside ajax");
    let videoURL = document.querySelector("#videoURL").value.trim();
    console.log(videoURL);
    if (videoURL.length == 0) {
      alert("please enter link");
      return;
    }
    fetch(host + "videoInfo?videoURL=" + videoURL)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        let detailsNode = {
          thumbnail: document.querySelector(".video-data .thumbnail img"),
          title: document.querySelector(".video-data .info h2"),
          description: document.querySelector(".video-data .info p"),
          videoURL: document.querySelector(".video-data .controls #video-url"),
          downloadOptions: document.querySelector(
            ".video-data .controls #download-options"
          ),
        };
        let html = "";
        for (let i = 0; i < data.formats.length; i++) {
          if (data.formats[i].container != "mp4") {
            continue;
          }
          html += `
            <option value=${data.formats[i].itag}>
            ${data.formats[i].container} - ${data.formats[i].qualityLabel}
            </options>
            `;
          detailsNode.thumbnail.src =
            data.videoDetails.thumbnails[
              data.videoDetails.thumbnails.length - 1
            ].url;
          detailsNode.title.innerText = data.videoDetails.title;
          detailsNode.description.innerText = data.videoDetails.description;

          detailsNode.videoURL.value = videoURL;
          detailsNode.downloadOptions.innerHTML = html;

          document.querySelector(".video-data").style.display = "block";
          document.querySelector(".video-data").scrollIntoView({
            behavior: "smooth",
          });
        }
      })
      .catch((err) => {
        alert("something went wrong");
      });
  });

document.querySelector("#download-btn").addEventListener("click", function () {
  let videoURL = document.querySelector("#video-url").value;
  let itag = document.querySelector("#download-options").value;
  let title = document.querySelector(".video-data .info h2").innerText;
  console.log(title);
  window.open(
    host + "download?videoURL=" + videoURL + "&itag=" + itag + "&title=" + title
  );
});

// document
//   .querySelector("#get-video-info-btn-playlist")
//   .addEventListener("click", function () {
//     let videoURL = document.querySelector("#videoURL").value.trim();
//     console.log(videoURL);
//     window.open(host + "downloadPlaylist?videoURL=" + videoURL);
//     fetch(host + "downloadPlaylist?videoURL=" + videoURL)
//       .then((res) => {
//         return res.json();
//       })
//       .then((data) => {
//         console.log(data);
//       });
//   });


window.audio = null;
fetch("./data.json")
    .then(response => response.json())
    .then(data => audio = data)


function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Trim file extensions like ".mp3"
function trim_ext(filename) {
    return filename.replace(/\.[^/.]+$/, "");
}

$(document).ready(async function() {
    let audioList = $("<div></div>");
    await sleep(1000);
    for(file in audio) {
        console.log(file);
        var file = audio[file];
        let linkElem = $(`<div class='list_item' path='audio/${file.name}.mp3'>${trim_ext(file.name)}</div>`);
        audioList.append(linkElem);
        linkElem.on('click', function() {
            var source = $(this).attr("path");
            $("#active_file").attr("src", source)
            var file = $(this).text();
            get_metadata(file);
        });
    };
    $("#dropzone").html("");
    $("#dropzone").removeClass("loading")
    $("#dropzone").addClass("file_list")
    $("#dropzone").append(audioList);
})

function get_metadata(file) {
    let table = $("<table></table>")
    for (key in audio[file]) {
        let row = `
        <tr>
            <td>${key}</td><td>${audio[file][key]}</td>
        </tr>`
        table.append(row)
    }
    $(".metadata").html("")
    $(".metadata").append(table)
}

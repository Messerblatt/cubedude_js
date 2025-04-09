import os
import json
from mutagen.easyid3 import EasyID3
from mutagen.id3 import ID3NoHeaderError

def extract_metadata(mp3_directory):
    songs_metadata = {}

    for filename in os.listdir(mp3_directory):
        if filename.endswith(".mp3"):
            file_path = os.path.join(mp3_directory, filename)
            try:
                audio = EasyID3(file_path)
                title = audio.get("title", [None])[0]
                if title:
                    metadata = {key: audio.get(key, [''])[0] for key in audio.keys()}
                    songs_metadata[title] = metadata
                else:
                    print(f"Skipping {filename} as it lacks a title metadata.")
            except ID3NoHeaderError:
                print(f"Could not read metadata for {filename}. Skipping file.")
    
    with open('songs.json', 'w') as json_file:
        json.dump(songs_metadata, json_file, indent=4)

if __name__ == "__main__":
    mp3_directory = os.getcwd()
    extract_metadata(mp3_directory)


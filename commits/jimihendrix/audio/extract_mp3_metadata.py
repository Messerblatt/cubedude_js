import os
import json
from mutagen import File as MutagenFile

# Function to get metadata from an mp3 file
def get_mp3_metadata(file_path):
    audio = MutagenFile(file_path, easy=True)
    audio_info = {
        "filename": os.path.basename(file_path),
        "length": audio.info.length if audio.info else None,
        "title": audio.get('title', ['Unknown'])[0],
        "artist": audio.get('artist', ['Unknown'])[0],
        "album": audio.get('album', ['Unknown'])[0],
    }
    return audio_info

# Directory containing the mp3 files
directory = '.'

# List to store metadata for all mp3 files
songs_metadata = []

# Iterate through all .mp3 files in the directory
for filename in os.listdir(directory):
    if filename.endswith('.mp3'):
        file_path = os.path.join(directory, filename)
        metadata = get_mp3_metadata(file_path)
        songs_metadata.append(metadata)

# Save metadata to a JSON file
with open('songs.json', 'w') as json_file:
    json.dump(songs_metadata, json_file, indent=4)

print(f"Metadata for {len(songs_metadata)} songs has been written to songs.json")


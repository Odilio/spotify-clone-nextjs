import { useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlistAtom";
import Song from "./Song";

function Songs() {
    const playlist = useRecoilValue(playlistState);
    console.log('playlista aquy ', playlist?.tracks.items);
    return (
      <div className="text-white overflow-y-scroll h-screen scrollbar-hide">
        
          {playlist?.tracks.items.map((track, i) => (
              <Song key={track.track.id} track={track} order={i}/>
          ))}
      </div>
    );
  }
  
  export default Songs;
  
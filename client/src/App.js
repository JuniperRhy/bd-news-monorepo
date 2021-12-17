import { useEffect, useState } from "react";

import { Howl } from "howler";
import useSound from "use-sound";

import Background from "./Background/Background";
import BDStandard from "./RactiveSVGs/BD1Standard";
import BDRun from "./RactiveSVGs/BDRun";
import NewsFeed from "./NewsFeed";

import MuteButton from "./RactiveSVGs/MuteButton";

import BDsound1 from "./Media/audio/1BD1.mp3";
import BDsound2 from "./Media/audio/2BD1.mp3";
import BDsound3 from "./Media/audio/3BD1.mp3";
import BDsound4 from "./Media/audio/4BD1.mp3";
import BDsound5 from "./Media/audio/5BD1.mp3";
import BDsound6 from "./Media/audio/6BD1.mp3";
import BDBeep from "./Media/audio/BDBeep.mp3";
import HoloActiveSound from "./Media/audio/Holoactive.mp3";
import HoloOff from "./Media/audio/Holooff.mp3";

import "./App.css";

function App() {
  const [isPageMuted, setIsPageMuted] = useState(true);
  const [isBDClicked, setIsBDClicked] = useState(false);
  const [isBDHover, setIsBDHover] = useState(false);
  const [changeFont, setChangeFont] = useState(false);
  const [hoverChangeFont, setHoverChangeFont] = useState(false);
  const BDsoundArr = [
    BDsound1,
    BDsound2,
    BDsound3,
    BDsound4,
    BDsound5,
    BDsound6,
  ];

  const randomBeeps = () => {
    return BDsoundArr[Math.floor(Math.random() * 6)];
  };

  const BDsound = new Howl({
    src: randomBeeps(),
    volume: isPageMuted ? "0" : "0.05",
    loop: false,
  });

  const Beep = new Howl({
    src: BDBeep,
    volume: isPageMuted ? "0" : "0.05",
    loop: false,
  });

  const HoloOffSound = new Howl({
    src: HoloOff,
    volume: isPageMuted ? "0" : "0.05",
    loop: false,
  });

  const [play, { stop }] = useSound(HoloActiveSound, {
    volume: isPageMuted ? "0" : "0.1",
    loop: true,
  });

  useEffect(() => {
    isBDClicked ? play() : HoloOffSound.play() && stop();
  }, [isBDClicked]);

  useEffect(() => {
    isBDHover ? BDsound.play() : BDsound.stop();
  });

  window.scrollTo(0, 0);

  return (
    <div
      className="OuterMost"
      style={{ fontFamily: changeFont ? "StarJedi" : "Aurebesh" }}
    >
      <div className="BDRunContainer">
        <BDRun />
      </div>

      <div className="Non-IntroWapper">
        <Background />
        <MuteButton isPageMuted={isPageMuted} setIsPageMuted={setIsPageMuted} />
        <h1
          style={{
            marginTop: changeFont ? "0vh" : "1vh",
            marginBottom: changeFont ? "-11vh" : "-8vh",
            zIndex: "top",
          }}
          className={changeFont ? "" : "Outline"}
        >
          BD-1's Star Wars News Feed
        </h1>

        <button
          onMouseEnter={() => setHoverChangeFont(!hoverChangeFont)}
          onMouseLeave={() => setHoverChangeFont(!hoverChangeFont)}
          onClick={() => {
            setChangeFont(!changeFont);
            Beep.play();
          }}
          style={{
            background: changeFont
              ? "radial-gradient(#71e3ff, #dbf4ffb0, #b7e8ff18)"
              : "rgba(85, 24, 24)",
            fontFamily: changeFont ? "Aurebesh" : "StarJedi",
            webkitTextStrokeColor: changeFont
              ? "transparent"
              : "rgb(219, 190, 24)",
            color: changeFont ? "rgb(66, 66, 66)" : "rgb(134, 116, 14)",
            boxShadow: hoverChangeFont
              ? "0 0 50px rgb(255, 255, 255)"
              : " 0 0 50px transparent",

            border: hoverChangeFont
              ? "double 0.1rem goldenrod"
              : "double 0.1rem rgba(218, 165, 32, 0.466)",
          }}
        >
          Change Font
        </button>

        <NewsFeed isBDClicked={isBDClicked} changeFont={changeFont} />

        <BDStandard
          changeFont={changeFont}
          isBDClicked={isBDClicked}
          setIsBDClicked={setIsBDClicked}
          isBDHover={isBDHover}
          setIsBDHover={setIsBDHover}
        />
      </div>
    </div>
  );
}

export default App;

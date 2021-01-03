import React, { useState, useEffect } from "react";
import styles from "../../styles/Join.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import SimpleButton from "../../components/SimpleButton";
import Error from "../../components/Error";
import ErrorGameNotFound from "../../components/ErrorGameNotFound";
import ErrorFullGame from "../../components/ErrorFullGame";
import ErrorWaiting from "../../components/ErrorWaiting";
import Avatar from "../../components/Avatar";
import game from "../api/game";

const origin =
  process.env.NODE_ENV == "production"
    ? "https://covalent.app/menu"
    : "http://localhost:3000/menu";

export default function JoinGame({ error, gameCheck, gameFull }) {
  const [playerName, setName] = useState("");
  const [badName, nameError] = useState(false);
  const [joined, setJoin] = useState(false);
  const [addedId, playerId] = useState(null);
  const [addedGameId, gameId] = useState(gameCheck ? gameCheck.id : null);
  const [waiting, gameLoading] = useState(null);
  const [mobile, setMobile] = useState(false);
  const [firefox, setFirefox] = useState(false);
  const [chrome, setChrome] = useState(true);
  const [gamePlayers, addPlayers] = useState([]);
  const [ready, setReady] = useState(false);
  const [full, setFull] = useState(gameFull);

  const router = useRouter();

  // Implement: if the IDs are in local storage & game ID matches local ID, load the player into the existing game

  // Also: maybe implement framer motion for the new player avatars to make it look nicer

  //checks chrome, firefox, or mobile
  useEffect(() => {
    //really long regex function to check mobile devices, use if nothing else works
    /*(function (a) {
            setMobile(
                /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
                    a
                ) ||
                    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                        a.substr(0, 4)
                    )
            );
        })(navigator.userAgent || navigator.vendor || window.opera);*/

    setMobile(navigator.userAgent.indexOf("Mobi") > -1);
    setFirefox(navigator.userAgent.indexOf("Firefox") > -1);
    setChrome(navigator.userAgent.indexOf("Chrome") > -1);
  }, [mobile, firefox, chrome]);

  /* 
    Puts IDs into local storage
    */

  useEffect(() => {
    if (addedId && addedGameId) {
      setCookie(null, "gameID", addedGameId, {
        maxAge: 24 * 60 * 60,
        path: "/",
      });
      setCookie(null, "playerID", addedId, {
        maxAge: 24 * 60 * 60,
        path: "/",
      });
    }
  }, [addedId, addedGameId]);

  /*
    Updates when player name is set and submitted
    */

  useEffect(() => {
    if (joined) {
      joinGame();
    }

    async function joinGame() {
      let res, data;
      res = await fetch(
        origin +
          "/api/join?playerName=" +
          playerName +
          "&code=" +
          gameCheck.code
      );
      data = await res.json();
      if (data.playerID) {
        playerId(data.playerID);
        gameLoading(true);
      } else {
        setFull(true);
      }
    }
  }, [joined]);

  /*
    Checks if game has started
    */

  useEffect(() => {
    if (waiting) {
      checkGame();
    }

    async function checkGame() {
      /* 
            Slow down succeeding API calls to check for new players

            https://www.pentarem.com/blog/how-to-use-settimeout-with-async-await-in-javascript/
            */

      function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }

      function appendPlayer(player, index) {
        playerList.push(<Avatar key={index} name={player} />);
      }

      function redirectPlayer() {
        window.location.replace(origin);
      }

      let res, data;
      let playerList = [];
      while (waiting) {
        // Implement: only allow to check a certain number of times
        res = await fetch(origin + "/api/game?id=" + addedGameId);
        data = await res.json();
        if (data.players.length >= 0) {
          data.players.forEach((player, i) => appendPlayer(player.name, i));
          addPlayers(playerList);
          playerList = [];
        } else if (data.enabled) {
          router.push("/submit");
          break;
        }
        let playerStatus = data.players.some((player) => player.id === addedId);
        if (!playerStatus) redirectPlayer();
        if (!ready) setReady(true);
        await delay(1000);
      }
    }
  }, [waiting]);

  /*nameError disappears after 3 seconds*/
  useEffect(() => {
    if (badName) {
      setTimeout(() => {
        nameError(false);
      }, 3000);
    }
  }, [badName]);

  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Remote team-building made super simple"
        />
        <link rel="apple-touch-icon" href="/images/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <title>Covalent | Join Game</title>
      </Head>
      <style jsx global>{`
        body {
          width: 100vw;
          height: 100vh;
          overflow: hidden;
        }
      `}</style>

      {error && (
        <Error
          text={
            "An internal error occurred. We're sorry for the inconvenience."
          }
        />
      )}

      {((!chrome && !firefox) || mobile) && (
        <div>
          <Error
            noLink={true}
            text="Covalent currently only supports Google Chrome or Mozilla Firefox on a computer."
          />
        </div>
      )}

      {!gameCheck && !error && (
        <div>
          <ErrorGameNotFound link={"/menu"} />
        </div>
      )}

      {(chrome || firefox) && !ready && !error && !full && gameCheck && (
        <div className={styles.joinContainer}>
          <div className={styles.join}>
            <h2>Joining {gameCheck.host}'s game</h2>
            <i className={styles.instructions}>
              Instructions from host: {gameCheck.name}
            </i>
            <input
              type="text"
              className={styles.name}
              placeholder="ENTER YOUR NAME"
              onChange={(event) => setName(event.target.value)}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  if (playerName) setJoin(true);
                  else nameError(true);
                }
              }}
            />
            {!joined ? (
              <SimpleButton
                name="join game"
                type="join"
                onClick={() => {
                  if (playerName) setJoin(true);
                  else nameError(true);
                }}
              />
            ) : (
              <SimpleButton name="joining..." type="join" />
            )}
          </div>
          {badName && <p>Please enter a valid name.</p>}
        </div>
      )}

      {ready && !full && (
        <div className={styles.joinedOuter}>
          <div className={styles.joinedContainer}>
            <div className={styles.waiting}>
              <ErrorWaiting
                text={`Waiting on ${gameCheck.host} to start the game.`}
              />
            </div>
            <div className={styles.joined}>
              <hr className={styles.line} />
              <h1>
                Joined: {gamePlayers.length}/{gameCheck.playerNum}
              </h1>

              <div id="players" className={styles.center}>
                {gamePlayers}
              </div>
            </div>
          </div>
        </div>
      )}

      {full && (
        <div>
          <ErrorFullGame link={"/menu"} />
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps({ params }) {
  let res,
    data,
    error = null;
  let gameCheck = {};
  let gameFull = false;
  let lowerCaseCode = params.game.toLowerCase();
  try {
    res = await fetch(origin + "/api/game?code=" + lowerCaseCode);
    data = await res.json();
    // Game doesn't exist
    if (!data.id) {
      gameCheck = null;
      // Check if game is already full / enabled
    } else if (data.full || data.enabled) {
      gameFull = true;
    } else {
      gameCheck.code = lowerCaseCode;
      gameCheck.host = data.host;
      gameCheck.name = data.name;
      gameCheck.id = data.id;
      gameCheck.playerNum = data.playerNum;
    }
  } catch (err) {
    error = true;
    console.log(err);
  }

  return {
    props: {
      error,
      gameCheck,
      gameFull,
    },
  };
}

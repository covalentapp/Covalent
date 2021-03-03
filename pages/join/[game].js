import React, { useState, useEffect } from "react";
import styles from "../../styles/Join.module.css";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import SimpleButton from "../../components/SimpleButton";
import Error from "../../components/Error";
import ErrorGameNotFound from "../../components/ErrorGameNotFound";
import ErrorFullGame from "../../components/ErrorFullGame";
import ErrorWaiting from "../../components/ErrorWaiting";
var mixpanel = require("mixpanel-browser");

const origin =
  process.env.NODE_ENV == "production"
    ? "https://covalent.app"
    : "http://localhost:3000";

export default function JoinGame({ error, gameCheck, gameFull }) {
  const [playerName, setName] = useState("");
  const [joined, setJoin] = useState(false);
  const [addedId, playerId] = useState(null);
  const [addedGameId, gameId] = useState(gameCheck ? gameCheck.id : null);
<<<<<<< HEAD
  const [waiting, gameLoading] = useState(null);
=======
  const [hostId, setHostId] = useState('');
  const [hostName, setHost] = useState('');
  const [waiting, gameLoading] = useState(existingPlayer ? true : false);
  const [mobile, setMobile] = useState(false);
  const [firefox, setFirefox] = useState(false);
  const [chrome, setChrome] = useState(true);
  const [gamePlayers, addPlayers] = useState([]);
  const [ready, setReady] = useState(existingPlayer ? true : false);
  const [full, setFull] = useState(gameFull);
  const [showModal, setShowModal] = useState(false);
>>>>>>> 3c4062e7d0c3d8fa74f99c7cdcd504d168629d77

  const router = useRouter();

  // Implement: if the IDs are in local storage & game ID matches local ID, load the player into the existing game

  // Also: maybe implement framer motion for the new player avatars to make it look nicer

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
        gameFull = true;
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

      let res, data;

      while (waiting) {
        // Implement: only allow to check a certain number of times
        res = await fetch(origin + "/api/game?id=" + addedGameId);
        data = await res.json();
<<<<<<< HEAD
=======
        setHost(data.host);
        setHostId(data.hostID);
        if (data.players.length >= 0) {
          data.players.forEach((player, i) => appendPlayer(player, i));
          addPlayers(playerList);
          playerList = [];
        }
>>>>>>> 3c4062e7d0c3d8fa74f99c7cdcd504d168629d77
        if (data.enabled) {
          router.push("/submit");
          break;
        }
        await delay(2000);
      }
    }
  }, [waiting]);

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

      {error && (
        <Error
          text={
            "An internal error occurred. We're sorry for the inconvenience."
          }
        />
      )}

      {!gameCheck && !error && (
        <div className={styles.join}>
          <ErrorGameNotFound link={"/menu"} />
        </div>
      )}

      {!joined && !error && !gameFull && gameCheck && (
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
          ></input>
          <SimpleButton
            name="join game"
            type="join"
            onClick={() => {
              if (playerName) {
                setJoin(true);
              }
              mixpanel.init("92c1e92aad6c8ad0239edbd97ceac712"); // MIXPANEL: Joined Players
              if (process.env.NODE_ENV == "production") {
                mixpanel.track("Joined Players");
              }
            }}
          />
        </div>
      )}

<<<<<<< HEAD
      {joined && !gameFull && (
        <div className={styles.join}>
          <ErrorWaiting
            text={`Waiting on ${gameCheck.host} to start the game.`}
          />
=======
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
                Joined: {gamePlayers.length + 1}/{gameCheck.playerNum + 1}
              </h1>

              <div id="players" className={styles.center}>
              <Avatar
                  id={addedGameId}
                  host={hostId}
                  name={hostName}
                  isHost={true}
                />
                {gamePlayers}
              </div>
            </div>
          </div>
        </div>
      )}
      {showModal && ready && (
        <div>
          <RedirectModal link={"/menu"} />
>>>>>>> 3c4062e7d0c3d8fa74f99c7cdcd504d168629d77
        </div>
      )}

      {gameFull && (
        <div className={styles.join}>
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

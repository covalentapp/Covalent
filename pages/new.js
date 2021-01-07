import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import SimpleButton from "../components/SimpleButton";
import Avatar from "../components/Avatar";
import styles from "../styles/Settings.module.css";
import Error from "../components/Error";
import { motion } from "framer-motion";

/*This file is for the Settings component for Covalent
@Catherine*/

const origin =
  process.env.NODE_ENV == "production"
    ? "https://covalent.app"
    : "http://localhost:3000";

export default function Settings() {
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState(30);
  const [players, setPlayers] = useState(2);
  const [instructions, setInstructions] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [started, setStart] = useState(false);
  const [searching, setOpen] = useState(false);
  const [gameId, setId] = useState("");
  const [hostId, selfId] = useState("");
  const [gamePlayers, addPlayers] = useState([]);
  const [mobile, setMobile] = useState(false);
  const [firefox, setFirefox] = useState(false);
  const [chrome, setChrome] = useState(true);
  const [small, setSmall] = useState(false);

  const router = useRouter();

  const changePage = (e, destination) => {
    e.preventDefault();
    router.push(destination);
  };

  /* 
    Slow down succeeding API calls to check for new players

    https://www.pentarem.com/blog/how-to-use-settimeout-with-async-await-in-javascript/
    */

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /*
    deletes copied, error messages after 5 secs 
    */

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 5000);
    }
    if (error) {
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  }, [copied, error]);

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

  //checks window size
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 858 || window.innerHeight < 630) setSmall(true);
      else setSmall(false);
    }

    window.addEventListener("resize", handleResize);
  });

  /*
    LOCAL STORAGE
    */

  useEffect(() => {
    if (gameId && hostId) {
      setCookie(null, "gameID", gameId, {
        maxAge: 24 * 60 * 60,
      });
      setCookie(null, "playerID", hostId, {
        maxAge: 24 * 60 * 60,
      });
    }
  }, [gameId, hostId]);

  /*
    ENABLE GAME
    */

  useEffect(() => {
    if (enabled) {
      createGame();
    }

    async function createGame() {
      setCode("loading");
      await fetch(
        origin +
          "/api/new?host=" +
          name +
          "&name=" +
          instructions +
          "&playerNum=" +
          players +
          "&playerSec=" +
          time
      )
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            selfId(data.playerID);
            setId(data.gameID);
            setCode(data.code);
            setOpen(true);
          } else {
            setError(data.error);
          }
        });
    }
  }, [enabled]);

  /*
    SEARCH FOR PLAYERS
    */

  useEffect(() => {
    if (searching) {
      searchPlayers();
    }

    async function searchPlayers() {
      async function deletePlayer(id, host, index) {
        fetch(`${origin}/api/remove?id=${id}&host=${host}&player=${index}`);
      }

      function appendPlayer(player, index) {
        playerList.push(
          <Avatar
            index={index}
            id={gameId}
            host={hostId}
            name={player}
            deletePlayer={deletePlayer}
          />
        );
      }

      let res, data;
      let playerList = [];

      while (searching) {
        // Implement: only allow to check a certain number of times
        res = await fetch(origin + "/api/game?id=" + gameId);
        data = await res.json();
        if (data.players.length >= 0) {
          data.players.forEach((player, index) => appendPlayer(player, index));
          addPlayers(playerList);
          playerList = [];
        } else if (data.enabled) {
          break;
        }
        await delay(1000);
      }
    }
  }, [searching]);

  /*
    START GAME
    */

  useEffect(() => {
    if (started) {
      setError("");
      enableGame();
    }

    async function enableGame() {
      let res, data;
      res = await fetch(
        origin + "/api/enable?gameId=" + gameId + "&hostId=" + hostId
      );
      data = await res.json();
      if (!data.enabled) {
        setStart(false);
        setError("There are no players in this game!");
      } else {
        await delay(1000);
        router.push("/submit");
      }
    }
  }, [started]);

    return (
        <div className={styles.settingsBackground}>
            <style jsx global>{`
                body {
                    text-align: center;
                    width: 100%;
                    overflow: hidden;
                }
            `}</style>
            <Head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta name="theme-color" content="#000000" />
                <meta
                    name="description"
                    content="Remote team-building made super simple"
                />
                <link rel="apple-touch-icon" href="/images/logo192.png" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="icon" href="/favicon.ico" />
                <title>Covalent | New Game</title>
                <meta property="og:title" content="Covalent | New Game" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://covalent.app/new" />
                <meta property="og:image" content="https://covalent.app/images/logo192.png" />
                <meta property="og:image:type" content="image/png" />
                <meta property="og:image:width" content="192" />
                <meta property="og:image:height" content="192" />
                <meta property="og:image:alt" content="Covalent logo" />
            </Head>
            {(!chrome && !firefox) || mobile ? (
                <div>
                    <Error noLink={true} text="Covalent currently only supports Google Chrome or Mozilla Firefox on a computer." />
                </div>
            ) : (
                <div>
                    <motion.div
                        initial="initial"
                        animate={small ? "enter" : "exit"}
                        exit="exit"
                        variants={{
                            initial: {
                                opacity: 0,
                                display: "none",
                            },
                            enter: {
                                opacity: 1,
                                display: "block",
                                transition: {
                                    duration: 0.1,
                                    ease: "linear",
                                },
                            },
                            exit: {
                                opacity: 0,
                                display: "none",
                                transition: {
                                    duration: 0.1,
                                    ease: "linear",
                                },
                            },
                        }}
                    >
                        <div className={styles.overlay} />
                        <div className={styles.errorMsg}>
                            <Error noLink={true} text="Please enlarge your browser to continue enjoying Covalent." />
                        </div>
                    </motion.div>
                    <header>
                        <div className={styles.logo}>
                            <img
                                src="/images/logo.svg"
                                className={styles.logoImg}
                                alt="Covalent Logo"
                            ></img>
                            <div>COVALENT</div>
                        </div>
                        <h1>HOST A GAME OF 2 TRUTHS AND A LIE!</h1>
                        <div className={styles.button}>
                            <button
                                className={styles.exit}
                                onClick={(e) => changePage(e, "/menu")}
                            >
                                Exit
                            </button>
                        </div>
                    </header>
                    <div className={styles.body}>
                        <div className={styles.top}>
                            <h1>Instructions</h1>
                            <p>
                                <i>
                                    In 2 Truths and a Lie, you say (or in this
                                    case, type) 3 statements about yourself, 2
                                    of which should be truths and 1 of which
                                    should be a lie. However, other players do
                                    not know which statement is a lie! Their
                                    objective is to guess which one is the lie,
                                    and your objective is to make them choose
                                    the wrong statement as the lie, so make the
                                    truths as interesting as possible!
                                </i>
                            </p>
                            <p>
                                As the host, write instructions for your
                                teammates and choose the settings for your game
                                below:
                            </p>
                        </div>
                        <div className={styles.settingsForm} id="settings-form">
                            <b>
                                <label htmlFor="rounds">Your Name: </label>
                            </b>
                            <input
                                className={styles.long}
                                type="text"
                                placeholder="John Doe"
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                                readOnly={enabled}
                            />
                            <b>
                                <label htmlFor="time">
                                    Time Limit (30-300s):{" "}
                                </label>
                            </b>
                            <input
                                className={styles.settingsInput}
                                type="number"
                                min="30"
                                max="300"
                                step="30"
                                defaultValue="30"
                                onChange={(event) =>
                                    setTime(event.target.value)
                                }
                                readOnly={enabled}
                            />
                            <b>
                                <label htmlFor="players">
                                    Player Count (1-50):{" "}
                                </label>
                            </b>
                            <input
                                className={styles.settingsInput}
                                type="number"
                                min="1"
                                max="50"
                                defaultValue="2"
                                onChange={(event) =>
                                    setPlayers(event.target.value)
                                }
                                readOnly={enabled}
                            />
                            {/*<b>
                        <label htmlFor="players">Number of Rounds (1-10): </label>
                    </b>
                    <input
                        className={styles.settingsInput}
                        type="number"
                        min="1"
                        max="10"
                        defaultValue="2"
                        onChange={(event) => setPlayers(event.target.value)}
                        readOnly={enabled}
                    />*/}
              <br />

              <b>
                <label htmlFor="instructions">Instructions For Players:</label>
              </b>
              <br />
              <textarea
                className={styles.instructions}
                id="instructions"
                rows="4"
                cols="50"
                placeholder="What do you want to tell your players?"
                onChange={(event) => setInstructions(event.target.value)}
                readOnly={enabled}
              ></textarea>
              <br />
              <b>
                <label>
                  Code:
                  <input
                    className={styles.settingsInput + " " + styles.code}
                    type="text"
                    value={code || "code"}
                    id="code"
                    readOnly
                  />
                </label>
              </b>
              <b>
                <label>
                  Link:
                  <input
                    className={styles.settingsInput + " " + styles.long}
                    type="text"
                    value={"covalent.app/join/" + (code || "code")}
                    id="link"
                    readOnly
                  />
                </label>
              </b>
              {searching && (
                <SimpleButton
                  name="copy link"
                  type="copy"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      "https://covalent.app/join/" + code
                    );
                    setCopied(true);
                  }}
                />
              )}
              {copied && <b>Copied!</b>}
              <br />
              {!enabled && (
                <SimpleButton
                  name="let's go!"
                  type="join"
                  onClick={() => {
                    setError("");
                    if (
                      instructions == "" ||
                      name == "" ||
                      players > 50 ||
                      players < 1 ||
                      time > 300 ||
                      time < 30
                    ) {
                      setError("Please fill in all the fields correctly.");
                    } else {
                      setEnabled(true);
                    }
                  }}
                />
              )}

              {searching && !started && (
                <SimpleButton
                  name="start"
                  type="join"
                  onClick={() => {
                    setStart(true);
                  }}
                />
              )}

              {started && <SimpleButton name="starting..." type="join" />}
              <p>{error}</p>
            </div>
            {searching && (
              <div className={styles.joined}>
                <hr className={styles.line} />
                <h1>
                  Joined: {gamePlayers.length}/{players}
                </h1>

                <div id="players" className={styles.center}>
                  {gamePlayers}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

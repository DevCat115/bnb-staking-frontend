import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import img_bnb from "../assets/bnb.png";
import img_bottom1 from "../assets/48711064.png";
import img_bottom2 from "../assets/image.png";
import { useWallet } from "use-wallet";
import { ethers } from "ethers";

export default function MainFlex() {
  const [headerClass, setHeaderClass] = useState("");
  const [headerClass1, setHeaderClass1] = useState("");
  const viewMenu = () => {
    setHeaderClass("header_responsive");
    setHeaderClass1("");
  };
  const hideMenu = () => {
    setHeaderClass1("header_responsive_hide");
    setHeaderClass("");
  };

  /* ------------ connect wallet --------------*/

  const wallet = useWallet();
  var styledAddress = wallet.account
    ? wallet.account.slice(0, 4) + "..." + wallet.account.slice(-4)
    : "";

  //check connection
  const handleChainChanged = (chainId) => {
    let { ethereum } = window;
    if (ethereum.isConnected() && Number(chainId) === 4002) {
      onConnect();
    }
  };

  const onConnect = () => {
    if (wallet.status !== "connected") {
      wallet.connect().catch((err) => {
        alert("please check metamask!");
      });
    }
  };

  const disconnect = () => {
    if (wallet.status === "connected") {
      wallet.reset();
    }
  };
  useEffect(() => {
    const checkConnection = async () => {
      let { ethereum } = window;
      if (ethereum !== undefined) {
        const chainId = await ethereum.request({ method: "eth_chainId" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length !== 0 && Number(chainId) === 4002) {
          onConnect();
        }
        ethereum.on("chainChanged", handleChainChanged);
      }
    };
  }, []);
  return (
    <>
      <div className="container">
        <div className="header" style={{}}>
          <div className="header_logo">
            <img src={img_bnb} className="header_logo_img" alt="logo" />
            <div className="header_logo_text">
              <h3>BNBStaker</h3>
            </div>
          </div>

          <div className={"header_middle " + headerClass + headerClass1}>
            <button onClick={hideMenu} className="close_btn">
              X
            </button>
            <a
              className="header_audit_btn"
              href="https://hazecrypto.net/audit/BNBStaker-xyz"
              target="new"
            >
              <h3>Audit</h3>
            </a>
            <a href="https://t.me/+fyj9hqPxLUFlMDIx" target="new">
              <h3>Telegram</h3>
            </a>
            <a href="https://discord.gg/v6bQP4aqPP" target="new">
              <h3>Discord</h3>
            </a>
            <a
              href="https://medium.com/@BNBStakerClub/bnbstaker-xyz-earn-upto-20-daily-on-your-staked-bnb-token-d2769a1c7cb2"
              target="new"
            >
              <h3>Documentation</h3>
            </a>
            <a
              href="https://medium.com/@BNBStakerClub/bnbstaker-club-faq-6d6e2820d392"
              target="new"
            >
              <h3>FAQ</h3>
            </a>
            <div className="header_audit_btn1">
              {wallet.status === "connected" ? (
                <button
                  className="header_connect_btn"
                  style={{
                    textTransform: "none",
                  }}
                  onClick={disconnect}
                >
                  <h3 id="connect-label">{styledAddress}</h3>
                </button>
              ) : (
                <button
                  onClick={() => onConnect()}
                  className="header_connect_btn"
                  style={{
                    textTransform: "none",
                  }}
                >
                  {wallet.status === "connecting" ? (
                    <div>
                      <span
                        className="spinner-border"
                        role="status"
                        style={{
                          width: "1.5em",
                          height: "1.5em",
                          marginRight: 10,
                        }}
                      ></span>
                      <span className="sr-only ">Loading...</span>
                    </div>
                  ) : (
                    <div>
                      <h3 id="connect-label">Connect</h3>
                    </div>
                  )}
                </button>
              )}
            </div>
          </div>
          <div className="header_right">
            {wallet.status === "connected" ? (
              <button
                className="header_connect_btn"
                style={{
                  textTransform: "none",
                }}
                onClick={disconnect}
              >
                <h3 id="connect-label">{styledAddress}</h3>
              </button>
            ) : (
              <button
                onClick={() => onConnect()}
                className="header_connect_btn"
                style={{
                  textTransform: "none",
                }}
              >
                {wallet.status === "connecting" ? (
                  <div>
                    <span
                      className="spinner-border"
                      role="status"
                      style={{
                        width: "1.5em",
                        height: "1.5em",
                        marginRight: 10,
                      }}
                    ></span>
                    <span className="sr-only ">Loading...</span>
                  </div>
                ) : (
                  <div>
                    <h3 id="connect-label">Connect</h3>
                  </div>
                )}
              </button>
            )}
          </div>
          <button onClick={viewMenu} className="header_menu_btn">
            <div></div>
            <div></div>
            <div></div>
          </button>
        </div>
        <Grid container style={{ marginTop: "100px" }} justifyContent="center">
          <Grid item xs={12} md={6}>
            <div className="home_f_money">
              <a
                href="https://medium.com/@BNBStakerClub/10-000-giveaway-2e551c054bcb"
                target="new"
                className="home_f_money_btn"
              >
                10000$ GIVEAWAY 🎉
              </a>
              <h1>
                Stake{" "}
                <span style={{ color: "#FFFF00" }} className="cashtag">
                  $BNB
                </span>
              </h1>
              <h1>Earn up to 8.7% daily</h1>
            </div>
          </Grid>
          <Grid item xs={12} md={6} style={{ textAlign: "right" }}>
            <img src={img_bnb} className="home_img_bnb" alt="bnb" />
          </Grid>
        </Grid>
        <Grid container justifyContent="center" style={{ marginTop: "-30px" }}>
          <Grid item xs={12} md={4}>
            <div className="home_s_grp">
              <div className="glass">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="iconify iconify--cryptocurrency"
                  width="50"
                  height="50"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 32 32"
                  data-icon="cryptocurrency:bnb"
                  data-width="50"
                  data-height="50"
                  style={{ color: "yellow" }}
                >
                  <path
                    fill="currentColor"
                    d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16s-7.163 16-16 16zm-3.884-17.596L16 10.52l3.886 3.886l2.26-2.26L16 6l-6.144 6.144l2.26 2.26zM6 16l2.26 2.26L10.52 16l-2.26-2.26L6 16zm6.116 1.596l-2.263 2.257l.003.003L16 26l6.146-6.146v-.001l-2.26-2.26L16 21.48l-3.884-3.884zM21.48 16l2.26 2.26L26 16l-2.26-2.26L21.48 16zm-3.188-.002h.001L16 13.706L14.305 15.4l-.195.195l-.401.402l-.004.003l.004.003l2.29 2.291l2.294-2.293l.001-.001l-.002-.001z"
                  ></path>
                </svg>
              </div>
              <div className="home_s_grp_text1">
                <h3>Total Staked</h3>
              </div>
              <h2>
                <span id="totalStaked">2667.5</span>{" "}
                <span className="unit">BNB</span>
              </h2>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className="home_s_grp">
              <div className="glass">
                <div className="icon">💰</div>
              </div>
              <div className="home_s_grp_text1">
                <h3>Contract Balance</h3>
              </div>
              <h2>
                <span id="totalStaked">441.5</span>{" "}
                <span className="unit">BNB</span>
              </h2>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className="home_s_grp">
              <div className="glass">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="iconify iconify--cryptocurrency"
                  width="50"
                  height="50"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 32 32"
                  data-icon="cryptocurrency:bnb"
                  data-width="50"
                  data-height="50"
                  style={{ color: "yellow" }}
                >
                  <path
                    fill="currentColor"
                    d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16s-7.163 16-16 16zm-3.884-17.596L16 10.52l3.886 3.886l2.26-2.26L16 6l-6.144 6.144l2.26 2.26zM6 16l2.26 2.26L10.52 16l-2.26-2.26L6 16zm6.116 1.596l-2.263 2.257l.003.003L16 26l6.146-6.146v-.001l-2.26-2.26L16 21.48l-3.884-3.884zM21.48 16l2.26 2.26L26 16l-2.26-2.26L21.48 16zm-3.188-.002h.001L16 13.706L14.305 15.4l-.195.195l-.401.402l-.004.003l.004.003l2.29 2.291l2.294-2.293l.001-.001l-.002-.001z"
                  ></path>
                </svg>
              </div>
              <div className="home_s_grp_text1">
                <h3>BNB Price</h3>
              </div>
              <h2>
                <span id="totalStaked">$435.5</span>
              </h2>
            </div>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" style={{ marginTop: "100px" }}>
          <Grid item xs={12} md={5} lg={4}>
            <div className="home_t_grp">
              <div className="filler-header">
                <h2>Plan 1</h2>
                <div className="days">
                  <h3>low risk</h3>
                </div>
              </div>
              <div className="filler-body">
                <div className="value">
                  <h3>Investment Term</h3>
                  <div className="lockup">
                    <h1>14 days</h1>
                  </div>
                </div>
                <div className="value">
                  <h3>Investment Strategy</h3>
                  <div className="horizontal-group">
                    <h2>daily return</h2>
                    <h2>7%</h2>
                  </div>
                  <div className="horizontal-group">
                    <h2>auto-reinvested</h2>
                    <h2>14 times</h2>
                  </div>
                  <div className="horizontal-group">
                    <h2>total return</h2>
                    <h2>157.9%</h2>
                  </div>
                  <h3> </h3>
                  <div className="horizontal-group-alt">
                    <h3>
                      Withdrawal Tax <br />
                      <span style={{ fontSize: "smaller" }}>
                        Goes back directly into the contract
                      </span>
                    </h3>
                    <h3>-15%</h3>
                  </div>
                </div>
                <div className="value">
                  <div className="roi-group">
                    <div className="value">
                      <h3>Deposit</h3>
                      <h2>
                        <span id="deposit_left_0">1</span>{" "}
                        <span className="unit">BNB</span>
                      </h2>
                    </div>
                    <svg
                      className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                      focusable="false"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      data-testid="ArrowRightAltIcon"
                    >
                      <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z"></path>
                    </svg>
                    <div className="value">
                      <h3>Receive</h3>
                      <h2>
                        <span id="deposit_right_0">3.43</span>{" "}
                        <span className="unit">BNB</span>
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="deposit">
                  <h3>Deposit Amount</h3>
                  <div className="deposit-group">
                    <div className="input-group">
                      <input
                        id="deposit_value_0"
                        type="number"
                        step="0.1"
                        min="0.1"
                        max="100000"
                        placeholder="0.1"
                        required=""
                        defaultValue={""}
                      />
                      <h3>BNB</h3>
                    </div>
                    <button id="deposit_0" disabled="">
                      <h4>Deposit</h4>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={5} lg={4}>
            <div className="home_t_grp">
              <div className="filler-header">
                <h2>Plan 2</h2>
                <div className="days">
                  <h3>MODERATE RISK</h3>
                </div>
              </div>
              <div className="filler-body">
                <div className="value">
                  <h3>Investment Term</h3>
                  <div className="lockup">
                    <h1>21 days</h1>
                  </div>
                </div>
                <div className="value">
                  <h3>Investment Strategy</h3>
                  <div className="horizontal-group">
                    <h2>daily return</h2>
                    <h2>7%</h2>
                  </div>
                  <div className="horizontal-group">
                    <h2>auto-reinvested</h2>
                    <h2>14 times</h2>
                  </div>
                  <div className="horizontal-group">
                    <h2>total return</h2>
                    <h2>157.9%</h2>
                  </div>
                  <h3> </h3>
                  <div className="horizontal-group-alt">
                    <h3>
                      Withdrawal Tax <br />
                      <span style={{ fontSize: "smaller" }}>
                        Goes back directly into the contract
                      </span>
                    </h3>
                    <h3>-15%</h3>
                  </div>
                </div>
                <div className="value">
                  <div className="roi-group">
                    <div className="value">
                      <h3>Deposit</h3>
                      <h2>
                        <span id="deposit_left_0">1</span>{" "}
                        <span className="unit">BNB</span>
                      </h2>
                    </div>
                    <svg
                      className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                      focusable="false"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      data-testid="ArrowRightAltIcon"
                    >
                      <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z"></path>
                    </svg>
                    <div className="value">
                      <h3>Receive</h3>
                      <h2>
                        <span id="deposit_right_0">3.43</span>{" "}
                        <span className="unit">BNB</span>
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="deposit">
                  <h3>Deposit Amount</h3>
                  <div className="deposit-group">
                    <div className="input-group">
                      <input
                        id="deposit_value_0"
                        type="number"
                        step="0.1"
                        min="0.1"
                        max="100000"
                        placeholder="0.1"
                        required=""
                        defaultValue={""}
                      />
                      <h3>BNB</h3>
                    </div>
                    <button id="deposit_0" disabled="">
                      <h4>Deposit</h4>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={5} lg={4}>
            <div className="home_t_grp">
              <div className="filler-header">
                <h2>Plan 3</h2>
                <div className="days">
                  <h3>HIGH RISK</h3>
                </div>
              </div>
              <div className="filler-body">
                <div className="value">
                  <h3>Investment Term</h3>
                  <div className="lockup">
                    <h1>28 days</h1>
                  </div>
                </div>
                <div className="value">
                  <h3>Investment Strategy</h3>
                  <div className="horizontal-group">
                    <h2>daily return</h2>
                    <h2>7%</h2>
                  </div>
                  <div className="horizontal-group">
                    <h2>auto-reinvested</h2>
                    <h2>14 times</h2>
                  </div>
                  <div className="horizontal-group">
                    <h2>total return</h2>
                    <h2>157.9%</h2>
                  </div>
                  <h3> </h3>
                  <div className="horizontal-group-alt">
                    <h3>
                      Withdrawal Tax <br />
                      <span style={{ fontSize: "smaller" }}>
                        Goes back directly into the contract
                      </span>
                    </h3>
                    <h3>-15%</h3>
                  </div>
                </div>
                <div className="value">
                  <div className="roi-group">
                    <div className="value">
                      <h3>Deposit</h3>
                      <h2>
                        <span id="deposit_left_0">1</span>{" "}
                        <span className="unit">BNB</span>
                      </h2>
                    </div>
                    <svg
                      className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                      focusable="false"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      data-testid="ArrowRightAltIcon"
                    >
                      <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z"></path>
                    </svg>
                    <div className="value">
                      <h3>Receive</h3>
                      <h2>
                        <span id="deposit_right_0">3.43</span>{" "}
                        <span className="unit">BNB</span>
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="deposit">
                  <h3>Deposit Amount</h3>
                  <div className="deposit-group">
                    <div className="input-group">
                      <input
                        id="deposit_value_0"
                        type="number"
                        step="0.1"
                        min="0.1"
                        max="100000"
                        placeholder="0.1"
                        required=""
                        defaultValue={""}
                      />
                      <h3>BNB</h3>
                    </div>
                    <button id="deposit_0" disabled="">
                      <h4>Deposit</h4>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid container justifyContent="ccenter" style={{ marginTop: "100px" }}>
          <Grid item xs={12} md={5}>
            <div className="home_s_grp">
              <div className="glass1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="iconify iconify--cryptocurrency"
                  width="50"
                  height="50"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 32 32"
                  data-icon="cryptocurrency:bnb"
                  data-width="50"
                  data-height="50"
                  style={{ color: "yellow" }}
                >
                  <path
                    fill="currentColor"
                    d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16s-7.163 16-16 16zm-3.884-17.596L16 10.52l3.886 3.886l2.26-2.26L16 6l-6.144 6.144l2.26 2.26zM6 16l2.26 2.26L10.52 16l-2.26-2.26L6 16zm6.116 1.596l-2.263 2.257l.003.003L16 26l6.146-6.146v-.001l-2.26-2.26L16 21.48l-3.884-3.884zM21.48 16l2.26 2.26L26 16l-2.26-2.26L21.48 16zm-3.188-.002h.001L16 13.706L14.305 15.4l-.195.195l-.401.402l-.004.003l.004.003l2.29 2.291l2.294-2.293l.001-.001l-.002-.001z"
                  ></path>
                </svg>
              </div>
              <div className="home_s_grp_text1">
                <h3>Total Staked</h3>
              </div>
              <h2>
                <div className="loader">
                  <div className="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              </h2>
            </div>

            <div className="home_s_grp">
              <button className="withdraw_btn">Withdraw</button>
              <div className="home_s_grp_text1">
                <h3>Available to withdraw</h3>
              </div>
              <h2>
                <div className="loader">
                  <div className="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              </h2>
            </div>
          </Grid>
          <Grid item xs={12} md={7}>
            <div className="home_s_grp">
              <div className="home_s_grp_text1">
                <h3>Your Referral Link</h3>
              </div>
              <div className="horizontal-group">
                <div className="ref-link">
                  <input
                    id="invite-link"
                    disabled=""
                    value="https://bnbstaker.xyz?ref=YOUR_ADDRESS"
                  />
                </div>
                <div className="ref-copy">
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-1k33q06"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="ContentCopyIcon"
                    onclick=""
                  >
                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>
                  </svg>
                </div>
              </div>
              <Grid container justifyContent="center">
                <Grid item xs={12} md={6}>
                  <div className="home_s_grp_text1">
                    <h3>Total Bonus Earned</h3>
                    <div className="loader">
                      <div className="lds-ellipsis">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <div className="home_s_grp_text1">
                    <h3>Total Bonus Withdrawn</h3>
                    <div className="loader">
                      <div className="lds-ellipsis">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    </div>
                  </div>
                </Grid>
              </Grid>
              <Grid container justifyContent="center">
                <Grid item xs={12} md={6}>
                  <div className="home_s_grp_text1">
                    <h3>Users Invited by You</h3>
                    <div className="loader">
                      <div className="lds-ellipsis">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    </div>
                  </div>
                </Grid>

                <Grid item xs={12} md={6}>
                  <div className="home_s_grp_text1">
                    <h3>You will receive:</h3>
                    <p>
                      - 6% for each level 1 referral deposit
                      <br />- 3% for each level 2 referral deposit
                      <br />- 1% for each level 3 referral deposit
                      <br />
                      <br />
                    </p>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
        <div className="bottom_imgae_grp">
          <div style={{ width: "190px" }}>
            <img src={img_bottom1} className="bottom_image" alt="bottom" />
          </div>
          <div style={{ width: "190px" }}>
            <img src={img_bottom2} className="bottom_image" alt="bottom" />
          </div>
        </div>
      </div>
    </>
  );
}

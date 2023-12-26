import { StyleSheet, Text, View } from "react-native";
import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WebView } from "react-native-webview";

import { setIsWebviewLoaded } from "../../../Features/isWebviewLoaded";
import { setIsViewLogin } from "../../../Features/isViewLogin";

export default React.memo(function HomeWebview({
  viewRef,
  mainWebviewUrlRef,
  //   isViewLoginRef,
  //   isWebviewLoadedRef,
  //   setIsWebviewLoaded,
  //   setIsViewLogin,
}) {
  console.log("HomeWebview");
  const dispatch = useDispatch();
  //   const pageUrl = useSelector((state) => state.pageUrl.value);

  // const viewRef = React.useRef();

  const firstCheckProfileCount = useRef(0);
  const secondCheckProfileCount = useRef(0);
  const checkLoginCount = useRef(0);
  const checkInputCount = useRef(0);
  const checkSubmitCount = useRef(0);

  async function checkProfile() {
    viewRef.current.injectJavaScript(`
            (function (){
    
                let profileAvailable = false
                const profile = window.document.getElementsByClassName("userMenu--BWkSG")[0];
        
                if (profile) {    
                    profileAvailable = true       
                    window.ReactNativeWebView.postMessage(
                      JSON.stringify({ message: "check-profile", data: profileAvailable })
                    )
                } 
                else {
                  window.ReactNativeWebView.postMessage(
                    JSON.stringify({ message: "check-profile", data: profileAvailable })
                  )}
            })()
            `);
  }
  async function clickLogin() {
    viewRef.current.injectJavaScript(`
            (function (){
    
                const loginButton = window.document.getElementsByClassName("loginButton--uIEF2 buttonBase--r4opq tertiaryButton--+4ehJ")[0];
          
                if (loginButton) {
                  // Click the login button
                  loginButton.click();
    
                  window.ReactNativeWebView.postMessage(
                    JSON.stringify({ message: "check-login-button", data: true })
                  )
              console.log('login button clicked')
                  // Continue with checking inputs
                  
                } else {
                  // Continue checking until the button is available
                    console.log("try again check if login button available")
                    window.ReactNativeWebView.postMessage(
                        JSON.stringify({ message: "check-login-button", data: false })
                      )
                }
        
    
            })()
            `);
  }
  async function checkInputs() {
    viewRef.current.injectJavaScript(`
        (function(){
            let event = new Event("change", { bubbles: true });
            event.simulated = true;
            const emailInput = window.document.getElementsByClassName("textInput--yG-0W")[1];
            const passwordInput = window.document.getElementsByClassName("textInput--yG-0W")[2];
      
            if (emailInput && passwordInput) {
              // Set values and trigger change event for email input
              emailInput.setAttribute("value", "basselturky121@gmail.com");
              emailInput.dispatchEvent(event);
      
              // Set values and trigger change event for password input
              passwordInput.setAttribute("value", "blue101@webview");
              passwordInput.dispatchEvent(event);
      
              // Delay before clicking the login button (100 ms)
              window.ReactNativeWebView.postMessage(
                JSON.stringify({ message: "check-inputs", data: true })
              )
            } else {
              // Continue checking until the inputs are available
            //   setTimeout(checkInputs, 100);
              window.ReactNativeWebView.postMessage(
                JSON.stringify({ message: "check-inputs", data: false })
              )
            }
        })()`);
  }

  async function submit() {
    viewRef.current.injectJavaScript(`
        
        (function(){
    
            let submit =  window.document
            .getElementsByClassName(
              "loginButton--cVPDu e2e-auth-login-submit-button base--o-Oap primary--uRlHk"
            )[0]
    
            if(submit){
                submit.click();
            
                window.ReactNativeWebView.postMessage(
                    JSON.stringify({ message: "submit", data: true })
                  )
            }else{
    
                window.ReactNativeWebView.postMessage(
                    JSON.stringify({ message: "submit", data: false })
                  )
            }
            
    
    
        })()
        
        `);
  }

  async function checkProfileAgain() {
    viewRef.current.injectJavaScript(`
        
        (function(){
    
                const profile = window.document.getElementsByClassName("userMenu--BWkSG")[0];
    
        if (profile) {
            
          console.log("true"); // Log true if the condition becomes true
       
    
          window.ReactNativeWebView.postMessage(
              JSON.stringify({ message: "check-profile-again", data: true }))
        } else {
    
            window.ReactNativeWebView.postMessage(
                JSON.stringify({ message: "check-profile-again", data: false }))
            
        }
        })()
    
    
        `);
  }

  useEffect(() => {
    return () => {
      mainWebviewUrlRef.current = "https://pixabay.com";
      dispatch(setIsViewLogin(false));
      dispatch(setIsWebviewLoaded(false));
    };
  }, [mainWebviewUrlRef]);

  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        bottom: 0,
        width: 1,
        height: 1,
      }}
    >
      <WebView
        ref={viewRef}
        style={{
          width: 1,
        }}
        userAgent={
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36"
        }
        javaScriptEnabled={true}
        source={{
          uri: mainWebviewUrlRef.current,
        }}
        onLoadEnd={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.log("onLoadEnd URL: ", nativeEvent.url);
          console.log("onLoadEnd Description: ", nativeEvent.description);
          console.log("loaded: ", mainWebviewUrlRef.current);
          dispatch(setIsWebviewLoaded(true));
          //   isWebviewLoadedRef.current = true;
          if (mainWebviewUrlRef.current === "https://pixabay.com") {
            checkProfile();
          }
        }}
        onMessage={(event) => {
          let eventObj = JSON.parse(event.nativeEvent.data);

          if (eventObj.message === "check-profile") {
            console.log("part 1");
            if (eventObj.data) {
              // found profile
              console.log("already login");
              dispatch(setIsViewLogin(true));
              //   isViewLoginRef.current = true;
            } else {
              // didn't find profile
              // inject again in 100ms if count != 5

              if (firstCheckProfileCount.current < 10) {
                // inject then ++ count
                firstCheckProfileCount.current += 1;
                setTimeout(() => checkProfile(), 100);
              } else {
                // skip, no profile found, start login steps.
                // reset count
                firstCheckProfileCount.current = 0;
                // check login button and click it.
                clickLogin();
              }
            }
          }
          // I need to repeat login , input and submit check 5 times
          if (eventObj.message === "check-login-button") {
            console.log("part 2");
            if (eventObj.data) {
              // found login button and clicked it
              // check inputs after 100 ms
              setTimeout(() => checkInputs(), 100);
              console.log("CI start");
            } else {
              if (checkLoginCount.current < 40) {
                setTimeout(() => clickLogin(), 100);
                checkLoginCount.current += 1;
                // console.log(checkLoginCount.current);
              } else {
                // reset count
                checkLoginCount.current = 0;
                // didn't find login button
                console.log("didn't find login button, Time out");
                // reset

                // auto reset url or enable manual reset with button press
                viewRef.current.injectJavaScript(
                  `window.location.href = 'https://pixabay.com';`
                );
              }
            }
          }

          if (eventObj.message === "check-inputs") {
            console.log("part 3");
            if (eventObj.data) {
              // input available and inserted
              // next is submit
              setTimeout(() => submit(), 100);
            } else {
              if (checkInputCount.current < 40) {
                checkInputCount.current += 1;
                // check inputs again
                setTimeout(() => checkInputs(), 100);
              } else {
                checkInputCount.current = 0;
                // input not available
                console.log("input not available, Time out");

                viewRef.current.injectJavaScript(
                  `window.location.href = 'https://pixabay.com';`
                );
              }
            }
          }

          if (eventObj.message === "submit") {
            console.log("part 4");
            if (eventObj.data) {
              // submitted
              // time to check for profile again

              setTimeout(() => checkProfileAgain(), 100);
            } else {
              if (checkSubmitCount.current < 40) {
                checkSubmitCount.current += 1;
                setTimeout(() => submit(), 100);
              } else {
                checkSubmitCount.current = 0;
                console.log("didn't find submit btn, Time out");
                viewRef.current.injectJavaScript(
                  `window.location.href = 'https://pixabay.com';`
                );
              }
            }
          }

          if (eventObj.message === "check-profile-again") {
            console.log("part 5");
            if (eventObj.data) {
              // found profile
              console.log("found profile: login success");
              dispatch(setIsViewLogin(true));
              //   isViewLoginRef.current = true;
            } else {
              // didn't find profile
              // inject again in 100ms if count != 5

              if (secondCheckProfileCount.current < 40) {
                console.log("try again to find profile");
                // inject then ++ count
                secondCheckProfileCount.current += 1;
                setTimeout(() => checkProfileAgain(), 100);
              } else {
                secondCheckProfileCount.current = 0;
                // skip, no profile found, start login steps.

                // check login button and click it.
                // clickLogin()
                console.log(
                  "didn't find profile again, Time out, waiting for manual restart."
                );
              }
            }
          }
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({});

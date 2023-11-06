import React, { Fragment, useEffect } from 'react';

import { ZoomMtg } from '@zoomus/websdk';
ZoomMtg.setZoomJSLib('https://source.zoom.us/2.17.0/lib', '/av');
ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// ZoomMtg.setVirtualBackground('white')
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');
const ZoomNew=()=>{
  var authEndpoint = ''
  var sdkKey = 'iv_dADfSb6kbXfqXI7raA' // is 
  var meetingNumber ='83333512010'
  var passWord = '7gFbfy'
  var role = 0 
  var userName = 'hhh'
  var userEmail = ''
  var registrantToken = ''
  var zakToken = ''
  var leaveUrl = 'http://localhost:3000'

    const getSignature = async () => {
        // e.preventDefault();
        try {
          // hit the remote experss server to retrieve signature
          // meetingNumber and role are must.
          // role 0 means attendee, 1 stands for host
          const responseFromSignatureEndpoint = await fetch(
            "https://backend-privatecourt.onrender.com/api/getsign",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                mn:meetingNumber,
                role,
              }),
            }
          );
          // if signature is retrieved successfully, then attempt to start meeting
          const signatureJSON = await responseFromSignatureEndpoint.json();
          if (signatureJSON) {
            startMeeting(signatureJSON.signature);
          }
        } catch (error) {
          console.error(error);
        }
      }

  function startMeeting(signature) { 
    console.log(signature)
    document.getElementById('zmmtg-root').style.display = 'block';
    ZoomMtg.init({
      leaveUrl: leaveUrl,
      success: (success) => {
        console.log(success)
        ZoomMtg.join({
            signature: signature, // Pass in your Meeting SDK JWT
            sdkKey: sdkKey,         
            meetingNumber:meetingNumber,
            passWord:passWord,
            userEmail:userEmail,
            userName:userName,
            tk: registrantToken,
            zak: zakToken,
            success: (success) => {
              console.log(success)
            },
            error: (error) => {
              console.log(error,`${meetingNumber}`)
            }
          })
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  useEffect(()=>{
    getSignature();
  },[])
  return (
   <Fragment></Fragment>
  );
}

export default ZoomNew;
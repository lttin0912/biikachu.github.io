const Peer = require('peerjs');
const uid = require('uid');
const $ = require('jquery');
const openStream = require('./openStream');
const playVideo = require('./playVideo');
const config = {host: 'bii-stream-webrtc-nodejs-2.herokuapp.com', port: 443, secure: true, key: 'peerjs'};

function getPeer(){
  const id = uid(10);
  $('#peer-id').append(id);
  return id;
}
const peer = new Peer(getPeer(), config);

$("#btnCall").click(() => {
  const friendId = $('#txtFriendId').val();
  openStream(stream => {
    playVideo(stream, 'localStream');
    const call = peer.call(friendId, stream);
    call.on('stream', remoteStream => playVideo(remoteStream, 'friendStream'))
  });
});

peer.on('call', (call) => {
  openStream(stream => {
    playVideo(stream, 'localStream');
    call.answer(stream);
    call.on('stream', remoteStream => playVideo(remoteStream, 'friendStream'))
  });
});

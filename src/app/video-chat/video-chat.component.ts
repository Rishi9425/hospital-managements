import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SignalingService } from '../signaling.service';

@Component({
  selector: 'app-video-chat',
  templateUrl: './video-chat.component.html',
  styleUrls: ['./video-chat.component.css']
})
export class VideoChatComponent implements OnInit {
  @ViewChild('localVideo') localVideo!: ElementRef;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef;

  private peerConnection!: RTCPeerConnection;
  private localStream!: MediaStream;

  constructor(private signaling: SignalingService) {}

  async ngOnInit() {
    this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    this.localVideo.nativeElement.srcObject = this.localStream;

    this.setupPeerConnection();
    this.listenToSignals();
  }

  setupPeerConnection() {
    this.peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.signaling.emit('ice-candidate', event.candidate);
      }
    };

    this.peerConnection.ontrack = (event) => {
      this.remoteVideo.nativeElement.srcObject = event.streams[0];
    };

    this.localStream.getTracks().forEach(track => {
      this.peerConnection.addTrack(track, this.localStream);
    });
  }

  listenToSignals() {
    this.signaling.on('offer', async (offer: RTCSessionDescriptionInit) => {
      await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await this.peerConnection.createAnswer();
      await this.peerConnection.setLocalDescription(answer);
      this.signaling.emit('answer', answer);
    });

    this.signaling.on('answer', async (answer: RTCSessionDescriptionInit) => {
      await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    });

    this.signaling.on('ice-candidate', async (candidate: RTCIceCandidateInit) => {
      await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    });
  }

  async callPeer() {
    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);
    this.signaling.emit('offer', offer);
  }

  hungUp() {
    this.localStream.getTracks().forEach(track => track.stop());
    this.peerConnection.close();
    this.peerConnection = null!; // Reset peer connection
  }
}

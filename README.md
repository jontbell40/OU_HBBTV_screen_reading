The applications here were used to investigate HBBTV application accessbility.
Note the timebased media test video is not present. This expects an MPEG Dash stream, and was removed because of its size.

Creating MPEG DAsh file:
Installation
I installed both ffmpeg and MP4box on Fedora 28, but suspect the installation is similar on Ubuntu or other Brown brands.

MP4Box:-

 $>mkdir gpac;
 
 $>git clone https://github.com/gpac/gpac.git;
 
 $>cd gpac;
 $>./configure --static-mp4box --use-zlib=no;
 
 $>make -j4;
 
 $>sudo make install;

Note install anything found missing by configure.

ffmpeg:-


$>sudo dnf install ffmpeg; // or apt
Note for fedora I also update VLC as the version i'd previously installed had problems playing DASH.

vlc (Optional):-

$>git clone git://git.videolan.org/vlc.git

$>cd vlc && ./bootstrap

$>sudo dnf install deepin-gettext-tools //identfied as missing my the bootstrap script

$>sudo dnf install flex //identified as missing my the bootstrap script

$>sudo dnf install lua //identified as missing my the bootstrap script

$>sudo dnf install lua-devel //identified as missing my the bootstrap script

$>./configure;

$>sudo make install;

$>vlc --adaptive-use-access  ./manifest.mpd //to run

Creation:-
I Downloaded MP4 content from http://www.caminandes.com/ (Blender), other formats can be used, i used the information found at https://www.radiantmediaplayer.com/guides/working-with-ffmpeg.html#ffmpeg-h264 with a slight change to make the available aac lib work.


$>ffmpeg -i 02_gran_dillama_1080p.mp4 -s 640x360 -c:v libx264 -b:v 650k -r 24 -x264opts keyint=48:min-keyint=48:no-scenecut -profile:v main -preset fast -movflags +faststart -c:a aac -b:a 128k -ac 2 out-low.mp4

$>ffmpeg -i 02_gran_dillama_1080p.mp4 -s 960x540 -c:v libx264 -b:v 1400k -r 24 -x264opts keyint=48:min-keyint=48:no-scenecut -profile:v main -preset fast -movflags +faststart -c:a aac -b:a 128k -ac 2 out-med.mp4

$>ffmpeg -i 02_gran_dillama_1080p.mp4 -s 1280x720 -c:v libx264 -b:v 2500k -r 24 -x264opts keyint=48:min-keyint=48:no-scenecut -profile:v main -preset fast -movflags +faststart -c:a aac -b:a 128k -ac 2 out-high.mp4

$>ffmpeg -i 02_gran_dillama_1080p.mp4 -s 1920x1080 -c:v libx264 -b:v 5500k -r 24 -x264opts keyint=48:min-keyint=48:no-scenecut -profile:v main -preset fast -movflags +faststart -c:a aac -b:a 128k -ac 2 out-max.mp4

This should create streams with frames aligned to support seamless switching. To segment and create the MPD file


$>MP4Box -dash 4000 -rap -bs-switching no -profile live -out manifest.mpd out-low.mp4#audio out-low.mp4#video out-med.mp4#video out-high.mp4#video


created MPD file:-


<?xml version="1.0"?>
<!-- MPD file Generated with GPAC version 0.7.2-DEV-rev625-gc956332c8-master  at 2018-08-01T10:02:14.485Z-->
<MPD xmlns="urn:mpeg:dash:schema:mpd:2011" minBufferTime="PT1.500S" type="static" mediaPresentationDuration="PT0H2M26.048S" maxSegmentDuration="PT0H0M6.000S" profiles="urn:mpeg:dash:profile:isoff-live:2011">
 <ProgramInformation moreInformationURL="http://gpac.io">
  <Title>manifest.mpd generated by GPAC</Title>
 </ProgramInformation>
 <Period duration="PT0H2M26.048S">
  <AdaptationSet segmentAlignment="true" lang="eng">
   <Representation id="1" mimeType="audio/mp4" codecs="mp4a.40.2" startWithSAP="1" bandwidth="128670">
    <AudioChannelConfiguration schemeIdUri="urn:mpeg:dash:23003:3:audio_channel_configuration:2011" value="2"/>
    <SegmentTemplate media="out-low_dash_track2_$Number$.m4s" timescale="48000" startNumber="1" duration="192000" initialization="out-low_dash_track2_init.mp4"/>
   </Representation>
  </AdaptationSet>
  <AdaptationSet segmentAlignment="true" maxWidth="1280" maxHeight="720" maxFrameRate="24" par="16:9" lang="eng">
   <Representation id="2" mimeType="video/mp4" codecs="avc1.4D401E" width="640" height="360" frameRate="24" sar="1:1" startWithSAP="1" bandwidth="654707">
    <SegmentTemplate media="out-low_dash_track1_$Number$.m4s" timescale="12288" startNumber="1" duration="49152" initialization="out-low_dash_track1_init.mp4"/>
   </Representation>
   <Representation id="3" mimeType="video/mp4" codecs="avc1.4D401F" width="960" height="540" frameRate="24" sar="1:1" startWithSAP="1" bandwidth="1407767">
    <SegmentTemplate media="out-med_dash_track1_$Number$.m4s" timescale="12288" startNumber="1" duration="49152" initialization="out-med_dash_track1_init.mp4"/>
   </Representation>
   <Representation id="4" mimeType="video/mp4" codecs="avc1.4D401F" width="1280" height="720" frameRate="24" sar="1:1" startWithSAP="1" bandwidth="2513904">
    <SegmentTemplate media="out-high_dash_track1_$Number$.m4s" timescale="12288" startNumber="1" duration="49152" initialization="out-high_dash_track1_init.mp4"/>
   </Representation>
  </AdaptationSet>
 </Period>
</MPD>

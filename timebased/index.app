<!DOCTYPE html>
<html lang="en">

<head>
    <title>"WCAG 2.0 HBBTV Test:1"</title>
    <link rel="stylesheet" type="text/css" href="./css/timeBased.css" />
    <script src="../common_js/hbbtv.js"></script>
    <script src="../common_js/voice.js"></script>
    <script src="./js/timebased.js"></script>
    <!--meta http-equiv="content-type" content="application/vnd.hbbtv.xhtml+xml; charset=UTF-8" /-->
</head>


<body onload="tbObj.init();">
    <div style="visibility: hidden; width: 0; height: 0;">
        <object type="application/oipfApplicationManager" id="appMan"></object>
    </div>

    <!-- viewable area -->
    <div id="viewable">
        <header role="header" class="titleArea" tabindex="-1" id="header">
            <h3>Time Based Media </h3>
            <p>Reference: WCAG 2.0 (1.2) Provide Alternatives for time based media. </p>
        </header>
        <div id="tspacer"></div>
        <div id="midBar">
            <div id="infoArea" tabindex="0" role="dialog">
                <h4>Background:</h4>
                <p>This Guideline covers:<br> The translation of visual to audible such as Audio Description. The audible to visual such as Subtitles or Transcripts.</br>
                    Note the video contains both in-band and out-of-band subtitles.</br>
                    Out of band subtitles could possibly be read</br>
                    by a screen or braille reader.
                </p>
                <h4>Operation</h4>
                <p>Press right to select the video. Press OK to play/pause. Press back to return the main menu.</p>
            </div>

            <div id="testArea">
                <video width="600" height="370" id="video" tabindex="1" controls>
				  <source src="./video_1/manifest.mpd">
				 <track label="English" kind="subtitles" srclang="en" src="./sub_eng.xml" default>
				</video>
            </div>
            <div id="bspacer">
            </div>
            <div id="footer">
                <div id="butbox">
                    <div id="redb"></div>
                    <div id="greenb"></div>
                    <div id="yellowb"></div>
                    <div id="cyanb"></div>
                </div>
            </div>
        </div>
</body>

</html>
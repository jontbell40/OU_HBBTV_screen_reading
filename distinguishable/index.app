<!DOCTYPE html>
<html lang="en">

<head>
    <title>"WCAG 2.0 HBBTV Test:1"</title>
    <link rel="stylesheet" type="text/css" href="../css/main.css" />
    <script src="../common_js/hbbtv.js"></script>
    <script src="../common_js/voice.js"></script>
    <script src="./js/distin.js"></script>
    <!--meta http-equiv="content-type" content="application/vnd.hbbtv.xhtml+xml; charset=UTF-8" /-->
</head>


<body onload="dstObj.init();">
    <div style="visibility: hidden; width: 0; height: 0;">
        <object type="application/oipfApplicationManager" id="appMan"></object>
    </div>

    <!-- viewable area -->
    <div class="viewable">
        <header class="titleArea" id="header" role="header">
            <h4>Perceivable Test 4 Distinguishable</h4>
            <p>Reference: WCAG 2.0 (1.4) Make it easier for users to see and hear content including separating foreground from background. </p>
        </header>
        <div id="tspacer"></div>
        <div id="midBarDistin">
            <div id="infoArea" tabindex="0" role="dialog">
                <h4>Background:</h4>
                <p>This area of the guidelines making content distinguishable to the widest range of user,
                    <br/>Including color,contrast and ensuring clean information is presented.
                </p>

                <h4>Operation</h4>
                <p>Press right to start</br>
                    up/down arrow to adjust font size
                    <br/>use the red/green to change the text colour
                    <br/>use yellow/cyanto change the background color
                    <br/>Press back to return.
            </div>

            <div id="testAreaDistin" tabindex="1">
                <!--table class="center"-->
                <p id="topRow">P N F E V Z H U</p>
                <p id="secondRow">D F Z K N R U P</p>
                <p id="thirdRow">F Z P R N V U E</p>
                <p id="fourthRow">E U D K F H Z R</p>
                <p id="bottomRow">Z N U P F D H V</p>
            </div>
            </div>
            <div id="bspacer">
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

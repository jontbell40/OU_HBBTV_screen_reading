<!DOCTYPE html>
<html lang="en">

<head>
    <title>"WCAG 2.0 HBBTV Test:1"</title>
    <link rel="stylesheet" type="text/css" href="./css/textalt.css" />
    <script src="../common_js/hbbtv.js"></script>
    <script src="../common_js/voice.js"></script>
    <script src="./js/textalt.js"></script>
</head>


<body onload="taObj.init();">
    <div style="visibility: hidden; width: 0; height: 0;">
        <object type="application/oipfApplicationManager" id="appMan"></object>
    </div>

    <!-- viewable area -->
    <div id="viewable">
        <header class="titleArea" id="header" role="header">
            <h4>Perceivable Guideline 1: Alternative Text</h4>
            <p>Reference: WCAG 2.0 (1.1.1) All non-text content that is presented to the user has a equivalent text alternative.</p>
        </header>
        <div id="tspacer"></div>
        <div id="midBar">
            <div id="infoArea" tabindex="0" role="dialog">
                <h4>Background:</h4>
                <p>This area of the guidelines covers providing text alternatives for all non text content. This text alternative can be used by screen and braille readers.
                </p>
                <h4>Operation:</h4>
                <p>Press right to select the game. Use the arrow keys to move around the grid and select all the cats. Press OK to toggle a selection. Press 1 to restart or reset the timer and the back key return to the main menu. </p>
            </div>
            <div id="testArea">
                <!--table class="center"-->
                <table role="application">
                    <tr>
                        <th role="button" class="container" id="pic1" tabindex="1"><img src="" class="aniimg" alt="" /><input type="checkbox" class="checkbox" id="check1" /></th>
                        <th role="button" class="container" id="pic2" tabindex="2"><img src="" class="aniimg" alt="" /><input type="checkbox" class="checkbox" id="check2" /></th>
                        <th role="button" class="container" id="pic3" tabindex="3"><img src="" class="aniimg" alt="" /><input type="checkbox" class="checkbox" id="check3" /></th>
                    </tr>
                    <tr>
                        <th role="button" class="container" id="pic4" tabindex="4"><img src="" class="aniimg" alt="" /><input type="checkbox" class="checkbox" id="check4" /></th>
                        <th role="button" class="container" id="pic5" tabindex="5"><img src="" class="aniimg" alt="" /><input type="checkbox" class="checkbox" id="check5" /></th>
                        <th role="button" class="container" id="pic6" tabindex="6"><img src="" class="aniimg" alt="" /><input type="checkbox" class="checkbox" id="check6" /></th>
                    </tr>
                    <tr>
                        <th role="button" class="container" id="pic7" tabindex="7"><img src="" class="aniimg" alt="" /><input type="checkbox" class="checkbox" id="check7" /></th>
                        <th role="button" class="container" id="pic8" tabindex="8"><img src="" class="aniimg" alt="" /><input type="checkbox" class="checkbox" id="check8" /></th>
                        <th role="button" class="container" id="pic9" tabindex="9"><img src="" class="aniimg" alt="" /><input type="checkbox" class="checkbox" id="check9" /></th>
                    </tr>

                </table>
            </div>
            <div id="measurement">
                <div id="secTime">

                </div>
                <div id="errorC">
                </div>
            </div>
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
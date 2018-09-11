<!DOCTYPE html>
<html lang="en">

<head>
    <title>"WCAG 2.0 HBBTV Test:1"</title>
    <link rel="stylesheet" type="text/css" href="./css/adaptable2.css" />
    <script src="../common_js/hbbtv.js"></script>
    <script src="../common_js/voice.js"></script>
    <script src="https://static.sekandocdn.net/static/feednami/feednami-client-v1.1.js"></script>
    <script src="./js/feedParse.js"></script>
    <script src="./js/adaptable2.js"></script>


</head>


<body onload="ad2Obj.init();">
    <div style="visibility: hidden; width: 0; height: 0;">
        <object type="application/oipfApplicationManager" id="appMan"></object>
    </div>

    <!-- viewable area -->
    <div id="viewable">
        <header class="titleArea" id="header">
            <h4>Perceivable Test 3 Adaptable</h4>
            <p>Reference: WCAG 2.0 (1.3.2) Meaningful Sequence </p>
        </header>
        <div id="tspacer"></div>
        <div id="midBar">
            <div id="infoArea" tabindex="0" role="dialog">
                <h4>Background:</h4>
                <p>This test demonstrates the requirement to ensure a logical flow of the document is determinable by assistive technology such as a screen reader.</p>
                <h4>Operation</h4>
                <p>Press right to select article list. Press up or down to read the article. Press back to return to the main menu.</p>
            </div>

            <div id="testArea">
                <!-- defined in javascript -->
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
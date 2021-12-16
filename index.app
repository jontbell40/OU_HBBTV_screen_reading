<!DOCTYPE html>
<html lang="en">

<head>
    <title>"WCAG 2.0 HBBTV Perceivable evaluation"</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="./css/main.css" />
    <script src="./common_js/hbbtv.js"></script>
    <script src="./common_js/voice.js"></script>
    <script src="./js/main.js"></script>
</head>


<body onload="mainObj.init();">
    <div style="visibility: hidden; width: 0; height: 0;">
        <object type="application/oipfApplicationManager" id="appMan"></object>
    </div>

    <!-- viewable area -->
    <div id="viewable">
        <header role="header" class="titleArea" id="header" aria-label="W.C.A.G. 2.0 Principle 1: Perceivable">
            <h4>Perceivable Test</h4>
            <p>Reference: WCAG 2.0 Principle 1: Perceivable </p>
        </header>
        <div id="tspacer"></div>
        <div id="midBar">
            <div id="infoArea" tabindex="0" role="dialog">
                <h4>Background:</h4>
                <p>Information and user interface components must be presentable to users in ways they can perceive.This principle is divided into four guidelines covering text alternatives, time based media, adaptable and distinguishable content. The selectable applications demonstrates the guidelines and success criteria involved.</p>

                <h4>Operation:</h4>
                <p>Use the right cursor, to select the test list, then up and down and okay to launch a test.</p>
            </div>
            <!-- info Area -->
            <div id="testArea" role="navigation" tabindex="-1">
                <table>
                    <tr>
                        <th role="link" class="linkContainer" id="link1" tabindex="1"><a href="./textalt/index.app"> 1.1 Text Alternatives. </a></th>
                    </tr>
                    <tr>
                        <th role="link" class="linkContainer" id="link2" tabindex="2"><a href="./timebased/index.app"> 1.2 Time Based Media. </a></th>
                    </tr>
                    <tr>
                        <th role="link" class="linkContainer" id="link3" tabindex="3"><a href="./adaptable/index.app"> 1.3.1 Info and Relationships. </a></th>
                    </tr>
                    <tr>
                        <th role="link" class="linkContainer" id="link4" tabindex="4"><a href="./adaptable/index2.app"> 1.3.2 Meaningful Sequences. </a></th>
                    </tr>
                    <tr>
                        <th role="link" class="linkContainer" id="link5" tabindex="5"><a href="./adaptable/index3.app"> 1.3.3 Sensory Characteristics.</a></th>
                    </tr>
                    <tr>
                        <th role="link" class="linkContainer" id="link6" tabindex="6"><a href="./distin/index.app"> 1.4 Distinguishable.</a></th>
                    </tr>
                </table>
            </div>
            <!-- test area -->
        </div>
        <!-- midBar -->
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
    <!-- viewable-->
</body>

</html>

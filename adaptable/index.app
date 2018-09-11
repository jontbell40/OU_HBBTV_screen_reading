<!DOCTYPE html>
<html lang="en">

<head>
    <title>"WCAG 2.0 HBBTV Test:1"</title>
    <link rel="stylesheet" type="text/css" href="./css/adaptable.css" />
    <script src="../common_js/hbbtv.js"></script>
    <script src="../common_js/voice.js"></script>
    <script src="./js/adaptable.js"></script>
    <!--meta http-equiv="content-type" content="application/vnd.hbbtv.xhtml+xml; charset=UTF-8" /-->
</head>


<body onload="adObj.init();">
    <div style="visibility: hidden; width: 0; height: 0;">
        <object type="application/oipfApplicationManager" id="appMan"></object>
    </div>

    <!-- viewable area -->
    <div id="viewable">
        <header class="titleArea" id="header" role="header">
            <h4>Perceivable Test 3 Adaptable</h4>
            <p>Reference: WCAG 2.0 (1.3.1) Info and Relationships </p>
        </header>
        <div id="tspacer"></div>
        <div id="midBar">
            <div id="infoArea" tabindex="0" role="dialog">
                <h4>Background:</h4>
                <p>This test provide different way to indicate information. The weather chart uses colour to indicate temperature and focus. It also however speaks the related temperature and uses additional information to indicate focus.</p>
                <h4>Operation</h4>
                <p>Press the right arrow to select the weather forcast. Then press up and down to select the days of the week. Press back to return to the main menu.</p>
            </div>

            <div id="testArea">
                <!--table class="center"-->
                <table>
                    <tr>
                        <th class="tcontainer" id="pic1" tabindex="1">Your Weeks Outlook</th>
                        <th class="tcontainer" id="pic2" tabindex="2"><img src="./img/temp.png" class="timg" alt="Temperature" /></th>
                        <th class="tcontainer" id="pic3" tabindex="3"><img src="./img/rain.png" class="timg" alt="Rain Fall" /></th>
                    </tr>
                    <tr>
                        <td class="container" id="pic4" tabindex="4">Monday</td>
                        <td class="container" id="pic5" tabindex="5" bgcolor="#f4a742">10</td>
                        <td class="container" id="pic6" tabindex="6">Dry</td>
                    </tr>
                    <tr>
                        <td class="container" id="pic7" tabindex="7">Tuesday</td>
                        <td class="container" id="pic8" tabindex="8" bgcolor="#f4d442">11</td>
                        <td class="container" id="pic9" tabindex="9">Dry</td>
                    </tr>
                    <tr>
                        <td class="container" id="pic10" tabindex="10">Wednesday</td>
                        <td class="container" id="pic11" tabindex="11" bgcolor="#f4bf42">12</td>
                        <td class="container" id="pic12" tabindex="12">Wet</td>
                    </tr>
                    <tr>
                        <th class="container" id="pic13" tabindex="13">Thursday</th>
                        <th class="container" id="pic14" tabindex="14" bgcolor="#f4a742">10</th>
                        <th class="container" id="pic15" tabindex="15">Wet</th>
                    </tr>
                    <tr>
                        <td class="container" id="pic16" tabindex="16">Friday</td>
                        <td class="container" id="pic17" tabindex="17" bgcolor="#f48742">8</td>
                        <td class="container" id="pic18" tabindex="18">Drizzle</td>
                    </tr>
                    <tr>
                        <td class="container" id="pic19" tabindex="19">Saturday</td>
                        <td class="container" id="pic20" tabindex="20" bgcolor="#f4c242">6</td>
                        <td class="container" id="pic21" tabindex="21">Dry</td>
                    </tr>
                    <tr>
                        <td class="container" id="pic22" tabindex="22">Sunday</td>
                        <td class="container" id="pic23" tabindex="23" bgcolor="#d9442">4</td>
                        <td class="container" id="pic24" tabindex="24">Snow</td>
                    </tr>
                </table>
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
var feed = {
    entires: null,

    init: function() {
        //var url = 'https://news.google.com/news?ned=uk&topic=h&output=rss'
        var url = 'http://feeds.bbci.co.uk/news/uk/rss.xml'
        feednami.load(url, function(result) {
            if (result.error) {
                console.log(result.error);
            } else {
                feed.entries = result.feed.entries;
                var par = document.getElementById("testArea");
                if (feed.entries.length > 3) {
                    for (var i = 0; i < 3; i++) {
                        var entry = feed.entries[i];
                        var topBox = document.createElement("div");
                        var imageBox = document.createElement("div");
                        var titleBox = document.createElement("div");
                        var summaryBox = document.createElement("div");


                        topBox.setAttribute("id", "feed" + i);
                        topBox.setAttribute("class", "articleContainer");
                        topBox.setAttribute("role", "article");
                        topBox.setAttribute("aria-describedby", "articleTitle" + i + ",articleSummary" + i);

                        topBox.setAttribute("tabindex", "" + (i + 1));

                        titleBox.setAttribute("id", "articleTitle" + i);
                        titleBox.setAttribute("class", "articleTitle");
                        summaryBox.setAttribute("id", "articleSummary" + i);
                        summaryBox.setAttribute("class", "articleSummary");
                        imageBox.setAttribute("id", "articleImage" + i);
                        imageBox.setAttribute("class", "articleImage");
                        imageBox.setAttribute("role", "image");

                        var ti = document.createTextNode(entry.title);
                        var sum = document.createTextNode(entry.summary);
                        var im = document.createElement("img");

                        im.setAttribute("id", "img" + i);
                        im.setAttribute("alt", entry.image.alt);
                        im.setAttribute("class", "articleImg");
                        im.setAttribute("src", entry.image.url);

                        titleBox.appendChild(ti);
                        summaryBox.appendChild(sum);

                        imageBox.appendChild(im);

                        topBox.appendChild(titleBox);
                        topBox.appendChild(imageBox);
                        topBox.appendChild(summaryBox);

                        //topBox.appendChild(im);
                        par.appendChild(topBox);

                        console.log(entry.title);
                        console.log(entry.description);
                        console.log(entry.image.url);
                    }
                }
            }
        })
    }

}
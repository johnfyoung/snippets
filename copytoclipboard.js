    /**
     * Discover which animationEnd event is thrown by this browser
     */
    function whichAnimationEvent() {
        var t,
            el = document.createElement("fakeelement");

        var animations = {
            "animation": "animationend",
            "OAnimation": "oAnimationEnd",
            "MozAnimation": "animationend",
            "WebkitAnimation": "webkitAnimationEnd"
        }

        for (t in animations) {
            if (el.style[t] !== undefined) {
                return animations[t];
            }
        }
    }

    var animationEvent = whichAnimationEvent();

    var transitionEvent = whichTransitionEvent();

    $(document).ready(function() {
        listenToCopyToClipboard();
    });

    /**
     * Adds click event listener to copy to clipboard buttons
     * 
     * Copy to Clipboard buttons are button elements with a data-source attribute pointing to the source element's id
     */
    function listenToCopyToClipboard() {
        $(".btn-copy-to-clipboard").on("click", function(e) {
            e.preventDefault();
            copyTextToClipboard($("#" + e.target.getAttribute("data-source")));
            showCopyIndication(e.target);
        });
    }

    /**
     * Copy the text contents of an Element into the clipboard
     * 
     * @param {jQuery Object} $el 
     */
    function copyTextToClipboard($el) {
        var text = $el.text();
        var $inputEl = $("<textarea id='temp-selectable'>" + text + "</textarea>").css({ position: "absolute", left: "-9999px" });
        $("body").append($inputEl);
        $(window).trigger('resize');
        $inputEl[0].select();
        document.execCommand('copy');
        $inputEl.remove();
    }

    /**
     * Shows a fading indication that something has been copied into the clipboard
     * @param {Element} el 
     */
    function showCopyIndication(el) {
        var $alert = $("<span class='copy-indicator'>Copied!</span>");
        $alert.one(animationEvent, function() {
            $(this).remove();
        });
        $(el).after($alert);
    }

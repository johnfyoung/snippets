<?php
class Html {
  /**
   * Translates HTML into plain text.
   * 
   * This is by no mean exhaustive in its coverage.
   *
   * @param string $html
   * @return string
   */
  public static function html_to_text($html) {
    // double sided tags
    $tags = array("div","span","p","strong","big","i","b","section","article");

    // handle new lines
    $processed = str_replace("\n", "", $html);
    $processed = preg_replace("~&lt;br\s/&gt;|&lt;br&gt;~", '\n', $processed);

    // handle tag list: p and div get new lines
    foreach($tags as $tag) {
      $processed = str_replace("&lt;/". $tag ."&gt;", $tag === "p" || $tag === "div" ? '\n' : '', $processed);
      $processed = preg_replace("~&lt;". $tag ."[^&]{0,}&gt;~", '', $processed);
    }

    // handle non-breaking spaces
    $processed = preg_replace("~&nbsp;|&amp;nbsp;~", '', $processed);

    // handle links
    $processed = preg_replace("~&lt;a\s+href=[\"']([^\"]+)[\"']&gt;([^&]{0,})&lt;\/a&gt;~", '$2 ($1)', $processed);

    // handle html tokens
    $processed = preg_replace_callback(
      "~&amp;([^;]+);~",
      function ($matches) {
        return html_entity_decode('&'. $matches[1] .';', ENT_QUOTES, 'UTF-8');
      },
      $processed
    );

    return $processed;
  }
}
